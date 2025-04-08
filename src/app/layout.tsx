import TopBar from '@components/shared/topbar/TopBar'
import Footer from '@components/shared/footer/Footer'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { cookies } from 'next/headers'
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
    // needs to run clientside not serverside
    // LogoConsoleOutput()
    return (
        <html lang='en' className={theme}>
            <body className='h-[100vh] w-[100vw] bg-[var(--color-bg-body)]'>
                <header className='main-header fixed top-0 z-900 w-full'>
                    <TopBar lang={lang} />
                </header>
                <main className='flex-1 w-full mx-auto my-[var(--h-topbar)] min-h-[calc(100vh-var(--h-topbar)-var(--h-topbar))]'>
                    {children}
                </main>
                <footer className='bg-[var(--color-bg-footer)] main-footer'>
                    <Footer />
                </footer>
            </body>
        </html>
    )
}
