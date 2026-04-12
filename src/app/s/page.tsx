import { cookies } from 'next/headers'
import PageClient from './pageClient'

export default async function page() {
    const Cookies = await cookies()
    const preferredEngine = (Cookies.get('preferredEngine')?.value || '') as EngineKey
    return <PageClient preferredEngine={preferredEngine} />
}
