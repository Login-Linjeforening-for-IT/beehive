import React from 'react'
import Card from './actualCard'
import Image from 'next/image'

type MostPlayedProps = {
    mostPlayedAlbums: Album[]
    mostPlayedArtists: ArtistPlayed[]
    mostPlayedSongs: CountedSong[]
}

export function MostPlayed({ mostPlayedAlbums, mostPlayedArtists, mostPlayedSongs }: MostPlayedProps) {
    return (
        <div className='space-y-8'>
            <Card text='Most Played Albums'>
                <div className='grid grid-cols-2 gap-2 w-xl'>
                    {mostPlayedAlbums.map((album, index) => (
                        <TileCard key={album.album} imageHash={album.top_song_image} className={`${index == 0 ? 'col-span-2' : ''}`}>
                            <div className='font-semibold text-lg truncate'>{album.album}</div>
                            <div className='text-sm text-gray-400 truncate'>{album.artist}</div>
                            <div className='text-sm text-gray-400 truncate'>{album.play_count} plays</div>
                        </TileCard>
                    ))}
                </div>
            </Card>

            <Card text='Most Played Artists'>
                <div className='grid grid-cols-2 gap-2 w-xl'>
                    {mostPlayedArtists.map((artist, index) => (
                        <TileCard key={artist.artist} imageHash={artist.image} className={`${index == 0 ? 'col-span-2' : ''}`}>
                            <div className='font-semibold text-lg truncate'>{artist.artist}</div>
                            <div className='text-sm text-gray-400 truncate'>{artist.album}</div>
                            <div className='text-sm text-gray-400 truncate'>{artist.play_count} plays</div>
                        </TileCard>
                    ))}
                </div>
            </Card>

            <Card text='Most Played Songs'>
                <div className='grid grid-cols-2 gap-2 w-xl'>
                    {mostPlayedSongs.map((song, index) => (
                        <TileCard key={song.song} imageHash={song.image} className={`${index == 0 ? 'col-span-2' : ''}`}>
                            <div className='font-semibold text-lg truncate'>{song.song}</div>
                            <div className='text-sm text-gray-400 truncate'>{song.artist}</div>
                            <div className='text-sm text-gray-400 truncate'>{song.listens} plays</div>
                        </TileCard>
                    ))}
                </div>
            </Card>
        </div>
    )
}

function TileCard({ imageHash, className, children }: { imageHash: string; className?: string; children: React.ReactNode }) {
    return (
        <div className={`flex items-center gap-4 p-2 rounded-lg bg-neutral-800 shadow-none ${className}`}>
            <Image
                src={`https://i.scdn.co/image/${imageHash}`}
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
