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
  CreditCard,
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

export function ITCCalculatorSEOContent() {
  const tool = getToolBySlug("itc-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const whatItHelpsWith = [
    {
      title: "Claimable vs blocked ITC split",
      body: "Separate inputs into claimable and blocked categories for a clearer view of potential credit.",
    },
    {
      title: "Planning and internal checks",
      body: "Use it for budgeting and sanity checks before finalizing returns in your accounting system.",
    },
    {
      title: "Simple totals",
      body: "Get an at-a-glance summary without building a spreadsheet from scratch.",
    },
    {
      title: "Faster reviews",
      body: "Quickly compare two scenarios (with/without a category) to see impact on net ITC.",
    },
  ];

  const pitfalls = [
    {
      title: "Eligibility depends on rules",
      body: "ITC eligibility depends on conditions and documentation. This tool is for planning; validate against GST rules and your records.",
    },
    {
      title: "Blocked ITC categories",
      body: "Some credits are blocked under certain cases. Make sure your categorization matches the scenario you’re evaluating.",
    },
    {
      title: "Mismatch with return filings",
      body: "Your final ITC claim is determined by your return and reconciliations. Use this as a calculation aid, not the source of truth.",
    },
    {
      title: "Rounding and period boundaries",
      body: "If you’re mixing periods or rounding per invoice, totals may differ slightly from accounting software outputs.",
    },
  ];

  const featureChecklist = [
    { feature: "Claimable vs blocked breakdown", value: "Yes", note: "Helps organize the inputs." },
    { feature: "Quick totals", value: "Yes", note: "Useful for planning and checks." },
    { feature: "No signup required", value: "Yes", note: "Runs without an account." },
    { feature: "Official filing", value: "No", note: "Use your accounting/return workflow for filing." },
  ];

  return (
    <article
      className="mx-auto max-w-7xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            ITC Calculator (Input Tax Credit)
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Estimate input tax credit by splitting amounts into claimable and blocked categories.
            Useful for planning and internal checks - validate the final claim with GST rules and your
            accounting workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              ITC can materially affect cash flow. This calculator is designed for quick “what-if”
              checks when you’re reviewing purchases and trying to estimate how much credit may be
              available vs blocked.
            </p>
            <p>
              Need a GST inclusive/exclusive split first? Use the{" "}
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
                alt="ITC calculator - split claimable and blocked credits for planning"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="itc-calculator"
          title="Similar Tools You Might Like"
          description="Other GST tools for breakdowns and checks."
        />
      </nav>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to use the ITC calculator"
          lead="Add claimable and blocked amounts, then review totals."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Collect totals</h3>
            <p className="text-sm text-muted-foreground">
              Use your purchase data for the period you’re evaluating.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Categorize</h3>
            <p className="text-sm text-muted-foreground">
              Separate amounts into likely claimable vs blocked categories.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Review</h3>
            <p className="text-sm text-muted-foreground">
              Use the output for planning and internal checks before filing.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-6" id="use-cases">
        <SectionHeader eyebrow="Use cases" icon={Sigma} title="Where it helps" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whatItHelpsWith.map((x) => (
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
            <CardDescription>A factual summary of what the ITC calculator does.</CardDescription>
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

      <FAQ faqs={getITCCalculatorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Want a quick ITC estimate?</h2>
          <p className="text-muted-foreground">
            Add claimable and blocked amounts to see the split instantly.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getITCCalculatorFAQs() {
  return [
    {
      question: "Is this an official ITC calculation?",
      answer:
        "No. It’s a planning calculator to help you estimate claimable vs blocked amounts. Final ITC depends on rules, documentation, and filings.",
    },
    {
      question: "Does the calculator store my numbers?",
      answer: "No. Calculations run in your browser and values aren’t stored on our servers.",
    },
    {
      question: "What is blocked ITC?",
      answer:
        "Blocked ITC refers to credits that may not be eligible under certain conditions. Eligibility depends on GST rules and your business context.",
    },
    {
      question: "How should I use the result?",
      answer:
        "Use it for internal checks and planning, then confirm your final claim through your accounting/return process.",
    },
  ];
}

registerToolFAQ("itc-calculator", getITCCalculatorFAQs);

