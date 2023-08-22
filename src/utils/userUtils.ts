import { auth, currentUser } from '@clerk/nextjs'
import { userRole, UserRoleType } from '@/utils/consts'

export function getUserRole(): UserRoleType | undefined {
  const { sessionClaims } = auth()
  // @ts-ignore Property 'role' does not exist on type '{}'
  return sessionClaims?.userMetadata?.role
}

export async function getAsyncUserRole(): Promise<UserRoleType | undefined> {
  const role = getUserRole()
  if (role) {
    return role
  }
  const user = await currentUser()
  const asyncRole = user?.publicMetadata?.role as UserRoleType | undefined
  return asyncRole
}

export function getUserRedirectPath(role: string): string {
  return role === userRole.producer ? `/producer/crew_list` : `/crew/profile`
}

export function deleteUser(): UserRoleType | undefined {
  const { sessionClaims } = auth()
  // @ts-ignore Property 'role' does not exist on type '{}'
  return sessionClaims?.userMetadata?.role
}
