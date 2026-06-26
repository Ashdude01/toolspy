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
  QrCode,
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

export function EInvoiceQRValidatorSEOContent() {
  const tool = getToolBySlug("e-invoice-qr-validator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const whatItDoes = [
    {
      title: "Validate QR payload",
      body: "Reads the QR payload and checks that it parses correctly for a quick sanity check.",
    },
    {
      title: "Extract key fields",
      body: "Pulls out key invoice fields from the QR so you can review them without manual typing.",
    },
    {
      title: "Quick verification workflows",
      body: "Useful for accounts teams when cross-checking invoice details and records.",
    },
    {
      title: "Less copy/paste",
      body: "Cuts down on transcription mistakes when reviewing multiple invoices.",
    },
  ];

  const pitfalls = [
    {
      title: "Validation vs official status",
      body: "Parsing a QR payload is not the same as checking IRN status on the government system. Use official portals when you need authoritative status.",
    },
    {
      title: "Low-quality images",
      body: "Blurry screenshots or skewed photos can reduce QR readability. Use a clear, high-contrast image.",
    },
    {
      title: "Multiple QRs on a page",
      body: "If a scan includes multiple QR codes, crop to the relevant invoice QR for best results.",
    },
    {
      title: "Sensitive data handling",
      body: "QRs can contain invoice details. Avoid uploading sensitive documents unless the workflow and your policy allow it.",
    },
  ];

  const featureChecklist = [
    { feature: "QR payload parsing", value: "Yes", note: "Reads and parses invoice QR data." },
    { feature: "Field extraction", value: "Yes", note: "Shows key fields for review." },
    { feature: "Fast workflow", value: "Yes", note: "Designed for quick checks." },
    { feature: "Signup required", value: "No", note: "No account needed." },
  ];

  return (
    <article
      className="mx-auto max-w-5xl space-y-14 mt-16 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            E-Invoice QR Validator
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            Upload or scan an e-invoice QR code, parse the payload, and extract key fields for a
            quick verification workflow. For official status checks, use the relevant government
            portal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              This tool is built for quick invoice checks in day-to-day workflows - parse the QR,
              review fields, and cross-check against your records. It can help reduce manual typing
              errors and speed up reviews.
            </p>
            <p>
              Need GST calculations for invoice amounts too? Use the{" "}
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
                alt="E-invoice QR validator - upload a QR and extract invoice details"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="e-invoice-qr-validator"
          title="Similar Tools You Might Like"
          description="Other GST tools for checks and calculations."
        />
      </nav>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to validate an e-invoice QR"
          lead="Upload a clear QR image for best results."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload or scan</h3>
            <p className="text-sm text-muted-foreground">
              Use a clear, high-contrast QR image or scan.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Parse and extract</h3>
            <p className="text-sm text-muted-foreground">
              The tool parses the payload and extracts key fields.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Cross-check</h3>
            <p className="text-sm text-muted-foreground">
              Compare extracted fields with your invoice and records.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-6" id="what-it-does">
        <SectionHeader eyebrow="Output" icon={QrCode} title="What this tool helps with" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whatItDoes.map((x) => (
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
            <CardDescription>A factual summary of what the validator does.</CardDescription>
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

      <FAQ faqs={getEInvoiceQRValidatorFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Need a quick QR check?</h2>
          <p className="text-muted-foreground">
            Upload a clear QR image to parse and review key fields.
          </p>
          <ScrollToTopButton>Validate QR →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getEInvoiceQRValidatorFAQs() {
  return [
    {
      question: "Does this check IRN status officially?",
      answer:
        "This tool parses and extracts QR payload fields for quick review. For authoritative IRN status, use the official government portal.",
    },
    {
      question: "Why does the QR fail to read?",
      answer:
        "Low-resolution, skewed, or blurry images can reduce readability. Try a clearer scan or crop to the QR area.",
    },
    {
      question: "Does the tool store uploaded files?",
      answer:
        "The tool is intended for quick processing. Avoid uploading sensitive documents unless you trust the workflow for this tool and your policy allows it.",
    },
    {
      question: "What should I do after extraction?",
      answer:
        "Cross-check extracted fields with your invoice data and records. Use official systems if you need compliance-grade verification.",
    },
  ];
}

registerToolFAQ("e-invoice-qr-validator", getEInvoiceQRValidatorFAQs);

