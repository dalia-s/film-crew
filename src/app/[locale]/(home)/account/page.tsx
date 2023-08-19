import { redirect } from 'next/navigation'
import { useLocale, useMessages, NextIntlClientProvider } from 'next-intl'
import pick from 'lodash/pick'
import { getUserRole, userRole } from '@/utils/helpers'
import AccountTypeForm from './accountTypeForm'

function LocalisedAccountTypeForm() {
  const loc = useLocale()
  const messages = useMessages()
  return (
    <NextIntlClientProvider locale={loc} messages={pick(messages || {}, 'Forms')}>
      <AccountTypeForm />
    </NextIntlClientProvider>
  )
}

export default function Page() {
  const role = getUserRole()
  if (role) {
    const newPath = role === userRole.producer ? `/producer/search` : `/${role}/profile`
    redirect(newPath)
  }

  return (
    <>
      <h2>Account Type</h2>
      <LocalisedAccountTypeForm />
    </>
  )
}
