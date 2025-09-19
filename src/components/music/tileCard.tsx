import Image from 'next/image'

type TileCardProps = {
    image?: string
    imageHash?: string
    className?: string
    children: React.ReactNode
}

export default function TileCard({ image, imageHash, className, children }: TileCardProps) {
    return (
        <div className={`flex items-center gap-4 p-2 rounded-lg bg-neutral-700/30 shadow-none ${className}`}>
            <Image
                src={image ? image : `https://i.scdn.co/image/${imageHash}`}
                alt={''}
                width={64}
                height={64}
                className='rounded-lg object-cover bg-gray-900 w-16 h-16'
            />
            <div className='flex flex-col flex-1 min-w-0'>
                {children}
            </div>
        </div>
    )
}