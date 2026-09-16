/**
 * Add missing ToolContent hero fields to Neon (live + versions locales).
 * Fixes blank CMS Tool Content panel:
 *   column _tool_content_v__locales.version_hero_heading does not exist
 *
 *   node --env-file=.env scripts/migrate-tool-content-hero.mjs
 */
import pg from 'pg'

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 15000,
})

await client.connect()
console.log('[migrate-tool-hero] connected')

await client.query(`
  ALTER TABLE "tool_content_locales"
    ADD COLUMN IF NOT EXISTS "hero_heading" varchar,
    ADD COLUMN IF NOT EXISTS "hero_description" varchar;
`)
console.log('[migrate-tool-hero] tool_content_locales ok')

await client.query(`
  ALTER TABLE "_tool_content_v_locales"
    ADD COLUMN IF NOT EXISTS "version_hero_heading" varchar,
    ADD COLUMN IF NOT EXISTS "version_hero_description" varchar;
`)
console.log('[migrate-tool-hero] _tool_content_v_locales ok')

const check = await client.query(`
  SELECT table_name, column_name
  FROM information_schema.columns
  WHERE table_name IN ('tool_content_locales', '_tool_content_v_locales')
    AND column_name ILIKE '%hero%'
  ORDER BY 1, 2
`)
console.log('[migrate-tool-hero] hero columns:', check.rows)
await client.end()
console.log('[migrate-tool-hero] done')
