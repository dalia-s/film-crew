import { Suspense } from 'react'
import { useLocale, useMessages, useTranslations, NextIntlClientProvider } from 'next-intl'
import pick from 'lodash/pick'
import Filter from './filter'
import CrewTable from './table'
import { getCrewList } from '@/utils/crewListService'
import { CrewSearchParams } from '@/types/index'
import Loading from '../../loading'

type Props = {
  searchParams: CrewSearchParams
}

async function TableWithData({ searchParams }: Props) {
  const crewData = await getCrewList(searchParams)
  return <CrewTable data={crewData} />
}

export default function Page({ searchParams }: Props) {
  const loc = useLocale()
  const messages = useMessages()
  const t = useTranslations('PageNames')

  return (
    <>
      <h2>{t('producerSearch')}</h2>
      <Filter />
      <NextIntlClientProvider locale={loc} messages={pick(messages || {}, 'Table', 'SelectOptions')}>
        <Suspense fallback={<Loading />}>
          <TableWithData searchParams={searchParams} />
        </Suspense>
      </NextIntlClientProvider>
    </>
  )
}
