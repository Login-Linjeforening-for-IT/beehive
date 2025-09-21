import TopBar from '@components/shared/topbar/TopBar'
import TopBarPwned from '@components/shared/topbar/TopBarPwned'
import Footer from '@components/shared/footer/Footer'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { cookies, headers } from 'next/headers'
// import { LogoConsoleOutput } from '@utils/ConsoleOutput'
import '@assets/fonts/style.css'
import '@assets/fonts/logfont/style.css'
import './globals.css'

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
    // needs to run clientside not serverside
    // LogoConsoleOutput()
    return (
        <html lang='en' className={theme}>
            <body className='absolute top-0 h-[100vh] w-full bg-[var(--color-bg-body)]'>
                {page !== 'pwned' ?
                    <header className='main-header fixed top-0 z-900 w-full'>
                        <TopBar onlyLogo={page === 'display'} lang={lang} />
                    </header>
                    :
                    page === 'pwned' && <header className='main-header fixed top-0 z-900 w-full'>
                        <TopBarPwned lang={lang} theme={theme} />
                    </header>
                }
                <main className='flex-1 w-full mx-auto mt-[var(--h-topbar)] min-h-[calc(100vh-var(--h-topbar))]'>
                    {children}
                </main>
                {page !== 'pwned' && page !== 'display' &&
                    <footer className='bg-[var(--color-bg-footer)] main-footer'>
                        <Footer />
                    </footer>
                }
            </body>
        </html>
    )
}
