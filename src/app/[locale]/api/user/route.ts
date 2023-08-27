import { NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs'
import { roleToPrismaEnumMap } from '@/utils/consts'
import { UserRole } from '@/types/index'
import { prisma } from '@/utils/prisma'

export async function POST(request: Request) {
  const { userId, sessionClaims } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data: { role: UserRole } = await request.json()

  const params = { publicMetadata: data }
  try {
    await clerkClient.users.updateUser(userId, params)
  } catch {
    return NextResponse.json({ error: 'Clerk API error' }, { status: 500 })
  }

  try {
    await prisma.user.create({
      data: {
        clerkId: userId,
        role: roleToPrismaEnumMap[data.role],
        firstName: (sessionClaims.userFirstName as string) || '',
        lastName: (sessionClaims.userLastName as string) || '',
        email: (sessionClaims.userEmail as string) || '',
        contactNo: '',
      },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }

  return NextResponse.json({ status: 201 })
}

export async function DELETE() {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await prisma.user.delete({
      where: { clerkId: userId },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }

  try {
    await clerkClient.users.deleteUser(userId)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }

  return NextResponse.json({ status: 200 })
}
