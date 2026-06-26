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
  Heart,
  Lightbulb,
  ListChecks,
  MessagesSquare,
  Rocket,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import NextImage from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function LoveCalculatorSEOContent() {
  const tool = getToolBySlug("love-calculator");
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
            Love Calculator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fun love compatibility calculator based on two names. Type the names, get a
            playful percentage and a short message - just for entertainment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This love calculator uses a simple name-based scoring method to generate a
              compatibility percentage. It’s not a scientific measure - treat it like a quick
              party trick you can share with friends.
            </p>
            <p>
              Everything runs in your browser. We don’t ask for accounts, and we don’t need your
              names for anything beyond producing the result on-screen.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Love calculator - two name inputs and a compatibility percentage result"
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
          currentToolSlug="love-calculator"
          title="Similar Tools You Might Like"
          description="More calculators you can try next."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to use the love compatibility calculator"
          lead="Two names in, result out."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Type two names</h3>
            <p className="text-sm text-muted-foreground">
              Use first names, nicknames, or any two words you want to compare.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Calculate</h3>
            <p className="text-sm text-muted-foreground">
              Hit the calculate button to generate a percentage and message.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Share for fun</h3>
            <p className="text-sm text-muted-foreground">
              Take it lightly - it’s meant for entertainment, not real-world decisions.
            </p>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="space-y-6" id="how-it-works">
        <SectionHeader
          eyebrow="Behind the result"
          icon={Heart}
          title="What the percentage means"
          lead="A simple score that reacts to the names you enter."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="font-semibold mb-1">Name-based score</h3>
            <p className="text-sm text-muted-foreground">
              The calculator looks at the letters in the two names and produces a score from 10–100.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold mb-1">Entertainment only</h3>
            <p className="text-sm text-muted-foreground">
              Think of it like a game. A high score doesn’t guarantee anything - and a low score
              doesn’t mean anything either.
            </p>
          </Card>
        </div>
      </section>

      {/* Pitfalls */}
      <section className="space-y-6" id="pitfalls">
        <SectionHeader eyebrow="Heads up" icon={Lightbulb} title="Common pitfalls" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="font-semibold mb-1">Spelling changes results</h3>
            <p className="text-sm text-muted-foreground">
              “Alex” and “Alexander” can produce different scores. Try a couple variants if you’re curious.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold mb-1">Don’t treat it as advice</h3>
            <p className="text-sm text-muted-foreground">
              Real compatibility comes from communication and shared values, not a number on a screen.
            </p>
          </Card>
        </div>
      </section>

      {/* Feature checklist */}
      <section className="space-y-6" id="features">
        <SectionHeader eyebrow="Overview" icon={ListChecks} title="What this tool supports" />
        <Card>
          <CardHeader>
            <CardTitle>Feature checklist</CardTitle>
            <CardDescription>A factual summary of what the love calculator does.</CardDescription>
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
                    { feature: "Two-name compatibility score", value: "Yes", note: "Returns a percentage and message." },
                    { feature: "Works on mobile", value: "Yes", note: "Responsive layout." },
                    { feature: "Signup required", value: "No", note: "No account needed." },
                    { feature: "Runs locally in browser", value: "Yes", note: "No file uploads." },
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

      {/* FAQ */}
      <FAQ faqs={getLoveCalculatorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Want to try a match?</h2>
          <p className="text-muted-foreground">Type two names and see the result instantly.</p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getLoveCalculatorFAQs() {
  return [
    {
      question: "Is the love calculator free to use?",
      answer:
        "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "Is the love compatibility score accurate?",
      answer:
        "It’s designed for entertainment. The percentage is a playful, name-based score - not a scientific measure of a relationship.",
    },
    {
      question: "Does the tool store my names?",
      answer:
        "No. The calculation runs locally in your browser and the names aren’t stored on our servers.",
    },
    {
      question: "Why does spelling change the result?",
      answer:
        "The score is derived from the letters in the names you enter, so different spellings can produce different percentages.",
    },
    {
      question: "Can I try nicknames or full names?",
      answer:
        "Yes. You can use first names, nicknames, or full names - any two text inputs work.",
    },
    {
      question: "Is this meant for serious relationship decisions?",
      answer:
        "No. It’s a fun tool. For anything serious, rely on real communication and how you both feel - not a number.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("love-calculator", getLoveCalculatorFAQs); 