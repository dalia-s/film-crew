import Link from 'next/link'
// import { Params } from '@/interfaces/to-be-renamed'
// import getDictionary from '@/dictionaries/dictionaries'

export default async function CrewProfilePage() {
  // const dict = await getDictionary(params.lang)

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .25)',
      }}
    >
      <div
        style={{
          width: '25em',
          height: '25em',
          background: 'lightGray',
          marginTop: '5em',
        }}
      >
        <h2>NOT THE ONE I WANT!!!!</h2>
        <p>
          <Link href="/">HOME</Link>
        </p>
      </div>
    </div>
  )
}
