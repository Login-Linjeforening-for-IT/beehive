type AccordionContentProps = {
    id: string
    activeAccordionItem: any
    children: any
}

export default function AccordionContent({id, activeAccordionItem, children}: AccordionContentProps) {
    return (
        <div className={`accordion_content ${activeAccordionItem  === id ? 'accordion_content--open' : ''}`}>
            { children }
        </div>
    )
}
