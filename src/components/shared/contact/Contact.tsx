'use client'

import MazeMapEmbed from "@components/shared/mazemap/MazeMapEmbed"
import no from '@text/contact/no.json'
import en from '@text/contact/en.json'
import "./Contact.css"
import { useContext, useEffect, useState } from "react"
import AppContext from "@context/context"

export default function Contact() {
    const { lang } = useContext(AppContext)
    const [text, setText] = useState(no)

    useEffect(() => {
        const text = lang === 'en' ? en : no
        setText(text)
    }, [lang])

    return(
        <div className='contact-card'>
            <h2 className='heading-2 heading-2--icon'>
                <i className='heading-2_icon material-symbols-sharp'>travel_explore</i>
                <span>{text.contact.title}</span>
            </h2>
            <div className='contact-card_info'>
                <div className='contact-card_text'>
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
                            href='mailto:kontakt@login.no'
                        >
                            kontakt@login.no
                        </a>
                    </p>
                </div>
                <div className='contact-card_map'>
                    <MazeMapEmbed 
                        poi={229153}
                    />
                </div>
            </div>
        </div>
    )
}
