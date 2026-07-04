/**
 * Pillar SEO content for the Image Tools category page (/tools/image-tools/).
 * Server-rendered so crawlers get the full guide in HTML.
 * Written per Google helpful-content guidelines: factual, user-first,
 * no competitor comparisons or unverifiable claims.
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getToolsByCategory } from "@/lib/tools-data";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { ToolCard } from "@/components/tools/tool-card";
import NextImage from "next/image";
import Link from "next/link";

const categoryFaqs = () => [
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. All image tools process files inside your browser using client-side code. Your photos never leave your device - important for ID photos and private pictures.",
  },
  {
    question: "How do I compress an image to an exact size like 20KB?",
    answer:
      "Resize the image to the required dimensions first, then use the Image Compressor's KB-target option set to 20KB. Resizing first preserves much more clarity.",
  },
  {
    question: "Which format is smallest without losing quality?",
    answer:
      "For photos, WebP is typically 25-35% smaller than JPG at the same visual quality, and AVIF can be up to 50% smaller. For strict form uploads, stick to JPG since portals often whitelist it.",
  },
  {
    question: "Can I process multiple images at once?",
    answer:
      "Yes - the compressor and converter support batch processing (up to 100 files) and hand you a ZIP of the results.",
  },
  {
    question: "Is there any cost or signup?",
    answer:
      "No. Every image tool is free with no registration, no usage limits, and no watermarks.",
  },
];

export function ImageToolsSEOContent() {
  const tools = getToolsByCategory()["image-tools"] || [];
  // Poster image dynamically fetched from tools-data (flagship tool of this category)
  const posterImage =
    tools.find((t) => t.slug === "image-compressor")?.posterImage ||
    tools.find((t) => t.posterImage)?.posterImage;

  registerToolFAQ("image-tools", categoryFaqs);

  return (
    <article className="mx-auto max-w-7xl space-y-14 mt-16 mb-20 px-4 text-base sm:text-[17px] leading-relaxed">
      {/* Intro */}
      <section className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          Free Image Tools - Compress, Convert, Resize & Optimize in Your Browser
        </h2>
        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Every upload form has rules: a job portal wants a photo under 50KB, a marketplace wants JPG only, a website wants WebP for speed. Toolspy&apos;s {tools.length} image tools handle the whole pipeline - compress to an exact KB target, convert between 15+ formats (including HEIC, WebP and AVIF), resize to precise dimensions, crop, and generate app icons or favicons.
            </p>
            <p>
              Everything runs client-side in your browser: your photos are never uploaded to a server, which matters when the image is an ID photo, a signature, or a private picture. No signup, no watermarks, batch support up to 100 files.
            </p>
          </div>
          {posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={posterImage}
                width={1600}
                height={900}
                alt="Free image tools - compress to exact KB, convert HEIC WebP AVIF, resize and optimize images"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      {/* Tools grid (global card design) */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Tools in this category</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} showCategoryBadge={false} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Which image format should you use?</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Format quick reference</CardTitle>
            <CardDescription>A practical guide to choosing an output format before you convert or compress.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Format</th>
                    <th className="text-left p-3 font-medium">Best For</th>
                    <th className="text-left p-3 font-medium">Transparency</th>
                    <th className="text-left p-3 font-medium">Typical Size</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["JPG/JPEG", "Photos, form uploads, email", "No", "Small (lossy)"],
                    ["PNG", "Screenshots, logos, graphics with text", "Yes", "Large (lossless)"],
                    ["WebP", "Websites - photos and graphics", "Yes", "25-35% smaller than JPG"],
                    ["AVIF", "Modern websites, maximum savings", "Yes", "Up to 50% smaller than JPG"],
                    ["HEIC", "iPhone camera default (convert before uploading)", "Yes", "Small, poor compatibility"],
                    ["ICO", "Favicons and Windows icons", "Yes", "Tiny, fixed sizes"]
                  ].map((row, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{row[0]}</td>
                      <td className="p-3">{row[1]}</td>
                      <td className="p-3">{row[2]}</td>
                      <td className="p-3 text-muted-foreground">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Use cases */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">What people use these tools for</h3>
        <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Government & exam form uploads</h4>
              <p className="text-sm text-muted-foreground">Compress a photo or signature to exactly 20KB or 50KB after resizing to the required dimensions - the two-step method keeps the image sharp within strict portal limits.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Faster websites</h4>
              <p className="text-sm text-muted-foreground">Convert hero images and product photos to WebP or AVIF and compress them - image weight is usually the single biggest factor in page load time.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">iPhone photo compatibility</h4>
              <p className="text-sm text-muted-foreground">Convert HEIC files to JPG or PDF so they open everywhere - Windows, Android, and upload forms included.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">App and web icons</h4>
              <p className="text-sm text-muted-foreground">Generate the complete icon sets for iOS, Android, PWA, and favicons from a single source image, correctly sized and packaged.</p>
            </Card>
        </div>
      </section>

      {/* How to */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">How to get the best results (3 steps)</h3>
        <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">1. Resize first</h4>
              <p className="text-sm text-muted-foreground">Reduce dimensions to what you actually need - dimension reduction removes far more KB than quality reduction.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">2. Pick the right format</h4>
              <p className="text-sm text-muted-foreground">Photos: JPG or WebP. Graphics with text or transparency: PNG or WebP. Web performance: WebP/AVIF.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">3. Compress to a target</h4>
              <p className="text-sm text-muted-foreground">Use a KB target when a portal enforces a limit, or a quality preset when you just want a lighter file. Verify the result full-screen.</p>
            </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold tracking-tight">Deep-dive guides</h3>
        <ul className="space-y-3 text-muted-foreground list-disc pl-6">
          <li>
            <Link href="/blog/compress-image-to-20kb-govt-forms/" className="underline underline-offset-4 text-foreground">
              How to compress an image to 20KB for government forms
            </Link>{" "}
            - size-limit tables and the resize-then-compress method.
          </li>
          <li>
            <Link href="/blog/jfif-to-jpg-why-windows-saves-jfif/" className="underline underline-offset-4 text-foreground">
              JFIF to JPG: why Windows saves photos as JFIF
            </Link>{" "}
            - what the format is and three ways to fix it.
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Frequently Asked Questions</h3>
        <FAQ faqs={categoryFaqs()} />
      </section>

      {/* Note */}
      <section className="text-sm text-muted-foreground border rounded-lg p-4">
        <p>
          All image processing happens locally in your browser. Results depend on the source image; always verify quality before submitting official documents.{" "}
          <Link href="/privacy/" className="underline underline-offset-4">
            Privacy Policy
          </Link>{" "}
          ·{" "}
          <Link href="/disclaimer/" className="underline underline-offset-4">
            Disclaimer
          </Link>
        </p>
      </section>
    </article>
  );
}
