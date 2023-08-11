'use client'

import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n, Locale } from '@/utils/i18n-config'

export default function LanguageToggle() {
  const params = useParams()
  const pathname = usePathname()

  const lang = params?.lang || 'en'

  const getNewPath = (locale: Locale) => {
    if (pathname && lang !== locale) {
      const segments = pathname.split('/')
      segments[1] = locale
      return segments.join('/')
    }
    return pathname || '/'
  }

  return (
    <div className="lang-toggle-container">
      {i18n.locales.map((locale) => (
        <Link key={locale} href={getNewPath(locale)} className={lang === locale ? 'lang-toggle active' : 'lang-toggle'}>
          {locale}
        </Link>
      ))}
    </div>
  )
}
