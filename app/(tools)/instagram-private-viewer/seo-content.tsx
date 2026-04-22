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
  Image as ImageIcon,
  Lightbulb,
  ListChecks,
  MessagesSquare,
  Rocket,
  Sigma,
  User,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function InstagramPrivateViewerSEOContent() {
  const tool = getToolBySlug("instagram-private-viewer");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const useCases = [
    {
      title: "Public profile pictures",
      body: "View and download public Instagram profile pictures (DP) when they’re accessible.",
    },
    {
      title: "Brand checks",
      body: "Quickly grab an avatar for internal docs or brand audits (respecting rights and policies).",
    },
    {
      title: "Contact directories",
      body: "Save a profile picture for internal contact lists when the profile is public and allowed.",
    },
    {
      title: "Design references",
      body: "Use a DP as a reference for shape/cropping in UI design — not for impersonation.",
    },
  ];

  const pitfalls = [
    {
      title: "This is not a private account viewer",
      body: "Private account content is not accessible. This tool focuses on profile pictures when viewable.",
    },
    {
      title: "Usernames change",
      body: "If the username changed or the account was deleted, links and lookups won’t work.",
    },
    {
      title: "Rate limits and restrictions",
      body: "Platforms can restrict access. If content isn’t accessible, the tool can’t fetch it.",
    },
    {
      title: "Ethics and policy",
      body: "Don’t use this tool for harassment, impersonation, or violating platform rules. Only access content you’re allowed to view.",
    },
  ];

  const featureChecklist = [
    { feature: "Public DP download", value: "Yes", note: "Works when the profile picture is accessible." },
    { feature: "Private posts/stories viewing", value: "No", note: "Not supported." },
    { feature: "Username input", value: "Yes", note: "Use a valid username/profile URL." },
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
            Instagram DP Downloader (Profile Picture)
          </h1>
          <p className="text-start md:text-center text-muted-foreground">
            View and download an Instagram profile picture (DP) when it’s publicly accessible. This
            tool does not provide access to private posts, stories, or private account content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Instagram profile pictures are often shown at small sizes in-app. When the DP is
              accessible, this tool helps you fetch and download the best available version for
              legitimate uses like internal documentation or design reference.
            </p>
            <p>
              Want to download Reels from a public link? Try the{" "}
              <Link
                href="/instagram-reels-downloader"
                className="underline underline-offset-4 text-foreground"
              >
                Instagram Reels downloader
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
                alt="Instagram DP downloader — get a profile picture when accessible"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="instagram-private-viewer"
          title="Similar Tools You Might Like"
          description="Other tools for working with social media content."
        />
      </nav>

      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to download an Instagram DP"
          lead="Paste a public profile link or username, then download the image."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Enter username or URL</h3>
            <p className="text-sm text-muted-foreground">
              Use a valid profile username or profile link.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Preview DP</h3>
            <p className="text-sm text-muted-foreground">
              If accessible, you’ll see the DP and available size.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Download</h3>
            <p className="text-sm text-muted-foreground">
              Save the image for legitimate use cases.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-6" id="use-cases">
        <SectionHeader eyebrow="Use cases" icon={Sigma} title="Common uses" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {useCases.map((x) => (
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
            <CardDescription>A factual summary of what the downloader does.</CardDescription>
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

      <FAQ faqs={getInstagramPrivateViewerFAQs()} />

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
          <h2 className="text-2xl font-bold tracking-tight">Need a profile picture?</h2>
          <p className="text-muted-foreground">
            Enter a username and download the DP if it’s accessible.
          </p>
          <ScrollToTopButton>Download DP →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

export function getInstagramPrivateViewerFAQs() {
  return [
    {
      question: "Does this let me view private Instagram accounts?",
      answer:
        "No. This tool does not provide access to private posts/stories. It’s intended for profile pictures (DP) when they’re publicly accessible.",
    },
    {
      question: "Why can’t I download a DP for some accounts?",
      answer:
        "If the profile picture isn’t accessible due to privacy settings or platform restrictions, the tool can’t fetch it.",
    },
    {
      question: "Can I use downloaded images anywhere?",
      answer:
        "Respect rights and platform policies. Don’t use images for impersonation, harassment, or policy violations.",
    },
    {
      question: "Does the tool store what I search?",
      answer:
        "The tool fetches content based on the username/link to provide a download. Avoid using it for targets you’re not authorized to access.",
    },
  ];
}

registerToolFAQ("instagram-private-viewer", getInstagramPrivateViewerFAQs);

