import config from '@config'
import Image from 'next/image'
import Link from 'next/link'
import ImageWithPlayer from './imageWithPlayer'

type TileCardProps = {
    name?: string
    image?: string
    imageHash?: string
    url?: string
    className?: string
    children: React.ReactNode
    discord?: true
    user_id?: string
    sync_id?: string
    user?: boolean
    start?: string
    end?: string
}

type InnerTileCardProps = {
    children: React.ReactNode
    user_id?: string
    src: string
    song?: MinimalSong
}

export default function TileCard({
    name,
    image,
    imageHash,
    url,
    className,
    children,
    discord,
    user_id,
    sync_id,
    start,
    end
}: TileCardProps) {
    const src = discord ? `${config.url.DISCORD_AVATARS_API_URL}/${user_id}/${imageHash}?size=1024` : image ? image : `${config.url.SPOTIFY_IMAGE_API_URL}/${imageHash}`
    const style = `flex items-center gap-4 px-2 rounded-lg bg-[var(--color-text-disabled)]/30 shadow-none ${className} min-h-[90px] h-[90px] max-h-[90px] ${(sync_id || user_id || url) && 'transform transition hover:scale-102 hover:z-20 cursor-pointer'}`
    const spotifyUrl = `${config.url.SPOTIFY_URL}${sync_id}`
    const discordUrl = `${config.url.DISORD_USER_URL}${user_id}`

    if (sync_id || user_id || url) {
        const song: MinimalSong = { start, end, sync_id, image, name }
        return (
            <Link className={style} href={url ?? (sync_id ? spotifyUrl : discordUrl)} target='_blank' >
                <InnerTileCard song={song} src={src} children={children} />
            </Link>
        )
    }

    return (
        <div className={style}>
            <InnerTileCard src={src} children={children} user_id={user_id} />
        </div>
    )
}

function InnerTileCard({ src, children, user_id, song }: InnerTileCardProps) {
    return (
        <>
            {song?.sync_id ? <ImageWithPlayer src={src} song={song} />
                : <Image
                    src={src}
                    alt={user_id ?? 'Tile card image'}
                    width={64}
                    height={64}
                    className='rounded-lg object-cover w-16 h-16'
                />}
            <div className='flex flex-col flex-1 min-w-0'>
                {children}
            </div>
        </>
    )
}
