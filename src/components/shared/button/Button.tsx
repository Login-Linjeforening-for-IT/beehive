import Link from "next/link"
import "./Button.css"

type ButtonProps = {
    children: any
    leadingIcon: any
    size?: string
    href: string
    onClick?: any
    target?: string
    active?: boolean
    disabled?: boolean
    trailingIcon?: any
    className?: string
    variant?: string
}

export default function Button({
    children,
    variant = "primary",
    size = "medium",
    leadingIcon,
    trailingIcon,
    disabled = false,
    className = "",
    active = false,
    target = "_blank",
    onClick,
    href,
    ...props
}: ButtonProps) {
    const baseClassName = `button button--${variant} button--${size} ${active ? "active" : ""} ${className}`
    const iconOnly = (leadingIcon || trailingIcon) && !children

    const content = (
        <>
            {leadingIcon && 
        <span className="button__icon button__icon--leading">
            {leadingIcon}
        </span>
            }
            {children && <span className="button__text">{children}</span>}
            {trailingIcon && 
        <span className="button__icon button__icon--trailing">
            {trailingIcon}
        </span>
            }
        </>
    )

    return (
        <Link
            href={href}
            className={`${baseClassName} ${disabled ? "button--disabled" : ""} ${iconOnly ? "button--icon-only" : ""}`}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            onClick={onClick}
            {...props}
        >
            {content}
        </Link>
    )
};
