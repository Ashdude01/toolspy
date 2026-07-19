'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'
import {
  ALL_LOCALES,
  DEFAULT_LOCALE,
  PUBLISHED_LOCALES,
  localePath,
} from '@/lib/i18n/locales'

/**
 * Language Switcher — manual switching, NO middleware, NO auto-redirect.
 * (Auto-redirect SEO ke liye risky hai aur middleware har request pe
 * compute kharch karta hai — isliye deliberately manual.)
 *
 * Sirf en + PUBLISHED_LOCALES dikhata hai. Jab tak koi locale publish nahi
 * hai (list khali), switcher render hi nahi hota — isliye ise header me
 * abhi wire karna bhi safe hai.
 *
 * Header me lagane ke liye: <LanguageSwitcher /> import karke drop kar do
 * (components/layout/header-with-theme me — ye Phase 3 me hoga jab pehla
 * locale publish ho).
 */
export function LanguageSwitcher() {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const visibleLocales = [DEFAULT_LOCALE, ...PUBLISHED_LOCALES]
  if (visibleLocales.length < 2) return null

  // Current path se locale prefix nikaalo → base path
  const segments = pathname.split('/').filter(Boolean)
  const currentLocale =
    segments[0] && ALL_LOCALES[segments[0]] ? segments[0] : DEFAULT_LOCALE
  const basePath =
    currentLocale === DEFAULT_LOCALE
      ? pathname
      : '/' + segments.slice(1).join('/')

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
      >
        <Globe className="h-4 w-4" aria-hidden />
        <span>{ALL_LOCALES[currentLocale]?.nativeName ?? currentLocale}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1 min-w-[10rem] rounded-md border bg-background p-1 shadow-md"
        >
          {visibleLocales.map((code) => {
            const info = ALL_LOCALES[code]
            if (!info) return null
            return (
              <li key={code} role="option" aria-selected={code === currentLocale}>
                <Link
                  href={localePath(code, basePath || '/')}
                  onClick={() => setOpen(false)}
                  className={`block rounded px-2 py-1.5 text-sm hover:bg-muted transition-colors ${
                    code === currentLocale ? 'font-semibold' : ''
                  }`}
                >
                  {info.nativeName}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
