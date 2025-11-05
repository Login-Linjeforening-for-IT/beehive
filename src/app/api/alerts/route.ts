import { getAlerts } from '@utils/api'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    if (!page) {
        return NextResponse.json('Page parameter is required', { status: 400 })
    }
    const data = await getAlerts(page)
    return NextResponse.json(data)
}
