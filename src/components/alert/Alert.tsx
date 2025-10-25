import { ReactNode } from 'react'
import './Alert.css'
import ErrorSymbol from '@components/svg/symbols/Error'

type AlertProps = {
    children: ReactNode
    variant: string
    className: string
}

// helper functions to get colors to make sure tailwind compiles them
function getIconColor(variant: string): string {
    switch (variant) {
        case 'info':
            return 'fill-[var(--color-alert-info-icon)]'
        case 'success':
            return 'fill-[var(--color-alert-success-icon)]'
        case 'warning':
            return 'fill-[var(--color-alert-warning-icon)]'
        case 'danger':
            return 'fill-[var(--color-alert-danger-icon)]'
        default:
            return 'fill-[var(--color-alert-info-icon)]'
    }
}

function getTextColor(variant: string): string {
    switch (variant) {
        case 'info':
            return 'text-[var(--color-alert-info-text)]'
        case 'success':
            return 'text-[var(--color-alert-success-text)]'
        case 'warning':
            return 'text-[var(--color-alert-warning-text)]'
        case 'danger':
            return 'text-[var(--color-alert-danger-text)]'
        default:
            return 'text-[var(--color-alert-info-text)]'
    }
}

export default function Alert({ children, variant = 'info', className = '' }: AlertProps) {
    return (
        <div className={`flex gap-2 alert alert--${variant} ${className}`}>
            <ErrorSymbol className={`w-[2rem] h-[2rem] ${getIconColor(variant)}`} />
            <div className={`alert_content ${getTextColor(variant)}`}>{children}</div>
        </div>
    )
}
