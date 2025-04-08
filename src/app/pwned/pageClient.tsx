'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import config from '@config'
import no from '@text/pwned/no.json'
import en from '@text/pwned/en.json'

type Interval = NodeJS.Timeout | number

type PageClientProps = {
    pwnedNumber: number
    lang: string
}

type MemeProps = { 
    pwned: ({ text: string, image: string })[]
}

export default function PageClient({pwnedNumber, lang}: PageClientProps){
    const [time, setTime] = useState<number>(1)
    const memes = (lang === 'no' ? no : en) as MemeProps

    useEffect(() => {
        let interval: Interval = 0
        interval = setInterval(() => {
            setTime((prevtime) => prevtime + 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='h-[calc(100vh-var(--h-topbar))] w-full flex flex-col justify-center items-center'>
            <h1 className='text-xl font-semibold'>{memes.pwned[pwnedNumber].text}</h1>
            <div className='relative max-h-[25rem] m-[2rem]'>
                <Image
                    src={`${config.url.CDN_URL}/img/pwned/${memes.pwned[pwnedNumber].image}`} 
                    className='object-contain w-auto h-[25rem]'
                    alt='meme'
                    width={400}
                    height={400}
                />
            </div>
            <p className='text-xl'>It has been {time} seconds since you've been pwned 🙈</p>
        </div>
    )
}
