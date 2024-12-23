'use client'

export default function getCookie(name: string) {
    if (typeof window === 'undefined') {
        return null
    }

    const cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()

        if (cookie.startsWith(`${name}=`)) {
            return cookie.substring(name.length + 1)
        }
    }

    return null
}
