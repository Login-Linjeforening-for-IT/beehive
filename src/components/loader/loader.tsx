type LoaderProps = {
    duration?: number
    className?: string
    radius: number
    stroke?: string
}

export default function Loader({ duration = 30, className, radius = 50, stroke }: LoaderProps) {
    const circumference = 2 * Math.PI * radius

    return (
        <svg
            className={`${className || 'w-15 h-15'}`}
            viewBox='0 0 120 120'
        >
            {/* Background circle */}
            <circle
                cx='60'
                cy='60'
                r={radius}
                stroke={stroke || '#3a3a3a78'}
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
