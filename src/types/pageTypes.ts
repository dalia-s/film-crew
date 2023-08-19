import { Locale } from '@/utils/i18n-config'

export type Children = {
  children: React.ReactNode
}

export type Params = {
  params: {
    lang: Locale
  }
}

export type LayoutProps = Children & {
  params: {
    locale: Locale
  }
}
