'use client'

import { useState } from 'react'
import Navigation from './navigation'
import MobileNavigation from './mobileNavigation'
import LoginLogoSmall from '@components/svg/brandlogos/loginLogoSmall'
import LangToggle from '@components/langtoggle/langToggle'
import ThemeToggle from '../themetoggle/themeToggle'
import Link from 'next/link'
import './topBar.css'
import { LogoConsoleOutput } from '@utils/consoleOutput'
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
                <div className='rounded-[var(--border-radius)] hover:bg-[#6464641a] h-12 w-12'>
                    {token ?
                        <Link
                            href='/api/logout' prefetch={false} onClick={(e) => { e.preventDefault(); window.location.href = '/api/logout' }}
                            className='grid items-center justify-center h-full w-full'
                        >
                            <LogOut size={24} />
                        </Link>
                        :
                        <Link
                            href='/api/login'
                            className='grid items-center justify-center h-full w-full'
                        >
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
