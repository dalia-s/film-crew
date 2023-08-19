import { useTranslations } from 'next-intl'
import UnderConstructionComponent from '@/components/underConstruction'

export default function Page() {
  const t = useTranslations('PageNames')

  return (
    <>
      <h2>{t('crewCalendar')}</h2>
      <UnderConstructionComponent />
    </>
  )
}
