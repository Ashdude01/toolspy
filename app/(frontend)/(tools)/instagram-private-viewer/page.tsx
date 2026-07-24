/**
 * DEPRECATED ROUTE - moved to /instagram-dp-viewer/.
 * next.config.js issues a 301 before this page can ever render.
 * This stub exists only to keep the build green until the folder is deleted.
 */
import Link from 'next/link'

export default function DeprecatedInstagramPrivateViewerPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center space-y-4">
      <h1 className="text-2xl font-bold">This tool has moved</h1>
      <p className="text-muted-foreground">
        The Instagram DP Viewer now lives at a new address.
      </p>
      <Link
        href="/instagram-dp-viewer/"
        className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Open Instagram DP Viewer
      </Link>
    </div>
  )
}
