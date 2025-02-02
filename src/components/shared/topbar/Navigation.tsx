import React, { Ref, useCallback, useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import no from '@text/layout/no.json'
import en from '@text/layout/en.json'
import AppContext from '@context/context'
import ArrowDown from '@components/svg/symbols/ArrowDown'
import Heart from '@components/svg/symbols/Heart'
import Office from '@components/svg/symbols/Office'
import Book from '@components/svg/symbols/Book'
import ArrowOutward from '@components/svg/symbols/ArrowOutward'

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
        <nav className='main-nav'>
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
            <div className='main-nav-dropdown'>
                <div className='main-nav-dropdown_toggle' tabIndex={0}>
                    <div className='list-none no-underline text-base leading-4 p-3 font-medium cursor-pointer flex flex-row items-center '>
                        {text.nav.about}
                        <ArrowDown size='1.5rem' fill='white'/>
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
                                    <Heart size='1.5rem' fill='white' className={'mr-[0.7rem]'} />
                                    {text.nav.verv}
                                </li>
                            </Link>
                            <Link
                                href='/fond'
                                ref={navItemRefs.current[2] as Ref<HTMLAnchorElement>}
                                onClick={handleClick}
                            >
                                <li className='flex flex-row items-center main-nav-dropdown_item link--corner-hover'>
                                    <Office size='1.5rem' fill='white' className={'mr-[0.7rem]'} />
                                    {text.nav.fondet}
                                </li>
                            </Link>
                            <a
                                title='Wiki'
                                href='https://wiki.login.no'
                                target='_blank'
                                rel='noreferrer'
                                // @ts-ignore
                                ref={navItemRefs.current[3]}
                                onClick={handleClick}
                            >
                                <li className='flex flex-row items-center main-nav-dropdown_item link--corner-hover'>
                                    <Book size='1.5rem' fill='white' className={'mr-[0.7rem]'} />
                                    Wiki
                                    <ArrowOutward size='1.5rem' fill='white' className=''/>
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
