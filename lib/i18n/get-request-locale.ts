/**
 * @deprecated Prefer layout params / localeFromPathname.
 * Kept for rare request-time reads. Calling headers() opts the route into dynamic rendering —
 * do not use from ISR page/layout trees.
 */
import { headers } from 'next/headers'
import { ALL_LOCALES, DEFAULT_LOCALE } from './locales'
import { dirForLocale, localeFromPathname } from './pathname-locale'

export async function getRequestLocale(): Promise<{ locale: string; dir: 'ltr' | 'rtl' }> {
  const h = await headers()
  const pathname = h.get('x-toolspy-pathname') || ''
  const headerLocale = h.get('x-toolspy-locale')

  let locale = pathname
    ? localeFromPathname(pathname)
    : headerLocale && ALL_LOCALES[headerLocale]
      ? headerLocale
      : DEFAULT_LOCALE

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
