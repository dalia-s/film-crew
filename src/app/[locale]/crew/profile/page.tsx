import { useLocale, useMessages, useTranslations, NextIntlClientProvider } from 'next-intl'
// import { auth } from '@clerk/nextjs'
import pick from 'lodash/pick'
import DeleteUserComponent from '@/components/deleteUser'
import Form from './crewProfileForm'

export default function Page() {
  const loc = useLocale()
  const messages = useMessages()
  const t = useTranslations('PageNames')

  // const { userId } = auth()
  // get user data

  return (
    <>
      <h2>{t('crewProfile')}</h2>
      <NextIntlClientProvider locale={loc} messages={pick(messages || {}, 'Forms')}>
        <Form />
        <DeleteUserComponent />
      </NextIntlClientProvider>
    </>
  )
}
