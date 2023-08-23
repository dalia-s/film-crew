import { useTranslations } from 'next-intl'
import { faTrowelBricks } from '@fortawesome/free-solid-svg-icons'
import FaIcon from '@/components/icon'

export default function UnderConstruction() {
  const t = useTranslations('Misc')

  return (
    <div className="under-construction">
      <h4>{t('underConstruction')}</h4>
      <FaIcon icon={faTrowelBricks} />
    </div>
  )
}
