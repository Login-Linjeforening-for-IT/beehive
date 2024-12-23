'use client'

import { isNew } from "@utils/DatetimeFormatter"
import Tag from "./Tag"
import no from '@text/tags/no.json'
import en from '@text/tags/en.json'
import { useContext, useEffect, useState } from "react"
import "./Tags.css"
import AppContext from "@context/context"

export default function Tags({
    highlight = false,
    timePublish = 0,
    canceled = false,
    full = false,
    ongoing = false
}: any) {
    const { lang } = useContext(AppContext)
    const [text, setText] = useState(no)

    useEffect(() => {
        const text = lang === 'en' ? en : no
        setText(text)
    }, [lang])

    return (
        <>
            {canceled && <Tag variant="danger">{text.canceled}</Tag>}
            {ongoing && !canceled && <Tag variant="success">{text.ongoing}</Tag>}
            {highlight && !canceled && <Tag variant="highlight">{text.highlight}</Tag>}
            {isNew(timePublish) && <Tag variant="info">{text.new}</Tag>}
            {full && <Tag variant="danger">{text.full}</Tag>}
        </>
    )
}
