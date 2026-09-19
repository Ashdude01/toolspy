'use client'

/**
 * Keeps <html lang>/<dir> in sync on client navigations.
 * Root layout does not remount when switching / ↔ /de/…, so SSR lang alone is not enough for the live DOM.
 * View Source still comes from SSR (middleware + getRequestLocale).
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
