import { cookies } from 'next/headers'
import getActivity from '@utils/music/getActivity'
import MusicClientDisplay from './pageClient'

export default async function Music() {
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    const data = await getActivity()

    return <MusicClientDisplay lang={lang} initialData={data} />
}
