import React, { Ref, useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import no from '@text/layout/no.json'
import en from '@text/layout/en.json'
import ArrowDown from '@components/svg/symbols/ArrowDown'
import Heart from '@components/svg/symbols/Heart'
import Office from '@components/svg/symbols/Office'
import Book from '@components/svg/symbols/Book'
import ArrowOutward from '@components/svg/symbols/ArrowOutward'
import { getCookie } from '@utils/cookies'
import { language } from '../langtoggle/LangToggle'
import config from '@config'

export default function Navigation() {
    const [lang, setLang] = useState('no')
    const [text, setText] = useState(no)

    useEffect(() => {
        const text = lang === 'no' ? no : en
        setText(text)
    }, [lang])

    useEffect(() => {
        const temp = getCookie('lang')
        setLang(temp || 'no')
    }, [language])

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
        <nav className='hidden 800px:flex 800px:justify-between 800px:items-center 800px:w-fill max-w-[36rem]'>
            <Link href='/events'>
                <li className='list-none block no-underline text-base leading-4 p-3 font-medium cursor-pointer link--corner-hover'>{text.nav.events}</li>
            </Link>
            <Link href='/career'>
                <li className='list-none block no-underline text-base leading-4 p-3 font-medium cursor-pointer link--corner-hover'>{text.nav.jobad}</li>
            </Link>
            <Link href='/companies'>
                <li className='list-none block no-underline text-base leading-4 p-3 font-medium cursor-pointer link--corner-hover'>
                    {text.nav.companies}
                </li>
            </Link>
            <Link href={config.url.EXAM_URL}>
                <li className='list-none block no-underline text-base leading-4 p-3 font-medium cursor-pointer link--corner-hover'>{text.nav.exam}</li>
            </Link>
            <div className='main-nav-dropdown'>
                <div className='main-nav-dropdown_toggle' tabIndex={0}>
                    <div className='list-none no-underline text-base leading-4 p-3 font-medium cursor-pointer flex flex-row items-center '>
                        {text.nav.about}
                        <ArrowDown className='w-[1.5rem] h-[1.5rem] fill-white'/>
                    </div>
                    <div className='main-nav-dropdown_wrapper'>
                        <ul className='main-nav-dropdown_items'>
                            <Link
                                href='/about'
                                ref={navItemRefs.current[0] as Ref<HTMLAnchorElement>}
                                onClick={handleClick}
                            >
                                <li className='main-nav-dropdown_item link--corner-hover'>
                                    <i className='logfont-login main-nav-dropdown_leading-icon' />
                                    {text.nav.general}
                                </li>
                            </Link>
                            <Link
                                href='verv'
                                ref={navItemRefs.current[1] as Ref<HTMLAnchorElement>}
                                onClick={handleClick}
                            >
                                <li className='flex flex-row items-center main-nav-dropdown_item link--corner-hover'>
                                    <Heart className='w-[1.5rem] h-[1.5rem] fill-white mr-[0.7rem]' />
                                    {text.nav.verv}
                                </li>
                            </Link>
                            <Link
                                href='/fond'
                                ref={navItemRefs.current[2] as Ref<HTMLAnchorElement>}
                                onClick={handleClick}
                            >
                                <li className='flex flex-row items-center main-nav-dropdown_item link--corner-hover'>
                                    <Office className='w-[1.5rem] h-[1.5rem] fill-white mr-[0.7rem]' />
                                    {text.nav.fondet}
                                </li>
                            </Link>
                            <a
                                title='Wiki'
                                href={config.url.WIKI_URL}
                                target='_blank'
                                rel='noreferrer'
                                // @ts-ignore
                                ref={navItemRefs.current[3]}
                                onClick={handleClick}
                            >
                                <li className='flex flex-row items-center main-nav-dropdown_item link--corner-hover'>
                                    <Book className='w-[1.5rem] h-[1.5rem] fill-white mr-[0.7rem]' />
                                    Wiki
                                    <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-white'/>
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
