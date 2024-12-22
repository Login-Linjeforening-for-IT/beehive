import "./Tags.css"

export default function Tag({ children, variant = "info" }: any) {
    return (
        <div className={`tag tag--${variant}`}>
            <div className="tag__container">
                <div className="tag__name">
                    {children}
                </div>
            </div>
        </div>
    )
}
