import { useLocale, useMessages, useTranslations, NextIntlClientProvider } from 'next-intl'
import pick from 'lodash/pick'
import Filter from './filter'
import CrewTable from './table'
import { getCrewList } from '@/utils/crewListService'

export default function Page() {
  const loc = useLocale()
  const messages = useMessages()
  const t = useTranslations('PageNames')
  const crewData = getCrewList()

  return (
    <>
      <h2>{t('producerSearch')}</h2>
      <Filter />
      <NextIntlClientProvider locale={loc} messages={pick(messages || {}, 'Table')}>
        <CrewTable data={crewData} />
      </NextIntlClientProvider>
    </>
  )
}
