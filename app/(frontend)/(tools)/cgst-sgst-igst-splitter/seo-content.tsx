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
  MapPin,
  MessagesSquare,
  Percent,
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

export function CGSTSGSTIGSTSplitterSEOContent() {
  const tool = getToolBySlug("cgst-sgst-igst-splitter");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const gstRates = ["0%", "5%", "12%", "18%", "28%"];

  const breakdown = [
    {
      title: "Intra-state supply",
      body: "When supplier and place of supply are in the same state/UT, GST is split into CGST + SGST (typically half each).",
    },
    {
      title: "Inter-state supply",
      body: "When supplier and place of supply are in different states/UTs, GST is charged as IGST (full rate).",
    },
  ];

  const pitfalls = [
    {
      title: "Wrong state selection",
      body: "The intra vs inter decision depends on supplier location and place of supply. Pick the right states to get the correct breakup.",
    },
    {
      title: "Using the wrong GST rate",
      body: "Rates depend on classification. A correct split with the wrong rate is still wrong overall.",
    },
    {
      title: "Rounding in invoices",
      body: "Some systems round each line item. This tool provides a clean split for quick checks.",
    },
    {
      title: "Special cases",
      body: "Some categories may have additional rules. Use this for planning and validate against official guidance if needed.",
    },
  ];

  const featureChecklist = [
    { feature: "CGST + SGST split (intra-state)", value: "Yes", note: "Splits GST into two equal parts in common cases." },
    { feature: "IGST (inter-state)", value: "Yes", note: "Applies IGST for different-state supply." },
    { feature: "Common GST rates", value: "Yes", note: `Includes ${gstRates.join(", ")}.` },
    { feature: "Signup required", value: "No", note: "No account needed." },
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
            CGST / SGST / IGST Splitter
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Split GST into CGST + SGST for intra-state transactions or IGST for inter-state
            transactions. Useful for invoices and understanding the GST breakup by place of supply.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              GST breakup depends on whether the supply is within the same state (CGST + SGST) or
              across states (IGST). This splitter helps you take an amount and apply the correct
              breakup once you know the transaction type.
            </p>
            <p>
              Need only base + GST split without CGST/SGST/IGST? Use the{" "}
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
                alt="CGST SGST IGST splitter - choose states and get tax breakup"
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
          currentToolSlug="cgst-sgst-igst-splitter"
          title="Similar Tools You Might Like"
          description="Other GST tools for rate and invoice calculations."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to split GST into CGST/SGST or IGST"
          lead="Pick states, rate, then enter amount."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Select states</h3>
            <p className="text-sm text-muted-foreground">
              Choose supplier state and place of supply to decide intra vs inter.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Pick GST slab</h3>
            <p className="text-sm text-muted-foreground">
              Common slabs: {gstRates.join(", ")}.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Read the breakup</h3>
            <p className="text-sm text-muted-foreground">
              Get CGST + SGST (intra) or IGST (inter) and copy values into invoices.
            </p>
          </Card>
        </div>
      </section>

      {/* Intra vs inter */}
      <section className="space-y-6" id="transaction-types">
        <SectionHeader
          eyebrow="Transaction type"
          icon={MapPin}
          title="Intra-state vs inter-state"
          lead="This decision drives the breakup."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {breakdown.map((b) => (
            <Card key={b.title} className="p-5">
              <h3 className="font-semibold mb-1">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Formula */}
      <section className="space-y-6" id="formula">
        <SectionHeader
          eyebrow="Math"
          icon={Percent}
          title="Breakup logic (common case)"
          lead="How the tax is split once GST amount is known."
        />
        <Card className="p-5">
          <div className="space-y-3 text-muted-foreground">
            <p>
              If GST rate is \(r\) and taxable value is \(B\), total GST is \(B × r\).
            </p>
            <p className="font-mono text-xs sm:text-sm text-foreground">
              Intra-state: CGST = (B × r) / 2, SGST = (B × r) / 2
            </p>
            <p className="font-mono text-xs sm:text-sm text-foreground">
              Inter-state: IGST = B × r
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
            <CardDescription>A factual summary of what the splitter does.</CardDescription>
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
      <FAQ faqs={getCGSTSGSTIGSTSplitterFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Want the GST breakup?</h2>
          <p className="text-muted-foreground">
            Choose states and GST slab to split into CGST/SGST or IGST.
          </p>
          <ScrollToTopButton>Start Calculating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getCGSTSGSTIGSTSplitterFAQs() {
  return [
    {
      question: "When is GST split into CGST and SGST?",
      answer:
        "For intra-state supplies (same state/UT for supplier and place of supply), GST is typically split into CGST + SGST.",
    },
    {
      question: "When does IGST apply?",
      answer:
        "For inter-state supplies (different states/UTs), GST is charged as IGST.",
    },
    {
      question: "Is the CGST/SGST split always 50/50?",
      answer:
        "In the common case, yes. This tool uses the typical equal split for quick calculations. Validate special cases with official guidance.",
    },
    {
      question: "Does the tool store my invoice amounts?",
      answer: "No. The calculation runs in your browser and values aren’t stored on our servers.",
    },
  ];
}

registerToolFAQ("cgst-sgst-igst-splitter", getCGSTSGSTIGSTSplitterFAQs);

