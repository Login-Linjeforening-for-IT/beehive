import Card from './actualCard'
import CurrentlyPlayingCard from './currentlyPlayingCard'
import no from '@text/music/no.json'
import en from '@text/music/en.json'

export default function CurrentlyPlaying({ songs, lang }: { songs: Song[], lang: Lang }) {
    const text = (lang === 'no' ? no : en)
    const uniqueSongs = Array.from(new Map(songs.map(s => [s.id, s])).values())
    return (
        <Card text={text.currently_playing} className='w-full' dropdown={true} defaultOpen={true} playIcon={true}>
            <div className='grid grid-cols-2 gap-4 place-items-center max-h-[67vh] overflow-auto noscroll w-full'>
                {uniqueSongs.map((song) => <CurrentlyPlayingCard key={song.id} song={song} />)}
            </div>
        </Card>
    )
}
