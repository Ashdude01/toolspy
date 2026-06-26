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

export function TaxCalculatorSEOContent() {
  const tool = getToolBySlug("tax-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const whatYouGet = [
    {
      title: "Tax estimate",
      body: "A rough estimate based on the inputs you provide. Use it for quick planning and comparisons.",
    },
    {
      title: "Take-home ballpark",
      body: "A quick sense of what remains after an estimated tax amount (not a payslip generator).",
    },
    {
      title: "Scenario testing",
      body: "Change income and assumptions to see directionally how your estimate changes.",
    },
    {
      title: "Fast and simple",
      body: "No account required - type numbers and see results immediately.",
    },
  ];

  const pitfalls = [
    {
      title: "Country/state rules vary",
      body: "Tax brackets, deductions, surcharges, and credits depend on where you live. Treat this as a planning estimate.",
    },
    {
      title: "Gross vs net confusion",
      body: "Make sure you know whether you’re entering gross income, taxable income, or a salary figure before tax.",
    },
    {
      title: "Ignoring deductions and credits",
      body: "Deductions, exemptions, and credits can materially change the final tax bill (not always captured in simple estimates).",
    },
    {
      title: "Withholding isn’t the same as tax",
      body: "What’s withheld from a paycheck can differ from what you owe after filing.",
    },
  ];

  const featureChecklist = [
    { feature: "Quick tax estimate", value: "Yes", note: "Designed for rough planning." },
    { feature: "Take-home ballpark", value: "Yes", note: "Useful for quick comparisons." },
    { feature: "Real-time updates", value: "Yes", note: "See changes as you adjust inputs." },
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
            Tax Calculator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Estimate income tax and take-home pay for a quick planning view. Enter your numbers,
            compare scenarios, and treat the result as a ballpark - always verify with your local
            rules or a professional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This tax calculator is meant for quick estimation: “If I earn X, what might my tax
              look like?” It’s useful when comparing job offers, budgeting, or understanding how
              changes in income affect a rough tax number.
            </p>
            <p>
              Tax systems vary widely. If you need an official number for filing, use the relevant
              government portal or tax software for your jurisdiction.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Tax calculator - estimate tax and take-home pay from income"
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
          currentToolSlug="tax-calculator"
          title="Similar Tools You Might Like"
          description="Other calculators that pair well with tax planning."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to use the tax calculator"
          lead="A quick estimate in under a minute."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Enter income</h3>
            <p className="text-sm text-muted-foreground">
              Use the income number the calculator expects (typically gross). Keep units consistent.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Add any options</h3>
            <p className="text-sm text-muted-foreground">
              If the tool supports filing status or similar options, select the one that matches you.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Compare scenarios</h3>
            <p className="text-sm text-muted-foreground">
              Try multiple incomes to understand how the estimate changes.
            </p>
          </Card>
        </div>
      </section>

      {/* What you get */}
      <section className="space-y-6" id="what-you-get">
        <SectionHeader
          eyebrow="Output"
          icon={Receipt}
          title="What this tax estimate is good for"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whatYouGet.map((x) => (
            <Card key={x.title} className="p-5">
              <h3 className="font-semibold mb-1">{x.title}</h3>
              <p className="text-sm text-muted-foreground">{x.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Notes */}
      <section className="space-y-6" id="notes">
        <SectionHeader
          eyebrow="Notes"
          icon={Percent}
          title="Important notes"
          lead="How to interpret the number."
        />
        <Card className="p-5">
          <div className="space-y-3 text-muted-foreground">
            <p>
              “Tax” can mean different things: income tax, payroll taxes, local taxes, surcharges,
              or other deductions. This tool aims to provide a useful estimate, not a filing-ready
              calculation.
            </p>
            <p>
              For salary conversions (hourly ↔ yearly), try the{" "}
              <Link
                href="/salary-calculator"
                className="underline underline-offset-4 text-foreground"
              >
                salary calculator
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
            <CardDescription>A factual summary of what the tax calculator does.</CardDescription>
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
            Salary conversions (hourly ↔ yearly)?{" "}
            <Link
              href="/salary-calculator"
              className="underline underline-offset-4 text-foreground"
            >
              Salary calculator
            </Link>
            .
          </p>
          <p>
            Percent math for rates and deltas?{" "}
            <Link
              href="/percentage-calculator"
              className="underline underline-offset-4 text-foreground"
            >
              Percentage calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getTaxCalculatorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to estimate?</h2>
          <p className="text-muted-foreground">
            Enter your income, review the estimate, then try a second scenario.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getTaxCalculatorFAQs() {
  return [
    {
      question: "Is the tax calculator free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup required.",
    },
    {
      question: "Is this an exact tax calculation?",
      answer:
        "No. It’s a planning estimate. Rules vary by country/state, and deductions, credits, and surcharges can change the final number.",
    },
    {
      question: "Does the tool store my income data?",
      answer: "No. Calculations run in your browser and aren’t stored on our servers.",
    },
    {
      question: "Why is my withholding different from this estimate?",
      answer:
        "Withholding is what’s taken from paychecks; your actual tax owed is settled when you file. They can differ based on deductions, credits, and filing status.",
    },
    {
      question: "What should I use for filing taxes?",
      answer:
        "Use the official government portal or trusted tax software for your jurisdiction if you need filing-ready numbers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("tax-calculator", getTaxCalculatorFAQs);

