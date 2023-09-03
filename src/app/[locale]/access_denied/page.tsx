import { useTranslations } from 'next-intl'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import FaIcon from '@/components/icon'
import BackButton from '@/components/backButton'

export default function Page() {
  const t = useTranslations('Error')

  return (
    <div className="global-error-container">
      <FaIcon icon={faBan} className="red" />
      <BackButton text={t('back')} />
    </div>
  )
}
