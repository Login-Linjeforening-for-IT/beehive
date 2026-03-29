import { getCookie } from 'utilbee/utils'
import { useEffect, useState } from 'react'


export default function useLang<T extends object>(no: T, en: T) {
    const [lang, setLang] = useState('no')

    useEffect(() => {
        const currentLang = getCookie('lang') || 'no'
        setLang(currentLang)

        const handleLanguageChange = () => {
            setLang(getCookie('lang') || 'no')
        }

        window.addEventListener('language-change', handleLanguageChange)
        return () => window.removeEventListener('language-change', handleLanguageChange)
    }, [])

    return lang === 'en' ? en : no
}
