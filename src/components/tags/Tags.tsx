import Tag from './Tag'
import no from '@text/tags/no.json'
import en from '@text/tags/en.json'
import { isNew } from '@utils/DatetimeFormatter'
import { cookies } from 'next/headers'
import './Tags.css'

type TagsProps = {
    highlight: boolean,
    timePublish: Date,
    canceled: boolean,
    full: boolean,
    ongoing: boolean
}

export default async function Tags({
    highlight,
    timePublish,
    canceled,
    full,
    ongoing
}: TagsProps) {
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    const text = lang === 'no' ? no : en

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
