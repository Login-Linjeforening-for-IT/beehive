import Card from './actualCard'
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
            <div className='grid grid-cols-2 gap-2 pt-2 w-full'>
                {items.map((song, index) => (
                    <TileCard
                        key={index}
                        imageHash={song.image}
                        className={`${index === 0 ? 'col-span-2' : ''} w-full`}
                    >
                        <Marquee className='truncate' innerClassName='font-semibold text-lg' text={song.song} />
                        <Marquee className='truncate' innerClassName='text-sm text-neutral-400' text={song.artist} />
                        <Marquee className='truncate' innerClassName='text-sm text-neutral-400' text={song.album} />
                        <div className='text-sm text-neutral-400 truncate'>{song.listens} plays</div>
                    </TileCard>
                ))}
            </div>
        </Card>
    )
}
