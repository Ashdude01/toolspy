/**
 * Pillar SEO content for the Utility Tools category page (/tools/misc-tools/).
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
    question: "Are the QR codes free for commercial use?",
    answer:
      "Yes - generated QR codes are yours to use anywhere, including menus, packaging, and ads, with no watermark or expiry.",
  },
  {
    question: "How current are the currency rates?",
    answer:
      "The converter uses regularly refreshed market rates. For contractual or banking purposes, always confirm the rate your bank applies.",
  },
  {
    question: "What does WHOIS actually show?",
    answer:
      "Registrar, registration and expiry dates, and name servers. Owner details are often redacted for privacy under GDPR-era rules.",
  },
  {
    question: "Do the converters work offline?",
    answer:
      "Unit conversions run fully in your browser. Currency conversion and WHOIS need a connection to fetch live data.",
  },
  {
    question: "Is anything I enter stored?",
    answer:
      "No - inputs are processed for your session only. Tools that must call an API (currency, WHOIS, screenshots) send only the query itself.",
  },
];

export function MiscToolsSEOContent() {
  const tools = getToolsByCategory()["misc-tools"] || [];
  // Poster image dynamically fetched from tools-data (flagship tool of this category)
  const posterImage =
    tools.find((t) => t.slug === "qr-code-generator")?.posterImage ||
    tools.find((t) => t.posterImage)?.posterImage;

  registerToolFAQ("misc-tools", categoryFaqs);

  return (
    <article className="mx-auto max-w-7xl space-y-14 mt-16 mb-20 px-4 text-base sm:text-[17px] leading-relaxed">
      {/* Intro */}
      <section className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          Utility Tools - QR Codes, Converters, Color Pickers & Domain Research
        </h2>
        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The tools you reach for a dozen times a week without ceremony: generate a QR code for a link, convert units or currencies, grab a color&apos;s hex code, check who owns a domain, screenshot a webpage. Toolspy&apos;s {tools.length} utilities are single-purpose and instant - open, use, done.
            </p>
            <p>
              Like the rest of the platform, they are free, need no account, and process locally in the browser wherever the task allows it.
            </p>
          </div>
          {posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={posterImage}
                width={1600}
                height={900}
                alt="Utility tools - QR code generator, unit and currency converters, color picker, WHOIS lookup"
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
        <h3 className="text-2xl font-semibold tracking-tight">Utilities quick reference</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What each utility answers</CardTitle>
            <CardDescription>One line per tool - jump straight to the one that fits.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Tool</th>
                    <th className="text-left p-3 font-medium">What It Answers</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["QR Code Generator", "How do I make this link scannable on posters, menus, or slides?"],
                    ["Unit / Length / Weight / Volume / Area / Temperature Converters", "What is this measurement in the unit I need?"],
                    ["Currency Converter", "What is this amount in another currency at current rates?"],
                    ["Color Picker & Palette Generator", "What exact hex/RGB is this color, and what palette works with it?"],
                    ["Domain WHOIS Lookup", "Who registered this domain and when does it expire?"],
                    ["Expired Domain Finder", "Which dropped domains have existing authority worth building on?"],
                    ["Website Screenshot", "How does this page render, captured full-page or by device size?"],
                    ["File Protector", "How do I password-protect a file before sharing it?"],
                    ["Google Indexing API Tool", "How do I ask Google to crawl my URL faster?"]
                  ].map((row, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{row[0]}</td>
                      <td className="p-3 text-muted-foreground">{row[1]}</td>
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
        <h3 className="text-2xl font-semibold tracking-tight">Where these fit day to day</h3>
        <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Marketing & events</h4>
              <p className="text-sm text-muted-foreground">QR codes on print material, palettes for brand assets, and full-page screenshots for campaign archives or client approvals.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Developers & designers</h4>
              <p className="text-sm text-muted-foreground">Exact color values, quick unit math for layouts, and screenshots at device presets for testing.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">SEO & domain research</h4>
              <p className="text-sm text-muted-foreground">WHOIS details before an acquisition, expired domains with existing backlinks, and Indexing API pings for fresh URLs.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Everyday sharing</h4>
              <p className="text-sm text-muted-foreground">Currency checks while shopping internationally, and password-protecting a file before emailing it.</p>
            </Card>
        </div>
      </section>

      {/* How to */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">How to use (3 steps)</h3>
        <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">1. Open the tool</h4>
              <p className="text-sm text-muted-foreground">Each utility is a single page with one job - no setup or configuration.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">2. Enter your input</h4>
              <p className="text-sm text-muted-foreground">A URL, amount, color, domain, or file depending on the tool.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">3. Copy or download</h4>
              <p className="text-sm text-muted-foreground">Results are copyable or downloadable instantly - QR codes as images, screenshots as files, palettes as CSS/JSON.</p>
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
          Utility outputs (rates, WHOIS data, screenshots) reflect the data available at the moment you run them.{" "}
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
