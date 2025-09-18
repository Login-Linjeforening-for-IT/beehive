import CurrentlyPlayingCard from './currentlyPlayingCard'

export default function CurrentlyPlaying({songs}: {songs: Song[] }) {
    return (
        <div className='grid grid-cols-2 gap-2 place-items-center'>
            {songs.map((song) => <CurrentlyPlayingCard key={song.id} song={song} />)}
        </div>
    )
}
