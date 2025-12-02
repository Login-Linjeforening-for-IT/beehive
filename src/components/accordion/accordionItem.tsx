import ArrowRight from '@components/svg/symbols/arrowRight'
import './accordion.css'

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
        <li onClick={handleClick} className={`flex flex-row items-center accordion_nav-item ${activeAccordionItem === id ? 'accordion_nav-item--active' : ''}`}>
            <ArrowRight className='w-10 h-10 fill-[var(--color-text-primary)] accordion_icon--left'/>{ title }
        </li>
    )
}
