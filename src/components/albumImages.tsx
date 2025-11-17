'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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
    const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set())
    const [visibleCount, setVisibleCount] = useState(12)
    const sentinelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (currentIndex !== null) {
            document.body.classList.add('overflow-hidden')
            preloadAdjacentImages(currentIndex)
        } else {
            document.body.classList.remove('overflow-hidden')
        }

        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [currentIndex])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleCount < images.length) {
                    setVisibleCount(prev => Math.min(prev + 12, images.length))
                }
            },
            { threshold: 0.1 }
        )

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current)
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current)
            }
        }
    }, [visibleCount, images.length])

    const preloadAdjacentImages = useCallback((index: number) => {
        const imagesToPreload = []
        const prevIndex = (index - 1 + images.length) % images.length
        const nextIndex = (index + 1) % images.length

        if (!preloadedImages.has(prevIndex)) {
            imagesToPreload.push(prevIndex)
        }
        if (!preloadedImages.has(nextIndex)) {
            imagesToPreload.push(nextIndex)
        }

        imagesToPreload.forEach(imgIndex => {
            const img = new window.Image()
            img.src = `${config.url.CDN_URL}/albums/${albumId}/${images[imgIndex]}`
            img.onload = () => {
                setPreloadedImages(prev => new Set([...prev, imgIndex]))
            }
        })
    }, [images, albumId, preloadedImages])

    const goToPrevious = useCallback(() => {
        if (currentIndex !== null) {
            setCurrentIndex((currentIndex - 1 + images.length) % images.length)
        }
    }, [currentIndex, images.length])

    const goToNext = useCallback(() => {
        if (currentIndex !== null) {
            setCurrentIndex((currentIndex + 1) % images.length)
        }
    }, [currentIndex, images.length])

    useEffect(() => {
        if (currentIndex === null) return

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowLeft':
                    goToPrevious()
                    break
                case 'ArrowRight':
                    goToNext()
                    break
                case 'Escape':
                    setCurrentIndex(null)
                    break
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [currentIndex, goToPrevious, goToNext])

    return (
        <>
            {images && images.length > 0 ? (
                <div className='mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {images.slice(0, visibleCount).map((image: string, index: number) => (
                        <div key={index} className='relative aspect-3/2 cursor-pointer' onClick={() => setCurrentIndex(index)}>
                            <div className='absolute inset-0 bg-(--color-bg-surface-raised) rounded-lg animate-pulse' />
                            <Image
                                src={`${config.url.CDN_URL}/albums/${albumId}/${image}`}
                                alt={lang === 'no' ? albumNameNo : albumNameEn}
                                className='w-full h-full rounded-lg shadow-md hover:opacity-80 transition-opacity object-cover'
                                fill={true}
                                loading='eager'
                                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                                quality={75}
                                decoding='async'
                            />
                        </div>
                    ))}
                    <div ref={sentinelRef} className='col-span-full h-4' />
                </div>
            ) : (
                <p className='p--regular mt-4'>
                    {lang === 'no'
                        ? 'Ingen bilder tilgjengelig i dette albumet.'
                        : 'No images available in this album.'}
                </p>
            )}

            {currentIndex !== null && (
                <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-900' onClick={() => setCurrentIndex(null)}>
                    <div className='relative w-screen sm:w-[70vw] h-auto aspect-3/2 p-2 md:p-20 px-2 md:px-30 rounded-2xl bg-(--color-bg-body) m-4 md:m-10' onClick={(e) => e.stopPropagation()}>
                        {currentIndex !> 0 && (
                            <button
                                className='absolute left-5 top-1/2 transform -translate-y-1/2 justify-center z-10 cursor-pointer bg-(--color-bg-body)/90 rounded-full p-1 sm:bg-none'
                                onClick={(e) => { e.stopPropagation(); goToPrevious() }}
                            >
                                <ChevronLeft size={30} />
                            </button>
                        )}
                        <Image
                            src={`${config.url.CDN_URL}/albums/${albumId}/${images[currentIndex!]}`}
                            alt={lang === 'no' ? albumNameNo : albumNameEn}
                            className='w-full h-full object-contain rounded-2xl'
                            fill={true}
                            priority
                            loading='eager'
                            sizes='100vw'
                            quality={95}
                            decoding='async'
                        />
                        <button
                            className='absolute top-5 right-5 cursor-pointer bg-(--color-bg-body)/90 rounded-full p-1 sm:bg-none'
                            onClick={() => setCurrentIndex(null)}
                        >
                            <X size={30} />
                        </button>
                        {currentIndex !< images.length - 1 && (
                            <button
                                className='absolute right-5 top-1/2 transform -translate-y-1/2 justify-center z-10 cursor-pointer bg-(--color-bg-body)/90 rounded-full p-1 sm:bg-none'
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