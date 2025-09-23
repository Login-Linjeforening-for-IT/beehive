import config from '@config'
import Image from 'next/image'
import Link from 'next/link'

type TileCardProps = {
    image?: string
    imageHash?: string
    className?: string
    children: React.ReactNode
    discord?: true
    user_id?: string
    sync_id?: string
    user?: boolean
}

type InnerTileCardProps = {
    children: React.ReactNode
    user_id?: string
    src: string
}

export default function TileCard({ image, imageHash, className, children, discord, user_id, sync_id }: TileCardProps) {
    const src = discord ? `${config.url.DISCORD_AVATARS_API_URL}/${user_id}/${imageHash}?size=1024` : image ? image : `${config.url.SPOTIFY_IMAGE_API_URL}/${imageHash}`
    const style = `flex items-center gap-4 px-2 rounded-lg bg-[var(--color-text-disabled)]/30 shadow-none ${className}  min-h-[10vh] h-[10vh] max-h-[10vh] ${sync_id && 'transform transition hover:scale-102 hover:z-20 cursor-pointer'}`
    const spotifyUrl = `${config.url.SPOTIFY_URL}${sync_id}`
    const discordUrl = `${config.url.DISORD_USER_URL}${user_id}`

    if (sync_id || user_id) {
        return (
            <Link className={style} href={sync_id ? spotifyUrl : discordUrl} target='_blank' >
                <InnerTileCard src={src} children={children} />
            </Link>
        )
    }

    return (
        <div className={style}>
            <InnerTileCard src={src} children={children} />
        </div>
    )
}

function InnerTileCard({ src, children, user_id }: InnerTileCardProps) {
    return (
        <>
            <Image
                src={src}
                alt={user_id ?? 'Tile card image'}
                width={64}
                height={64}
                className='rounded-lg object-cover w-16 h-16'
            />
            <div className='flex flex-col flex-1 min-w-0'>
                {children}
            </div>
        </>
    )
}
