import { cookies } from 'next/headers'
import getActivity from '@utils/music/getActivity'
import MusicClient from './pageClient'
import Intro from '@components/music/intro'
import no from '@text/music/no.json'
import en from '@text/music/en.json'
import Dashboards from '@components/music/dashboards'

export default async function Music() {
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    const data = await getActivity()
    const text = (lang === 'no' ? no : en)

    return (
        <div className='page-container'>
            <div className='page-section--normal space-y-4'>
                <Intro text={text} />
                <MusicClient lang={lang} initialData={data} />
                <Dashboards />
            </div>
        </div>
    )
}
