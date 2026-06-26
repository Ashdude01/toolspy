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
  PiggyBank,
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

export function RetirementCalculatorSEOContent() {
  const tool = getToolBySlug("retirement-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const assumptions = [
    {
      title: "Expected return",
      body: "Used to project how savings might grow. Over long horizons, changing this assumption even slightly can change outcomes a lot.",
    },
    {
      title: "Inflation rate",
      body: "Used to estimate how much income you may need in the future to maintain today’s purchasing power.",
    },
    {
      title: "Income replacement ratio",
      body: "A target percent of income you want to replace in retirement (commonly 70–80%). It’s a planning heuristic, not a rule.",
    },
    {
      title: "Retirement duration",
      body: "The calculator uses a simple lifespan assumption to estimate how long savings may need to support withdrawals.",
    },
  ];

  const pitfalls = [
    {
      title: "Over-optimistic returns",
      body: "Try a conservative return too. High assumed returns can hide a shortfall until late in the plan.",
    },
    {
      title: "Ignoring inflation",
      body: "Skipping inflation makes future income needs look smaller than they’ll likely be.",
    },
    {
      title: "Unrealistic contributions",
      body: "Plan with a monthly contribution you can sustain across different life stages and market conditions.",
    },
    {
      title: "Missing other income sources",
      body: "Pensions, social security, rental income, and part-time work can reduce portfolio needs (not modeled here).",
    },
  ];

  const featureChecklist = [
    {
      feature: "Inflation-adjusted income target",
      value: "Yes",
      note: "Projects income needs using your inflation input.",
    },
    {
      feature: "Monthly contributions + growth",
      value: "Yes",
      note: "Models a monthly contribution compounded over time.",
    },
    {
      feature: "Year-by-year breakdown",
      value: "Yes",
      note: "Shows a simple yearly balance progression to retirement.",
    },
    {
      feature: "Signup required",
      value: "No",
      note: "No account needed.",
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
            Retirement Calculator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Estimate retirement savings needs and project growth from current savings and monthly
            contributions. Tune expected return, inflation, and income replacement to explore
            scenarios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This retirement calculator is built for quick planning. Start with your current age
              and your target retirement age, then add income, current savings, and a monthly
              contribution. The tool projects a retirement target and a portfolio value at
              retirement.
            </p>
            <p>
              It’s not financial advice. Real outcomes depend on taxes, fees, market volatility, and
              real-life changes to income and savings.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Retirement calculator - inputs for age, savings, contribution, return and inflation with projected results"
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
          currentToolSlug="retirement-calculator"
          title="Similar Tools You Might Like"
          description="Other calculators that pair well with retirement planning."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to use the retirement calculator"
          lead="Add your numbers, then test conservative vs optimistic assumptions."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Enter ages &amp; income</h3>
            <p className="text-sm text-muted-foreground">
              Current age, target retirement age, and current annual income.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Add savings &amp; contribution</h3>
            <p className="text-sm text-muted-foreground">
              Current savings plus a monthly contribution you can maintain.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Adjust return &amp; inflation</h3>
            <p className="text-sm text-muted-foreground">
              See how projections shift when assumptions change.
            </p>
          </Card>
        </div>
      </section>

      {/* Assumptions */}
      <section className="space-y-6" id="assumptions">
        <SectionHeader
          eyebrow="Assumptions"
          icon={Sigma}
          title="Key inputs that drive the projection"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assumptions.map((a) => (
            <Card key={a.title} className="p-5">
              <h3 className="font-semibold mb-1">{a.title}</h3>
              <p className="text-sm text-muted-foreground">{a.body}</p>
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
        <SectionHeader eyebrow="Overview" icon={ListChecks} title="What this tool supports" />
        <Card>
          <CardHeader>
            <CardTitle>Feature checklist</CardTitle>
            <CardDescription>A factual summary of what the retirement calculator does.</CardDescription>
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
        <SectionHeader title="Related calculators" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Want to model simpler compound growth?{" "}
            <Link
              href="/investment-calculator"
              className="underline underline-offset-4 text-foreground"
            >
              Investment calculator
            </Link>
            .
          </p>
          <p>
            Planning a home purchase timeline too?{" "}
            <Link
              href="/mortgage-calculator"
              className="underline underline-offset-4 text-foreground"
            >
              Mortgage calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getRetirementCalculatorFAQs()} />

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
            Start with your current numbers, then try conservative vs optimistic assumptions.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getRetirementCalculatorFAQs() {
  return [
    {
      question: "Is the retirement calculator free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup required.",
    },
    {
      question: "What does the calculator estimate?",
      answer:
        "It estimates a retirement savings target and a projected portfolio value at retirement based on your inputs (age, income, savings, monthly contribution, return, and inflation).",
    },
    {
      question: "Why do return and inflation matter so much?",
      answer:
        "They control how fast savings may grow and how quickly the cost of living increases. Over decades, small changes in assumptions compound.",
    },
    {
      question: "Does the tool store my numbers?",
      answer: "No. Calculations run in your browser and aren’t stored on our servers.",
    },
    {
      question: "Is this financial advice?",
      answer:
        "No. It’s a planning calculator. Use it to explore scenarios, then validate decisions with professional guidance if needed.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("retirement-calculator", getRetirementCalculatorFAQs);

