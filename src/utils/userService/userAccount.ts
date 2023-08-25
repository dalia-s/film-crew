import { UserRole } from '@/types/types'

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
