'use client'

import Button from '@components/shared/button/Button'
import './GroupToggle.css'
import { useSearchParams, usePathname } from 'next/navigation'

type GroupToggleProps = {
    // eslint-disable-next-line
    options: any, 
    defaultActiveOptionIndex?: number
    size: string
    groupVariant?: string
    buttonVariant?: string
    className?: string
    ariaLabel?: string
}

export default function GroupToggle({ 
    options, 
    defaultActiveOptionIndex = 1,
    size = 'medium',
    groupVariant = 'outlined',
    buttonVariant = 'ghost',
    className = '',
    ariaLabel = 'Toggle group'
}: GroupToggleProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const view = searchParams?.get('view')
    const viewIndex = view == 'grid' ? 0 : view == 'list' ? 1 : defaultActiveOptionIndex
    const activeOptionIndex = viewIndex

    function setView(view: string) {
        const params = new URLSearchParams(searchParams?.toString())
        params.set('view', view)
        return params.toString()
    }

    return (
        <div 
            className={`group-toggle group-toggle--${groupVariant} group-toggle--${size} ${className}`}
            role='group'
            aria-label={ariaLabel}
        >
            {/* eslint-disable-next-line */}
            {options.map((option: any, index: number) => {
                const isActive = activeOptionIndex === index
                const { text, leadingIcon, trailingIcon, ...restButtonProps } = option

                return (
                    <Button
                        href={pathname + '?' + setView(option.name)}
                        key={index}
                        target='_self'
                        variant={buttonVariant}
                        size={size}
                        className={`group-toggle_button ${
                            index === 0 ? 'group-toggle_button--first' : 
                                index === options.length - 1 ? 'group-toggle_button--last' : ''
                        }`}
                        leadingIcon={leadingIcon}
                        trailingIcon={trailingIcon}
                        aria-pressed={isActive}
                        active={isActive}
                        {...restButtonProps}
                    >
                        {text}
                    </Button>
                )
            })}
        </div>
    )
}
