import { getActivity } from '@utils/api'
import { NextResponse } from 'next/server'

export async function GET() {
    const data = await getActivity()
    return NextResponse.json(data)
}
