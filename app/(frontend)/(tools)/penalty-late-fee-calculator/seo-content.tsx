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
  Clock,
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

export function PenaltyLateFeeCalculatorSEOContent() {
  const tool = getToolBySlug("penalty-late-fee-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const whatItHelpsWith = [
    {
      title: "Rough late fee estimate",
      body: "Estimate late fees for planning and quick checks when a return is filed after due date.",
    },
    {
      title: "Interest planning",
      body: "Get a sense of interest impact based on the inputs you provide.",
    },
    {
      title: "Scenario comparison",
      body: "Compare two filing dates to see how time affects late fee and interest.",
    },
    {
      title: "Internal reporting",
      body: "Useful for creating a quick summary for internal follow-ups and reminders.",
    },
  ];

  const pitfalls = [
    {
      title: "Rules change and can vary",
      body: "Late fee and interest rules can change with notifications. Use this as an estimate and confirm with the latest rules.",
    },
    {
      title: "Return type differences",
      body: "Some return types can have different treatments. Make sure you choose the correct return scenario in the tool.",
    },
    {
      title: "Partial payments and adjustments",
      body: "If you have partial payments, credits, or adjustments, the real payable may differ from a simple estimate.",
    },
    {
      title: "Rounding and period boundaries",
      body: "Depending on how you round and which period you apply, your accounting system may show slightly different numbers.",
    },
  ];

  const featureChecklist = [
    { feature: "Late fee estimate", value: "Yes", note: "For planning and checks." },
    { feature: "Interest estimate", value: "Yes", note: "Based on the inputs you provide." },
    { feature: "Scenario comparison", value: "Yes", note: "Try different filing dates." },
    { feature: "Official filing", value: "No", note: "Use official rules for final payable amounts." },
  ];

  return (
    <article
      className="mx-auto max-w-7xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            GST Late Fee / Penalty Calculator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Estimate late fees and interest when a GST return is filed after the due date. Use this
            for planning and quick checks - always confirm with current official rules.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              When filings are late, fees and interest can add up. This calculator is intended as a
              quick estimate so you can plan payments, understand impact, and compare scenarios.
            </p>
            <p>
              Need to calculate GST amounts first? Use the{" "}
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
                alt="GST late fee and penalty calculator - estimate impact of late filing"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="penalty-late-fee-calculator"
          title="Similar Tools You Might Like"
          description="Other GST tools for planning and checks."
        />
      </nav>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to estimate late fee and interest"
          lead="Enter dates and amounts, then review the estimate."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Enter due and filing dates</h3>
            <p className="text-sm text-muted-foreground">
              The time gap drives late fee/interest in most scenarios.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Enter relevant amounts</h3>
            <p className="text-sm text-muted-foreground">
              Provide the values your scenario requires to estimate interest.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Compare scenarios</h3>
            <p className="text-sm text-muted-foreground">
              Try different filing dates to understand impact.
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
            <CardDescription>A factual summary of what the calculator does.</CardDescription>
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

      <FAQ faqs={getPenaltyLateFeeCalculatorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Need a quick estimate?</h2>
          <p className="text-muted-foreground">
            Enter your dates and scenario amounts to estimate late fee and interest.
          </p>
          <ScrollToTopButton>Start Estimating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getPenaltyLateFeeCalculatorFAQs() {
  return [
    {
      question: "Is this an official GST late fee amount?",
      answer:
        "No. It’s an estimate for planning. Late fee and interest can change based on notifications and rules. Confirm with the latest official guidance.",
    },
    {
      question: "Why might my accounting software show a different number?",
      answer:
        "Differences can come from rounding, adjustments, partial payments, and the exact rule set applied. Use this tool as a quick check, not a filing output.",
    },
    {
      question: "Does the tool store my numbers?",
      answer: "No. The tool is designed to run without storing your inputs on our servers.",
    },
    {
      question: "How should I use this result?",
      answer:
        "Use it to understand impact and plan payments, then confirm final payable values with official rules and your filing workflow.",
    },
  ];
}

registerToolFAQ("penalty-late-fee-calculator", getPenaltyLateFeeCalculatorFAQs);

