/**
 * Server-only SEO content for this tool page.
 * No "use client" — all markup is server-rendered so view-source and crawlers see full HTML.
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";
import {
  CheckCircle,
  Rocket,
  Zap,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  Gauge,
  Globe,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function ImageOptimizerSEOContent() {
  const tool = getToolBySlug("image-optimizer");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const whereItHelps = [
    {
      title: "Website speed",
      description: "Smaller images mean faster page loads and better Core Web Vitals (LCP in particular).",
    },
    {
      title: "Email deliverability",
      description: "Heavy images bloat emails and can hit inbox size limits. Optimizing first keeps newsletters lean.",
    },
    {
      title: "Mobile data",
      description: "Visitors on mobile data notice every megabyte. Optimized images make the site feel snappier.",
    },
    {
      title: "SEO signals",
      description: "Pages that load faster tend to rank and convert better. Image weight is usually the biggest win.",
    },
  ];

  const sizeTargets = [
    { label: "Hero / banner image", target: "≤ 200 KB", note: "Full-width images above the fold." },
    { label: "Blog post image", target: "≤ 150 KB", note: "Inline images inside content." },
    { label: "Thumbnails / avatars", target: "≤ 50 KB", note: "Small UI elements repeated on a page." },
    { label: "Product image (e-commerce)", target: "≤ 250 KB", note: "Needs detail without stalling the page." },
  ];

  const featureChecklist = [
    { feature: "Optimize for the web", value: "Yes", note: "Tuned settings that protect visible quality." },
    { feature: "Batch optimization", value: "Yes", note: "Drop many images, optimize together, download a ZIP." },
    { feature: "Format suggestions", value: "Yes", note: "Convert to WebP or AVIF for extra savings." },
    { feature: "Resize before optimizing", value: "Yes", note: "Serve images at the size they actually display." },
    { feature: "Strip unused metadata", value: "Yes", note: "Remove EXIF that pages don’t need." },
    { feature: "Keep original format", value: "Yes", note: "If you need to stay on JPG or PNG, you can." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Shipping a 4000 px photo into a 400 px slot",
      body: "Even after optimization, the browser has to download pixels it will never show. Resize first.",
    },
    {
      title: "Optimizing once, uploading a fresh original later",
      body: "Optimize every new asset before it goes live. A single heavy hero image can undo the rest of the page.",
    },
    {
      title: "Using PNG for large photos",
      body: "PNG is lossless and big. For photos, JPG or WebP optimize much better at the same visible quality.",
    },
    {
      title: "Ignoring mobile",
      body: "Test the page on throttled mobile data. Any image over ~300 KB is a noticeable hit there.",
    },
  ];

  return (
    <article
      className="mx-auto max-w-5xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      {/* Intro (H1) */}
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            Image Optimizer
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online image optimizer for faster-loading images on your website, blog, or
            store. Reduce image file size without changing what visitors see — works in the
            browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this image optimizer to optimize a photo for web, reduce image file size, and
              get faster-loading images across JPG, PNG, and WebP. Drop one file or a whole
              batch — each image is re-encoded with settings tuned to keep quality visible and
              file size low.
            </p>
            <p>
              Handy before publishing a blog post, shipping a landing page, or sending a
              newsletter. Optionally resize at the same time, convert to WebP or AVIF for extra
              savings, or strip unused metadata — everything runs locally in your browser.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Image optimizer — batch upload with one-click web-optimized output"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      {/* Related Tools */}
      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="image-optimizer"
          title="Similar Tools You Might Like"
          description="Other image utilities that pair well with web optimization."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to optimize an image"
          lead="Four steps, no setup."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop one or many images — JPG, PNG, or WebP.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Pick output</h3>
            <p className="text-sm text-muted-foreground">
              Keep original, or switch to WebP / AVIF for smaller files.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Resize (optional)</h3>
            <p className="text-sm text-muted-foreground">
              Match the display size to cut bytes the page doesn’t need.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Download</h3>
            <p className="text-sm text-muted-foreground">
              Grab files one by one, or download the batch as a ZIP.
            </p>
          </Card>
        </div>
      </section>

      {/* Why optimize */}
      <section className="space-y-6" id="why">
        <SectionHeader
          eyebrow="Why it matters"
          icon={Zap}
          title="Where optimized images make a real difference"
          lead="Real outcomes when images are tuned for the web."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whereItHelps.map((w) => (
            <Card key={w.title} className="p-5">
              <h3 className="font-semibold mb-1">{w.title}</h3>
              <p className="text-sm text-muted-foreground">{w.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Target sizes */}
      <section className="space-y-6" id="targets">
        <SectionHeader
          eyebrow="Benchmarks"
          icon={Gauge}
          title="Target file sizes for common web images"
          lead="Rough upper bounds that keep pages fast."
        />
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Use</th>
                    <th className="text-left p-3 font-medium">Target</th>
                    <th className="text-left p-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeTargets.map((s) => (
                    <tr key={s.label} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{s.label}</td>
                      <td className="p-3 text-muted-foreground font-mono text-xs sm:text-sm">
                        {s.target}
                      </td>
                      <td className="p-3 text-muted-foreground">{s.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Common pitfalls */}
      <section className="space-y-6" id="pitfalls">
        <SectionHeader eyebrow="Heads up" icon={Lightbulb} title="Common pitfalls" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pitfalls.map((p) => (
            <Card key={p.title} className="p-5">
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature checklist */}
      <section className="space-y-6" id="features">
        <SectionHeader
          eyebrow="Overview"
          icon={ListChecks}
          title="What this tool supports"
        />
        <Card>
          <CardHeader>
            <CardTitle>Feature checklist</CardTitle>
            <CardDescription>
              A factual summary of what the image optimizer does.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Feature</th>
                    <th className="text-left p-3 font-medium">Supported</th>
                    <th className="text-left p-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {featureChecklist.map((row, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{row.feature}</td>
                      <td className="p-3">
                        <div className="inline-flex items-center gap-2">
                          <span>{row.value}</span>
                          {row.value === "Yes" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Related tools */}
      <section className="space-y-4" id="related-usage">
        <SectionHeader
          icon={Globe}
          title="Optimizer vs compressor vs resizer"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Use the <strong className="text-foreground">image optimizer</strong> to get
            web-ready, faster-loading images with sensible defaults.
          </p>
          <p>
            Use the{" "}
            <Link href="/image-compressor" className="underline underline-offset-4 text-foreground">
              image compressor
            </Link>{" "}
            when you want more manual control (preset, quality slider, target KB).
          </p>
          <p>
            Use the{" "}
            <Link href="/image-resizer" className="underline underline-offset-4 text-foreground">
              image resizer
            </Link>{" "}
            when the pixel dimensions need to change before or after optimizing.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getImageOptimizerFAQs()} />

      {/* User reviews */}
      <section className="space-y-6" id="reviews">
        <SectionHeader eyebrow="Community" icon={MessagesSquare} title="User reviews" />
        {ratingSummary ? (
          <p className="text-center text-muted-foreground">
            Rated{" "}
            <span className="font-semibold text-foreground">
              {ratingSummary.ratingValue}/5
            </span>{" "}
            based on{" "}
            <span className="font-semibold text-foreground">
              {ratingSummary.reviewCount}
            </span>{" "}
            review(s).
          </p>
        ) : (
          <p className="text-center text-muted-foreground">
            No reviews yet. If you used the tool, you can share feedback on our{" "}
            <Link className="underline underline-offset-4" href="/feedback">
              feedback page
            </Link>
            .
          </p>
        )}

        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.slice(0, 6).map((r, idx) => (
              <Card key={idx} className="p-5">
                <div className="space-y-1">
                  <p className="font-semibold">{r.headline}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.authorName} • {r.datePublished} • {r.ratingValue}/5
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {r.reviewBody}
                </p>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Final CTA */}
      <section>
        <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Ready to ship faster images?</h2>
          <p className="text-muted-foreground">
            Upload your images, pick an output, and download lighter versions ready for the web.
          </p>
          <ScrollToTopButton>Start Optimizing →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getImageOptimizerFAQs() {
  return [
    {
      question: "Is the image optimizer free to use?",
      answer: "Yes. It’s free and runs in your browser — no signup, no install.",
    },
    {
      question: "What does ‘optimize for web’ actually do?",
      answer:
        "It re-encodes the image with settings that keep quality visible while reducing file size: smart quality level, optional modern format (WebP / AVIF), and removal of metadata pages don’t need.",
    },
    {
      question: "Should I convert images to WebP or AVIF?",
      answer:
        "WebP gives ~25–35% smaller files than JPG at similar quality and is widely supported. AVIF compresses even better but takes longer to encode. Either is a strong choice for modern sites.",
    },
    {
      question: "How small should my web images be?",
      answer:
        "Aim for ≤ 200 KB for hero images, ≤ 150 KB for in-content photos, and ≤ 50 KB for thumbnails. Always resize to the display size before optimizing for the biggest wins.",
    },
    {
      question: "Can I optimize many images at once?",
      answer:
        "Yes. Upload multiple files, optimize the batch, and download everything in a single ZIP.",
    },
    {
      question: "Does the tool upload my images to a server?",
      answer:
        "Optimization runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("image-optimizer", getImageOptimizerFAQs);
