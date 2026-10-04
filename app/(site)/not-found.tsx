import type { Metadata } from 'next'
import { NotFoundContent } from '@/components/seo/not-found-content'

/**
 * Fallback 404 body under app/(site). Prefer branch not-found files when a
 * SiteDocument parent already wraps the tree. Do not emit a second <html>.
 */
export const metadata: Metadata = {
  title: 'Page Not Found (404) | Toolspy',
  description:
    'The page you are looking for could not be found. Browse 90+ free online tools, calculators and converters on Toolspy.',
  robots: { index: false, follow: true },
}

export default function SiteNotFound() {
  return <NotFoundContent />
}
