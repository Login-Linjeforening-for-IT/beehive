import Contact from "@components/contact/Contact"
import no from '@text/companies/no.json'
import en from '@text/companies/en.json'
import getCookie from "@utils/getCookie"
import "./page.css"

const lang = getCookie('lang') as 'no' | 'en' || 'no'
const text = lang === 'en' ? en : no

export default function CompaniesPage() {
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
                            <i className="heading-2__icon material-symbols-sharp">
                                flowsheet
                            </i>
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
                            <i className="heading-2__icon logfont-bedkom"></i>
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
                            <i className="heading-2__icon logfont-ctfkom"></i>
                            {text.ctf.title}
                        </h2>
                        <p className="p--regular">{text.ctf.body}</p>
                    </section>
                    <section>
                        <h2 className="heading-2 heading-2--icon">
                            <i className="heading-2__icon material-symbols-sharp">campaign</i>
                            <span>{text.profiling.title}</span>
                        </h2>
                        <p className="p--regular">{text.profiling.body}</p>
                    </section>
                    <section>
                        <h2 className="heading-2 heading-2--icon">
                            <i className="heading-2__icon material-symbols-sharp">build</i>
                            <span>{text.workshop.title}</span>
                        </h2>
                        <p className="p--regular">{text.workshop.body}</p>
                    </section>
                </div>
                <Contact />
            </div>
        </div>
    )
};
