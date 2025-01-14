import { useState } from 'react'
import './RenderSmoothImage.css'
import Image from 'next/image'

type RenderSmoothImageProps = {
    src: string
    alt: string
    className: string
    onError: React.ReactEventHandler<HTMLImageElement> | undefined
    transition: boolean
}

export default function RenderSmoothImage({ src, alt, className, onError, transition }: RenderSmoothImageProps) {
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <Image
            src={src}
            alt={alt}
            className={`smooth-image ${transition ? 'smooth-image--transition' : ''} smooth-image--${imageLoaded ? 'visible' : 'hidden'} ${className}`}
            onLoad={() => setImageLoaded(true)}
            onError={onError}
            width={800}
            height={200}
        />
    )
}
