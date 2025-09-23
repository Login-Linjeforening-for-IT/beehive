import Card from './card'
import CurrentlyPlayingCard from './currentlyPlayingCard'
import no from '@text/music/no.json'
import en from '@text/music/en.json'
import { useState } from 'react'

type CurrentlyPlayingProps = {
    songs: Song[]
    lang: Lang
    expanded?: boolean
}

export default function CurrentlyPlaying({ songs, lang, expanded }: CurrentlyPlayingProps) {
    const [open, setOpen] = useState(true)
    const text = (lang === 'no' ? no : en)
    const uniqueSongs = Array.from(new Map(songs.map(s => [s.id, s])).values())

    return (
        <Card text={text.currently_playing} removePadding={true} className='w-full' dropdown={!expanded} open={open} setOpen={setOpen} playIcon={true}>
            <div className={`grid grid-cols-1 md:grid-cols-2 p-4 ${expanded && 'pt-2'} gap-2 place-items-center ${expanded ? 'max-h-[81.5vh] overflow-auto' : 'max-h-[69vh] overflow-auto'} noscroll w-full`}>
                {uniqueSongs.map((song) => <CurrentlyPlayingCard key={song.id} song={song} />)}
            </div>
        </Card>
    )
}
