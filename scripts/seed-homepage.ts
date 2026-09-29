/**
 * Seed Homepage global popularTools from featured tools (first 12).
 *
 *   yarn payload run ./scripts/seed-homepage.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config'
import { getFeaturedTools } from '../lib/tools-data'

const featured = getFeaturedTools().slice(0, 12)
console.log(`[seed-homepage] seeding ${featured.length} popular tools`)

const payload = await getPayload({ config })

await payload.updateGlobal({
  slug: 'homepage',
  data: {
    popularTools: featured.map((t) => ({ toolSlug: t.slug })),
  } as never,
  overrideAccess: true,
})

console.log(
  '[seed-homepage] done:',
  featured.map((t) => t.slug).join(', ')
)
process.exit(0)
