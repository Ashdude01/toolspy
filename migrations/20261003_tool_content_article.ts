import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Tool Content Article tab: localized richText `content`, tocIncludeH3, tocExclude.
 * Also ensures hero_heading / hero_description exist (older ad-hoc script).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "tool_content_locales"
      ADD COLUMN IF NOT EXISTS "hero_heading" varchar,
      ADD COLUMN IF NOT EXISTS "hero_description" varchar,
      ADD COLUMN IF NOT EXISTS "content" jsonb;

    ALTER TABLE "_tool_content_v_locales"
      ADD COLUMN IF NOT EXISTS "version_hero_heading" varchar,
      ADD COLUMN IF NOT EXISTS "version_hero_description" varchar,
      ADD COLUMN IF NOT EXISTS "version_content" jsonb;

    ALTER TABLE "tool_content"
      ADD COLUMN IF NOT EXISTS "toc_include_h3" boolean DEFAULT false;

    ALTER TABLE "_tool_content_v"
      ADD COLUMN IF NOT EXISTS "version_toc_include_h3" boolean DEFAULT false;

    CREATE TABLE IF NOT EXISTS "tool_content_toc_exclude" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "anchor_id" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "tool_content_toc_exclude"
        ADD CONSTRAINT "tool_content_toc_exclude_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."tool_content"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "tool_content_toc_exclude_order_idx"
      ON "tool_content_toc_exclude" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "tool_content_toc_exclude_parent_id_idx"
      ON "tool_content_toc_exclude" USING btree ("_parent_id");

    CREATE TABLE IF NOT EXISTS "_tool_content_v_version_toc_exclude" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "anchor_id" varchar,
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "_tool_content_v_version_toc_exclude"
        ADD CONSTRAINT "_tool_content_v_version_toc_exclude_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_tool_content_v"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "_tool_content_v_version_toc_exclude_order_idx"
      ON "_tool_content_v_version_toc_exclude" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_tool_content_v_version_toc_exclude_parent_id_idx"
      ON "_tool_content_v_version_toc_exclude" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_tool_content_v_version_toc_exclude" CASCADE;
    DROP TABLE IF EXISTS "tool_content_toc_exclude" CASCADE;

    ALTER TABLE "_tool_content_v" DROP COLUMN IF EXISTS "version_toc_include_h3";
    ALTER TABLE "tool_content" DROP COLUMN IF EXISTS "toc_include_h3";

    ALTER TABLE "_tool_content_v_locales"
      DROP COLUMN IF EXISTS "version_content",
      DROP COLUMN IF EXISTS "version_hero_heading",
      DROP COLUMN IF EXISTS "version_hero_description";

    ALTER TABLE "tool_content_locales"
      DROP COLUMN IF EXISTS "content",
      DROP COLUMN IF EXISTS "hero_heading",
      DROP COLUMN IF EXISTS "hero_description";
  `)
}
