'use client'

import { useEffect, useRef, useState } from 'react'

interface MarqueeProps {
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

    // Dynamic duration based on distance (optional)
    const duration = Math.max(6, scrollDistance / 30) // longer text scrolls slower

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden whitespace-nowrap ${className}`}
            style={{ width: '100%' }}
        >
            <div
                ref={textRef}
                className={`inline-block ${shouldScroll ? 'animate-marquee' : ''} ${innerClassName}`}
                style={{ '--scroll-distance': `${scrollDistance}px`, '--duration': `${duration}s` } as React.CSSProperties}
            >
                {text}
            </div>

            <style jsx>{`
                @keyframes marquee {
                0% { transform: translateX(0); }
                20% { transform: translateX(0); }
                80% { transform: translateX(calc(-1 * var(--scroll-distance))); }
                90% { transform: translateX(calc(-1 * var(--scroll-distance))); }
                100% { transform: translateX(0); }
                }

                .animate-marquee {
                display: inline-block;
                animation: marquee 12s linear infinite;
                }
            `}</style>
        </div>
    )
}
