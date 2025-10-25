import { getCookie } from '@utils/cookies'
import { useEffect, useState } from 'react'
import { language } from '@components/langtoggle/LangToggle'

export default function useLang<T extends object>(no: T, en: T) {
    const [lang, setLang] = useState('no')
    const [text, setText] = useState(no)

    useEffect(() => {
        const text = lang === 'en' ? en : no
        setText(text)
    }, [lang])

    useEffect(() => {
        const temp = getCookie('lang')
        setLang(temp || 'no')
    }, [language])

    return text
}
