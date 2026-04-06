import { NextResponse } from 'next/server'
import YahooFinance from 'yahoo-finance2'
import holdingsData from '../holdings.json'

type Holding = {
    symbol: string
    shares: number
}

type YahooQuote = {
    symbol?: string
    currency?: string
}

type HistoryPoint = {
    date: string
    totalBase: number
}

type HoldingsHistoryPayload = {
    points: HistoryPoint[]
    currency: string
    updatedAt: number
}

type CalculatedHistoryPoint = HistoryPoint & {
    hasExactDataDay: boolean
}

type HistoryRange = '1m' | '6m'

type HistoryRangeConfig = {
    checkpoints: number
    stepDays: number
    lookbackDays: number
}

const BASE_CURRENCY = 'NOK'
const CACHE_TTL_MS = 10 * 60 * 1000
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

const RANGE_CONFIG: Record<HistoryRange, HistoryRangeConfig> = {
    // Last month with daily checkpoints.
    '1m': { checkpoints: 30, stepDays: 1, lookbackDays: 100 },
    // Last 6 months with weekly checkpoints.
    '6m': { checkpoints: 26, stepDays: 7, lookbackDays: 260 }
}

const cacheByRange = new Map<HistoryRange, {
    payload: HoldingsHistoryPayload
    cachedUntil: number
}>()

const HOLDINGS: Holding[] = (holdingsData.holdning || []).flatMap((entry) => {
    const firstValidEntry = Object.entries(entry).find(([, value]) => typeof value === 'number')
    const [symbol, shares] = firstValidEntry || []

    if (typeof symbol !== 'string' || typeof shares !== 'number') {
        return []
    }

    return [{ symbol, shares }]
})

function getDateKey(date: Date) {
    return date.toISOString().slice(0, 10)
}

function subDays(from: Date, days: number) {
    return new Date(from.getTime() - (days * 24 * 60 * 60 * 1000))
}

function isHistoryRange(value: string): value is HistoryRange {
    return value === '1m' || value === '6m'
}

async function fetchQuotes(symbols: string[]): Promise<YahooQuote[]> {
    if (symbols.length === 0) return []

    const results = await Promise.allSettled(symbols.map((symbol) => yahooFinance.quote(symbol)))

    const quotes: YahooQuote[] = []
    for (const result of results) {
        if (result.status !== 'fulfilled') continue

        quotes.push({
            symbol: result.value.symbol,
            currency: result.value.currency
        })
    }

    return quotes
}

async function fetchHistoricalCloseSeries(symbol: string, period1: Date, period2: Date) {
    const rows = await yahooFinance.historical(symbol, {
        period1,
        period2,
        interval: '1d'
    })

    const closeByDate = new Map<string, number>()
    const orderedDates: Date[] = []

    for (const row of rows) {
        if (!(row.date instanceof Date) || typeof row.close !== 'number') {
            continue
        }

        closeByDate.set(getDateKey(row.date), row.close)
        orderedDates.push(row.date)
    }

    return {
        closeByDate,
        orderedDates: orderedDates.sort((a, b) => a.getTime() - b.getTime())
    }
}

function closestValueOnOrBefore(
    orderedDates: Date[],
    closeByDate: Map<string, number>,
    targetDate: Date
) {
    let chosenValue: number | undefined

    for (const date of orderedDates) {
        if (date.getTime() > targetDate.getTime()) break

        const close = closeByDate.get(getDateKey(date))
        if (typeof close === 'number') {
            chosenValue = close
        }
    }

    return chosenValue
}

