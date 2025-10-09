'use client'

import Link from 'next/link'
import no from '@text/landing/no.json'
import en from '@text/landing/en.json'
import useSWR from 'swr'
import CurrentlyPlayingCard from '../currentlyPlayingCard'
import PlayIcon from '../playIcon'

async function fetcher(url: string) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export default function MusicPreviewClient({ initialData, lang }: { initialData: Music, lang: Lang }) {
    const { data }: { data: Music } = useSWR('/api/music', fetcher, {
        refreshInterval: 30000,
        fallbackData: initialData,
    })
    const text = lang === 'no' ? no : en
    const songs = Array.isArray(data.currentlyListening) && data.currentlyListening.length > 0
        ? data.currentlyListening
        : []
    const uniqueSongs = Array.from(new Map(songs.map(s => [s.id, s])).values()).slice(0, 4)

    function SongPreview() {
        return  (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center w-full hover:overflow-visible'>
                {uniqueSongs.map((song) => <CurrentlyPlayingCard key={song.id} song={song} />)}
            </div>
        )
    }

    return (
        <>
            <section className='pt-[2rem] max-w-[var(--w-page)] 800px:px-[1rem] 800px:mx-auto 1000px:w-full'>
                <div className='flex justify-between items-center px-[2rem] 1000px:px-[1rem]'>
                    <div className='gap-2 flex place-items-center'>
                        <h2 className='py-[0.5rem] font-normal text-2xl'>
                            {text.musicPreview.title}
                        </h2>
                        <PlayIcon />
                    </div>
                    <Link href='/music' className='group relative block p-[.5em_1.5em_.5em_1em] leading-[1.4em] text-[1.2rem] font-medium h-[2.4em] after:content-[""] after:absolute after:w-[0.6em] after:h-[0.6em] after:top-[0.85em] after:right-[0.5em] after:border-r-[0.18em] after:border-b-[0.18em] after:border-solid after:border-[var(--color-link-primary)] after:transform after:rotate-[-45deg] after:z-[5] after:transition-all'>
                        <span className='hidden 350px:block group-hover:text-[var(--color-link-primary)]'>
                            {text.musicPreview.seeAll}
                        </span>
                    </Link>
                </div>
                <div className='px-4'>
                    <SongPreview />
                </div>
            </section>
            <hr className='hidden 800px:block 800px:border-0 800px:h-[0.15rem] 800px:bg-[var(--color-border-default)] 800px:my-0 800px:mx-[3rem] 1000px:my-[2rem] 1000px:mx-auto 1000px:max-w-[calc(var(--w-page)-4rem)]' />
        </>
    )
}
