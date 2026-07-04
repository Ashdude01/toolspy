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
  Percent,
  ListChecks,
  Lightbulb,
  MessagesSquare,
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

export function PercentageCalculatorSEOContent() {
  const tool = getToolBySlug("percentage-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const modes = [
    {
      name: "What is X% of Y?",
      example: "15% of 200 = 30",
      formula: "X / 100 × Y",
    },
    {
      name: "X is what % of Y?",
      example: "45 of 200 = 22.5%",
      formula: "X / Y × 100",
    },
    {
      name: "Percent increase / decrease",
      example: "From 200 → 250 = +25%",
      formula: "(New − Old) / Old × 100",
    },
    {
      name: "X% change from Y",
      example: "200 up by 15% = 230",
      formula: "Y × (1 + X / 100)",
    },
  ];

  const useCases = [
    { title: "Discounts & deals", body: "Find the saved amount and final price from a % off." },
    { title: "Tax & tips", body: "Add GST / VAT / service charge to a base amount." },
    { title: "Grades & scores", body: "Work out marks as a percentage of total." },
    { title: "Finance & growth", body: "Simple percent increases or decreases over time." },
  ];

  const featureChecklist = [
    { feature: "‘What is X% of Y’", value: "Yes", note: "Classic percent calculation." },
    { feature: "‘X is what % of Y’", value: "Yes", note: "Inverse - find the percentage." },
    { feature: "Percent increase / decrease", value: "Yes", note: "Compare old vs new value." },
    { feature: "Add / subtract a percentage", value: "Yes", note: "Markups, discounts, tax." },
    { feature: "Decimal precision control", value: "Yes", note: "Round to the digits you need." },
    { feature: "Instant live results", value: "Yes", note: "Output updates as you type." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Confusing ‘of’ with ‘off’",
      body: "20% of 100 = 20; 20% off 100 = 80. Pick the right mode before you trust the result.",
    },
    {
      title: "Applying multiple percentages",
      body: "Two 10% discounts aren’t 20% off. They’re 19% (0.9 × 0.9). Combine carefully.",
    },
    {
      title: "Rounding mid-calculation",
      body: "Round only the final value. Rounding each step inflates small errors.",
    },
    {
      title: "Negative percent change pitfalls",
      body: "A 50% drop needs a 100% rise to recover. Percent changes aren’t symmetric.",
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
            Percentage Calculator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online percentage calculator - find X% of Y, what % one number is of
            another, and percent increase or decrease. Runs in your browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this percentage calculator for everyday maths: how much is 18% of 2500,
              percent discount on a price, percent marks on a test, or percent change from last
              month. Pick the mode and type - results update live.
            </p>
            <p>
              Supports increases and decreases, add / subtract percentages for tax and markup,
              and decimal-precision control for financial work. Handy for shopping, school,
              finance, and quick sanity checks.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Percentage calculator - mode selector with instant results as you type"
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
          currentToolSlug="percentage-calculator"
          title="Similar Tools You Might Like"
          description="Other calculators that pair well with percent maths."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to calculate a percentage"
          lead="Three steps and you have your answer."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Pick a mode</h3>
            <p className="text-sm text-muted-foreground">
              X% of Y, X is what % of Y, or percent change.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Enter values</h3>
            <p className="text-sm text-muted-foreground">
              Type the numbers - decimals and negatives allowed.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Read &amp; copy</h3>
            <p className="text-sm text-muted-foreground">
              Result updates live. Copy with one click.
            </p>
          </Card>
        </div>
      </section>

      {/* Modes */}
      <section className="space-y-6" id="modes">
        <SectionHeader
          eyebrow="Modes"
          icon={Percent}
          title="Percentage modes with formulas"
          lead="The exact question each mode answers."
        />
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Mode</th>
                    <th className="text-left p-3 font-medium">Example</th>
                    <th className="text-left p-3 font-medium">Formula</th>
                  </tr>
                </thead>
                <tbody>
                  {modes.map((m) => (
                    <tr key={m.name} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{m.name}</td>
                      <td className="p-3 text-muted-foreground">{m.example}</td>
                      <td className="p-3 text-muted-foreground font-mono text-xs">
                        {m.formula}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Use cases */}
      <section className="space-y-6" id="use-cases">
        <SectionHeader
          eyebrow="When it helps"
          icon={Sigma}
          title="Common everyday uses"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {useCases.map((u) => (
            <Card key={u.title} className="p-5">
              <h3 className="font-semibold mb-1">{u.title}</h3>
              <p className="text-sm text-muted-foreground">{u.body}</p>
            </Card>
          ))}
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
              A factual summary of what the percentage calculator does.
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
        <SectionHeader title="Related calculators" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Working with taxes?{" "}
            <Link href="/tax-calculator" className="underline underline-offset-4 text-foreground">
              Tax calculator
            </Link>
            .
          </p>
          <p>
            Working with EMIs?{" "}
            <Link href="/loan-calculator" className="underline underline-offset-4 text-foreground">
              Loan calculator
            </Link>
            .
          </p>
          <p>
            GST breakdown?{" "}
            <Link href="/gst-calculator" className="underline underline-offset-4 text-foreground">
              GST calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getPercentageCalculatorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to crunch percentages?</h2>
          <p className="text-muted-foreground">
            Pick a mode, type the numbers, and read the answer live.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getPercentageCalculatorFAQs() {
  return [
    {
      question: "Is the percentage calculator free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "How do I find X% of a number?",
      answer:
        "Pick the ‘What is X% of Y’ mode, type the percentage and the number, and read the result. For example, 18% of 2500 = 450.",
    },
    {
      question: "How do I calculate percent increase or decrease?",
      answer:
        "Use the change mode. Enter the old and new values - the tool returns the percent change: (new − old) / old × 100.",
    },
    {
      question: "Can I add tax or GST using percentages?",
      answer:
        "Yes. Use the ‘X% change from Y’ mode to increase a base amount by a percentage - ideal for adding tax, service charges, or markups.",
    },
    {
      question: "Are there rounding issues?",
      answer:
        "Only round the final value. Rounding mid-calculation introduces small errors. The tool keeps full precision internally and displays the rounded result.",
    },
    {
      question: "Does the tool store my numbers?",
      answer:
        "No. Calculations run in your browser and aren’t stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("percentage-calculator", getPercentageCalculatorFAQs);
