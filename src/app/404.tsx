'use client'

import config from "@config"
import Button from "@components/shared/button/Button"
import no from '@text/404/no.json'
import en from '@text/404/en.json'
import Image from "next/image"
import "./page.css"
import { useContext, useEffect, useState } from "react"
import AppContext from "@context/context"

export default function NotFoundPage() {
    const { lang } = useContext(AppContext)
    const [text, setText] = useState(no)

    useEffect(() => {
        const text = lang === 'en' ? en : no
        setText(text)
    }, [lang])

    return (
        <div className='not-found'>
            <picture className='not-found__pic'>
                <Image 
                    src={`${config.url.CDN_URL}/img/pizza404.png`} 
                    className='not-found__img' alt='Hangry 404'
                />
            </picture>
            <div className='not-found__text'>
                <h1>{text.header1}</h1>
                <p className='not-found__p p--regular'>
                    {text.msg}
                </p>
                <Button href="-1" leadingIcon={<i className='material-symbols-sharp'>west</i>}>
                    {text.help}
                </Button>
            </div>
        </div>
    )
}
