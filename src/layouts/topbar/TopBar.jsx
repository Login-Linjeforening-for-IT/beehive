import { useState } from 'react'
import { Link } from 'react-router-dom'

import Navigation from './Navigation'
import MobileNavigation from './MobileNavigation'
import ThemeToggle from '../../components/themetoggle/ThemeToggle'
import LoginLogoSmall from '../../components/svg/brandlogos/LoginLogoSmall'
// import ProfileSVG from '../../components/svg/profilesvg'

import './TopBar.css'
import LangToggle from "../../components/langtoggle/LangToggle";

const TopBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
  
    return (
        <div className={`topbar ${isOpen ? 'topbar--open' : ''}`}>
            <div className='topbar__logo'>
                <Link to='/' onClick={isOpen ? toggle : ''} >
                    <LoginLogoSmall />
                </Link>
            </div>
            <Navigation />
            <nav className='topbar__toggle'>
                <ThemeToggle/>
                <LangToggle/>
                {/* TODO */}
                {/* consider using a material symbols icon instead for consistency */}
                {/* <div className='topbar_profile'>
                    <NavLink to='profile'>
                        <picture>
                            <ProfileSVG />
                        </picture>
                    </NavLink>
                </div> */}
            </nav>
            <button className={`topbar__hamburger ${isOpen ? 'topbar__hamburger--open' : ''}`} onClick={toggle}>
                <div className='topbar__burger-bun topbar__burger-bun--top'></div>
                <div className='topbar__burger-bun topbar__burger-bun--bottom'></div>
            </button>
            <MobileNavigation open={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default TopBar
