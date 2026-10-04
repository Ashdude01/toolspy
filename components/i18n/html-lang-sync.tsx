'use client'

/**
 * Keeps <html lang>/<dir> in sync on client navigations within a locale tree.
 * SSR already emits the correct lang from layout params (View Source / SEO).
 */
import { useLayoutEffect } from 'react'
import { useLocale } from '@/lib/i18n/use-t'
import { dirForLocale } from '@/lib/i18n/pathname-locale'

export function HtmlLangSync() {
  const locale = useLocale()

  useLayoutEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = dirForLocale(locale)
  }, [locale])

  return null
}
