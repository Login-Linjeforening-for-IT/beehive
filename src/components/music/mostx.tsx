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
    const text = lang === 'no' ? no : en

    return (
        <>
            <TileMap
                text={text.mostx.most_liked_albums}
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
                text={text.mostx.most_skipped_albums}
                items={mostSkippedAlbums}
                getImageHash={a => a.top_song_image}
                getTitle={a => a.album}
                getCount={a => a.skips}
                countSuffix={text.skips}
                dropdown={true}
                defaultOpen={false}
            />

            <TileMap
                text={text.mostx.most_liked_artists}
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
                text={text.mostx.most_skipped_artists}
                items={mostSkippedArtists}
                getImageHash={a => a.image}
                getTitle={a => a.artist}
                getCount={a => a.skips}
                countSuffix={text.skips}
                dropdown={true}
                defaultOpen={false}
            />

            <TileMap
                text={text.mostx.most_liked_songs}
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
                text={text.mostx.most_skipped_songs}
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
