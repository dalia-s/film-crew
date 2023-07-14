import { LayoutProps } from '../../../interfaces/to-be-renamed'
import { i18n } from '../../../utils/i18n-config'
import { ProducerHeader } from '../../../components/header'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function ProducerLayout({ params, children }: LayoutProps) {
  return (
    <section>
      <ProducerHeader lang={params.lang} />
      <main>{children}</main>
    </section>
  )
}
