import { useTranslations } from 'next-intl'
import Filter from './filter'
import CrewTable from './table'

// type SearchParams = {
//   searchParams: {
//     query: string
//   }
// }

// export default function Page({ searchParams }: SearchParams) {
export default function Page() {
  const t = useTranslations('PageNames')

  return (
    <>
      <h2>{t('producerSearch')}</h2>
      <Filter />
      <CrewTable />
    </>
  )
}
