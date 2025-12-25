'use client'
import { useState, type ReactNode } from 'react'
import './dropDownBox.css'
import ChevronRight from '@components/svg/symbols/chevronRight'

export default function DropDownBox({ title, children }: { title: ReactNode, children: ReactNode}) {
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
                <div className='flex flex-row gap-2 items-center'>{ title }</div>
                <ChevronRight className='fill-[var(--color-text-main)] drop-down-box_toggle-icon'/>
            </div>
            <div className={`drop-down-box_content ${isOpen ? 'drop-down-box_content--open' : ''}`}>
                {children}
            </div>
        </div>
    )
}
