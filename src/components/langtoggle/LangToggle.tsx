'use client'

import { useEffect, useState } from "react"
import getCookie from "@utils/getCookie"
import "./LangToggle.css"

const lang = getCookie('lang') as 'no' | 'en' || 'no'

export default function LangToggle() {
    const [buttonText, setButtonText] = useState("")
    const [jump, setJump] = useState(false)
  
    useEffect( () => {
        lang === "no" ? setButtonText("en") : setButtonText("no")
    }, [lang])

    function handleClick() {
        if (lang === 'no') {
            document.cookie = `lang=en; path=/`;
        } else {
            document.cookie = `lang=no; path=/`;
        }

        setJump(true)
        setTimeout(() => setJump(false), 400)
    }

    return(
        <button value={lang} onClick={handleClick} className='lang-toggle'>
            <i className={`lang-toggle__icon material-symbols-sharp ${jump ? "lang-toggle__icon--jump" : ""}`}>language</i>
            {" " + buttonText}
        </button>
    )
}
