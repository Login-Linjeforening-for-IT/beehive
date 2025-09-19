import React from 'react'
import TileMap from './tileMap'
import no from '@text/music/no.json'
import en from '@text/music/en.json'

type MostLikedProps = {
    lang: Lang
    mostLikedAlbums: LikedAlbum[]
    mostLikedArtists: LikedArtist[]
    mostLikedSongs: LikedSong[]
    mostSkippedAlbums: SkippedAlbum[]
    mostSkippedArtists: SkippedArtist[]
    mostSkippedSongs: SkippedSong[]
}

export default function MostX({
    lang,
    mostLikedAlbums,
    mostLikedArtists,
    mostLikedSongs,
    mostSkippedAlbums,
    mostSkippedArtists,
    mostSkippedSongs
}: MostLikedProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const text = (lang === 'no' ? no : en) as any

    return (
        <>
            <TileMap
                text='Most Liked Albums'
                items={mostLikedAlbums}
                getImageHash={a => a.image}
                getTitle={a => a.album}
                getCountWithIcons={a => ({
                    likeRatio: Math.round(a.like_ratio * 100),
                    totalListens: Number(a.total_listens),
                    totalSkips: Number(a.total_skips)
                })}
                dropdown={true}
                defaultOpen={false}
            />

            <TileMap
                text='Most Skipped Albums'
                items={mostSkippedAlbums}
                getImageHash={a => a.top_song_image}
                getTitle={a => a.album}
                getCount={a => a.skips}
                countSuffix={text.skips}
                dropdown={true}
                defaultOpen={false}
            />

            <TileMap
                text='Most Liked Artists'
                items={mostLikedArtists}
                getImageHash={a => a.image}
                getTitle={a => a.artist}
                getCountWithIcons={a => ({
                    likeRatio: Math.round(a.like_ratio * 100),
                    totalListens: Number(a.total_listens),
                    totalSkips: Number(a.total_skips)
                })}
                dropdown={true}
                defaultOpen={false}
            />

            <TileMap
                text='Most Skipped Artists'
                items={mostSkippedArtists}
                getImageHash={a => a.image}
                getTitle={a => a.artist}
                getCount={a => a.skips}
                countSuffix={text.skips}
                dropdown={true}
                defaultOpen={false}
            />

            <TileMap
                text='Most Liked Songs'
                items={mostLikedSongs}
                getImageHash={a => a.image}
                getTitle={a => a.song}
                getCountWithIcons={a => ({
                    likeRatio: Math.round(a.like_ratio * 100),
                    totalListens: Number(a.listens),
                    totalSkips: Number(a.skips)
                })}
                dropdown={true}
                defaultOpen={false}
            />

            <TileMap
                text='Most Skipped Songs'
                items={mostSkippedSongs}
                getImageHash={a => a.image}
                getTitle={a => a.song}
                getCount={a => a.skips}
                countSuffix={text.skips}
                dropdown={true}
                defaultOpen={false}
            />
        </>
    )
}
