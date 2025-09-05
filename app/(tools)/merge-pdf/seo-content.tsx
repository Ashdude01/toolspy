"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Star,
  Target,
  Zap,
  Shield,
  Settings,
  FileText,
  File,
  ArrowRight,
  FileDown,
  Merge,
  Layers,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import NextImage from "next/image";

export function MergePdfSEOContent() {
  const tool = getToolBySlug("merge-pdf");

  const comparisonData = [
    {
      feature: "Merge Quality",
      toolspy: "✅ 100% quality preserved",
      smallpdf: "⚠️ Variable quality",
      ilovepdf: "❌ Quality loss",
      pdfsam: "⚠️ Basic quality",
      toolspyStatus: "excellent",
    },
    {
      feature: "Processing Speed",
      toolspy: "Fast processing",
      smallpdf: "Slow processing",
      ilovepdf: "Very slow",
      pdfsam: "Variable speed",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      smallpdf: "⚠️ Server-based",
      ilovepdf: "⚠️ Server-based",
      pdfsam: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      smallpdf: "❌ Registration required",
      ilovepdf: "❌ Registration required",
      pdfsam: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Responsive design",
      smallpdf: "⚠️ Basic mobile",
      ilovepdf: "❌ Desktop only",
      pdfsam: "❌ Desktop only",
      toolspyStatus: "excellent",
    },
    {
      feature: "File Limit",
      toolspy: "✅ Up to 50 files",
      smallpdf: "⚠️ Up to 10 files",
      ilovepdf: "❌ Up to 5 files",
      pdfsam: "⚠️ Up to 20 files",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Multiple files",
      smallpdf: "⚠️ Limited batch",
      ilovepdf: "❌ No batch",
      pdfsam: "⚠️ Basic batch",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      smallpdf: "❌ Ad-heavy",
      ilovepdf: "❌ Ad-heavy",
      pdfsam: "✅ Clean interface",
      toolspyStatus: "excellent",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's PDF Merger completely free to use?",
      answer:
        "Yes, our professional PDF Merger is completely free with no hidden costs, registration requirements, or usage limitations. You can merge unlimited PDF files without any restrictions. Unlike many competitors who require paid subscriptions or have usage limits, Toolspy provides all merging capabilities free of charge.",
    },
    {
      question: "How many PDF files can I merge at once?",
      answer:
        "Our PDF Merger supports up to 50 PDF files simultaneously, which is significantly more than most competitors. SmallPDF only allows 10 files, while ILovePDF limits you to just 5 files. This makes our tool ideal for large projects and professional use cases.",
    },
    {
      question: "How secure is the PDF merging process?",
      answer:
        "Absolutely secure! Our PDF Merger uses client-side processing, meaning your PDF files are processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your sensitive documents never leave your device, making it safer than server-based merging tools.",
    },
    {
      question: "Will the quality of my PDFs be affected after merging?",
      answer:
        "No! Our advanced merging technology preserves 100% of the original PDF quality, formatting, and structure. Each page from your source PDFs is maintained exactly as it was, ensuring that text, images, graphics, and layouts remain intact in the merged document.",
    },
    {
      question: "What types of PDFs can I merge?",
      answer:
        "Our PDF Merger works with all types of PDF documents including text documents, scanned images, presentations, forms, and mixed-content files. The tool handles various page sizes, orientations, and content types seamlessly, creating a unified document.",
    },
    {
      question: "Why choose Toolspy over other free PDF mergers like SmallPDF or ILovePDF?",
      answer:
        "Toolspy offers professional-grade features like superior file limits (50 vs. 10/5), client-side processing for privacy, 100% quality preservation, and advanced merging capabilities. Many competitors like SmallPDF and ILovePDF require registration, use server-based processing, or have limited file counts. Our tool provides better privacy protection, higher file limits, and superior functionality completely free.",
    },
    {
      question: "How fast is the PDF merging process?",
      answer:
        "Our PDF Merger provides fast processing for any number of PDF files. Since all processing happens in your browser, there are no server delays or upload times. You can merge multiple PDFs quickly, making it perfect for professionals and users who need efficient document organization tools.",
    },
    {
      question: "What file sizes are supported?",
      answer:
        "Our tool supports PDF files up to 50MB each, which is significantly larger than many competitors. SmallPDF only supports 5MB files, while ILovePDF supports up to 2MB. This makes our tool ideal for large documents and professional use cases.",
    },
    {
      question: "Can I reorder pages before merging?",
      answer:
        "Yes! You can easily reorder your PDF files and individual pages before merging. Simply drag and drop files or pages to arrange them in your desired order. This gives you complete control over the final document structure.",
    },
    {
      question: "Is it safe to use online PDF mergers?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your PDF files are processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based mergers, our tool provides complete privacy and security for your PDF merging.",
    },
  ];

  const benefits = [
    {
      icon: <Merge className="h-6 w-6" />,
      title: "High File Limit",
      description:
        "Merge up to 50 PDF files simultaneously with perfect quality preservation.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Processing",
      description:
        "Merge PDF files quickly with no server delays or upload requirements.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your PDFs never leave your device.",
    },
    {
      icon: <File className="h-6 w-6" />,
      title: "Quality Preservation",
      description:
        "Maintain PDF quality, formatting, and structure across all merged files.",
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="merge-pdf"
        title="Similar Tools You Might Like"
        description="Check out our other PDF organization and management tools that work great with PDF merging."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Merge PDF Files Easily – Perfect Organization
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Combine multiple PDF documents into one organized file with Toolspy's advanced PDF Merger. 
            Our tool provides superior merging with support for up to 50 files, complete privacy protection, 
            and professional-grade quality preservation. Whether you need to combine reports, presentations, 
            or any PDF documents, get the perfect merge every time.
          </p>
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-left">
                <div className="space-y-4">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Our{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      free PDF merger
                    </strong>{" "}
                    is the ultimate{" "}
                    <strong className="text-purple-600 dark:text-purple-400">
                      PDF merger online
                    </strong>{" "}
                    for{" "}
                    <strong className="text-pink-600 dark:text-pink-400">
                      merge PDF
                    </strong>
                    ,{" "}
                    <strong className="text-green-600 dark:text-green-400">
                      PDF merger free
                    </strong>
                    , and{" "}
                    <strong className="text-orange-600 dark:text-orange-400">
                      PDF merger download
                    </strong>{" "}
                    with professional quality.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      PDF merger app
                    </strong>{" "}
                    is designed for both beginners and professionals. With{" "}
                    <strong className="text-purple-600 dark:text-purple-400">
                      high file limits
                    </strong>
                    ,{" "}
                    <strong className="text-pink-600 dark:text-pink-400">
                      advanced technology
                    </strong>
                    , and{" "}
                    <strong className="text-green-600 dark:text-green-400">
                      quality preservation
                    </strong>
                    , you can{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      merge PDF free
                    </strong>{" "}
                    without any software installation or registration required.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-600">50</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      Max Files
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600">
                      50MB
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      Max Size
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="text-2xl font-bold text-purple-600">
                      ∞
                    </div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">
                      Privacy
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-800">
                    <div className="text-2xl font-bold text-pink-600">⚡</div>
                    <div className="text-sm text-pink-700 dark:text-pink-300">
                      Fast
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <NextImage
                  width={1200}
                  height={680}
                  src={tool?.posterImage || ""}
                  alt="Toolspy Professional PDF Merger - High file limit with quality preservation and privacy protection"
                  className="w-full rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 hover:scale-105 transition-transform duration-300 h-full"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✨ 50 Files
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* - How to Use */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          How to Merge PDF Files with Toolspy
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          It's simple! Here's how you can merge your PDF documents in seconds:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">1. Upload Your PDF Files</h4>
            <p className="text-sm text-muted-foreground">
              Drag and drop multiple PDF documents or click to select them. 
              Our tool supports up to 50 files with various content types.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">2. Arrange File Order</h4>
            <p className="text-sm text-muted-foreground">
              Drag and drop files to arrange them in your desired order.
              Our advanced technology maintains the sequence perfectly.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">3. Configure Settings</h4>
            <p className="text-sm text-muted-foreground">
              Set merging options, page settings, and output preferences.
              Preview your arrangement before starting the merge.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">4. Merge and Download</h4>
            <p className="text-sm text-muted-foreground">
              Click merge and watch real-time progress. Download your merged
              PDF with perfect quality preservation and organization.
            </p>
          </Card>
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Toolspy's PDF Merger Rocks
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's what makes our tool special and why people love using it for
          their PDF merging needs.
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

      {/* Point-wise Benefits */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Everything You Get with Our PDF Merger
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          All the features you need for professional PDF merging,
          completely free and easy to use.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "🎯 Merge up to 50 PDF files with perfect quality preservation",
            "⚡ Lightning-fast client-side processing for maximum privacy and security",
            "🔒 Complete privacy protection - PDFs never leave your device",
            "📁 Support for large PDF files up to 50MB each",
            "📦 Drag and drop interface for easy file arrangement",
            "🎨 Preserves all PDF quality, formatting, and structure",
            "⚙️ Automatic page order maintenance and organization",
            "📱 Responsive design works on all devices and browsers",
            "🎯 Advanced merging algorithms for optimal results",
            "🔄 Real-time processing progress tracking and status updates",
            "🖥️ Browser-based tool requiring no software installation or registration",
            "💯 Completely free with no watermarks, limits, or premium features",
            "🚀 Professional merging technology optimized for quality",
            "📊 Professional output with industry-standard quality",
            "💼 Professional features typically found in paid desktop software",
            "🌐 Works offline after initial page load - no internet required for merging",
            "📋 Support for all PDF content types and layouts",
            "🎭 Flexible merging options for any document need",
          ].map((benefit, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <p className="text-sm">{benefit}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Detailed Feature Comparison
        </h3>
        <Card>
          <CardHeader>
            <CardTitle>Toolspy vs. Leading Competitors</CardTitle>
            <CardDescription>
              Comprehensive comparison of features, limitations, and
              capabilities across popular PDF merging tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Feature</th>
                    <th className="text-left p-3 font-medium">Toolspy</th>
                    <th className="text-left p-3 font-medium">SmallPDF</th>
                    <th className="text-left p-3 font-medium">ILovePDF</th>
                    <th className="text-left p-3 font-medium">PDFsam</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{row.feature}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <span>{row.toolspy}</span>
                          {row.toolspyStatus === "excellent" && (
                            <Star className="h-4 w-4 text-yellow-500" />
                          )}
                          {row.toolspyStatus === "good" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">{row.smallpdf}</td>
                      <td className="p-3 text-muted-foreground">{row.ilovepdf}</td>
                      <td className="p-3 text-muted-foreground">{row.pdfsam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Competitor Advantages */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Toolspy Over Other Mergers
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's how we stack up against other popular PDF merging tools
          you might have tried.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Toolspy vs. SmallPDF",
              advantages: [
                "Better Privacy: Client-side processing vs. server uploads",
                "Higher File Limit: 50 files vs. 10 files maximum",
                "Better Quality: 100% quality preserved vs. variable quality",
                "No Registration: Free forever vs. registration required",
                "No Ads: Clean interface vs. ad-heavy layout",
                "Better Mobile: Responsive design vs. basic mobile",
              ],
            },
            {
              title: "Toolspy vs. ILovePDF",
              advantages: [
                "Higher File Limit: 50 files vs. 5 files maximum",
                "Better Privacy: No data transmission vs. server-based",
                "Better Quality: 100% quality vs. quality loss",
                "Faster Processing: Fast vs. very slow",
                "Mobile Friendly: Responsive design vs. desktop only",
                "Professional Features: Advanced options vs. basic merging",
              ],
            },
            {
              title: "Toolspy vs. PDFsam",
              advantages: [
                "Higher File Limit: 50 files vs. 20 files maximum",
                "Better Quality: 100% quality vs. basic quality",
                "Better Privacy: Client-side vs. server-based processing",
                "Quality Preservation: 100% preserved vs. variable preservation",
                "Better Mobile: Responsive design vs. desktop only",
                "Clean Interface: No ads vs. basic interface",
              ],
            },
            {
              title: "Toolspy vs. Adobe Acrobat",
              advantages: [
                "No Cost: Completely free vs. expensive subscription",
                "Better Privacy: Local processing vs. cloud-based",
                "No Installation: Browser-based vs. software download",
                "Instant Access: No account setup or licensing",
                "Cross-Platform: Works on any device with browser",
                "Regular Updates: Always latest features without manual updates",
              ],
            },
          ].map((competitor, index) => (
            <Card key={index} className="p-6">
              <h4 className="font-semibold mb-4 text-primary">
                {competitor.title}
              </h4>
              <ul className="space-y-2">
                {competitor.advantages.map((advantage, advIndex) => (
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

      {/* Step-by-Step Guide */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Complete Step-by-Step Guide
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Detailed instructions for getting the best results from our
          professional PDF merging tool.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Upload Your PDF Documents",
              description:
                "Click the upload area or drag and drop multiple PDF files. Supports up to 50 files with various content types and page counts.",
            },
            {
              step: "2",
              title: "Arrange File Order",
              description:
                "Drag and drop files to arrange them in your desired sequence. You can also reorder individual pages within files.",
            },
            {
              step: "3",
              title: "Configure Merge Settings",
              description:
                "Set merging options, page settings, and output preferences for optimal results in your final document.",
            },
            {
              step: "4",
              title: "Merge and Download",
              description:
                "Click merge and watch real-time progress. Download your merged PDF with perfect quality preservation and organization.",
            },
          ].map((item, index) => (
            <Card key={index} className="text-center p-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={faqData} />

      {/* SEO Keyword Cluster Section */}
      <section className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-center mb-6">
            Merge PDF Files for Any Purpose
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground leading-relaxed">
              If you're looking for a simple way to{" "}
              <strong>merge PDF online</strong>, you're in the right
              place. With Toolspy's PDF Merger, you can easily{" "}
              <strong>merge PDF free</strong>,{" "}
              <strong>merge PDF converter</strong>, or{" "}
              <strong>merge PDF download</strong>—perfect for document organization, report creation, or combining presentations. Whether you need to{" "}
              <strong>merge PDF converter online</strong> for high-quality merging or{" "}
              <strong>merge PDF converter app</strong> for mobile convenience, our tool gives you full control over your PDF merging.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              No more complex software or trial and error! Just upload your PDF documents, arrange them in your desired order, and let our smart merger do the rest. You'll see a real-time preview of your file arrangement, so you can ensure everything is organized correctly before merging. This is especially useful for professionals, students, and anyone who needs to combine multiple PDF documents.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Our PDF Merger works with all PDF content types and supports up to 50 files simultaneously. You don't need to install any software or sign up. Everything happens right in your browser, keeping your documents private and secure. Whether you want to{" "}
              <strong>merge PDF</strong> for reports,{" "}
              <strong>merge PDF converter</strong> for presentations, or{" "}
              <strong>merge PDF online</strong> for quick organization, Toolspy makes it quick and easy.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Try merging your PDFs today and see how organized your documents can become—without losing the quality you care about. Toolspy is your go-to solution for{" "}
              <strong>PDF merging</strong>, from simple document combination to professional organization, in just a few clicks.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="space-y-6">
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Merge Your PDF Documents?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Join thousands of people who use Toolspy every day to merge their
            PDF documents into organized, professional files. It's free, fast, and your
            documents stay private on your device.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Merging Now →
          </Button>
        </div>
      </section>
    </div>
  );
}

// Export FAQ data for schema generation
export function getMergePdfFAQs() {
  return [
    {
      question: "Is Toolspy's PDF Merger completely free to use?",
      answer:
        "Yes, our professional PDF Merger is completely free with no hidden costs, registration requirements, or usage limitations. You can merge unlimited PDF files without any restrictions. Unlike many competitors who require paid subscriptions or have usage limits, Toolspy provides all merging capabilities free of charge.",
    },
    {
      question: "How many PDF files can I merge at once?",
      answer:
        "Our PDF Merger supports up to 50 PDF files simultaneously, which is significantly more than most competitors. SmallPDF only allows 10 files, while ILovePDF limits you to just 5 files. This makes our tool ideal for large projects and professional use cases.",
    },
    {
      question: "How secure is the PDF merging process?",
      answer:
        "Absolutely secure! Our PDF Merger uses client-side processing, meaning your PDF files are processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your sensitive documents never leave your device, making it safer than server-based merging tools.",
    },
    {
      question: "Will the quality of my PDFs be affected after merging?",
      answer:
        "No! Our advanced merging technology preserves 100% of the original PDF quality, formatting, and structure. Each page from your source PDFs is maintained exactly as it was, ensuring that text, images, graphics, and layouts remain intact in the merged document.",
    },
    {
      question: "What types of PDFs can I merge?",
      answer:
        "Our PDF Merger works with all types of PDF documents including text documents, scanned images, presentations, forms, and mixed-content files. The tool handles various page sizes, orientations, and content types seamlessly, creating a unified document.",
    },
    {
      question: "Why choose Toolspy over other free PDF mergers like SmallPDF or ILovePDF?",
      answer:
        "Toolspy offers professional-grade features like superior file limits (50 vs. 10/5), client-side processing for privacy, 100% quality preservation, and advanced merging capabilities. Many competitors like SmallPDF and ILovePDF require registration, use server-based processing, or have limited file counts. Our tool provides better privacy protection, higher file limits, and superior functionality completely free.",
    },
    {
      question: "How fast is the PDF merging process?",
      answer:
        "Our PDF Merger provides fast processing for any number of PDF files. Since all processing happens in your browser, there are no server delays or upload times. You can merge multiple PDFs quickly, making it perfect for professionals and users who need efficient document organization tools.",
    },
    {
      question: "What file sizes are supported?",
      answer:
        "Our tool supports PDF files up to 50MB each, which is significantly larger than many competitors. SmallPDF only supports 5MB files, while ILovePDF supports up to 2MB. This makes our tool ideal for large documents and professional use cases.",
    },
    {
      question: "Can I reorder pages before merging?",
      answer:
        "Yes! You can easily reorder your PDF files and individual pages before merging. Simply drag and drop files or pages to arrange them in your desired order. This gives you complete control over the final document structure.",
    },
    {
      question: "Is it safe to use online PDF mergers?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your PDF files are processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based mergers, our tool provides complete privacy and security for your PDF merging.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("merge-pdf", getMergePdfFAQs); 