export default function EventCardSkeleton() {
    return (
        <div className='h-full w-full p-4 transition-all duration-200'>
            <div className='skeleton aspect-10/4 w-full' />
            <div className='skeleton my-4 h-[1.6rem] w-[80%]' />
            <div className='skeleton h-[1.2rem] w-[60%]' />
        </div>
    )
}
