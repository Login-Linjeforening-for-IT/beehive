'use client'

import Contact from '@components/shared/contact/Contact'
import no from '@text/companies/no.json'
import en from '@text/companies/en.json'
import './page.css'
import { useContext } from 'react'
import AppContext from '@context/context'
import Flowsheet from '@components/svg/symbols/Flowsheet'
import Megaphone from '@components/svg/symbols/Megaphone'
import Wrench from '@components/svg/symbols/Wrench'

export default function CompaniesPage() {
    const { lang } = useContext(AppContext)
    const text = lang === 'en' ? en : no

    return (
        <div className="page-container">
            <div className="page-section--normal">
                <h1 className="heading-1 heading-1--top-left-corner">
                    {text.title}
                </h1>
                <section>
                    <p className="p--highlighted">{text.intro}</p>
                </section>
                <div className="companies-info">
                    <section>
                        <h2 className="heading-2 heading-2--icon">
                            <Flowsheet size="3rem" fill="white" className="mr-[0.4em]" />
                            <span>{text.bedpres.title}</span>
                        </h2>
                        <p className="p--regular">{text.bedpres.body}</p>
                        <p className="p--regular">
                            {text.bedpres.footer1}
                            <a
                                className="link link--primary link--underscore-hover"
                                href="mailto:bedpres@login.no"
                            >
                                bedpres@login.no
                            </a>
                            {text.bedpres.footer2}
                        </p>
                    </section>
                    <section>
                        <h2 className="heading-2 heading-2--icon">
                            <i className="heading-2_icon logfont-bedkom"></i>
                            {text.cyberdays.title}
                        </h2>
                        <p className="p--regular">{text.cyberdays.body}</p>
                        <p className="p--regular">
                            {text.cyberdays.footer1}
                            <a
                                className="link link--primary link--underscore-hover"
                                href="mailto:cyberdagene@login.no"
                            >
                                cyberdagene@login.no
                            </a>
                            {text.cyberdays.footer2}
                        </p>
                    </section>
                    <section>
                        <h2 className="heading-2">
                            <i className="heading-2_icon logfont-ctfkom"></i>
                            {text.ctf.title}
                        </h2>
                        <p className="p--regular">{text.ctf.body}</p>
                    </section>
                    <section>
                        <h2 className="heading-2 heading-2--icon">
                            <Megaphone size="3rem" fill="white" className="mr-[0.4em]" />
                            <span>{text.profiling.title}</span>
                        </h2>
                        <p className="p--regular">{text.profiling.body}</p>
                    </section>
                    <section>
                        <h2 className="heading-2 heading-2--icon">
                            <Wrench size="3rem" fill="white" className="mr-[0.4em]" />
                            <span>{text.workshop.title}</span>
                        </h2>
                        <p className="p--regular">{text.workshop.body}</p>
                    </section>
                </div>
                <Contact />
            </div>
        </div>
    )
}
