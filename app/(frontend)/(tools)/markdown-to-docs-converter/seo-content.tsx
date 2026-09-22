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
  FileText,
  Lightbulb,
  ListChecks,
  MessagesSquare,
  Rocket,
  Sigma,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function MarkdownToDocsConverterSEOContent() {
  const tool = getToolBySlug("markdown-to-docs-converter");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const outputs = ["HTML", "PDF", "Word (DOCX)", "Plain text"];

  const useCases = [
    {
      title: "Convert README to PDF",
      body: "Export a Markdown doc into a PDF for sharing with teams that prefer fixed layout.",
    },
    {
      title: "Docs to Word",
      body: "Generate a DOCX version so collaborators can comment in Word-based workflows.",
    },
    {
      title: "Markdown to HTML",
      body: "Produce HTML for websites or documentation portals without writing template code.",
    },
    {
      title: "Clean plain text",
      body: "Strip formatting to get a clean text version for tools that can’t parse Markdown.",
    },
  ];

  const pitfalls = [
    {
      title: "Markdown dialect differences",
      body: "Some Markdown features (tables, extensions) vary. If something renders oddly, simplify the syntax and try again.",
    },
    {
      title: "Fonts and styling in PDF/DOCX",
      body: "Export formats may not match your site’s theme. Treat the output as a document, not a pixel-perfect design.",
    },
    {
      title: "Images and links",
      body: "Relative image paths may not resolve outside your repo. Use absolute URLs if you need portable exports.",
    },
    {
      title: "Sensitive content",
      body: "Document conversion may require processing your content to generate an output file. Avoid converting sensitive docs unless you trust the workflow for this tool.",
    },
  ];

  const featureChecklist = [
    { feature: "Markdown input", value: "Yes", note: "Paste or upload Markdown content (depending on tool UI)." },
    { feature: "Multiple output formats", value: "Yes", note: `Common outputs: ${outputs.join(", ")}.` },
    { feature: "Fast export", value: "Yes", note: "Useful for quick shareable documents." },
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
            Markdown to Docs Converter
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Convert Markdown into shareable documents like HTML, PDF, or Word (DOCX). Useful for
            READMEs, documentation, notes, and lightweight reports.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Markdown is perfect in a repo, but collaborators often need PDFs or DOCX files. This
              converter helps you export your Markdown quickly into formats that are easier to share,
              print, or review.
            </p>
            <p>
              Need to convert PDFs instead? See{" "}
              <Link href="/pdf-converter" className="underline underline-offset-4 text-foreground">
                PDF converter
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
                alt="Markdown to docs converter - export Markdown to HTML, PDF or Word"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to convert Markdown"
          lead="Paste Markdown, choose output format, then download."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Add your Markdown</h3>
            <p className="text-sm text-muted-foreground">
              Paste your README or doc content.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Choose output</h3>
            <p className="text-sm text-muted-foreground">
              Pick HTML, PDF, Word, or plain text.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Download</h3>
            <p className="text-sm text-muted-foreground">
              Open the export and check images/links.
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

      <FAQ faqs={getMarkdownToDocsConverterFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Need a shareable doc?</h2>
          <p className="text-muted-foreground">
            Convert your Markdown into PDF, DOCX or HTML in a few clicks.
          </p>
          <ScrollToTopButton>Convert Markdown →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getMarkdownToDocsConverterFAQs() {
  return [
    {
      question: "Why do my images not show up in the export?",
      answer:
        "Relative image paths may not resolve outside a repo. Use absolute image URLs if you need exports that work anywhere.",
    },
    {
      question: "Which output format should I choose?",
      answer:
        "Use PDF for sharing/printing, DOCX for Word-based reviews, and HTML for websites or doc portals.",
    },
    {
      question: "Does conversion support all Markdown features?",
      answer:
        "Markdown dialects vary. If something renders oddly, simplify the syntax or remove extensions and try again.",
    },
    {
      question: "Does the tool store my content?",
      answer:
        "The tool processes your content to produce an output. Avoid converting sensitive docs unless you trust the workflow for this tool.",
    },
  ];
}

registerToolFAQ("markdown-to-docs-converter", getMarkdownToDocsConverterFAQs);

