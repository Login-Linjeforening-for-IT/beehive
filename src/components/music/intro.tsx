
import { Comic_Neue } from 'next/font/google'

const comicNeue = Comic_Neue({ subsets: ['latin'], weight: ['400', '700'] })

export default function Intro({ text }: { text: MusicText }) {
    return (
        <>
            <div className='grid grid-cols-2 w-full'>
                <h1 className='heading-1 heading-1--top-left-corner'>{text.title}</h1>
                <h1 className={`${comicNeue.className} text-right text-lg text-[var(--color-primary)] self-center`}>#LoginWrapped</h1>
            </div>
            <section className='page-section--normal'>
                <p className='p--highlighted'>{text.intro}</p>
            </section>
        </>
    )
}
