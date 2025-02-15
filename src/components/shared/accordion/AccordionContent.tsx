import { ReactNode } from 'react'

type AccordionContentProps = {
    id: string
    activeAccordionItem: string
    children: ReactNode
}

export default function AccordionContent({id, activeAccordionItem, children}: AccordionContentProps) {
    return (
        <div className={`accordion_content ${activeAccordionItem  === id ? 'accordion_content--open' : ''}`}>
            { children }
        </div>
    )
}
