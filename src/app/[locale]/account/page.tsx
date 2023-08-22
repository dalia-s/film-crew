import { redirect } from 'next/navigation'
import { useLocale, useMessages, NextIntlClientProvider, useTranslations } from 'next-intl'
import pick from 'lodash/pick'
import { getUserRole, getUserRedirectPath } from '@/utils/userUtils'
import AccountTypeForm from './accountTypeForm'

export default function Page() {
  const role = getUserRole()
  if (role) {
    redirect(getUserRedirectPath(role))
  }

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
