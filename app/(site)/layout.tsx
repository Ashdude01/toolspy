import { SiteDocument } from '@/components/layout/site-document'
import { DEFAULT_LOCALE } from '@/lib/i18n/locales'
import { dirForLocale } from '@/lib/i18n/pathname-locale'

/**
 * Shared website root — English (/) and localized (/de/, /fr/, …).
 *
 * ONE <html> so a language switch is a client navigation of the cached ISR
 * page. Separate root layouts made Next.js do a full document load, which
 * waited on a fresh server render every time.
 *
 * Do not call headers() or cookies() here. That opts every public page into SSR.
 * lang/dir come from the pathname (boot script + HtmlLangSync), not the request.
 */
export const revalidate = 3600

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteDocument locale={DEFAULT_LOCALE} dir={dirForLocale(DEFAULT_LOCALE)}>
      {children}
    </SiteDocument>
  )
}
