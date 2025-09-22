import { cookies } from 'next/headers'
import getActivity from '@utils/music/getActivity'
import MusicDashboardCurrent from './dashboards/current'
import MusicDashboardAll from './dashboards/all'
import MusicDashboardToday from './dashboards/today'

export default async function Music({ params }: { params: Promise<{ items: string[] }> }) {
    const item = (await params).items
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    const data = await getActivity()

    if (item.length === 2 && item[1] === 'today') {
        return <MusicDashboardToday lang={lang} initialData={data} />
    }

    if (item.length === 2 && item[1] === 'all') {
        return <MusicDashboardAll lang={lang} initialData={data} />
    }

    return <MusicDashboardCurrent lang={lang} initialData={data} />
}
