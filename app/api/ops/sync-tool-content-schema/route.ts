import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { createRequire } from 'module'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * One-shot schema sync for Tool Content Article fields.
 * Auth: logged-in Payload admin (cookie) OR Bearer PAYLOAD_SECRET.
 * POST /api/ops/sync-tool-content-schema
 */
export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config })
    const auth = await payload.auth({ headers: req.headers })
    const bearer = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || ''
    const secretOk = Boolean(process.env.PAYLOAD_SECRET && bearer === process.env.PAYLOAD_SECRET)

    if (!auth.user && !secretOk) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = process.env.DATABASE_URL
    if (!url) {
      return NextResponse.json({ error: 'DATABASE_URL missing' }, { status: 500 })
    }

    const require = createRequire(import.meta.url)
    // pg ships no types; avoid `typeof import('pg')` so the build does not need @types/pg.
    const pg = require('pg') as {
      Client: new (config: {
        connectionString: string
        connectionTimeoutMillis?: number
        ssl?: { rejectUnauthorized: boolean }
      }) => {
        connect(): Promise<void>
        query(sql: string): Promise<{ rows: unknown[] }>
        end(): Promise<void>
      }
    }
    const client = new pg.Client({
      connectionString: url,
      connectionTimeoutMillis: 15000,
      ssl:
        url.includes('sslmode=require') || url.includes('neon.tech')
          ? { rejectUnauthorized: false }
          : undefined,
    })

    await client.connect()
    try {
      await client.query(`
        ALTER TABLE "tool_content_locales"
          ADD COLUMN IF NOT EXISTS "hero_heading" varchar,
          ADD COLUMN IF NOT EXISTS "hero_description" varchar,
          ADD COLUMN IF NOT EXISTS "content" jsonb;
      `)
      await client.query(`
        ALTER TABLE "_tool_content_v_locales"
          ADD COLUMN IF NOT EXISTS "version_hero_heading" varchar,
          ADD COLUMN IF NOT EXISTS "version_hero_description" varchar,
          ADD COLUMN IF NOT EXISTS "version_content" jsonb;
      `)
      await client.query(`
        ALTER TABLE "tool_content"
          ADD COLUMN IF NOT EXISTS "toc_include_h3" boolean DEFAULT false;
      `)
      await client.query(`
        ALTER TABLE "_tool_content_v"
          ADD COLUMN IF NOT EXISTS "version_toc_include_h3" boolean DEFAULT false;
      `)
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

      const check = await client.query(`
        SELECT table_name, column_name
        FROM information_schema.columns
        WHERE (table_name = 'tool_content_locales' AND column_name IN ('content','hero_heading','hero_description'))
           OR (table_name = '_tool_content_v_locales' AND column_name IN ('version_content','version_hero_heading','version_hero_description'))
           OR (table_name = 'tool_content' AND column_name = 'toc_include_h3')
           OR (table_name = '_tool_content_v' AND column_name = 'version_toc_include_h3')
        ORDER BY 1, 2
      `)

      return NextResponse.json({ ok: true, columns: check.rows })
    } finally {
      await client.end()
    }
  } catch (err) {
    console.error('[sync-tool-content-schema]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'sync failed' },
      { status: 500 },
    )
  }
}
