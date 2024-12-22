'use client'

import { useState } from "react"
import Navigation from "./Navigation"
import MobileNavigation from "./MobileNavigation"
import ThemeToggle from "../../components/themetoggle/ThemeToggle"
import LoginLogoSmall from "../../components/svg/brandlogos/LoginLogoSmall"
// import ProfileSVG from '../../components/svg/profilesvg'

import "./TopBar.css"
import LangToggle from "../../components/langtoggle/LangToggle"
import Link from "next/link"

export default function TopBar() {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
  
    return (
        <div className={`topbar ${isOpen ? "topbar--open" : ""}`}>
            <div className='topbar__logo'>
                <Link href='/' onClick={isOpen ? toggle : () => {}} >
                    <LoginLogoSmall />
                </Link>
            </div>
            <Navigation />
            <nav className='topbar__toggle'>
                <ThemeToggle/>
                <LangToggle/>
                {/* TODO */}
                {/* <div className='topbar_profile'>
                    <Link href='/profile'>
                        <picture>
                            <ProfileSVG />
                        </picture>
                    </Link>
                </div> */}
            </nav>
            <button className={`topbar__hamburger ${isOpen ? "topbar__hamburger--open" : ""}`} onClick={toggle}>
                <div className='topbar__burger-bun topbar__burger-bun--top'></div>
                <div className='topbar__burger-bun topbar__burger-bun--bottom'></div>
            </button>
            <MobileNavigation open={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}
