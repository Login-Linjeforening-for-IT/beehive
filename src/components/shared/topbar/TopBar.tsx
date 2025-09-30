'use client'

import { useState } from 'react'
import Navigation from './Navigation'
import MobileNavigation from './MobileNavigation'
import LoginLogoSmall from '@components/svg/brandlogos/LoginLogoSmall'
import LangToggle from '@components/shared/langtoggle/LangToggle'
import ThemeToggle from '../themetoggle/themeToggle'
import Link from 'next/link'
import './TopBar.css'
import { LogoConsoleOutput } from '@utils/ConsoleOutput'
import { LogOut } from 'lucide-react'

type TopBarProps = {
    lang: Lang
    onlyLogo?: boolean
    theme: string
    token: string | null
}

export default function TopBar({lang, onlyLogo, token}: TopBarProps) {
    const [isOpen, setIsOpen] = useState(false)
    function toggle() {
        setIsOpen(!isOpen)
    }

    LogoConsoleOutput()

    if (onlyLogo) {
        return (
            <div className={`flex w-[97.5vw] max-w-[97.5vw] m-auto p-[0.5rem] h-[var(--h-topbar)] transition duration-500 800px:justify-between 800px:p-[1rem] ${isOpen ? 'topbar--open' : ''}`}>
                <div className='block h-[3rem] p-[0.2rem] 800px:p-0'>
                    <Link href='/' onClick={(e) => { e.preventDefault(); window.location.href = '/' }}>
                        <LoginLogoSmall />
                    </Link>
                </div>
                <MobileNavigation lang={lang} open={isOpen} setIsOpen={setIsOpen} />
            </div>
        )
    }

    return (
        <div className={`flex max-w-[calc(var(--w-page)+2rem)] w-full m-auto p-[0.5rem] h-[var(--h-topbar)] transition duration-500 800px:justify-between 800px:p-[1rem] ${isOpen ? 'topbar--open' : ''}`}>
            <div className='block h-[3rem] p-[0.2rem] 800px:p-0'>
                <Link href='/' onClick={isOpen ? toggle : () => {}} >
                    <LoginLogoSmall />
                </Link>
            </div>
            <Navigation lang={lang} />
            <nav className='flex w-[calc(100vw-8rem)] justify-end h-[3rem] mr-[1rem] 800px:w-fit 800px:mr-0'>
                <ThemeToggle />
                <LangToggle serverLang={lang} />
                <div className='grid items-center justify-center rounded-[var(--border-radius)] hover:bg-[#6464641a] h-12 w-12'>
                    {token ?
                        <Link href='/api/logout' onClick={(e) => { e.preventDefault(); window.location.href = '/api/logout' }}>
                            <LogOut size={26} />
                        </Link>
                        :
                        <Link href='/api/login'>
                            <div className='user-icon' />
                        </Link>
                    }
                </div>
            </nav>
            <button
                className={`topbar_hamburger ${isOpen ? 'topbar_hamburger--open' : ''}`}
                onClick={toggle}
            >
                <div className='topbar_burger-bun topbar_burger-bun--top' />
                <div className='topbar_burger-bun topbar_burger-bun--bottom' />
            </button>
            <MobileNavigation lang={lang} open={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}
