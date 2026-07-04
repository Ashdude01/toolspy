/**
 * Pillar SEO content for the Calculators category page (/tools/calculators/).
 * Server-rendered so crawlers get the full guide in HTML.
 * Written per Google helpful-content guidelines: factual, user-first,
 * no competitor comparisons or unverifiable claims.
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getToolsByCategory } from "@/lib/tools-data";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { ToolCard } from "@/components/tools/tool-card";
import NextImage from "next/image";
import Link from "next/link";

const categoryFaqs = () => [
  {
    question: "Are these calculators free?",
    answer:
      "Yes - every calculator is free, with no registration and no usage limits.",
  },
  {
    question: "How is EMI calculated?",
    answer:
      "EMI = P x r x (1+r)^n / ((1+r)^n - 1), where P is principal, r the monthly interest rate, and n the number of months. The loan calculator applies this and shows the interest split.",
  },
  {
    question: "What is a good engagement rate?",
    answer:
      "It varies by platform and follower size - smaller accounts naturally have higher rates. As a broad reference, 1-3% is common on Instagram for mid-size accounts; our calculators show benchmarks alongside your result.",
  },
  {
    question: "Is my financial data stored?",
    answer:
      "No. Calculations run in your browser; the amounts you enter are never transmitted or stored.",
  },
  {
    question: "Can I rely on these for financial decisions?",
    answer:
      "Use them for planning and comparison. Final loan terms, tax liability, and returns depend on your institution and applicable law - confirm with a professional.",
  },
];

export function CalculatorsSEOContent() {
  const tools = getToolsByCategory()["calculators"] || [];
  // Poster image dynamically fetched from tools-data (flagship tool of this category)
  const posterImage =
    tools.find((t) => t.slug === "loan-calculator")?.posterImage ||
    tools.find((t) => t.posterImage)?.posterImage;

  registerToolFAQ("calculators", categoryFaqs);

  return (
    <article className="mx-auto max-w-7xl space-y-14 mt-16 mb-20 px-4 text-base sm:text-[17px] leading-relaxed">
      {/* Intro */}
      <section className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          Free Online Calculators - Finance, Health & Social Media
        </h2>
        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A good calculator answers a decision, not just a sum: Can I afford this EMI? What does this salary mean per month? Is this creator&apos;s engagement real? Toolspy&apos;s {tools.length} calculators cover personal finance (loan/EMI, mortgage, investment, retirement, tax, salary), everyday math (percentage, age, BMI), and social media analytics (engagement rates for Instagram, YouTube, Facebook and X).
            </p>
            <p>
              Every calculator runs locally in your browser, shows its inputs clearly, and is free with no signup - built for quick, repeatable checks.
            </p>
          </div>
          {posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={posterImage}
                width={1600}
                height={900}
                alt="Free online calculators - EMI, loan, mortgage, BMI, age, percentage and engagement calculators"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      {/* Tools grid (global card design) */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Tools in this category</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} showCategoryBadge={false} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Calculator groups at a glance</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What each group answers</CardTitle>
            <CardDescription>Pick by the decision you are making.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Group</th>
                    <th className="text-left p-3 font-medium">Calculators</th>
                    <th className="text-left p-3 font-medium">The Question They Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Loans & property", "Loan/EMI, Mortgage", "What will this borrowing actually cost per month and overall?"],
                    ["Wealth building", "Investment, Retirement", "What does compounding do to my savings over N years?"],
                    ["Income", "Salary, Tax", "What is my real take-home across hourly/monthly/yearly?"],
                    ["Everyday math", "Percentage, Age, BMI, Love", "Quick answers for forms, health checks, and fun"],
                    ["Social media", "Instagram/YouTube/Facebook/X engagement", "Is this account's engagement healthy for its follower size?"]
                  ].map((row, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{row[0]}</td>
                      <td className="p-3">{row[1]}</td>
                      <td className="p-3 text-muted-foreground">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Use cases */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Real decisions these calculators support</h3>
        <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Before taking a loan</h4>
              <p className="text-sm text-muted-foreground">Compare EMI at different tenures and rates, and see total interest paid - a longer tenure lowers the EMI but can double the interest outgo.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Planning investments</h4>
              <p className="text-sm text-muted-foreground">Model how monthly contributions compound over 10-30 years and what changing the rate or duration does to the end corpus.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Vetting influencers</h4>
              <p className="text-sm text-muted-foreground">Brands use engagement-rate calculators to check whether an account&apos;s likes and comments are proportionate to its followers before paying for a collaboration.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Everyday paperwork</h4>
              <p className="text-sm text-muted-foreground">Exact age for application forms, percentage changes for reports, BMI as a quick health reference point.</p>
            </Card>
        </div>
      </section>

      {/* How to */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Getting trustworthy numbers (3 steps)</h3>
        <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">1. Use real inputs</h4>
              <p className="text-sm text-muted-foreground">Actual rates, actual amounts. Approximate inputs give approximate answers.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">2. Compare scenarios</h4>
              <p className="text-sm text-muted-foreground">Run 2-3 variations (different tenure, rate, contribution) - the comparison teaches more than a single result.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">3. Treat results as estimates</h4>
              <p className="text-sm text-muted-foreground">Banks and platforms apply their own rounding, fees, and rules - confirm final figures with the institution.</p>
            </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Frequently Asked Questions</h3>
        <FAQ faqs={categoryFaqs()} />
      </section>

      {/* Note */}
      <section className="text-sm text-muted-foreground border rounded-lg p-4">
        <p>
          Calculator outputs are estimates for planning. They are not financial, tax, or medical advice - verify final figures with your bank, CA, or doctor.{" "}
          <Link href="/privacy/" className="underline underline-offset-4">
            Privacy Policy
          </Link>{" "}
          ·{" "}
          <Link href="/disclaimer/" className="underline underline-offset-4">
            Disclaimer
          </Link>
        </p>
      </section>
    </article>
  );
}
