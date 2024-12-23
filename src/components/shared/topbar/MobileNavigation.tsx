'use client'

import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import no from '@text/layout/no.json'
import en from '@text/layout/en.json'
import AppContext from '@context/context'

export default function MobileNavigation({ open, setIsOpen }: any) {
    const { lang } = useContext(AppContext)
    const [text, setText] = useState(no)

    useEffect(() => {
        const text = lang === 'en' ? en : no
        setText(text)
    }, [lang])

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    function close() {
        setIsOpen(false)
        setIsDropdownOpen(false)
    }

    return (
        <nav className={`mobile-nav${open ? ' mobile-nav--open' : ''}`}>
            <Link onClick={close} href="/events" tabIndex={open ? 0 : -1}>
                <li className="mobile-nav_item">{text.nav.events}</li>
            </Link>
            <Link onClick={close} href="/career" tabIndex={open ? 0 : -1}>
                <li className="mobile-nav_item">{text.nav.jobad}</li>
            </Link>
            <Link onClick={close} href="/companies" tabIndex={open ? 0 : -1}>
                <li className="mobile-nav_item">{text.nav.companies}</li>
            </Link>
            <div
                className={`mobile-nav-dropdown${
                    isDropdownOpen ? ' mobile-nav-dropdown--open' : ''
                }`}
            >
                <button
                    className="mobile-nav-dropdown_toggle"
                    onClick={toggleDropdown}
                    tabIndex={open ? 0 : -1}
                >
                    <li className="mobile-nav_item">
                        {text.nav.about}
                        <i className="material-symbols-sharp mobile-nav-dropdown_toggle-arrow">
                            expand_more
                        </i>
                    </li>
                </button>
                <div className="mobile-nav-dropdown_items">
                    <Link
                        onClick={close}
                        href="/about"
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className="mobile-nav-dropdown_item">{text.nav.general}</li>
                    </Link>
                    <Link
                        onClick={close}
                        href="/verv"
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className="mobile-nav-dropdown_item">{text.nav.verv}</li>
                    </Link>
                    <Link
                        onClick={close}
                        href="/fond"
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className="mobile-nav-dropdown_item">{text.nav.fondet}</li>
                    </Link>
                    <a
                        title="Wiki"
                        href="https://wiki.login.no"
                        target="_blank"
                        rel="noreferrer"
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className="mobile-nav-dropdown_item">
                            Wiki
                            <i className="material-symbols-sharp wiki_arrow">
                                arrow_outward
                            </i>
                        </li>
                    </a>
                </div>
            </div>
        </nav>
    )
}
