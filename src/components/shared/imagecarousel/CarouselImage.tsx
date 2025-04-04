import Image from 'next/image'

export default function CarouselImage({ image, title }: { image: string, title: string }) {
    return (
        <>
            <Image
                src={image}
                alt={title}
                fill={true}
            />
        </>
    )
}
