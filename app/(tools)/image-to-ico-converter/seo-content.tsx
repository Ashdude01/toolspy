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
  HelpCircle,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  FileImage,
  Layers,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function ImageToICOConverterSEOContent() {
  const tool = getToolBySlug("image-to-ico-converter");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const icoSizes = [
    { purpose: "Website favicon (classic)", size: "16 × 16, 32 × 32, 48 × 48" },
    { purpose: "Windows desktop shortcut", size: "32 × 32, 48 × 48, 64 × 64" },
    { purpose: "Windows app / installer icon", size: "16, 32, 48, 64, 128, 256" },
    { purpose: "Large thumbnail view", size: "256 × 256" },
  ];

  const featureChecklist = [
    { feature: "Convert PNG to ICO", value: "Yes", note: "Most common input — lossless source." },
    { feature: "Convert JPG to ICO", value: "Yes", note: "Good for photo-based icons." },
    { feature: "Multi-size ICO", value: "Yes", note: "Bundle 16 / 32 / 48 / 64 / 128 / 256 in one file." },
    { feature: "Pick individual sizes", value: "Yes", note: "Export only the sizes you need." },
    { feature: "Preserves transparency", value: "Yes", note: "Alpha channel is kept from PNG sources." },
    { feature: "Batch convert", value: "Yes", note: "Drop many images, get each as a separate .ico." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Using a small source image",
      body: "For a multi-size ICO with a 256 × 256 layer, start with at least a 256 × 256 source. Smaller will look blurry at the top size.",
    },
    {
      title: "Not including the small sizes",
      body: "If the ICO is missing 16 and 32, Windows will scale a bigger size down and it often looks muddy. Always keep the smallest sizes.",
    },
    {
      title: "Converting a JPG with white background",
      body: "JPG can’t hold transparency. The result will keep a solid background. Use PNG if you want a transparent icon.",
    },
    {
      title: "Confusing .ico with .png",
      body: "Windows and browsers recognize .ico as a special multi-resolution format. Simply renaming a .png to .ico doesn’t work the same way — convert it properly.",
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
            Image to ICO Converter
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online image to ICO converter. Turn PNG or JPG into a proper .ico file for
            Windows apps, installers, and website favicons — no signup, no install.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this image to ICO converter to build a real multi-resolution{" "}
              <code className="bg-muted rounded px-1.5 py-0.5 text-xs">.ico</code> file from a
              single PNG or JPG. Bundle all common sizes (16, 32, 48, 64, 128, 256) into one icon
              so Windows, Explorer, and browsers can pick the best fit automatically.
            </p>
            <p>
              Transparency is preserved from PNG sources, batch conversion is supported, and you
              can pick only the sizes you need. Drop your image, click convert, and get a clean
              ICO — ideal for desktop apps, Windows shortcuts, and classic favicons.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Image to ICO converter — upload a PNG or JPG and export a multi-size .ico file"
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
          currentToolSlug="image-to-ico-converter"
          title="Similar Tools You Might Like"
          description="Related image converters and icon utilities."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to convert an image to ICO"
          lead="Three steps to a Windows-ready icon."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop a PNG or JPG. For best results, use a 256 × 256 square image.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Pick sizes</h3>
            <p className="text-sm text-muted-foreground">
              Choose which sizes go into the ICO — or include all common ones.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save the .ico. Use it as a favicon, Windows shortcut, or app icon.
            </p>
          </Card>
        </div>
      </section>

      {/* What is ICO */}
      <section className="space-y-4" id="what-is-ico">
        <SectionHeader
          eyebrow="Quick background"
          icon={HelpCircle}
          title="What is an .ico file?"
          lead="A container that holds the same icon at several sizes."
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            An <code className="bg-muted rounded px-1.5 py-0.5 text-xs">.ico</code> file stores
            multiple versions of the same icon at different resolutions — 16 × 16, 32 × 32,
            48 × 48, and so on — in a single file. Windows and browsers pick whichever size fits
            best for where the icon is being displayed.
          </p>
          <p>
            That&apos;s why converting a PNG is not the same as renaming it to{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">.ico</code>: a real ICO file
            can contain many sizes at once, which PNG cannot.
          </p>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-6" id="sizes">
        <SectionHeader
          eyebrow="Sizes"
          icon={FileImage}
          title="Which ICO sizes to include"
          lead="Pick a preset based on where the icon will be used."
        />
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Use</th>
                    <th className="text-left p-3 font-medium">Recommended sizes</th>
                  </tr>
                </thead>
                <tbody>
                  {icoSizes.map((s, i) => (
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

      {/* Batch */}
      <section className="space-y-4" id="batch">
        <SectionHeader
          eyebrow="Volume"
          icon={Layers}
          title="Batch convert many images to ICO"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Need ICO versions of a whole folder of icons? Drop multiple PNGs or JPGs in
            together — each image becomes its own multi-size{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">.ico</code> with the same
            chosen size bundle, and everything arrives as a ZIP.
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
              A factual summary of what the image to ICO converter does.
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
        <SectionHeader title="ICO vs favicon pack vs app icon set" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Use the <strong className="text-foreground">image to ICO converter</strong> when you
            only need a single multi-size{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">.ico</code> file — for
            example a Windows app icon or a classic favicon.
          </p>
          <p>
            For a full favicon pack (ICO + PNGs + Apple touch icon + HTML snippet), use the{" "}
            <Link
              href="/favicon-generator"
              className="underline underline-offset-4 text-foreground"
            >
              favicon generator
            </Link>
            .
          </p>
          <p>
            For a full mobile / desktop app icon set, use the{" "}
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
      <FAQ faqs={getImageToICOConverterFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to create your ICO?</h2>
          <p className="text-muted-foreground">
            Upload a PNG or JPG, pick the sizes, and download a ready-to-use{" "}
            <code>.ico</code> file in seconds.
          </p>
          <ScrollToTopButton>Start Converting →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getImageToICOConverterFAQs() {
  return [
    {
      question: "Is the image to ICO converter free to use?",
      answer: "Yes. It’s free and runs in your browser — no signup, no install.",
    },
    {
      question: "Can I just rename a PNG to .ico?",
      answer:
        "No. A real .ico file is a multi-resolution container — it stores several sizes of the same icon in one file. Renaming a PNG produces a file that many Windows apps and browsers will not treat as a proper icon.",
    },
    {
      question: "Which sizes should the ICO include?",
      answer:
        "For a website favicon, include 16 × 16, 32 × 32, and 48 × 48. For a Windows app or installer icon, also include 64, 128, and 256 so Explorer has a sharp version at every zoom level.",
    },
    {
      question: "Does the converter keep transparency?",
      answer:
        "Yes — when the source has an alpha channel (PNG). JPG sources don’t support transparency, so the background is kept as-is.",
    },
    {
      question: "Can I convert many images to ICO at once?",
      answer:
        "Yes. Upload multiple images, pick the size bundle once, and download each as its own .ico in a single ZIP.",
    },
    {
      question: "Does the tool upload my files to a server?",
      answer:
        "Conversion runs in your browser. Files are processed locally and not stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("image-to-ico-converter", getImageToICOConverterFAQs);
