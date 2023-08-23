import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

export async function POST(request: Request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()
  console.log(data)
  // save data in DB

  return NextResponse.json({ status: 200 })
}
