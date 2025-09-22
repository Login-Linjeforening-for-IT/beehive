import { PlayIcon } from 'lucide-react'
import Card from './card'
import Marquee from './Marquee'
import TileCard from './tileCard'

type TopTileMapProps = {
    text: string
    items: TopXSong[]
    dropdown?: boolean
    defaultOpen?: boolean
}

export default function TopTileMap({ text, items, dropdown = false, defaultOpen = true }: TopTileMapProps) {
    return (
        <Card text={text} className='w-full' dropdown={dropdown} defaultOpen={defaultOpen}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 w-full'>
                {items.map((song, index) => (
                    <TileCard
                        key={index}
                        imageHash={song.image}
                        className={`${index === 0 ? 'md:col-span-2' : ''} w-full`}
                    >
                        <div className='flex w-full justify-between text-neutral-400 items-top'>
                            <Marquee className='truncate' innerClassName='font-semibold text-lg' text={song.song} />
                            <p className='text-neutral-400'>{song.listens}</p>
                            <PlayIcon className='fill-neutral-400 stroke-0 p-[2px] -ml-[2px] pb-[4px]' />
                        </div>
                        <Marquee className='truncate' innerClassName='text-sm text-neutral-500' text={song.artist} />
                        <Marquee className='truncate' innerClassName='text-sm text-neutral-500' text={song.album} />
                    </TileCard>
                ))}
            </div>
        </Card>
    )
}
