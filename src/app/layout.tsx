import { ReactNode } from "react"
import type { Metadata } from "next"
import TopBar from "@app/layouts/topbar/TopBar"
import Footer from "@app/layouts/footer/Footer"
import "./globals.css"


export const metadata: Metadata = {
    title: "Login",
    description: " Login - Linjeforeningen for IT",
}

export default function RootLayout({children}: {children: ReactNode}): JSX.Element {
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
