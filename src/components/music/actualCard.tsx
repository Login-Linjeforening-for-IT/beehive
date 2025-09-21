import { Dispatch, SetStateAction, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PlayIcon from './playIcon'

type CardProps<T> = {
    text: string | string[]
    dropdown?: boolean
    defaultOpen?: boolean
    children: React.ReactNode
    className?: string
    playIcon?: boolean
    smallText?: boolean
    centerText?: boolean
    current?: T
    handleChange?: Dispatch<SetStateAction<T>>
    changeValues?: T[]
}

export default function Card<T>({
    text,
    children,
    className,
    dropdown = false,
    defaultOpen = true,
    playIcon = false,
    smallText = false,
    centerText = false,
    current,
    handleChange,
    changeValues,
}: CardProps<T>) {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const titleStyle = `${smallText ? 'text-sm text-neutral-400 self-center mb-1' : 'text-lg font-semibold'} ${playIcon && 'text-[var(--color-primary-500)]'} ${centerText && 'text-center w-full'}`
    const secondStyle = 'select-none text-lg font-semibold text-neutral-400 bg-[var(--color-music-change)] px-2 rounded-lg self-center mb-1'
    function toggleOpen() {
        if (dropdown) {
            setIsOpen(!isOpen)
        }
    }

    function toggleChange(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) {
        e.stopPropagation()
        if (handleChange && changeValues) {
            handleChange((prev) => prev === changeValues[0] ? changeValues[1] : changeValues[0])
        }
    }

    const display = current === 'listens' ? text[0] : text[1]
    const opposite = current === 'listens' ? text[1] : text[0]

    return (
        <div className={`bg-[var(--color-bg-surface)] rounded-lg w-full ${isOpen ? 'h-full' : 'h-fit'} p-4 ${className}`}>
            <div
                className={`flex items-center justify-between ${dropdown ? 'cursor-pointer' : ''}`}
                onClick={toggleOpen}
            >
                <div className='flex gap-2 w-full'>
                    {!changeValues && <h1 className={titleStyle}>{text}</h1>}
                    {changeValues && current && <h1 className={titleStyle}>
                        {display}
                    </h1>}
                    {changeValues && opposite && <h1 className={secondStyle} onClick={toggleChange}>
                        {opposite}
                    </h1>}
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
