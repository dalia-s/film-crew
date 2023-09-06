import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { ClerkProvider } from '@clerk/nextjs'
import messages from '../../messages/en.json'

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <NextIntlClientProvider messages={messages} locale="en">
        {children}
      </NextIntlClientProvider>
    </ClerkProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
