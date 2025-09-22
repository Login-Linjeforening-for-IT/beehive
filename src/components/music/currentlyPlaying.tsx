import Card from './card'
import CurrentlyPlayingCard from './currentlyPlayingCard'
import no from '@text/music/no.json'
import en from '@text/music/en.json'

type CurrentlyPlayingProps = {
    songs: Song[]
    lang: Lang
    expanded?: boolean
}

export default function CurrentlyPlaying({ songs, lang, expanded }: CurrentlyPlayingProps) {
    const text = (lang === 'no' ? no : en)
    const uniqueSongs = Array.from(new Map(songs.map(s => [s.id, s])).values())
    return (
        <Card text={text.currently_playing} className='w-full' dropdown={!expanded} defaultOpen={true} playIcon={true}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center ${expanded ? 'max-h-[81.5vh] overflow-hidden' : 'max-h-[67vh] overflow-auto'} noscroll w-full`}>
                {uniqueSongs.map((song) => <CurrentlyPlayingCard key={song.id} song={song} />)}
            </div>
        </Card>
    )
}
