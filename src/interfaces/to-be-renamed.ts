import { Locale } from '../utils/i18n-config'

export interface Children {
  children: React.ReactNode
}

export interface Params {
  params: {
    lang: Locale
  }
}

export interface LayoutProps extends Children {
  params: {
    lang: Locale
  }
}
