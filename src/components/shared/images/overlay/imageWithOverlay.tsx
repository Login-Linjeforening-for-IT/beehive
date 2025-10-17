import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import getDominantEdgeColor from '@utils/getDominantColor'

type LinkIfPathProps = {
    children: ReactNode
    path?: string
    className?: string
    innerClassName?: string
}

type ImageWithOverlayProps = {
    src: string
    path?: string
    className: string
    innerClassName?: string
    alt: string
}

export default async function ImageWithOverlay({ src, path, className, innerClassName, alt }: ImageWithOverlayProps) {
    const { hex } = await getDominantEdgeColor(src)

    return (
        <LinkIfPath path={path} className={className}>
            <div
                className={`absolute -inset-[1px] scale-[1] brightness-[0.6] saturate-[150%] blur-[30px] pointer-events-none z-0 ${innerClassName}`}
                style={{
                    backgroundColor: hex || 'transparent',
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Image
                src={src}
                alt={alt}
                width={1000}
                height={400}
                quality={100}
                className='object-cover rounded-lg relative z-10'
            />
        </LinkIfPath>
    )
}

function LinkIfPath({ children, path, className }: LinkIfPathProps) {
    if (path) {
        return (
            <Link
                href={path}
                className={`relative w-full h-full cursor-pointer select-none overflow-visible will-change-transform, filter backface-hidden hover:scale-[1.03] ${className}`}
            >{children}</Link>
        )
    } else {
        return (
            <div className={`relative w-full h-full select-none overflow-visible will-change-transform, filter backface-hidden ${className}`}>
                {children}
            </div>
        )
    }
}
