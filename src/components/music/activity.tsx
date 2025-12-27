import Card from './card'
import { type Dispatch, type SetStateAction } from 'react'
import ListensPerDayChart from './listensPerDay'

type ActivityProps = {
    text: {
        songs_played: string
        most_played: string
        listens: string
        no_data: string
    }
    activity: SongDay[]
    dropdown?: boolean
    open?: boolean
    setOpen?: Dispatch<SetStateAction<boolean>>
    only?: MusicUserCategory
    extraPadding?: boolean
}

export function Activity({
    text,
    activity,
    dropdown = false,
    open = true,
    setOpen,
    only,
    extraPadding,
}: ActivityProps) {
    return (
        <Card
            text={text.songs_played}
            dropdown={dropdown}
            open={open}
            setOpen={setOpen}
            only={only}
            removePadding={true}
            extraPadding={extraPadding}
        >
            <div className='gap-2 w-full px-4'>
                <ListensPerDayChart data={activity} text={text} />
            </div>
        </Card>
    )
}
