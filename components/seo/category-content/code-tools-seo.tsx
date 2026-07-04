/**
 * Pillar SEO content for the Code Tools category page (/tools/code-tools/).
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
    question: "Is my code sent to a server?",
    answer:
      "No - formatting and minification run entirely in your browser, which makes the tool safe for proprietary code.",
  },
  {
    question: "Does beautifying change how the code runs?",
    answer:
      "No. Formatting only changes whitespace and layout, not logic. Minification removes comments, which is also behavior-neutral.",
  },
  {
    question: "Can it un-minify variable names?",
    answer:
      "No tool can restore original variable names lost in minification - beautifying restores structure and readability, not identifiers.",
  },
  {
    question: "Which languages are supported?",
    answer:
      "JavaScript, CSS, and HTML, which covers the inline and embedded code most people need to clean up.",
  },
  {
    question: "Is there a size limit?",
    answer:
      "Typical files and bundles work fine; extremely large bundles depend on your browser's memory.",
  },
];

export function CodeToolsSEOContent() {
  const tools = getToolsByCategory()["code-tools"] || [];
  // Poster image dynamically fetched from tools-data (flagship tool of this category)
  const posterImage =
    tools.find((t) => t.slug === "code-beautifier")?.posterImage ||
    tools.find((t) => t.posterImage)?.posterImage;

  registerToolFAQ("code-tools", categoryFaqs);

  return (
    <article className="mx-auto max-w-7xl space-y-14 mt-16 mb-20 px-4 text-base sm:text-[17px] leading-relaxed">
      {/* Intro */}
      <section className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          Code Tools - Beautify & Minify JavaScript, CSS and HTML
        </h2>
        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Code from the wild rarely arrives readable: a minified bundle you need to debug, a snippet from an old site with chaotic indentation, an inline style block that has grown wild. Toolspy&apos;s code tools beautify JavaScript, CSS, and HTML into consistently formatted, readable code - and minify in the other direction when you need compact output for production.
            </p>
            <p>
              Formatting runs in your browser with syntax highlighting, so proprietary code never leaves your machine.
            </p>
          </div>
          {posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={posterImage}
                width={1600}
                height={900}
                alt="Code beautifier and minifier for JavaScript, CSS and HTML with syntax highlighting"
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
        <h3 className="text-2xl font-semibold tracking-tight">Beautify vs minify - when to use which</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Two directions, different goals</CardTitle>
            <CardDescription>The same tool, used at opposite ends of the workflow.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Direction</th>
                    <th className="text-left p-3 font-medium">When</th>
                    <th className="text-left p-3 font-medium">Effect</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Beautify", "Debugging minified code, reviewing third-party snippets, cleaning legacy files", "Consistent indentation, one statement per line, readable structure"],
                    ["Minify", "Shipping to production, embedding inline scripts/styles, size-limited environments", "Whitespace and comments stripped - smaller transfer size"]
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
        <h3 className="text-2xl font-semibold tracking-tight">Common situations</h3>
        <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Debugging production issues</h4>
              <p className="text-sm text-muted-foreground">Beautify a minified bundle enough to read the logic around an error position when source maps are not available.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Inheriting old code</h4>
              <p className="text-sm text-muted-foreground">Normalize formatting on legacy HTML/CSS/JS before starting real work - diffs become meaningful again.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Email and CMS embeds</h4>
              <p className="text-sm text-muted-foreground">Minify inline CSS/JS before pasting into systems that count characters or dislike line breaks.</p>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-1">Learning from other sites</h4>
              <p className="text-sm text-muted-foreground">Format view-source output into something you can actually study.</p>
            </Card>
        </div>
      </section>

      {/* How to */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">How to use (3 steps)</h3>
        <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">1. Paste your code</h4>
              <p className="text-sm text-muted-foreground">JavaScript, CSS, or HTML - the tool highlights syntax as you go.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">2. Choose direction</h4>
              <p className="text-sm text-muted-foreground">Beautify for readability or minify for size.</p>
            </Card>
            <Card className="p-5 bg-muted/40">
              <h4 className="font-semibold mb-1">3. Copy the result</h4>
              <p className="text-sm text-muted-foreground">One click to copy the formatted output back into your editor.</p>
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
          All formatting happens locally in your browser.{" "}
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
