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
  Scale,
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

export function CompositionRegularSchemeEstimatorSEOContent() {
  const tool = getToolBySlug("composition-regular-scheme-estimator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const whatToCompare = [
    {
      title: "Estimated tax outflow",
      body: "Compare a rough tax outflow under composition vs regular based on your inputs.",
    },
    {
      title: "ITC considerations",
      body: "Regular scheme typically involves ITC considerations; composition has different rules. Use this as a planning comparison.",
    },
    {
      title: "Billing and customer expectations",
      body: "Your customer type (B2B vs B2C) can change what matters more (credit flow vs simplicity).",
    },
    {
      title: "Operational simplicity",
      body: "Composition may be simpler in some cases, but has eligibility conditions and limitations.",
    },
  ];

  const pitfalls = [
    {
      title: "Eligibility conditions",
      body: "Composition scheme has eligibility criteria and restrictions. Confirm you qualify before making decisions.",
    },
    {
      title: "Input assumptions",
      body: "The estimator depends on your turnover and assumptions. If inputs are off, the comparison will be misleading.",
    },
    {
      title: "ITC and pricing strategy",
      body: "If your buyers expect ITC flow, scheme choice can affect competitiveness. Use this as one input to your decision.",
    },
    {
      title: "Rules and rates change",
      body: "Scheme rules can be updated. Treat this as a planning tool and verify against current guidance.",
    },
  ];

  const featureChecklist = [
    { feature: "Side-by-side estimate", value: "Yes", note: "Composition vs regular for planning." },
    { feature: "Scenario testing", value: "Yes", note: "Try different turnover assumptions quickly." },
    { feature: "Official recommendation", value: "No", note: "Use professional advice for final decisions." },
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
            Composition vs Regular GST Scheme Estimator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Compare composition and regular GST schemes with a rough estimate based on your inputs.
            Use it for planning - verify eligibility, rates, and filing requirements before deciding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Choosing between composition and regular scheme affects compliance, invoicing, and how
              tax flows through your business. This estimator helps you compare scenarios quickly
              using simple inputs - useful when you’re planning, budgeting, or evaluating a switch.
            </p>
            <p>
              Want to estimate ITC in a scenario? Use the{" "}
              <Link href="/itc-calculator" className="underline underline-offset-4 text-foreground">
                ITC calculator
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
                alt="Composition vs regular scheme estimator - compare scenarios for GST scheme choice"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="composition-regular-scheme-estimator"
          title="Similar Tools You Might Like"
          description="Other GST tools for calculations and planning."
        />
      </nav>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to use the estimator"
          lead="Enter your scenario inputs and compare the two schemes."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Enter turnover scenario</h3>
            <p className="text-sm text-muted-foreground">
              Use realistic numbers for the period you’re planning.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Compare estimates</h3>
            <p className="text-sm text-muted-foreground">
              Review how the estimate differs under composition vs regular.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Validate the decision</h3>
            <p className="text-sm text-muted-foreground">
              Confirm eligibility and current rules before making changes.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-6" id="comparison">
        <SectionHeader eyebrow="Comparison" icon={Scale} title="What to compare" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whatToCompare.map((x) => (
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
            <CardDescription>A factual summary of what the estimator does.</CardDescription>
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

      <FAQ faqs={getCompositionRegularSchemeEstimatorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Comparing schemes?</h2>
          <p className="text-muted-foreground">
            Run a couple of scenarios to understand the trade-offs, then verify with the latest rules.
          </p>
          <ScrollToTopButton>Start Estimating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getCompositionRegularSchemeEstimatorFAQs() {
  return [
    {
      question: "Is this a recommendation for which scheme to choose?",
      answer:
        "No. It’s a planning estimator. Scheme choice depends on eligibility, customer mix, ITC considerations, and current rules.",
    },
    {
      question: "Do rules vary by business type?",
      answer:
        "Yes. Eligibility and rates can vary based on your business category and other conditions. Verify against current GST guidance.",
    },
    {
      question: "Does the tool store my inputs?",
      answer:
        "No. The tool is designed to run without storing your inputs on our servers.",
    },
    {
      question: "What should I do after using the estimator?",
      answer:
        "Use the result as one input, then validate eligibility and compliance requirements before changing your GST scheme.",
    },
  ];
}

registerToolFAQ("composition-regular-scheme-estimator", getCompositionRegularSchemeEstimatorFAQs);

