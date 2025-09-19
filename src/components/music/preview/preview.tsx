import { cookies } from 'next/headers'
import getActivity from '@utils/music/getActivity'
import MusicPreviewClient from './previewClient'

export default async function MusicPreview() {
    const data = await getActivity()
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang

    return (
        <MusicPreviewClient initialData={data} lang={lang} />
    )
}
