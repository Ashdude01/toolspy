'use client'

/**
 * Keeps <html lang>/<dir> in sync on client navigations.
 * English and localized routes share one root layout, so this runs before paint
 * (useLayoutEffect) instead of waiting on a full document reload.
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
