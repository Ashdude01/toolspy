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
  Home,
  Lightbulb,
  ListChecks,
  MessagesSquare,
  Percent,
  Rocket,
  Sigma,
} from "lucide-react";
import Link from "next/link";
import { getToolBySlug } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import NextImage from "next/image";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function MortgageCalculatorSEOContent() {
  const tool = getToolBySlug("mortgage-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  return (
    <article
      className="mx-auto max-w-5xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      {/* Intro (H1) */}
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            Mortgage Calculator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Estimate your monthly mortgage payment and see a breakdown for principal &amp; interest,
            property tax, insurance, and PMI. Includes an optional affordability check using income
            and debts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this mortgage calculator when you’re comparing houses, testing different down
              payments, or checking how interest rates affect the monthly payment. The result shows
              both the core loan payment and common add-ons.
            </p>
            <p>
              Note: this is an estimate for planning. Taxes, insurance, PMI rules, and lender fees
              vary by location and product.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Mortgage calculator - inputs for home price, down payment, term and rate with a monthly payment breakdown"
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
          currentToolSlug="mortgage-calculator"
          title="Similar Tools You Might Like"
          description="Other money calculators to pair with home planning."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to calculate a mortgage payment"
          lead="Fill the essentials, then add optional costs."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Enter the home price</h3>
            <p className="text-sm text-muted-foreground">
              Add home price and down payment to get the loan amount.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Choose term &amp; rate</h3>
            <p className="text-sm text-muted-foreground">
              Pick years (15–30) and enter the annual interest rate.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Add taxes &amp; insurance</h3>
            <p className="text-sm text-muted-foreground">
              Optional, but important for a realistic monthly total. PMI is estimated when applicable.
            </p>
          </Card>
        </div>
      </section>

      {/* Breakdown */}
      <section className="space-y-6" id="breakdown">
        <SectionHeader
          eyebrow="Payment breakdown"
          icon={Sigma}
          title="What’s included in the monthly payment"
          lead="The total monthly payment is typically multiple parts."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Principal & interest (P&amp;I)",
              body: "The base loan payment calculated from the loan amount, term, and interest rate.",
            },
            {
              title: "Property taxes",
              body: "Often paid monthly into escrow (annual tax ÷ 12). Amount depends on local rates and assessed value.",
            },
            {
              title: "Home insurance",
              body: "Also commonly escrowed. Your premium depends on location, coverage, and insurer.",
            },
            {
              title: "PMI estimate",
              body: "If your down payment is under ~20%, some loans include PMI. This tool estimates PMI for planning.",
            },
          ].map((x) => (
            <Card key={x.title} className="p-5">
              <h3 className="font-semibold mb-1">{x.title}</h3>
              <p className="text-sm text-muted-foreground">{x.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Formula */}
      <section className="space-y-6" id="formula">
        <SectionHeader
          eyebrow="Math"
          icon={Percent}
          title="Mortgage payment formula (principal & interest)"
          lead="How the core loan payment is computed."
        />
        <Card className="p-5">
          <div className="space-y-3 text-muted-foreground">
            <p>
              The tool uses the standard amortizing loan formula for monthly principal &amp; interest.
              With loan amount \(L\), monthly rate \(r\), and number of payments \(n\):
            </p>
            <p className="font-mono text-xs sm:text-sm text-foreground">
              Payment = L × (r × (1 + r)^n) / ((1 + r)^n − 1)
            </p>
            <p>
              Then taxes, insurance, and any PMI estimate are added to get the total monthly payment.
            </p>
          </div>
        </Card>
      </section>

      {/* Pitfalls */}
      <section className="space-y-6" id="pitfalls">
        <SectionHeader eyebrow="Heads up" icon={Lightbulb} title="Common pitfalls" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Mixing monthly and annual numbers",
              body: "Enter interest rate as annual percent, and taxes/insurance as annual amounts - the calculator divides them into monthly values.",
            },
            {
              title: "Ignoring PMI with low down payment",
              body: "If you put down less than ~20%, PMI can materially change the monthly total. Treat this as an estimate and confirm with your lender.",
            },
            {
              title: "Forgetting closing costs & fees",
              body: "Origination fees, points, HOA, and maintenance aren’t included in the payment breakdown.",
            },
            {
              title: "Comparing offers without APR context",
              body: "Two loans can have the same rate but different fees. Compare total cost, not just the monthly payment.",
            },
          ].map((p) => (
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
            <CardDescription>A factual summary of what the mortgage calculator does.</CardDescription>
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
                  {[
                    { feature: "Monthly P&amp;I calculation", value: "Yes", note: "Standard amortizing loan formula." },
                    { feature: "Taxes &amp; insurance (annual → monthly)", value: "Yes", note: "Optional inputs." },
                    { feature: "PMI estimate", value: "Yes", note: "Shown when loan-to-value is high." },
                    { feature: "Affordability check (DTI)", value: "Yes", note: "Optional income + debt inputs." },
                    { feature: "Signup required", value: "No", note: "No account needed." },
                  ].map((row, i) => (
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
            Planning a smaller loan or EMI-style payment?{" "}
            <Link href="/loan-calculator" className="underline underline-offset-4 text-foreground">
              Loan calculator
            </Link>
            .
          </p>
          <p>
            Checking your take-home after tax?{" "}
            <Link href="/tax-calculator" className="underline underline-offset-4 text-foreground">
              Tax calculator
            </Link>
            .
          </p>
          <p>
            Long-term saving assumptions?{" "}
            <Link
              href="/investment-calculator"
              className="underline underline-offset-4 text-foreground"
            >
              Investment calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getMortgageCalculatorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to estimate your payment?</h2>
          <p className="text-muted-foreground">
            Enter price, down payment, term and rate - then fine-tune taxes and insurance.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getMortgageCalculatorFAQs() {
  return [
    {
      question: "Is the mortgage calculator free to use?",
      answer:
        "Yes. It’s free and runs in your browser - no signup required.",
    },
    {
      question: "What does the monthly payment include?",
      answer:
        "The total monthly payment includes principal & interest, plus optional monthly tax and insurance, and an estimated PMI amount when applicable.",
    },
    {
      question: "How is PMI handled?",
      answer:
        "If your down payment is under ~20%, many loans add PMI. This tool provides an estimate to help you plan; confirm PMI rules and rates with your lender.",
    },
    {
      question: "Can I check affordability with my income and debts?",
      answer:
        "Yes. You can add monthly income and other debts to see an affordability signal using a debt-to-income style ratio.",
    },
    {
      question: "Does this include closing costs or HOA?",
      answer:
        "No. Closing costs, points, HOA fees, and maintenance aren’t included. Add them separately when budgeting.",
    },
    {
      question: "Does the tool store my numbers?",
      answer:
        "No. Calculations run in your browser and aren’t stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("mortgage-calculator", getMortgageCalculatorFAQs); 