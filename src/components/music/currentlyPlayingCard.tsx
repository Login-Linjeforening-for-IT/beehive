'use client'

import { useEffect, useState, useRef } from 'react'
import Marquee from './Marquee'
import config from '@config'
import ImageWithPlayer from './imageWithPlayer'
import Link from 'next/link'
import { useVisibility } from 'uibee/hooks'

type InnerCurrentlyPlayingCardProps = {
    song: CurrentlyPlaying
    progressPercent: number
    progressMs: number
    durationMs: number
    shouldRenderPlayer?: boolean
}

export default function CurrentlyPlayingCard({ song }: { song: CurrentlyPlaying }) {
    const startMs = Date.parse(song.start)
    const endMs = Date.parse(song.end)
    const durationMs = endMs - startMs
    const [progressMs, setProgressMs] = useState(0)
    const [shouldRenderPlayer, setShouldRenderPlayer] = useState(false)
    const { ref } = useVisibility<HTMLAnchorElement>(() => setShouldRenderPlayer(true))
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

    const style = `flex items-center gap-4 px-2 py-10 md:px-2 rounded-lg bg-[var(--color-text-disabled)]/30 shadow-none w-full ${song.sync_id && 'transform transition hover:scale-[1.015] hover:z-20'} min-h-[90px] h-[90px] max-h-[90px]`

    function handleMouseEnter() {
        setShouldRenderPlayer(true)
    }

    function handleMouseLeave() {
        setShouldRenderPlayer(false)
    }

    if (!song.sync_id) {
        return (
            <div className={style}>
                <InnerCurrentlyPlayingCard
                    song={song}
                    durationMs={durationMs}
                    progressMs={progressMs}
                    progressPercent={progressPercent}
                />
            </div>
        )
    }

    return (
        <Link
            href={`${config.url.SPOTIFY_URL}${song.sync_id}?utm_source=login`}
            target='_blank'
            className={style}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={ref}
        >
            <InnerCurrentlyPlayingCard
                song={song}
                durationMs={durationMs}
                progressMs={progressMs}
                progressPercent={progressPercent}
                shouldRenderPlayer={shouldRenderPlayer}
            />
        </Link>
    )
}

function InnerCurrentlyPlayingCard({
    song,
    progressPercent,
    progressMs,
    durationMs,
    shouldRenderPlayer
}: InnerCurrentlyPlayingCardProps) {
    return (
        <>
            <ImageWithPlayer song={{ ...song, name: song.song }} shouldRenderPlayer={shouldRenderPlayer} />
            <div className='flex flex-col flex-1 min-w-0'>
                <Marquee text={song.song} className='truncate' innerClassName='font-medium text-base' />
                {song.artist === 'Unknown' ? <>
                    <Marquee text={song.album} className='truncate' innerClassName='text-xs text-[var(--color-text-discreet)]' />
                    <Marquee text={song.artist} className='truncate' innerClassName='text-xs text-[var(--color-text-discreet)]' />
                </> : <>
                    <Marquee text={song.artist} className='truncate' innerClassName='text-xs text-[var(--color-text-discreet)]' />
                    <Marquee text={song.album} className='truncate' innerClassName='text-xs text-[var(--color-text-discreet)]' />
                </>}
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
        </>
    )
}

function msToMinSec(ms: number) {
    if (!isFinite(ms) || ms < 0) return '0:00'
    const min = Math.floor(ms / 60000)
    const sec = Math.floor((ms % 60000) / 1000)
    return `${min}:${sec.toString().padStart(2, '0')}`
}
