import { HomeHeader } from '../../../components/header'
import { LayoutProps } from '../../../interfaces/to-be-renamed'
import { i18n } from '../../../utils/i18n-config'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function CrewLayout({ params, children }: LayoutProps) {
  return (
    <section>
      <HomeHeader lang={params.lang} />
      <main>{children}</main>
    </section>
  )
}
