'use client'

import {useState, useEffect} from 'react'
import { setCookie } from '@utils/cookies'
import Link from 'next/link'
import dashboard_no from '@text/dashboard/no.json'
import dashboard_en from '@text/dashboard/en.json'
import { getCookie } from '@utils/cookies'
import { language } from '@components/shared/langtoggle/LangToggle'

export default function Dashboards() {
    const [lang, setLang] = useState('no')
    const [text, setText] = useState(dashboard_no)

    useEffect(() => {
        const dashboardText = lang === 'no' ? dashboard_no : dashboard_en
        setText(dashboardText)
    }, [lang])

    useEffect(() => {
        const temp = getCookie('lang')
        setLang(temp || 'no')
    }, [language])

    const style = 'flex items-center gap-4 p-4 rounded-lg bg-[var(--color-bg-surface)] shadow-none w-full font-semibold'

    function handleClick() {
        setCookie('shouldReload', 'true')
    }

    return (
        <div className='flex flex-col md:flex-row gap-4'>
            <Link href='/music/dashboard/today' onClick={handleClick} className={style}>{text.dashboardToday}</Link>
            <Link href='/music/dashboard/all' onClick={handleClick} className={style}>{text.dashboardAllTime}</Link>
            <Link href='/music/dashboard/current' onClick={handleClick} className={style}>{text.currentlyListening}</Link>
        </div>
    )
}
