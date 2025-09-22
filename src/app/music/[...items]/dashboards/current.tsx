'use client'

import useSWR from 'swr'
import CurrentlyPlaying from '@components/music/currentlyPlaying'
import { useEffect } from 'react'
import { getCookie, removeCookie } from '@utils/cookies'

async function fetcher(url: string) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export default function MusicDashboardCurrent({ initialData, lang }: { initialData: Music, lang: Lang }) {
    const { data }: { data: Music } = useSWR('/api/music', fetcher, {
        refreshInterval: 5000,
        fallbackData: initialData,
    })

    useEffect(() => {
        const shouldReload = getCookie('shouldReload')
        if (shouldReload) {
            removeCookie('shouldReload')
            window.location.reload()
        }
    }, [])

    return (
        <div className={`grid place-items-center mx-8 ${data.currentlyPlaying.length > 12 ? 'pt-3' : 'pt-8'}`}>
            <CurrentlyPlaying expanded={true} songs={data.currentlyPlaying} lang={lang} />
        </div>
    )
}
