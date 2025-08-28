"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Star,
  Target,
  Zap,
  Shield,
  Settings,
  Lock,
  Hash,
  Copy,
  Download,
  Eye,
  FileText,
  Fingerprint,
  Database,
  Key,
  Cpu,
  Type,
  BookOpen,
  AlignLeft,
  Calendar,
  Clock,
  Calculator,
  User,
  Heart,
  Users,
  Sparkles,
  TrendingUp,
  Activity,
  Scale,
  Target as TargetIcon,
  DollarSign,
  TrendingDown,
  PieChart,
  Scissors,
  File,
  FolderOpen,
  Layers,
  Split,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function SplitPdfSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("split-pdf");

  const comparisonData = [
    {
      feature: "Split Accuracy",
      toolspy: "✅ 100% accurate",
      smallpdf: "⚠️ Variable accuracy",
      ilovepdf: "❌ Limited precision",
      pdfsam: "⚠️ Basic accuracy",
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
      feature: "Split Options",
      toolspy: "✅ All options",
      smallpdf: "⚠️ Limited options",
      ilovepdf: "❌ Basic options",
      pdfsam: "⚠️ Limited options",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Multiple files",
      smallpdf: "❌ Single file",
      ilovepdf: "❌ Single file",
      pdfsam: "⚠️ Limited batch",
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

  const splitFeatures = [
    {
      type: "Page Range Splitting",
      description: "Split PDFs by specific page ranges",
      features: "Custom ranges, multiple ranges, precise control",
      example: "Split pages 1-5, 10-15, and 20-25",
      useCase: "Extract specific chapters, sections, or pages",
    },
    {
      type: "Equal Size Splitting",
      description: "Split PDFs into equal-sized chunks",
      features: "Pages per file, automatic division, balanced chunks",
      example: "Split 100-page PDF into 10-page files",
      useCase: "Create manageable file sizes, email-friendly chunks",
    },
    {
      type: "Individual Page Extraction",
      description: "Extract each page as a separate file",
      features: "One page per file, individual downloads, ZIP archive",
      example: "Extract all 50 pages as separate PDFs",
      useCase: "Page-by-page analysis, individual page sharing",
    },
    {
      type: "Batch Processing",
      description: "Split multiple PDFs at once",
      features: "Multiple files, same settings, bulk processing",
      example: "Split 10 PDFs with identical settings",
      useCase: "Large document collections, consistent processing",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's PDF splitter completely free to use?",
      answer:
        "Yes, our professional PDF splitter is completely free with no hidden costs, registration requirements, or usage limitations. You can split unlimited PDF files without any restrictions. Unlike many competitors who require paid subscriptions or have usage limits, Toolspy provides all splitting capabilities free of charge.",
    },
    {
      question: "How accurate is the PDF splitting process?",
      answer:
        "Our PDF splitter provides 100% accurate splitting with no loss of quality, formatting, or content. All text, images, and formatting are preserved exactly as in the original PDF. The tool maintains the original document structure and ensures each split file is a perfect copy of the selected pages.",
    },
    {
      question: "How secure is the PDF splitting process?",
      answer:
        "Absolutely secure! Our PDF splitter uses client-side processing, meaning your PDF files are processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your documents never leave your device, making it safer than server-based PDF tools.",
    },
    {
      question: "What splitting options are available?",
      answer:
        "Our PDF splitter offers three main splitting methods: 1) Page Range Splitting - specify exact page ranges (e.g., 1-5, 10-15), 2) Equal Size Splitting - divide into equal-sized chunks, and 3) Individual Page Extraction - extract each page as a separate file. You have complete control over how your PDF is divided.",
    },
    {
      question: "What's the maximum file size I can split?",
      answer:
        "You can split PDF files up to 100MB in size. This accommodates most documents including those with high-resolution images, complex layouts, and extensive content. The tool handles large files efficiently while maintaining processing speed and accuracy.",
    },
    {
      question: "Why choose Toolspy over other free PDF splitters like SmallPDF or ILovePDF?",
      answer:
        "Toolspy offers professional-grade features like 100% accurate splitting, client-side processing for privacy, comprehensive splitting options, and batch processing capabilities. Many competitors like SmallPDF and ILovePDF require registration, use server-based processing, or have limited free features. Our tool provides better privacy protection, higher accuracy, and superior functionality completely free.",
    },
    {
      question: "How fast is the PDF splitting process?",
      answer:
        "Our PDF splitter provides fast processing for any PDF file. Since all processing happens in your browser, there are no server delays or upload times. You can split multiple PDFs quickly, making it perfect for professionals and students who need efficient document management tools.",
    },
    {
      question: "Can I download all split files at once?",
      answer:
        "Yes! When you split a PDF into multiple files, you can download them all at once as a convenient ZIP archive, or download individual files separately. This makes it easy to manage and share your split documents efficiently.",
    },
    {
      question: "Does the splitter preserve PDF quality and formatting?",
      answer:
        "Absolutely! Our PDF splitter preserves 100% of the original document quality, including text formatting, images, fonts, colors, and layout. Each split file maintains the exact same appearance and quality as the original PDF pages.",
    },
    {
      question: "Is it safe to use online PDF splitters?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your PDF files are processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based splitters, our tool provides complete privacy and security for your PDF splitting.",
    },
  ];

  const benefits = [
    {
      icon: <Scissors className="h-6 w-6" />,
      title: "Precise Splitting Control",
      description:
        "Split PDFs by page ranges, equal sizes, or extract individual pages with complete control.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Processing",
      description:
        "Split PDFs quickly with no server delays or upload requirements.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your PDFs never leave your device, providing maximum security.",
    },
    {
      icon: <File className="h-6 w-6" />,
      title: "Batch Processing",
      description:
        "Split multiple PDFs at once with consistent settings and bulk download options.",
    },
  ];

  const keyBenefits = [
    "✂️ 100% accurate PDF splitting",
    "⚡ Fast processing with no server delays or uploads",
    "🔒 Complete privacy protection - PDFs never leave your device",
    "📱 Mobile-friendly responsive design",
    "📄 Multiple splitting methods (ranges, equal size, individual pages)",
    "📋 Batch processing capabilities",
    "🎯 Professional-grade splitting accuracy",
    "📱 Touch-friendly mobile interface",
    "🛡️ No ads or distractions in the interface",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 Preserves original PDF quality and formatting",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without clutter",
    "📈 Multiple splitting options for all needs",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. SmallPDF",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "Higher Accuracy: 100% accurate vs. variable accuracy",
        "More Options: All splitting methods vs. limited options",
        "No Registration: Free forever vs. registration required",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Better Mobile: Responsive design vs. basic mobile",
      ],
    },
    {
      title: "Toolspy vs. ILovePDF",
      advantages: [
        "Higher Accuracy: 100% accurate vs. limited precision",
        "Better Privacy: No data transmission vs. server-based",
        "More Options: All splitting methods vs. basic options",
        "Faster Processing: Fast vs. very slow",
        "Mobile Friendly: Responsive design vs. desktop only",
        "Professional Features: Advanced options vs. basic splitting",
      ],
    },
    {
      title: "Toolspy vs. PDFsam",
      advantages: [
        "Better Accuracy: 100% accurate vs. basic accuracy",
        "Better Privacy: Client-side vs. server-based processing",
        "More Options: All splitting methods vs. limited options",
        "Batch Processing: Multiple files vs. limited batch",
        "Better Mobile: Responsive design vs. desktop only",
        "Clean Interface: No ads vs. basic interface",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="split-pdf"
        title="Similar Tools You Might Like"
        description="Check out our other PDF processing tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Split PDF Files – 100% Accurate & Fast
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional PDF splitter with precise control, privacy protection, 
            and multiple splitting options. Perfect for document management, 
            content extraction, and anyone needing to divide large PDF files.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How to Use Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">How to Use Our PDF Splitter</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to split PDF files accurately
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Upload PDF</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload your PDF file (up to 100MB). 
              The tool supports all PDF formats and sizes.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Choose Split Method</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Select your splitting method: page ranges, equal sizes, 
              or individual page extraction.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Download Files</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Download your split files individually or as a ZIP archive. 
              Fast, secure, and accurate splitting every time.
            </p>
          </Card>
        </div>
      </section>

      {/* Split Features Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Splitting Features & Applications</h3>
          <p className="text-muted-foreground">
            Professional splitting methods for all your PDF needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {splitFeatures.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Scissors className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{feature.type}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Features:</strong> {feature.features}</div>
                <div><strong>Example:</strong> {feature.example}</div>
                <div><strong>Use Case:</strong> {feature.useCase}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Toolspy vs. Competitors</h3>
          <p className="text-muted-foreground">
            See how our PDF splitter outperforms other free tools
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">Toolspy</th>
                    <th className="text-center p-4 font-semibold">SmallPDF</th>
                    <th className="text-center p-4 font-semibold">ILovePDF</th>
                    <th className="text-center p-4 font-semibold">PDFsam</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center">
                        <Badge variant={row.toolspyStatus === "excellent" ? "default" : "secondary"}>
                          {row.toolspy}
                        </Badge>
                      </td>
                      <td className="p-4 text-center text-muted-foreground">{row.smallpdf}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.ilovepdf}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.pdfsam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Key Benefits List */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's PDF Splitter?</h3>
          <p className="text-muted-foreground">
            Professional features that make PDF splitting fast and accurate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyBenefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Competitor Advantages */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Toolspy Advantages Over Competitors</h3>
          <p className="text-muted-foreground">
            See why professionals choose our PDF splitter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {competitorAdvantages.map((comparison, index) => (
            <Card key={index} className="p-6">
              <h4 className="font-semibold mb-4 text-center">{comparison.title}</h4>
              <ul className="space-y-2">
                {comparison.advantages.map((advantage, advIndex) => (
                  <li key={advIndex} className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{advantage}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Frequently Asked Questions</h3>
          <p className="text-muted-foreground">
            Everything you need to know about PDF splitting
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about PDF splitting"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for PDF splitting
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <File className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Document Management</h4>
            <p className="text-sm text-muted-foreground">
              Split large documents into manageable sections
            </p>
          </Card>

          <Card className="p-6 text-center">
            <FolderOpen className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Content Extraction</h4>
            <p className="text-sm text-muted-foreground">
              Extract specific chapters or sections from documents
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Layers className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Page Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Extract individual pages for detailed analysis
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Split className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">File Sharing</h4>
            <p className="text-sm text-muted-foreground">
              Create smaller files for easy sharing and email
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Split PDF Files?</h3>
        <p className="text-muted-foreground">
          Start using our professional PDF splitter now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try PDF Splitter Now
        </Button>
      </section>
    </div>
  );
} 