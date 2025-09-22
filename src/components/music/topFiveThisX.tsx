import TopTileMap from './topTileMap'
import no from '@text/music/no.json'
import en from '@text/music/en.json'

type IntervalKey = 'today' | 'yesterday' | 'thisWeek' | 'thisMonth' | 'thisYear' | 'lastWeek' | 'lastMonth' | 'lastYear'

type InnerTopFiveThisXProps = {
    interval: IntervalKey
    data: Music
    lang: Lang
    defaultOpen?: boolean
    dropdown?: boolean
}

export default function TopFiveThisX({ data, lang }: { data: Music, lang: Lang }) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
            <InnerTopFiveThisX interval='today' data={data} lang={lang} />
            <InnerTopFiveThisX interval='yesterday' data={data} lang={lang} />
            <InnerTopFiveThisX interval='thisWeek' data={data} lang={lang} />
            <InnerTopFiveThisX interval='lastWeek' data={data} lang={lang} />
            <InnerTopFiveThisX interval='thisMonth' data={data} lang={lang} />
            <InnerTopFiveThisX interval='lastMonth' data={data} lang={lang} />
            <InnerTopFiveThisX interval='thisYear' data={data} lang={lang} />
            <InnerTopFiveThisX interval='lastYear' data={data} lang={lang} />
        </div>
    )
}

export function InnerTopFiveThisX({ interval, data, lang, defaultOpen, dropdown }: InnerTopFiveThisXProps) {
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
                defaultOpen={defaultOpen ?? false}
            />
        </div>
    )
}

