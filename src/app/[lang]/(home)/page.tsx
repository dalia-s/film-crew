import Link from 'next/link'
import getDictionary from '@/dictionaries/dictionaries'
import { Params } from '@/types/pageTypes'
import ModalForm from './(login)/form'

type HomeProps = Params & {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Home({ params, searchParams }: HomeProps) {
  const dict = await getDictionary(params.lang)
  console.log(searchParams)
  const showLogin = searchParams?.login
  const showRegister = searchParams?.register

  return (
    <>
      <h2>{dict.landingPage.title}</h2>
      <h4>{dict.landingPage.description}</h4>
      <p>
        <Link href={`/${params.lang}/?login=true`}>Login</Link>
      </p>
      <div>{showLogin && <ModalForm lang={params.lang} />}</div>
      <p>
        <Link href={`/${params.lang}/crew/profile`}>{dict.pageNames.crewProfile}</Link>
      </p>
      <p>
        <Link href={`/${params.lang}/producer/profile`}>{dict.pageNames.producerProfile}</Link>
      </p>
    </>
  )
}
