import { ALL_LOCALES, DEFAULT_LOCALE } from './locales'

/**
 * '/de/foo' → 'de', '/foo' → 'en'. Shared by middleware, SSR layout, client hooks.
 */
export function localeFromPathname(pathname: string | null | undefined): string {
  const segments = (pathname || '/').split('/').filter(Boolean)
  const first = segments[0]
  if (first && ALL_LOCALES[first] && first !== DEFAULT_LOCALE) return first
  return DEFAULT_LOCALE
}

export function dirForLocale(locale: string): 'ltr' | 'rtl' {
  return ALL_LOCALES[locale]?.dir ?? ALL_LOCALES[DEFAULT_LOCALE].dir
}
