import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import no from '@text/layout/no.json'
import en from '@text/layout/en.json'
import AppContext from '@context/context'

export default function Navigation() {
    const { lang } = useContext(AppContext)
    const [text, setText] = useState(no)

    useEffect(() => {
        const text = lang === 'en' ? en : no
        setText(text)
    }, [lang])

    const navItemRefs = useRef([
        React.createRef(),
        React.createRef(),
        React.createRef(),
    ])

    // each dropdown item will unfocus (blur) whenever it is clicked.
    // this prevents it from staying visble after removing the mouse.
    // this allows for showing the dropdown on focus and hover without
    // being focused anfter clicking it. Accessibility smooth as hell
    const handleClick = useCallback(() => {
        navItemRefs.current.forEach((ref) => {
            if (ref.current) {
                // @ts-ignore
                ref.current.blur()
            }
        })
    }, [navItemRefs])

    return (
        <nav className="main-nav">
            <Link href="/events">
                <li className="main-nav_item link--corner-hover">{text.nav.events}</li>
            </Link>
            <Link href="/career">
                <li className="main-nav_item link--corner-hover">{text.nav.jobad}</li>
            </Link>
            <Link href="/companies">
                <li className="main-nav_item link--corner-hover">
                    {text.nav.companies}
                </li>
            </Link>
            <div className="main-nav-dropdown">
                <div className="main-nav-dropdown_toggle" tabIndex={0}>
                    <div className="main-nav_item">
                        {text.nav.about}
                        <i className="material-symbols-sharp main-nav-dropdown_toggle-arrow">
                            expand_more
                        </i>
                    </div>
                    <div className="main-nav-dropdown_wrapper">
                        <ul className="main-nav-dropdown_items">
                            <Link
                                href="/about"
                                ref={navItemRefs.current[0] as any}
                                onClick={handleClick}
                            >
                                <li className="main-nav-dropdown_item link--corner-hover">
                                    <i className="logfont-login main-nav-dropdown_leading-icon"></i>
                                    {text.nav.general}
                                </li>
                            </Link>
                            <Link
                                href="verv"
                                ref={navItemRefs.current[1] as any}
                                onClick={handleClick}
                            >
                                <li className="main-nav-dropdown_item link--corner-hover">
                                    <i className="material-symbols-sharp main-nav-dropdown_leading-icon">
                                        favorite
                                    </i>
                                    {text.nav.verv}
                                </li>
                            </Link>
                            <Link
                                href="/fond"
                                ref={navItemRefs.current[2] as any}
                                onClick={handleClick}
                            >
                                <li className="main-nav-dropdown_item link--corner-hover">
                                    <i className="fund-section_header-icon material-symbols-sharp main-nav-dropdown_leading-icon">
                                        corporate_fare
                                    </i>
                                    {text.nav.fondet}
                                </li>
                            </Link>
                            <a
                                title="Wiki"
                                href="https://wiki.login.no"
                                target="_blank"
                                rel="noreferrer"
                                // @ts-ignore
                                ref={navItemRefs.current[3]}
                                onClick={handleClick}
                            >
                                <li className="main-nav-dropdown_item link--corner-hover">
                                    <i className="material-symbols-sharp main-nav-dropdown_leading-icon">
                                        import_contacts
                                    </i>
                                    Wiki
                                    <i className="material-symbols-sharp wiki_arrow">
                                        arrow_outward
                                    </i>
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
