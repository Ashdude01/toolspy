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
 */

export interface LocaleInfo {
  /** URL prefix code, e.g. 'de' → /de/image-compressor/ */
  code: string
  /** English name */
  name: string
  /** Language ka apna naam (switcher me yahi dikhana) */
  nativeName: string
  /** Text direction — Arabic ke liye 'rtl' */
  dir: 'ltr' | 'rtl'
  /** hreflang attribute value */
  hreflang: string
  /** OpenGraph locale value */
  ogLocale: string
}

export const DEFAULT_LOCALE = 'en'

/**
 * Priority order (high-CPC report ke hisaab se):
 * de → fr → es → ja → nl → sv/da/no → it → ru → id → ko → tr → ar
 * hi (Hindi) = optional, jab chaho content daalo.
 */
export const ALL_LOCALES: Record<string, LocaleInfo> = {
  en: { code: 'en', name: 'English',    nativeName: 'English',          dir: 'ltr', hreflang: 'en', ogLocale: 'en_US' },
  de: { code: 'de', name: 'German',     nativeName: 'Deutsch',          dir: 'ltr', hreflang: 'de', ogLocale: 'de_DE' },
  fr: { code: 'fr', name: 'French',     nativeName: 'Français',         dir: 'ltr', hreflang: 'fr', ogLocale: 'fr_FR' },
  es: { code: 'es', name: 'Spanish',    nativeName: 'Español',          dir: 'ltr', hreflang: 'es', ogLocale: 'es_ES' },
  ja: { code: 'ja', name: 'Japanese',   nativeName: '日本語',            dir: 'ltr', hreflang: 'ja', ogLocale: 'ja_JP' },
  nl: { code: 'nl', name: 'Dutch',      nativeName: 'Nederlands',       dir: 'ltr', hreflang: 'nl', ogLocale: 'nl_NL' },
  sv: { code: 'sv', name: 'Swedish',    nativeName: 'Svenska',          dir: 'ltr', hreflang: 'sv', ogLocale: 'sv_SE' },
  da: { code: 'da', name: 'Danish',     nativeName: 'Dansk',            dir: 'ltr', hreflang: 'da', ogLocale: 'da_DK' },
  no: { code: 'no', name: 'Norwegian',  nativeName: 'Norsk',            dir: 'ltr', hreflang: 'no', ogLocale: 'nb_NO' },
  it: { code: 'it', name: 'Italian',    nativeName: 'Italiano',         dir: 'ltr', hreflang: 'it', ogLocale: 'it_IT' },
  ru: { code: 'ru', name: 'Russian',    nativeName: 'Русский',          dir: 'ltr', hreflang: 'ru', ogLocale: 'ru_RU' },
  id: { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', dir: 'ltr', hreflang: 'id', ogLocale: 'id_ID' },
  ko: { code: 'ko', name: 'Korean',     nativeName: '한국어',            dir: 'ltr', hreflang: 'ko', ogLocale: 'ko_KR' },
  tr: { code: 'tr', name: 'Turkish',    nativeName: 'Türkçe',           dir: 'ltr', hreflang: 'tr', ogLocale: 'tr_TR' },
  ar: { code: 'ar', name: 'Arabic',     nativeName: 'العربية',          dir: 'rtl', hreflang: 'ar', ogLocale: 'ar_AE' },
  hi: { code: 'hi', name: 'Hindi',      nativeName: 'हिन्दी',            dir: 'ltr', hreflang: 'hi', ogLocale: 'hi_IN' },
}

/**
 * Jin locales ke pages BUILD hote hain (English ke alawa).
 * Ye locales header ke language switcher me bhi dikhte hain (iLovePDF-style).
 *
 * Ye pages noindex rehte hain jab tak locale PUBLISHED_LOCALES me na aaye —
 * isliye inhe yahan add karna 100% SEO-safe hai (Google inhe rank nahi karta).
 * Content jaise-jaise Payload me bharta jaye, locale ko PUBLISHED me move karo.
 */
export const ROUTABLE_LOCALES: string[] = [
  'de', // German
  'ru', // Russian
  'id', // Indonesian
  'ja', // Japanese
  'es', // Spanish
  'nl', // Dutch
  'ar', // Arabic (RTL)
]

/**
 * Jin locales ke pages LIVE/indexable hain — sitemap, hreflang aur robots-index
 * sirf inke liye on hota hai. Jab tak locale yahan nahi hai, uske pages
 * noindex rehte hain (duplicate-content ka zero risk).
 *
 * Launch karne ka tarika: content ready + reviewed → locale ko yahan add karo.
 * Abhi khali = kuchh bhi indexable nahi, sirf build hota hai.
 */
export const PUBLISHED_LOCALES: string[] = []

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
