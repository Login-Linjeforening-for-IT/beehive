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
    getCount?: (item: T) => string | number
    dropdown?: boolean
    defaultOpen?: boolean
    darker?: boolean
}

interface WithArtist {
    artist: string
}

export default function TileMap<T extends WithArtist>({ text, items, countSuffix, getImage, getImageHash, getTitle, getCount, dropdown = false, defaultOpen = true, darker = false }: TileMapProps<T>) {
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
                        <Marquee
                            className='truncate'
                            innerClassName={`text-sm ${darker ? 'text-neutral-500' : 'text-neutral-400'}`}
                            text={`${item.artist} ${countSuffix || ''}`}
                        />
                        {getCount && (
                            <Marquee
                                className='truncate'
                                innerClassName='text-sm text-neutral-400'
                                text={`${getCount(item)} ${countSuffix || ''}`}
                            />
                        )}
                    </TileCard>
                ))}
            </div>
        </Card>
    )
}
