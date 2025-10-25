import { useEffect, useState } from 'react'
import no from '@text/privacy/no.json'
import en from '@text/privacy/en.json'
import { X } from 'lucide-react'
import { getCookie, setCookie } from '@utils/cookies'

export default function PrivacyDisclaimer({ lang }: { lang: Lang }) {
    const [privacyWarning, setPrivacyWarning] = useState(false)
    const text = lang === 'no' ? no : en

    function handleHide() {
        setPrivacyWarning(false)
    }

    function handleHideForever() {
        setPrivacyWarning(false)
        setCookie('neverWarnAboutPrivacyForMusic', 'true')
    }

    useEffect(() => {
        const doNotTrack = !!navigator.doNotTrack
        const gpc = (navigator as ExtendedNavigator).globalPrivacyControl
        const privacyBlocker = doNotTrack || gpc
        const alreadySuppressed = getCookie('neverWarnAboutPrivacyForMusic')

        if (alreadySuppressed) {
            return
        }

        if (privacyBlocker) {
            const timer = setTimeout(() => {
                setPrivacyWarning(false)
            }, 7900)

            setPrivacyWarning(true)
            return () => clearTimeout(timer)
        }
    }, [])

    if (!privacyWarning) {
        return null
    }

    return (
        <div className='fixed z-1000 top-24 right-4 bg-[var(--color-bg-surface)] rounded-lg w-[25rem] p-2 grid gap-2'>
            <div className='flex w-full justify-between'>
                <h1 className='font-semibold'>{text.title}</h1>
                <X color='#fd8738' className='cursor-pointer' onClick={handleHide} />
            </div>
            <h1 className='text-xs'>{text.description}</h1>
            <h1
                onClick={handleHideForever}
                className='text-xs text-[var(--color-primary-500)] cursor-pointer'
            >{text.noshow}</h1>
            <div className='h-1 bg-[var(--color-primary-500)] w-0 mb-1 animate-slide-line rounded-lg' />
        </div>
    )
}
