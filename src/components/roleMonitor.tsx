import { redirect } from 'next/navigation'
import { getAsyncUserRole } from '@/utils/userService'
import { UserRole } from '@/types/index'

type Props = {
  allowedRole: UserRole
}

export default async function RoleMonitor({ allowedRole }: Props) {
  const role = await getAsyncUserRole()
  if (role !== allowedRole) {
    redirect('/access_denied')
  }
  return null
}
