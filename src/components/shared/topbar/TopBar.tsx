'use client'

import { useState } from 'react'
import Navigation from './Navigation'
import MobileNavigation from './MobileNavigation'
import LoginLogoSmall from '@components/svg/brandlogos/LoginLogoSmall'
// import ProfileSVG from '@components/svg/profilesvg'
import LangToggle from '@components/shared/langtoggle/LangToggle'
import Link from 'next/link'
import './TopBar.css'
import ThemeToggle from '../themetoggle/themeToggle'

export default function TopBar() {
    const [isOpen, setIsOpen] = useState(false)
    function toggle() {
        setIsOpen(!isOpen)
    }
  
    return (
        <div className={`topbar ${isOpen ? 'topbar--open' : ''}`}>
            <div className='topbar_logo'>
                <Link href='/' onClick={isOpen ? toggle : () => {}} >
                    <LoginLogoSmall />
                </Link>
            </div>
            <Navigation />
            <nav className='topbar_toggle'>
                <ThemeToggle />
                <LangToggle />
                {/* TODO */}
                {/* <div className='topbar_profile'>
                    <Link href='/profile'>
                        <picture>
                            <ProfileSVG />
                        </picture>
                    </Link>
                </div> */}
            </nav>
            <button className={`topbar_hamburger ${isOpen ? 'topbar_hamburger--open' : ''}`} onClick={toggle}>
                <div className='topbar_burger-bun topbar_burger-bun--top'></div>
                <div className='topbar_burger-bun topbar_burger-bun--bottom'></div>
            </button>
            <MobileNavigation open={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}
