import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { dirForLocale, localeFromPathname } from './lib/i18n/pathname-locale'

/**
 * Injects locale into the request so SSR <html lang>/<dir> are correct.
 * Path /de/... → de; root English URLs → en.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const locale = localeFromPathname(pathname)
  const dir = dirForLocale(locale)

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-toolspy-pathname', pathname)
  requestHeaders.set('x-toolspy-locale', locale)
  requestHeaders.set('x-toolspy-dir', dir)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })
  response.headers.set('x-toolspy-locale', locale)
  response.headers.set('Content-Language', locale)

  return response
}

export const config = {
  matcher: [
    '/((?!admin|api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json)$).*)',
  ],
}
