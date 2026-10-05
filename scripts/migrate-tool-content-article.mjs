/**
 * Add missing ToolContent Article fields to Neon (live + versions).
 * Fixes blank CMS Tool Content panel after content / toc fields shipped
 * without a DB migration (SELECT fails → admin blank / API 500).
 *
 * Safe / idempotent. Run:
 *   node --env-file=.env scripts/migrate-tool-content-article.mjs
 *
 * Also runs from `npm run build` when DATABASE_URL is set (Vercel).
 */
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'

const require = createRequire(import.meta.url)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
let pg
try {
  pg = require('pg')
} catch {
  // pnpm may nest pg under @payloadcms/db-postgres without hoisting
  pg = require(path.join(root, 'node_modules/.pnpm/pg@8.20.0/node_modules/pg'))
}

const url = process.env.DATABASE_URL
if (!url) {
  console.warn('[migrate-tool-article] DATABASE_URL missing — skip')
  process.exit(0)
}

const client = new pg.Client({
  connectionString: url,
  connectionTimeoutMillis: 15000,
  ssl: url.includes('sslmode=require') || url.includes('neon.tech') ? { rejectUnauthorized: false } : undefined,
})

await client.connect()
console.log('[migrate-tool-article] connected')

// Localized: hero (may already exist) + article body
await client.query(`
  ALTER TABLE "tool_content_locales"
    ADD COLUMN IF NOT EXISTS "hero_heading" varchar,
    ADD COLUMN IF NOT EXISTS "hero_description" varchar,
    ADD COLUMN IF NOT EXISTS "content" jsonb;
`)
console.log('[migrate-tool-article] tool_content_locales ok')

await client.query(`
  ALTER TABLE "_tool_content_v_locales"
    ADD COLUMN IF NOT EXISTS "version_hero_heading" varchar,
    ADD COLUMN IF NOT EXISTS "version_hero_description" varchar,
    ADD COLUMN IF NOT EXISTS "version_content" jsonb;
`)
console.log('[migrate-tool-article] _tool_content_v_locales ok')

// Non-localized checkbox on parent + versions parent
await client.query(`
  ALTER TABLE "tool_content"
    ADD COLUMN IF NOT EXISTS "toc_include_h3" boolean DEFAULT false;
`)
await client.query(`
  ALTER TABLE "_tool_content_v"
    ADD COLUMN IF NOT EXISTS "version_toc_include_h3" boolean DEFAULT false;
`)
console.log('[migrate-tool-article] toc_include_h3 ok')

// Non-localized array: tocExclude
await client.query(`
  CREATE TABLE IF NOT EXISTS "tool_content_toc_exclude" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "anchor_id" varchar
  );
`)
await client.query(`
  DO $$ BEGIN
    ALTER TABLE "tool_content_toc_exclude"
      ADD CONSTRAINT "tool_content_toc_exclude_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."tool_content"("id")
      ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;
`)
await client.query(`
  CREATE INDEX IF NOT EXISTS "tool_content_toc_exclude_order_idx"
    ON "tool_content_toc_exclude" USING btree ("_order");
`)
await client.query(`
  CREATE INDEX IF NOT EXISTS "tool_content_toc_exclude_parent_id_idx"
    ON "tool_content_toc_exclude" USING btree ("_parent_id");
`)
console.log('[migrate-tool-article] tool_content_toc_exclude ok')

await client.query(`
  CREATE TABLE IF NOT EXISTS "_tool_content_v_version_toc_exclude" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "anchor_id" varchar,
    "_uuid" varchar
  );
`)
await client.query(`
  DO $$ BEGIN
    ALTER TABLE "_tool_content_v_version_toc_exclude"
      ADD CONSTRAINT "_tool_content_v_version_toc_exclude_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_tool_content_v"("id")
      ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;
`)
await client.query(`
  CREATE INDEX IF NOT EXISTS "_tool_content_v_version_toc_exclude_order_idx"
    ON "_tool_content_v_version_toc_exclude" USING btree ("_order");
`)
await client.query(`
  CREATE INDEX IF NOT EXISTS "_tool_content_v_version_toc_exclude_parent_id_idx"
    ON "_tool_content_v_version_toc_exclude" USING btree ("_parent_id");
`)
console.log('[migrate-tool-article] _tool_content_v_version_toc_exclude ok')

const check = await client.query(`
  SELECT table_name, column_name
  FROM information_schema.columns
  WHERE (
      table_name = 'tool_content_locales'
      AND column_name IN ('content', 'hero_heading', 'hero_description')
    )
    OR (
      table_name = '_tool_content_v_locales'
      AND column_name IN ('version_content', 'version_hero_heading', 'version_hero_description')
    )
    OR (
      table_name = 'tool_content'
      AND column_name = 'toc_include_h3'
    )
    OR (
      table_name = '_tool_content_v'
      AND column_name = 'version_toc_include_h3'
    )
  ORDER BY 1, 2
`)
const tables = await client.query(`
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_name IN ('tool_content_toc_exclude', '_tool_content_v_version_toc_exclude')
  ORDER BY 1
`)
console.log('[migrate-tool-article] columns:', check.rows)
console.log('[migrate-tool-article] tables:', tables.rows)
await client.end()
console.log('[migrate-tool-article] done')
