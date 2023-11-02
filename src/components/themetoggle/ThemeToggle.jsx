import React, {useContext} from 'react'
import './ThemeToggle.css'
import ThemeContext from "../../context/ThemeContext";

const ThemeToggle = () => {
    const {theme, setTheme} = useContext(ThemeContext)

    const body = document.body
    const lightTheme = 'light'
    const darkTheme = 'dark'

    if (theme === lightTheme || theme === darkTheme) {
        body.classList.add(theme)
    } else {
        setTheme(darkTheme)
        body.classList.add(theme)
    }

    const switchTheme = e => {
        if (theme === darkTheme) {
            body.classList.replace(darkTheme, lightTheme)
            e.target.classList.replace(darkTheme, lightTheme)
            localStorage.setItem('theme', 'light')

            setTheme(lightTheme)
        } else {
            body.classList.replace(lightTheme, darkTheme)
            e.target.classList.replace(lightTheme, darkTheme)
            localStorage.setItem('theme', 'dark')

            setTheme(darkTheme)
        }
    }

    return (
        <div className='theme-toggle' onClick={e => switchTheme(e)}>
            <svg className='theme-toggle__svg' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
                <mask id='theme-toggle__clip-path'>
                    <rect x="0" y="0" width="100" height="100" fill="white" />
                    <circle className='theme-toggle__mask-circle' cx='66' cy='42' r='19' fill='black' />
                </mask>
                <circle className='theme-toggle__sun-moon' mask='url(#theme-toggle__clip-path' cx='50' cy='50' r='25'/>
                
                <rect className='theme-toggle__sun-ray' x="86" y="46" width="14" height="8" />
                <rect className='theme-toggle__sun-ray' y="46" width="14" height="8" />
                <rect className='theme-toggle__sun-ray' x="46" y="86" width="8" height="14" />
                <path className='theme-toggle__sun-ray' d="M73 78.6569L78.6569 73L88.5563 82.8995L82.8995 88.5563L73 78.6569Z" />
                <rect className='theme-toggle__sun-ray' x="82.8995" y="11" width="8" height="14" transform="rotate(45 82.8995 11)" />
                <rect className='theme-toggle__sun-ray' x="20.8995" y="73" width="8" height="14" transform="rotate(45 20.8995 73)" />
                <rect className='theme-toggle__sun-ray' x="11" y="16.6569" width="8" height="14" transform="rotate(-45 11 16.6569)" />
                <path className='theme-toggle__sun-ray' d="M46 0H54V14H46V0Z" />
            </svg>
        </div>
    )
}

export default ThemeToggle
