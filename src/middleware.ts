import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { authMiddleware } from '@clerk/nextjs'
// import { AuthObject } from '@clerk/nextjs/dist/types/server'
import { i18n } from './utils/i18n-config'
// import { userRole } from './utils/consts'

// function getRole(auth: AuthObject) {
//   if (auth.sessionClaims?.userMetadata) {
//     // @ts-ignore Property 'role' does not exist on type '{}'
//     const { role } = auth.sessionClaims.userMetadata
//     return role
//   }
//   return undefined
// }

// function checkUserRole(auth: AuthObject, req: NextRequest) {
//   const role = getRole(auth)

//   const setRolePage = req.nextUrl.pathname.includes('/account')
//   if (!role && !setRolePage) {
//     const url = new URL('/account', req.url)
//     return NextResponse.redirect(url)
//   }
//   const crewPages = req.nextUrl.pathname.includes('/crew/')
//   const producerPages = req.nextUrl.pathname.includes('/producer/')
//   if ((producerPages && role !== userRole.producer) || (crewPages && role !== userRole.crew)) {
//     const url = new URL('/', req.url)
//     return NextResponse.redirect(url)
//   }
//   return undefined
// }

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
    // const apiCall = req.nextUrl.pathname.includes('/api/')
    // if (auth.userId && !auth.isPublicRoute && !apiCall) {
    //   return checkUserRole(auth, req)
    // }
    return undefined
  },
  publicRoutes: ['/', '/:locale', '/sign-in', '/:locale/sign-in', '/sign-up', '/:locale/sign-up'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
