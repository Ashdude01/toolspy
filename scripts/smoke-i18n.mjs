import { translate } from '../lib/i18n/messages.ts'

const checks = [
  ['en', 'categories.image-tools'],
  ['de', 'categories.image-tools'],
  ['de', 'relatedTools.kicker'],
  ['de', 'footer.links.aboutUs'],
  ['de', 'tools.bmiCalculator.weight'],
  ['de', 'tools.mergePdf.moveUp'],
  ['de', 'toolCommon.calculate'],
  ['en', 'tools.instagramPrivateViewer.movedTitle'],
]

for (const [locale, key] of checks) {
  console.log(locale, key, '→', translate(locale, key))
}
