import './Accordion.css'

type AccordionItemProps = { 
    id: string
    title: string
    // eslint-disable-next-line
    activeAccordionItem: any
    // eslint-disable-next-line
    setActiveAccordionItem: any
}

export default function AccordionItem({ id, title, activeAccordionItem, setActiveAccordionItem }: AccordionItemProps) {
 
    function handleClick() {
        if(activeAccordionItem === id)
            setActiveAccordionItem('none')
        else {
            setActiveAccordionItem(id)
        }
    }
 
    return (
        <li onClick={handleClick} className={`accordion_nav-item ${activeAccordionItem === id ? 'accordion_nav-item--active' : ''}`}>
            <i className='material-symbols-sharp accordion_icon--left'>chevron_right</i>{ title }
        </li>
    )
}
