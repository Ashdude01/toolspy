/**
 * Pillar SEO content for the GST/MSME Toolkit category page (/tools/gst-tools/).
 * Server-rendered so crawlers get the full guide in HTML.
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calculator,
  FileText,
  Percent,
  Shield,
  TrendingUp,
  Landmark,
  Receipt,
} from "lucide-react";
import { getToolsByCategory } from "@/lib/tools-data";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import NextImage from "next/image";
import Link from "next/link";

const gstFaqs = () => [
  {
    question: "Are Toolspy's GST calculators free to use?",
    answer:
      "Yes. Every tool in the GST/MSME toolkit is completely free with no registration, no usage limits, and no watermarks. The toolkit is built for small businesses, freelancers, and accountants who need quick, accurate GST math without a paid suite.",
  },
  {
    question: "How do I calculate GST from an inclusive (MRP) price?",
    answer:
      "Use the reverse GST formula: Base amount = Inclusive price × 100 / (100 + GST rate). For example, ₹1,180 at 18% GST gives a base of ₹1,000 and a GST component of ₹180. The Reverse GST Calculator does this instantly for any slab.",
  },
  {
    question: "What is the difference between CGST, SGST, and IGST?",
    answer:
      "For intra-state supplies (seller and buyer in the same state), GST is split equally into CGST (central) and SGST (state). For inter-state supplies, the full amount is charged as IGST. The CGST/SGST/IGST Splitter applies this rule automatically.",
  },
  {
    question: "How much late fee applies if I miss a GSTR-3B deadline?",
    answer:
      "Under the commonly applicable structure, nil returns attract ₹20/day (capped at ₹500) and regular returns ₹50/day, with caps of ₹2,000 to ₹10,000 depending on turnover. Interest at 18% p.a. applies separately on late-paid tax. The Late Fee Calculator computes both from your dates.",
  },
  {
    question: "Can these tools replace my Chartered Accountant?",
    answer:
      "No - they complement professional advice. The tools give instant, indicative figures for planning, invoicing, and sanity checks. GST provisions change through notifications, so always confirm filings and edge cases with a CA or the latest CBIC circulars.",
  },
  {
    question: "Is my business data safe in these calculators?",
    answer:
      "Yes. Calculations run in your browser - amounts, invoices, and tax figures are not uploaded to or stored on any server. See the Privacy Policy for details.",
  },
];

export function GSTToolsSEOContent() {
  const gstTools = getToolsByCategory()["gst-tools"] || [];
  // Poster image dynamically fetched from tools-data (flagship tool of this category)
  const posterImage =
    gstTools.find((t) => t.slug === "gst-calculator")?.posterImage ||
    gstTools.find((t) => t.posterImage)?.posterImage;

  // Register FAQs for structured data
  registerToolFAQ("gst-tools", gstFaqs);

  const useCases = [
    {
      icon: <Receipt className="h-6 w-6" />,
      title: "Invoicing & quotations",
      body: "Quote a customer a clean inclusive price, then back-compute the taxable value and GST split for the invoice with the reverse GST and CGST/SGST/IGST tools.",
    },
    {
      icon: <Landmark className="h-6 w-6" />,
      title: "Monthly return filing",
      body: "Before GSTR-1 (11th) and GSTR-3B (20th/22nd/24th), verify tax amounts, check claimable ITC, and - if you missed a date - compute the exact late fee and interest.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Scheme selection",
      body: "New or growing business? Compare composition vs regular scheme liability with real numbers before choosing, instead of guessing.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Vendor & invoice verification",
      body: "Validate e-invoice QR codes and look up HSN/SAC codes with rates to confirm a vendor has charged GST correctly.",
    },
  ];

  const rateTable = [
    ["0%", "Essential food grains, fresh produce, books", "No GST charged"],
    ["5%", "Packaged food items, footwear (budget), transport services", "₹100 base → ₹105"],
    ["12%", "Processed foods, business-class air travel, some electronics", "₹100 base → ₹112"],
    ["18%", "Most services, electronics, restaurants (non-luxury)", "₹100 base → ₹118"],
    ["28%", "Luxury goods, automobiles, aerated drinks", "₹100 base → ₹128"],
  ];

  return (
    <article className="mx-auto max-w-7xl space-y-14 mt-16 mb-20 px-4 text-base sm:text-[17px] leading-relaxed">
      {/* Intro */}
      <section className="space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          The Complete Free GST Toolkit for Indian Businesses
        </h2>
        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              GST compliance in India is a monthly rhythm: raise invoices with the right tax
              split, file GSTR-1 by the 11th, GSTR-3B by the 20th, claim the correct input tax
              credit, and avoid late fees that quietly stack up per day. Toolspy&apos;s GST/MSME
              toolkit puts every calculation in that rhythm - forward GST, reverse GST, HSN/SAC
              lookup, ITC, scheme comparison, e-invoice validation, and penalty math - into{" "}
              {gstTools.length} free, browser-based tools.
            </p>
            <p>
              Everything runs client-side: your amounts and invoice data never leave your device.
              No signup, no limits, no &quot;pro plan&quot;. Built for MSMEs, freelancers, shop
              owners, and the CAs who support them.
            </p>
          </div>
          {posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={posterImage}
                width={1600}
                height={900}
                alt="GST toolkit - free GST calculator, reverse GST, HSN finder and late fee calculator"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>

      {/* Tools in this toolkit */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Tools in this toolkit</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {gstTools.map((tool) => (
            <Link key={tool.id} href={tool.path} className="group block h-full">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    {tool.icon} {tool.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* GST rates reference */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">
          GST rate slabs - quick reference
        </h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">India GST slabs with examples</CardTitle>
            <CardDescription>
              Rates and classifications change via CBIC notifications - verify the current rate
              for your specific HSN/SAC code with the{" "}
              <Link href="/hsn-sac-finder/" className="underline underline-offset-4">
                HSN/SAC Code Finder
              </Link>
              .
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Slab</th>
                    <th className="text-left p-3 font-medium">Typical Items</th>
                    <th className="text-left p-3 font-medium">Effect on ₹100</th>
                  </tr>
                </thead>
                <tbody>
                  {rateTable.map((row, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{row[0]}</td>
                      <td className="p-3 text-muted-foreground">{row[1]}</td>
                      <td className="p-3">{row[2]}</td>
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
        <h3 className="text-2xl font-semibold tracking-tight">
          Where these tools fit in a real business month
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {useCases.map((u, i) => (
            <Card key={i} className="p-5">
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">{u.icon}</span>
                <div>
                  <h4 className="font-semibold mb-1">{u.title}</h4>
                  <p className="text-sm text-muted-foreground">{u.body}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* The math explained */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold tracking-tight">
          The two GST calculations everyone gets wrong
        </h3>
        <div className="space-y-4 text-muted-foreground">
          <p>
            <strong className="text-foreground">Reverse GST:</strong> to extract the base price
            from a GST-inclusive amount, divide by (100 + rate), don&apos;t multiply by the rate.
            ₹1,180 inclusive at 18% is ₹1,000 base + ₹180 GST - not ₹1,180 − 18% (₹212.40),
            which double-counts tax. Full walkthrough with every slab:{" "}
            <Link
              href="/blog/reverse-gst-calculation-explained/"
              className="underline underline-offset-4 text-foreground"
            >
              Reverse GST calculation explained
            </Link>
            .
          </p>
          <p>
            <strong className="text-foreground">Late fee vs interest:</strong> they are two
            separate meters. Late fee is a fixed per-day charge for delayed filing (₹20–₹50/day
            with turnover-based caps); interest is 18% p.a. on the tax paid late. A 30-day delay
            on ₹1 lakh liability costs roughly ₹1,500 late fee plus ~₹1,479 interest. Details and
            tables:{" "}
            <Link
              href="/blog/gst-late-fee-penalty-rules/"
              className="underline underline-offset-4 text-foreground"
            >
              GST late fee &amp; penalty rules
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Why Toolspy */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Why use Toolspy for GST math</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: <Calculator className="h-5 w-5" />,
              title: "All slabs, both directions",
              body: "Forward and reverse GST at 0/5/12/18/28%, with CGST/SGST/IGST splits.",
            },
            {
              icon: <Shield className="h-5 w-5" />,
              title: "Private by design",
              body: "Amounts are processed in your browser. Nothing is uploaded or stored.",
            },
            {
              icon: <Percent className="h-5 w-5" />,
              title: "Free forever",
              body: "No signup, no limits, no paid tier - supported by non-intrusive ads.",
            },
          ].map((f, i) => (
            <Card key={i} className="p-5 text-center">
              <div className="flex justify-center text-primary mb-2">{f.icon}</div>
              <h4 className="font-semibold mb-1">{f.title}</h4>
              <p className="text-sm text-muted-foreground">{f.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight">Frequently Asked Questions</h3>
        <FAQ faqs={gstFaqs()} />
      </section>

      {/* Disclaimer note */}
      <section className="text-sm text-muted-foreground border rounded-lg p-4">
        <p>
          <FileText className="h-4 w-4 inline mr-1" />
          All GST tools provide indicative figures for planning and invoicing. GST rules change
          through notifications - verify with the latest CBIC guidance or a Chartered Accountant
          before filing. See our{" "}
          <Link href="/disclaimer/" className="underline underline-offset-4">
            full disclaimer
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
