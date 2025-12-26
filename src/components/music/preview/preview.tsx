import { cookies } from 'next/headers'
import { getActivity } from '@utils/api'
import MusicPreviewClient from './previewClient'

export default async function MusicPreview() {
    const data = await getActivity()
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang

    return <MusicPreviewClient test-id='music' initialData={data} lang={lang} />
}
