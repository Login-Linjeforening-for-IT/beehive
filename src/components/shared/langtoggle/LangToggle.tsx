'use client'

import { useContext, useState } from 'react'
import './LangToggle.css'
import AppContext from '@context/context'

export default function LangToggle() {
    const { lang, switchLang } = useContext(AppContext)
    const [buttonText, setButtonText] = useState('')
    const [jump, setJump] = useState(false)

    function handleClick() {
        switchLang()
        setJump(true)
        setTimeout(() => setJump(false), 400)
    }

    return(
        <button value={lang} onClick={handleClick} className='lang-toggle'>
            <i className={`lang-toggle_icon material-symbols-sharp ${jump ? 'lang-toggle_icon--jump' : ''}`}>language</i>
            {' ' + buttonText}
        </button>
    )
}
