import type { Viewport, Metadata } from 'next'

const metadata: Metadata = {
    title: 'Login',
    keywords: ['login', 'linjeforeningen', 'IT', 'NTNU', 'Gjøvik', 'pwned', 'events', 'arrangementer', 'bedriftspresentasjon', 'sosialt', 'nettverk', 'karriere'],
    authors: [{ name: 'Login - Linjeforeningen for IT', url: 'https://login.no' }],
    description: 'Login - Linjeforeningen for IT ved NTNU i Gjøvik.',
    creator: 'Login - Linjeforeningen for IT',
    publisher: 'Login - Linjeforeningen for IT',
    openGraph: {
        title: 'Login',
        description: 'Login - Linjeforeningen for IT ved NTNU i Gjøvik.',
        url: 'https://login.no/',
        siteName: 'Login',
        images: [
            {
                url: 'https://login.no/favicon.ico',
                width: 600,
                height: 600,
                alt: 'Login Logo',
            },
        ],
        locale: 'nb_NO',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
    },
}

export default metadata

export const viewport: Viewport = {
    colorScheme: 'dark',
    themeColor: '#fd8738',
}