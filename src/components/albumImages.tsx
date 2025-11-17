'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import config from '@config'

type AlbumImagesProps = {
    images: string[]
    albumId: number
    albumNameNo: string
    albumNameEn: string
    lang: string
}

export default function AlbumImages({ images, albumId, albumNameNo, albumNameEn, lang }: AlbumImagesProps) {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null)

    useEffect(() => {
        if (currentIndex !== null) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }

        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [currentIndex])

    const goToPrevious = () => {
        if (currentIndex !== null) {
            setCurrentIndex((currentIndex - 1 + images.length) % images.length)
        }
    }

    const goToNext = () => {
        if (currentIndex !== null) {
            setCurrentIndex((currentIndex + 1) % images.length)
        }
    }

    return (
        <>
            {images && images.length > 0 ? (
                <div className='mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {images.map((image: string, index: number) => (
                        <div key={index} className='relative aspect-3/2 cursor-pointer' onClick={() => setCurrentIndex(index)}>
                            <Image
                                src={`${config.url.CDN_URL}/albums/${albumId}/${image}`}
                                alt={lang === 'no' ? albumNameNo : albumNameEn}
                                className='w-full h-full rounded-lg shadow-md hover:opacity-80 transition-opacity'
                                width={600}
                                height={400}
                                loading='lazy'
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className='p--regular mt-4'>
                    {lang === 'no'
                        ? 'Ingen bilder tilgjengelig i dette albumet.'
                        : 'No images available in this album.'}
                </p>
            )}

            {currentIndex !== null && (
                <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-900' onClick={() => setCurrentIndex(null)}>
                    <div className='relative top-0 md:top-10 max-w-full md:max-w-6xl max-h-full p-4 md:p-20 px-4 md:px-30 rounded-2xl bg-(--color-bg-body) m-4 md:m-10' onClick={(e) => e.stopPropagation()}>
                        {currentIndex > 0 && (
                            <button
                                className='absolute left-5 top-1/2 justify-center z-10 cursor-pointer bg-(--color-bg-body)/90 rounded-full p-1 sm:bg-none'
                                onClick={(e) => { e.stopPropagation(); goToPrevious() }}
                            >
                                <ChevronLeft size={30} />
                            </button>
                        )}
                        <Image
                            src={`${config.url.CDN_URL}/albums/${albumId}/${images[currentIndex]}`}
                            alt={lang === 'no' ? albumNameNo : albumNameEn}
                            className='max-w-full max-h-full object-contain rounded-2xl'
                            width={1200}
                            height={800}
                            priority
                        />
                        <button
                            className='absolute top-5 right-5 cursor-pointer bg-(--color-bg-body)/90 rounded-full p-1 sm:bg-none'
                            onClick={() => setCurrentIndex(null)}
                        >
                            <X size={30} />
                        </button>
                        {currentIndex < images.length - 1 && (
                            <button
                                className='absolute right-5 top-1/2 justify-center z-10 cursor-pointer bg-(--color-bg-body)/90 rounded-full p-1 sm:bg-none'
                                onClick={(e) => { e.stopPropagation(); goToNext() }}
                            >
                                <ChevronRight size={30} />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}