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
            averageDuration: 0,
            currentlyPlaying: [],
            mostPlayedAlbums: [],
            mostPlayedArtists: [],
            mostPlayedSongs: [],
            mostPlayedSongsPerDay: [],
            topFiveToday: [],
            topFiveYesterday: [],
            topFiveThisWeek: [],
            topFiveThisMonth: [],
            topFiveThisYear: []
        }
    }
}
