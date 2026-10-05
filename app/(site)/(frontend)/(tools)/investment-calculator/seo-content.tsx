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

export function InvestmentCalculatorSEOContent() {
  const tool = getToolBySlug("investment-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const useCases = [
    {
      title: "Compound interest projection",
      body: "See how an initial amount could grow over time with a steady expected return.",
    },
    {
      title: "Monthly contribution planning",
      body: "Test how different monthly contributions change the end value over years.",
    },
    {
      title: "Goal targeting",
      body: "Roughly estimate what it takes to reach a target number by a certain date.",
    },
    {
      title: "Scenario comparison",
      body: "Try conservative vs aggressive assumptions to understand the range of outcomes.",
    },
  ];

  const pitfalls = [
    {
      title: "Confusing return with guaranteed growth",
      body: "The expected return is an assumption. Real portfolios fluctuate and may underperform for long periods.",
    },
    {
      title: "Ignoring inflation",
      body: "A nominal end value may buy less in the future. Use the retirement calculator for inflation-adjusted planning.",
    },
    {
      title: "Mixing monthly and yearly rates",
      body: "Enter return as an annual percentage. The calculator handles monthly compounding internally.",
    },
    {
      title: "Forgetting fees and taxes",
      body: "Broker fees, fund expense ratios, and taxes can reduce long-term returns and aren’t modeled here.",
    },
  ];

  const featureChecklist = [
    { feature: "Initial investment amount", value: "Yes", note: "Start with a lump sum." },
    { feature: "Monthly contributions", value: "Yes", note: "Model consistent monthly adds." },
    { feature: "Compound growth", value: "Yes", note: "Uses an annual expected return." },
    { feature: "Year-by-year view", value: "Yes", note: "Shows a simple progression over time." },
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
            Investment Calculator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A simple compound interest investment calculator. Enter an initial amount, monthly
            contribution, expected annual return, and time period to see a projected future value.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this investment calculator to explore “what if” scenarios: how much a lump sum
              might grow, how regular monthly contributions change the outcome, and how sensitive
              long-term results are to your assumed return.
            </p>
            <p>
              It’s a planning tool, not advice. Markets don’t move in straight lines, and fees and
              taxes can materially change results.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Investment calculator - inputs for initial amount, monthly contribution, return rate and time period"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to use the investment calculator"
          lead="Three inputs and you have a projection."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Enter amounts</h3>
            <p className="text-sm text-muted-foreground">
              Add your initial investment and a monthly contribution (optional).
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Set return &amp; years</h3>
            <p className="text-sm text-muted-foreground">
              Use an annual expected return and your investment time horizon.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Compare scenarios</h3>
            <p className="text-sm text-muted-foreground">
              Try a conservative return and a higher return to see the range.
            </p>
          </Card>
        </div>
      </section>

      {/* Use cases */}
      <section className="space-y-6" id="use-cases">
        <SectionHeader eyebrow="When it helps" icon={Sigma} title="Common use cases" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {useCases.map((u) => (
            <Card key={u.title} className="p-5">
              <h3 className="font-semibold mb-1">{u.title}</h3>
              <p className="text-sm text-muted-foreground">{u.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Formula */}
      <section className="space-y-6" id="formula">
        <SectionHeader
          eyebrow="Math"
          icon={Percent}
          title="Compound interest (high level)"
          lead="What the projection is doing under the hood."
        />
        <Card className="p-5">
          <div className="space-y-3 text-muted-foreground">
            <p>
              The projection compounds the initial amount and each periodic contribution over the
              time horizon using your expected annual return. Returns are applied monthly to match
              monthly contributions.
            </p>
            <p className="text-sm">
              If you’re planning for retirement income needs (inflation-adjusted), use the{" "}
              <Link
                href="/retirement-calculator"
                className="underline underline-offset-4 text-foreground"
              >
                retirement calculator
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
            <CardDescription>
              A factual summary of what the investment calculator does.
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
            Budgeting for a home purchase?{" "}
            <Link
              href="/mortgage-calculator"
              className="underline underline-offset-4 text-foreground"
            >
              Mortgage calculator
            </Link>
            .
          </p>
          <p>
            Planning retirement income needs?{" "}
            <Link
              href="/retirement-calculator"
              className="underline underline-offset-4 text-foreground"
            >
              Retirement calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getInvestmentCalculatorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to run a scenario?</h2>
          <p className="text-muted-foreground">
            Enter an amount, pick a return, and see the projection instantly.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getInvestmentCalculatorFAQs() {
  return [
    {
      question: "Is the investment calculator free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup required.",
    },
    {
      question: "Is the projected return guaranteed?",
      answer:
        "No. The return is an assumption for planning. Real investments can go up or down and may not match the projected rate.",
    },
    {
      question: "Does the calculator include fees and taxes?",
      answer:
        "No. Fees, taxes, and contributions limits vary by account type and location. Treat results as a rough projection.",
    },
    {
      question: "Does the tool store my numbers?",
      answer: "No. Calculations run in your browser and aren’t stored on our servers.",
    },
    {
      question: "Should I use this for retirement planning?",
      answer:
        "Use this for simple compound-growth scenarios. For inflation-adjusted retirement income needs, use the retirement calculator.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("investment-calculator", getInvestmentCalculatorFAQs);

