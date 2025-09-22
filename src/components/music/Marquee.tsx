'use client'

import { useEffect, useRef, useState } from 'react'

type MarqueeProps = {
    text: string
    className?: string
    innerClassName?: string
}

export default function Marquee({ text, className = '', innerClassName = '' }: MarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const [scrollDistance, setScrollDistance] = useState(0)
    const [shouldScroll, setShouldScroll] = useState(false)

    useEffect(() => {
        const containerWidth = containerRef.current?.offsetWidth ?? 0
        const textWidth = textRef.current?.scrollWidth ?? 0
        setShouldScroll(textWidth > containerWidth)
        setScrollDistance(textWidth - containerWidth)
    }, [text])

    const duration = Math.max(6, scrollDistance / 30)

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden whitespace-nowrap ${className}`}
            style={{ width: '100%' }}
        >
            <div
                ref={textRef}
                className={`${shouldScroll ? 'animate-marquee' : ''} ${innerClassName}`}
                style={{ display: 'block', '--scroll-distance': `${scrollDistance}px`, '--duration': `${duration}s` } as React.CSSProperties}
            >
                {text === 'Unknown' ? '‎ ' : text}
            </div>
        </div>
    )
}