async function calculateHistory(baseCurrency: string, range: HistoryRange): Promise<HoldingsHistoryPayload> {
    const rangeConfig = RANGE_CONFIG[range]
    const { checkpoints, stepDays, lookbackDays } = rangeConfig

    const symbols = HOLDINGS.map((holding) => holding.symbol)
    if (symbols.length === 0) {
        return {
            points: [],
            currency: baseCurrency,
            updatedAt: Date.now()
        }
    }

    const now = new Date()
    const period1 = subDays(now, lookbackDays)
    const period2 = now

    const [quotes, historicalBySymbolEntries] = await Promise.all([
        fetchQuotes(symbols),
        Promise.all(symbols.map(async (symbol) => [symbol, await fetchHistoricalCloseSeries(symbol, period1, period2)] as const))
    ])

    const quoteBySymbol = new Map(quotes.filter((q) => q.symbol).map((q) => [q.symbol as string, q]))
    const historicalBySymbol = new Map(historicalBySymbolEntries)

    // Build a fixed timeline so charts show consistent checkpoints.
    const targetDates = Array.from({ length: checkpoints }, (_, index) => {
        const daysAgo = (checkpoints - 1 - index) * stepDays
        return subDays(now, daysAgo)
    })

    const currencies = HOLDINGS.map((holding) => quoteBySymbol.get(holding.symbol)?.currency || baseCurrency)
    const uniqueCurrencies = [...new Set(currencies.filter((currency) => currency && currency !== baseCurrency))]

    const fxHistoricalEntries = await Promise.all(
        uniqueCurrencies.map(async (currency) => {
            const fxSymbol = `${currency}${baseCurrency}=X`
            const fxSeries = await fetchHistoricalCloseSeries(fxSymbol, period1, period2)
            return [currency, fxSeries] as const
        })
    )

    const fxByCurrency = new Map(fxHistoricalEntries)

    const points: CalculatedHistoryPoint[] = targetDates.map((targetDate) => {
        const dateKey = getDateKey(targetDate)
        let hasExactDataDay = false

        const totalBase = HOLDINGS.reduce((sum, holding) => {
            const historical = historicalBySymbol.get(holding.symbol)
            if (!historical) return sum

            const price = closestValueOnOrBefore(historical.orderedDates, historical.closeByDate, targetDate)
            if (typeof price !== 'number') return sum

            const currency = quoteBySymbol.get(holding.symbol)?.currency || baseCurrency
            let fxRate = 1

            if (currency !== baseCurrency) {
                const fxSeries = fxByCurrency.get(currency)
                const resolvedFxRate = fxSeries
                    ? closestValueOnOrBefore(fxSeries.orderedDates, fxSeries.closeByDate, targetDate)
                    : undefined

                if (typeof resolvedFxRate !== 'number') {
                    return sum
                }

                if (historical.closeByDate.has(dateKey) && fxSeries?.closeByDate.has(dateKey)) {
                    hasExactDataDay = true
                }

                fxRate = resolvedFxRate
            } else if (historical.closeByDate.has(dateKey)) {
                hasExactDataDay = true
            }

            return sum + (holding.shares * price * fxRate)
        }, 0)

        return {
            date: dateKey,
            totalBase,
            hasExactDataDay
        }
    })

    // Remove stale tail where recent days contain no exact market update.
    while (points.length > 1 && !points[points.length - 1]?.hasExactDataDay) {
        points.pop()
    }

    return {
        points: points.map(({ date, totalBase }) => ({ date, totalBase })),
        currency: baseCurrency,
        updatedAt: Date.now()
    }
}

async function getCachedHistory(
    baseCurrency = BASE_CURRENCY,
    range: HistoryRange = '1m'
): Promise<HoldingsHistoryPayload> {
    const now = Date.now()
    const cachedEntry = cacheByRange.get(range)
    if (cachedEntry && now < cachedEntry.cachedUntil && cachedEntry.payload.currency === baseCurrency) {
        return cachedEntry.payload
    }

    const payload = await calculateHistory(baseCurrency, range)
    cacheByRange.set(range, {
        payload,
        cachedUntil: now + CACHE_TTL_MS
    })

    return payload
}

export async function GET(request: Request) {
    try {
        const url = new URL(request.url)
        const rangeParam = url.searchParams.get('range')
        const range: HistoryRange = rangeParam && isHistoryRange(rangeParam) ? rangeParam : '1m'

        const payload = await getCachedHistory(BASE_CURRENCY, range)

        return NextResponse.json(payload, {
            headers: {
                'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=300'
            }
        })
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            {
                status: 502,
                headers: {
                    'Cache-Control': 'no-store'
                }
            }
        )
    }
}
