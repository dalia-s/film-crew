export type UserRoleType = 'producer' | 'crew'

export const userRole = {
  producer: 'producer',
  crew: 'crew',
} as const

export const pageSearchParams = {
  search: 'search',
  page: 'page',
  sort: 'sort',
  sortDir: 'sortDir',
  helper: 'helper',
} as const

export const crewListParams = {
  ...pageSearchParams,
  profession: 'profession',
  experience: 'experience',
  minRate: 'minRate',
  maxRate: 'maxRate',
  availableFrom: 'availableFrom',
  availableTo: 'availableTo',
} as const

export function getProfessionOptions(t: (key: any) => string) {
  const professions = [
    { name: t('professions.cinematographer'), value: 'cinematographer' },
    { name: t('professions.cameraman'), value: 'cameraman' },
    { name: t('professions.film_editor'), value: 'film_editor' },
    { name: t('professions.production_designer'), value: 'production_designer' },
    { name: t('professions.set_decorator'), value: 'set_decorator' },
    { name: t('professions.costume_designer'), value: 'costume_designer' },
    { name: t('professions.makeup_artist'), value: 'makeup_artist' },
    { name: t('professions.audio_engineer'), value: 'audio_engineer' },
    { name: t('professions.sound_editor'), value: 'sound_editor' },
    { name: t('professions.stunt_coordinator'), value: 'stunt_coordinator' },
    { name: t('other'), value: 'other' },
  ]
  return professions
}

export function getProfessionSingleSelectOptions(t: (key: any) => string) {
  return [{ name: t('selectOne'), value: '' }, ...getProfessionOptions(t)]
}

export const experienceOptions = [
  { name: '0-1', value: '1' },
  { name: '1-2', value: '2' },
  { name: '2-5', value: '5' },
  { name: '5-10', value: '10' },
  { name: '10+', value: '11' },
]

export function getExperienceSingleSelectOptions(t: (key: any) => string) {
  return [{ name: t('select'), value: '' }, ...experienceOptions]
}
