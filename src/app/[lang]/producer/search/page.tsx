import Link from 'next/link'
import { Params } from '@/types/pageTypes'
import getDictionary from '@/dictionaries/dictionaries'

export default async function ProducerSearchPage({ params }: Params) {
  const dict = await getDictionary(params.lang)

  return (
    <>
      <h2>{dict.pageNames.producerSearch}</h2>
      <p>
        <Link href="/">HOME</Link>
      </p>
    </>
  )
}
