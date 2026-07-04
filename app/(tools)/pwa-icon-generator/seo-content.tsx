/**
 * Server-only SEO content for this tool page.
 * No "use client" - all markup is server-rendered so view-source and crawlers see full HTML.
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
  FileJson,
  Smartphone,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function PWAIconGeneratorSEOContent() {
  const tool = getToolBySlug("pwa-icon-generator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const pwaSizes = [
    { purpose: "Required (PWA minimum)", size: "192 × 192 px" },
    { purpose: "Required (PWA minimum)", size: "512 × 512 px" },
    { purpose: "Android home screen", size: "144 × 144 px" },
    { purpose: "Small tile / notification", size: "96 × 96 px" },
    { purpose: "Apple touch icon (iOS)", size: "180 × 180 px" },
    { purpose: "Maskable (safe zone)", size: "512 × 512 px with 10% padding" },
  ];

  const featureChecklist = [
    { feature: "Generate full PWA icon set", value: "Yes", note: "All common sizes used by manifests and browsers." },
    { feature: "Generate manifest.json", value: "Yes", note: "Ready-to-paste icons array, name, colours, display mode." },
    { feature: "Maskable icon support", value: "Yes", note: "Safe-zone output for Android adaptive icons." },
    { feature: "Apple touch icon", value: "Yes", note: "180 × 180 PNG for iOS home screen." },
    { feature: "Download as ZIP", value: "Yes", note: "Icons plus manifest.json in one download." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Uploading a non-square source",
      body: "PWA icons are square. Crop or pad the source before upload or the generator will fit it into a square.",
    },
    {
      title: "Skipping the maskable icon",
      body: "Android adaptive icons crop the outer edges. Without a maskable variant, parts of your icon may be cut off.",
    },
    {
      title: "Forgetting the manifest link",
      body: "Icons alone don’t install the PWA. Link the generated manifest in your HTML with <link rel=\"manifest\" href=\"/manifest.json\">.",
    },
    {
      title: "Colour mismatch with the splash screen",
      body: "Set the same background_color in the manifest as your icon background so the launch screen feels cohesive.",
    },
  ];

  return (
    <article
      className="mx-auto max-w-7xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      {/* Intro (H1) */}
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            PWA Icon Generator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online PWA icon generator for Progressive Web Apps. Upload one source image
            and export every required icon plus a ready-to-use manifest.json - no signup, no
            install.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this PWA icon generator to produce the full icon set a Progressive Web App
              needs - 192, 512, maskable variants, Apple touch icon, and smaller sizes - all
              from a single square image. The tool also writes a matching{" "}
              <code className="bg-muted rounded px-1.5 py-0.5 text-xs">manifest.json</code>.
            </p>
            <p>
              Drop your PNG or JPG, pick app name and theme colours, and download a ZIP you can
              drop into your <code className="bg-muted rounded px-1.5 py-0.5 text-xs">public/</code>{" "}
              folder. Works with Next.js, Vite, plain HTML, or any framework that serves a
              manifest and icons.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="PWA icon generator - upload a square image, export every size plus manifest.json"
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
          currentToolSlug="pwa-icon-generator"
          title="Similar Tools You Might Like"
          description="Related icon and image utilities."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to generate PWA icons"
          lead="Four steps to a shippable icon set."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Prepare source</h3>
            <p className="text-sm text-muted-foreground">
              Square image, 512 × 512 px or larger. Solid background recommended.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop the PNG or JPG into the tool. A preview confirms the design.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Set manifest fields</h3>
            <p className="text-sm text-muted-foreground">
              App name, short name, theme and background colours.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Download ZIP</h3>
            <p className="text-sm text-muted-foreground">
              Icons plus <code>manifest.json</code>, ready to drop into your project.
            </p>
          </Card>
        </div>
      </section>

      {/* PWA sizes */}
      <section className="space-y-6" id="sizes">
        <SectionHeader
          eyebrow="Sizes"
          icon={Smartphone}
          title="Which PWA icon sizes you need"
          lead="The essentials plus the ones that polish the install experience."
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
                  {pwaSizes.map((s, i) => (
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
        <p className="text-sm text-muted-foreground">
          192 × 192 and 512 × 512 are the two sizes a PWA manifest{" "}
          <strong className="text-foreground">must</strong> include. The rest improve behaviour
          on specific devices.
        </p>
      </section>

      {/* Manifest example */}
      <section className="space-y-4" id="manifest">
        <SectionHeader
          eyebrow="Manifest"
          icon={FileJson}
          title="What the manifest.json looks like"
          lead="The icons array the tool generates for you."
        />
        <Card className="p-5">
          <pre className="text-xs sm:text-sm bg-muted/60 rounded-md p-4 overflow-x-auto whitespace-pre">{`{
  "name": "Your App Name",
  "short_name": "YourApp",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-maskable-512.png", "sizes": "512x512",
      "type": "image/png", "purpose": "maskable" }
  ]
}`}</pre>
        </Card>
        <p className="text-sm text-muted-foreground">
          Link it from your HTML with{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
            &lt;link rel=&quot;manifest&quot; href=&quot;/manifest.json&quot;&gt;
          </code>
          .
        </p>
      </section>

      {/* Maskable explainer */}
      <section className="space-y-4" id="maskable">
        <SectionHeader
          icon={Globe}
          title="What is a maskable icon?"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Android adaptive icons apply a shape mask (circle, squircle, rounded square) to the
            outer area of the icon. Without a maskable variant, parts of your design can get
            cropped on Android home screens.
          </p>
          <p>
            A maskable icon keeps the important content in the{" "}
            <strong className="text-foreground">safe zone</strong> - the inner ~80% - and uses
            the outer 10% on each side for background fill. The generator outputs a 512 × 512
            maskable PNG with this safe zone already accounted for.
          </p>
        </div>
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
              A factual summary of what the PWA icon generator does.
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

      {/* Related */}
      <section className="space-y-4" id="related-usage">
        <SectionHeader title="PWA icons vs app icons vs favicons" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Use the <strong className="text-foreground">PWA icon generator</strong> for a
            Progressive Web App that installs to the home screen.
          </p>
          <p>
            Use the{" "}
            <Link
              href="/app-icon-generator"
              className="underline underline-offset-4 text-foreground"
            >
              app icon generator
            </Link>{" "}
            for a native iOS / Android / desktop app build.
          </p>
          <p>
            Use the{" "}
            <Link
              href="/favicon-generator"
              className="underline underline-offset-4 text-foreground"
            >
              favicon generator
            </Link>{" "}
            when you only need the browser tab icon.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getPWAIconGeneratorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to ship your PWA icons?</h2>
          <p className="text-muted-foreground">
            Upload a source image, set manifest fields, and download a ZIP with every icon and a
            working manifest.
          </p>
          <ScrollToTopButton>Start Generating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getPWAIconGeneratorFAQs() {
  return [
    {
      question: "Is the PWA icon generator free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "Which PWA icon sizes are required?",
      answer:
        "A PWA manifest must include at least 192 × 192 and 512 × 512 PNG icons. Adding a 512 × 512 maskable variant and a 180 × 180 Apple touch icon improves behaviour on Android and iOS.",
    },
    {
      question: "What is a maskable icon?",
      answer:
        "It’s an icon with a safe-zone design so Android can apply its adaptive shape (circle, squircle, rounded square) without cropping important content.",
    },
    {
      question: "Does the tool generate manifest.json?",
      answer:
        "Yes. It outputs a ready-to-paste manifest.json with the icons array, app name, short name, theme colour, background colour, and display mode.",
    },
    {
      question: "Where do I put the downloaded files?",
      answer:
        "Drop the icons and manifest.json into your public / root folder, then link the manifest from HTML with <link rel=\"manifest\" href=\"/manifest.json\">.",
    },
    {
      question: "Does the tool upload my source image to a server?",
      answer:
        "Generation runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("pwa-icon-generator", getPWAIconGeneratorFAQs);
