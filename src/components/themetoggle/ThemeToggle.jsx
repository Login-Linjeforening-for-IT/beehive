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
                    <circle className='theme-toggle__mask-circle' cx='66' cy='42' r='18' fill='black' />
                </mask>
                <circle className='theme-toggle__sun-moon' mask='url(#theme-toggle__clip-path' cx='50' cy='50' r='25'/>

                <rect className='theme-toggle__sun-ray' x='86' y='47' width='14' height='6'/>
                <rect className='theme-toggle__sun-ray' y='47' width='14' height='6'/>
                <rect className='theme-toggle__sun-ray' x='47' y='86' width='6' height='14'/>
                <path className='theme-toggle__sun-ray' d='M75 78.2426L79.2426 74L89.1421 83.8995L84.8995 88.1421L75 78.2426Z'/>
                <rect className='theme-toggle__sun-ray' x='84.8995' y='12' width='6' height='14' transform='rotate(45 84.8995 12)'/>
                <rect className='theme-toggle__sun-ray' x='22.8995' y='74' width='6' height='14' transform='rotate(45 22.8995 74)'/>
                <rect className='theme-toggle__sun-ray' x='13' y='16.2426' width='6' height='14' transform='rotate(-45 13 16.2426)'/>
                <path className='theme-toggle__sun-ray' d='M47 0H53V14H47V0Z'/>
            </svg>
        </div>
    )
}

export default ThemeToggle
