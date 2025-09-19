import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PlayIcon from './playIcon'

type CardProps = {
    text: string
    dropdown?: boolean
    defaultOpen?: boolean
    children: React.ReactNode
    className?: string
    playIcon?: boolean
    smallText?: boolean
    centerText?: boolean
}

export default function Card({ text, children, className, dropdown = false, defaultOpen = true, playIcon = false, smallText = false, centerText = false }: CardProps) {
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
                <div className='flex gap-2 w-full'>
                    <h1 className={`${smallText ? 'text-sm text-zinc-500 self-center mb-1' : 'text-lg font-semibold'} ${playIcon && 'text-[var(--color-primary-500)]'} ${centerText && 'text-center w-full'}`}>{text}</h1>
                    {playIcon && <PlayIcon />}
                </div>
                {dropdown && (
                    <ChevronDown
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                        size={20}
                    />
                )}
            </div>
            <div className={`grid place-items-center transition-all duration-300 overflow-hidden ${dropdown ? (isOpen ? 'max-h-screen opacity-100 mt-2' : 'max-h-0 opacity-0') : ''}`}>
                {children}
            </div>
        </div>
    )
}
