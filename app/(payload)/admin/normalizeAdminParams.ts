/**
 * Next.js `trailingSlash: true` adds an empty segment to catch-all admin routes
 * (e.g. /admin/globals/homepage/ → ['globals','homepage','']). Payload's router
 * expects exact segment counts — strip empties.
 *
 * DO cheezein zaroori (dono ke bina /admin toot-ta hai):
 *  1. NULL-SAFE: `not-found.tsx` ko Next `params` NAHI deta (undefined). Pehle
 *     `resolved.segments` seedhe access hota tha → "Cannot read properties of
 *     undefined" → poora dashboard SSR crash.
 *  2. DASHBOARD ke liye segments = UNDEFINED (na ki []): jab koi real segment na
 *     ho (/admin/) to Payload dashboard tabhi render karta hai jab `segments`
 *     undefined ho. `?? []` isse `[]` bana deta tha → Payload "Nothing found"
 *     dikhata tha. Isliye empty hone par undefined return karte hain.
 */
export async function normalizeAdminParams(
  params?: Promise<{ segments?: string[] }> | { segments?: string[] },
): Promise<{ segments: string[] }> {
  const resolved = params ? await params : undefined
  const filtered = (resolved?.segments ?? []).filter(
    (s) => typeof s === 'string' && s.length > 0,
  )
  // Dashboard (no real segments) → undefined (Payload dashboard). Sub-routes → filtered.
  // Cast: generated page.tsx `{ segments: string[] }` type expect karta hai, par
  // Payload runtime undefined ko dashboard ke roop me handle karta hai.
  return { segments: (filtered.length > 0 ? filtered : undefined) as unknown as string[] }
}
