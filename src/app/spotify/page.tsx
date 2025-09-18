import no from '@text/spotify/no.json'
import en from '@text/spotify/en.json'
import { cookies } from 'next/headers'
import getActivity from '@utils/spotify/getActivity'
import SpotifyClient from './pageClient'

export default async function Spotify() {
    const lang = (await cookies()).get('lang')?.value || 'no'
    // eslint-disable-next-line
    const text: any = lang === 'en' ? {...en} : {...no}

    const data = await getActivity()

    return <SpotifyClient initialData={data} />
}
