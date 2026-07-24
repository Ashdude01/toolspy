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
  BookOpen,
  CheckCircle,
  Lightbulb,
  ListChecks,
  MessagesSquare,
  Rocket,
  Sigma,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function EbookConverterSEOContent() {
  const tool = getToolBySlug("ebook-converter");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const commonConversions = [
    "EPUB → PDF (sharing and printing)",
    "EPUB → MOBI (older Kindle workflows)",
    "MOBI → EPUB (non-Kindle readers)",
    "DOCX → EPUB/PDF (export drafts)",
  ];

  const useCases = [
    {
      title: "Device compatibility",
      body: "Convert a file into a format your e-reader or app supports.",
    },
    {
      title: "Sharing and printing",
      body: "Export to PDF when you need a stable layout for sharing or printing.",
    },
    {
      title: "Draft workflows",
      body: "Convert DOCX drafts into EPUB for quick previews on reading devices.",
    },
    {
      title: "Metadata cleanup",
      body: "Update title/author/cover where the converter supports it, then re-export.",
    },
  ];

  const pitfalls = [
    {
      title: "Layout changes between formats",
      body: "EPUB is reflowable; PDF is fixed layout. Expect differences in pagination and spacing after conversion.",
    },
    {
      title: "Fonts and styling",
      body: "Some fonts or advanced styling may not carry over cleanly, especially across older formats.",
    },
    {
      title: "DRM-protected books",
      body: "DRM-protected files typically can’t be converted without authorization. Only convert files you have the right to process.",
    },
    {
      title: "Sensitive content",
      body: "E-book conversion may require processing your file to produce output. Avoid uploading sensitive files unless you trust the workflow for this tool.",
    },
  ];

  const featureChecklist = [
    { feature: "Common e-book formats", value: "Yes", note: "EPUB, MOBI, PDF, DOCX (varies by input/output)." },
    { feature: "Basic compatibility conversions", value: "Yes", note: "Convert for device/app support." },
    { feature: "Metadata/cover options", value: "Depends", note: "Varies by input/output and tool options." },
    { feature: "Signup required", value: "No", note: "No account needed." },
  ];

  return (
    <article
      className="mx-auto max-w-7xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            E-book Converter
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Convert e-books between common formats like EPUB, MOBI, PDF, and DOCX. Useful for device
            compatibility, sharing, and draft previews.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              E-book formats differ in how they handle layout, fonts, and compatibility. This tool
              helps you switch formats when a device or app can’t open the file you have.
            </p>
            <p>
              Converting fonts for web projects? Try the{" "}
              <Link href="/font-converter" className="underline underline-offset-4 text-foreground">
                font converter
              </Link>
              .
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="E-book converter - convert EPUB, MOBI, PDF, DOCX"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="ebook-converter"
          title="Similar Tools You Might Like"
          description="Other converters and document tools."
        />
      </nav>

      <section className="space-y-6" id="common-conversions">
        <SectionHeader
          eyebrow="Examples"
          icon={BookOpen}
          title="Common conversions"
          lead="A few typical format switches people make."
        />
        <Card className="p-5">
          <ul className="space-y-2 text-muted-foreground">
            {commonConversions.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="mt-1 text-foreground">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to convert an e-book"
          lead="Upload, choose output format, then download."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload your file</h3>
            <p className="text-sm text-muted-foreground">
              EPUB, MOBI, PDF, and other supported inputs.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Choose output format</h3>
            <p className="text-sm text-muted-foreground">
              Pick the format your device/app supports.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Download and test</h3>
            <p className="text-sm text-muted-foreground">
              Open the output on your target device to confirm layout.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-6" id="use-cases">
        <SectionHeader eyebrow="Use cases" icon={Sigma} title="Common uses" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {useCases.map((x) => (
            <Card key={x.title} className="p-5">
              <h3 className="font-semibold mb-1">{x.title}</h3>
              <p className="text-sm text-muted-foreground">{x.body}</p>
            </Card>
          ))}
        </div>
      </section>

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

      <section className="space-y-6" id="features">
        <SectionHeader eyebrow="Overview" icon={ListChecks} title="What this tool supports" />
        <Card>
          <CardHeader>
            <CardTitle>Feature checklist</CardTitle>
            <CardDescription>A factual summary of what the converter does.</CardDescription>
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
                          {row.value === "Yes" && <CheckCircle className="h-4 w-4 text-green-500" />}
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

      <FAQ faqs={getEbookConverterFAQs()} />

      <section className="space-y-6" id="reviews">
        <SectionHeader eyebrow="Community" icon={MessagesSquare} title="User reviews" />
        {ratingSummary ? (
          <p className="text-center text-muted-foreground">
            Rated{" "}
            <span className="font-semibold text-foreground">{ratingSummary.ratingValue}/5</span>{" "}
            based on{" "}
            <span className="font-semibold text-foreground">{ratingSummary.reviewCount}</span>{" "}
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
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{r.reviewBody}</p>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Need a different e-book format?</h2>
          <p className="text-muted-foreground">
            Convert your file and test the output on your target device.
          </p>
          <ScrollToTopButton>Convert E-book →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getEbookConverterFAQs() {
  return [
    {
      question: "Will the layout look different after conversion?",
      answer:
        "Possibly. EPUB is reflowable and PDF is fixed layout, so pagination and spacing can change between formats.",
    },
    {
      question: "Can I convert DRM-protected e-books?",
      answer:
        "Typically no. Only convert files you have the rights and authorization to process.",
    },
    {
      question: "Which formats are supported?",
      answer:
        "Supported formats depend on the selected input/output. The tool shows available options based on your file.",
    },
    {
      question: "Does the tool store my file?",
      answer:
        "The tool processes your file to produce an output. Avoid uploading sensitive files unless you trust the workflow for this tool.",
    },
  ];
}

registerToolFAQ("ebook-converter", getEbookConverterFAQs);

