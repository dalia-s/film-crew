import { useLocale, useMessages, useTranslations, NextIntlClientProvider } from 'next-intl'
import pick from 'lodash/pick'
import DeleteUserComponent from '@/components/deleteUser'
import { getUserDetails } from '@/utils/userService'
import Form from './crewProfileForm'

async function FormWithData() {
  const userDetails = await getUserDetails()
  return <Form userDetails={userDetails} />
}

export default function Page() {
  const loc = useLocale()
  const messages = useMessages()
  const t = useTranslations('PageNames')

  return (
    <>
      <h2>{t('crewProfile')}</h2>
      <NextIntlClientProvider locale={loc} messages={pick(messages || {}, 'Forms', 'SelectOptions')}>
        <FormWithData />
        <DeleteUserComponent />
      </NextIntlClientProvider>
    </>
  )
}
