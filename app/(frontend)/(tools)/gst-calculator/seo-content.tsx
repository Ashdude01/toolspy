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
  Percent,
  Receipt,
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

export function GSTCalculatorSEOContent() {
  const tool = getToolBySlug("gst-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const gstRates = ["0%", "5%", "12%", "18%", "28%"];

  const modes = [
    {
      title: "GST exclusive (add GST)",
      body: "You have a base price and want the total after GST. The tool calculates tax and grand total.",
    },
    {
      title: "GST inclusive (remove GST)",
      body: "You have a total that already includes GST and want the base amount and tax component.",
    },
  ];

  const pitfalls = [
    {
      title: "Confusing inclusive vs exclusive",
      body: "If your price already includes GST, use inclusive mode. If GST needs to be added on top, use exclusive mode.",
    },
    {
      title: "Wrong GST rate",
      body: "Rates depend on product/service classification. Use the applicable rate for your invoice or quote.",
    },
    {
      title: "Rounding expectations",
      body: "Invoices may round paise differently depending on accounting settings. Treat this as a calculator for planning and quick checks.",
    },
    {
      title: "Place of supply rules",
      body: "Whether CGST/SGST or IGST applies depends on intra-state vs inter-state supply. Use the splitter tool when you need that breakdown.",
    },
  ];

  const featureChecklist = [
    { feature: "Inclusive and exclusive modes", value: "Yes", note: "Add GST or extract it from a total." },
    { feature: "Common India GST rates", value: "Yes", note: `Includes ${gstRates.join(", ")}.` },
    { feature: "Instant calculation", value: "Yes", note: "Results update from your inputs." },
    { feature: "Signup required", value: "No", note: "No account needed." },
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
            GST Calculator (India)
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Add GST to a base price (exclusive) or extract GST from a total (inclusive). Supports
            common India GST rates ({gstRates.join(", ")}). Useful for invoices, quotes, and quick
            checks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This GST calculator helps you quickly split an amount into base + tax, or add tax on
              top of a base amount. Pick the correct mode, choose the GST rate, and you’ll get the
              numbers you can copy into an invoice or quote.
            </p>
            <p>
              Need to reverse a total that already includes GST? Try the{" "}
              <Link
                href="/reverse-gst-calculator"
                className="underline underline-offset-4 text-foreground"
              >
                reverse GST calculator
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
                alt="GST calculator - inclusive and exclusive modes with GST rate selection"
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
          currentToolSlug="gst-calculator"
          title="Similar Tools You Might Like"
          description="Other GST tools for breakdowns and compliance checks."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to calculate GST"
          lead="Pick the mode, rate, then enter your amount."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Choose inclusive/exclusive</h3>
            <p className="text-sm text-muted-foreground">
              Exclusive adds GST on top. Inclusive extracts GST from the total.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Select GST rate</h3>
            <p className="text-sm text-muted-foreground">
              Common slabs: {gstRates.join(", ")}.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Enter amount</h3>
            <p className="text-sm text-muted-foreground">
              Copy the base, GST amount, and total into your invoice or quote.
            </p>
          </Card>
        </div>
      </section>

      {/* Modes */}
      <section className="space-y-6" id="modes">
        <SectionHeader eyebrow="Modes" icon={Receipt} title="Inclusive vs exclusive GST" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modes.map((m) => (
            <Card key={m.title} className="p-5">
              <h3 className="font-semibold mb-1">{m.title}</h3>
              <p className="text-sm text-muted-foreground">{m.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Formula */}
      <section className="space-y-6" id="formula">
        <SectionHeader
          eyebrow="Math"
          icon={Percent}
          title="GST formulas"
          lead="How the base and tax are computed."
        />
        <Card className="p-5">
          <div className="space-y-3 text-muted-foreground">
            <p>
              If the base amount is \(B\) and GST rate is \(r\) (for example 18% = 0.18):
            </p>
            <p className="font-mono text-xs sm:text-sm text-foreground">
              Tax = B × r, Total = B × (1 + r)
            </p>
            <p>
              If the total amount \(T\) already includes GST:
            </p>
            <p className="font-mono text-xs sm:text-sm text-foreground">
              Base = T / (1 + r), Tax = T − Base
            </p>
          </div>
        </Card>
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
        <SectionHeader eyebrow="Overview" icon={ListChecks} title="What this tool supports" />
        <Card>
          <CardHeader>
            <CardTitle>Feature checklist</CardTitle>
            <CardDescription>A factual summary of what the GST calculator does.</CardDescription>
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

      {/* Related */}
      <section className="space-y-4" id="related-usage">
        <SectionHeader title="Related GST tools" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Already have a GST-inclusive total?{" "}
            <Link
              href="/reverse-gst-calculator"
              className="underline underline-offset-4 text-foreground"
            >
              Reverse GST calculator
            </Link>
            .
          </p>
          <p>
            Need CGST/SGST vs IGST breakup?{" "}
            <Link
              href="/cgst-sgst-igst-splitter"
              className="underline underline-offset-4 text-foreground"
            >
              CGST/SGST/IGST splitter
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getGSTCalculatorFAQs()} />

      {/* User reviews */}
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

      {/* Final CTA */}
      <section>
        <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Ready to calculate GST?</h2>
          <p className="text-muted-foreground">
            Pick inclusive or exclusive mode and get the base + tax split instantly.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getGSTCalculatorFAQs() {
  return [
    {
      question: "What is the difference between GST inclusive and exclusive?",
      answer:
        "Exclusive means GST is added on top of the base price. Inclusive means the total already includes GST, and the calculator extracts the base and tax components.",
    },
    {
      question: "Which GST rates does the calculator support?",
      answer: "It supports the common India GST slabs: 0%, 5%, 12%, 18%, and 28%.",
    },
    {
      question: "Is this calculation suitable for official filing?",
      answer:
        "It’s a quick calculator for invoices and planning. For filing and compliance, follow official GST rules and your accounting setup.",
    },
    {
      question: "Does the tool store my invoice amounts?",
      answer: "No. The calculation runs in your browser and the values aren’t stored on our servers.",
    },
  ];
}

registerToolFAQ("gst-calculator", getGSTCalculatorFAQs);

