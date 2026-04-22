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
  Globe,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  Code2,
  Package,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function FaviconGeneratorSEOContent() {
  const tool = getToolBySlug("favicon-generator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const faviconSizes = [
    { purpose: "Classic favicon (.ico)", size: "16 × 16, 32 × 32, 48 × 48 (multi-res)" },
    { purpose: "Modern browsers PNG", size: "16 × 16, 32 × 32 px" },
    { purpose: "Apple touch icon (iOS)", size: "180 × 180 px" },
    { purpose: "Android Chrome", size: "192 × 192, 512 × 512 px" },
    { purpose: "Windows tile", size: "144 × 144 px" },
    { purpose: "Safari pinned tab (SVG)", size: "Monochrome SVG" },
  ];

  const featureChecklist = [
    { feature: "Create favicon.ico (multi-res)", value: "Yes", note: "Bundles 16, 32, and 48 px into one file." },
    { feature: "PNG favicons (16, 32)", value: "Yes", note: "For modern browsers that prefer PNG." },
    { feature: "Apple touch icon (180)", value: "Yes", note: "Used when the site is added to the iOS home screen." },
    { feature: "Android 192 / 512", value: "Yes", note: "Used by Chrome on Android and in manifest.json." },
    { feature: "Windows tile (144)", value: "Yes", note: "For pinned sites on older Windows." },
    { feature: "HTML snippet", value: "Yes", note: "Copy-paste <link> tags for the <head>." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Using a detailed logo",
      body: "A 16 × 16 favicon can only show a few pixels of detail. Simplify to a symbol, monogram, or single letterform.",
    },
    {
      title: "Only shipping favicon.ico",
      body: "Modern browsers and mobile devices need PNG and Apple touch icons too. Without them, tabs and home-screen shortcuts look wrong.",
    },
    {
      title: "Forgetting dark mode",
      body: "Browsers render the favicon on both light and dark chrome. Test your icon on both — some colours disappear against dark tabs.",
    },
    {
      title: "Not updating the cache-busting",
      body: "Browsers cache favicons aggressively. Change the filename or add a version query param when you update it.",
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
            Favicon Generator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online favicon generator for browser tabs, bookmarks, and home-screen
            shortcuts. Create a favicon for your website in every size browsers and devices
            expect — no signup, no install.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this favicon generator to turn a single image into a complete favicon pack —
              classic <code className="bg-muted rounded px-1.5 py-0.5 text-xs">favicon.ico</code>,
              modern PNG sizes, Apple touch icon, and Android Chrome icons. The tool also
              generates the HTML snippet you paste into your{" "}
              <code className="bg-muted rounded px-1.5 py-0.5 text-xs">&lt;head&gt;</code>.
            </p>
            <p>
              Upload a square PNG or JPG (512 × 512 or larger), download a ZIP, and drop the files
              into the root of your site. Works with any framework — Next.js, Astro, plain HTML,
              WordPress — and with any hosting setup.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Favicon generator — upload a square image, download a full favicon pack"
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
          currentToolSlug="favicon-generator"
          title="Similar Tools You Might Like"
          description="Related icon and image utilities."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to create a favicon"
          lead="Four steps from source image to live on your site."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Prepare a source</h3>
            <p className="text-sm text-muted-foreground">
              Square image, 512 × 512 px or larger. Keep the design simple.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop the PNG or JPG into the tool to see a live preview.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Download ZIP</h3>
            <p className="text-sm text-muted-foreground">
              Icons for every platform, plus the HTML snippet.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Paste into head</h3>
            <p className="text-sm text-muted-foreground">
              Drop files in your site root and add the snippet to <code>&lt;head&gt;</code>.
            </p>
          </Card>
        </div>
      </section>

      {/* Favicon sizes */}
      <section className="space-y-6" id="sizes">
        <SectionHeader
          eyebrow="Sizes"
          icon={Globe}
          title="Favicon sizes you should ship"
          lead="Cover classic and modern browsers plus mobile home screens."
        />
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Purpose</th>
                    <th className="text-left p-3 font-medium">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {faviconSizes.map((s, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{s.purpose}</td>
                      <td className="p-3 text-muted-foreground font-mono text-xs sm:text-sm">
                        {s.size}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* HTML snippet */}
      <section className="space-y-4" id="snippet">
        <SectionHeader
          eyebrow="HTML"
          icon={Code2}
          title="HTML snippet to paste in <head>"
          lead="Minimal tags that cover all browsers and devices."
        />
        <Card className="p-5">
          <pre className="text-xs sm:text-sm bg-muted/60 rounded-md p-4 overflow-x-auto whitespace-pre">{`<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`}</pre>
        </Card>
        <p className="text-sm text-muted-foreground">
          Put the icon files in your site&apos;s root so the paths above resolve correctly.
        </p>
      </section>

      {/* Pitfalls */}
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
              A factual summary of what the favicon generator does.
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

      {/* Output structure */}
      <section className="space-y-4" id="output">
        <SectionHeader icon={Package} title="What the ZIP contains" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            You get <code className="bg-muted rounded px-1.5 py-0.5 text-xs">favicon.ico</code>,
            PNG icons at 16 / 32 / 192 / 512, the Apple touch icon, a Windows tile, an optional{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">site.webmanifest</code>, and
            a <code className="bg-muted rounded px-1.5 py-0.5 text-xs">head-snippet.html</code>{" "}
            you can copy straight into your template.
          </p>
        </div>
      </section>

      {/* Related */}
      <section className="space-y-4" id="related-usage">
        <SectionHeader title="Favicon vs PWA icon vs app icon" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Use the <strong className="text-foreground">favicon generator</strong> for the
            browser-tab icon of a regular website.
          </p>
          <p>
            If your site is a Progressive Web App (installable, with a manifest), use the{" "}
            <Link
              href="/pwa-icon-generator"
              className="underline underline-offset-4 text-foreground"
            >
              PWA icon generator
            </Link>
            .
          </p>
          <p>
            For a native mobile or desktop app, use the{" "}
            <Link
              href="/app-icon-generator"
              className="underline underline-offset-4 text-foreground"
            >
              app icon generator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getFaviconGeneratorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to ship your favicon?</h2>
          <p className="text-muted-foreground">
            Upload a square image and download a full favicon pack — including the{" "}
            <code>&lt;head&gt;</code> snippet — in seconds.
          </p>
          <ScrollToTopButton>Start Generating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getFaviconGeneratorFAQs() {
  return [
    {
      question: "Is the favicon generator free to use?",
      answer: "Yes. It’s free and runs in your browser — no signup, no install.",
    },
    {
      question: "Which favicon sizes do I actually need?",
      answer:
        "At minimum: a multi-res favicon.ico (16, 32, 48) and an Apple touch icon at 180 × 180. For modern browsers also include 16 × 16 and 32 × 32 PNGs, and 192 / 512 PNGs for Android and manifests.",
    },
    {
      question: "What image should I upload?",
      answer:
        "A square PNG or JPG at 512 × 512 or larger. Keep the design simple — at 16 × 16, only a few pixels carry the meaning.",
    },
    {
      question: "Does the tool provide the HTML to paste in my <head>?",
      answer:
        "Yes. The download includes a ready-to-paste snippet with all the <link> tags for modern browsers and devices.",
    },
    {
      question: "My favicon didn’t update in the browser — why?",
      answer:
        "Browsers cache favicons aggressively. Hard-refresh the page (Ctrl+F5 or Cmd+Shift+R), change the filename, or add a version query (e.g. /favicon.ico?v=2) so the browser re-fetches.",
    },
    {
      question: "Does the tool upload my source image to a server?",
      answer:
        "Generation runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("favicon-generator", getFaviconGeneratorFAQs);
