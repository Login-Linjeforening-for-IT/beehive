import Contact from '@components/shared/contact/Contact'
import no from '@text/companies/no.json'
import en from '@text/companies/en.json'
import Flowsheet from '@components/svg/symbols/Flowsheet'
import Megaphone from '@components/svg/symbols/Megaphone'
import Wrench from '@components/svg/symbols/Wrench'
import { cookies } from 'next/headers'

export default async function CompaniesPage() {
    const lang = (await cookies()).get('lang')?.value || 'no'
    const text = lang === 'no' ? no : en

    return (
        <div className='page-container'>
            <div className='page-section--normal'>
                <h1 className='heading-1 heading-1--top-left-corner'>
                    {text.title}
                </h1>
                <section>
                    <p className='p--highlighted'>{text.intro}</p>
                </section>
                <div className='grid grid-cols-1 gap-y-[1rem] max-w-[45rem] mb-[3rem] 1000px:grid-cols-2 1000px:gap-x-[4rem] 1000px:gap-y-[2rem] 1000px:mb-[5rem] 1000px:max-w-none'>
                    <section>
                        <h2 className='heading-2 heading-2--icon'>
                            <Flowsheet className='w-[3rem] h-[3rem] fill-white mr-[0.4em]' />
                            <span>{text.bedpres.title}</span>
                        </h2>
                        <p className='p--regular'>{text.bedpres.body}</p>
                        <p className='p--regular'>
                            {text.bedpres.footer1}
                            <a
                                className='link link--primary link--underscore-hover'
                                href='mailto:bedpres@login.no'
                            >
                                bedpres@login.no
                            </a>
                            {text.bedpres.footer2}
                        </p>
                    </section>
                    <section>
                        <h2 className='heading-2 heading-2--icon'>
                            <i className='heading-2_icon logfont-bedkom' />
                            {text.cyberdays.title}
                        </h2>
                        <p className='p--regular'>{text.cyberdays.body}</p>
                        <p className='p--regular'>
                            {text.cyberdays.footer1}
                            <a
                                className='link link--primary link--underscore-hover'
                                href='mailto:cyberdagene@login.no'
                            >
                                cyberdagene@login.no
                            </a>
                            {text.cyberdays.footer2}
                        </p>
                    </section>
                    <section>
                        <h2 className='heading-2'>
                            <i className='heading-2_icon logfont-ctfkom' />
                            {text.ctf.title}
                        </h2>
                        <p className='p--regular'>{text.ctf.body}</p>
                    </section>
                    <section>
                        <h2 className='heading-2 heading-2--icon'>
                            <Megaphone className='w-[3rem] h-[3rem] fill-white mr-[0.4em]' />
                            <span>{text.profiling.title}</span>
                        </h2>
                        <p className='p--regular'>{text.profiling.body}</p>
                    </section>
                    <section>
                        <h2 className='heading-2 heading-2--icon'>
                            <Wrench className='w-[3rem] h-[3rem] fill-white mr-[0.4em]' />
                            <span>{text.workshop.title}</span>
                        </h2>
                        <p className='p--regular'>{text.workshop.body}</p>
                    </section>
                </div>
                <Contact />
            </div>
        </div>
    )
}
