import CurrentlyPlayingCard from './currentlyPlayingCard'

export default function CurrentlyPlaying({songs}: {songs: Song[] }) {
    return (
        <div className='grid grid-cols-2 gap-2 gap-x-8 place-items-center w-full'>
            {songs.map((song) => <CurrentlyPlayingCard key={song.id} song={song} />)}
        </div>
    )
}
