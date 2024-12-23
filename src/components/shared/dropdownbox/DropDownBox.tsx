import { useState } from "react"
import "./DropDownBox.css"

export default function DropDownBox({ title, children }: any) {
    const [isOpen, setOpen] = useState(false)

    function handleClick() {
        setOpen(!isOpen)
    }
 
    return (
        <div className={`drop-down-box ${isOpen ? "drop-down-box--open" : ""}`}>
            <div 
                className='drop-down-box_toggle'
                // @ts-ignore
                onClick={e => handleClick(e)}
            >
                <div>{ title }</div>
                <i className='material-symbols-sharp drop-down-box_toggle-icon'>
                    chevron_right
                </i>
            </div>
            <div className={`drop-down-box_content ${isOpen ? "drop-down-box_content--open" : ""}`}>
                {children}
            </div>
        </div>
    )
}
