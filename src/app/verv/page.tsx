import ImageCarousel from "@components/imagecarousel/ImageCarousel"
import Button from "@components/button/Button"
import VervTabs from "./VervTabs"
import no from '@text/verv/no.json'
import en from '@text/verv/en.json'
import getCookie from "@utils/getCookie"

import "./page.css"

const lang = getCookie('lang') as 'no' | 'en' || 'no'
const text = lang === 'en' ? en : no


export default function Verv() {
    const slides = []

    for (let i = 1; i <= 15; i++) {
        slides.push({
            imgSrc: `https://cdn.login.no/img/imagecarousel/${i}.jpg`,
            title: text.imageCarousel[String(i) as keyof typeof text.imageCarousel].title,
            description: text.imageCarousel[String(i) as keyof typeof text.imageCarousel].description,
        })
    }

    return (
        <div className="verv-page page-container">
            <div className="page-section--normal">
                <h1 className="heading-1 heading-1--top-left-corner">{text.title}</h1>
            </div>
            <section className="verv-page__section verv-intro page-section--normal">
                <p className="verv-intro__p p--highlighted">
                    {text.intro}
                </p>
                <p className="verv-intro__p p--regular">
                    {text.intro2}
                </p>
            </section>
            <section className="verv-page__section page-section--full-width">
                <ImageCarousel slides={slides} />
            </section>
            <section className="verv-committees page-section--normal">
                <h2 className="heading-2">{text.committeeSection.title}</h2>
                <p className="p--regular">{text.committeeSection.intro}</p>
            </section>
            <VervTabs />
            <section className="verv-page__section verv-apply page-section--normal">
                <h2
                    className="heading-2"
                >
                    {text.apply.title}
                </h2>
                <p
                    className="p--regular"
                    dangerouslySetInnerHTML={{ __html:  text.apply.body }}
                />
                {/* @ts-ignore */}
                <Button
                    href="https://forms.gle/nQrJuqo3C9URLRM29"
                    size="xl"
                    className="verv-apply__button"
                >
                    {text.apply.action}
                </Button>
            </section>
        </div>
    )
};
