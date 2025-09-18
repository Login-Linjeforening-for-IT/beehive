'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function CurrentlyPlayingCard({ song }: { song: Song }) {
    const startMs = Date.parse(song.start)
    const endMs = Date.parse(song.end)
    const durationMs = endMs - startMs
    const [progressMs, setProgressMs] = useState(0)

    useEffect(() => {
        function updateProgress() {
            const now = Date.now()
            setProgressMs(Math.max(0, Math.min(now - startMs, durationMs)))
        }
        updateProgress()
        let intervalId: NodeJS.Timeout | null = null
        if (durationMs > 0) {
            intervalId = setInterval(updateProgress, 1000)
        }
        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [song.id, startMs, durationMs])

    const progressPercent = durationMs > 0 ? (progressMs / durationMs) * 100 : 0

    if (progressPercent === 100) {
        return
    }

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
        if (!isFinite(ms) || ms < 0) return '0:00'
        const min = Math.floor(ms / 60000)
        const sec = Math.floor((ms % 60000) / 1000)
        return `${min}:${sec.toString().padStart(2, '0')}`
    }
}
