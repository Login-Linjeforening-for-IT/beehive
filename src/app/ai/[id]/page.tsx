import PageClient from './pageClient'

export default async function page({ params }: PromisedPageProps) {
    const id = String((await params).id)
    return <PageClient id={id} />
}
