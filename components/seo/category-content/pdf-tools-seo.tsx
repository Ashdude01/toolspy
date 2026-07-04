/**
 * Pillar SEO content for the PDF Tools category page (/tools/pdf-tools/).
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
    question: "Are my PDFs uploaded anywhere?",
    answer:
      "No. Merging, splitting, compressing, and password removal run entirely in your browser - your documents never reach a server.",
  },
  {
    question: "Can I compress a PDF to exactly 100KB?",
    answer:
      "The compressor targets common portal limits like 100KB and 200KB. Very image-heavy scans may need a stronger preset or fewer pages to hit tight targets.",
  },
  {
    question: "Can you unlock a PDF without the password?",
    answer:
      "No. The password remover decrypts using the correct password you provide. Cracking unknown passwords is not supported.",
  },
  {
    question: "Will merging or compressing add a watermark?",
    answer:
      "No. Output files are clean, with no watermark and no branding.",
  },
  {
    question: "Does PDF to Excel work on scanned documents?",
    answer:
      "Table extraction works best on digitally created PDFs. For scans, run OCR first with the OCR Text Extractor, then export.",
  },
];

export function PDFToolsSEOContent() {
  const tools = getToolsByCategory()["pdf-tools"] || [];
  // Poster image dynamically fetched from tools-data (flagship tool of this category)
  const posterImage =
    tools.find((t) => t.slug === "compress-pdf")?.posterImage ||
    tools.find((t) => t.posterImage)?.posterImage;

  registerToolFAQ("pdf-tools", categoryFaqs);

  return (
    <article className="mx-auto max-w-7xl space-y-14 mt-16 mb-20 px-4 text-base sm:text-[17px] leading-relaxed">
      {/* Intro */}
      <section className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          Free PDF Tools - Merge, Split, Compress & Convert Without Uploading
        </h2>
        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              PDFs are where important documents live - bank statements, contracts, certificates, application forms. Toolspy&apos;s {tools.length} PDF tools cover the everyday operations: merge multiple files into one, split by page ranges, compress to portal-friendly sizes like 100KB or 200KB, convert images to PDF and back, extract tables to Excel or CSV, and remove a known password.
            </p>
            <p>
              The privacy model is the point: processing happens in your browser, so a bank statement or signed contract is never transmitted to a server. Free, no signup, no watermarks on output.
            </p>
          </div>
          {posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={posterImage}
                width={1600}
                height={900}
                alt="Free PDF tools - merge, split, compress to 100KB, remove password, convert PDF privately"
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
        <h3 className="text-2xl font-semibold tracking-tight">Common PDF tasks - quick reference</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Which tool for which job</CardTitle>
            <CardDescription>Match the task to the right tool before you start.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Task</th>
                    <th className="text-left p-3 font-medium">Tool</th>
                    <th className="text-left p-3 font-medium">Good To Know</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Combine documents into one file", "Merge PDF", "Order is preserved; no page limit for typical files"],
                    ["Send only certain pages", "Split PDF", "Extract by page ranges into separate files"],
                    ["Meet a portal size limit", "Compress PDF", "Target ~100KB/200KB; text stays readable"],
                    ["Convert photos/scans to PDF", "Image to PDF / JFIF to PDF / HEIC to PDF", "One page per image, clean output"],
                    ["Get tables out of a PDF", "PDF to Excel / PDF to CSV", "Works best on digital (non-scanned) tables"],
                    ["Stop typing a password every time", "PDF Password Remover", "Requires the correct existing password"]
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
        <h3 className="text-2xl font-semibold tracking-tight">Where these tools save the most time</h3>
        <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Visa, bank & government portals</h4>
              <p className="text-sm text-muted-foreground">Portals commonly cap documents at 100KB-500KB. Compress the PDF to the target, or merge multiple certificates into a single file when the form allows only one upload.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Financial documents</h4>
              <p className="text-sm text-muted-foreground">Bank statements and salary slips arrive password-protected. Enter the password once, strip it, and archive the readable copy - all inside your browser.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Reports & data extraction</h4>
              <p className="text-sm text-muted-foreground">Pull tabular data out of PDF reports into Excel or CSV instead of retyping it.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Scans and photos as documents</h4>
              <p className="text-sm text-muted-foreground">Turn phone photos of certificates (including iPhone HEIC files) into clean single-page PDFs for submissions.</p>
            </Card>
        </div>
      </section>

      {/* How to */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">How to prepare a document for a strict portal (3 steps)</h3>
        <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">1. Assemble</h4>
              <p className="text-sm text-muted-foreground">Merge the required pages into one PDF, or split out only the pages the portal asks for.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">2. Compress to target</h4>
              <p className="text-sm text-muted-foreground">Use the compressor&apos;s size target that matches the portal limit (e.g., 200KB), then check the text is still crisp.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">3. Verify before upload</h4>
              <p className="text-sm text-muted-foreground">Open the final file, confirm page order and readability, and check the file size in your file manager.</p>
            </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold tracking-tight">Deep-dive guides</h3>
        <ul className="space-y-3 text-muted-foreground list-disc pl-6">
          <li>
            <Link href="/blog/remove-pdf-password-when-is-it-legal/" className="underline underline-offset-4 text-foreground">
              Removing a PDF password: how it works and when it is legal
            </Link>{" "}
            - owner vs user passwords and the client-side privacy angle.
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Frequently Asked Questions</h3>
        <FAQ faqs={categoryFaqs()} />
      </section>

      {/* Note */}
      <section className="text-sm text-muted-foreground border rounded-lg p-4">
        <p>
          All PDF processing happens locally in your browser. Only remove passwords from documents you own or are authorized to access.{" "}
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
