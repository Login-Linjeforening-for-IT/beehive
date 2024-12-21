type AccordionContentProps = {
    id: number
    activeAccordionItem: any
    children: any
}

export default function AccordionContent({id, activeAccordionItem, children}: AccordionContentProps) {
    return (
        <div className={`accordion__content ${activeAccordionItem  === id ? "accordion__content--open" : ""}`}>
            { children }
        </div>
    )
}
