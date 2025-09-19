import React from 'react'
import TileMap from './tileMap'

type MostSkippedProps = {
    mostSkippedAlbums: SkippedAlbum[]
    mostSkippedArtists: SkippedArtist[]
    mostSkippedSongs: SkippedSong[]
}

export function MostSkipped({ mostSkippedAlbums, mostSkippedArtists, mostSkippedSongs }: MostSkippedProps) {
    return (
        <>
            <TileMap
                text='Most Skipped Albums'
                items={mostSkippedAlbums}
                getImageHash={a => a.top_song_image}
                getTitle={a => a.album}
                getSubtitle={a => a.artist}
                getCount={a => a.skips}
                dropdown={true}
                defaultOpen={false}
            />

            <TileMap
                text='Most Skipped Artists'
                items={mostSkippedArtists}
                getTitle={a => a.artist}
                getCount={a => a.skips}
                dropdown={true}
                defaultOpen={false}
            />

            <TileMap
                text='Most Skipped Songs'
                items={mostSkippedSongs}
                getImageHash={a => a.image}
                getTitle={a => a.song}
                getCount={a => a.skips}
                dropdown={true}
                defaultOpen={false}
            />
        </>
    )
}