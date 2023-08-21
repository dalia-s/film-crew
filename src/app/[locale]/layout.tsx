import { notFound } from 'next/navigation'
import { Roboto } from 'next/font/google'
import { useLocale } from 'next-intl'
import { ClerkProvider } from '@clerk/nextjs'
import Header from 'app/[locale]/(header)/header'
import { LayoutProps } from '@/types/pageTypes'
import ltLocalisation from '../../messages/ltAuthLocale'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'FilmCrew',
}

export default async function LocaleLayout({ params, children }: LayoutProps) {
  const locale = useLocale()
  const localization = locale === 'lt' ? ltLocalisation : {}

  if (params.locale !== locale) {
    notFound()
  }

  return (
    <ClerkProvider localization={localization}>
      <html lang={params.locale} className={roboto.className}>
        <body>
          <Header />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
