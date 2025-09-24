import React, { useState } from 'react'
import TileMap from './tileMap'
import no from '@text/music/no.json'
import en from '@text/music/en.json'
import config from '@config'

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
    const [openOne, setOpenOne] = useState(false)
    const [openTwo, setOpenTwo] = useState(false)
    const [openThree, setOpenThree] = useState(false)

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
            <TileMap
                text={text.mostx.most_liked_albums}
                items={mostLikedAlbums}
                getImageHash={a => a.image}
                getUrl={a => `${config.url.SPOTIFY_ALBUM_URL}/${a.album_id}`}
                getTitle={a => a.album}
                getFirstLine={a => a.artist}
                getCountWithIcons={a => ({
                    likeRatio: Math.round(a.like_ratio * 100),
                    totalListens: Number(a.total_listens),
                    totalSkips: Number(a.total_skips)
                })}
                dropdown={true}
                open={openOne}
                setOpen={setOpenOne}
            />

            <TileMap
                text={text.mostx.most_skipped_albums}
                items={mostSkippedAlbums}
                getImageHash={a => a.top_song_image}
                getUrl={a => `${config.url.SPOTIFY_ALBUM_URL}/${a.album_id}`}
                getTitle={a => a.album}
                getFirstLine={a => a.artist}
                getCount={a => a.skips}
                dropdown={true}
                open={openOne}
                setOpen={setOpenOne}
                skip={true}
            />

            <TileMap
                text={text.mostx.most_liked_artists}
                items={mostLikedArtists}
                getImageHash={a => a.image}
                getUrl={a => `${config.url.SPOTIFY_ARTIST_URL}/${a.artist_id}`}
                getTitle={a => a.artist}
                getCountWithIcons={a => ({
                    likeRatio: Math.round(a.like_ratio * 100),
                    totalListens: Number(a.total_listens),
                    totalSkips: Number(a.total_skips)
                })}
                dropdown={true}
                open={openTwo}
                setOpen={setOpenTwo}
            />

            <TileMap
                text={text.mostx.most_skipped_artists}
                items={mostSkippedArtists}
                getImageHash={a => a.image}
                getUrl={a => `${config.url.SPOTIFY_ARTIST_URL}/${a.artist_id}`}
                getTitle={a => a.artist}
                getFirstLine={a => a.album}
                getSecondLine={a => a.top_song}
                getCount={a => a.skips}
                dropdown={true}
                open={openTwo}
                setOpen={setOpenTwo}
                skip={true}
            />

            <TileMap
                text={text.mostx.most_liked_songs}
                items={mostLikedSongs}
                getImageHash={a => a.image}
                getTitle={a => a.song}
                getFirstLine={a => a.artist}
                getCountWithIcons={a => ({
                    likeRatio: Math.round(a.like_ratio * 100),
                    totalListens: Number(a.listens),
                    totalSkips: Number(a.skips)
                })}
                dropdown={true}
                open={openThree}
                setOpen={setOpenThree}
            />

            <TileMap
                text={text.mostx.most_skipped_songs}
                items={mostSkippedSongs}
                getImageHash={a => a.image}
                getTitle={a => a.song}
                getFirstLine={a => a.album}
                getSecondLine={a => a.artist}
                getCount={a => a.skips}
                dropdown={true}
                open={openThree}
                setOpen={setOpenThree}
                skip={true}
            />
        </div>
    )
}
