import { NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs'

export async function POST(request: Request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()
  const params = { publicMetadata: data }
  try {
    await clerkClient.users.updateUser(userId, params)
  } catch {
    return NextResponse.json({ error: 'Clerk API error' }, { status: 500 })
  }
  // create user in DB

  return NextResponse.json({ status: 200 })
}

export async function DELETE() {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    await clerkClient.users.deleteUser(userId)
  } catch {
    return NextResponse.json({ error: 'Clerk API error' }, { status: 500 })
  }
  // delete current user from DB

  return NextResponse.json({ status: 200 })
}
