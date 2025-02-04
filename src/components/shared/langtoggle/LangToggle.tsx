'use client'

import { useContext, useState } from 'react'
import './LangToggle.css'
import AppContext from '@context/context'
import Language from '@components/svg/symbols/Language'

export default function LangToggle() {
    const { lang, switchLang } = useContext(AppContext)
    const [buttonText, setButtonText] = useState(lang)
    const [jump, setJump] = useState(false)

    function handleClick() {
        switchLang()
        setJump(true)
        setTimeout(() => setJump(false), 400)
        setButtonText(lang)
    }

    return(
        <button value={lang} onClick={handleClick} className='lang-toggle flex flex-row items-center gap-1'>
            <i className={`lang-toggle_icon ${jump ? 'lang-toggle_icon--jump' : ''}`}>
                <Language className='w-[1.4rem] h-[1.4rem] fill-[var(--color-text-regular)]'/>
            </i>
            {' ' + buttonText}
        </button>
    )
}
