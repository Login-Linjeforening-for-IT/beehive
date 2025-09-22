import TileMap from './tileMap'
import no from '@text/music/no.json'
import en from '@text/music/en.json'
import { Users } from './users'

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
