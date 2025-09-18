import React from 'react'
import Card from './actualCard'

type MostPlayedProps = {
    mostPlayedAlbums: Album[]
    mostPlayedArtists: ArtistPlayed[]
    mostPlayedSongs: CountedSong[]
}

export function MostPlayed({ mostPlayedAlbums, mostPlayedArtists, mostPlayedSongs }: MostPlayedProps) {
    return (
        <div className='space-y-8'>
            <Card text='Most Played Albums'>
                <ul className='list-disc ml-6'>
                    {mostPlayedAlbums.map((album) => (
                        <li key={album.album + album.artist}>
                            {album.album} by {album.artist}
                        </li>
                    ))}
                </ul>
            </Card>

            <Card text='Most Played Artists'>
                <ul className='list-disc ml-6'>
                    {mostPlayedArtists.map((artist) => (
                        <li key={artist.artist}>
                            {artist.artist} ({artist.play_count} plays)
                        </li>
                    ))}
                </ul>
            </Card>

            <Card text='Most Played Songs'>
                <ul className='list-decimal ml-6'>
                    {mostPlayedSongs.map((song) => (
                        <li key={song.song + song.artist}>
                            {song.song} by {song.artist} ({song.listens ?? 0} plays)
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    )
}
