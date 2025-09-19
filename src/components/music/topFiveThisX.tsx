import TopTileMap from './topTileMap'

type IntervalKey = 'today' | 'yesterday' | 'thisWeek' | 'thisMonth' | 'thisYear' | 'lastWeek' | 'lastMonth' | 'lastYear'

export default function TopFiveThisX({ data }: { data: Music }) {
    return (
        <div className='grid grid-cols-2 gap-4 w-full mb-4'>
            <InnerTopFiveThisX interval='today' data={data} />
            <InnerTopFiveThisX interval='yesterday' data={data} />
            <InnerTopFiveThisX interval='thisWeek' data={data} />
            <InnerTopFiveThisX interval='lastWeek' data={data} />
            <InnerTopFiveThisX interval='thisMonth' data={data} />
            <InnerTopFiveThisX interval='lastMonth' data={data} />
            <InnerTopFiveThisX interval='thisYear' data={data} />
            <InnerTopFiveThisX interval='lastYear' data={data} />
        </div>
    )
}

function InnerTopFiveThisX({ interval, data }: { interval: IntervalKey, data: Music }) {
    const lookup: Record<IntervalKey, TopXSong[]> = {
        today: data.topFiveToday,
        yesterday: data.topFiveYesterday,
        thisWeek: data.topFiveThisWeek,
        lastWeek: data.topFiveLastWeek,
        thisMonth: data.topFiveThisMonth,
        lastMonth: data.topFiveLastMonth,
        thisYear: data.topFiveThisYear,
        lastYear: data.topFiveLastYear,
    }

    const songsToShow = lookup[interval] ?? []

    return (
        <div className='grid gap-2 w-full'>
            <TopTileMap items={songsToShow} text={`Top Five ${formatText(interval)}`} />
        </div>
    )
}

function formatText(text: string) {
    return `${text.slice(0, 1).toUpperCase()}${text.slice(1).replace(/([A-Z])/g, ' $1')}`
}
