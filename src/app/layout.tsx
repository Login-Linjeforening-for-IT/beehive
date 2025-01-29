import { ReactNode } from 'react'
import type { Metadata } from 'next'
import TopBar from '@components/shared/topbar/TopBar'
import Footer from '@components/shared/footer/Footer'
import '@assets/fonts/style.css'
import '@assets/fonts/logfont/style.css'
import './globals.css'
import '@/styles/globals.css'
import { Provider } from '@context/context'


export const metadata: Metadata = {
    title: 'Login',
    description: ' Login - Linjeforeningen for IT',
}

export default function RootLayout({children}: {children: ReactNode}) {
    return (
        <html lang='en' className='w-[100vw]'>
            <body className='flex flex-col min-h-[100vh] w-full bg-[var(--color-bg-body)]'>
                <Provider>
                    <header className='main-header fixed top-0 z-900 w-full'>
                        <TopBar/>
                    </header>
                    <main className='flex-1 w-full mx-auto my-[var(--h-topbar)]'>
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
