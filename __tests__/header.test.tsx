import type * as ReactDom from 'react-dom'
import { render, screen } from '@/utils/testUtils'
import Header from '../src/app/[locale]/(header)/header'

jest.mock('@clerk/nextjs', () => ({
  __esModule: true,
  ...jest.requireActual('@clerk/nextjs'),
  auth: () => ({ sessionClaims: {} }),
  currentUser: () => ({ user: null }),
}))

jest.mock('next-intl', () => ({
  __esModule: true,
  ...jest.requireActual('next-intl'),
  useLocale: () => 'en',
}))

jest.mock('next-intl/client', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
  }),
}))

jest.mock('react-dom', () => ({
  ...jest.requireActual<typeof ReactDom>('react-dom'),
  preload: jest.fn(),
}))

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe('Navigation', () => {
  it('should render logo', async () => {
    render(await Header())
    expect(screen.getByText('FilmCrew')).toBeInTheDocument()
  })

  it('should render language toggle', async () => {
    render(await Header())
    expect(screen.getByText('en')).toBeInTheDocument()
    expect(screen.getByText('lt')).toBeInTheDocument()
  })
})
