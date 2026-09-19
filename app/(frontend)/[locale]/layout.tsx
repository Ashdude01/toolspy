/**
 * Locale layout — /de/..., /fr/...
 * <html lang>/<dir> ab (frontend)/layout.tsx + middleware se SSR pe set hote hain.
 * HtmlLangSync client navigations pe sync rakhta hai.
 */
import { notFound } from 'next/navigation'
import { ALL_LOCALES, isRoutableLocale, DEFAULT_LOCALE } from '@/lib/i18n/locales'

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
    <div lang={locale} dir={info.dir} data-locale={locale}>
      {children}
    </div>
  )
}
