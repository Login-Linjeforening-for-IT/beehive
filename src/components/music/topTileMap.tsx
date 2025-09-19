import Card from './actualCard'
import TileCard from './tileCard'

export default function TopTileMap({ text, items }: {text: string, items: TopXSong[]}) {
    return (
        <Card text={text}>
            <div className='grid grid-cols-2 gap-2 w-lg pt-2'>
                {items.map((song, index) => (
                    <TileCard
                        key={index}
                        imageHash={song.image}
                        className={`${index === 0 ? 'col-span-2' : ''}`}
                    >
                        <div className='font-semibold text-lg truncate'>{song.song}</div>
                        <div className='text-sm text-gray-400 truncate'>{song.artist}</div>
                        <div className='text-sm text-gray-400 truncate'>{song.album}</div>
                        <div className='text-sm text-gray-400 truncate'>{song.play_count} plays</div>
                    </TileCard>
                ))}
            </div>
        </Card>
    )
}