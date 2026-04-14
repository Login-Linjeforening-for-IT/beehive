import { getClients } from '@utils/api'
import PageClient from './pageClient'
import { cookies } from 'next/headers'

export default async function page() {
    const clients = await getClients()
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    const random = Math.floor(Math.random() * 3)
    return <PageClient clients={clients} random={random} lang={lang} />
}
