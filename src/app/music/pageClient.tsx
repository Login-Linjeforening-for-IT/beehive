'use client'

import useSWR from 'swr'
import no from '@text/music/no.json'
import en from '@text/music/en.json'
import CurrentlyPlaying from '@components/music/currentlyPlaying'
import TopFiveThisX from '@components/music/topFiveThisX'
import { MostPlayed } from '@components/music/mostPlayed'
import { TileInfo } from '@components/music/tileInfo'
import { Comic_Neue } from 'next/font/google'
import { Mostx } from '@components/music/mostx'

const comicNeue = Comic_Neue({ subsets: ['latin'], weight: ['400','700'] })

async function fetcher(url: string) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export default function Music({ initialData, lang }: { initialData: Music, lang: Lang }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const text = (lang === 'no' ? no : en) as any
    const { data }: { data: Music } = useSWR('/api/music', fetcher, {
        refreshInterval: 10000,
        fallbackData: initialData,
    })


    return (
        <div className='page-container'>
            <div className='page-section--normal'>
                <div className='grid grid-cols-2 w-full'>
                    <h1 className='heading-1 heading-1--top-left-corner'>{text.title}</h1>
                    <h1 className={`${comicNeue.className} text-right text-lg text-[var(--color-primary)] self-center`}>#LoginWrapped</h1>
                </div>
                <section className='page-section--normal'>
                    <p className='p--highlighted'>{text.intro}</p>
                </section>
                <section className='flex flex-col justify-center items-center gap-4'>
                    <TileInfo data={data} text={text} />
                    <MostPlayed
                        mostPlayedAlbums={data.mostPlayedAlbums}
                        mostPlayedArtists={data.mostPlayedArtists}
                        mostPlayedSongs={data.mostPlayedSongs}
                        mostActiveUsers={data.mostActiveUsers}
                    />
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <Mostx
                            mostLikedAlbums={data.mostLikedAlbums}
                            mostLikedArtists={data.mostLikedArtists}
                            mostLikedSongs={data.mostLikedSongs}
                            mostSkippedAlbums={data.mostSkippedAlbums}
                            mostSkippedArtists={data.mostSkippedArtists}
                            mostSkippedSongs={data.mostSkippedSongs}
                        />
                    </div>
                    <TopFiveThisX data={data} />
                    <CurrentlyPlaying songs={data.currentlyPlaying} />
                </section>
            </div>
        </div>
    )
}
