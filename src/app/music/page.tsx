import { cookies } from 'next/headers'
import getActivity from '@utils/music/getActivity'
import MusicClient from './pageClient'
import Intro from '@components/music/intro'
import no from '@text/music/no.json'
import en from '@text/music/en.json'
import Dashboards from '@components/music/dashboards'
import { MessageSquareWarning } from 'lucide-react'

export default async function Music() {
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    const data = await getActivity()
    const text = (lang === 'no' ? no : en)

    const error = {
        no: 'Vi opplever for tiden ustabilitet med Musikk APIet grunnet migrering av databasen for å kunne skalere bedre over tid. Databasen er ferdig migrert, men dataen henger litt etter. Problemene er forventet å gå seg til gradvis.',
        en: 'We are currently experiencing instability towards the Music API due to migration of the database to scale better over time. The migration is complete, but the data still partially follows the old schema. The problems are expected to gradually decay.'
    }

    return (
        <div className='page-container'>
            <div className='page-section--normal space-y-4'>
                <div className='w-full bg-red-500 p-2 rounded-lg'>
                    <h1 className='flex gap-2 text-[var(--color-text-main)]'><MessageSquareWarning /> {lang === 'no' ? error.no : error.en}</h1>
                </div>
                <Intro text={text} />
                <MusicClient lang={lang} initialData={data} />
                <Dashboards lang={lang} />
            </div>
        </div>
    )
}
