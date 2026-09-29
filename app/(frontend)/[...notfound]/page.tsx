import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// 404 ke liye sahi SEO signals: noindex + proper title.
// (HTTP status 404 notFound() se aata hai; ye metadata title/robots set karta hai.)
export const metadata: Metadata = {
  title: 'Page Not Found (404) | Toolspy',
  description:
    'The page you are looking for could not be found. Browse 90+ free online tools, calculators and converters on Toolspy.',
  robots: { index: false, follow: true },
}

/**
 * Catch-all 404 router.
 *
 * Koi bhi URL jo kisi specific route (home, tools, blog, [locale], static pages…)
 * se match NAHI karta, wo yahan aata hai aur `notFound()` throw karta hai.
 *
 * Kyun zaroori: ye route `(frontend)` group ke ANDAR hai, isliye iska notFound()
 * `app/(frontend)/not-found.tsx` render karta hai — jo `app/(frontend)/layout.tsx`
 * ke saath aata hai = POORA site layout (header, footer, theme toggle) + Tailwind
 * theme. Isse ab har 404 website jaisa dikhta hai, alag document nahi.
 *
 * Precedence: static > dynamic ([locale]) > catch-all. Isliye ye sirf wahi URLs
 * pakadta hai jo baaki kisi route se match nahi karte.
 */
export default function CatchAllNotFound(): never {
  notFound()
}
