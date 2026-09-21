import { ROUTABLE_LOCALES, SWITCHER_LOCALES, ALL_LOCALES } from '../lib/i18n/locales.ts'
import { messages } from '../lib/i18n/messages.ts'
import { getToolCopy } from '../lib/i18n/get-tool-copy.ts'
import { toolCatalogLocales } from '../lib/i18n/tool-catalog-locales/index.ts'
import { toolsLocales } from '../lib/i18n/tools-locales/index.ts'

console.log('ALL_LOCALES:', Object.keys(ALL_LOCALES).join(', '))
console.log('ROUTABLE:', ROUTABLE_LOCALES.join(', '))
console.log('SWITCHER count:', SWITCHER_LOCALES.length)
console.log('extra hi/da/no present?:', !!(ALL_LOCALES.hi || ALL_LOCALES.da || ALL_LOCALES.no))

const chromeLocs = ['de', 'fr', 'es', 'ja', 'nl', 'sv', 'it', 'ru', 'id', 'ko', 'tr', 'ar']
for (const l of chromeLocs) {
  const m = messages[l]
  const tools = m?.tools ? Object.keys(m.tools).length : 0
  const cat = toolCatalogLocales[l] ? Object.keys(toolCatalogLocales[l]).length : 0
  const tl = toolsLocales[l] ? Object.keys(toolsLocales[l]).length : 0
  console.log(
    `${l}: msgTools=${tools} toolsLocalesFile=${tl} catalog=${cat} | nav=${m?.nav?.tools ?? '?'} | optimizer=${getToolCopy('image-optimizer', l).name}`,
  )
}
console.log('share.fr:', messages.fr?.share?.share)
console.log('catalog.fr compressor:', getToolCopy('image-compressor', 'fr').name)
