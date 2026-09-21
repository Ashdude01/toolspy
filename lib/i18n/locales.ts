/**
 * Toolspy v2 — Central locale configuration (single source of truth)
 *
 * TEEN LEVELS samjho:
 *  1. ALL_LOCALES      → har supported language ka metadata (add karna = sirf yahan entry)
 *  2. ROUTABLE_LOCALES → in locales ke pages BUILD hote hain (/de/... URLs exist karte hain)
 *  3. PUBLISHED_LOCALES→ in locales ke pages INDEXABLE hain (sitemap + hreflang + robots index)
 *
 * Naya language launch karne ka flow:
 *  content ready hua → ROUTABLE me daalo (test karo) → PUBLISHED me daalo (live/indexable)
 *
 * English (DEFAULT_LOCALE) hamesha root URLs pe rahega — bina kisi prefix ke.
 * English ke URLs me KABHI koi change nahi hoga.
 *
 * CMS (Payload) localization bhi isi ALL_LOCALES se aata hai — jo yahan nahi,
 * admin language switcher me bhi nahi dikhega.
 */

export interface LocaleInfo {
  /** URL prefix code, e.g. 'de' → /de/image-compressor/ */
  code: string
  /** English language name (internal / SEO helpers) */
  name: string
  /** Language ka apna naam (switcher me upar dikhana) */
  nativeName: string
  /** Country label (switcher me neeche dikhana) */
  country: string
  /**
   * ISO 3166-1 alpha-2 country code for flag image (e.g. 'us', 'de').
   * Emoji flags Windows pe nahi dikhte — isliye CDN PNG use karte hain.
   */
  flagCode: string
  /** Text direction — Arabic ke liye 'rtl' */
  dir: 'ltr' | 'rtl'
  /** hreflang attribute value */
  hreflang: string
  /** OpenGraph locale value */
  ogLocale: string
}

export const DEFAULT_LOCALE = 'en'

/**
 * Active locales only — CMS + frontend switcher isi list se chalte hain.
 * Extra languages (hi/da/no etc.) yahan mat rakho jab tak launch na karna ho.
 */
export const ALL_LOCALES: Record<string, LocaleInfo> = {
  en: { code: 'en', name: 'English',    nativeName: 'English',          country: 'United States', flagCode: 'us', dir: 'ltr', hreflang: 'en', ogLocale: 'en_US' },
  de: { code: 'de', name: 'German',     nativeName: 'Deutsch',          country: 'Germany',       flagCode: 'de', dir: 'ltr', hreflang: 'de', ogLocale: 'de_DE' },
  fr: { code: 'fr', name: 'French',     nativeName: 'Français',         country: 'France',        flagCode: 'fr', dir: 'ltr', hreflang: 'fr', ogLocale: 'fr_FR' },
  es: { code: 'es', name: 'Spanish',    nativeName: 'Español',          country: 'Spain',         flagCode: 'es', dir: 'ltr', hreflang: 'es', ogLocale: 'es_ES' },
  ja: { code: 'ja', name: 'Japanese',   nativeName: '日本語',            country: 'Japan',         flagCode: 'jp', dir: 'ltr', hreflang: 'ja', ogLocale: 'ja_JP' },
  nl: { code: 'nl', name: 'Dutch',      nativeName: 'Nederlands',       country: 'Netherlands',   flagCode: 'nl', dir: 'ltr', hreflang: 'nl', ogLocale: 'nl_NL' },
  sv: { code: 'sv', name: 'Swedish',    nativeName: 'Svenska',          country: 'Sweden',        flagCode: 'se', dir: 'ltr', hreflang: 'sv', ogLocale: 'sv_SE' },
  it: { code: 'it', name: 'Italian',    nativeName: 'Italiano',         country: 'Italy',         flagCode: 'it', dir: 'ltr', hreflang: 'it', ogLocale: 'it_IT' },
  ru: { code: 'ru', name: 'Russian',    nativeName: 'Русский',          country: 'Russia',        flagCode: 'ru', dir: 'ltr', hreflang: 'ru', ogLocale: 'ru_RU' },
  id: { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', country: 'Indonesia',    flagCode: 'id', dir: 'ltr', hreflang: 'id', ogLocale: 'id_ID' },
  ko: { code: 'ko', name: 'Korean',     nativeName: '한국어',            country: 'South Korea',   flagCode: 'kr', dir: 'ltr', hreflang: 'ko', ogLocale: 'ko_KR' },
  tr: { code: 'tr', name: 'Turkish',    nativeName: 'Türkçe',           country: 'Turkey',        flagCode: 'tr', dir: 'ltr', hreflang: 'tr', ogLocale: 'tr_TR' },
  ar: { code: 'ar', name: 'Arabic',     nativeName: 'العربية',          country: 'UAE',           flagCode: 'ae', dir: 'rtl', hreflang: 'ar', ogLocale: 'ar_AE' },
}

/** Windows-safe flag image URL (emoji flags Windows pe blank / letters dikhte hain). */
export function localeFlagUrl(flagCode: string, width = 40): string {
  return `https://flagcdn.com/w${width}/${flagCode.toLowerCase()}.png`
}

/**
 * Jin locales ke pages BUILD hote hain (English ke alawa).
 * Ye locales header ke language switcher me bhi dikhte hain (iLovePDF-style).
 *
 * Ye pages noindex rehte the jab tak locale PUBLISHED_LOCALES me na aaye.
 * Ab PUBLISHED = ROUTABLE (tools + locale homepages indexable).
 * Content jaise-jaise Payload me bharta jaye, quality improve hoti rahe.
 */
export const ROUTABLE_LOCALES: string[] = [
  'de', // German
  'fr', // French
  'es', // Spanish
  'ja', // Japanese
  'nl', // Dutch
  'sv', // Swedish
  'it', // Italian
  'ru', // Russian
  'id', // Indonesian
  'ko', // Korean
  'tr', // Turkish
  'ar', // Arabic (RTL)
]

/**
 * Jin locales ke pages LIVE/indexable hain — sitemap, hreflang aur robots-index
 * sirf inke liye on hota hai.
 *
 * Ab ROUTABLE ke saath sync: jo language switcher me live hai wahi indexable.
 * Static pages (about/legal etc.) jo abhi English-only duplicate hain, unpe
 * route-level noindex alag se force rehta hai — duplicate content avoid.
 */
export const PUBLISHED_LOCALES: string[] = [...ROUTABLE_LOCALES]

/**
 * Header ke language switcher me kaunse locales dikhein.
 * Default (English) + saare routable locales — taaki user har bhasha par
 * ja sake (iLovePDF jaisa). Sirf isme se locale hatana ho to yahan se hatao.
 */
export const SWITCHER_LOCALES: string[] = [DEFAULT_LOCALE, ...ROUTABLE_LOCALES]

export function isRoutableLocale(locale: string): boolean {
  return ROUTABLE_LOCALES.includes(locale)
}

export function isPublishedLocale(locale: string): boolean {
  return PUBLISHED_LOCALES.includes(locale)
}

/** '/image-compressor/' + 'de' → '/de/image-compressor/' (en → unchanged) */
export function localePath(locale: string, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return clean
  return `/${locale}${clean}`
}
