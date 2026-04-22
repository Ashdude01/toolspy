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
  Zap,
  Shield,
  Settings,
  Image,
  FileText,
  BarChart3,
  Smartphone,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import NextImage from "next/image";
import Link from "next/link";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function FacebookImageDownloaderSEOContent() {
  const tool = getToolBySlug("facebook-image-downloader");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  // Neutral feature checklist (no unverified claims about other tools).
  const featureChecklist = [
    { feature: "Supports public post URLs", value: "Yes", note: "Works with standard facebook.com/.../posts/... links." },
    { feature: "Supports photo page URLs", value: "Yes", note: "Handles /photo/?fbid=... style links for public photos." },
    { feature: "Supports direct image URLs", value: "Yes", note: "JPG, PNG, WebP, and similar formats." },
    { feature: "Detects multiple images in one post", value: "Yes", note: "Gallery posts show each detected image separately." },
    { feature: "Private posts", value: "No", note: "Posts that require login generally can’t be extracted." },
    { feature: "Account or installation required", value: "No", note: "Runs in your browser." },
    { feature: "Mobile-friendly", value: "Yes", note: "Responsive layout." },
  ];

  const downloaderTypes = [
    {
      type: "Public post URL",
      description: "Extract images from a public Facebook post link.",
      useCase: "Save photos from public posts and galleries",
      precision: "Best success rate",
      example: "https://www.facebook.com/username/posts/...",
    },
    {
      type: "Photo page URL",
      description: "Works with photo page links that include an fbid parameter.",
      useCase: "Download a specific photo from a public photo page",
      precision: "Good",
      example: "https://www.facebook.com/photo/?fbid=...",
    },
    {
      type: "Direct image link",
      description: "If you have a direct image URL (jpg/png/webp), you can download it.",
      useCase: "Save a single image quickly",
      precision: "High",
      example: "https://.../image.jpg",
    },
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "No signup needed",
      description: "Use the tool without creating an account or installing an app.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast workflow",
      description: "Paste a link, analyze, and download detected images in a few clicks.",
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: "Full-size images when available",
      description:
        "If Facebook exposes a full-size image URL for the link, the tool shows that for download.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Works in your browser",
      description:
        "Runs on modern browsers on desktop and mobile.",
    },
  ];

  const designPrinciples = [
    {
      title: "Simple input, predictable output",
      advantages: [
        "Paste a URL, click Analyze, see detected images.",
        "Each image has its own download button.",
      ],
    },
    {
      title: "Works for common Facebook link types",
      advantages: [
        "Public post URLs, photo page URLs, and direct image links.",
      ],
    },
    {
      title: "Helpful when something fails",
      advantages: [
        "Clear error message when a post isn’t accessible.",
        "Troubleshooting tips in the error state.",
      ],
    },
  ];

  return (
    <article className="space-y-12 mt-16" aria-label="Guide and SEO content">
      {/* Related Tools */}
      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="facebook-image-downloader"
          title="Similar Tools You Might Like"
          description="Other tools that pair well with Facebook images and downloads."
        />
      </nav>

      {/* Introduction */}
      <section className="space-y-6" id="intro">
        <div className="text-center">
          <h2
            id="intro-heading"
            className="text-3xl sm:text-4xl font-bold leading-tight mb-3"
          >
            Download Facebook Images from Public Posts
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Use this Facebook image downloader to extract photos from a public post URL. It also
            works as a Facebook photo downloader for direct image links.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li>Paste a Facebook post URL and click Analyze.</li>
              <li>Works best for public posts you can open without logging in.</li>
              <li>Download each detected image at the highest size Facebook provides for that URL.</li>
            </ul>

            <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Note</p>
              <p>
                If a post is private or not accessible in your browser, this tool won&apos;t be able
                to extract its images.
              </p>
            </div>
          </div>

          <div className="relative">
            <NextImage
              width={1200}
              height={680}
              src={tool?.posterImage || ""}
              alt="Facebook Image Downloader tool preview"
              className="w-full rounded-2xl shadow-2xl border border-border h-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">How to use it</h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Follow these steps to download images from a public Facebook post:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">1. Paste URL</h4>
            <p className="text-sm text-muted-foreground">
              Paste the Facebook post or 
              profile URL containing the image.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">2. Analyze Content</h4>
            <p className="text-sm text-muted-foreground">
              Let the tool analyze and 
              detect available images.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">3. Select Images</h4>
            <p className="text-sm text-muted-foreground">
              Choose the images you want 
              to download.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">4. Download & Use</h4>
            <p className="text-sm text-muted-foreground">
              Download the images and 
              use them in your projects.
            </p>
          </Card>
        </div>
      </section>

      {/* Supported link types */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">Supported link types</h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          The tool understands three common ways of linking to a Facebook image.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {downloaderTypes.map((type, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Image className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{type.type}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Use Case:</strong> {type.useCase}</div>
                <div><strong>Precision:</strong> {type.precision}</div>
                <div><strong>Example:</strong> {type.example}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">What makes it easy to use</h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          A few design choices that keep the workflow short.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature checklist */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">What this tool supports</h3>
        <Card>
          <CardHeader>
            <CardTitle>Feature checklist</CardTitle>
            <CardDescription>
              A factual summary of what this Facebook photo downloader does and its limits.
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
                  {featureChecklist.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{row.feature}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
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

      {/* Design principles */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">How the page is designed</h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          A short summary of what this page focuses on.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {designPrinciples.map((item, index) => (
            <Card key={index} className="p-6">
              <h4 className="font-semibold mb-4 text-primary">{item.title}</h4>
              <ul className="space-y-2">
                {item.advantages.map((advantage, advIndex) => (
                  <li
                    key={advIndex}
                    className="text-sm flex items-start space-x-2"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Common use cases */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">Common use cases</h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Typical situations where this tool is useful.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Save your own photos</h4>
            <p className="text-sm text-muted-foreground">
              Re-download images you posted when you don’t have the originals.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Save public photos with permission</h4>
            <p className="text-sm text-muted-foreground">
              Grab a public image when you have the right to use it.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Smartphone className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Quickly download on mobile</h4>
            <p className="text-sm text-muted-foreground">
              Works in your mobile browser without installing an app.
            </p>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={getFacebookImageDownloaderFAQs()} />

      {/* User Reviews (must be visible if marked up) */}
      <section className="space-y-6" id="reviews">
        <h3 className="text-2xl font-bold text-center">User reviews</h3>

        {ratingSummary ? (
          <div className="text-center text-muted-foreground">
            <p className="text-base sm:text-lg">
              Rated <span className="font-semibold text-foreground">{ratingSummary.ratingValue}/5</span> based on{" "}
              <span className="font-semibold text-foreground">{ratingSummary.reviewCount}</span> review(s).
            </p>
          </div>
        ) : (
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            No reviews yet. If you used the tool, you can share feedback on our{" "}
            <Link className="underline underline-offset-4" href="/feedback">
              feedback page
            </Link>
            .
          </p>
        )}

        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.slice(0, 6).map((r, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold">{r.headline}</p>
                    <p className="text-sm text-muted-foreground">
                      {r.authorName} • {r.datePublished} • {r.ratingValue}/5
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{r.reviewBody}</p>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Notes */}
      <section className="space-y-6" id="notes">
        <div className="bg-muted/30 p-8 rounded-xl border">
          <h3 className="text-2xl font-bold text-center mb-6">Notes before you download</h3>
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-2 text-muted-foreground">
              <li>Public posts work best. Private posts generally can’t be extracted.</li>
              <li>Image quality depends on what Facebook exposes for that URL.</li>
              <li>Please download only content you have permission to use.</li>
              <li>If a link fails, try copying the direct image URL when available.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="space-y-6">
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Download Facebook Images?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Paste a public post URL, analyze, and download detected images in a couple of clicks.
          </p>
          <ScrollToTopButton>
            Start Downloading Now →
          </ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getFacebookImageDownloaderFAQs() {
  return [
    {
      question: "Is Toolspy's Facebook image downloader completely free to use?",
      answer:
        "Yes. This tool is free to use and doesn’t require signup.",
    },
    {
      question: "What Facebook links does this tool support?",
      answer:
        "It works best with public Facebook post URLs. It can also handle direct image links (jpg, png, webp, etc.).",
    },
    {
      question: "Can I download images from private posts?",
      answer:
        "No. If a post is private or requires login, the images usually can’t be extracted.",
    },
    {
      question: "Does it download multiple images from a single post?",
      answer:
        "Yes. If a post contains a gallery, the tool can detect multiple images and let you download them one by one.",
    },
    {
      question: "Do I need to install an app or log in?",
      answer:
        "No. It runs in your browser—no installation, and no Facebook login required.",
    },
    {
      question: "Is it safe to use?",
      answer:
        "The tool doesn’t ask for your Facebook credentials. Only use it for content you have permission to download, and prefer public posts you can access normally.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("facebook-image-downloader", getFacebookImageDownloaderFAQs);


