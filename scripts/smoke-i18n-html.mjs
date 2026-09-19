import fs from 'fs'
import path from 'path'
import os from 'os'

const checks = {
  't-en-bmi.html': [
    'lang="en"',
    'Weight',
    'Calculate',
    'Related Tools',
    'Image Tools',
    'Advanced Calculators',
    'About Us',
    'Privacy',
  ],
  't-de-b64.html': [
    'lang="de"',
    'Über Base64',
    'Anwendungsfälle',
    'Ähnliche Tools',
    'Bild-Tools',
    'Über uns',
    'Datenschutz',
  ],
  't-de-qr.html': [
    'lang="de"',
    'Über QR-Codes',
    'Schnelle Antwort',
    'Ähnliche Tools',
    'Bild-Tools',
    'Fehlerkorrektur',
  ],
  't-de-bmi2.html': [
    'lang="de"',
    'Gewicht',
    'Berechnen',
    'Ähnliche Tools',
    'Bild-Tools',
    'Unit System',
  ],
}

for (const [file, needles] of Object.entries(checks)) {
  const p = path.join(os.tmpdir(), file)
  if (!fs.existsSync(p)) {
    console.log(file, 'MISSING')
    continue
  }
  const c = fs.readFileSync(p, 'utf8')
  console.log('====', file, '====')
  for (const n of needles) {
    console.log(c.includes(n) ? '  OK  ' : '  MISS', n)
  }
  const hits = c.match(
    /Ähnliche Tools|Related Tools|Über Base64|About Base64 Encoding|Über QR-Codes|Gewicht|Weight|Bild-Tools|Image Tools|Über uns|About Us|So funktioniert|How to Use/g
  )
  console.log('  hits:', [...new Set(hits || [])].join(' | ') || '(none)')
}
