import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { dirForLocale, localeFromPathname } from './lib/i18n/pathname-locale'

/**
 * Injects locale response headers for SEO (Content-Language).
 * HTML lang/dir come from ISR layouts (params), not from these headers.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const locale = localeFromPathname(pathname)
  const dir = dirForLocale(locale)

  const response = NextResponse.next()
  response.headers.set('x-toolspy-locale', locale)
  response.headers.set('x-toolspy-dir', dir)
  response.headers.set('Content-Language', locale)

  return response
}

export const config = {
  matcher: [
    '/((?!admin|api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json)$).*)',
  ],
}
