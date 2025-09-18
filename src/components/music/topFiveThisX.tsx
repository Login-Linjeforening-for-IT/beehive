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

export function InnerTopFiveThisX({ interval, data }: { interval: string, data: Music }) {
    console.log(interval, data)
    return <div></div>
    // const lookup: { interval: string; data: CountedSong[] }[] = [
    //     { interval: 'today', data: data.topFiveToday },
    //     { interval: 'yesterday', data: data.topFiveYesterday },
    //     { interval: 'thisWeek', data: data.topFiveThisWeek },
    //     { interval: 'thisMonth', data: data.topFiveThisMonth },
    //     { interval: 'thisYear', data: data.topFiveThisYear },
    // ]

    // return (
    //     <div>
    //         {lookup.map(({ interval, data }) => (
    //             <InnerTopFiveThisX key={interval} data={data} />
    //         ))}
    //     </div>
    // )
}
