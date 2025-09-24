import { Heart, Play, SkipForward, PlayIcon } from 'lucide-react'
import Card from './card'
import Marquee from './Marquee'
import TileCard from './tileCard'
import { Dispatch, SetStateAction } from 'react'

interface TileMapProps<T> {
    text: string
    items: T[]
    getCountWithIcons?: (item: T) => { likeRatio: number, totalListens: number, totalSkips: number }
    getImage?: (item: T) => string
    getImageHash?: (item: T) => string
    dropdown: boolean
    getTitle: (item: T) => string
    getFirstLine?: (item: T) => string
    getSecondLine?: (item: T) => string
    getCount?: (item: T) => string | number
    open?: boolean
    setOpen?: Dispatch<SetStateAction<boolean>>
    skip?: boolean
    className?: string
    innerClassName?: string
    extraPadding?: boolean
}

interface WithArtist {
    artist: string
    sync_id?: string
}

export default function TileMap<T extends WithArtist>({
    text,
    items,
    getCountWithIcons,
    getImage,
    getImageHash,
    dropdown,
    getTitle,
    getFirstLine,
    getSecondLine,
    getCount,
    open = false,
    setOpen = () => {},
    skip = false,
    className,
    innerClassName,
    extraPadding
}: TileMapProps<T>) {
    return (
        <Card text={text} dropdown={dropdown} extraPadding={extraPadding} removePadding={true} open={open} setOpen={setOpen} className={className}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full p-4'>
                {items.map((item, index) => (
                    <TileCard
                        sync_id={item.sync_id}
                        key={`${getTitle(item)}-${index}`}
                        imageHash={getImageHash ? getImageHash(item) : undefined}
                        image={getImage ? getImage(item) : undefined}
                        className={`${innerClassName} ${index === 0 ? 'md:col-span-2' : ''}`}
                    >
                        <div className='flex w-full justify-between text-neutral-400 items-top'>
                            <Marquee className='truncate' innerClassName='font-semibold text-lg' text={`${getTitle(item)}`} />
                            <TopRight item={item} getCount={getCount} skip={skip} />
                        </div>
                        <Marquee
                            className='truncate'
                            innerClassName='text-sm text-neutral-500'
                            text={(getFirstLine && getFirstLine(item)) ?? ''}
                        />
                        <Marquee
                            className='truncate'
                            innerClassName='text-sm text-neutral-500'
                            text={(getSecondLine && getSecondLine(item)) ?? ''}
                        />
                        {getCountWithIcons && (
                            <div className='flex flex-row items-center gap-2'>
                                <span className='flex items-center text-neutral-500'>
                                    {getCountWithIcons(item).likeRatio}% <Heart className='w-4 stroke-neutral-500 fill-neutral-500 pb-[2px]' />
                                </span>
                                <span className='flex items-center text-neutral-500'>
                                    {getCountWithIcons(item).totalListens} <Play className='w-4 stroke-neutral-500 fill-neutral-500 pb-[2px]' />
                                </span>
                                <span className='flex items-center text-neutral-500'>
                                    {getCountWithIcons(item).totalSkips} <SkipForward className='w-4 stroke-neutral-500 fill-neutral-500 pb-[2px]' />
                                </span>
                            </div>
                        )}
                    </TileCard>
                ))}
            </div>
        </Card>
    )
}

function TopRight<T extends WithArtist>({ getCount, item, skip }: { item: T, getCount?: (item: T) => string | number, skip: boolean }) {
    if (!getCount) {
        return
    }

    return (
        <>
            <p className='text-neutral-400 pl-2'>{getCount(item)}</p>
            {!skip && <PlayIcon className='fill-neutral-400 stroke-0 p-[2px] -ml-[2px] pb-[4px]' />}
            {skip && <SkipForward className='w-4 stroke-neutral-400 fill-neutral-400 pb-[2px]' />}
        </>
    )
}
