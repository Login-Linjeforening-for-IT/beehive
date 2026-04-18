import PageClient from './pageClient'
import { cookies } from 'next/headers'

export default async function page({ params }: PromisedPageProps) {
    const id = String((await params).id)
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang

    return <PageClient id={id} lang={lang} />
}
