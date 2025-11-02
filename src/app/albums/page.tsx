import no from '@text/albums/no.json'
import en from '@text/albums/en.json'
import { cookies } from 'next/headers'
import Image from 'next/image'
import config from '@config'
import Link from 'next/link'
import { getAlbums } from '@utils/api'
import Button from '@components/button/Button'

type PageProps = {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function Page({ searchParams }: PageProps) {
    const params = await searchParams
    const currentPage = parseInt(params.page || '1', 10)
    const limit = 6
    const offset = (currentPage - 1) * limit

    const lang = (await cookies()).get('lang')?.value || 'no'
    const text = lang === 'no' ? no : en

    const response = await getAlbums({ limit, offset })
    const albums = typeof response === 'string' ? [] : response.albums
    const totalCount = typeof response === 'string' ? 0 : response.total_count
    const totalPages = Math.ceil(totalCount / limit)

    return (
        <div className='page-container h-full'>
            <div className='page-section--normal h-full flex flex-col'>
                <h1 className='heading-1 heading-1--top-left-corner'>
                    {text.title}
                </h1>
                <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {albums.map((album: GetAlbumProps) => (
                        <Link
                            key={album.id}
                            href={`/albums/${album.id}`}
                            className='hover:bg-(--color-bg-surface) rounded-lg p-6 h-fit'
                        >
                            <div className='relative flex items-center justify-center h-64 mb-2'>
                                {album.images.slice(0, 5).map((image, index) => {
                                    const positions = [
                                        { left: '50%', top: '50%', rotation: 0, scale: 1, zIndex: 3 }, // center
                                        { left: '45%', top: '45%', rotation: -6, scale: 0.95, zIndex: 2 }, // up and left
                                        { left: '55%', top: '55%', rotation: 6, scale: 0.95, zIndex: 1 }, // down and right
                                    ]
                                    const pos = positions[index] || positions[0]
                                    return (
                                        <Image
                                            key={index}
                                            src={`${config.url.CDN_URL}/albums/${album.id}/${image}`}
                                            alt={lang === 'no' ? album.name_no : album.name_en}
                                            className='absolute aspect-3/2 rounded-lg shadow-lg transition-all duration-300'
                                            style={{
                                                left: pos.left,
                                                top: pos.top,
                                                transform: `translate(-50%, -50%) rotate(${pos.rotation}deg) scale(${pos.scale})`,
                                                zIndex: pos.zIndex,
                                            }}
                                            width={280}
                                            height={180}
                                        />
                                    )
                                })}
                            </div>
                            <div className='text-center'>
                                <h2 className='text-xl font-semibold mb-2 text-text-main'>
                                    {lang === 'no' ? album.name_no : album.name_en} - {album.year}
                                </h2>
                                <p className='text-sm text-text-discreet'>
                                    {album.images.length} images
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {totalPages >= 1 && (
                    <div className='flex justify-center items-center gap-2 py-8'>
                        {currentPage > 1 && (
                            <Button
                                href={`/albums?page=${currentPage - 1}`}
                                variant='secondary-outlined'
                                target= '_self'
                                size='medium'
                            >
                                Previous
                            </Button>
                        )}

                        <span className='text-text-main'>
                            Page {currentPage} of {totalPages}
                        </span>

                        {currentPage < totalPages && (
                            <Button
                                href={`/albums?page=${currentPage + 1}`}
                                variant='secondary-outlined'
                                target= '_self'
                                size='medium'
                            >
                                Next
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
