'use client'

import Link from 'next/link'
import { SetStateAction, useEffect, useState } from 'react'
import no from '@text/layout/no.json'
import en from '@text/layout/en.json'
import ArrowDown from '@components/svg/symbols/ArrowDown'
import ArrowOutward from '@components/svg/symbols/ArrowOutward'
import config from '@config'

type MobileNavigationProps = {
    lang: Lang
    open: boolean,
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

export default function MobileNavigation({ lang, open, setIsOpen }: MobileNavigationProps) {
    const [text, setText] = useState(no)

    useEffect(() => {
        const text = lang === 'no' ? no : en
        setText(text)
    }, [lang])

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    function toggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen)
    }

    function close() {
        setIsOpen(false)
        setIsDropdownOpen(false)
    }

    return (
        <nav className={`mobile-nav${open ? ' mobile-nav--open' : ''}`}>
            <Link onClick={close} href='/events' tabIndex={open ? 0 : -1}>
                <li className='mobile-nav_item'>{text.nav.events}</li>
            </Link>
            <Link onClick={close} href='/career' tabIndex={open ? 0 : -1}>
                <li className='mobile-nav_item'>{text.nav.jobad}</li>
            </Link>
            <Link onClick={close} href='/companies' tabIndex={open ? 0 : -1}>
                <li className='mobile-nav_item'>{text.nav.companies}</li>
            </Link>
            <Link target='_blank' onClick={close} href={config.url.EXAM_URL} tabIndex={open ? 0 : -1}>
                <li className='flex flex-row gap-2 mobile-nav_item'>
                    {text.nav.exam}
                    <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-[var(--color-primary-500)]' />
                </li>

            </Link>
            <div
                className={`mobile-nav-dropdown${
                    isDropdownOpen ? ' mobile-nav-dropdown--open' : ''
                }`}
            >
                <button
                    className='mobile-nav-dropdown_toggle'
                    onClick={toggleDropdown}
                    tabIndex={open ? 0 : -1}
                >
                    <li className='flex flex-row gap-2 items-center mobile-nav_item'>
                        {text.nav.about}
                        <ArrowDown className={`w-[1.5rem] h-[1.5rem] fill-white transition-transform duration-400 ${isDropdownOpen ? 'rotate-180' : ''}`}/>
                    </li>
                </button>
                <div className='mobile-nav-dropdown_items'>
                    <Link
                        onClick={close}
                        href='/about'
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className='mobile-nav-dropdown_item'>{text.nav.general}</li>
                    </Link>
                    <Link
                        onClick={close}
                        href='/verv'
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className='mobile-nav-dropdown_item'>{text.nav.verv}</li>
                    </Link>
                    <Link
                        onClick={close}
                        href='/fond'
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className='mobile-nav-dropdown_item'>{text.nav.fondet}</li>
                    </Link>
                    <Link
                        title='Wiki'
                        href={config.url.WIKI_URL}
                        target='_blank'
                        rel='noreferrer'
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className='flex flex-row gap-2 mobile-nav-dropdown_item'>
                            Wiki
                            <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-[var(--color-primary-500)]'/>
                        </li>
                    </Link>
                </div>
            </div>
        </nav>
    )
}