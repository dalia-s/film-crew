import 'server-only'
import type { Locale } from '@/utils/i18n-config'

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  lt: () => import('./lt.json').then((module) => module.default),
}

const getDictionary = async (locale: Locale) => dictionaries[locale]()

export default getDictionary
