import config from '@config'
import { NextResponse } from 'next/server'

export async function GET() {
    const response = NextResponse.redirect(new URL('/', config.url.MAIN_URL))

    // Remove all authentication cookies
    const cookiesToRemove = [
        'access_token',
        'access_token_expires',
        'refresh_token',
        'refresh_token_expires',
        'user_id',
        'user_name',
        'user_roles'
    ]

    cookiesToRemove.forEach(cookieName => {
        response.cookies.delete(cookieName)
    })

    return response
}
