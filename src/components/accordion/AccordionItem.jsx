import './Accordion.css'

const AccordionItem = ({ id, title, activeAccordionItem, setActiveAccordionItem }) => {
 
    const handleClick = () => {
        if(activeAccordionItem === id)
            setActiveAccordionItem('none')
        else {
            setActiveAccordionItem(id)
        }
    }
 
    return (
        <li onClick={handleClick} className={`accordion__nav-item ${activeAccordionItem === id ? 'accordion__nav-item--active' : ''}`}>{ title }</li>
    )
}

export default AccordionItem