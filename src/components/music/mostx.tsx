import React from 'react'
import TileMap from './tileMap'

type MostLikedProps = {
    mostLikedAlbums: LikedAlbum[]
    mostLikedArtists: LikedArtist[]
    mostLikedSongs: LikedSong[]
    mostSkippedAlbums: SkippedAlbum[]
    mostSkippedArtists: SkippedArtist[]
    mostSkippedSongs: SkippedSong[]
}

export function Mostx({ mostLikedAlbums, mostLikedArtists, mostLikedSongs, mostSkippedAlbums, mostSkippedArtists, mostSkippedSongs }: MostLikedProps) {
    return (
        <>
            <TileMap
                text='Most Liked Albums'
                items={mostLikedAlbums}
                getImageHash={a => a.image}
                getTitle={a => a.album}
                getSubtitle={a => a.artist}
                getCount={a => a.total_listens}
                countSuffix='listens'
                dropdown={true}
                defaultOpen={false}
            />

            <TileMap
                text='Most Skipped Albums'
                items={mostSkippedAlbums}
                getImageHash={a => a.top_song_image}
                getTitle={a => a.album}
                getSubtitle={a => a.artist}
                getCount={a => a.skips}
                countSuffix='skips'
                dropdown={true}
                defaultOpen={false}
            />

            <TileMap
                text='Most Liked Artists'
                items={mostLikedArtists}
                getImageHash={a => a.image}
                getTitle={a => a.artist}
                getCount={a => a.total_listens}
                countSuffix='listens'
                dropdown={true}
                defaultOpen={false}
            />

            <TileMap
                text='Most Skipped Artists'
                items={mostSkippedArtists}
                getImageHash={a => a.image}
                getTitle={a => a.artist}
                getCount={a => a.skips}
                countSuffix='skips'
                dropdown={true}
                defaultOpen={false}
            />

            <TileMap
                text='Most Liked Songs'
                items={mostLikedSongs}
                getImageHash={a => a.image}
                getTitle={a => a.song}
                getCount={a => a.listens}
                countSuffix='listens'
                dropdown={true}
                defaultOpen={false}
            />

            <TileMap
                text='Most Skipped Songs'
                items={mostSkippedSongs}
                getImageHash={a => a.image}
                getTitle={a => a.song}
                getCount={a => a.skips}
                countSuffix='skips'
                dropdown={true}
                defaultOpen={false}
            />
        </>
    )
}