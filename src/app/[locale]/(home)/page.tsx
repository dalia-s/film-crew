import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('LandingPage')
  const loc = useLocale()

  return (
    <div className="landing-page-container">
      <h2>{t('title')}</h2>
      <h4>{t('description')}</h4>
      <p>
        <Link href={`${loc}/crew/profile`}>Crew</Link>
      </p>
      <p>
        <Link href={`${loc}/producer/profile`}>Producer</Link>
      </p>
      <p>
        <Link href={`${loc}/account`}>Account</Link>
      </p>
    </div>
  )
}
