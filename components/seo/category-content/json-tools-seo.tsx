/**
 * Pillar SEO content for the JSON Tools category page (/tools/json-tools/).
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
    question: "Is pasted JSON sent to a server?",
    answer:
      "No - parsing, formatting, and conversion all run in your browser. Internal API data stays on your machine.",
  },
  {
    question: "How large a JSON file can it handle?",
    answer:
      "Typical API responses and configs (up to several MB) work smoothly. Extremely large files depend on your browser's memory.",
  },
  {
    question: "What JSON shape converts best to a table?",
    answer:
      "An array of flat objects maps directly to rows and columns. Nested objects are flattened with dotted column names where possible.",
  },
  {
    question: "Does the validator support JSON with comments?",
    answer:
      "Standard JSON does not allow comments, so files with comments (JSONC) will flag errors at the comment positions - strip comments first.",
  },
  {
    question: "Can I convert Excel back to JSON?",
    answer:
      "Yes - the table converter works both directions: JSON to CSV/Excel and tabular data back to a JSON array.",
  },
];

export function JSONToolsSEOContent() {
  const tools = getToolsByCategory()["json-tools"] || [];
  // Poster image dynamically fetched from tools-data (flagship tool of this category)
  const posterImage =
    tools.find((t) => t.slug === "json-formatter")?.posterImage ||
    tools.find((t) => t.posterImage)?.posterImage;

  registerToolFAQ("json-tools", categoryFaqs);

  return (
    <article className="mx-auto max-w-7xl space-y-14 mt-16 mb-20 px-4 text-base sm:text-[17px] leading-relaxed">
      {/* Intro */}
      <section className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          JSON Tools - Format, Validate & Convert JSON to Tables
        </h2>
        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Minified JSON from an API response is unreadable; a missing comma breaks a config silently; a stakeholder wants the data in Excel, not braces. Toolspy&apos;s {tools.length} JSON tools solve exactly these: a formatter/validator with tree view, minify/beautify, and a converter that turns JSON arrays into CSV or Excel tables (and back).
            </p>
            <p>
              Paste with confidence - parsing happens in your browser, so API responses containing internal data never leave your machine.
            </p>
          </div>
          {posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={posterImage}
                width={1600}
                height={900}
                alt="JSON formatter and validator with tree view, plus JSON to CSV and Excel conversion"
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
        <h3 className="text-2xl font-semibold tracking-tight">JSON tasks - quick reference</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">From problem to tool</CardTitle>
            <CardDescription>The three JSON situations these tools handle.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Situation</th>
                    <th className="text-left p-3 font-medium">Tool</th>
                    <th className="text-left p-3 font-medium">Output</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Unreadable minified API response", "JSON Formatter", "Indented, collapsible tree view"],
                    ["Config fails and you cannot see why", "JSON Validator", "Exact error location (line/character)"],
                    ["Ship compact JSON to production", "Minify", "Whitespace stripped, bytes saved"],
                    ["Stakeholder wants a spreadsheet", "JSON to Table Converter", "CSV or Excel from a JSON array"],
                    ["Spreadsheet needs to become an API payload", "Table to JSON", "Clean JSON array from rows"]
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
        <h3 className="text-2xl font-semibold tracking-tight">Who reaches for these</h3>
        <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <h4 className="font-semibold mb-1">API debugging</h4>
              <p className="text-sm text-muted-foreground">Paste a raw response, format it, and walk the tree to find the field you need - faster than console.log gymnastics.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Config troubleshooting</h4>
              <p className="text-sm text-muted-foreground">package.json, tsconfig, CI configs - the validator points to the exact character where parsing fails.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Data handoffs</h4>
              <p className="text-sm text-muted-foreground">Convert a JSON export into Excel for analysts, or a client&apos;s spreadsheet into JSON for your seed script.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Payload optimization</h4>
              <p className="text-sm text-muted-foreground">Minify large JSON blobs before embedding or shipping where every kilobyte counts.</p>
            </Card>
        </div>
      </section>

      {/* How to */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">How to use (3 steps)</h3>
        <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">1. Paste your JSON</h4>
              <p className="text-sm text-muted-foreground">Direct from the network tab, a log, a file, or an API client.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">2. Format, validate, or convert</h4>
              <p className="text-sm text-muted-foreground">Errors surface with line numbers; valid JSON renders as a collapsible tree.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">3. Copy or export</h4>
              <p className="text-sm text-muted-foreground">Copy the cleaned JSON, or download CSV/Excel from the table converter.</p>
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
          All JSON processing happens locally in your browser.{" "}
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
