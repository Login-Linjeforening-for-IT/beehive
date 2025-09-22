import TopBar from '@components/shared/topbar/TopBar'
import TopBarPwned from '@components/shared/topbar/TopBarPwned'
import Footer from '@components/shared/footer/Footer'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { cookies, headers } from 'next/headers'
import '@assets/fonts/style.css'
import '@assets/fonts/logfont/style.css'
import './globals.css'
import clsx from '@utils/clsx'

export const metadata: Metadata = {
    title: 'Login',
    description: ' Login - Linjeforeningen for IT',
}

export default async function layout({children}: {children: ReactNode}) {
    const Cookies = await cookies()
    const theme = Cookies.get('theme')?.value || 'dark'
    const lang = (Cookies.get('lang')?.value || 'no') as Lang
    const Headers = headers()
    const path = (await Headers).get('x-current-path') || ''
    const page = path.split('/').pop()
    const dashboard = path.includes('dashboard')

    return (
        <html lang='en' className={theme}>
            <body className={clsx('absolute top-0 h-[100vh] w-full bg-[var(--color-bg-body)]', dashboard && 'max-h-[100vh] overflow-hidden')}>
                {page !== 'pwned' ?
                    <header className='main-header fixed top-0 z-900 w-full'>
                        <TopBar onlyLogo={dashboard} lang={lang} />
                    </header>
                    :
                    page === 'pwned' && <header className='main-header fixed top-0 z-900 w-full'>
                        <TopBarPwned lang={lang} theme={theme} />
                    </header>
                }
                <main className='flex-1 w-full mx-auto mt-[var(--h-topbar)] min-h-[calc(100vh-var(--h-topbar))]'>
                    {children}
                </main>
                {page !== 'pwned' && !path.includes('dashboard') &&
                    <footer className='bg-[var(--color-bg-footer)] main-footer'>
                        <Footer />
                    </footer>
                }
            </body>
        </html>
    )
}
