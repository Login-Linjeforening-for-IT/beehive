import clsx from '@utils/clsx'
import type { ReactNode } from 'react'

type AccordionContentProps = {
    id: string
    activeAccordionItem: string
    children: ReactNode
}

export default function AccordionContent({id, activeAccordionItem, children}: AccordionContentProps) {
    return (
        <div
            className={clsx(
                'max-h-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0,1,0,1)]',
                activeAccordionItem === id && 'h-auto max-h-400 ease-[cubic-bezier(1,0,1,0)]'
            )}
        >
            { children }
        </div>
    )
}
