import { useLocale, useMessages, useTranslations, NextIntlClientProvider } from 'next-intl'
import pick from 'lodash/pick'
import DeleteUserComponent from '@/components/deleteUser'
import { getUserDetails } from '@/utils/userService'
import Form from './crewProfileForm'

export default function Page() {
  const loc = useLocale()
  const messages = useMessages()
  const t = useTranslations('PageNames')
  const userDetails = getUserDetails()

  return (
    <>
      <h2>{t('crewProfile')}</h2>
      <NextIntlClientProvider locale={loc} messages={pick(messages || {}, 'Forms', 'SelectOptions')}>
        <Form userDetails={userDetails} />
        <DeleteUserComponent />
      </NextIntlClientProvider>
    </>
  )
}
