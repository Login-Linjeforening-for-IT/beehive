export default function CurrentlyPlaying({songs}: {songs: object }) {
    return (
        <div>
            <h1>Currently Playing</h1>
            <p>{JSON.stringify(songs)}</p>
        </div>
    )
}
