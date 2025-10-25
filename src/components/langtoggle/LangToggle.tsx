'use client'

import { useEffect, useState } from 'react'
import './LangToggle.css'
import Language from '@components/svg/symbols/Language'
import { getCookie, setCookie } from '@utils/cookies'
import { useRouter } from 'next/navigation'

export let language = 'no'

type LangToggleProps = {
    serverLang: Lang
}

export default function LangToggle({serverLang}: LangToggleProps) {
    const [lang, setLang] = useState<'no' | 'en'>(serverLang)
    const [jump, setJump] = useState(false)

    const router = useRouter()

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
        language = newLang
        setJump(true)
        setTimeout(() => setJump(false), 400)
        router.refresh()
    }

    return(
        <button value={lang} onClick={handleClick} className='lang-toggle flex flex-row items-center justify-center gap-1'>
            <i className={`lang-toggle_icon ${jump ? 'lang-toggle_icon--jump' : ''}`}>
                <Language className='lang-icon w-[1.4rem] h-[1.4rem]'/>
            </i>
            {' ' + lang}
        </button>
    )
}
