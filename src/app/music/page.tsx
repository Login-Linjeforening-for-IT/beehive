import no from '@text/music/no.json'
import en from '@text/music/en.json'
import { cookies } from 'next/headers'
import getActivity from '@utils/music/getActivity'
import MusicClient from './pageClient'

export default async function Music() {
    const lang = (await cookies()).get('lang')?.value || 'no'
    // eslint-disable-next-line
    const text: any = lang === 'en' ? {...en} : {...no}

    const data = await getActivity()

    return <MusicClient initialData={data} />
}
