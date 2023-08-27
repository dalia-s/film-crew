import { userRole } from '@/utils/consts'

export function getUserRedirectPath(role: string): string {
  return role === userRole.producer ? `/producer/crew_list` : `/crew/profile`
}
export default getUserRedirectPath
