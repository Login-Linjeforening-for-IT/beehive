import { cookies, headers } from 'next/headers'
import PageClient from './pageClient'

export default async function page(){
    const pwned = (await headers()).get('x-pwned')
    const lang = (await cookies()).get('lang')?.value || 'no'
    return <PageClient pwnedNumber={Number(pwned)} lang={lang} />
}
