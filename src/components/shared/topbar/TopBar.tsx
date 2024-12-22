'use client'

import { useState } from "react"
import Navigation from "./Navigation"
import MobileNavigation from "./MobileNavigation"
import ThemeToggle from "@components/shared/themetoggle/ThemeToggle"
import LoginLogoSmall from "@components/svg/brandlogos/LoginLogoSmall"
// import ProfileSVG from '@components/svg/profilesvg'
import LangToggle from "@components/shared/langtoggle/LangToggle"
import Link from "next/link"
import "./TopBar.css"

export default function TopBar() {
    if (typeof localStorage === "undefined") {
        return null
    }

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
