import { ReactNode } from 'react'
import './Alert.css'

type AlertProps = {
    children: ReactNode
    variant: string
    icon: string
    className: string
}

export default function Alert({ children, variant = 'info', icon = 'info', className = '' }: AlertProps) {
    return (
        <div className={`alert alert--${variant} ${className}`}>
            <i className="alert_icon material-symbols-sharp">{icon}</i>
            <div className="alert_content">{children}</div>
        </div>
    )
}
