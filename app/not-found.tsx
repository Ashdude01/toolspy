import type { Metadata } from 'next'

/**
 * ROOT 404 — sirf last-resort fallback. NORMALLY KABHI RENDER NAHI HOTA.
 *
 * Har unmatched URL ab `app/(site)/(frontend)/[...notfound]/page.tsx` (catch-all) pakadta
 * hai → `notFound()` → `app/(site)/(frontend)/not-found.tsx` jo POORE site layout
 * (header/footer/theme) ke saath aata hai. Wahi asli 404 page hai.
 *
 * Ye file sirf tab use hoti hai jab `notFound()` kisi aise scope me throw ho jo
 * (frontend) ke bahar hai (bahut hi rare). Root layout minimal hai (Payload pattern),
 * isliye yahan globals.css inject nahi hoti — is wajah se ye jaan-boojh kar ek
 * chhota, self-contained message hai (koi Tailwind/theme dependency nahi).
 */
export const metadata: Metadata = {
  title: 'Page Not Found (404) | Toolspy',
  robots: { index: false, follow: true },
}

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          background: '#ffffff',
          color: '#0b1220',
        }}
      >
        <div style={{ textAlign: 'center', padding: 24 }}>
          <p style={{ fontSize: 48, fontWeight: 800, margin: 0, color: '#3b82f6' }}>404</p>
          <p style={{ margin: '8px 0 16px' }}>Page not found.</p>
          <a href="/" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>
            Back to home
          </a>
        </div>
      </body>
    </html>
  )
}
