
import Image from 'next/image'

type SpotifySong = {
    id: number;
    song: string;
    artist: string;
    album: string;
    start: string;
    end: string;
    source: string;
    user: string;
    timestamp: string;
    image: string;
    play_count: number;
}

export default function CurrentlyPlayingCard({ song }: { song: SpotifySong }) {
    const startMs = Date.parse(song.start)
    const endMs = Date.parse(song.end)
    const durationMs = endMs - startMs
    const progressMs = Math.max(0, Math.min(Date.parse(song.timestamp) - startMs, durationMs))
    const progressPercent = durationMs > 0 ? (progressMs / durationMs) * 100 : 0

    return (
        <div className='flex items-center gap-4 p-2 rounded-lg bg-neutral-800/70 shadow-none w-md'>
            <Image
                src={`https://i.scdn.co/image/${Array.isArray(song.image) ? song.image[0] : song.image}`}
                alt={song.album}
                width={64}
                height={64}
                className='rounded-lg object-cover bg-gray-900 w-16 h-16'
            />
            <div className='flex flex-col flex-1 min-w-0'>
                <div className='font-medium text-base text-white truncate'>{song.song}</div>
                <div className='text-sm text-gray-200 truncate'>{song.artist}</div>
                <div className='text-xs text-gray-300 truncate'>{song.album}</div>
                <div className='mt-2 flex items-center w-full gap-2'>
                    <span className='text-xs text-gray-400 min-w-[40px] text-right'>{msToMinSec(progressMs)}</span>
                    <div className='h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden relative'>
                        <div
                            className='h-full bg-neutral-200 transition-all'
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <span className='text-xs text-gray-400 min-w-[40px] text-left'>{msToMinSec(durationMs)}</span>
                </div>
            </div>
        </div>
    )

    function msToMinSec(ms: number) {
        const min = Math.floor(ms / 60000)
        const sec = Math.floor((ms % 60000) / 1000)
        return `${min}:${sec.toString().padStart(2, '0')}`
    }
}
