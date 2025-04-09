'use client'

import LangToggle from '@components/shared/langtoggle/LangToggle'
import ThemeToggle from '../themetoggle/themeToggle'
import './TopBar.css'
import config from '@config'
import Image from 'next/image'

type TopBarProps = {
    lang: Lang
    theme: string
}

export default function TopBar({lang, theme}: TopBarProps) { 
    return (
        <div className={'flex max-w-[calc(var(--w-page)+2rem)] w-full m-auto p-[0.5rem] h-[var(--h-topbar)] transition duration-500 800px:justify-between 800px:p-[1rem]'}>
            <div className='flex items-center h-[3rem] p-[0.2rem] 800px:p-0'>
                <a href='/' onClick={(e) => { e.preventDefault(); window.location.href = '/' }}>
                    <Image 
                        src={`${config.url.CDN_URL}/img/login_shitty_thicc${theme ? '_white' : ''}.png`} 
                        className='object-cover'
                        alt='ticc login logo'
                        width={48}
                        height={48}
                    />
                </a>
            </div>
            <nav className='flex w-[calc(100vw-8rem)] justify-end h-[3rem] mr-[1rem] 800px:w-fit 800px:mr-0'>
                <ThemeToggle />
                <LangToggle serverLang={lang} />
            </nav>
        </div>
    )
}
