/**
 * Server-only SEO content for this tool page.
 * No "use client" — all markup is server-rendered so view-source and crawlers see full HTML.
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

export function SalaryCalculatorSEOContent() {
  const tool = getToolBySlug("salary-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const conversions = [
    {
      title: "Hourly ↔ yearly",
      body: "Convert an hourly wage to an annual salary (and back) using standard work-year assumptions.",
    },
    {
      title: "Monthly ↔ yearly",
      body: "Quickly compare monthly salary vs annual packages when negotiating or budgeting.",
    },
    {
      title: "Weekly / daily estimates",
      body: "Useful for freelancers and contractors who quote in different time units.",
    },
    {
      title: "Scenario comparisons",
      body: "Try different hours per week or weeks per year to see how time assumptions change the number.",
    },
  ];

  const pitfalls = [
    {
      title: "Assumptions matter",
      body: "Yearly salary depends on hours/week and weeks/year. A standard 40×52 model is common, but not universal.",
    },
    {
      title: "Overtime and bonuses",
      body: "Bonuses, commissions, stock, and overtime can change total compensation and may not fit simple conversions.",
    },
    {
      title: "Gross vs net pay",
      body: "This is a salary conversion tool, not a take-home calculator. Taxes and deductions come later.",
    },
    {
      title: "Part-time schedules",
      body: "If you’re part-time, set realistic weekly hours and working weeks to avoid overestimating annual pay.",
    },
  ];

  const featureChecklist = [
    { feature: "Hourly ↔ yearly conversion", value: "Yes", note: "Uses a work-year assumption." },
    { feature: "Monthly ↔ yearly conversion", value: "Yes", note: "Quick comparisons for offers." },
    { feature: "Weekly / daily conversions", value: "Yes", note: "Useful for freelance planning." },
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
            Salary Calculator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Convert salary between hourly, weekly, monthly, and yearly. Great for comparing job
            offers, budgeting, and freelance rate planning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              If someone quotes “₹500/hour”, “$4,500/month”, or “₹12 LPA”, it’s hard to compare
              without converting everything to the same unit. This salary calculator helps you
              convert quickly, using common work-year assumptions.
            </p>
            <p>
              For take-home estimates after deductions and tax, pair this with the{" "}
              <Link href="/tax-calculator" className="underline underline-offset-4 text-foreground">
                tax calculator
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
                alt="Salary calculator — convert hourly, weekly, monthly and yearly pay"
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
          currentToolSlug="salary-calculator"
          title="Similar Tools You Might Like"
          description="Other calculators that help with budgeting and planning."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to convert salary units"
          lead="Pick your starting unit, then read the converted values."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Choose the unit</h3>
            <p className="text-sm text-muted-foreground">
              Hourly, weekly, monthly, or yearly — start with the number you have.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Set time assumptions</h3>
            <p className="text-sm text-muted-foreground">
              Hours per week and weeks per year affect conversions, especially hourly ↔ yearly.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Compare scenarios</h3>
            <p className="text-sm text-muted-foreground">
              Try 48 working weeks vs 52, or 35 hours/week vs 40, to see the range.
            </p>
          </Card>
        </div>
      </section>

      {/* Conversions */}
      <section className="space-y-6" id="conversions">
        <SectionHeader eyebrow="Conversions" icon={Sigma} title="Common salary conversions" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conversions.map((c) => (
            <Card key={c.title} className="p-5">
              <h3 className="font-semibold mb-1">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Work-year note */}
      <section className="space-y-6" id="work-year">
        <SectionHeader
          eyebrow="Work year"
          icon={Clock}
          title="Understanding work-year assumptions"
          lead="Why two conversions can differ for the same hourly rate."
        />
        <Card className="p-5">
          <div className="space-y-3 text-muted-foreground">
            <p>
              A common assumption is 40 hours/week × 52 weeks/year = 2,080 hours/year. But many
              roles have paid leave, holidays, part-time schedules, or contract gaps.
            </p>
            <p>
              If you’re converting a freelance rate, consider using fewer working weeks (for example
              46–48) to account for downtime.
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
            <CardDescription>A factual summary of what the salary calculator does.</CardDescription>
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
            Estimating tax and take-home?{" "}
            <Link href="/tax-calculator" className="underline underline-offset-4 text-foreground">
              Tax calculator
            </Link>
            .
          </p>
          <p>
            Planning loan affordability too?{" "}
            <Link href="/loan-calculator" className="underline underline-offset-4 text-foreground">
              Loan calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getSalaryCalculatorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to compare an offer?</h2>
          <p className="text-muted-foreground">
            Convert your salary into the unit you need in seconds.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getSalaryCalculatorFAQs() {
  return [
    {
      question: "Is the salary calculator free to use?",
      answer: "Yes. It’s free and runs in your browser — no signup required.",
    },
    {
      question: "How do you convert hourly pay to yearly salary?",
      answer:
        "A common method is hourly rate × hours/week × weeks/year. If your schedule differs, adjust the assumptions to match your reality.",
    },
    {
      question: "Does this calculate take-home pay?",
      answer:
        "No. This tool converts salary units. For taxes and take-home estimates, use the tax calculator.",
    },
    {
      question: "Does the tool store my numbers?",
      answer: "No. Calculations run in your browser and aren’t stored on our servers.",
    },
    {
      question: "What assumptions should freelancers use?",
      answer:
        "Freelancers often use fewer working weeks (for example, 46–48) to account for time off and gaps between projects.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("salary-calculator", getSalaryCalculatorFAQs);

