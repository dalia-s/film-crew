'use client'

import { usePathname, useRouter } from 'next-intl/client'
import { i18n } from '@/utils/i18n-config'

export default function LanguageToggle({ locale }: { locale: string }) {
  const router = useRouter()
  const pathname = usePathname()

  function onClick(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <div className="lang-toggle-container">
      {i18n.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          className={loc === locale ? 'lang-toggle active' : 'lang-toggle'}
          onClick={() => onClick(loc)}
        >
          {loc}
        </button>
      ))}
    </div>
  )
}
