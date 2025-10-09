import Loader from '@components/shared/loader/loader'
import config from '@config'
import { PlayIcon } from 'lucide-react'
import Image from 'next/image'
import { forwardRef, useEffect, useRef, useState } from 'react'

const TWENTY_MINUTES = 1800000
const THIRTY_SECONDS = 30000

type PlayerProps = {
    song: MinimalSong
    src?: string
    shouldRenderPlayer?: boolean
}

export default function ImageWithPlayer({ song, src, shouldRenderPlayer }: PlayerProps) {
    const [clicked, setClicked] = useState(false)
    const [left, setLeft] = useState(false)
    const [isInside, setIsinside] = useState(false)
    const [frameKey, setFrameKey] = useState(song.song_id)
    const duration = new Date(song.end ?? '').getTime() - new Date(song.start ?? '').getTime()
    const isPodcast = duration > TWENTY_MINUTES
    const doNotTrack = !!navigator.doNotTrack
    const gpc = (navigator as ExtendedNavigator).globalPrivacyControl
    const privacyBlocker = !doNotTrack && !gpc
    const allowPlayer = privacyBlocker && !isPodcast && shouldRenderPlayer
    const playIconClickable = allowPlayer && isInside && !clicked
    const isInsideAndNotPodcast = playIconClickable || (isInside && !isPodcast)

    function handleMouseEnter() {
        setLeft(false)
        setIsinside(true)
    }

    function handleMouseLeave() {
        window.focus()
        setLeft(true)
        setIsinside(false)
    }

    const iframeRef = useRef<HTMLIFrameElement | null>(null)

    useEffect(() => {
        function handleBlur() {
            if (document.activeElement === iframeRef.current) {
                setClicked(true)
                setTimeout(() => {
                    setLeft(true)
                }, THIRTY_SECONDS)
            }
        }

        window.addEventListener('blur', handleBlur)
        return () => window.removeEventListener('blur', handleBlur)
    }, [iframeRef.current])

    useEffect(() => {
        if (clicked && left) {
            setFrameKey(`reload-${song.song_id}-${Date.now()}`)
            setClicked(false)
            setLeft(false)
        }
    }, [clicked, left, song.song_id])

    const url = src ?? `${config.url.SPOTIFY_IMAGE_API_URL}/${Array.isArray(song.image) ? song.image[0] : song.image}`

    return (
        <>
            <div className='relative w-16 h-16'>
                <Image
                    src={url}
                    alt={song.name ?? 'Image with player'}
                    width={64}
                    height={64}
                    className='rounded-lg object-cover bg-gray-900 w-16 h-16'
                />
                {isInsideAndNotPodcast && allowPlayer && (
                    <div className='absolute inset-0 bg-black/50 rounded-lg pt-2'>
                        {playIconClickable ? <PlayIcon className='h-[40px] w-[40px] fill-white/90 stroke-0 z-10 ml-[12px] mt-[5px] cursor-events-none' />
                            : <div className='-mt-[5px] pl-[2px]'><Loader /></div>
                        }
                    </div>
                )}
            </div>
            <div
                className='absolute w-[70px] h-[70px] overflow-hidden'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {allowPlayer && <Frame key={frameKey} id={song.song_id ?? ''} ref={iframeRef} />}
            </div>
        </>
    )
}

const Frame = forwardRef<HTMLIFrameElement, { id: string }>(
    ({ id }, ref) => (
        <div className='absolute w-[70px] h-[70px] overflow-hidden'>
            <div className='max-w-[70px] h-[70px] overflow-hidden'
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    cursor: 'pointer',
                    background: 'transparent'
                }}
            />

            <iframe
                ref={ref}
                src={`${config.url.SPOTIFY_EMBED_URL}/${id}?utm_source=login&theme=0`}
                width='300'
                height='80'
                style={{
                    transform: 'scale(4) translateX(-86.5%) translateY(-62%)',
                    transformOrigin: 'top left',
                    opacity: '0'
                }}
                allow='encrypted-media'
            />
        </div>
    )
)
