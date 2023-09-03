import { redirect } from 'next/navigation'
import { getUserRole, getUserRedirectPath } from '@/utils/userService'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const role = getUserRole()
  if (role) {
    redirect(getUserRedirectPath(role))
  }

  return children
}
