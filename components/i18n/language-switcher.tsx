'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import {
  ALL_LOCALES,
  DEFAULT_LOCALE,
  SWITCHER_LOCALES,
  localeFlagUrl,
  localePath,
} from '@/lib/i18n/locales'
import { useT } from '@/lib/i18n/use-t'

function LocaleFlag({
  flagCode,
  country,
  size = 'md',
}: {
  flagCode: string
  country: string
  size?: 'sm' | 'md'
}) {
  const dims =
    size === 'sm'
      ? { w: 18, h: 13.5, width: 40 as const }
      : { w: 22, h: 16.5, width: 40 as const }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- small external flag CDN asset; next/image not needed
    <img
      src={localeFlagUrl(flagCode, dims.width)}
      srcSet={`${localeFlagUrl(flagCode, 80)} 2x`}
      width={dims.w}
      height={dims.h}
      alt=""
      title={country}
      loading="lazy"
      decoding="async"
      className="shrink-0 rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
      aria-hidden
    />
  )
}

/**
 * Language Switcher — iLovePDF-style dropdown.
 *
 * - Flag image + aktuelle Sprache (native name) + chevron
 * - Click par panel: har row me flag + language (upar) + country (neeche)
 * - Flag PNGs (flagcdn) — Windows pe emoji flags support nahi hota
 * - Current locale highlighted with check
 * - Arabic ke liye RTL-safe
 * - NO middleware, NO auto-redirect — sirf manual switch (SEO + cost safe)
 * - Current path preserve hota hai: /de/image-compressor/ → switch to ru → /ru/image-compressor/
 *
 * Kaunse locales dikhein = lib/i18n/locales.ts ka SWITCHER_LOCALES.
 */
export function LanguageSwitcher() {
  const pathname = usePathname() || '/'
  const t = useT()
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
        <LocaleFlag
          flagCode={current.flagCode}
          country={current.country}
          size="sm"
        />
        <span className="hidden sm:inline">{current.nativeName}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-[min(92vw,380px)] rounded-xl border bg-popover p-2 shadow-lg"
        >
          <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t('header.selectLanguage')}
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
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                      active
                        ? 'bg-primary/10 font-semibold text-primary'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <LocaleFlag flagCode={info.flagCode} country={info.country} />
                    <span className="min-w-0 flex-1 flex flex-col leading-tight">
                      <span className="truncate">{info.nativeName}</span>
                      <span className="truncate text-[11px] font-normal text-muted-foreground">
                        {info.country}
                      </span>
                    </span>
                    {active && (
                      <Check className="h-4 w-4 shrink-0" aria-hidden />
                    )}
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
