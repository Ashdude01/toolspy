/**
 * DEPRECATED ROUTE - moved to /instagram-dp-viewer/.
 * next.config.js issues a 301 before this page can ever render.
 * This stub exists only to keep the build green until the folder is deleted.
 */
'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n/use-t'

export default function DeprecatedInstagramPrivateViewerPage() {
  const t = useT()
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center space-y-4">
      <h1 className="text-2xl font-bold">{t('tools.instagramPrivateViewer.movedTitle')}</h1>
      <p className="text-muted-foreground">
        {t('tools.instagramPrivateViewer.movedBody')}
      </p>
      <Link
        href="/instagram-dp-viewer/"
        className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {t('tools.instagramPrivateViewer.openViewer')}
      </Link>
    </div>
  )
}
