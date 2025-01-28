import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/omoss',
                destination: '/about',
            },
            {
                source: '/om',
                destination: '/about'
            },
            {
                source: '/arrangementer',
                destination: '/events'
            },
            {
                source: '/arrangement/:id',
                destination: '/events/:id'
            },
            {
                source: '/arrangementer/:id',
                destination: '/events/:id'
            },
            {
                source: '/karriere',
                destination: '/career'
            },
            {
                source: '/karriere/:id',
                destination: '/career/:id'
            },
            {
                source: '/bedrift',
                destination: '/companies'
            },
            {
                source: '/bedrifter',
                destination: '/companies'
            },
            {
                source: '/fond',
                destination: '/fund'
            },
            {
                source: '/fondet',
                destination: '/fund'
            },
            {
                source: '/rekruttering',
                destination: '/recruitment'
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.login.no',
                port: '',
                pathname: '/**',
                search: '',
            },
        ],
    },
}

export default nextConfig
