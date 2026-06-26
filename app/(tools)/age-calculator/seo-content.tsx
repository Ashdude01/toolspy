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
  Calendar,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  Clock,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function AgeCalculatorSEOContent() {
  const tool = getToolBySlug("age-calculator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const breakdowns = [
    { unit: "Years, months, days", when: "Birthday cards, profile info, the classic answer." },
    { unit: "Total months", when: "Child milestones, vesting periods, visas." },
    { unit: "Total weeks", when: "Pregnancy milestones, habit tracking." },
    { unit: "Total days", when: "Countdowns, anniversaries, quick comparisons." },
    { unit: "Total hours / minutes", when: "Birthday fun facts and novelty." },
  ];

  const useCases = [
    { title: "Know your exact age", body: "Down to the day, not just the year." },
    { title: "Plan an anniversary", body: "Days until the next milestone from a date." },
    { title: "Age eligibility check", body: "18+, retirement, scheme cutoffs." },
    { title: "Days between two dates", body: "Between any two dates - not only birthdays." },
  ];

  const featureChecklist = [
    { feature: "Age in years, months, days", value: "Yes", note: "Calendar-accurate breakdown." },
    { feature: "Total months / weeks / days", value: "Yes", note: "Different units for different needs." },
    { feature: "Hours, minutes, seconds", value: "Yes", note: "Novelty granular breakdowns." },
    { feature: "Days between two dates", value: "Yes", note: "Works for any date range, not only birthdays." },
    { feature: "Upcoming birthday countdown", value: "Yes", note: "Shows days until your next birthday." },
    { feature: "Leap year aware", value: "Yes", note: "Correct handling for Feb 29." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Wrong timezone",
      body: "Birthdays are date-based, not instant-based. Crossing timezones shouldn’t flip the day - pick the locale of birth.",
    },
    {
      title: "Mixing ‘months’ and ‘4 weeks’",
      body: "A month isn’t always 4 weeks. Use months for age, weeks for short intervals.",
    },
    {
      title: "Age vs birthday logic",
      body: "You ‘turn’ X on your birthday. Until then, you’re still X − 1 even if months are close.",
    },
    {
      title: "Leap-day birthdays",
      body: "Feb 29 birthdays usually celebrate on Feb 28 / Mar 1 in non-leap years. The tool reports calendar-accurate age either way.",
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
            Age Calculator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online age calculator. Find your exact age in years, months, and days - or
            compute the days between any two dates. Runs in your browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this age calculator to work out exact age from a date of birth, days between
              two dates, or countdown to the next birthday. Results break down into years,
              months, days, and total weeks, hours, and minutes for fun.
            </p>
            <p>
              Useful for forms that ask for exact age, eligibility checks, anniversary planning,
              and travel visa rules. Leap-year handling, timezone-friendly, and accurate to the
              day.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Age calculator - pick birth date and today, see exact age and next-birthday countdown"
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
          currentToolSlug="age-calculator"
          title="Similar Tools You Might Like"
          description="Other calculators that pair well."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to use the age calculator"
          lead="Three steps for your answer."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Enter birth date</h3>
            <p className="text-sm text-muted-foreground">
              Pick your date of birth (or any start date).
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Set end date</h3>
            <p className="text-sm text-muted-foreground">
              Defaults to today. Change it for any date range.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Read the breakdown</h3>
            <p className="text-sm text-muted-foreground">
              Years / months / days plus alternate units and countdown.
            </p>
          </Card>
        </div>
      </section>

      {/* Breakdown units */}
      <section className="space-y-6" id="breakdowns">
        <SectionHeader
          eyebrow="Units"
          icon={Clock}
          title="Different ways to view the same age"
          lead="Pick the unit that fits what you need."
        />
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Unit</th>
                    <th className="text-left p-3 font-medium">When to use</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdowns.map((b) => (
                    <tr key={b.unit} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{b.unit}</td>
                      <td className="p-3 text-muted-foreground">{b.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Use cases */}
      <section className="space-y-6" id="use-cases">
        <SectionHeader
          eyebrow="When it helps"
          icon={Calendar}
          title="Typical reasons to use the age calculator"
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
              A factual summary of what the age calculator does.
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
            Retirement planning?{" "}
            <Link href="/retirement-calculator" className="underline underline-offset-4 text-foreground">
              Retirement calculator
            </Link>
            .
          </p>
          <p>
            Percentage maths?{" "}
            <Link href="/percentage-calculator" className="underline underline-offset-4 text-foreground">
              Percentage calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getAgeCalculatorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to check your exact age?</h2>
          <p className="text-muted-foreground">
            Pick a date of birth, read the full breakdown, and see when your next birthday
            lands.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getAgeCalculatorFAQs() {
  return [
    {
      question: "Is the age calculator free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "How does it calculate exact age?",
      answer:
        "Calendar-aware: it counts completed years, then months, then days between your birth date and the end date. Leap years (including Feb 29 birthdays) are handled correctly.",
    },
    {
      question: "Can I find days between two dates (not only age)?",
      answer:
        "Yes. Change the end date and use any two dates to get the exact gap in days, weeks, and months.",
    },
    {
      question: "Does it show my next birthday?",
      answer:
        "Yes. A countdown shows how many days until your next birthday based on today’s date.",
    },
    {
      question: "What about timezones?",
      answer:
        "Birthdays are date-based rather than instant-based, so timezone shouldn’t change the day. Use the locale of birth if a border case comes up.",
    },
    {
      question: "Does the tool upload my dates to a server?",
      answer:
        "No. All calculations happen in your browser.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("age-calculator", getAgeCalculatorFAQs);
