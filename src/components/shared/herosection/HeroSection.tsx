'use client'

import LoginLogo from "@components/svg/brandlogos/LoginLogo"
import Button from "@components/shared/button/Button"
import no from "@text/landing/no.json"
import en from "@text/landing/en.json"
import "./HeroSection.css"
import { useContext, useEffect, useState } from "react"
import AppContext from "@context/context"

export default function LandingPage() {
    const { lang } = useContext(AppContext)
    const [text, setText] = useState(lang === 'en' ? en : no)

    useEffect(() => {
        const text = lang === 'en' ? en : no
        setText(text)
    }, [lang])

    return (
        <div className="hero-section">
            <div className="hero-section_container">
                <div className="hero-section_top">
                    <picture className="hero-section_logo">
                        <LoginLogo />
                    </picture>
                    <div className="hero-section_content">
                        <span className="hero-section_top-text">
                            {text.heroSection.welcome}
                        </span>
                        <br />
                        <span className="hero-section_gradient-text">login.no</span>
                        <div className="hero-section_buttons">
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
