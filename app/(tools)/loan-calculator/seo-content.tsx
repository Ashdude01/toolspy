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
  Calculator,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  Table2,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function LoanCalculatorSEOContent() {
  const tool = getToolBySlug("loan-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const inputs = [
    { label: "Principal", note: "The loan amount you borrow." },
    { label: "Interest rate (p.a.)", note: "Annual rate quoted by the lender." },
    { label: "Tenure", note: "In months or years - the tool handles both." },
    { label: "Start date (optional)", note: "Used to generate a dated amortization schedule." },
  ];

  const useCases = [
    { title: "Personal loan planning", body: "Estimate EMI and total interest before you apply." },
    { title: "Car loan comparison", body: "Compare different rates and tenures side by side." },
    { title: "Education loan budgeting", body: "See monthly payment against your expected income." },
    { title: "Top-up or refinance", body: "Check if a better rate actually helps." },
  ];

  const featureChecklist = [
    { feature: "EMI / monthly payment", value: "Yes", note: "Standard reducing-balance EMI formula." },
    { feature: "Total interest payable", value: "Yes", note: "Across the full tenure." },
    { feature: "Total amount (principal + interest)", value: "Yes", note: "What you actually repay in full." },
    { feature: "Amortization schedule", value: "Yes", note: "Month-by-month principal vs interest split." },
    { feature: "Tenure in months or years", value: "Yes", note: "Switch without recalculating." },
    { feature: "Currency-agnostic", value: "Yes", note: "Works with any currency - the ratios stay the same." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Quoted flat rate vs reducing-balance",
      body: "‘Flat 10%’ isn’t the same as ‘10% reducing’. Reducing-balance EMIs are typically lower for the same headline number.",
    },
    {
      title: "Ignoring processing fees",
      body: "EMIs don’t include one-off processing fees and stamp duty. Add those to total cost when comparing offers.",
    },
    {
      title: "Tenure extending cost",
      body: "Longer tenure lowers EMI but raises total interest. Always check both numbers.",
    },
    {
      title: "Prepayment penalties",
      body: "Some loans charge for early closure. Confirm with the lender before planning foreclosure.",
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
            Loan Calculator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online loan calculator and EMI calculator. Estimate monthly payments,
            interest, and total cost - plus a full amortization schedule. No signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this loan calculator to estimate EMI, total interest, and the repayment split
              for personal, car, home, and education loans. Enter principal, rate, and tenure -
              the tool returns the monthly payment and a dated amortization schedule.
            </p>
            <p>
              Compare options quickly: change the rate or tenure to see how much you save on
              interest. Works with any currency and handles both month- and year-based tenures.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Loan calculator - principal, rate, tenure inputs with EMI result and amortization schedule"
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
          currentToolSlug="loan-calculator"
          title="Similar Tools You Might Like"
          description="Other financial calculators."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to calculate an EMI"
          lead="Four quick steps."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Principal</h3>
            <p className="text-sm text-muted-foreground">Enter the loan amount.</p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Interest rate</h3>
            <p className="text-sm text-muted-foreground">Annual rate quoted by the lender.</p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Tenure</h3>
            <p className="text-sm text-muted-foreground">In months or years.</p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Read result</h3>
            <p className="text-sm text-muted-foreground">
              EMI, total interest, amortization schedule.
            </p>
          </Card>
        </div>
      </section>

      {/* Inputs */}
      <section className="space-y-6" id="inputs">
        <SectionHeader
          eyebrow="Inputs"
          icon={Calculator}
          title="What the tool needs"
          lead="Four simple numbers to get a full picture."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputs.map((i) => (
            <Card key={i.label} className="p-5">
              <h3 className="font-semibold mb-1">{i.label}</h3>
              <p className="text-sm text-muted-foreground">{i.note}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Formula */}
      <section className="space-y-4" id="formula">
        <SectionHeader
          eyebrow="The maths"
          icon={Table2}
          title="EMI formula"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
              EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1)
            </code>
          </p>
          <p className="text-sm">
            where <strong className="text-foreground">P</strong> = principal,{" "}
            <strong className="text-foreground">r</strong> = monthly interest rate (annual ÷ 12 ÷
            100), <strong className="text-foreground">n</strong> = tenure in months.
          </p>
          <p className="text-sm">
            The amortization schedule shows how each EMI splits into interest and principal -
            early EMIs are interest-heavy, later ones are principal-heavy.
          </p>
        </div>
      </section>

      {/* Use cases */}
      <section className="space-y-6" id="use-cases">
        <SectionHeader
          eyebrow="When it helps"
          title="Typical reasons to use the loan calculator"
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
              A factual summary of what the loan calculator does.
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
        <SectionHeader title="Related financial calculators" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            For home loans specifically:{" "}
            <Link href="/mortgage-calculator" className="underline underline-offset-4 text-foreground">
              Mortgage calculator
            </Link>
            .
          </p>
          <p>
            Long-term growth:{" "}
            <Link href="/investment-calculator" className="underline underline-offset-4 text-foreground">
              Investment calculator
            </Link>{" "}
            and{" "}
            <Link href="/retirement-calculator" className="underline underline-offset-4 text-foreground">
              Retirement calculator
            </Link>
            .
          </p>
          <p>
            Tax on salary / take-home:{" "}
            <Link href="/tax-calculator" className="underline underline-offset-4 text-foreground">
              Tax calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getLoanCalculatorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to plan your loan?</h2>
          <p className="text-muted-foreground">
            Enter principal, rate, tenure - see the EMI and full amortization in seconds.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getLoanCalculatorFAQs() {
  return [
    {
      question: "Is the loan calculator free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "How is the EMI calculated?",
      answer:
        "Using the standard reducing-balance formula: EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ − 1), where P is principal, r is monthly interest rate, and n is tenure in months.",
    },
    {
      question: "Can I see an amortization schedule?",
      answer:
        "Yes. The tool shows a month-by-month split of principal and interest so you can see exactly how the loan unwinds.",
    },
    {
      question: "Does it work for any currency?",
      answer:
        "Yes. The formula is currency-agnostic - just enter numbers in your preferred currency. The ratios and percentages stay correct.",
    },
    {
      question: "What about processing fees and taxes?",
      answer:
        "Those aren’t part of the EMI itself. Add one-off processing fees and stamp duty separately when comparing total loan costs.",
    },
    {
      question: "Does this store my numbers?",
      answer:
        "No. Calculations run in your browser and aren’t stored on our servers.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("loan-calculator", getLoanCalculatorFAQs);
