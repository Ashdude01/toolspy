import Link from 'next/link'
import { Search, Home, Wrench, ArrowRight, FileText, Mail, LifeBuoy } from 'lucide-react'

/**
 * NotFoundContent — shared 404 body (SERVER component).
 *
 * Dono jagah use hota hai:
 *   - app/(site)/(frontend)/not-found.tsx           → English chrome
 *   - app/(site)/(i18n)/[locale]/not-found.tsx     → localized chrome (correct lang)
 *   - app/(site)/not-found.tsx                      → fallback SiteDocument (invalid locale)
 *   - app/not-found.tsx (root)                      → self-contained <html> (last resort)
 *
 * SEO/UX:
 *   - Pure server-rendered: saara content + internal links initial HTML me (crawlable).
 *   - Search ek plain <form action="/tools/"> hai — JS ke bina bhi kaam karta hai.
 *   - Sab links trailing-slash ke saath (site trailingSlash use karti hai → no 308).
 *   - noindex + 404 status not-found.tsx se aata hai; yahan sirf helpful content.
 */

const popularTools = [
  { name: 'Image Compressor', href: '/image-compressor/', emoji: '🗜️' },
  { name: 'Merge PDF', href: '/merge-pdf/', emoji: '📎' },
  { name: 'PDF to Word', href: '/pdf-to-word/', emoji: '📄' },
  { name: 'QR Code Generator', href: '/qr-code-generator/', emoji: '📱' },
  { name: 'GST Calculator', href: '/gst-calculator/', emoji: '🧾' },
  { name: 'Age Calculator', href: '/age-calculator/', emoji: '🎂' },
  { name: 'Image Resizer', href: '/image-resizer/', emoji: '🖼️' },
  { name: 'JSON Formatter', href: '/json-formatter/', emoji: '{ }' },
]

const quickSearches = [
  { label: 'PDF tools', href: '/tools/?search=pdf' },
  { label: 'Image tools', href: '/tools/?search=image' },
  { label: 'Calculators', href: '/tools/?search=calculator' },
  { label: 'Converters', href: '/tools/?search=converter' },
]

export function NotFoundContent() {
  return (
    <main className="relative overflow-hidden">
      {/* soft background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#3b82f6]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#1e40af]/10 blur-3xl" />
      </div>

      <div className="relative container mx-auto max-w-4xl px-4 py-16 sm:py-20">
        {/* Hero */}
        <div className="text-center">
          <p className="bg-gradient-to-r from-[#3b82f6] to-[#1e40af] bg-clip-text text-7xl font-extrabold tracking-tight text-transparent sm:text-8xl">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
            Try searching for a tool below, or head back home.
          </p>
        </div>

        {/* Search — plain form, works without JS */}
        <form
          action="/tools/"
          method="get"
          role="search"
          className="mx-auto mt-8 flex max-w-md items-center gap-2"
        >
          <div className="relative flex-1">
            <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="search"
              placeholder="Search for a tool…"
              aria-label="Search for a tool"
              className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-[#3b82f6] px-4 text-sm font-medium text-white transition-colors hover:bg-[#2563eb]"
          >
            Search
          </button>
        </form>

        {/* Primary CTAs */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#3b82f6] px-6 text-sm font-medium text-white transition-colors hover:bg-[#2563eb] sm:w-auto"
          >
            <Home aria-hidden className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/tools/"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-input bg-background px-6 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground sm:w-auto"
          >
            <Wrench aria-hidden className="h-4 w-4" />
            Browse all tools
          </Link>
        </div>

        {/* Quick searches */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {quickSearches.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {q.label}
            </Link>
          ))}
        </div>

        {/* Popular tools */}
        <section className="mt-14" aria-labelledby="popular-tools-heading">
          <h2 id="popular-tools-heading" className="text-center text-lg font-semibold">
            Popular tools
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {popularTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-[#3b82f6]/40 hover:shadow-md"
              >
                <span className="text-xl leading-none" aria-hidden>
                  {tool.emoji}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium group-hover:text-[#3b82f6]">
                  {tool.name}
                </span>
                <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </section>

        {/* Help row */}
        <section className="mt-12 rounded-2xl border border-border bg-muted/30 p-6">
          <h2 className="text-center text-base font-semibold">Still stuck?</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link
              href="/blog/"
              className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-background"
            >
              <FileText aria-hidden className="h-5 w-5 text-[#3b82f6]" />
              <span className="text-sm">
                <span className="block font-medium">Read the blog</span>
                <span className="block text-xs text-muted-foreground">Guides &amp; how-tos</span>
              </span>
            </Link>
            <Link
              href="/help/"
              className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-background"
            >
              <LifeBuoy aria-hidden className="h-5 w-5 text-[#3b82f6]" />
              <span className="text-sm">
                <span className="block font-medium">Help center</span>
                <span className="block text-xs text-muted-foreground">Common questions</span>
              </span>
            </Link>
            <Link
              href="/contact/"
              className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-background"
            >
              <Mail aria-hidden className="h-5 w-5 text-[#3b82f6]" />
              <span className="text-sm">
                <span className="block font-medium">Contact us</span>
                <span className="block text-xs text-muted-foreground">We&apos;ll help out</span>
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
