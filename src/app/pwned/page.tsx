import PageClient from './pageClient'

export default async function page(){

    const randomTime = Math.floor((Math.random() % 32))
    console.log(randomTime)

    return <PageClient pwnedNumber={Number(randomTime)} />
}