import config from '@config'

export default async function getActivity(): Promise<Music> {
    try {
        const response = await fetch(`${config.url.TEKKOM_BOT_API_URL}/activity`)

        if (!response.ok) {
            throw new Error(await response.text())
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return {
            stats: {
                avg_seconds: 0,
                total_minutes: 0,
                total_minutes_this_year: 0,
                total_songs: 0,
            },
            currentlyPlaying: [],
            mostPlayedAlbums: [],
            mostPlayedArtists: [],
            mostPlayedSongs: [],
            mostPlayedSongsPerDay: [],
            topFiveToday: [],
            topFiveYesterday: [],
            topFiveThisWeek: [],
            topFiveLastWeek: [],
            topFiveThisMonth: [],
            topFiveLastMonth: [],
            topFiveThisYear: [],
            topFiveLastYear: [],
            mostActiveUsers: [],
            mostSkippingUsers: [],
            mostLikedAlbums: [],
            mostLikedArtists: [],
            mostLikedSongs: [],
            mostSkippedAlbums: [],
            mostSkippedArtists: [],
            mostSkippedSongs: []
        }
    }
}
