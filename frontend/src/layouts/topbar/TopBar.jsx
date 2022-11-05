import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import MobileNavigation from './MobileNavigation'
import ThemeToggle from '../../components/themetoggle/ThemeToggle'

import './TopBar.css'
import LangToggle from "../../components/langtoggle/LangToggle";

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
    
  
  return (
    <div className={`topbar ${isOpen ? 'topbar--open' : ''}`}>
      <Link to='/' onClick={isOpen ? toggle : ''} >
        <picture className='topbar__logo'>
          <source srcSet={process.env.PUBLIC_URL + '/img/logo/logo-white-small.svg'} />
          <img className='topbar__img' alt="Login's logo" />
        </picture>
      </Link>
      <Navigation/>
      <nav className='topbar__toggle'>
        <ThemeToggle/>
        <LangToggle/>
      </nav>
      <div className={`topbar__hamburger ${isOpen ? 'topbar__hamburger--open' : ''}`} onClick={toggle}>
          <div className='topbar__burger-bun topbar__burger-bun--top'></div>
          <div className='topbar__burger-bun topbar__burger-bun--bottom'></div>
      </div>
      <MobileNavigation open={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default TopBar
