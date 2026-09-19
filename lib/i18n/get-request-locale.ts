import { headers } from 'next/headers'
import { ALL_LOCALES, DEFAULT_LOCALE } from './locales'
import { dirForLocale, localeFromPathname } from './pathname-locale'

/**
 * SSR locale for <html lang>/<dir>.
 * Prefer pathname from middleware — reliable for /de/... View Source.
 */
export async function getRequestLocale(): Promise<{ locale: string; dir: 'ltr' | 'rtl' }> {
  const h = await headers()
  const pathname = h.get('x-toolspy-pathname') || ''
  const headerLocale = h.get('x-toolspy-locale')

  let locale = pathname
    ? localeFromPathname(pathname)
    : headerLocale && ALL_LOCALES[headerLocale]
      ? headerLocale
      : DEFAULT_LOCALE

  // If pathname parse said en but middleware explicitly set another locale, trust header
  if (
    locale === DEFAULT_LOCALE &&
    headerLocale &&
    ALL_LOCALES[headerLocale] &&
    headerLocale !== DEFAULT_LOCALE
  ) {
    locale = headerLocale
  }

  if (!ALL_LOCALES[locale]) locale = DEFAULT_LOCALE
  return { locale, dir: dirForLocale(locale) }
}
