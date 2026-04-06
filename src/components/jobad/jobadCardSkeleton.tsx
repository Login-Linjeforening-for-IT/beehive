export default function JobadCardSkeleton() {
    const skeletonClass = [
        'rounded-(--border-radius) relative overflow-hidden bg-[rgba(100,100,100,0.3)]',
        'before:content-[""] before:block before:absolute before:top-0 before:left-[-150px]',
        'before:h-full before:w-[150px]',
        'before:bg-[linear-gradient(90deg,rgba(90,90,90,0)_0%,rgba(90,90,90,0.2)_50%,rgba(90,90,90,0)_100%)]',
        'before:animate-[skeleton-loading_1.5s_infinite]',
    ].join(' ')

    return (
        <div className='h-full w-full p-4 transition-all duration-200'>
            <div className={`${skeletonClass} aspect-3/2 w-full`} />
            <div className={`${skeletonClass} my-4 h-[1.4rem] w-[80%]`} />
            <div className={`${skeletonClass} h-[1.2rem] w-[60%]`} />
        </div>
    )
}
