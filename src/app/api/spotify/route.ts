import getActivity from '@utils/spotify/getActivity'
import { NextResponse } from 'next/server'

export async function GET() {
    const data = await getActivity()
    return NextResponse.json(data)
}
