import { ReactNode, useState } from 'react'
import './DropDownBox.css'
import ChevronRight from '@components/svg/symbols/ChevronRight'

export default function DropDownBox({ title, children }: { title:ReactNode, children:ReactNode}) {
    const [isOpen, setOpen] = useState(false)

    function handleClick() {
        setOpen(!isOpen)
    }
 
    return (
        <div className={`drop-down-box ${isOpen ? 'drop-down-box--open' : ''}`}>
            <div 
                className='drop-down-box_toggle'
                // @ts-ignore
                onClick={e => handleClick(e)}
            >
                <div>{ title }</div>
                <ChevronRight className='drop-down-box_toggle-icon'/>
            </div>
            <div className={`drop-down-box_content ${isOpen ? 'drop-down-box_content--open' : ''}`}>
                {children}
            </div>
        </div>
    )
}
