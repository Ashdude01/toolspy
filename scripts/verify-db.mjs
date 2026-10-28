/**
 * Neon vs naya DB: har table ka row count + content hash compare.
 *   set "SOURCE_DATABASE_URL=..."   (Neon)
 *   set "TARGET_DATABASE_URL=..."   (Supabase)
 *   node scripts/verify-db.mjs
 * Sab "OK" aaye aur end me "ALL MATCH" to data poora migrate hua hai.
 */
import { createRequire } from 'module'
import path from 'path'
import { fileURLToPath } from 'url'
const require = createRequire(import.meta.url)
const pg = require('pg')
void path, fileURLToPath

const mk = (u) => new pg.Client({
  connectionString: u.replace(/([?&])(sslmode|channel_binding)=[^&]*&?/g, '$1').replace(/[?&]$/, ''),
  ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 20000,
})
const SRC = process.env.SOURCE_DATABASE_URL, DST = process.env.TARGET_DATABASE_URL
if (!SRC || !DST) { console.error('SOURCE_DATABASE_URL aur TARGET_DATABASE_URL set karo'); process.exit(1) }
const a = mk(SRC), b = mk(DST)
await a.connect(); await b.connect()

const list = async (c) => (await c.query(
  `select table_name from information_schema.tables where table_schema='public' and table_type='BASE TABLE' order by 1`
)).rows.map((r) => r.table_name).filter((t) => t !== 'payload_migrations')
const ta = await list(a), tb = new Set(await list(b))

let bad = 0
for (const t of ta) {
  if (!tb.has(t)) { console.log(`MISSING  ${t} (target par table nahi)`); bad++; continue }
  const colsOf = async (c) => (await c.query(
    `select column_name from information_schema.columns where table_schema='public' and table_name=$1`, [t]
  )).rows.map((r) => r.column_name)
  const ca = await colsOf(a), cb = await colsOf(b)
  const sb = new Set(cb), sa = new Set(ca)
  const onlyA = ca.filter((x) => !sb.has(x)), onlyB = cb.filter((x) => !sa.has(x))
  // sirf common columns compare (column order ya extra legacy columns ignore)
  const mkq = (extra) => `select count(*)::int as n, coalesce(md5(string_agg(j, '|' order by j)),'') as h from (select (to_jsonb(x) - $1::text[])::text as j from "${t}" x) s`
  const ra = (await a.query(mkq(), [onlyA])).rows[0]
  const rb = (await b.query(mkq(), [onlyB])).rows[0]
  if (onlyA.length || onlyB.length) console.log(`  note ${t}: sirf source me cols=[${onlyA.join(',')}] sirf target me cols=[${onlyB.join(',')}]`)
  const ok = ra.n === rb.n && ra.h === rb.h
  if (!ok) bad++
  console.log(`${ok ? 'OK      ' : 'MISMATCH'} ${t}: source=${ra.n} target=${rb.n}${ok || ra.n !== rb.n ? '' : ' (count same, content alag)'}`)
}
await a.end(); await b.end()
console.log(bad ? `\n${bad} table(s) me problem` : '\nALL MATCH')
process.exit(bad ? 1 : 0)
