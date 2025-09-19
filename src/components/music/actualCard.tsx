import { useState } from 'react'

type CardProps = {
    text: string
    dropdown?: boolean
    defaultOpen?: boolean
    children: React.ReactNode
    className?: string
}

export default function Card({ text, children, className, dropdown = false, defaultOpen = true }: CardProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    const toggleOpen = () => {
        if (dropdown) {
            setIsOpen(!isOpen)
        }
    }

    return (
        <div className={`bg-neutral-800/70 rounded-lg w-full h-fit p-4 ${className}`}>
            <div
                className={`flex items-center justify-between ${dropdown ? 'cursor-pointer' : ''}`}
                onClick={toggleOpen}
            >
                <h1 className='font-semibold text-lg'>{text}</h1>
                {dropdown && (
                    <svg
                        className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                )}
            </div>
            <div className={`grid place-items-center transition-all duration-300 overflow-hidden ${
                dropdown ? (isOpen ? 'max-h-screen opacity-100 mt-2' : 'max-h-0 opacity-0') : ''
            }`}>
                {children}
            </div>
        </div>
    )
}
