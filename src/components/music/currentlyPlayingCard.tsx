'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Marquee from './Marquee'
import config from '@config'

export default function CurrentlyPlayingCard({ song }: { song: Song }) {
    const startMs = Date.parse(song.start)
    const endMs = Date.parse(song.end)
    const durationMs = endMs - startMs
    const [progressMs, setProgressMs] = useState(0)
    const animationRef = useRef<number>(0)

    useEffect(() => {
        if (durationMs <= 0) {
            return
        }

        function updateProgress() {
            const now = Date.now()
            const elapsed = now - startMs
            setProgressMs(Math.max(0, Math.min(elapsed, durationMs)))
            animationRef.current = requestAnimationFrame(updateProgress)
        }

        animationRef.current = requestAnimationFrame(updateProgress)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [song.id, startMs, durationMs])

    const progressPercent = durationMs > 0 ? (progressMs / durationMs) * 100 : 0

    if (progressPercent === 100) {
        return
    }

    return (
        <div className='flex items-center gap-4 p-2 rounded-lg bg-[var(--color-text-disabled)]/30 shadow-none w-full'>
            <Image
                src={`${config.url.SPOTIFY_IMAGE_API_URL}/${Array.isArray(song.image) ? song.image[0] : song.image}`}
                alt={song.album}
                width={64}
                height={64}
                className='rounded-lg object-cover bg-gray-900 w-16 h-16'
            />
            <div className='flex flex-col flex-1 min-w-0'>
                <Marquee text={song.song} className='truncate' innerClassName='font-medium text-base' />
                <Marquee text={song.artist} className='truncate' innerClassName='text-xs text-[var(--color-text-discreet)]' />
                <Marquee text={song.album} className='truncate' innerClassName='text-xs text-[var(--color-text-discreet)]' />
                <div className='mt-2 flex items-center w-full gap-2'>
                    <span className='text-xs text-[var(--color-text-discreet)] min-w-[40px] text-right'>{msToMinSec(progressMs)}</span>
                    <div className='h-1.5 flex-1 bg-[var(--color-progressbar-unfilled)]/20 rounded-full overflow-hidden relative'>
                        <div
                            className='h-full bg-[var(--color-progressbar)] transition-all duration-1000 ease-linear'
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <span className='text-xs text-[var(--color-text-discreet)] min-w-[40px] text-left'>{msToMinSec(durationMs)}</span>
                </div>
            </div>
        </div>
    )
}

function msToMinSec(ms: number) {
    if (!isFinite(ms) || ms < 0) return '0:00'
    const min = Math.floor(ms / 60000)
    const sec = Math.floor((ms % 60000) / 1000)
    return `${min}:${sec.toString().padStart(2, '0')}`
}
