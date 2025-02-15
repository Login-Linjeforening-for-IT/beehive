import ArrowRight from '@components/svg/symbols/ArrowRight'
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
        <li onClick={handleClick} className={`flex flex-row accordion_nav-item ${activeAccordionItem === id ? 'accordion_nav-item--active' : ''}`}>
            <ArrowRight className='w-[2.5rem] h-[2.5rem] fill-white accordion_icon--left'/>{ title }
        </li>
    )
}
