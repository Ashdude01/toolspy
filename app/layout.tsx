import type { Metadata } from 'next'
import { siteConfig } from '@/lib/config'

/**
 * ROOT layout — deliberately MINIMAL (Payload + Next.js pattern).
 *
 * Ye <html>/<body> ya koi site-chrome render NAHI karta. Kyun?
 *  - Frontend ka poora chrome (header, footer, fonts, globals.css, GTM, consent)
 *    ab app/(site)/layout.tsx me hai — sirf website ke pages par lagta hai.
 *    English + localized routes ek hi <html> share karte hain, taaki language
 *    switch client navigation rahe (full reload / SSR wait nahi).
 *  - Payload admin (app/(payload)/layout.tsx) apna alag <html>/<body> render karta
 *    hai — bina site ke header/footer/PWA-button/theme ke.
 *
 * Pehle root layout hi <html> + chrome render karta tha, isliye /admin ke andar
 * DOUBLE <html> ban rahe the → login theme-bleed, zoom, header/footer overlay,
 * button styling sab toot rahe the. Ab wo fix hai.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
