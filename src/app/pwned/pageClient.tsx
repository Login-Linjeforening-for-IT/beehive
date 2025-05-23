'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import config from '@config'
import no from '@text/pwned/no.json'
import en from '@text/pwned/en.json'
import useDarkModeObserver from '@/hooks/darkModeObserver'

type PageClientProps = {
    pwnedNumber: number
    lang: Lang
}

type MemeProps = { 
    text: string
    pwned: ({ text: string, image: string })[]
}

export default function PageClient({pwnedNumber, lang}: PageClientProps){
    const [time, setTime] = useState<number>(1)
    const isDark = useDarkModeObserver()
    const memes = (lang === 'no' ? no : en) as MemeProps
    const seconds = time === 1
        ? lang === 'no'
            ? 'sekund'
            : 'second'
        : lang === 'no'
            ? 'sekunder'
            : 'seconds'

    useEffect(() => {
        const startTime = Date.now()
        const interval = setInterval(() => {
            const difference = Math.floor((Date.now() - startTime) / 1000)
            setTime(difference)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className='h-[calc(100vh-var(--h-topbar))] w-full grid grid-rows-[auto,1fr,auto] justify-items-center items-center'>
            <h1 className='text-xl font-semibold px-[2rem] max-w-[60rem] text-center'>
                {memes.pwned[pwnedNumber].text}
            </h1>
            <div className='relative max-h-[25rem] m-[2rem]'>
                <Image
                    src={`${config.url.CDN_URL}/img/pwned/${memes.pwned[pwnedNumber].image}`} 
                    className='object-contain w-auto h-[25rem]'
                    alt='meme'
                    width={400}
                    height={400}
                />
            </div>
            <div className='flex gap-2 items-center px-[2rem]'>
                <p className='text-xl flex text-center'>
                    {memes.text.replace('{time}', `${String(time)} ${seconds}`)}
                </p>
                <Image 
                    src={`${config.url.CDN_URL}/img/login_shitty_thicc${isDark ? '_white' : ''}.png`} 
                    className='object-contain w-[1.5rem] h-[1.5rem]'
                    alt='meme'
                    width={40}
                    height={40}
                />
            </div>
        </div>
    )
}
