import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Login - Linjeforening for IT',
        short_name: 'Login',
        description: 'Login er linjeforeningen for IT ved NTNU i Gjøvik.',
        start_url: '/',
        display: 'standalone',
        background_color: '#191919',
        theme_color: '#191919',
        icons: [
            {
                src: '/logo-white-small.svg',
                sizes: '192x192',
                type: 'image/svg+xml',
            },
            {
                src: '/logo-white-small.svg',
                sizes: '512x512',
                type: 'image/svg+xml',
            },
        ],
    }
}