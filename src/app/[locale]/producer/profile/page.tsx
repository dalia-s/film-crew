import { Suspense } from 'react'
import { useLocale, useMessages, useTranslations, NextIntlClientProvider } from 'next-intl'
import pick from 'lodash/pick'
import DeleteUserComponent from '@/components/deleteUser'
import { getUserDetails } from '@/utils/userService'
import Form from './producerProfileForm'
import Loading from '../../loading'

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
      <h2>{t('producerProfile')}</h2>
      <NextIntlClientProvider locale={loc} messages={pick(messages || {}, 'Forms')}>
        <Suspense fallback={<Loading />}>
          <FormWithData />
          <DeleteUserComponent />
        </Suspense>
      </NextIntlClientProvider>
    </>
  )
}
