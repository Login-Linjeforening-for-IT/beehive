import React from 'react'

export default function Loader({ duration = 30, className }: { duration?: number, className?: string }) {
    const radius = 50
    const circumference = 2 * Math.PI * radius

    return (
        <svg
            className={`w-15 h-15 ${className}`}
            viewBox='0 0 120 120'
        >
            {/* Background circle */}
            <circle
                cx='60'
                cy='60'
                r={radius}
                stroke='#3a3a3a78'
                strokeWidth='10'
                fill='none'
            />
            {/* Animated foreground */}
            <circle
                cx='60'
                cy='60'
                r={radius}
                stroke='#fd8738'
                strokeWidth='10'
                fill='none'
                strokeLinecap='round'
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%',
                    animation: `progress ${duration}s linear forwards`,
                }}
            />
        </svg>
    )
}
