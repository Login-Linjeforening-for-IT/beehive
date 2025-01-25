'use client'

import AppContext from '@context/context'
import { useContext } from 'react'
import no from '@text/landing/no.json'
import en from '@text/landing/en.json'
import Link from 'next/link'

export default function EndCard({ path }: {path: string}) {
    const { lang } = useContext(AppContext)
    const text = lang === 'en' ? en : no

    return (
        <li className='dynamic-preview-list_item dynamic-preview-end-card'>
            <Link href={path} className='dynamic-preview-end-card_btn'>
                <div className='dynamic-preview-end-card_arrow-container'>
                    <div className='dynamic-preview-end-card_arrow' />
                </div>
                <div className='dynamic-preview-end-card_text'>
                    {text.eventsPreview.seeAll}
                </div>
            </Link>
        </li>
    )
}
