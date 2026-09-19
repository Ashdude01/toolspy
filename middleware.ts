import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ALL_LOCALES, DEFAULT_LOCALE } from './lib/i18n/locales'

/**
 * Sets request locale for SSR <html lang>/<dir>.
 * Path /de/... → de; otherwise en (root English URLs).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split('/').filter(Boolean)[0]
  const locale =
    first && first !== DEFAULT_LOCALE && ALL_LOCALES[first]
      ? first
      : DEFAULT_LOCALE
  const info = ALL_LOCALES[locale] ?? ALL_LOCALES[DEFAULT_LOCALE]

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-toolspy-locale', locale)
  requestHeaders.set('x-toolspy-dir', info.dir)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: [
    /*
     * Skip admin, API, Next internals, and static assets.
     */
    '/((?!admin|api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json)$).*)',
  ],
}
