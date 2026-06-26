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
  Lightbulb,
  ListChecks,
  MessagesSquare,
  Rocket,
  Sigma,
  Type,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function FontConverterSEOContent() {
  const tool = getToolBySlug("font-converter");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const commonTargets = ["WOFF", "WOFF2", "TTF", "OTF"];

  const useCases = [
    {
      title: "Web font packaging",
      body: "Convert TTF/OTF into WOFF/WOFF2 for faster web delivery.",
    },
    {
      title: "Cross-tool compatibility",
      body: "Some design or build tools prefer one format. Convert to match the required input.",
    },
    {
      title: "Legacy support",
      body: "Generate multiple outputs when you need to support older environments.",
    },
    {
      title: "Quick testing",
      body: "Try a conversion to confirm a font renders as expected before committing to a build pipeline.",
    },
  ];

  const pitfalls = [
    {
      title: "Licensing restrictions",
      body: "Some fonts can’t be redistributed or transformed under their license. Only convert fonts you’re allowed to use and convert.",
    },
    {
      title: "Subsetting vs full fonts",
      body: "A full font can be large. For web performance, consider subsetting (if supported) to include only needed glyphs.",
    },
    {
      title: "Rendering differences",
      body: "Hinting and rendering can vary across platforms. Always test on your target browsers/devices.",
    },
    {
      title: "Sensitive uploads",
      body: "Font conversion may require processing your file to produce output. Avoid uploading proprietary files unless you trust the workflow for this tool.",
    },
  ];

  const featureChecklist = [
    { feature: "Convert common font formats", value: "Yes", note: `Targets: ${commonTargets.join(", ")} (varies by input).` },
    { feature: "Preview before download", value: "Depends", note: "Varies by tool options." },
    { feature: "Multiple outputs", value: "Depends", note: "Depending on selected formats." },
    { feature: "Signup required", value: "No", note: "No account needed." },
  ];

  return (
    <article
      className="mx-auto max-w-5xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            Font Converter
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Convert fonts between common formats like TTF, OTF, WOFF, and WOFF2. Useful for web
            delivery and tool compatibility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              When a tool or website needs a specific font format, a simple conversion is often
              enough. This converter helps you switch formats so you can use the same font across
              different workflows.
            </p>
            <p>
              Converting Markdown docs instead? Try{" "}
              <Link
                href="/markdown-to-docs-converter"
                className="underline underline-offset-4 text-foreground"
              >
                Markdown to Docs converter
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
                alt="Font converter - convert TTF/OTF to WOFF/WOFF2 and more"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="font-converter"
          title="Similar Tools You Might Like"
          description="Other conversion tools for files and documents."
        />
      </nav>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to convert a font"
          lead="Upload, choose output format, then download."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload the font</h3>
            <p className="text-sm text-muted-foreground">
              Provide TTF/OTF/WOFF/WOFF2 depending on what you have.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Choose output</h3>
            <p className="text-sm text-muted-foreground">
              For web, WOFF2 is typically the best starting point.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Download and test</h3>
            <p className="text-sm text-muted-foreground">
              Test rendering in your target browsers/devices.
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

      <FAQ faqs={getFontConverterFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Need a different font format?</h2>
          <p className="text-muted-foreground">
            Convert your font and test it in your target environment.
          </p>
          <ScrollToTopButton>Convert Font →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getFontConverterFAQs() {
  return [
    {
      question: "Which format should I use for websites?",
      answer:
        "WOFF2 is generally the best starting point for modern browsers. You may also provide WOFF for broader compatibility if needed.",
    },
    {
      question: "Can I convert any font I find online?",
      answer:
        "Only convert fonts you’re licensed to use and transform. Many fonts have redistribution and modification restrictions.",
    },
    {
      question: "Will converting change how the font looks?",
      answer:
        "It can vary slightly due to hinting and rendering differences. Always test in your target browsers/devices.",
    },
    {
      question: "Does the tool store my font file?",
      answer:
        "The tool processes your file to produce an output. Avoid uploading proprietary fonts unless you trust the workflow for this tool.",
    },
  ];
}

registerToolFAQ("font-converter", getFontConverterFAQs);

