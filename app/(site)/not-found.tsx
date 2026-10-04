import type { Metadata } from 'next'
import { NotFoundContent } from '@/components/seo/not-found-content'

/**
 * 404 inside the shared site chrome. Used when notFound() is thrown from a
 * localized layout/page (no closer not-found.tsx). Must NOT render <html> —
 * app/(site)/layout.tsx already does.
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
