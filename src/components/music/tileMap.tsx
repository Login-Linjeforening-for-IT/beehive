import { Heart, Play, SkipForward, PlayIcon } from 'lucide-react'
import Card from './actualCard'
import Marquee from './Marquee'
import TileCard from './tileCard'

interface TileMapProps<T> {
    text: string
    items: T[]
    getCountWithIcons?: (item: T) => { likeRatio: number, totalListens: number, totalSkips: number }
    getImage?: (item: T) => string
    getImageHash?: (item: T) => string
    getTitle: (item: T) => string
    getCount?: (item: T) => string | number
    dropdown?: boolean
    defaultOpen?: boolean
}

interface WithArtist {
    artist: string
}

export default function TileMap<T extends WithArtist>({ text, items, getCountWithIcons, getImage, getImageHash, getTitle, getCount, dropdown = false, defaultOpen = true }: TileMapProps<T>) {
    return (
        <Card text={text} dropdown={dropdown} defaultOpen={defaultOpen}>
            <div className='grid grid-cols-2 gap-2 w-full pt-2'>
                {items.map((item, index) => (
                    <TileCard
                        key={getTitle(item) + '-' + index}
                        imageHash={getImageHash ? getImageHash(item) : undefined}
                        image={getImage ? getImage(item) : undefined}
                        className={`${index === 0 ? 'col-span-2' : ''}`}
                    >
                        <div className='flex w-full justify-between text-neutral-400 items-top'>
                            <Marquee className='truncate' innerClassName='font-semibold text-lg' text={`${getTitle(item)}`} />
                            <TopRight item={item} getCount={getCount} />
                        </div>
                        <Marquee
                            className='truncate'
                            innerClassName='text-sm text-neutral-500'
                            text={item.artist}
                        />
                        {getCountWithIcons && (
                            <div className='flex flex-row items-center gap-2'>
                                <span className='flex items-center text-neutral-400'>
                                    {getCountWithIcons(item).likeRatio}% <Heart className='w-4 stroke-neutral-400 fill-neutral-400 pb-[2px]' />
                                </span>
                                <span className='flex items-center text-neutral-400'>
                                    {getCountWithIcons(item).totalListens} <Play className='w-4 stroke-neutral-400 fill-neutral-400 pb-[2px]' />
                                </span>
                                <span className='flex items-center text-neutral-400'>
                                    {getCountWithIcons(item).totalSkips} <SkipForward className='w-4 stroke-neutral-400 fill-neutral-400 pb-[2px]' />
                                </span>
                            </div>
                        )}
                    </TileCard>
                ))}
            </div>
        </Card>
    )
}

function TopRight<T extends WithArtist>({ getCount, item }: { item: T, getCount?: (item: T) => string | number }) {
    if (!getCount) {
        return
    }

    return (
        <>
            <p className='text-neutral-400 pl-2'>{getCount(item)}</p>
            <PlayIcon className='fill-neutral-400 stroke-0 p-[2px] -ml-[2px] pb-[4px]' />
        </>
    )
}
