import Link from 'next/link'
import getDictionary from '../../../dictionaries/dictionaries'
import { Params } from '../../../interfaces/to-be-renamed'

export default async function Home({ params }: Params) {
  const dict = await getDictionary(params.lang)

  return (
    <>
      <h2>This is a landing page</h2>
      <p>
        <Link href={`/${params.lang}/login`}>Login</Link>
      </p>
      <p>
        <Link href={`/${params.lang}/crew/profile`}>{dict.pageNames.crewProfile}</Link>
      </p>
      <p>
        <Link href={`/${params.lang}/producer/profile`}>{dict.pageNames.producerProfile}</Link>
      </p>
    </>
  )
}
