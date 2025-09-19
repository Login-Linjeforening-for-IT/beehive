import React from 'react'
import Card from './actualCard'
import Image from 'next/image'

type MostPlayedProps = {
    mostPlayedAlbums: Album[]
    mostPlayedArtists: ArtistPlayed[]
    mostPlayedSongs: CountedSong[]
    mostActiveUser: ActiveUser[]
}

interface TileMapProps<T> {
    text: string
    items: T[]
    getImage?: (item: T) => string
    getImageHash?: (item: T) => string
    getTitle: (item: T) => string
    getSubtitle?: (item: T) => string
    getCount?: (item: T) => string | number
}

type TileCardProps = {
    image?: string
    imageHash?: string
    className?: string
    children: React.ReactNode
}

export function MostPlayed({ mostPlayedAlbums, mostPlayedArtists, mostPlayedSongs, mostActiveUser }: MostPlayedProps) {
    return (
        <div className='grid grid-cols-2 gap-4'>
            <TileMap
                text='Most Played Albums'
                items={mostPlayedAlbums}
                getImageHash={a => a.top_song_image}
                getTitle={a => a.album}
                getSubtitle={a => a.artist}
                getCount={a => a.play_count}
            />

            <TileMap
                text='Most Played Artists'
                items={mostPlayedArtists}
                getImageHash={a => a.image}
                getTitle={a => a.artist}
                getCount={a => a.play_count}
            />

            <TileMap
                text='Most Played Songs'
                items={mostPlayedSongs}
                getImageHash={a => a.image}
                getTitle={a => a.song}
                getCount={a => a.listens}
            />

            <TileMap
                text='Most Active Users'
                items={mostActiveUser}
                getImage={a => a.image}
                getTitle={a => a.user}
                getCount={a => a.total_minutes}
            />

        </div>
    )
}

function TileMap<T>({ text, items, getImage, getImageHash, getTitle, getSubtitle, getCount }: TileMapProps<T>) {
    return (
        <Card text={text}>
            <div className='grid grid-cols-2 gap-2 w-lg pt-2'>
                {items.map((item, index) => (
                    <TileCard
                        key={getTitle(item)}
                        imageHash={getImageHash ? getImageHash(item) : undefined}
                        image={getImage ? getImage(item) : undefined}
                        className={`${index === 0 ? 'col-span-2' : ''}`}
                    >
                        <div className='font-semibold text-lg truncate'>{getTitle(item)}</div>
                        {getSubtitle && (
                            <div className='text-sm text-gray-400 truncate'>{getSubtitle(item)}</div>
                        )}
                        {getCount && (
                            <div className='text-sm text-gray-400 truncate'>{getCount(item)} plays</div>
                        )}
                    </TileCard>
                ))}
            </div>
        </Card>
    )
}

function TileCard({ image, imageHash, className, children }: TileCardProps) {
    return (
        <div className={`flex items-center gap-4 p-2 rounded-lg bg-neutral-700/30 shadow-none ${className}`}>
            <Image
                src={image ? image : `https://i.scdn.co/image/${imageHash}`}
                alt={''}
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
