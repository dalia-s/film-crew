import Link from 'next/link'
import { faMagnifyingGlass, faUser, faCalendar } from '@fortawesome/free-solid-svg-icons'
import FaIcon from '@/components/icon'

export function CrewLinks() {
  return (
    <div className="nav-links">
      <Link href="/crew/calendar">
        <FaIcon icon={faCalendar} />
      </Link>
      <Link href="/crew/profile">
        <FaIcon icon={faUser} />
      </Link>
    </div>
  )
}

export function ProducerLinks() {
  return (
    <div className="nav-links">
      <Link href="/producer/crew_list">
        <FaIcon icon={faMagnifyingGlass} />
      </Link>
      <Link href="/producer/profile">
        <FaIcon icon={faUser} />
      </Link>
    </div>
  )
}
