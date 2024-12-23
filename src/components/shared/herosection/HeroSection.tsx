'use client'

import LoginLogo from "@components/svg/brandlogos/LoginLogo"
import Button from "@components/shared/button/Button"
import getCookie from "@utils/getCookie"
import no from "@text/landing/no.json"
import en from "@text/landing/en.json"
import "./HeroSection.css"
import { useEffect, useState } from "react"

export default function LandingPage() {
    const lang = getCookie('lang') as 'no' | 'en' || 'no'
    const [text, setText] = useState(no)

    useEffect(() => {
        const text = lang === 'en' ? en : no
        setText(text)
    }, [lang])

    return (
        <div className="hero-section">
            <div className="hero-section__container">
                <div className="hero-section__top">
                    <picture className="hero-section__logo">
                        <LoginLogo />
                    </picture>
                    <div className="hero-section__content">
                        <span className="hero-section__top-text">
                            {text.heroSection.welcome}
                        </span>
                        <br />
                        <span className="hero-section__gradient-text">login.no</span>
                        <div className="hero-section__buttons">
                            {/* @ts-ignore */}
                            <Button
                                href="/events"
                                leadingIcon={<i className="material-symbols-sharp">event</i>}
                                variant="primary"
                            >
                                {text.heroSection.secondaryButton}
                            </Button>
                            {/* @ts-ignore */}
                            <Button
                                variant="ghost"
                                href="/about"
                                leadingIcon={<i className="material-symbols-sharp">school</i>}
                            >
                                {text.heroSection.primaryButton}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
