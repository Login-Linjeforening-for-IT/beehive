import { PlayIcon } from 'lucide-react'
import Card from './actualCard'
import Marquee from './Marquee'
import TileCard from './tileCard'

interface TileMapProps<T> {
    text: string
    items: T[]
    countSuffix?: string
    getImage?: (item: T) => string
    getImageHash?: (item: T) => string
    getTitle: (item: T) => string
    getCount?: (item: T) => string | number | React.ReactElement
    dropdown?: boolean
    defaultOpen?: boolean
}

interface WithArtist {
    artist: string
}

export default function TileMap<T extends WithArtist>({ text, items, countSuffix, getImage, getImageHash, getTitle, getCount, dropdown = false, defaultOpen = true }: TileMapProps<T>) {
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
                            {getCount && <p className='text-neutral-400 pl-2'>{getCount(item)}</p>}
                            <PlayIcon className='fill-neutral-400 stroke-0 p-[2px] -ml-[2px] pb-[4px]' />
                        </div>
                        <Marquee
                            className='truncate'
                            innerClassName='text-sm text-neutral-500'
                            text={`${item.artist} ${countSuffix || ''}`}
                        />
                    </TileCard>
                ))}
            </div>
        </Card>
    )
}
