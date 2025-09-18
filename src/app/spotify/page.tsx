import no from '@text/spotify/no.json'
import en from '@text/spotify/en.json'
import { cookies } from 'next/headers'
import getActivity from '@utils/spotify/getActivity'
import AverageDuration from '@components/spotify/duration'
import CurrentlyPlaying from '@components/spotify/currentlyPlaying'
import TopFiveThisX from '@components/spotify/topFiveThisX'

export default async function Spotify() {
    const lang = (await cookies()).get('lang')?.value || 'no'
    // eslint-disable-next-line
    const text: any = lang === 'en' ? {...en} : {...no}

    const data = await getActivity()

    return (
        <div className='page-container'>
            <div className='page-section--normal'>
                <h1 className='heading-1 heading-1--top-left-corner'>{text.title}</h1>
                <AverageDuration duration={data.averageDuration} />
                <CurrentlyPlaying songs={data.currentlyPlaying} />
                <TopFiveThisX data={data} />
                <p>{JSON.stringify(data)}</p>
            </div>
        </div>
    )
}
