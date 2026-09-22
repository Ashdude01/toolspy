'use client'

/**
 * Keeps <html lang>/<dir> in sync on client navigations within the same tree.
 * EN and localized trees use separate root layouts (correct SSR lang in View Source).
 */
import { useEffect } from 'react'
import { useLocale } from '@/lib/i18n/use-t'
import { dirForLocale } from '@/lib/i18n/pathname-locale'

export function HtmlLangSync() {
  const locale = useLocale()

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = dirForLocale(locale)
  }, [locale])

  return null
}
