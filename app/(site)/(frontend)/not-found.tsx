import type { Metadata } from 'next'
import { NotFoundContent } from '@/components/seo/not-found-content'

/**
 * (frontend) 404 — App Router ka SAHI convention: `not-found.tsx` (NOT `404.tsx`,
 * jo Pages Router ka tha aur App Router use hi nahi karta tha → default black page).
 *
 * Ye tab render hota hai jab frontend routes ke andar `notFound()` throw ho
 * (e.g. blog post na mile, invalid locale, unknown tool). Site chrome
 * (header/footer) app/(site)/(frontend)/layout.tsx se automatically aata hai.
 *
 * Next.js is response ko HTTP 404 status deta hai (SEO-correct). robots noindex
 * belt-and-suspenders hai; follow:true taaki internal links crawl hote rahein.
 */
export const metadata: Metadata = {
  title: 'Page Not Found (404) | Toolspy',
  description:
    'The page you are looking for could not be found. Browse 90+ free online tools, calculators and converters on Toolspy.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return <NotFoundContent />
}
