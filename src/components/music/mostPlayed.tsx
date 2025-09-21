import React, { useState } from 'react'
import Card from './actualCard'
import TileCard from './tileCard'
import TileMap from './tileMap'
import no from '@text/music/no.json'
import en from '@text/music/en.json'
import Marquee from './Marquee'
import { Trophy } from 'lucide-react'
import PlayIcon from './playIcon'
import clsx from '@utils/clsx'

type MostPlayedProps = {
    lang: Lang
    mostPlayedAlbums: Album[]
    mostPlayedArtists: ArtistPlayed[]
    mostPlayedSongs: CountedSong[]
    mostActiveUsers: MusicUser[]
    mostSkippingUsers: MusicSkipUser[]
    currentlyPlaying: Song[]
}

type UsersProps = {
    text: string[]
    mostActiveUsers: MusicUser[]
    dropdown?: boolean
    defaultOpen?: boolean
    currentlyPlaying: Song[]
    mostSkippingUsers: MusicSkipUser[]
}

export default function MostPlayed({
    lang,
    mostPlayedAlbums,
    mostPlayedArtists,
    mostPlayedSongs,
    mostActiveUsers,
    mostSkippingUsers,
    currentlyPlaying
}: MostPlayedProps) {
    const text = (lang === 'no' ? no : en)

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-4 w-full justify-items-center'>
            <TileMap
                text={text.most_played_albums}
                items={mostPlayedAlbums}
                getImageHash={a => a.top_song_image}
                getTitle={a => a.album}
                getCount={a => a.listens}
                dropdown={true}
                defaultOpen={true}
            />

            <TileMap
                text={text.most_played_artists}
                items={mostPlayedArtists}
                getImageHash={a => a.image}
                getTitle={a => a.artist}
                getCount={a => a.listens}
                dropdown={true}
                defaultOpen={true}
            />

            <TileMap
                text={text.most_played_songs}
                items={mostPlayedSongs}
                getImageHash={a => a.image}
                getTitle={a => a.song}
                getCount={a => a.listens}
                dropdown={true}
                defaultOpen={true}
            />

            <Users
                text={text.users}
                mostActiveUsers={mostActiveUsers}
                mostSkippingUsers={mostSkippingUsers}
                currentlyPlaying={currentlyPlaying}
                dropdown={true}
                defaultOpen={true}
            />

        </div>
    )
}

function Users({ text, mostActiveUsers, dropdown = false, defaultOpen = true, currentlyPlaying, mostSkippingUsers }: UsersProps) {
    const musicUserCategories: MusicUserCategory[] = ['listens', 'skips']
    const [category, setCategory] = useState('listens' as MusicUserCategory)
    const items = category === 'listens' ? mostActiveUsers : mostSkippingUsers
    const suffix = category === 'listens' ? 'listen' : 'skip'

    return (
        <Card<MusicUserCategory>
            text={text}
            dropdown={dropdown}
            current={category}
            defaultOpen={defaultOpen}
            handleChange={setCategory}
            changeValues={musicUserCategories}
        >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full pt-2'>
                {items.slice(0, 5).map((item, index) => {
                    const isCurrentlyListening = currentlyPlaying.some(user => user.user === item.name)
                    const count = Number(category === 'listens' ? (item as MusicUser).songs_played! : (item as MusicSkipUser).songs_skipped!)
                    return (
                        <TileCard
                            key={`${index}-${item.user_id}`}
                            imageHash={item.avatar}
                            className={clsx(index === 0 && 'md:col-span-2 outline-2 outline-[var(--color-music-outline)] m-0.5')}
                            discord={true}
                            user_id={item.user_id}
                        >
                            <div className='flex w-full justify-between text-neutral-400 items-top'>
                                <div className={clsx('flex gap-2', isCurrentlyListening && 'max-w-[85%]')}>
                                    <Marquee className='truncate' innerClassName='font-semibold text-lg' text={item.name} />
                                    {isCurrentlyListening && <PlayIcon noColor />}
                                </div>
                                <Trophy className={`p-[1px] w-6 ${index === 0 ? 'stroke-[var(--color-music-outline)]' : index === 1 ? 'stroke-gray-400' : index === 2 ? 'stroke-yellow-800' : 'hidden'}`} />
                            </div>
                            <div className='text-sm text-neutral-400 truncate'>
                                {count} {suffix}{count === 1 ? '' : 's'}
                            </div>
                        </TileCard>
                    )
                })}
            </div>
        </Card>
    )
}
