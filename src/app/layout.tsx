import { ReactNode } from 'react'
import type { Metadata } from 'next'
import TopBar from '@components/shared/topbar/TopBar'
import Footer from '@components/shared/footer/Footer'
import '@assets/fonts/style.css'
import '@assets/fonts/logfont/style.css'
import './globals.css'
import { Provider } from '@context/context'
import { cookies } from 'next/headers'


export const metadata: Metadata = {
    title: 'Login',
    description: ' Login - Linjeforeningen for IT',
}

export default async function layout({children}: {children: ReactNode}) {
    const theme = (await cookies()).get('theme')?.value || 'dark'

    return (
        <html lang='en' className={theme}>
            <body className='h-[100vh] w-[100vw]'>
                <Provider>
                    <header className='main-header fixed top-0 z-900 w-full'>
                        <TopBar/>
                    </header>
                    <main className='flex-1 w-full mx-auto my-[var(--h-topbar)] min-h-[calc(100vh-var(--h-topbar)-var(--h-topbar))]'>
                        {children}
                    </main>
                    <footer className='bg-[var(--color-bg-footer)] main-footer'>
                        <Footer/>
                    </footer>
                </Provider>
            </body>
        </html>
    )
}
