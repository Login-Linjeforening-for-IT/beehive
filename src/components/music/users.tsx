import { Dispatch, SetStateAction, useState } from 'react'
import Card from './card'
import Marquee from './Marquee'
import PlayIcon from './playIcon'
import TileCard from './tileCard'
import clsx from '@utils/clsx'
import { Trophy } from 'lucide-react'

type UsersProps = {
    text: string[]
    mostActiveUsers: MusicUser[]
    dropdown?: boolean
    open?: boolean
    setOpen?: Dispatch<SetStateAction<boolean>>
    currentlyPlaying: Song[]
    mostSkippingUsers: MusicSkipUser[]
    only?: MusicUserCategory
    extraPadding?: boolean
}

export function Users({
    text,
    mostActiveUsers,
    dropdown = false,
    open = true,
    setOpen,
    currentlyPlaying,
    mostSkippingUsers,
    only,
    extraPadding
}: UsersProps) {
    const musicUserCategories: MusicUserCategory[] = ['listens', 'skips']
    const [category, setCategory] = useState(only ?? 'listens' as MusicUserCategory)
    const items = category === 'listens' ? mostActiveUsers : mostSkippingUsers
    const suffix = category === 'listens' ? 'listen' : 'skip'

    return (
        <Card<MusicUserCategory>
            text={text}
            dropdown={dropdown}
            current={category}
            open={open}
            setOpen={setOpen}
            handleChange={setCategory}
            changeValues={musicUserCategories}
            only={only}
            removePadding={true}
            extraPadding={extraPadding}
        >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full p-4'>
                {items.slice(0, 5).map((item, index) => {
                    const isCurrentlyListening = currentlyPlaying.some(user => user.user === item.name)
                    const count = Number(category === 'listens' ? (item as MusicUser).songs_played! : (item as MusicSkipUser).songs_skipped!)
                    return (
                        <TileCard
                            key={`${index}-${item.user_id}`}
                            imageHash={item.avatar}
                            className={clsx('hover:scale-102 transition transform', index === 0 && 'md:col-span-2 outline-2 outline-[var(--color-music-outline)] mx-0.5 outline-offset-[-2px]')}
                            discord={true}
                            user_id={item.user_id}
                            user={true}
                        >
                            <div className='flex w-full justify-between text-neutral-400 items-top'>
                                <div className={clsx('flex gap-2', isCurrentlyListening ? 'max-w-[85%]' : 'max-w-full')}>
                                    <Marquee className='truncate' innerClassName='font-semibold text-lg' text={item.name} />
                                    {isCurrentlyListening && <PlayIcon noColor />}
                                </div>
                                <Trophy className={`px-[1px] w-6 ${index === 0 ? 'stroke-[var(--color-music-outline)]' : index === 1 ? 'stroke-gray-400' : index === 2 ? 'stroke-yellow-800' : 'hidden'}`} />
                            </div>
                            <div className='text-sm text-neutral-400 truncate'>
                                {count} {suffix}{count === 1 ? '' : 's'}
                            </div>
                        </TileCard>
                    )
                })}
            </div>
        </Card>
    )
}
