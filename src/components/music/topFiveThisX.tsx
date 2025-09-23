import TopTileMap from './topTileMap'
import no from '@text/music/no.json'
import en from '@text/music/en.json'
import { Dispatch, SetStateAction, useState } from 'react'

type IntervalKey = 'today' | 'yesterday' | 'thisWeek' | 'thisMonth' | 'thisYear' | 'lastWeek' | 'lastMonth' | 'lastYear'

type InnerTopFiveThisXProps = {
    interval: IntervalKey
    data: Music
    lang: Lang
    open?: boolean
    setOpen?: Dispatch<SetStateAction<boolean>>
    dropdown?: boolean
}

export default function TopFiveThisX({ data, lang }: { data: Music, lang: Lang }) {
    const [openOne, setOpenOne] = useState(false)
    const [openTwo, setOpenTwo] = useState(false)
    const [openThree, setOpenThree] = useState(false)
    const [openFour, setOpenFour] = useState(false)

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
            <InnerTopFiveThisX interval='today' open={openOne} setOpen={setOpenOne} data={data} lang={lang} />
            <InnerTopFiveThisX interval='yesterday' open={openOne} setOpen={setOpenOne} data={data} lang={lang} />
            <InnerTopFiveThisX interval='thisWeek' open={openTwo} setOpen={setOpenTwo} data={data} lang={lang} />
            <InnerTopFiveThisX interval='lastWeek' open={openTwo} setOpen={setOpenTwo} data={data} lang={lang} />
            <InnerTopFiveThisX interval='thisMonth' open={openThree} setOpen={setOpenThree} data={data} lang={lang} />
            <InnerTopFiveThisX interval='lastMonth' open={openThree} setOpen={setOpenThree} data={data} lang={lang} />
            <InnerTopFiveThisX interval='thisYear' open={openFour} setOpen={setOpenFour} data={data} lang={lang} />
            <InnerTopFiveThisX interval='lastYear' open={openFour} setOpen={setOpenFour} data={data} lang={lang} />
        </div>
    )
}

export function InnerTopFiveThisX({ interval, data, lang, open, setOpen, dropdown }: InnerTopFiveThisXProps) {
    const text = lang === 'no' ? no : en
    const lookup: Record<IntervalKey, { data: TopXSong[], text: string }> = {
        today: { data: data.topFiveToday, text: text.topx.today },
        yesterday: { data: data.topFiveYesterday, text: text.topx.yesterday },
        thisWeek: { data: data.topFiveThisWeek, text: text.topx.thisWeek },
        lastWeek: { data: data.topFiveLastWeek, text: text.topx.lastWeek },
        thisMonth: { data: data.topFiveThisMonth, text: text.topx.thisMonth },
        lastMonth: { data: data.topFiveLastMonth, text: text.topx.lastMonth },
        thisYear: { data: data.topFiveThisYear, text: text.topx.thisYear },
        lastYear: { data: data.topFiveLastYear, text: text.topx.lastYear },
    }

    const songsToShow = lookup[interval] ?? []

    if (songsToShow.data.length === 0) {
        return null
    }

    return (
        <div className='grid gap-2 w-full'>
            <TopTileMap
                items={songsToShow.data}
                text={`${text.topx.intro} ${songsToShow.text}`}
                dropdown={dropdown ?? true}
                open={open}
                setOpen={setOpen}
            />
        </div>
    )
}
