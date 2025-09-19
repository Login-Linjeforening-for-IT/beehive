import Card from './actualCard'
import CurrentlyPlayingCard from './currentlyPlayingCard'

export default function CurrentlyPlaying({songs}: {songs: Song[] }) {
    const uniqueSongs = Array.from(new Map(songs.map(s => [s.id, s])).values())
    return (
        <Card text='Currently Playing' className='w-full' dropdown={true} defaultOpen={true} playIcon={true}>
            <div className='grid grid-cols-2 gap-4 place-items-center max-h-[67vh] overflow-auto w-full'>
                {uniqueSongs.map((song) => <CurrentlyPlayingCard key={song.id} song={song} />)}
            </div>
        </Card>
    )
}
