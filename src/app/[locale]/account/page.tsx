import { redirect } from 'next/navigation'
import { useLocale, useMessages, NextIntlClientProvider, useTranslations } from 'next-intl'
import pick from 'lodash/pick'
import { getUserRole, getUserRedirectPath } from '@/utils/userService'
import AccountTypeForm from './accountTypeForm'

function LocalisedPage() {
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

export default async function Page() {
  const role = await getUserRole()
  if (role) {
    redirect(getUserRedirectPath(role))
  }

  return <LocalisedPage />
}
