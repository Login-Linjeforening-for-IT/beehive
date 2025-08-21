import Link from 'next/link'
import './Button.css'
import { ReactNode } from 'react'

type ButtonProps = {
    children?: ReactNode
    leadingIcon?: ReactNode
    size?: string
    href: string
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
    target?: string
    active?: boolean
    disabled?: boolean
    trailingIcon?: ReactNode
    className?: string
    variant?: string
}

export default function Button({
    children,
    variant = 'primary',
    size = 'medium',
    leadingIcon,
    trailingIcon,
    disabled = false,
    className = '',
    active = false,
    target = '_blank',
    onClick,
    href,
    ...props
}: ButtonProps) {
    const baseClassName = `button inline-flex button--${variant} button--${size} ${active ? 'active' : ''} ${className}`
    const iconOnly = (leadingIcon || trailingIcon) && !children

    const content = (
        <>
            {leadingIcon && 
        <span className='button_icon button_icon--leading'>
            {leadingIcon}
        </span>
            }
            {children && <span className='button_text'>{children}</span>}
            {trailingIcon && 
        <span className='button_icon button_icon--trailing'>
            {trailingIcon}
        </span>
            }
        </>
    )

    return (
        <Link
            href={href}
            className={`${baseClassName} ${disabled ? 'button--disabled' : ''} ${iconOnly ? 'button--icon-only' : ''}`}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            onClick={onClick}
            {...props}
        >
            {content}
        </Link>
    )
}
