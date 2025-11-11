import { Heart, Play, SkipForward, PlayIcon } from 'lucide-react'
import Card from './card'
import Marquee from './marquee'
import TileCard from './tileCard'
import { Dispatch, SetStateAction } from 'react'

interface TileMapProps<T> {
    text: string
    items: T[]
    getCountWithIcons?: (item: T) => { likeRatio: number, totalListens: number, totalSkips: number }
    getImage?: (item: T) => string
    getImageHash?: (item: T) => string
    getUrl?: (item: T) => string
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

interface TileMapGeneric {
    artist?: string
    song_id?: string
    start?: string
    end?: string
    name?: string
}

export default function TileMap<T extends TileMapGeneric>({
    text,
    items,
    getCountWithIcons,
    getImage,
    getImageHash,
    getUrl,
    dropdown,
    getTitle,
    getFirstLine,
    getSecondLine,
    getCount,
    open = false,
    setOpen = () => { },
    skip = false,
    className,
    innerClassName,
    extraPadding
}: TileMapProps<T>) {
    return (
        <Card
            text={text}
            dropdown={dropdown}
            extraPadding={extraPadding}
            removePadding={true}
            open={open}
            setOpen={setOpen}
            className={className}
        >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full p-4'>
                {Array.isArray(items) && items.length > 0 && items.map((item, index) => (
                    <TileCard
                        url={getUrl && getUrl(item)}
                        name={item.name}
                        start={item.start}
                        end={item.end}
                        song_id={item.song_id}
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
                            innerClassName={`text-sm text-neutral-500 ${!getCountWithIcons && !getSecondLine && 'mb-6'}`}
                            text={(getSecondLine && getSecondLine(item)) ?? ''}
                        />
                        {getCountWithIcons && (
                            <div className={`flex flex-row items-center gap-2 ${!getSecondLine && !getFirstLine && 'mb-6'}`}>
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

function TopRight<T extends TileMapGeneric>({ getCount, item, skip }: { item: T, getCount?: (item: T) => string | number, skip: boolean }) {
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
