import { isNew } from "../../utils/DatetimeFormatter"
import Tag from "./Tag"
import "./Tags.css"

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
