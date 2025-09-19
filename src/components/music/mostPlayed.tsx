import React from 'react'
import Card from './actualCard'
import TileCard from './tileCard'
import TileMap from './tileMap'
import no from '@text/music/no.json'
import en from '@text/music/en.json'

type MostPlayedProps = {
    lang: Lang
    mostPlayedAlbums: Album[]
    mostPlayedArtists: ArtistPlayed[]
    mostPlayedSongs: CountedSong[]
    mostActiveUsers: MusicUser[]
}

export function MostPlayed({ lang, mostPlayedAlbums, mostPlayedArtists, mostPlayedSongs, mostActiveUsers }: MostPlayedProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const text = (lang === 'no' ? no : en) as any


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-4 w-full justify-items-center'>
            <TileMap
                text='Most Played Albums'
                items={mostPlayedAlbums}
                getImageHash={a => a.top_song_image}
                getTitle={a => a.album}
                getCount={a => a.listens}
                countSuffix={text.plays}
                dropdown={true}
                defaultOpen={true}
            />

            <TileMap
                text='Most Played Artists'
                items={mostPlayedArtists}
                getImageHash={a => a.image}
                getTitle={a => a.artist}
                getCount={a => a.listens}
                countSuffix={text.plays}
                dropdown={true}
                defaultOpen={true}
            />

            <TileMap
                text='Most Played Songs'
                items={mostPlayedSongs}
                getImageHash={a => a.image}
                getTitle={a => a.song}
                getCount={a => a.listens}
                countSuffix={text.plays}
                dropdown={true}
                defaultOpen={true}
            />

            <Users text='Most Active Users' items={mostActiveUsers} dropdown={true} defaultOpen={true} />

        </div>
    )
}

function Users({ text, items, dropdown = false, defaultOpen = true }: { text: string, items: MusicUser[], dropdown?: boolean, defaultOpen?: boolean }) {
    return (
        <Card text={text} dropdown={dropdown} defaultOpen={defaultOpen}>
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
                        <div className='text-sm text-neutral-400 truncate'>{item.songs_played} listen{Number(item.songs_played) === 1 ? '' : 's'}</div>
                    </TileCard>
                ))}
            </div>
        </Card>
    )
}
