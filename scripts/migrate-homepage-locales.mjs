/**
 * Apply missing Homepage CMS columns (homepage_locales) to Neon.
 * Safe / idempotent. Run:
 *   node --env-file=.env scripts/migrate-homepage-locales.mjs
 */
import pg from 'pg'

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 15000,
})

await client.connect()
console.log('[migrate-homepage] connected')

await client.query(`
  DO $$ BEGIN
    CREATE TYPE "public"."enum_homepage_content_source" AS ENUM('code', 'cms');
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;
`)
console.log('[migrate-homepage] enum ok')

await client.query(`
  CREATE TABLE IF NOT EXISTS "homepage_locales" (
    "content_source" "enum_homepage_content_source" DEFAULT 'code',
    "content" jsonb,
    "meta_title" varchar,
    "meta_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
  );
`)
console.log('[migrate-homepage] table ok')

await client.query(`
  DO $$ BEGIN
    ALTER TABLE "homepage_locales"
      ADD CONSTRAINT "homepage_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id")
      ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;
`)

await client.query(`
  CREATE UNIQUE INDEX IF NOT EXISTS "homepage_locales_locale_parent_id_unique"
  ON "homepage_locales" USING btree ("_locale", "_parent_id");
`)
console.log('[migrate-homepage] indexes/fk ok')

// Ensure default locale row exists for each homepage parent (usually id=1)
const parents = await client.query(`SELECT id FROM homepage`)
for (const row of parents.rows) {
  const existing = await client.query(
    `SELECT id FROM homepage_locales WHERE _parent_id = $1 AND _locale = 'en'`,
    [row.id]
  )
  if (existing.rows.length === 0) {
    await client.query(
      `INSERT INTO homepage_locales (content_source, _locale, _parent_id)
       VALUES ('code', 'en', $1)`,
      [row.id]
    )
    console.log(`[migrate-homepage] seeded en locale for homepage id=${row.id}`)
  } else {
    console.log(`[migrate-homepage] en locale already exists for homepage id=${row.id}`)
  }
}

const count = await client.query(`SELECT count(*)::int AS c FROM homepage_locales`)
console.log('[migrate-homepage] homepage_locales rows:', count.rows[0].c)
await client.end()
console.log('[migrate-homepage] done')
