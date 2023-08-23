import { auth, currentUser } from '@clerk/nextjs'
import { userRole, defaultUserData } from '@/utils/consts'
import { UserDetails, UserRole } from '@/types/types'

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

export function getUserRedirectPath(role: string): string {
  return role === userRole.producer ? `/producer/crew_list` : `/crew/profile`
}

export function getUserDetails(): UserDetails {
  // const { userId, sessionClaims } = auth()
  const { sessionClaims } = auth()

  // get user from DB by userId
  // if does not exist:

  const firstName = (sessionClaims?.userFirstName as string) || ''
  const lastName = (sessionClaims?.userLastName as string) || ''

  return { ...defaultUserData, firstName, lastName }
}

export async function createUser(data: { role: UserRole }) {
  const body = JSON.stringify(data)
  const resp = await fetch('/api/user', {
    method: 'POST',
    body,
  })
  if (!resp.ok) {
    throw new Error(`Api has returned status code: ${resp.status}`)
  }
}

export async function deleteUser() {
  const resp = await fetch('/api/user', { method: 'DELETE' })
  if (!resp.ok) {
    throw new Error(`Api has returned status code: ${resp.status}`)
  }
}

export async function saveUserDetails(data: UserDetails) {
  const body = JSON.stringify(data)
  const resp = await fetch('/api/user_details', {
    method: 'POST',
    body,
  })
  if (!resp.ok) {
    throw new Error(`Api has returned status code: ${resp.status}`)
  }
}
