import Card from './actualCard'

export function TileInfo({ data }: { data: Array<{ title: string; value: string }> }) {
    return (
        <div className='flex flex-row gap-4 py-4 w-full'>
            {data.map((item) => (
                <Card key={item.title} text={item.title} className='text-center'>
                    <p>{item.value}</p>
                </Card>
            ))}
        </div>
    )
}