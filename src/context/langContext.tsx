import { useEffect, useState } from 'react'

export const LANGUAGES = {
    NO: 'no',
    EN: 'en',
}

export default function LangContext() {
    const [lang, setLang] = useState(LANGUAGES.NO)

    useEffect(() => {
        document.body.classList.remove(...Object.values(LANGUAGES))
        document.body.classList.add(lang)
        localStorage.setItem('lang', lang)
    }, [lang])

    function switchLang() {
        setLang((prev) => (prev === LANGUAGES.NO ? LANGUAGES.EN : LANGUAGES.NO))
    }

    return { lang, switchLang }
}
