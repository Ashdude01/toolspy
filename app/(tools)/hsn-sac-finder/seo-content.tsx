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
  Search,
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

export function HSNSACFinderSEOContent() {
  const tool = getToolBySlug("hsn-sac-finder");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const useCases = [
    {
      title: "Invoice preparation",
      body: "Look up a likely HSN/SAC code for an item or service before generating invoices.",
    },
    {
      title: "GST rate checks",
      body: "Use the code to reference the applicable GST rate for quoting and billing.",
    },
    {
      title: "Catalog cleanup",
      body: "Standardize product/service naming and map them to codes consistently across teams.",
    },
    {
      title: "Quick audits",
      body: "Spot-check whether a listed code looks aligned with the item description.",
    },
  ];

  const pitfalls = [
    {
      title: "Codes can be ambiguous",
      body: "Many descriptions match multiple codes. Use the closest match and verify with official references when required.",
    },
    {
      title: "Rates can change",
      body: "GST rates and classifications can be updated. Treat results as a helper, not a guarantee.",
    },
    {
      title: "Product vs service confusion",
      body: "HSN is typically for goods, SAC for services. Some businesses have mixed cases-choose the right class for the transaction.",
    },
    {
      title: "Final responsibility",
      body: "For compliance, confirm the correct code according to your business context and the latest GST notifications.",
    },
  ];

  const featureChecklist = [
    { feature: "Keyword search for HSN/SAC", value: "Yes", note: "Search by product or service name." },
    { feature: "Helpful for GST rate reference", value: "Yes", note: "Use it as a starting point for rate checks." },
    { feature: "Fast lookup", value: "Yes", note: "Designed for quick invoice workflows." },
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
            HSN / SAC Code Finder (India GST)
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Search HSN (goods) and SAC (services) codes by keyword and use the result as a starting
            point for GST rate checks and invoice preparation. Always verify for compliance-critical
            use cases.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              HSN/SAC codes help classify goods and services under GST. This finder is designed for
              quick lookups when you’re preparing invoices, quoting prices, or standardizing a
              product catalog.
            </p>
            <p>
              Need to calculate GST on an amount after you pick the rate? Use the{" "}
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
                alt="HSN/SAC finder - search by keyword and view matching GST codes"
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
          currentToolSlug="hsn-sac-finder"
          title="Similar Tools You Might Like"
          description="Other GST tools for calculations and breakdowns."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to find an HSN or SAC code"
          lead="Search by keyword, then verify the closest match."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Type a keyword</h3>
            <p className="text-sm text-muted-foreground">
              Use the product or service name a customer would recognize.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Review matches</h3>
            <p className="text-sm text-muted-foreground">
              Pick the closest description and check whether it’s for goods (HSN) or services (SAC).
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Validate for compliance</h3>
            <p className="text-sm text-muted-foreground">
              Confirm the code with official references if the classification affects filing or audits.
            </p>
          </Card>
        </div>
      </section>

      {/* What it’s used for */}
      <section className="space-y-6" id="use-cases">
        <SectionHeader eyebrow="Use cases" icon={Sigma} title="Where it helps" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {useCases.map((u) => (
            <Card key={u.title} className="p-5">
              <h3 className="font-semibold mb-1">{u.title}</h3>
              <p className="text-sm text-muted-foreground">{u.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Notes */}
      <section className="space-y-6" id="notes">
        <SectionHeader
          eyebrow="Notes"
          icon={Search}
          title="Tips for better searches"
          lead="Small changes in keywords can surface better matches."
        />
        <Card className="p-5">
          <div className="space-y-3 text-muted-foreground">
            <p>
              Try simpler keywords first (for example, “repair”, “consulting”, “steel”, “packaging”),
              then refine. If you’re not seeing a match, try synonyms or the common trade term.
            </p>
            <p>
              Some categories have multiple plausible codes. If the decision affects GST liability,
              confirm the classification using official guidance or your tax professional.
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
            <CardDescription>A factual summary of what the finder does.</CardDescription>
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
      <FAQ faqs={getHSNSACFinderFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Need a code for an invoice?</h2>
          <p className="text-muted-foreground">
            Search by keyword, then validate the closest match for compliance-critical cases.
          </p>
          <ScrollToTopButton>Start Searching →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getHSNSACFinderFAQs() {
  return [
    {
      question: "What is the difference between HSN and SAC?",
      answer:
        "HSN is used to classify goods, while SAC is used to classify services under GST.",
    },
    {
      question: "Is the finder’s result always correct?",
      answer:
        "It’s a helper for quick lookups. Some descriptions map to multiple codes, and classifications can change. Verify with official references when needed.",
    },
    {
      question: "Can I use this for compliance and filing?",
      answer:
        "Use it as a starting point. For compliance-critical decisions, confirm the code based on your business context and the latest GST guidance.",
    },
    {
      question: "Does the tool store what I search?",
      answer:
        "No. Searches run in your browser and aren’t stored on our servers.",
    },
  ];
}

registerToolFAQ("hsn-sac-finder", getHSNSACFinderFAQs);

