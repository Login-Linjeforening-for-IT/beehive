import TileMap from './tileMap'
import no from '@text/music/no.json'
import en from '@text/music/en.json'
import { Users } from './users'
import { useState } from 'react'

type MostPlayedProps = {
    lang: Lang
    mostPlayedAlbums: Album[]
    mostPlayedArtists: ArtistPlayed[]
    mostPlayedSongs: CountedSong[]
    mostActiveUsers: MusicUser[]
    mostSkippingUsers: MusicSkipUser[]
    currentlyPlaying: Song[]
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
    const [openOne, setOpenOne] = useState(true)
    const [openTwo, setOpenTwo] = useState(true)

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-4 w-full justify-items-center'>
            <TileMap
                text={text.most_played_albums}
                items={mostPlayedAlbums}
                getImageHash={a => a.top_song_image}
                getTitle={a => a.album}
                getFirstLine={a => a.top_song}
                getSecondLine={a => a.artist}
                getCount={a => a.listens}
                dropdown={true}
                open={openOne}
                setOpen={setOpenOne}
            />

            <TileMap
                text={text.most_played_artists}
                items={mostPlayedArtists}
                getImageHash={a => a.image}
                getTitle={a => a.artist}
                getFirstLine={a => a.album}
                getSecondLine={a => a.top_song}
                getCount={a => a.listens}
                dropdown={true}
                open={openOne}
                setOpen={setOpenOne}
            />

            <TileMap
                text={text.most_played_songs}
                items={mostPlayedSongs}
                getImageHash={a => a.image}
                getTitle={a => a.song}
                getFirstLine={a => a.album}
                getSecondLine={a => a.artist}
                getCount={a => a.listens}
                dropdown={true}
                open={openTwo}
                setOpen={setOpenTwo}
            />

            <Users
                text={text.users}
                mostActiveUsers={mostActiveUsers}
                mostSkippingUsers={mostSkippingUsers}
                currentlyPlaying={currentlyPlaying}
                dropdown={true}
                open={openTwo}
                setOpen={setOpenTwo}
            />

        </div>
    )
}
