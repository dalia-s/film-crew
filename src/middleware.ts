import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { authMiddleware } from '@clerk/nextjs'
import { i18n } from './utils/i18n-config'

const intlMiddleware = createMiddleware({
  locales: [...i18n.locales],
  defaultLocale: i18n.defaultLocale,
})

export default authMiddleware({
  beforeAuth: (req: NextRequest) => intlMiddleware(req),
  afterAuth: (auth, req) => {
    if (!auth.userId && !auth.isPublicRoute) {
      const url = new URL('/', req.url)
      return NextResponse.redirect(url)
    }
    return undefined
  },
  publicRoutes: ['/', '/:locale', '/sign-in', '/:locale/sign-in', '/sign-up', '/:locale/sign-up'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
