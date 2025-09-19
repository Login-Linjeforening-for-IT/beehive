type CardProps = {
    text: string
    children: React.ReactNode
    className?: string
}

export default function Card({ text, children, className }: CardProps) {
    return (
        <div className={`bg-neutral-800/70 rounded-lg w-fit p-4 ${className}`}>
            <h1 className='font-semibold text-lg'>{text}</h1>
            <div className='grid place-items-center'>
                {children}
            </div>
        </div>
    )
}
