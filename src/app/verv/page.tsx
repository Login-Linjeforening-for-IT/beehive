'use client'

import ImageCarousel from '@components/shared/imagecarousel/ImageCarousel'
import Button from '@components/shared/button/Button'
import VervTabs from './VervTabs'
import no from '@text/verv/no.json'
import en from '@text/verv/en.json'
import { useContext, useEffect, useState } from 'react'
import './page.css'
import AppContext from '@context/context'

export default function Verv() {
    const { lang } = useContext(AppContext)
    const [text, setText] = useState(no)

    useEffect(() => {
        const text = lang === 'en' ? en : no
        // eslint-disable-next-line
        setText(text as any)
    }, [lang])

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
            <section className="verv-page_section verv-intro page-section--normal">
                <p className="verv-intro_p p--highlighted">
                    {text.intro}
                </p>
                <p className="verv-intro_p p--regular">
                    {text.intro2}
                </p>
            </section>
            <section className="verv-page_section page-section--full-width">
                {/* @ts-ignore */}
                <ImageCarousel slides={slides} />
            </section>
            <section className="verv-committees page-section--normal">
                <h2 className="heading-2">{text.committeeSection.title}</h2>
                <p className="p--regular">{text.committeeSection.intro}</p>
            </section>
            <VervTabs />
            <section className="verv-page_section verv-apply page-section--normal">
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
                    className="verv-apply_button"
                >
                    {text.apply.action}
                </Button>
            </section>
        </div>
    )
}
