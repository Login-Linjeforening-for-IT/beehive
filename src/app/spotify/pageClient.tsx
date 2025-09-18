'use client'

import useSWR from 'swr'
import no from '@text/spotify/no.json'
import en from '@text/spotify/en.json'
import AverageDuration from '@components/spotify/duration'
import CurrentlyPlaying from '@components/spotify/currentlyPlaying'
import TopFiveThisX from '@components/spotify/topFiveThisX'

async function fetcher(url: string) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

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

    return (
        <div className='page-container'>
            <div className='page-section--normal'>
                <h1 className='heading-1 heading-1--top-left-corner'>{text.title}</h1>
                <section className='page-section--normal mb-[2rem]'>
                    <p className='p--highlighted'>{text.intro}</p>
                </section>
                <CurrentlyPlaying songs={data.currentlyPlaying} />
                <AverageDuration duration={data.averageDuration} />
                <TopFiveThisX data={data} />
            </div>
        </div>
    )
}
