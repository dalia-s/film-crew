import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import FaIcon from '@/components/icon'

export default function Loading() {
  return (
    <div className="loading-icon">
      <FaIcon icon={faSpinner} className="fa-pulse" />
    </div>
  )
}
