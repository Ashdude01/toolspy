/**
 * DEPRECATED ROUTE - renamed to /instagram-dp-viewer/ (policy-safe slug).
 *
 * A permanent 301 redirect is configured in next.config.js, so this route is
 * never served at runtime. This minimal layout only exists so the build stays
 * green until this folder is deleted from the repo. Safe to delete this whole
 * directory: app/(tools)/instagram-private-viewer/
 */
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Instagram DP Viewer | Toolspy',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://toolspy.net/instagram-dp-viewer/',
  },
}

export default function DeprecatedInstagramPrivateViewerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
