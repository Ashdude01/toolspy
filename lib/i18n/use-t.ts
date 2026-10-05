'use client'

/**
 * useT() — client-side translation hook for chrome/widgets (header, footer, …).
 *
 * Locale current URL se nikalta hai (bilkul LanguageSwitcher jaisa) — kyunki
 * ye components site chrome layouts me render hote hain; locale URL pathname
 * se aata hai (server prop nahi). usePathname() hi single source hai.
 *
 * Usage:
 *   const t = useT()
 *   <span>{t('nav.about')}</span>
 *   <span>{t('footer.copyright')}</span>
 */
import { usePathname } from 'next/navigation'
import { translate } from './messages'
import { localeFromPathname } from './pathname-locale'

export { localeFromPathname } from './pathname-locale'

export function useLocale(): string {
  return localeFromPathname(usePathname())
}

export type TFunction = (key: string, vars?: Record<string, string | number>) => string

export function useT(): TFunction {
  const locale = useLocale()
  return (key, vars) => translate(locale, key, vars)
}
