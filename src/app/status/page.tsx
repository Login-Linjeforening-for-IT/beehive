import { cookies } from 'next/headers'
// import PageClient from './pageClient'

export default async function page() {
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    // const status = await getStatus()
    // return <PageClient id={id} />

    return (
        <div className='page-container min-h-[calc(100vh-var(--h-topbar))] w-full'>
            <div className='page-section--normal flex flex-col'>
                <h1 className='page-section--normal heading-1 heading-1--top-left-corner'>
                    Status
                </h1>
                <h1 className='text-xl'>{lang === 'no' ? 'Under oppussing!' : 'Under maintenance!'}</h1>
                <h1>{lang === 'no' ? 'Kom tilbake senere.' : 'Check back soon!'}</h1>
            </div>
        </div>
    )
}
