export default function PlayIcon({noColor}: {noColor?: boolean}) {
    const color = noColor ? 'bg-neutral-400' : 'bg-[var(--color-primary-500)]'
    return (
        <div className='flex items-end gap-1 h-5'>
            <div className={`w-1 ${color} animate-bar1`} />
            <div className={`w-1 ${color} animate-bar2`} />
            <div className={`w-1 ${color} animate-bar3`} />
        </div>
    )
}
