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
  Unlock,
  ListChecks,
  Lightbulb,
  MessagesSquare,
  ShieldCheck,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function PdfPasswordRemoverSEOContent() {
  const tool = getToolBySlug("pdf-password-remover");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const whenItMakesSense = [
    {
      title: "Your own files",
      body: "Bank statements, payslips, insurance PDFs you receive - removing the password for your own archive is fine.",
    },
    {
      title: "Shared work files",
      body: "When you know the password and want to pass the document on without the extra step each time.",
    },
    {
      title: "Accessibility",
      body: "Some screen readers and PDF viewers struggle with locked files. An unlocked copy is easier to read.",
    },
    {
      title: "Printing & merging",
      body: "Many PDF tools refuse password-protected inputs. Unlock, then merge / compress / print as usual.",
    },
  ];

  const featureChecklist = [
    { feature: "Remove user (open) password", value: "Yes", note: "You must know the password - the tool doesn’t crack PDFs." },
    { feature: "Remove owner permissions", value: "Yes", note: "Allow copy, edit, or print on unlocked PDFs you own." },
    { feature: "Batch unlock", value: "Yes", note: "Queue multiple PDFs and download as ZIP." },
    { feature: "Preserve text & links", value: "Yes", note: "Content, bookmarks, and internal links stay intact." },
    { feature: "Works offline in browser", value: "Yes", note: "Processing happens locally, not on our servers." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const pitfalls = [
    {
      title: "Using it on PDFs you don’t own",
      body: "Only unlock PDFs you have rights to. Respect the owner’s intent and the law in your jurisdiction.",
    },
    {
      title: "Forgetting the password",
      body: "This tool is not a password cracker. If you don’t know the password, you can’t remove it here.",
    },
    {
      title: "Assuming the file is signed",
      body: "Digitally signed PDFs may invalidate their signature if edited. Check before removing restrictions on signed documents.",
    },
    {
      title: "Sharing the unlocked copy widely",
      body: "The original was locked for a reason. Think twice before emailing the unlocked version to a wide audience.",
    },
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
            PDF Password Remover
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            A fast online PDF password remover and PDF unlocker. Remove passwords from PDFs you
            own so you can view, edit, or share them freely - runs in your browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Use this PDF password remover to unlock PDF files when you already know the
              password. Enter the password once, and the tool strips both the open password and
              owner permissions so the resulting file is easier to work with across readers,
              editors, and merge / compress tools.
            </p>
            <p>
              Common for bank statements, insurance PDFs, and shared work documents. Unlocking
              runs locally in your browser - your passwords and files never leave your device.
              This is not a cracker: you must know the password.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="PDF password remover - upload a locked PDF, enter the password, download the unlocked file"
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
          currentToolSlug="pdf-password-remover"
          title="Similar Tools You Might Like"
          description="Other PDF utilities that pair well."
        />
      </nav>

      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to remove a PDF password"
          lead="Three steps to an unlocked PDF."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drop the password-protected PDF you want to unlock.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Enter password</h3>
            <p className="text-sm text-muted-foreground">
              Type the password. It’s used only to unlock the file, nothing more.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save the unlocked PDF, ready to share or edit.
            </p>
          </Card>
        </div>
      </section>

      {/* When it makes sense */}
      <section className="space-y-6" id="use-cases">
        <SectionHeader
          eyebrow="When it helps"
          icon={Unlock}
          title="Common reasons to unlock a PDF"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whenItMakesSense.map((u) => (
            <Card key={u.title} className="p-5">
              <h3 className="font-semibold mb-1">{u.title}</h3>
              <p className="text-sm text-muted-foreground">{u.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Ethics / scope */}
      <section className="space-y-4" id="ethics">
        <SectionHeader
          eyebrow="Important"
          icon={ShieldCheck}
          title="Only remove passwords from PDFs you own"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool is not a password cracker. It can only remove a password when you already
            know it. Use it for your own documents - bank statements, receipts, work files with
            a known password - not to bypass security on someone else&apos;s content.
          </p>
          <p>
            Digitally signed PDFs may invalidate their signature once modified. If signatures
            matter (legal, compliance), verify the original before removing restrictions.
          </p>
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
              A factual summary of what the PDF password remover does.
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
        <SectionHeader title="Related PDF tools" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Merge several unlocked PDFs:{" "}
            <Link href="/merge-pdf" className="underline underline-offset-4 text-foreground">
              merge PDF
            </Link>
            .
          </p>
          <p>
            Shrink the unlocked PDF before sharing:{" "}
            <Link href="/compress-pdf" className="underline underline-offset-4 text-foreground">
              PDF compressor
            </Link>
            .
          </p>
          <p>
            Need editable text?{" "}
            <Link href="/pdf-to-word" className="underline underline-offset-4 text-foreground">
              PDF to Word
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getPdfPasswordRemoverFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Ready to unlock your PDF?</h2>
          <p className="text-muted-foreground">
            Upload the locked PDF, enter the password, and download an unlocked copy in
            seconds.
          </p>
          <ScrollToTopButton>Start Unlocking →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getPdfPasswordRemoverFAQs() {
  return [
    {
      question: "Is the PDF password remover free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "Can this tool crack a PDF password?",
      answer:
        "No. It’s not a password cracker. You must know the password to unlock the PDF. The tool uses the password you provide to remove the protection from the file.",
    },
    {
      question: "Which kinds of passwords can be removed?",
      answer:
        "Both the open (user) password and owner permissions (copy / edit / print restrictions) can be removed from PDFs you own, as long as you know the password where required.",
    },
    {
      question: "Is it safe to upload a sensitive PDF?",
      answer:
        "Unlocking runs in your browser. The PDF and password stay on your device - they are not uploaded to our servers.",
    },
    {
      question: "Will the PDF content change?",
      answer:
        "No. Text, bookmarks, and internal links are preserved. Only the security layer is removed.",
    },
    {
      question: "Can I unlock many PDFs at once?",
      answer:
        "Yes. Queue multiple PDFs, enter the password for each, and download the unlocked files as a ZIP.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("pdf-password-remover", getPdfPasswordRemoverFAQs);
