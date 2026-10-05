import type { Metadata } from 'next'
import { NotFoundContent } from '@/components/seo/not-found-content'

/**
 * Localized 404 — rendered inside [locale]/layout.tsx SiteDocument, so
 * <html lang> matches the URL locale (e.g. /ja/unknown → lang="ja").
 */
export const metadata: Metadata = {
  title: 'Page Not Found (404) | Toolspy',
  description:
    'The page you are looking for could not be found. Browse 90+ free online tools, calculators and converters on Toolspy.',
  robots: { index: false, follow: true },
}

export default function LocalizedNotFound() {
  return <NotFoundContent />
}
