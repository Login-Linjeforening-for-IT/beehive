import TopTileMap from './topTileMap'

type IntervalKey = 'today' | 'yesterday' | 'thisWeek' | 'thisMonth' | 'thisYear'

export default function TopFiveThisX({ data }: { data: Music }) {
    return (
        <div className='grid gap-2'>
            <InnerTopFiveThisX interval='today' data={data} />
            <InnerTopFiveThisX interval='yesterday' data={data} />
            <InnerTopFiveThisX interval='thisWeek' data={data} />
            <InnerTopFiveThisX interval='thisMonth' data={data} />
            <InnerTopFiveThisX interval='thisYear' data={data} />
        </div>
    )
}

function InnerTopFiveThisX({ interval, data }: { interval: IntervalKey, data: Music }) {
    const lookup: Record<IntervalKey, TopXSong[]> = {
        today: data.topFiveToday,
        yesterday: data.topFiveYesterday,
        thisWeek: data.topFiveThisWeek,
        thisMonth: data.topFiveThisMonth,
        thisYear: data.topFiveThisYear,
    }

    const songsToShow = lookup[interval] ?? []

    return (
        <div className='grid gap-2'>
            <TopTileMap items={songsToShow} text={`Top Five ${interval.slice(0, 1).toUpperCase()}${interval.slice(1)}`} />
        </div>
    )
}
