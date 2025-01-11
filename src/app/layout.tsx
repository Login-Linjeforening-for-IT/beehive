import { ReactNode } from 'react'
import type { Metadata } from 'next'
import TopBar from '@components/shared/topbar/TopBar'
import Footer from '@components/shared/footer/Footer'
import './globals.css'
import '../styles/colors.css'
import '../styles/themes.css'

export const metadata: Metadata = {
    title: 'Login',
    description: ' Login - Linjeforeningen for IT',
}

export default function RootLayout({children}: {children: ReactNode}) {
    return (
        <html lang="en" className='w-[100vw]'>
            <body className='w-full'>
                <TopBar/>
                <main className='w-full'>
                    {children}
                </main>
                <Footer/>
            </body>
        </html>
    )
}
