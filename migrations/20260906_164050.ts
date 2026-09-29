import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'de', 'fr', 'es', 'ja', 'nl', 'sv', 'da', 'no', 'it', 'ru', 'id', 'ko', 'tr', 'ar', 'hi');
  CREATE TYPE "public"."enum_tool_content_content_source" AS ENUM('code', 'cms');
  CREATE TYPE "public"."enum_tool_content_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tool_content_v_version_content_source" AS ENUM('code', 'cms');
  CREATE TYPE "public"."enum__tool_content_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tool_content_v_published_locale" AS ENUM('en', 'de', 'fr', 'es', 'ja', 'nl', 'sv', 'da', 'no', 'it', 'ru', 'id', 'ko', 'tr', 'ar', 'hi');
  CREATE TYPE "public"."enum_posts_category" AS ENUM('Exams', 'GST & Finance', 'Tools & Guides');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_category" AS ENUM('Exams', 'GST & Finance', 'Tools & Guides');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'de', 'fr', 'es', 'ja', 'nl', 'sv', 'da', 'no', 'it', 'ru', 'id', 'ko', 'tr', 'ar', 'hi');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'de', 'fr', 'es', 'ja', 'nl', 'sv', 'da', 'no', 'it', 'ru', 'id', 'ko', 'tr', 'ar', 'hi');
  CREATE TYPE "public"."enum_homepage_popular_tools_tool_slug" AS ENUM('image-compressor', 'online-image-cropper', 'image-converter', 'image-resizer', 'image-optimizer', 'jfif-to-jpg', 'base64-to-image', 'image-to-base64', 'base64-encoder-decoder', 'pdf-converter', 'pdf-to-word', 'pdf-to-jpg', 'jfif-to-pdf', 'merge-pdf', 'pdf-to-image', 'compress-pdf', 'heic-to-pdf', 'image-to-pdf', 'split-pdf', 'pdf-password-remover', 'pdf-to-excel', 'pdf-to-csv', 'file-protector', 'percentage-calculator', 'age-calculator', 'love-calculator', 'bmi-calculator', 'loan-calculator', 'mortgage-calculator', 'retirement-calculator', 'investment-calculator', 'coast-fire-calculator', 'tax-calculator', 'salary-calculator', 'unit-converter', 'currency-converter', 'temperature-converter', 'length-converter', 'weight-converter', 'volume-converter', 'area-converter', 'qr-code-generator', 'color-picker', 'color-palette-generator', 'google-indexing-api', 'json-formatter', 'json-table-converter', 'code-beautifier', 'ai-color-palette-generator', 'ai-background-remover', 'meme-generator', 'ai-writing-tools', 'ai-image-enhancer', 'ai-resume-builder', 'facebook-image-downloader', 'youtube-thumbnail-downloader', 'instagram-reels-downloader', 'instagram-dp-viewer', 'youtube-embed-code-generator', 'ocr-text-extractor', 'media-converter', 'ebook-converter', 'font-converter', 'instagram-engagement-calculator', 'facebook-engagement-calculator', 'twitter-engagement-calculator', 'youtube-engagement-calculator', 'domain-whois-lookup', 'expired-domain-finder', 'app-icon-generator', 'pwa-icon-generator', 'favicon-generator', 'image-to-ico-converter', 'markdown-to-docs-converter', 'gst-calculator', 'reverse-gst-calculator', 'hsn-sac-finder', 'cgst-sgst-igst-splitter', 'itc-calculator', 'e-invoice-qr-validator', 'composition-regular-scheme-estimator', 'penalty-late-fee-calculator', 'jee-main-rank-predictor', 'neet-rank-predictor', 'jee-advanced-rank-predictor', 'gate-rank-predictor', 'cat-percentile-predictor', 'upsc-rank-predictor', 'ssc-cgl-rank-predictor', 'bank-po-rank-predictor', 'website-screenshot');
  CREATE TYPE "public"."enum_homepage_content_source" AS ENUM('code', 'cms');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tool_content_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" varchar,
  	"body" jsonb
  );
  
  CREATE TABLE "tool_content_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "tool_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tool_slug" varchar,
  	"search_key" varchar,
  	"content_source" "enum_tool_content_content_source" DEFAULT 'code',
  	"custom_schema" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_tool_content_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "tool_content_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"keywords" varchar,
  	"disclaimer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_tool_content_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tool_content_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tool_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tool_slug" varchar,
  	"version_search_key" varchar,
  	"version_content_source" "enum__tool_content_v_version_content_source" DEFAULT 'code',
  	"version_custom_schema" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__tool_content_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__tool_content_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_tool_content_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_keywords" varchar,
  	"version_disclaimer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "posts_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"paragraphs" varchar,
  	"list_items" varchar,
  	"table_json" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category" "enum_posts_category" DEFAULT 'Tools & Guides',
  	"reading_time_minutes" numeric DEFAULT 5,
  	"featured_image_id" integer,
  	"related_tool_name" varchar,
  	"related_tool_path" varchar,
  	"related_tool_cta" varchar,
  	"og_image_id" integer,
  	"author_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"reviewed_by_id" integer,
  	"reviewed_at" timestamp(3) with time zone,
  	"cover_image_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"keywords" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"og_title" varchar,
  	"og_description" varchar,
  	"twitter_title" varchar,
  	"twitter_description" varchar,
  	"editorial_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"paragraphs" varchar,
  	"list_items" varchar,
  	"table_json" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_category" "enum__posts_v_version_category" DEFAULT 'Tools & Guides',
  	"version_reading_time_minutes" numeric DEFAULT 5,
  	"version_featured_image_id" integer,
  	"version_related_tool_name" varchar,
  	"version_related_tool_path" varchar,
  	"version_related_tool_cta" varchar,
  	"version_og_image_id" integer,
  	"version_author_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_reviewed_by_id" integer,
  	"version_reviewed_at" timestamp(3) with time zone,
  	"version_cover_image_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_keywords" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_og_title" varchar,
  	"version_og_description" varchar,
  	"version_twitter_title" varchar,
  	"version_twitter_description" varchar,
  	"version_editorial_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"authors_id" integer,
  	"tool_content_id" integer,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage_popular_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tool_slug" "enum_homepage_popular_tools_tool_slug" NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_locales" (
  	"content_source" "enum_homepage_content_source" DEFAULT 'code',
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tool_content_sections" ADD CONSTRAINT "tool_content_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tool_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tool_content_faqs" ADD CONSTRAINT "tool_content_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tool_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tool_content_locales" ADD CONSTRAINT "tool_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tool_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tool_content_v_version_sections" ADD CONSTRAINT "_tool_content_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tool_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tool_content_v_version_faqs" ADD CONSTRAINT "_tool_content_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tool_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tool_content_v" ADD CONSTRAINT "_tool_content_v_parent_id_tool_content_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tool_content"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tool_content_v_locales" ADD CONSTRAINT "_tool_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tool_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_faqs" ADD CONSTRAINT "posts_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_sections" ADD CONSTRAINT "posts_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_reviewed_by_id_authors_id_fk" FOREIGN KEY ("reviewed_by_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_faqs" ADD CONSTRAINT "_posts_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_sections" ADD CONSTRAINT "_posts_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_og_image_id_media_id_fk" FOREIGN KEY ("version_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_reviewed_by_id_authors_id_fk" FOREIGN KEY ("version_reviewed_by_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tool_content_fk" FOREIGN KEY ("tool_content_id") REFERENCES "public"."tool_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_popular_tools" ADD CONSTRAINT "homepage_popular_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_locales" ADD CONSTRAINT "homepage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "authors_slug_idx" ON "authors" USING btree ("slug");
  CREATE INDEX "authors_photo_idx" ON "authors" USING btree ("photo_id");
  CREATE INDEX "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");
  CREATE INDEX "tool_content_sections_order_idx" ON "tool_content_sections" USING btree ("_order");
  CREATE INDEX "tool_content_sections_parent_id_idx" ON "tool_content_sections" USING btree ("_parent_id");
  CREATE INDEX "tool_content_sections_locale_idx" ON "tool_content_sections" USING btree ("_locale");
  CREATE INDEX "tool_content_faqs_order_idx" ON "tool_content_faqs" USING btree ("_order");
  CREATE INDEX "tool_content_faqs_parent_id_idx" ON "tool_content_faqs" USING btree ("_parent_id");
  CREATE INDEX "tool_content_faqs_locale_idx" ON "tool_content_faqs" USING btree ("_locale");
  CREATE UNIQUE INDEX "tool_content_tool_slug_idx" ON "tool_content" USING btree ("tool_slug");
  CREATE INDEX "tool_content_search_key_idx" ON "tool_content" USING btree ("search_key");
  CREATE INDEX "tool_content_updated_at_idx" ON "tool_content" USING btree ("updated_at");
  CREATE INDEX "tool_content_created_at_idx" ON "tool_content" USING btree ("created_at");
  CREATE INDEX "tool_content__status_idx" ON "tool_content" USING btree ("_status");
  CREATE UNIQUE INDEX "tool_content_locales_locale_parent_id_unique" ON "tool_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_tool_content_v_version_sections_order_idx" ON "_tool_content_v_version_sections" USING btree ("_order");
  CREATE INDEX "_tool_content_v_version_sections_parent_id_idx" ON "_tool_content_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_tool_content_v_version_sections_locale_idx" ON "_tool_content_v_version_sections" USING btree ("_locale");
  CREATE INDEX "_tool_content_v_version_faqs_order_idx" ON "_tool_content_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_tool_content_v_version_faqs_parent_id_idx" ON "_tool_content_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_tool_content_v_version_faqs_locale_idx" ON "_tool_content_v_version_faqs" USING btree ("_locale");
  CREATE INDEX "_tool_content_v_parent_idx" ON "_tool_content_v" USING btree ("parent_id");
  CREATE INDEX "_tool_content_v_version_version_tool_slug_idx" ON "_tool_content_v" USING btree ("version_tool_slug");
  CREATE INDEX "_tool_content_v_version_version_search_key_idx" ON "_tool_content_v" USING btree ("version_search_key");
  CREATE INDEX "_tool_content_v_version_version_updated_at_idx" ON "_tool_content_v" USING btree ("version_updated_at");
  CREATE INDEX "_tool_content_v_version_version_created_at_idx" ON "_tool_content_v" USING btree ("version_created_at");
  CREATE INDEX "_tool_content_v_version_version__status_idx" ON "_tool_content_v" USING btree ("version__status");
  CREATE INDEX "_tool_content_v_created_at_idx" ON "_tool_content_v" USING btree ("created_at");
  CREATE INDEX "_tool_content_v_updated_at_idx" ON "_tool_content_v" USING btree ("updated_at");
  CREATE INDEX "_tool_content_v_snapshot_idx" ON "_tool_content_v" USING btree ("snapshot");
  CREATE INDEX "_tool_content_v_published_locale_idx" ON "_tool_content_v" USING btree ("published_locale");
  CREATE INDEX "_tool_content_v_latest_idx" ON "_tool_content_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_tool_content_v_locales_locale_parent_id_unique" ON "_tool_content_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_faqs_order_idx" ON "posts_faqs" USING btree ("_order");
  CREATE INDEX "posts_faqs_parent_id_idx" ON "posts_faqs" USING btree ("_parent_id");
  CREATE INDEX "posts_faqs_locale_idx" ON "posts_faqs" USING btree ("_locale");
  CREATE INDEX "posts_sections_order_idx" ON "posts_sections" USING btree ("_order");
  CREATE INDEX "posts_sections_parent_id_idx" ON "posts_sections" USING btree ("_parent_id");
  CREATE INDEX "posts_sections_locale_idx" ON "posts_sections" USING btree ("_locale");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX "posts_og_image_idx" ON "posts" USING btree ("og_image_id");
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_reviewed_by_idx" ON "posts" USING btree ("reviewed_by_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_version_faqs_order_idx" ON "_posts_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_posts_v_version_faqs_parent_id_idx" ON "_posts_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_faqs_locale_idx" ON "_posts_v_version_faqs" USING btree ("_locale");
  CREATE INDEX "_posts_v_version_sections_order_idx" ON "_posts_v_version_sections" USING btree ("_order");
  CREATE INDEX "_posts_v_version_sections_parent_id_idx" ON "_posts_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_sections_locale_idx" ON "_posts_v_version_sections" USING btree ("_locale");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_featured_image_idx" ON "_posts_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_posts_v_version_version_og_image_idx" ON "_posts_v" USING btree ("version_og_image_id");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_version_reviewed_by_idx" ON "_posts_v" USING btree ("version_reviewed_by_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_tool_content_id_idx" ON "payload_locked_documents_rels" USING btree ("tool_content_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "homepage_popular_tools_order_idx" ON "homepage_popular_tools" USING btree ("_order");
  CREATE INDEX "homepage_popular_tools_parent_id_idx" ON "homepage_popular_tools" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_locales_locale_parent_id_unique" ON "homepage_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "authors" CASCADE;
  DROP TABLE "tool_content_sections" CASCADE;
  DROP TABLE "tool_content_faqs" CASCADE;
  DROP TABLE "tool_content" CASCADE;
  DROP TABLE "tool_content_locales" CASCADE;
  DROP TABLE "_tool_content_v_version_sections" CASCADE;
  DROP TABLE "_tool_content_v_version_faqs" CASCADE;
  DROP TABLE "_tool_content_v" CASCADE;
  DROP TABLE "_tool_content_v_locales" CASCADE;
  DROP TABLE "posts_faqs" CASCADE;
  DROP TABLE "posts_sections" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "_posts_v_version_faqs" CASCADE;
  DROP TABLE "_posts_v_version_sections" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "homepage_popular_tools" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_tool_content_content_source";
  DROP TYPE "public"."enum_tool_content_status";
  DROP TYPE "public"."enum__tool_content_v_version_content_source";
  DROP TYPE "public"."enum__tool_content_v_version_status";
  DROP TYPE "public"."enum__tool_content_v_published_locale";
  DROP TYPE "public"."enum_posts_category";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_category";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_homepage_popular_tools_tool_slug";
  DROP TYPE "public"."enum_homepage_content_source";`)
}
