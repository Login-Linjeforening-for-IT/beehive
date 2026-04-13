import PageClient from './pageClient'

export default async function page({ params }: PromisedPageProps) {
    const id = (await params).id as string
    return <PageClient id={id} />
}
