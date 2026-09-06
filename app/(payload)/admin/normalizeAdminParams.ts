/**
 * Next.js `trailingSlash: true` adds an empty segment to catch-all routes
 * (e.g. /admin/globals/homepage/ → ['globals','homepage','']).
 * Payload's router expects exact segment counts — strip empties.
 */
export async function normalizeAdminParams(
  params: Promise<{ segments?: string[] }>
): Promise<{ segments: string[] }> {
  const resolved = await params
  return {
    segments: (resolved.segments ?? []).filter((s) => s.length > 0),
  }
}
