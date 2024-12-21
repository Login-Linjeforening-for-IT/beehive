import './Accordion.css'

export default function AccordionItem({ id, title, activeAccordionItem, setActiveAccordionItem }) {
 
    function handleClick() {
        if(activeAccordionItem === id)
            setActiveAccordionItem('none')
        else {
            setActiveAccordionItem(id)
        }
    }
 
    return (
        <li onClick={handleClick} className={`accordion__nav-item ${activeAccordionItem === id ? 'accordion__nav-item--active' : ''}`}>
            <i className='material-symbols-sharp accordion__icon--left'>chevron_right</i>{ title }
        </li>
    )
}
