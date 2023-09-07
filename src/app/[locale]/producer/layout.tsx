import { userRole } from '@/utils/consts'
import RoleMonitor from '@/components/roleMonitor'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <RoleMonitor allowedRole={userRole.producer} />
      {children}
    </>
  )
}
