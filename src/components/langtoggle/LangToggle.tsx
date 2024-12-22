'use client'

// @ts-ignore
import {withTranslation} from "react-i18next"
import {useEffect, useState} from "react"

import { useEffect, useState } from "react"
import "./LangToggle.css"

export default function LangToggle() {
    const [buttonText, setButtonText] = useState("")
    const [jump, setJump] = useState(false)
  
    useEffect( () => {
        lang === "no" ? setButtonText("en") : setButtonText("no")
    }, [lang])

    function handleClick(event: any) {
        if (lang === "no") {
            setCookie("lang", event.target.value = "en")
            setButtonText("en")
        } else {
            setCookie("lang", event.target.value = "nb")
            setButtonText("no")
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
