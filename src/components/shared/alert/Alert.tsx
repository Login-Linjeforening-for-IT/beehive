import { ReactNode } from 'react'
import './Alert.css'
import ErrorSymbol from '@components/svg/symbols/Error'

type AlertProps = {
    children: ReactNode
    variant: string
    className: string
}

export default function Alert({ children, variant = 'info', className = '' }: AlertProps) {
    return (
        <div className={`flex gap-2 alert alert--${variant} ${className}`}>
            <ErrorSymbol size='2rem' fill='white' />
            <div className='alert_content'>{children}</div>
        </div>
    )
}
