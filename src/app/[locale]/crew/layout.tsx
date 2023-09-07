import RoleMonitor from '@/components/roleMonitor'
import { userRole } from '@/utils/consts'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <RoleMonitor allowedRole={userRole.crew} />
      {children}
    </>
  )
}
