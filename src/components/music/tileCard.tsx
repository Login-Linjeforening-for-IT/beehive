import config from '@config'
import Image from 'next/image'

type TileCardProps = {
    image?: string
    imageHash?: string
    className?: string
    children: React.ReactNode
    discord?: true
    user_id?: string
}

export default function TileCard({ image, imageHash, className, children, discord, user_id }: TileCardProps) {
    const src = discord ? `${config.url.DISCORD_AVATARS_API_URL}/${user_id}/${imageHash}?size=1024` : image ? image : `${config.url.SPOTIFY_IMAGE_API_URL}/${imageHash}`
    return (
        <div className={`flex items-center gap-4 px-2 rounded-lg bg-[var(--color-text-disabled)]/30 shadow-none ${className}  min-h-[10vh] h-[10vh] max-h-[10vh]`}>
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
        </div>
    )
}
