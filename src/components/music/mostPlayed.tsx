import TileMap from './tileMap'
import no from '@text/music/no.json'
import en from '@text/music/en.json'
import { Users } from './users'
import { useState } from 'react'
import config from '@config'

type MostPlayedProps = {
    lang: Lang
    mostPlayedAlbums: Album[]
    mostPlayedArtists: ArtistPlayed[]
    mostPlayedSongs: CountedSong[]
    mostActiveUsers: MusicUser[]
    mostSkippingUsers: MusicSkipUser[]
    currentlyListening: CurrentlyPlaying[]
}

export default function MostPlayed({
    lang,
    mostPlayedAlbums,
    mostPlayedArtists,
    mostPlayedSongs,
    mostActiveUsers,
    mostSkippingUsers,
    currentlyListening
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
                getUrl={a => `${config.url.SPOTIFY_ALBUM_URL}/${a.album_id}`}
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
                getUrl={a => `${config.url.SPOTIFY_ARTIST_URL}/${a.artist_id}`}
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
                currentlyListening={currentlyListening}
                dropdown={true}
                open={openTwo}
                setOpen={setOpenTwo}
            />

        </div>
    )
}
