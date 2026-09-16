'use client'

/**
 * useT() — client-side translation hook for chrome/widgets (header, footer, …).
 *
 * Locale current URL se nikalta hai (bilkul LanguageSwitcher jaisa) — kyunki
 * ye components shared `(frontend)/layout.tsx` me render hote hain jo `[locale]`
 * segment ke UPAR hai, isliye server se locale prop nahi milta. usePathname()
 * hi single source hai.
 *
 * Usage:
 *   const t = useT()
 *   <span>{t('nav.about')}</span>
 *   <span>{t('footer.copyright')}</span>
 */
import { usePathname } from 'next/navigation'
import { translate } from './messages'
import { ALL_LOCALES, DEFAULT_LOCALE } from './locales'

/** '/de/foo' → 'de', '/foo' → 'en' (default). */
export function localeFromPathname(pathname: string | null | undefined): string {
  const segments = (pathname || '/').split('/').filter(Boolean)
  const first = segments[0]
  if (first && ALL_LOCALES[first] && first !== DEFAULT_LOCALE) return first
  return DEFAULT_LOCALE
}

export function useLocale(): string {
  return localeFromPathname(usePathname())
}

export type TFunction = (key: string, vars?: Record<string, string | number>) => string

export function useT(): TFunction {
  const locale = useLocale()
  return (key, vars) => translate(locale, key, vars)
}
