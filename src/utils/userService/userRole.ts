import { auth, currentUser } from '@clerk/nextjs'
import { UserRole } from '@/types/types'

export function getUserRole(): UserRole | undefined {
  const { sessionClaims } = auth()
  // @ts-ignore Property 'role' does not exist on type '{}'
  return sessionClaims?.userMetadata?.role
}

export async function getAsyncUserRole(): Promise<UserRole | undefined> {
  const role = getUserRole()
  if (role) {
    return role
  }
  const user = await currentUser()
  const asyncRole = user?.publicMetadata?.role as UserRole | undefined
  return asyncRole
}
