import Link from 'next/link'
import type { ReactNode } from 'react'
import clsx from '@utils/clsx'

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
    const iconOnly = (leadingIcon || trailingIcon) && !children

    const baseClassName = clsx(
        'inline-flex items-center justify-center font-medium',
        'no-underline leading-none transition-all duration-200 ease-in'
    )

    const variantClassName = {
        primary: clsx(
            'bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-text)]',
            '[&_svg]:fill-[var(--color-btn-primary-text)] [&_i]:text-[var(--color-btn-primary-text)]',
            active ? 'bg-[var(--color-btn-primary-bg-active)]' : 'hover:brightness-95'
        ),
        secondary: clsx(
            'bg-[var(--color-btn-secondary-bg)] text-[var(--color-text-main)]',
            '[&_svg]:fill-[var(--color-text-main)] [&_i]:text-[var(--color-text-main)]',
            active ? 'bg-[var(--color-btn-secondary-bg-active)]' : 'hover:brightness-95'
        ),
        'primary-outlined': clsx(
            'border-[0.13rem] border-[var(--color-btn-primary-outlined)] bg-transparent',
            'text-[var(--color-btn-primary-outlined)]',
            '[&_svg]:fill-[var(--color-btn-primary-outlined)]',
            '[&_i]:text-[var(--color-btn-primary-outlined)]',
            active
                ? clsx(
                    'bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-text)]',
                    '[&_svg]:fill-[var(--color-btn-primary-text)]',
                    '[&_i]:text-[var(--color-btn-primary-text)]'
                )
                : clsx(
                    'hover:bg-[var(--color-btn-primary-bg)]',
                    'hover:text-[var(--color-btn-primary-text)]',
                    'hover:[&_svg]:fill-[var(--color-btn-primary-text)]',
                    'hover:[&_i]:text-[var(--color-btn-primary-text)]'
                )
        ),
        'secondary-outlined': clsx(
            'border-[0.13rem] border-[var(--color-btn-secondary-outlined)] bg-transparent',
            'text-[var(--color-text-main)] [&_svg]:fill-[var(--color-text-main)] [&_i]:text-[var(--color-text-main)]',
            active
                ? clsx(
                    'text-[var(--color-btn-primary-outlined)]',
                    '[&_svg]:fill-[var(--color-btn-primary-outlined)]',
                    '[&_i]:text-[var(--color-btn-primary-outlined)]'
                )
                : 'hover:bg-[var(--color-btn-secondary-outlined)]'
        ),
        ghost: clsx(
            'bg-transparent text-[var(--color-text-main)] [&_svg]:fill-[var(--color-text-main)] [&_i]:text-[var(--color-text-main)]',
            active
                ? clsx(
                    'text-[var(--color-btn-primary-outlined)]',
                    '[&_svg]:fill-[var(--color-btn-primary-outlined)]',
                    '[&_i]:text-[var(--color-btn-primary-outlined)]'
                )
                : 'hover:bg-[var(--color-btn-secondary-outlined)]'
        ),
        danger: clsx(
            'bg-[var(--color-btn-danger-bg)] text-[var(--color-btn-danger-text)]',
            '[&_svg]:fill-[var(--color-btn-danger-text)] [&_i]:text-[var(--color-btn-danger-text)]',
            active ? 'bg-[var(--color-btn-danger-bg-active)]' : 'hover:brightness-95'
        )
    }[variant] || 'bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-text)]'

    const sizeClassName = {
        small: 'rounded-[var(--border-radius-small)] px-4 py-[0.35rem] text-[0.875rem] leading-[1.4rem]',
        medium: 'rounded-[var(--border-radius-small)] px-[1.2rem] py-[0.5rem] text-[1rem] leading-[1.5rem]',
        large: 'rounded-[var(--border-radius)] px-[1.4rem] py-[0.7rem] text-[1.125rem] leading-[1.6rem]',
        xl: 'rounded-[var(--border-radius-large)] px-[2rem] py-[1rem] text-[1.3rem] leading-[1.6rem]'
    }[size] || 'rounded-[var(--border-radius-small)] px-[1.2rem] py-[0.5rem] text-[1rem] leading-[1.5rem]'

    const outlinedPaddingClassName = (variant === 'primary-outlined' || variant === 'secondary-outlined')
        ? {
            small: 'px-[0.9rem] py-[0.22rem]',
            medium: 'px-[1rem] py-[0.37rem]',
            large: 'px-[1.3rem] py-[0.57rem]',
            xl: 'px-[1.9rem] py-[0.83rem]'
        }[size] || ''
        : ''

    const iconOnlyClassName = iconOnly
        ? {
            small:
                (variant === 'primary-outlined' || variant === 'secondary-outlined')
                    ? 'p-[0.22rem]'
                    : 'p-[0.35rem]',
            medium:
                (variant === 'primary-outlined' || variant === 'secondary-outlined')
                    ? 'p-[0.37rem]'
                    : 'p-[0.5rem]',
            large:
                (variant === 'primary-outlined' || variant === 'secondary-outlined')
                    ? 'p-[0.57rem]'
                    : 'p-[0.7rem]',
            xl:
                (variant === 'primary-outlined' || variant === 'secondary-outlined')
                    ? 'p-[0.83rem]'
                    : 'p-[1rem]'
        }[size] || ''
        : ''

    const iconClassName = {
        small: '[&_i]:text-[1.4rem] [&_i]:leading-[1.4rem]',
        medium: '[&_i]:text-[1.5rem] [&_i]:leading-[1.5rem]',
        large: '[&_i]:text-[1.6rem] [&_i]:leading-[1.6rem]',
        xl: '[&_i]:text-[1.7rem] [&_i]:leading-[1.6rem]'
    }[size] || '[&_i]:text-[1.5rem] [&_i]:leading-[1.5rem]'

    const content = (
        <>
            {leadingIcon &&
                <span className={clsx('flex items-center justify-center', !iconOnly && 'mr-[0.5rem]', iconClassName)}>
                    {leadingIcon}
                </span>
            }
            {children && <span>{children}</span>}
            {trailingIcon &&
                <span className={clsx('flex items-center justify-center', !iconOnly && 'ml-[0.5rem]', iconClassName)}>
                    {trailingIcon}
                </span>
            }
        </>
    )

    return (
        <Link
            href={href}
            className={clsx(
                baseClassName,
                variantClassName,
                sizeClassName,
                outlinedPaddingClassName,
                iconOnlyClassName,
                disabled && 'cursor-not-allowed opacity-50 pointer-events-none',
                className
            )}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            onClick={onClick}
            {...props}
        >
            {content}
        </Link>
    )
}
