import { PlayIcon } from 'lucide-react'
import Card from './card'
import Marquee from './marquee'
import TileCard from './tileCard'
import type { Dispatch, SetStateAction } from 'react'

type TopTileMapProps = {
    text: string
    items: TopXSong[]
    dropdown?: boolean
    open?: boolean
    setOpen?: Dispatch<SetStateAction<boolean>>
    extraPadding?: boolean
}

export default function TopTileMap({ text, items, dropdown = false, open = true, setOpen, extraPadding }: TopTileMapProps) {
    const removePadding = true

    return (
        <Card text={text} className='w-full' dropdown={dropdown} extraPadding={extraPadding} removePadding={removePadding} open={open} setOpen={setOpen}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 pt-4 w-full p-4'>
                {Array.isArray(items) && items.length > 0 && items.map((song, index) => (
                    <TileCard
                        name={song.song}
                        start={song.start}
                        end={song.end}
                        key={index}
                        imageHash={song.image}
                        className={`${index === 0 ? 'md:col-span-2' : ''} w-full`}
                        song_id={song.song_id}
                    >
                        <div className='flex w-full justify-between text-neutral-400 items-top'>
                            <Marquee className='truncate' innerClassName='font-semibold text-lg' text={song.song} />
                            <p className='text-neutral-400 pl-2'>{song.listens}</p>
                            <PlayIcon className='fill-neutral-400 stroke-0 p-[2px] -ml-[2px] pb-[4px]' />
                        </div>
                        <Marquee className='truncate' innerClassName='text-sm text-neutral-500' text={song.artist} />
                        <Marquee className='truncate' innerClassName={`text-sm text-neutral-500 ${song.artist === 'Unknown' && 'mb-6'}`} text={song.album} />
                    </TileCard>
                ))}
            </div>
        </Card>
    )
}
