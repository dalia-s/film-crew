import Link from 'next/link'
import { Params } from '../../../../interfaces/to-be-renamed'
import getDictionary from '../../../../dictionaries/dictionaries'

export default async function ProducerProfilePage({ params }: Params) {
  const dict = await getDictionary(params.lang)

  return (
    <>
      <h2>{dict.pageNames.producerProfile}</h2>
      <p>
        <Link href="/">HOME</Link>
      </p>
    </>
  )
}
