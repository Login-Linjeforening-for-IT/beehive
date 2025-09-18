'use client'

import useSWR from 'swr'
import no from '@text/spotify/no.json'
import en from '@text/spotify/en.json'
import AverageDuration from '@components/spotify/duration'
import CurrentlyPlaying from '@components/spotify/currentlyPlaying'
import TopFiveThisX from '@components/spotify/topFiveThisX'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Spotify({ initialData }: { initialData: Spotify }) {
    const { data } = useSWR('/api/spotify', fetcher, {
        refreshInterval: 10000,
        fallbackData: initialData,
    })

    const lang =
        typeof document !== 'undefined'
            ? (document.cookie
                .split('; ')
                .find((row) => row.startsWith('lang='))
                ?.split('=')[1] as 'en' | 'no') || 'no'
            : 'no'

    const text = lang === 'en' ? en : no

    if (!data) return <p>Loading...</p>

    return (
        <div className='page-container'>
            <div className='page-section--normal'>
                <h1 className='heading-1 heading-1--top-left-corner'>{text.title}</h1>
                <CurrentlyPlaying songs={data.currentlyPlaying} />
                <AverageDuration duration={data.averageDuration} />
                <TopFiveThisX data={data} />
            </div>
        </div>
    )
}
