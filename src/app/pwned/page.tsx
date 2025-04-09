import { cookies, headers } from 'next/headers'
import PageClient from './pageClient'

export default async function page(){
    const pwned = (await headers()).get('x-pwned')
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    return <PageClient pwnedNumber={Number(pwned)} lang={lang} />
}
