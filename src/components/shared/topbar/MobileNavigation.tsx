'use client'

import Link from 'next/link'
import { SetStateAction, useContext, useEffect, useState } from 'react'
import no from '@text/layout/no.json'
import en from '@text/layout/en.json'
import AppContext from '@context/context'
import ArrowDown from '@components/svg/symbols/ArrowDown'
import ArrowOutward from '@components/svg/symbols/ArrowOutward'

export default function MobileNavigation({ open, setIsOpen }: {open:boolean, setIsOpen:React.Dispatch<SetStateAction<boolean>>}) {
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
            <Link onClick={close} href='/events' tabIndex={open ? 0 : -1}>
                <li className='mobile-nav_item'>{text.nav.events}</li>
            </Link>
            <Link onClick={close} href='/career' tabIndex={open ? 0 : -1}>
                <li className='mobile-nav_item'>{text.nav.jobad}</li>
            </Link>
            <Link onClick={close} href='/companies' tabIndex={open ? 0 : -1}>
                <li className='mobile-nav_item'>{text.nav.companies}</li>
            </Link>
            <Link onClick={close} href='https://exam.login.no' tabIndex={open ? 0 : -1}>
                <li className='mobile-nav_item'>{text.nav.exam}</li>
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
                    <li className='flex flex-row items-center mobile-nav_item'>
                        {text.nav.about}
                        <ArrowDown className='w-[1.5rem] h-[1.5rem] fill-white'/>
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
                    <a
                        title='Wiki'
                        href='https://wiki.login.no'
                        target='_blank'
                        rel='noreferrer'
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className='flex flex-row mobile-nav-dropdown_item'>
                            Wiki
                            <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-white'/>
                        </li>
                    </a>
                </div>
            </div>
        </nav>
    )
}
