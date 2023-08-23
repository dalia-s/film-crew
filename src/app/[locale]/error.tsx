'use client'

import { useTranslations } from 'next-intl'

type Props = {
  reset: () => void
}

export default function Error({ reset }: Props) {
  const t = useTranslations('Error')

  return (
    <div className="error-container">
      <h2>{t('generalError')}</h2>
      <button type="button" className="button" onClick={() => reset()}>
        {t('tryAgain')}
      </button>
    </div>
  )
}
