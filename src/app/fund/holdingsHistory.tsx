'use client'

import { useMemo, useState } from 'react'
import useSWR from 'swr'

type HistoryRange = '1m' | '6m'

type HoldingsHistoryPoint = {
    date: string
    totalBase: number
}

type HoldingsHistoryResponse = {
    points: HoldingsHistoryPoint[]
    currency: string
    updatedAt: number
}

type HoldingsHistoryProps = {
    locale: string
    text: {
        rangeTitle1m: string
        rangeTitle6m: string
        rangeChange1m: string
        rangeChange6m: string
        rangeOption1m: string
        rangeOption6m: string
        noHistory: string
    }
    refreshMs?: number
}

async function fetcher(url: string): Promise<HoldingsHistoryResponse> {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Failed to fetch holdings history')
    }

    return response.json()
}

function formatCurrency(value: number) {
    const formattedNumber = new Intl.NumberFormat('nb-NO', {
        style: 'decimal',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    }).format(value)

    return `${formattedNumber} NOK`
}

export default function HoldingsHistory({
    locale,
    text,
    refreshMs = 5 * 60 * 1000
}: HoldingsHistoryProps) {
    const [range, setRange] = useState<HistoryRange>('1m')

    const { data } = useSWR(`/api/fund/holdings/history?range=${range}`, fetcher, {
        refreshInterval: refreshMs,
        dedupingInterval: refreshMs,
        revalidateOnFocus: true
    })

    const rangeTitle = useMemo(() => {
        if (range === '6m') return text.rangeTitle6m
        return text.rangeTitle1m
    }, [range, text.rangeTitle1m, text.rangeTitle6m])

    const rangeChangeLabel = useMemo(() => {
        if (range === '6m') return text.rangeChange6m
        return text.rangeChange1m
    }, [range, text.rangeChange1m, text.rangeChange6m])

    const points = data?.points || []

    const rangeOptions: Array<{ value: HistoryRange, label: string }> = [
        { value: '1m', label: text.rangeOption1m },
        { value: '6m', label: text.rangeOption6m }
    ]

    if (points.length === 0) {
        return (
            <p className='p-regular mt-4 opacity-75'>
                {text.noHistory}
            </p>
        )
    }

    const width = 620
    const height = 190
    const padding = { top: 16, right: 14, bottom: 34, left: 14 }

    const values = points.map((point) => point.totalBase)
    const min = Math.min(...values)
    const max = Math.max(...values)
    const spread = max - min || 1

    const xScale = (index: number) => {
        if (points.length === 1) return width / 2

        return padding.left + (index / (points.length - 1)) * (width - padding.left - padding.right)
    }

    const yScale = (value: number) => (
        padding.top + ((max - value) / spread) * (height - padding.top - padding.bottom)
    )

    const linePoints = points
        .map((point, index) => `${xScale(index)},${yScale(point.totalBase)}`)
        .join(' ')

    const maxVisibleLabels = range === '6m' ? 5 : 6
    const labelStride = Math.max(1, Math.ceil(points.length / maxVisibleLabels))

    const areaPoints = `${xScale(0)},${height - padding.bottom} ${linePoints} ${xScale(points.length - 1)},${height - padding.bottom}`

    const first = points[0]
    const last = points[points.length - 1]
    const delta = last.totalBase - first.totalBase
    const deltaLabel = `${delta >= 0 ? '+' : ''}${formatCurrency(delta)}`

    return (
        <div className='mt-6'>
            <h3 className='heading-4 mb-2'>
                {rangeTitle}
            </h3>
            <div className='mb-3 flex flex-wrap gap-2'>
                {rangeOptions.map((option) => (
                    <button
                        key={option.value}
                        type='button'
                        onClick={() => setRange(option.value)}
                        className={`cursor-pointer rounded-full border px-3 py-1 text-xs 800px:text-sm transition-colors ${
                            range === option.value
                                ? 'bg-[#FD8738] text-black border-[#FD8738]'
                                : 'bg-transparent text-(--color-text-main) border-(--color-border-main) hover:bg-(--color-bg-main)'
                        }`}
                        aria-pressed={range === option.value}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            <div className='rounded-(--border-radius-medium) bg-(--color-bg-main) p-3 800px:p-4'>
                <svg viewBox={`0 0 ${width} ${height}`} className='w-full h-auto overflow-visible'>
                    <defs>
                        <linearGradient id='holdingsHistoryGradient' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='0%' stopColor='#FD8738' stopOpacity='0.32' />
                            <stop offset='100%' stopColor='#FD8738' stopOpacity='0.03' />
                        </linearGradient>
                    </defs>

                    <polygon points={areaPoints} fill='url(#holdingsHistoryGradient)' />

                    <polyline
                        points={linePoints}
                        fill='none'
                        stroke='#FD8738'
                        strokeWidth={2.5}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />

                    {points.map((point, index) => (
                        <g key={point.date}>
                            <circle
                                cx={xScale(index)}
                                cy={yScale(point.totalBase)}
                                r={4}
                                fill='#FD8738'
                            />
                            {index % labelStride === 0 || index === points.length - 1 ? (
                                <text
                                    x={xScale(index)}
                                    y={height - 12}
                                    textAnchor='middle'
                                    className='fill-current text-[10px] opacity-70'
                                >
                                    {new Date(`${point.date}T00:00:00.000Z`).toLocaleDateString(locale, {
                                        month: 'short',
                                        ...(range === '6m' ? {} : { day: 'numeric' })
                                    })}
                                </text>
                            ) : null}
                        </g>
                    ))}
                </svg>

                <div className='mt-3 flex flex-wrap items-center gap-x-4 gap-y-1'>
                    <p className='p-regular'>
                        {rangeChangeLabel} <strong>{deltaLabel}</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}
