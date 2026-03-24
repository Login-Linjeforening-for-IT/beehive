'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'

type HoldingsTotalLiveProps = {
    locale: string
    text: {
        updatedAtLabel: string
    }
    refreshMs?: number
    totalBase?: number
    currency?: string
    updatedAt?: number
}

type HoldingsTotalResponse = {
    totalBase: number
    currency: string
    updatedAt: number
}

async function fetcher(url: string): Promise<HoldingsTotalResponse> {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Failed to fetch holdings total')
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

export default function HoldingsTotalLive({
    locale,
    text,
    refreshMs = 10_000,
    totalBase,
    currency = 'NOK',
    updatedAt
}: HoldingsTotalLiveProps) {
    const fallbackData = typeof totalBase === 'number' && typeof updatedAt === 'number'
        ? { totalBase, currency, updatedAt }
        : undefined

    const { data } = useSWR('/api/fund/holdings', fetcher, {
        refreshInterval: refreshMs,
        dedupingInterval: refreshMs,
        revalidateOnFocus: true,
        fallbackData
    })

    const nextTotal = data?.totalBase ?? totalBase ?? 0
    const nextUpdatedAt = data?.updatedAt ?? updatedAt

    const [displayTotal, setDisplayTotal] = useState(nextTotal)
    const [displayUpdatedAt, setDisplayUpdatedAt] = useState<number | undefined>(nextUpdatedAt)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        const changed = displayTotal !== nextTotal || displayUpdatedAt !== nextUpdatedAt
        if (!changed) return

        setDisplayTotal(nextTotal)
        setDisplayUpdatedAt(nextUpdatedAt)
        setIsAnimating(true)

        const timeout = window.setTimeout(() => {
            setIsAnimating(false)
        }, 450)

        return () => {
            window.clearTimeout(timeout)
        }
    }, [displayTotal, displayUpdatedAt, nextTotal, nextUpdatedAt])

    return (
        <>
            <p
                className={`heading-2 transition-all duration-500 ease-out ${
                    isAnimating ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-px'
                }`}
            >
                {formatCurrency(displayTotal)}
            </p>
            {displayUpdatedAt && (
                <p
                    className={`p-regular mt-2 transition-opacity duration-500 ease-out ${
                        isAnimating ? 'opacity-80' : 'opacity-70'
                    }`}
                >
                    {text.updatedAtLabel}{' '}
                    {new Date(displayUpdatedAt).toLocaleTimeString(locale)}
                </p>
            )}
        </>
    )
}
