import { cookies } from 'next/headers'
// import PageClient from './pageClient'

export default async function page({ params }: PromisedPageProps) {
    const id = String((await params).id)
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    // return <PageClient id={id} />
    console.log(id)

    return (
        <div className='page-container min-h-[calc(100vh-var(--h-topbar))]'>
            <h1 className='text-xl'>{lang === 'no' ? 'Under oppussing!' : 'Under maintenance!'}</h1>
            <h1>{lang === 'no' ? 'Kom tilbake senere.' : 'Check back soon!'}</h1>
        </div>
    )
}
