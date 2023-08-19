import { auth } from '@clerk/nextjs'

type Role = 'producer' | 'crew'

type UserRole = {
  producer: Role
  crew: Role
}

export const userRole: UserRole = {
  producer: 'producer',
  crew: 'crew',
}

export function getUserRole(): Role | undefined {
  const { sessionClaims } = auth()

  // @ts-ignore Property 'role' does not exist on type '{}'
  return sessionClaims?.userMetadata?.role
}
