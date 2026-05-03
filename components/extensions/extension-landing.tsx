import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { TestimonialsMarquee } from "@/components/extensions/testimonials-marquee";
import type { ExtensionLandingData, BrowserId } from "@/lib/extensions-data";
import {
  CheckCircle,
  Chrome,
  Download,
  ExternalLink,
  Globe,
  HelpCircle,
  ListChecks,
  MessageSquare,
  Monitor,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function browserIcon(browser: BrowserId) {
  switch (browser) {
    case "chrome":
      return <Chrome className="h-4 w-4" />;
    case "edge":
      return <Globe className="h-4 w-4" />;
    case "firefox":
      return <Globe className="h-4 w-4" />;
    case "safari":
      return <Globe className="h-4 w-4" />;
    case "opera":
      return <Globe className="h-4 w-4" />;
    default:
      return <Globe className="h-4 w-4" />;
  }
}

function Stars({ value }: { value: number }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-1" aria-label={`${full} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          className={`h-4 w-4 ${idx < full ? "text-yellow-500" : "text-muted-foreground/30"}`}
          fill={idx < full ? "currentColor" : "none"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function ExtensionLanding({ data }: { data: ExtensionLandingData }) {
  const avgRating =
    data.reviews.length > 0
      ? data.reviews.reduce((a, r) => a + r.rating, 0) / data.reviews.length
      : null;

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:py-14 space-y-16 sm:space-y-20">
      {/* Hero */}
      <section className="grid gap-6 lg:grid-cols-2 items-center">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-full">
              Browser extension
            </Badge>
            <Badge variant="outline" className="rounded-full">
              Dark & light mode friendly
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {data.name}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {data.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">
                Straightforward setup and predictable workflow
              </span>
            </div>
            {avgRating !== null && (
              <div className="flex items-center gap-2">
                <Stars value={avgRating} />
                <span className="text-sm text-muted-foreground">
                  {avgRating.toFixed(1)}/5 ({data.reviews.length} reviews)
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {data.primaryToolPath ? (
              <Link href={data.primaryToolPath}>
                <Button variant="secondary" className="gap-2">
                  Open related Toolspy tool <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            ) : null}
            <a href="#downloads">
              <Button className="gap-2">
                Download extension <Download className="h-4 w-4" />
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {data.highlights.slice(0, 4).map((h) => (
              <div key={h} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">{h}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <Image
            src={data.posterImage || "/images/main.webp"}
            width={1600}
            height={900}
            alt={`${data.name} preview`}
            className="w-full h-auto"
            priority={false}
          />
        </div>
      </section>

      {/* Downloads */}
      <section id="downloads" className="space-y-8 scroll-mt-24">
        <SectionHeader
          icon={Chrome}
          title="Download for your browser"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {data.downloads.map((d) => {
            const disabled = !d.href;
            return (
              <Card key={d.browser} className="p-4">
                <div className="flex items-center gap-2">
                  {browserIcon(d.browser)}
                  <div className="font-semibold">{d.label}</div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {disabled ? "Coming soon" : "Open download page"}
                </p>
                <div className="mt-4">
                  {disabled ? (
                    <Button variant="outline" className="w-full" disabled>
                      Download
                    </Button>
                  ) : (
                    <a href={d.href} target="_blank" rel="noreferrer">
                      <Button className="w-full gap-2">
                        Download <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsMarquee
        items={data.reviews.map((r) => ({
          name: r.author,
          content: r.body,
          rating: r.rating,
        }))}
      />

      {/* Features */}
      <section className="space-y-8" id="features">
        <SectionHeader icon={Sparkles} title="Key features" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.features.map((f) => (
            <Card key={f.title} className="p-5">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{f.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="space-y-8" id="benefits">
        <SectionHeader icon={Monitor} title="Why choose this extension" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.benefits.map((b) => (
            <Card key={b.title} className="p-5">
              <h3 className="font-semibold">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{b.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Install */}
      <section className="space-y-8" id="install">
        <SectionHeader icon={ListChecks} title="How to install" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {data.howToInstall.map((g) => (
            <Card key={g.title}>
              <CardHeader>
                <CardTitle className="text-base">{g.title}</CardTitle>
                <CardDescription>Step-by-step</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
                  {g.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Use */}
      <section className="space-y-8" id="use">
        <SectionHeader icon={Globe} title="How to use" />
        <div className="flex gap-4 w-full">
          {data.howToUse.map((g) => (
            <Card key={g.title} className="w-full">
              <CardHeader>
                <CardTitle className="text-base">{g.title}</CardTitle>
                <CardDescription>Quick workflow</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
                  {g.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Helpful content */}
      <section className="space-y-8" id="about">
        <SectionHeader
          icon={MessageSquare}
          title="What to expect (and what to avoid)"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="p-5">
            <h3 className="font-semibold">Works best when…</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Images are visible on the page in standard formats. After you scan, you can select
              thumbnails, download what you need, or move to the next step in Toolspy.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold">Common limitations</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Some pages block access, lazy-load in uncommon ways, or restrict downloads. Browser
              pages (settings, add-ons stores) also can’t be scanned by extensions.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold">Good practices</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Download only content you have permission to use. If you’re optimizing for websites,
              pick a reasonable quality setting and test on a sample image first.
            </p>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold">Recommended workflow</h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-medium text-foreground">1) Scan</p>
              <p className="mt-1">
                Run a scan on the current tab to collect image URLs and show thumbnails.
              </p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-medium text-foreground">2) Select</p>
              <p className="mt-1">
                Pick the images you want. Use bulk actions when you’re working with many items.
              </p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-medium text-foreground">3) Download or optimize</p>
              <p className="mt-1">
                Download files/ZIP, or open the selection in Toolspy to compress or convert.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section className="space-y-8" id="faq">
        <SectionHeader icon={HelpCircle} title="FAQ" />
        <FAQ
          title="Frequently asked questions"
          description="Quick answers about installation, usage, and limitations."
          faqs={data.faqs}
        />
      </section>

      {/* CTA */}
      <section className="pt-4">
        <div className="rounded-2xl border bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Ready to try it?</h2>
          <p className="text-muted-foreground">
            Install the extension for your browser and use it in your workflow today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#downloads">
              <Button className="gap-2">
                Go to downloads <Download className="h-4 w-4" />
              </Button>
            </a>
            <Link href="/feedback">
              <Button variant="outline" className="gap-2">
                Share feedback <MessageSquare className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

