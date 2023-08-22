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
  const { userId } = auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const data = await request.json()
  const params = { publicMetadata: data }
  await clerkClient.users.updateUser(userId, params)

  // create user in DB

  return NextResponse.json({})
}

// export async function DELETE() {
//   const { userId } = auth()
//   if (!userId) {
//     return new Response('Unauthorized', { status: 401 })
//   }
//   // delete current user from DB
//   const user = await clerkClient.users.deleteUser(userId)
//   console.log(user)
//   // if ok, return instructions to redirect to homepage
//   return NextResponse.json({})
// }
