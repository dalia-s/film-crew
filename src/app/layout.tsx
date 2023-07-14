import '../styles/normalize.css'
import '../styles/global.scss'
import { Roboto } from 'next/font/google'
import { LayoutProps } from '../interfaces/to-be-renamed'
import { i18n } from '../utils/i18n-config'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'FilmCrew',
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({ params, children }: LayoutProps) {
  return (
    <html lang={params.lang} className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
