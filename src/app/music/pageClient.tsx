'use client'

import useSWR from 'swr'
import no from '@text/music/no.json'
import en from '@text/music/en.json'
import CurrentlyListening from '@components/music/currentlyListening'
import TopFiveThisX from '@components/music/topFiveThisX'
import MostPlayed from '@components/music/mostPlayed'
import TileInfo from '@components/music/tileInfo'
import MostX from '@components/music/mostx'
import PrivacyDisclaimer from '@components/privacy/disclaimer'

async function fetcher(url: string) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export default function Music({ initialData, lang }: { initialData: Music, lang: Lang }) {
    const text = (lang === 'no' ? no : en)
    const { data }: { data: Music } = useSWR('/api/music', fetcher, {
        refreshInterval: 5000,
        fallbackData: initialData,
    })

    return (
        <section className='flex flex-col justify-center items-center gap-4'>
            <PrivacyDisclaimer lang={lang} />
            <TileInfo data={data} text={text} />
            <MostPlayed
                lang={lang}
                mostPlayedAlbums={data.mostPlayedAlbums}
                mostPlayedArtists={data.mostPlayedArtists}
                mostPlayedSongs={data.mostPlayedSongs}
                mostPlayedEpisodes={data.mostPlayedEpisodes}
                mostActiveUsers={data.mostActiveUsers}
                mostSkippingUsers={data.mostSkippingUsers}
                currentlyListening={data.currentlyListening}
                activity={data.mostPlayedSongsPerDay}
            />
            <CurrentlyListening songs={data.currentlyListening} lang={lang} />
            <MostX
                lang={lang}
                mostLikedAlbums={data.mostLikedAlbums}
                mostLikedArtists={data.mostLikedArtists}
                mostLikedEpisodes={data.mostLikedEpisodes}
                mostLikedSongs={data.mostLikedSongs}
                mostSkippedAlbums={data.mostSkippedAlbums}
                mostSkippedArtists={data.mostSkippedArtists}
                mostSkippedSongs={data.mostSkippedSongs}
                mostSkippedEpisodes={data.mostSkippedEpisodes}
            />
            <TopFiveThisX lang={lang} data={data} />
        </section>
    )
}
