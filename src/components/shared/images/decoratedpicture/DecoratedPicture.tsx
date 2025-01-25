'use client'

import { useState, useEffect } from 'react'
import './DecoratedPicture.css'

type DecoratedPictureProps = {
    imgUrl: string
    variant: number
    width: number
    height: number
    cornerSize: number
    cover?: boolean
    className?: string
}

function DecoratedPicture({ imgUrl, variant, width, height, cornerSize, cover = false, className = '' }: DecoratedPictureProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const maskID = `mask-${variant}-${width}-${height}`

    useEffect(() => {
        const img = new Image()
        img.src = imgUrl
        img.onload = () => setIsLoaded(true)
    }, [imgUrl])

    function renderDecorations() {
        switch (variant) {
        case 1:
            return (
                <>
                    <clipPath id={maskID}>
                        <polygon
                            points={`0,${cornerSize} ${cornerSize / 3},${cornerSize} ${
                                cornerSize / 3
                            },${cornerSize / 3} ${cornerSize},${cornerSize / 3} ${cornerSize},0 ${width},0 ${width},${height} 0,${height}`}
                        />
                    </clipPath>
                    <rect
                        className='decor-pic_rect'
                        x='0'
                        y='0'
                        width={cornerSize - (cornerSize / 3) * 0.5}
                        height={(cornerSize / 3) * 0.5}
                    />
                    <rect
                        className='decor-pic_rect'
                        x='0'
                        y='0'
                        width={(cornerSize / 3) * 0.5}
                        height={cornerSize - (cornerSize / 3) * 0.5}
                    />
                </>
            )
        case 2:
            return (
                <>
                    <clipPath id={maskID}>
                        <polygon
                            points={`0,0 ${width - cornerSize},0 ${width - cornerSize},${
                                cornerSize / 3
                            } ${width - cornerSize / 3},${cornerSize / 3} ${
                                width - cornerSize / 3
                            },${cornerSize} ${width},${cornerSize} ${width},${height} 0,${height}`}
                        />
                    </clipPath>
                    <rect
                        className='decor-pic_rect'
                        x={width - cornerSize + (cornerSize / 3) * 0.5}
                        y='0'
                        width={cornerSize - (cornerSize / 3) * 0.5}
                        height={(cornerSize / 3) * 0.5}
                    />
                    <rect
                        className='decor-pic_rect'
                        x={width - (cornerSize / 3) * 0.5}
                        y='0'
                        width={(cornerSize / 3) * 0.5}
                        height={cornerSize - (cornerSize / 3) * 0.5}
                    />
                </>
            )
        case 3:
            return (
                <>
                    <clipPath id={maskID}>
                        <polygon
                            points={`0,0 ${width},0 ${width},${height - cornerSize} ${
                                width - cornerSize / 3
                            },${height - cornerSize} ${width - cornerSize / 3},${
                                height - cornerSize / 3
                            } ${width - cornerSize},${height - cornerSize / 3} ${width - cornerSize},${height} 0,${height}`}
                        />
                    </clipPath>
                    <rect
                        className='decor-pic_rect'
                        x={width - cornerSize + (cornerSize / 3) * 0.5}
                        y={height - (cornerSize / 3) * 0.5}
                        width={cornerSize - (cornerSize / 3) * 0.5}
                        height={(cornerSize / 3) * 0.5}
                    />
                    <rect
                        className='decor-pic_rect'
                        x={width - (cornerSize / 3) * 0.5}
                        y={height - cornerSize + (cornerSize / 3) * 0.5}
                        width={(cornerSize / 3) * 0.5}
                        height={cornerSize - (cornerSize / 3) * 0.5}
                    />
                </>
            )
        case 4:
            return (
                <>
                    <clipPath id={maskID}>
                        <polygon
                            points={`0,0 ${width},0 ${width},${height} ${cornerSize},${height} ${cornerSize},${
                                height - cornerSize / 3
                            } ${cornerSize / 3},${height - cornerSize / 3} ${
                                cornerSize / 3
                            },${height - cornerSize} 0,${height - cornerSize}`}
                        />
                    </clipPath>
                    <rect
                        className='decor-pic_rect'
                        x='0'
                        y={height - (cornerSize / 3) * 0.5}
                        width={cornerSize - (cornerSize / 3) * 0.5}
                        height={(cornerSize / 3) * 0.5}
                    />
                    <rect
                        className='decor-pic_rect'
                        x='0'
                        y={height - cornerSize + (cornerSize / 3) * 0.5}
                        width={(cornerSize / 3) * 0.5}
                        height={cornerSize - (cornerSize / 3) * 0.5}
                    />
                </>
            )
        default:
            return null
        }
    }

    return (
        <picture className={`decor-pic ${className}`}>
            <svg
                className={`decor-pic_svg decor-pic_svg--${variant}`}
                viewBox={`0,0 ${width},${height}`}
                xmlns='http://www.w3.org/2000/svg'
            >
                {renderDecorations()}
                {!isLoaded && (
                    <rect
                        width={width}
                        height={height}
                        clipPath={`url(#${maskID})`}
                        className='decor-pic_img-placeholder'
                    />
                )}
                <image
                    // @ts-ignore
                    clipPath={`url(#${maskID})`}
                    className={`decor-pic_img decor-pic_img--${isLoaded ? 'visible' : 'hidden'}`}
                    href={imgUrl}
                    {...(cover ? { preserveAspectRatio: 'xMidYMid slice' } : {})}
                    width={'100%'}
                    height={'100%'}
                />
            </svg>
        </picture>
    )
}

export default DecoratedPicture