import fs from 'fs'
import path from 'path'
import os from 'os'
import { execFileSync } from 'child_process'

const BASE = process.env.BASE || 'http://localhost:3000'
const tmp = os.tmpdir()

function fetchPage(url) {
  const id = Buffer.from(url).toString('hex').slice(0, 24)
  const file = path.join(tmp, `lang-test-${id}.html`)
  const hdrFile = file + '.hdr'
  execFileSync('curl.exe', ['-sL', '--max-time', '120', '-D', hdrFile, url, '-o', file], {
    stdio: 'ignore',
  })
  const html = fs.readFileSync(file, 'utf8')
  const hdr = fs.readFileSync(hdrFile, 'utf8')
  const lang = (html.match(/<html[^>]*\slang="([^"]+)"/) || [])[1] || '?'
  const dir = (html.match(/<html[^>]*\sdir="([^"]+)"/) || [])[1] || '?'
  const cl = (hdr.match(/content-language:\s*(\S+)/i) || [])[1] || '?'
  const xl = (hdr.match(/x-toolspy-locale:\s*(\S+)/i) || [])[1] || '?'
  const status = (hdr.match(/HTTP\/[\d.]+ (\d+)/) || [])[1] || '?'
  return { lang, dir, cl, xl, bytes: html.length, status }
}

const cases = [
  ['DE font', `${BASE}/de/font-converter/`, 'de'],
  ['DE bmi', `${BASE}/de/bmi-calculator/`, 'de'],
  ['DE home', `${BASE}/de/`, 'de'],
  ['DE gst', `${BASE}/de/gst-calculator/`, 'de'],
  ['DE base64', `${BASE}/de/image-to-base64/`, 'de'],
  ['EN font', `${BASE}/font-converter/`, 'en'],
  ['EN bmi', `${BASE}/bmi-calculator/`, 'en'],
  ['EN home', `${BASE}/`, 'en'],
]

let pass = 0
for (const [name, url, expect] of cases) {
  try {
    const r = fetchPage(url)
    const ok = r.lang === expect && r.status === '200'
    if (ok) pass++
    console.log(
      `${ok ? 'PASS' : 'FAIL'} ${name}: lang=${r.lang} (want ${expect}) dir=${r.dir} CL=${r.cl} x-locale=${r.xl} HTTP=${r.status}`
    )
  } catch (e) {
    console.log(`FAIL ${name}: ${e.message}`)
  }
}
console.log(`\n${pass}/${cases.length} passed`)
process.exit(pass === cases.length ? 0 : 1)
