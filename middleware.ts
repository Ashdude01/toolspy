import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { dirForLocale, localeFromPathname } from './lib/i18n/pathname-locale'
import { CANONICAL_SITE_DOMAIN } from './lib/site-url'

/**
 * 1) Force apex host: www.toolspy.net → https://toolspy.net (incl. /sitemap/*.xml).
 * 2) Inject locale response headers for SEO (Content-Language).
 * HTML lang/dir come from ISR layouts (params), not from these headers.
 */
export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').split(':')[0].toLowerCase()
  if (host === `www.${CANONICAL_SITE_DOMAIN}`) {
    const url = request.nextUrl.clone()
    url.protocol = 'https:'
    url.hostname = CANONICAL_SITE_DOMAIN
    url.port = ''
    return NextResponse.redirect(url, 301)
  }

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
  // Include xml/txt so www → apex applies to /sitemap/tools.xml and /sitemap/blog.xml.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}
