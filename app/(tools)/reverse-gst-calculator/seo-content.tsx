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

export function ReverseGSTCalculatorSEOContent() {
  const tool = getToolBySlug("reverse-gst-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const gstRates = ["0%", "5%", "12%", "18%", "28%"];

  const pitfalls = [
    {
      title: "Assuming the total always includes GST",
      body: "Some totals include other charges too (shipping, discounts, cess). Reverse GST assumes your total is GST-inclusive for the chosen rate.",
    },
    {
      title: "Using the wrong rate",
      body: "GST rate depends on classification. If you reverse with the wrong rate, base and tax will be wrong.",
    },
    {
      title: "Rounding differences",
      body: "Invoices may round values per line item. This calculator gives a clean mathematical split for quick checks.",
    },
    {
      title: "CGST/SGST vs IGST split",
      body: "Reverse GST gives base and total GST. If you need the CGST/SGST or IGST breakup, use the splitter tool.",
    },
  ];

  const featureChecklist = [
    { feature: "Extract base amount from GST-inclusive total", value: "Yes", note: "Returns base and GST component." },
    { feature: "Common India GST rates", value: "Yes", note: `Includes ${gstRates.join(", ")}.` },
    { feature: "Instant calculation", value: "Yes", note: "Useful for quick invoice checks." },
    { feature: "Signup required", value: "No", note: "No account needed." },
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
            Reverse GST Calculator (India)
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Got a total amount that includes GST? Reverse GST calculates the base amount and GST
            component for common India GST rates ({gstRates.join(", ")}). Handy for invoices and
            quick audits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Reverse GST is used when you only know the final (GST-inclusive) price and want to
              know what the base was. This is common when checking invoices, matching totals, or
              back-calculating taxable value from an inclusive quote.
            </p>
            <p>
              If you need to add GST to a base price instead, use the{" "}
              <Link href="/gst-calculator" className="underline underline-offset-4 text-foreground">
                GST calculator
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
                alt="Reverse GST calculator - split a GST-inclusive total into base and tax"
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
          currentToolSlug="reverse-gst-calculator"
          title="Similar Tools You Might Like"
          description="Other GST tools for calculations and breakdowns."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to reverse-calculate GST from a total"
          lead="Enter total + rate and read base and tax."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Enter the total amount</h3>
            <p className="text-sm text-muted-foreground">
              Use the final amount that already includes GST for the chosen slab.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Pick GST rate</h3>
            <p className="text-sm text-muted-foreground">
              Choose from {gstRates.join(", ")}.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Copy the split</h3>
            <p className="text-sm text-muted-foreground">
              Use base value and GST component in your invoice checks.
            </p>
          </Card>
        </div>
      </section>

      {/* Formula */}
      <section className="space-y-6" id="formula">
        <SectionHeader
          eyebrow="Math"
          icon={Percent}
          title="Reverse GST formula"
          lead="How base and tax are extracted from a total."
        />
        <Card className="p-5">
          <div className="space-y-3 text-muted-foreground">
            <p>
              If total amount is \(T\) and GST rate is \(r\) (for example 18% = 0.18):
            </p>
            <p className="font-mono text-xs sm:text-sm text-foreground">
              Base = T / (1 + r), GST = T − Base
            </p>
            <p>
              If you need CGST/SGST or IGST breakup from the GST amount, use the{" "}
              <Link
                href="/cgst-sgst-igst-splitter"
                className="underline underline-offset-4 text-foreground"
              >
                CGST/SGST/IGST splitter
              </Link>
              .
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
            <CardDescription>A factual summary of what the reverse GST calculator does.</CardDescription>
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

      {/* FAQ */}
      <FAQ faqs={getReverseGSTCalculatorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Need to split a GST-inclusive total?</h2>
          <p className="text-muted-foreground">
            Enter the total and GST slab to get the base amount and tax component instantly.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getReverseGSTCalculatorFAQs() {
  return [
    {
      question: "When should I use reverse GST?",
      answer:
        "Use reverse GST when the amount you have already includes GST and you need the base value and GST component separately.",
    },
    {
      question: "Which GST rates are supported?",
      answer: "It supports the common India GST slabs: 0%, 5%, 12%, 18%, and 28%.",
    },
    {
      question: "Does this split CGST/SGST and IGST?",
      answer:
        "This tool splits total into base and total GST. For CGST/SGST vs IGST breakup, use the CGST/SGST/IGST splitter tool.",
    },
    {
      question: "Does the tool store my amounts?",
      answer: "No. The calculation runs in your browser and values aren’t stored on our servers.",
    },
  ];
}

registerToolFAQ("reverse-gst-calculator", getReverseGSTCalculatorFAQs);

