'use client'

import useSWR from 'swr'
import no from '@text/music/no.json'
import en from '@text/music/en.json'
import CurrentlyPlaying from '@components/music/currentlyPlaying'
import TopFiveThisX from '@components/music/topFiveThisX'
import { MostPlayed } from '@components/music/mostPlayed'
import { TileInfo } from '@components/music/tileInfo'

async function fetcher(url: string) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export default function Music({ initialData }: { initialData: Music }) {
    const { data } = useSWR('/api/music', fetcher, {
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

    const userTemp = [
        {user: 'test1', image: 'img/logo/logo-white-small.svg', total_minutes: '12345'},
        {user: 'test2', image: 'img/logo/logo-white-small.svg', total_minutes: '67890'},
        {user: 'test3', image: 'img/logo/logo-white-small.svg', total_minutes: '111213'},
        {user: 'test4', image: 'img/logo/logo-white-small.svg', total_minutes: '141516'},
        {user: 'test5', image: 'img/logo/logo-white-small.svg', total_minutes: '151617'}
    ]

    const tileInfoData = [
        { title: 'Average Duration', value: formatDuration(data.stats.avg_seconds) },
        { title: 'Total Minutes', value: formatDuration(data.stats.total_minutes) },
        { title: 'Total Minutes This Year', value: formatDuration(data.stats.total_minutes_this_year) },
        { title: 'Total Songs', value: data.stats.total_songs.toString() }
    ]

    return (
        <div className='page-container'>
            <div className='page-section--normal'>
                <h1 className='heading-1 heading-1--top-left-corner'>{text.title}</h1>
                <section className='page-section--normal mb-[2rem]'>
                    <p className='p--highlighted'>{text.intro}</p>
                </section>
                <section className='flex flex-col gap-6 justify-center items-center'>
                    <TileInfo data={tileInfoData} />
                    <TopFiveThisX data={data} />
                    <MostPlayed
                        mostPlayedAlbums={data.mostPlayedAlbums}
                        mostPlayedArtists={data.mostPlayedArtists}
                        mostPlayedSongs={data.mostPlayedSongs}
                        mostActiveUser={userTemp}
                    />
                    <CurrentlyPlaying songs={data.currentlyPlaying} />
                </section>
            </div>
        </div>
    )
}

function formatDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    const parts = []
    if (h > 0) parts.push(`${h}h`)
    if (m > 0) parts.push(`${m}m`)
    if (s > 0 || parts.length === 0) parts.push(`${s}s`)
    return parts.join(' ')
}