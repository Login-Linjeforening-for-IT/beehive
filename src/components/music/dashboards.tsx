'use client'

import { setCookie } from '@utils/cookies'
import Link from 'next/link'

export default function Dashboards() {
    const style = 'flex items-center gap-4 p-4 rounded-lg bg-[var(--color-bg-surface)] shadow-none w-full font-semibold'

    function handleClick() {
        setCookie('shouldReload', 'true')
    }

    return (
        <div className='flex flex-col md:flex-row gap-4'>
            <Link href='/music/dashboard/today' onClick={handleClick} className={style}>Dashboard Today</Link>
            <Link href='/music/dashboard/all' onClick={handleClick} className={style}>Dashboard All Time</Link>
            <Link href='/music/dashboard/current' onClick={handleClick} className={style}>Currently Listening</Link>
        </div>
    )
}
