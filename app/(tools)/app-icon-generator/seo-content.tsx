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
  Smartphone,
  Monitor,
  ListChecks,
  Lightbulb,
  MessagesSquare,
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

export function AppIconGeneratorSEOContent() {
  const tool = getToolBySlug("app-icon-generator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const iosSizes = [
    { purpose: "iPhone app", size: "60 × 60 pt (@2x, @3x)" },
    { purpose: "iPad app", size: "76 × 76 pt (@2x)" },
    { purpose: "iPad Pro app", size: "83.5 × 83.5 pt (@2x)" },
    { purpose: "App Store", size: "1024 × 1024 px" },
    { purpose: "Spotlight search", size: "40 × 40 pt (@2x, @3x)" },
    { purpose: "Settings", size: "29 × 29 pt (@2x, @3x)" },
  ];

  const androidSizes = [
    { purpose: "mdpi", size: "48 × 48 px" },
    { purpose: "hdpi", size: "72 × 72 px" },
    { purpose: "xhdpi", size: "96 × 96 px" },
    { purpose: "xxhdpi", size: "144 × 144 px" },
    { purpose: "xxxhdpi", size: "192 × 192 px" },
    { purpose: "Google Play listing", size: "512 × 512 px" },
  ];

  const featureChecklist = [
    { feature: "Generate iOS icon set", value: "Yes", note: "All iPhone/iPad sizes required by Xcode." },
    { feature: "Generate Android icon set", value: "Yes", note: "mdpi through xxxhdpi plus Play Store." },
    { feature: "Windows / macOS / Linux icons", value: "Yes", note: "Common sizes used by desktop app builds." },
    { feature: "Web app icons", value: "Yes", note: "Favicon and manifest-ready sizes." },
    { feature: "Upload source image", value: "Yes", note: "Start from a 1024+ px square design." },
    { feature: "Download as ZIP", value: "Yes", note: "All sizes exported together, named per platform." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Using a small source image",
      body: "Upload a design at 1024 × 1024 px minimum. Smaller sources look blurry at the largest sizes.",
    },
    {
      title: "Leaving transparent backgrounds",
      body: "iOS expects a solid background. Transparent pixels can show the system chrome through the icon.",
    },
    {
      title: "Including text in the icon",
      body: "Text becomes unreadable at 48 px. Use a symbol or monogram that works at every size.",
    },
    {
      title: "Not rounding corners yourself",
      body: "iOS and most launchers mask icons automatically. Don’t pre-round - ship a full square design.",
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
            App Icon Generator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online app icon generator for iOS, Android, Windows, macOS, Linux, and the
            web. Upload one high-resolution image and get every size your app needs - no signup,
            no install.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this app icon generator to produce a complete icon set from a single source
              image. The tool outputs iPhone, iPad, App Store, Android mdpi–xxxhdpi, Play Store,
              Windows, macOS, Linux, and web-app sizes - all named correctly for each platform.
            </p>
            <p>
              Start with a 1024 × 1024 PNG or JPG and download a ZIP that you can drop into Xcode,
              Android Studio, your desktop build, or a web manifest. Ideal for launch-day
              submissions and rapid icon updates during development.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="App icon generator - upload one square image and export every platform size"
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
          currentToolSlug="app-icon-generator"
          title="Similar Tools You Might Like"
          description="Related icon and image utilities."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to generate an app icon set"
          lead="Four steps from source to shippable ZIP."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Prepare a source</h3>
            <p className="text-sm text-muted-foreground">
              Square image, 1024 × 1024 or larger. Solid background, no text.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop your PNG or JPG into the tool. A preview appears.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Select platforms</h3>
            <p className="text-sm text-muted-foreground">
              Choose iOS, Android, Windows, macOS, Linux, Web - or all.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Download ZIP</h3>
            <p className="text-sm text-muted-foreground">
              Icons arrive named for each platform, ready to drop into your project.
            </p>
          </Card>
        </div>
      </section>

      {/* iOS sizes */}
      <section className="space-y-6" id="ios-sizes">
        <SectionHeader
          eyebrow="iOS"
          icon={Smartphone}
          title="iOS app icon sizes"
          lead="Every size Xcode and the App Store expect."
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
                  {iosSizes.map((s) => (
                    <tr key={s.purpose} className="border-b last:border-0 hover:bg-muted/50">
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

      {/* Android sizes */}
      <section className="space-y-6" id="android-sizes">
        <SectionHeader
          eyebrow="Android"
          icon={Smartphone}
          title="Android app icon sizes"
          lead="Density buckets from mdpi to xxxhdpi plus Play Store."
        />
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Bucket</th>
                    <th className="text-left p-3 font-medium">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {androidSizes.map((s) => (
                    <tr key={s.purpose} className="border-b last:border-0 hover:bg-muted/50">
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

      {/* Desktop + web */}
      <section className="space-y-4" id="desktop-web">
        <SectionHeader
          eyebrow="Desktop & web"
          icon={Monitor}
          title="Also covered: Windows, macOS, Linux, web"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            The generator includes{" "}
            <strong className="text-foreground">.ico</strong> files for Windows apps and
            favicons, common <strong className="text-foreground">.icns</strong> sizes for macOS,
            standard PNG sizes for Linux desktops, and 192 / 512 PNGs for web-app manifests.
          </p>
          <p>
            If you only need a favicon or a PWA icon set, try the dedicated{" "}
            <Link
              href="/favicon-generator"
              className="underline underline-offset-4 text-foreground"
            >
              favicon generator
            </Link>{" "}
            or{" "}
            <Link
              href="/pwa-icon-generator"
              className="underline underline-offset-4 text-foreground"
            >
              PWA icon generator
            </Link>
            .
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
              A factual summary of what the app icon generator does.
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
        <SectionHeader
          icon={Package}
          title="What the ZIP contains"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Each platform is organized in its own folder with correct file names - for example,{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">ios/Icon-60@3x.png</code>,{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">android/mipmap-xxxhdpi/ic_launcher.png</code>,{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">web/icon-512.png</code>. You
            can drop them into your project without renaming.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getAppIconGeneratorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to generate your icon set?</h2>
          <p className="text-muted-foreground">
            Upload a 1024 × 1024 design, pick your platforms, and download the full icon set in
            one click.
          </p>
          <ScrollToTopButton>Start Generating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getAppIconGeneratorFAQs() {
  return [
    {
      question: "Is the app icon generator free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "What source image size do I need?",
      answer:
        "Start with a square image at 1024 × 1024 px or larger. Smaller sources look blurry on high-resolution targets like App Store artwork or xxxhdpi.",
    },
    {
      question: "Which platforms are included?",
      answer:
        "iOS (iPhone, iPad, App Store), Android (mdpi through xxxhdpi plus Play Store), Windows, macOS, Linux, and web-app icons.",
    },
    {
      question: "Should I round the corners myself?",
      answer:
        "No. iOS and most launchers mask the icon automatically. Ship a full square design and let the platform apply its shape.",
    },
    {
      question: "Can my icon have a transparent background?",
      answer:
        "For Android and web it’s fine. iOS expects a solid background - transparent pixels can look off, so use a coloured fill.",
    },
    {
      question: "Does the tool upload my file to a server?",
      answer:
        "Generation runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("app-icon-generator", getAppIconGeneratorFAQs);
