const AccordionContent = ({id, activeAccordionItem, children}) => {
    return (
        <div className={`accordion__content ${activeAccordionItem  === id ? 'accordion__content--open' : ''}`}>
            { children }
        </div>
    )
}

export default AccordionContent