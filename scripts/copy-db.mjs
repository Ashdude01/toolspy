/**
 * Neon -> naya Postgres (Supabase etc.) DATA copy, bina pg_dump ke.
 * Pehle target par schema bana lo (pnpm payload migrate), phir:
 *
 *   $env:TARGET_DATABASE_URL="postgresql://...supabase..."
 *   node scripts/copy-db.mjs
 *
 * Source = .env.local ka DATABASE_URL (ya SOURCE_DATABASE_URL env).
 */
import { createRequire } from 'module'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pg = require('pg')

function readEnvLocal(key) {
  try {
    const t = fs.readFileSync(path.join(root, '.env.local'), 'utf8')
    const m = t.match(new RegExp('^\\s*' + key + '\\s*=\\s*(.*)$', 'm'))
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : ''
  } catch { return '' }
}
const SRC = process.env.SOURCE_DATABASE_URL || readEnvLocal('DATABASE_URL')
const DST = process.env.TARGET_DATABASE_URL
if (!SRC || !DST) { console.error('SOURCE (.env.local DATABASE_URL) aur TARGET_DATABASE_URL dono chahiye'); process.exit(1) }

const mk = (url) => new pg.Client({
  connectionString: url.replace(/([?&])sslmode=[^&]*&?/, '$1').replace(/[?&]$/, ''),
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 20000,
})
const src = mk(SRC), dst = mk(DST)
await src.connect(); await dst.connect()
console.log('connected: source + target')

const tables = (await src.query(
  `select table_name from information_schema.tables where table_schema='public' and table_type='BASE TABLE' order by 1`
)).rows.map((r) => r.table_name).filter((t) => t !== 'payload_migrations')

const dstTables = new Set((await dst.query(
  `select table_name from information_schema.tables where table_schema='public'`
)).rows.map((r) => r.table_name))

const missing = tables.filter((t) => !dstTables.has(t))
if (missing.length) { console.error('Target par ye tables nahi hain (pehle schema banao):', missing.join(', ')); process.exit(1) }

await dst.query(`truncate table ${tables.map((t) => `"${t}"`).join(', ')}`)
console.log('target tables cleared:', tables.length)

try { await dst.query(`set session_replication_role = replica`) }
catch (e) { console.error('session_replication_role set nahi hua:', e.message); process.exit(1) }

for (const t of tables) {
  const colsMeta = (await dst.query(
    `select column_name, data_type from information_schema.columns where table_schema='public' and table_name=$1`, [t]
  )).rows
  const srcCols = new Set((await src.query(
    `select column_name from information_schema.columns where table_schema='public' and table_name=$1`, [t]
  )).rows.map((r) => r.column_name))
  const cols = colsMeta.filter((c) => srcCols.has(c.column_name))
  if (!cols.length) continue
  const isJson = new Set(cols.filter((c) => c.data_type === 'json' || c.data_type === 'jsonb').map((c) => c.column_name))
  const names = cols.map((c) => `"${c.column_name}"`).join(',')

  const sel = cols.map((c) => `"${c.column_name}"::text as "${c.column_name}"`).join(',')
  const { rows } = await src.query(`select ${sel} from "${t}"`)
  const BATCH = 200
  for (let i = 0; i < rows.length; i += BATCH) {
    const chunk = rows.slice(i, i + BATCH)
    const params = []
    const values = chunk.map((row) => '(' + cols.map((c) => {
      let v = row[c.column_name]
      params.push(v)
      return '$' + params.length
    }).join(',') + ')').join(',')
    await dst.query(`insert into "${t}" (${names}) values ${values}`, params)
  }
  console.log(`${t}: ${rows.length} rows`)
}

// serial/identity sequences sync
const seqs = (await dst.query(`
  select c.table_name, c.column_name, pg_get_serial_sequence('"public"."'||c.table_name||'"', c.column_name) as seq
  from information_schema.columns c
  join information_schema.tables t on t.table_name=c.table_name and t.table_schema='public' and t.table_type='BASE TABLE'
  where c.table_schema='public'`)).rows.filter((r) => r.seq)
for (const s of seqs) {
  await dst.query(`select setval($1, coalesce((select max("${s.column_name}") from "${s.table_name}"),0)+1, false)`, [s.seq])
}
console.log('sequences synced:', seqs.length)
await src.end(); await dst.end()
console.log('DONE')
