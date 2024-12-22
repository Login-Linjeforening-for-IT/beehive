import { config } from "../../Constants"
import CommitteeTabs from "./CommitteeTabs.js"
import StudyProgramsAcordion from "./StudyProgramsAccordion"
import DecoratedPicture from "../../components/images/decoratedpicture/DecoratedPicture"
import Contact from "../../components/contact/Contact"
import no from '@text/about/no.json'
import en from '@text/about/en.json'
import getCookie from "@/utils/getCookie"
import "./page.css"

const lang = getCookie('lang') as 'no' | 'en' || 'no'
const text = lang === 'en' ? en : no

export default function About() {
    return (
        <div className="page-container">
            <h1 className="page-section--normal heading-1 heading-1--top-left-corner">
                {text.title}
            </h1>
            <section className="page-section--normal about-section about-intro">
                <p
                    className="about-intro__p p--highlighted"
                    dangerouslySetInnerHTML={{ __html: text.intro }}
                />
                <div className="about-intro__grid-container">
                    <StudyProgramsAcordion />
                    <DecoratedPicture
                        imgurl={config.url.CDN_URL + "/img/styret2.jpg"}
                        variant={3}
                        cornerSize={90}
                        w={300}
                        h={200}
                        cover={true}
                        className="about-intro__picture"
                    />
                </div>
            </section>
            <section className="page-section--normal about-section">
                <h2 className="heading-2">{text.about.title}</h2>
                <div className="p--columns">
                    <p
                        className="p--highlighted"
                        dangerouslySetInnerHTML={{ __html: text.about.intro }}
                    />
                    <p
                        className="p--regular"
                        dangerouslySetInnerHTML={{ __html: text.about.body.p1 }}
                    />
                    <p
                        className="p--regular"
                        dangerouslySetInnerHTML={{ __html: text.about.body.p2 }}
                    />
                </div>
            </section>
            <section className="page-section--normal about-committees">
                <h2 className="heading-2">{text.committeeSection.title}</h2>
                <p className="p--regular">{text.committeeSection.intro}</p>
            </section>
            <CommitteeTabs />
            <section className="page-section--normal about-section about-public-docs">
                <h2 className="heading-2">{text.publicDocs.title}</h2>
                <p
                    className="p--regular"
                    dangerouslySetInnerHTML={{ __html: text.publicDocs.body }}
                />
                <ul className="list">
                    <li>{text.publicDocs.bulletPoints.agendas}</li>
                    <li>{text.publicDocs.bulletPoints.minutes}</li>
                    <li>{text.publicDocs.bulletPoints.budgets}</li>
                    <li>{text.publicDocs.bulletPoints.honoraryMember}</li>
                    <li>{text.publicDocs.bulletPoints.bylaws}</li>
                </ul>
            </section>
            <div className="page-section--normal">
                <Contact />
            </div>
        </div>
    )
}
