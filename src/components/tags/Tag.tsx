import "./Tags.css"

export default function Tag({ children, variant = "info" }: any) {
    return (
        <div className={`tag tag--${variant}`}>
            <div className="tag_container">
                <div className="tag_name">
                    {children}
                </div>
            </div>
        </div>
    )
}
