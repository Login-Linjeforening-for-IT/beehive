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
    getSubtitle?: (item: T) => string
    getCount?: (item: T) => string | number
    dropdown?: boolean
    defaultOpen?: boolean
}

export default function TileMap<T>({ text, items, countSuffix, getImage, getImageHash, getTitle, getSubtitle, getCount, dropdown = false, defaultOpen = true }: TileMapProps<T>) {
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
                        <Marquee className='truncate' innerClassName='font-semibold text-lg' text={`${getTitle(item)}`} />
                        {getSubtitle && (
                            <Marquee className='truncate' innerClassName='text-sm text-neutral-400' text={`${getSubtitle(item)}`} />
                        )}
                        {getCount && (
                            <Marquee className='truncate' innerClassName='text-sm text-neutral-400' text={`${getCount(item)} ${countSuffix || ''}`} />
                        )}
                    </TileCard>
                ))}
            </div>
        </Card>
    )
}