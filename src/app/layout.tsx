import TopBar from '@components/topbar/topBar'
import TopBarPwned from '@components/topbar/topBarPwned'
import Footer from '@components/footer/footer'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { cookies, headers } from 'next/headers'
import '@assets/fonts/style.css'
import '@assets/fonts/logfont/style.css'
import './globals.css'
import clsx from '@utils/clsx'
import Alerts from '@components/alerts/alerts'

export const metadata: Metadata = {
    title: 'Login',
    description: ' Login - Linjeforeningen for IT',
}

export default async function layout({children}: {children: ReactNode}) {
    const Cookies = await cookies()
    const theme = Cookies.get('theme')?.value || 'dark'
    const token = Cookies.get('access_token')?.value || null
    const lang = (Cookies.get('lang')?.value || 'no') as Lang
    const Headers = headers()
    const path = (await Headers).get('x-current-path') || ''
    const page = path.split('/').pop()
    const dashboard = path.includes('dashboard')

    return (
        <html test-id='root' lang='en' className={theme}>
            <body className={clsx('min-h-screen w-full bg-(--color-bg-body)', dashboard && 'max-h-screen overflow-hidden')}>
                {page !== 'pwned' ?
                    <header className='main-header fixed top-0 z-900 w-full'>
                        <TopBar onlyLogo={dashboard} lang={lang} theme={theme} token={token} />
                    </header>
                    :
                    page === 'pwned' && <header className='main-header fixed top-0 z-900 w-full'>
                        <TopBarPwned lang={lang} theme={theme} />
                    </header>
                }
                <main className='w-full mx-auto mt-(--h-topbar) min-h-[calc(100vh-var(--h-topbar))]'>
                    {children}
                </main>
                {page !== 'pwned' && !path.includes('dashboard') &&
                    <footer className='bg-(--color-bg-footer) main-footer'>
                        <Footer />
                    </footer>
                }
                <Alerts />
            </body>
        </html>
    )
}
