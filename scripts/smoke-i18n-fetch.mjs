import fs from 'fs'
import path from 'path'
import os from 'os'
import { execSync } from 'child_process'

const tmp = os.tmpdir()
const urls = [
  ['t-de-merge.html', 'http://localhost:3001/de/merge-pdf/'],
  ['t-de-font.html', 'http://localhost:3001/de/font-converter/'],
  ['t-de-gst.html', 'http://localhost:3001/de/gst-calculator/'],
  ['t-en-home.html', 'http://localhost:3001/'],
  ['t-de-home.html', 'http://localhost:3001/de/'],
]

for (const [file, url] of urls) {
  const out = path.join(tmp, file)
  try {
    execSync(`curl.exe -sL --max-time 120 "${url}" -o "${out}"`, { stdio: 'inherit' })
  } catch (e) {
    console.log('FAIL fetch', url)
    continue
  }
  const c = fs.readFileSync(out, 'utf8')
  const lang = (c.match(/lang="([^"]+)/) || [])[1]
  const needles = [
    'Ähnliche Tools',
    'Related Tools',
    'Bild-Tools',
    'Image Tools',
    'Über uns',
    'About Us',
    'Datenschutz',
    'Privacy',
    'Gewicht',
    'Berechnen',
    'Herunterladen',
    'Zusammenführen',
    'Schrift',
    'GST',
  ]
  const hits = needles.filter((n) => c.includes(n))
  console.log(file, 'lang=' + lang, 'bytes=' + c.length, 'hits=' + hits.join('|'))
}
