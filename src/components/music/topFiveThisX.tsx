import TileCard from './tileCard'

type IntervalKey = 'today' | 'yesterday' | 'thisWeek' | 'thisMonth' | 'thisYear'

export default function TopFiveThisX({ data }: { data: Music }) {
    return (
        <div>
            <InnerTopFiveThisX interval='today' data={data} />
            <InnerTopFiveThisX interval='yesterday' data={data} />
            <InnerTopFiveThisX interval='thisWeek' data={data} />
            <InnerTopFiveThisX interval='thisMonth' data={data} />
            <InnerTopFiveThisX interval='thisYear' data={data} />
        </div>
    )
}

function InnerTopFiveThisX({ interval, data }: { interval: IntervalKey, data: Music }) {
    const lookup: Record<IntervalKey, CountedSong[]> = {
        today: data.topFiveToday,
        yesterday: data.topFiveYesterday,
        thisWeek: data.topFiveThisWeek,
        thisMonth: data.topFiveThisMonth,
        thisYear: data.topFiveThisYear,
    }

    const songsToShow = lookup[interval] ?? []

    return (
        <div>
            {songsToShow.map((song, index) => (
                <TopCard key={`${interval}-${index}`} index={index} song={song} />
            ))}
        </div>
    )
}

function TopCard({ index, song }: { song: CountedSong, index: number }) {
    return (
        <TileCard
            imageHash={song.image}
            className={`${index === 0 ? 'col-span-2' : ''}`}
        >
            <div className='font-semibold text-lg truncate'>{song.song}</div>
            <div className='text-sm text-gray-400 truncate'>{song.artist}</div>
            <div className='text-sm text-gray-400 truncate'>{song.album}</div>
            <div className='text-sm text-gray-400 truncate'>{song.listens} plays</div>
        </TileCard>
    )
}
