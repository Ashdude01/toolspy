import { notFound } from 'next/navigation'
import { ALL_LOCALES, isRoutableLocale, DEFAULT_LOCALE } from '@/lib/i18n/locales'

/**
 * Locale segment layout — /de/..., /fr/... URLs ke liye. (Next 15: async params)
 *
 * English is layout se KABHI nahi guzarta — English root URLs pe hai
 * (app/ ke existing pages), unme koi change nahi hua.
 *
 * NOTE (Phase 4 me fix hoga): root layout (app/layout.tsx) <html lang="en">
 * render karta hai aur locale param us tak nahi pahunchta. Isliye yahan ek
 * inline script SSR HTML me hi lang/dir set kar deta hai — Googlebot rendered
 * DOM padhta hai aur hreflang tags (primary signal) server-rendered hain,
 * isliye SEO impact nahi.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (locale === DEFAULT_LOCALE || !isRoutableLocale(locale)) {
    notFound()
  }

  const info = ALL_LOCALES[locale]

  return (
    <div lang={locale} dir={info.dir}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};document.documentElement.dir=${JSON.stringify(info.dir)};`,
        }}
      />
      {children}
    </div>
  )
}
