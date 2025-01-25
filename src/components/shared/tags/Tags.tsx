'use client'

import { isNew } from '@utils/DatetimeFormatter'
import Tag from './Tag'
import no from '@text/tags/no.json'
import en from '@text/tags/en.json'
import { useContext, useEffect, useState } from 'react'
import './Tags.css'
import AppContext from '@context/context'

type TagsProps = {
    highlight : boolean,
    timePublish : Date,
    canceled : boolean,
    full : boolean,
    ongoing : boolean
}

export default function Tags({
    highlight,
    timePublish,
    canceled,
    full,
    ongoing
}: TagsProps) {
    const { lang } = useContext(AppContext)
    const [text, setText] = useState(no)

    useEffect(() => {
        const text = lang === 'en' ? en : no
        setText(text)
    }, [lang])

    return (
        <>
            {canceled && <Tag variant='danger'>{text.canceled}</Tag>}
            {ongoing && !canceled && <Tag variant='success'>{text.ongoing}</Tag>}
            {highlight && !canceled && <Tag variant='highlight'>{text.highlight}</Tag>}
            {isNew(timePublish.toString()) && <Tag variant='info'>{text.new}</Tag>}
            {full && <Tag variant='danger'>{text.full}</Tag>}
        </>
    )
}
