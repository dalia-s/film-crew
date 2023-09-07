import { useLocale, useMessages, useTranslations, NextIntlClientProvider } from 'next-intl'
import pick from 'lodash/pick'
import AccountTypeForm from './accountTypeForm'

export default function Page() {
  const loc = useLocale()
  const messages = useMessages()
  const t = useTranslations('AccountTypePage')

  return (
    <>
      <h2>{t('title')}</h2>
      <NextIntlClientProvider locale={loc} messages={pick(messages || {}, 'Forms')}>
        <AccountTypeForm />
      </NextIntlClientProvider>
    </>
  )
}
