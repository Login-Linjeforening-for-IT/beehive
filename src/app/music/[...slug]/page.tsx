import { cookies } from 'next/headers'
import getActivity from '@utils/music/getActivity'
import CurrentlyPlaying from '@components/music/currentlyPlaying'

export default async function Music() {
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    const data = await getActivity()

    return (
        <div className={`grid place-items-center mx-8 ${data.currentlyPlaying.length > 12 ? 'pt-3' : 'pt-8'}`}>
            <CurrentlyPlaying expanded={true} songs={data.currentlyPlaying} lang={lang} />
        </div>
    )
}
