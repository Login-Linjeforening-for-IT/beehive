import "./Alert.css"

type AlertProps = {
    children: any
    variant: string
    icon: string
    className: string
}

export default function Alert({ children, variant = "info", icon = "info", className = "" }: AlertProps) {
    return (
        <div className={`alert alert--${variant} ${className}`}>
            <i className="alert__icon material-symbols-sharp">{icon}</i>
            <div className="alert__content">{children}</div>
        </div>
    )
};
