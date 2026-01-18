export function Egg({ className, color, rotation = 0, width = 100, height = 135, outlineColor = 'rgba(0,0,0,0.2)', outlineWidth = 3 }: { className?: string; color: string; rotation?: number; width?: number; height?: number; outlineColor?: string; outlineWidth?: number }) {
    return (
        <svg
            viewBox='0 0 100 135'
            className={className}
            width={width}
            height={height}
            xmlns='http://www.w3.org/2000/svg'
        >
            <g transform={`rotate(${rotation} 50 67.5)`}>
                <path
                    d='M50 0 C20 0 0 35 0 75 C0 110 20 135 50 135 C80 135 100 110 100 75 C100 35 80 0 50 0 Z'
                    fill={color}
                    stroke={outlineColor}
                    strokeWidth={outlineWidth}
                    strokeLinejoin='round'
                />
                <path d='M10 75 Q50 95 90 75' fill='none' stroke='rgba(255,255,255,0.5)' strokeWidth='5' />
                <path d='M15 55 Q50 75 85 55' fill='none' stroke='rgba(255,255,255,0.5)' strokeWidth='5' />
                <path d='M15 95 Q50 115 85 95' fill='none' stroke='rgba(255,255,255,0.5)' strokeWidth='5' />
            </g>
        </svg>
    )
}