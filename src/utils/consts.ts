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

export const professionOptions = [
  { name: 'Cinematographer', value: 'cinematographer' },
  { name: 'Cameraman', value: 'cameraman' },
  { name: 'Film editor', value: 'film_editor' },
  { name: 'Production designer', value: 'production_designer' },
  { name: 'Set decorator', value: 'set_decorator' },
  { name: 'Costume designer', value: 'costume_designer' },
  { name: 'Makeup artist', value: 'makeup_artist' },
  { name: 'Audio engineer', value: 'audio_engineer' },
  { name: 'Sound editor', value: 'sound_editor' },
  { name: 'Stunt coordinator', value: 'stunt_coordinator' },
  { name: 'Other', value: 'other' },
]

export const professionSingleSelectOptions = [{ name: '---Select one---', value: '' }, ...professionOptions]

export const experienceOptions = [
  { name: '0-1', value: '1' },
  { name: '1-2', value: '2' },
  { name: '2-5', value: '5' },
  { name: '5-10', value: '10' },
  { name: '10+', value: '11' },
]

export const experienceSingleSelectOptions = [{ name: '---Select---', value: '' }, ...experienceOptions]
