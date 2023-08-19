import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type Props = {
  icon: IconProp
  style?: React.CSSProperties
  className?: string
  onClick?: () => void
}

export default function FaIcon({ icon, style, className, onClick }: Props) {
  return <FontAwesomeIcon icon={icon} style={style} className={className} onClick={onClick} />
}
