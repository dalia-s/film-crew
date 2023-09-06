import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import FaIcon from '@/components/icon'

type Props = {
  text: string
  saving: boolean
}

export default function SubmitButton({ text, saving }: Props) {
  return (
    <button type="submit" className="button submit-button" data-testid="submit-button" disabled={saving}>
      {saving ? <FaIcon icon={faSpinner} className="fa-pulse" /> : text}
    </button>
  )
}
