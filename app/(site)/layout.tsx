/**
 * Shared site route-group shell (English + localized).
 *
 * Deliberately pass-through — NO <html> here. Each branch owns its document:
 *   - (frontend)/layout.tsx → lang="en"
 *   - (i18n)/[locale]/layout.tsx → lang={locale} from params (View Source correct)
 *
 * Putting one shared <html lang="en"> made every /ja/... page show lang="en"
 * in View Source, which is wrong for SEO. headers() is also banned here — it
 * would force SSR on every public page.
 */
export const revalidate = 3600

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return children
}
