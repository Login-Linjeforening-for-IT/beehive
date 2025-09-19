import Card from './actualCard'
import Marquee from './Marquee'
import TileCard from './tileCard'

export default function TopTileMap({ text, items }: {text: string, items: TopXSong[]}) {
    return (
        <Card text={text} className='w-full'>
            <div className='grid grid-cols-2 gap-2 pt-2 w-full'>
                {items.map((song, index) => (
                    <TileCard
                        key={index}
                        imageHash={song.image}
                        className={`${index === 0 ? 'col-span-2' : ''} w-full`}
                    >
                        <Marquee className='truncate' innerClassName='font-semibold text-lg' text={song.song} />
                        <Marquee className='truncate' innerClassName='text-sm text-gray-400' text={song.artist} />
                        <Marquee className='truncate' innerClassName='text-sm text-gray-400' text={song.album} />
                        <div className='text-sm text-gray-400 truncate'>{song.listens} plays</div>
                    </TileCard>
                ))}
            </div>
        </Card>
    )
}
