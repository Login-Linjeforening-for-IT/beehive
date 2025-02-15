'use client'

import { useEffect, useState } from 'react'
import './LangToggle.css'
import Language from '@components/svg/symbols/Language'
import { getCookie, setCookie } from '@utils/cookies'

export default function LangToggle() {
    const [lang, setLang] = useState<'no' | 'en'>('no')
    const [jump, setJump] = useState(false)
    
    useEffect(() => {
        const savedLang = getCookie('lang') as 'no' | 'en'
        if (savedLang) {
            setLang(savedLang)
        }
    }, [])

    function handleClick() {
        const newLang = lang === 'no' ? 'en' : 'no'
        setCookie('lang', newLang)
        setLang(newLang)
        setJump(true)
        setTimeout(() => setJump(false), 400)
        window.location.reload()
    }

    return(
        <button value={lang} onClick={handleClick} className='lang-toggle flex flex-row items-center gap-1'>
            <i className={`lang-toggle_icon ${jump ? 'lang-toggle_icon--jump' : ''}`}>
                <Language className='w-[1.4rem] h-[1.4rem] fill-[var(--color-text-regular)]'/>
            </i>
            {' ' + lang}
        </button>
    )
}
