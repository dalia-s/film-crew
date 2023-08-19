import { NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs'

export async function GET() {
  const { userId } = auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }
  return NextResponse.json({ test: 'Success!!!!' })
}

export async function POST(request: Request) {
  console.log('in the API POST')
  console.log(request)
  const { userId } = auth()

  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }
  return NextResponse.json({ test: 'Success!!!!' })
}

export async function DELETE() {
  const { userId } = auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }
  // delete current user from DB
  const user = await clerkClient.users.deleteUser(userId)
  console.log(user)
  // if ok, return instructions to redirect to homepage
  return NextResponse.json({})
}
