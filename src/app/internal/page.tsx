import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import text_no from '@text/internal/no.json'
import text_en from '@text/internal/en.json'

export default async function InternalPage() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
        redirect('/api/login')
    }

    const lang = (cookieStore.get('lang')?.value || 'no') as Lang
    const text = lang === 'no' ? text_no : text_en

    return (
        <div className='page-container min-h-[calc(100vh-var(--h-topbar))]'>
            <div className='page-section--normal flex flex-col gap-8'>
                <h1 className='heading-1 heading-1--top-left-corner'>
                    {text.title}
                </h1>

                <section className='max-w-3xl'>
                    <p className='p--highlighted mb-4'>
                        {text.welcome}
                    </p>
                    <p className='p--regular mb-8'>
                        {text.description}
                    </p>
                </section>
            </div>
        </div>
    )
}
