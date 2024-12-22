import { isNew } from "@utils/DatetimeFormatter"
import Tag from "./Tag"
import no from '@text/tags/no.json'
import en from '@text/tags/en.json'
import getCookie from "@utils/getCookie"

import "./Tags.css"

const lang = getCookie('lang') as 'no' | 'en' || 'no'
const text = lang === 'en' ? en : no

export default function Tags({
    highlight = false,
    timePublish = 0,
    canceled = false,
    full = false,
    ongoing = false
}: any) {
    return (
        <>
            {canceled && <Tag variant="danger">{text.canceled}</Tag>}
            {ongoing && !canceled && <Tag variant="success">{text.ongoing}</Tag>}
            {highlight && !canceled && <Tag variant="highlight">{text.highlight}</Tag>}
            {isNew(timePublish) && <Tag variant="info">{text.new}</Tag>}
            {full && <Tag variant="danger">{text.full}</Tag>}
        </>
    )
};
