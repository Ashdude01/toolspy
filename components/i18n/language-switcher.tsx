'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import {
  ALL_LOCALES,
  DEFAULT_LOCALE,
  SWITCHER_LOCALES,
  localePath,
} from '@/lib/i18n/locales'

/**
 * Language Switcher — iLovePDF-style dropdown.
 *
 * - Globe icon + aktuelle Sprache (native name) + chevron
 * - Click par ek panel khulta hai jisme saari bhashayein (native script me) grid me
 * - Current locale highlighted with check
 * - Arabic ke liye RTL-safe
 * - NO middleware, NO auto-redirect — sirf manual switch (SEO + cost safe)
 * - Current path preserve hota hai: /de/image-compressor/ → switch to ru → /ru/image-compressor/
 *
 * Kaunse locales dikhein = lib/i18n/locales.ts ka SWITCHER_LOCALES.
 */
export function LanguageSwitcher() {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  // Agar 2 se kam locales hain to switcher render mat karo
  if (SWITCHER_LOCALES.length < 2) return null

  // Current path se locale prefix nikaalo
  const segments = pathname.split('/').filter(Boolean)
  const currentLocale =
    segments[0] && ALL_LOCALES[segments[0]] && segments[0] !== DEFAULT_LOCALE
      ? segments[0]
      : DEFAULT_LOCALE
  const basePath =
    currentLocale === DEFAULT_LOCALE
      ? pathname
      : '/' + segments.slice(1).join('/')

  const current = ALL_LOCALES[currentLocale] ?? ALL_LOCALES[DEFAULT_LOCALE]

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
        className="flex items-center gap-1.5 rounded-md border border-input bg-background px-2.5 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Globe className="h-4 w-4 shrink-0" aria-hidden />
        <span className="hidden sm:inline">{current.nativeName}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-[min(92vw,360px)] rounded-xl border bg-popover p-2 shadow-lg"
        >
          <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Select language
          </p>
          <ul className="grid max-h-[60vh] grid-cols-2 gap-1 overflow-y-auto">
            {SWITCHER_LOCALES.map((code) => {
              const info = ALL_LOCALES[code]
              if (!info) return null
              const active = code === currentLocale
              return (
                <li key={code} role="none">
                  <Link
                    role="menuitem"
                    href={localePath(code, basePath || '/')}
                    onClick={() => setOpen(false)}
                    dir={info.dir}
                    hrefLang={info.hreflang}
                    aria-current={active ? 'true' : undefined}
                    className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                      active
                        ? 'bg-primary/10 font-semibold text-primary'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <span className="flex flex-col leading-tight">
                      <span className="truncate">{info.nativeName}</span>
                      <span className="truncate text-[11px] text-muted-foreground">
                        {info.name}
                      </span>
                    </span>
                    {active && <Check className="h-4 w-4 shrink-0" aria-hidden />}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
