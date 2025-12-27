import Card from './card'
import { type Dispatch, type SetStateAction } from 'react'
import ListensPerDayChart from './listensPerDay'

type ActivityProps = {
    text: string
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
            text={text}
            dropdown={dropdown}
            open={open}
            setOpen={setOpen}
            only={only}
            removePadding={true}
            extraPadding={extraPadding}
        >
            <div className='gap-2 w-full px-4'>
                <ListensPerDayChart data={activity} />
            </div>
        </Card>
    )
}
