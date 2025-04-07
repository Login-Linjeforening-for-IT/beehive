'use client'

import MazeMapEmbed from '@components/shared/mazemap/MazeMapEmbed'
import no from '@text/contact/no.json'
import en from '@text/contact/en.json'
import { useEffect, useState } from 'react'
import TravelExplore from '@components/svg/symbols/TravelExplore'
import { getCookie } from '@utils/cookies'
import { language } from '../langtoggle/LangToggle'
import config from '@config'
// import { getCookie } from '@utils/cookies'

export default function Contact() {
    const [lang, setLang] = useState('no')
    const [text, setText] = useState(no)

    useEffect(() => {
        const text = lang === 'en' ? en : no
        setText(text)
    }, [lang])

    useEffect(() => {
        const temp = getCookie('lang')
        setLang( temp || 'no')
    }, [language])

    return(
        <div className='contact-card'>
            <h2 className='heading-2 heading-2--icon'>
                <TravelExplore className='w-[3rem] h-[3rem] fill-white mr-4' />
                <span>{text.contact.title}</span>
            </h2>
            <div className='flex justify-between w-full'>
                <div>
                    <h4 className='heading-4'>{text.contact.address}:</h4>
                    <p className='p--regular'>
                        Login - Linjeforeningen for IT
                        <br/>
                        Teknologivegen 22
                        <br/>
                        Bygg A, rom 155
                        <br/>
                        2815 GJØVIK
                    </p>
                    <h4 className='heading-4'>{text.contact.email}:</h4>
                    <p className='p--regular'>
                        <a
                            className='link link--primary link--underscore-hover'
                            href={`mailto:${config.url.MAIL_URL}`}
                        >
                            {config.url.MAIL_URL}
                        </a>
                    </p>
                </div>
                <div className='relative w-full max-w-[40rem] bottom-16 h-[50vh]'>
                    <MazeMapEmbed poi={229153} height={345} />
                </div>
            </div>
        </div>
    )
}
