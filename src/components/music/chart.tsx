import { Dispatch, SetStateAction } from 'react'

type ChartProps = {
    chartData: {
        key: string
        count: number
        raw: SongDay
    }[]
    yScale: (count: number) => number
    selected: SongDay | null
    setHover: Dispatch<SetStateAction<SongDay | null>>
    setSelected: Dispatch<SetStateAction<SongDay | null>>
    height: number
    padding: {
        top: number
        right: number
        bottom: number
        left: number
    }
    fullWidth: number
}

export default function Chart({
    chartData,
    yScale,
    selected,
    setHover,
    setSelected,
    height,
    padding,
    fullWidth
}: ChartProps) {
    const points = chartData.map((d, i) => `${xScale(i)},${yScale(d.count)}`).join(' ')
    const areaPoints = `${xScale(0)},${height - padding.bottom} ${points} ${xScale(chartData.length - 1)},${height - padding.bottom}`

    function xScale(index: number) {
        return (index / (chartData.length - 1)) * (fullWidth - padding.left - padding.right) + padding.left
    }

    return (
        <>
            {/* Area under line */}
            <polygon points={areaPoints} fill='url(#chartGradient)' />

            {/* Line */}
            <polyline
                points={points}
                fill='none'
                stroke='#fd8738AA'
                strokeWidth={2.5}
                strokeLinecap='round'
                strokeLinejoin='round'
            />

            {/* Points */}
            {chartData.map((d, i) => {
                const cx = xScale(i)
                const cy = yScale(d.count)
                const isSelected = selected?.day === d.raw.day

                return (
                    <circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 6 : 4}
                        fill={isSelected ? '#fd8738DD' : '#fd8738DD'}
                        className='cursor-pointer transition-all'
                        onMouseEnter={() => setHover(d.raw)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => setSelected(d.raw)}
                        style={{
                            stroke: isSelected ? '#fd8738DD' : 'transparent',
                            strokeWidth: isSelected ? 3 : 0,
                        }}
                    />
                )
            })}

            {/* X Labels */}
            {chartData.map((tick, i) => (
                <text
                    key={`x-label-${i}`}
                    x={xScale(i)}
                    y={height - padding.bottom + 14}
                    textAnchor='middle'
                    className='text-[10px] fill-current opacity-70'
                >
                    {tick.key}
                </text>
            ))}
        </>
    )
}
