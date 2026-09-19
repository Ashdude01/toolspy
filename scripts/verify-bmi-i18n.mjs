import fs from 'fs'
const s = fs.readFileSync('app/(frontend)/(tools)/bmi-calculator/page.tsx', 'utf8')
console.log('has useT', s.includes('useT'))
console.log('t calls', (s.match(/t\(/g) || []).length)
const m = s.match(/t\("tools\.bmiCalculator\.[^"]+"\)/g)
console.log('sample', m && m.slice(0, 12))
const msg = fs.readFileSync('lib/i18n/messages.ts', 'utf8')
const i = msg.indexOf('bmiCalculator:')
console.log('messages has ns', i > 0)
console.log(msg.slice(i, i + 600))
// syntax check page
const bad = s.match(/>\{\s*\{/)
console.log('double brace?', !!bad)
