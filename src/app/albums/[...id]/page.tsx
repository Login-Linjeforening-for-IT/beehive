export default async function AlbumPage({ params }: PromisedPageProps) {
    const { id } = await params
    return <div>Album ID: {id}</div>
}