import PageClient from './pageClient'

export default async function page() {
    // Legg til https endepunkt for clients connected
    const random = Math.floor(Math.random() * 3)
    return <PageClient random={random} />
}
