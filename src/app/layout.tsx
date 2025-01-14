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
        <html lang="en" className='w-[100vw]'>
            <body className='w-full'>
                <Provider>
                    <header className="main-header">
                        <TopBar/>
                    </header>
                    <main className='w-full'>
                        {children}
                    </main>
                    <Footer/>
                </Provider>
            </body>
        </html>
    )
}
