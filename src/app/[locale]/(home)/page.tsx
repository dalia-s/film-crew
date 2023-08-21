import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('LandingPage')

  return (
    <div className="landing-page-container">
      <h2>{t('title')}</h2>
      <h4>{t('description')}</h4>
    </div>
  )
}
