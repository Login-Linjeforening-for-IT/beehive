import React from 'react'
import Card from './actualCard'
import TileCard from './tileCard'
import Marquee from './Marquee'

type MostPlayedProps = {
    mostPlayedAlbums: Album[]
    mostPlayedArtists: ArtistPlayed[]
    mostPlayedSongs: CountedSong[]
    mostActiveUsers: MusicUser[]
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

export function MostPlayed({ mostPlayedAlbums, mostPlayedArtists, mostPlayedSongs, mostActiveUsers }: MostPlayedProps) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-4 w-full justify-items-center'>
            <TileMap
                text='Most Played Albums'
                items={mostPlayedAlbums}
                getImageHash={a => a.top_song_image}
                getTitle={a => a.album}
                getSubtitle={a => a.artist}
                getCount={a => a.listens}
            />

            <TileMap
                text='Most Played Artists'
                items={mostPlayedArtists}
                getImageHash={a => a.image}
                getTitle={a => a.artist}
                getCount={a => a.listens}
            />

            <TileMap
                text='Most Played Songs'
                items={mostPlayedSongs}
                getImageHash={a => a.image}
                getTitle={a => a.song}
                getCount={a => a.listens}
            />

            <Users text='Most Active Users' items={mostActiveUsers} />

        </div>
    )
}

function Users({ text, items }: { text: string, items: MusicUser[] }) {
    return (
        <Card text={text}>
            <div className='grid grid-cols-2 gap-2 w-full pt-2'>
                {items.slice(0, 5).map((item, index) => (
                    <TileCard
                        key={`${index}-${item.user_id}`}
                        imageHash={item.avatar}
                        className={`${index === 0 ? 'col-span-2' : ''}`}
                        discord={true}
                        user_id={item.user_id}
                    >
                        <div className='font-semibold text-lg truncate'>{item.name}</div>
                        <div className='text-sm text-gray-400 truncate'>{item.songs_played} listen{Number(item.songs_played) === 1 ? '' : 's'}</div>
                    </TileCard>
                ))}
            </div>
        </Card>
    )
}

function TileMap<T>({ text, items, getImage, getImageHash, getTitle, getSubtitle, getCount }: TileMapProps<T>) {
    return (
        <Card text={text}>
            <div className='grid grid-cols-2 gap-2 w-full pt-2'>
                {items.map((item, index) => (
                    <TileCard
                        key={getTitle(item)}
                        imageHash={getImageHash ? getImageHash(item) : undefined}
                        image={getImage ? getImage(item) : undefined}
                        className={`${index === 0 ? 'col-span-2' : ''}`}
                    >
                        <Marquee className='truncate' innerClassName='font-semibold text-lg' text={`${getTitle(item)}`} />
                        {getSubtitle && (
                            <Marquee className='truncate' innerClassName='text-sm text-gray-400' text={`${getSubtitle(item)}`} />
                        )}
                        {getCount && (
                            <Marquee className='truncate' innerClassName='text-sm text-gray-400' text={`${getCount(item)} plays`} />
                        )}
                    </TileCard>
                ))}
            </div>
        </Card>
    )
}
