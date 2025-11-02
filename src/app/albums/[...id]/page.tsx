import { getAlbum } from '@utils/api'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import config from '@config'
import { ArrowUpRight } from 'lucide-react'

export default async function AlbumPage({ params }: PromisedPageProps) {
    const { id } = await params
    const album = await getAlbum(id)

    if (typeof album === 'string') {
        notFound()
    }

    const lang = (await cookies()).get('lang')?.value || 'no'

    const formatter = new Intl.DateTimeFormat('no-NO', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    })

    return (
        <div className='page-container h-full'>
            <div className='page-section--normal h-full flex flex-col'>
                {album.event ?
                    <Link
                        href={`/events/${album.event.id}`}
                        className='heading-1 heading-1--top-left-corner'
                    >
                        <span className='flex items-center gap-1'>
                            {lang === 'no' ? album.name_no : album.name_en}
                            <ArrowUpRight className='size-16'/>
                        </span>
                    </Link>
                    :
                    <h1 className='heading-1 heading-1--top-left-corner'>
                        {lang === 'no' ? album.name_no : album.name_en}
                    </h1>
                }
                <section>
                    <p className='p--highlighted'>
                        {album.event.time_start ? `${formatter.format(new Date(album.event.time_start))} - ` : ''}
                        {lang === 'no' ? album.description_no : album.description_en}
                    </p>
                </section>
                {
                    album.images && album.images.length > 0 ? (
                        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {album.images.map((image: string, index: number) => (
                                <div key={index} className='relative aspect-3/2'>
                                    <Image
                                        src={`${config.url.CDN_URL}/albums/${album.id}/${image}`}
                                        alt={lang === 'no' ? album.name_no : album.name_en}
                                        className='w-full h-full rounded-lg shadow-md'
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
                    )
                }
            </div>
        </div>
    )
}