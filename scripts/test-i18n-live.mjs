import fs from 'fs'
import path from 'path'
import os from 'os'
import { execFileSync } from 'child_process'

const tmp = os.tmpdir()

function fetch(url, file) {
  const out = path.join(tmp, file)
  execFileSync('curl.exe', ['-sL', '--max-time', '120', url, '-o', out], {
    stdio: 'ignore',
  })
  return fs.readFileSync(out, 'utf8')
}

function check(name, html, expectations) {
  const lang = (html.match(/lang="([^"]+)/) || [])[1] || '?'
  const rows = []
  for (const [label, needle] of expectations) {
    rows.push([html.includes(needle) ? 'PASS' : 'FAIL', label, needle])
  }
  console.log(`\n## ${name} (lang=${lang}, ${html.length} bytes)`)
  for (const [st, label] of rows) console.log(`${st.padEnd(4)} ${label}`)
  return rows.every(([st]) => st === 'PASS')
}

const results = []

results.push(
  check('EN BMI', fetch('http://localhost:3001/bmi-calculator/', 'test-en-bmi.html'), [
    ['html lang en', 'lang="en"'],
    ['widget Weight', 'Weight'],
    ['related kicker', 'Related Tools'],
    ['category Image Tools', 'Image Tools'],
    ['footer About Us', 'About Us'],
  ])
)

results.push(
  check('DE BMI', fetch('http://localhost:3001/de/bmi-calculator/', 'test-de-bmi.html'), [
    ['html lang de', 'lang="de"'],
    ['widget Gewicht', 'Gewicht'],
    ['widget Berechnen', 'Berechnen'],
    ['category Bild-Tools', 'Bild-Tools'],
    ['footer Über uns', 'Über uns'],
    ['footer Datenschutz', 'Datenschutz'],
  ])
)

results.push(
  check('DE Font Converter', fetch('http://localhost:3001/de/font-converter/', 'test-de-font.html'), [
    ['html lang de', 'lang="de"'],
    ['related Ähnliche Tools', 'Ähnliche Tools'],
    ['related heading DE', 'Weitere hilfreiche'],
    ['category Bild-Tools', 'Bild-Tools'],
    ['nav Über uns', 'Über uns'],
  ])
)

results.push(
  check('DE Image→Base64 About', fetch('http://localhost:3001/de/image-to-base64/', 'test-de-b64.html'), [
    ['html lang de', 'lang="de"'],
    ['about title', 'Über Base64'],
    ['about use cases', 'Anwendungsfälle'],
    ['footer Über uns', 'Über uns'],
  ])
)

results.push(
  check('DE QR About', fetch('http://localhost:3001/de/qr-code-generator/', 'test-de-qr.html'), [
    ['html lang de', 'lang="de"'],
    ['about title', 'Über QR-Codes'],
    ['about quick', 'Schnelle Antwort'],
  ])
)

results.push(
  check('DE GST widget', fetch('http://localhost:3001/de/gst-calculator/', 'test-de-gst.html'), [
    ['html lang de', 'lang="de"'],
    ['Berechnen present', 'Berechnen'],
    ['category Bild-Tools', 'Bild-Tools'],
  ])
)

results.push(
  check('DE Home', fetch('http://localhost:3001/de/', 'test-de-home.html'), [
    ['html lang de', 'lang="de"'],
    ['Bild-Tools', 'Bild-Tools'],
    ['Über uns', 'Über uns'],
  ])
)

const pass = results.filter(Boolean).length
console.log(`\n=== SUMMARY ${pass}/${results.length} suites fully passed ===`)
