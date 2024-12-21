import { useState } from "react"
import "./RenderSmoothImage.css"

export default function RenderSmoothImage({ src, alt, className, onError, transition }: any) {
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <img
            src={src}
            alt={alt}
            className={`smooth-image ${transition ? "smooth-image--transition" : ""} smooth-image--${imageLoaded ? "visible" : "hidden"} ${className}`}
            onLoad={() => setImageLoaded(true)}
            onError={onError}
        />
    )
}
