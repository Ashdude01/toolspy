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
  Copy,
  Download,
  File,
  ArrowRight,
  FileDown,
  BarChart3,
  Sparkles,
  Palette,
  Smartphone,
  BookOpen,
  Edit3,
  Maximize,
  Compress,
  RotateCcw,
  Filter,
  Upload,
  Merge,
  Split,
  Lock,
  Unlock,
} from "lucide-react";
import { getToolsByCategory } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import NextImage from "next/image";
import Link from "next/link";

export function PDFToolsSEOContent() {
  const pdfTools = getToolsByCategory()['pdf-tools'];

  const comparisonData = [
    {
      feature: "PDF Quality",
      toolspy: "✅ Professional quality",
      adobe: "⚠️ Expensive subscription",
      ilovepdf: "❌ Limited free features",
      smallpdf: "⚠️ Watermarked free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Processing Speed",
      toolspy: "✅ Instant processing",
      adobe: "⚠️ Software dependent",
      ilovepdf: "❌ Server delays",
      smallpdf: "⚠️ Queue system",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      adobe: "❌ Local files",
      ilovepdf: "⚠️ Server-based",
      smallpdf: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      adobe: "❌ Subscription required",
      ilovepdf: "⚠️ Limited free",
      smallpdf: "⚠️ Limited free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Responsive design",
      adobe: "❌ Desktop only",
      ilovepdf: "⚠️ Basic mobile",
      smallpdf: "⚠️ Limited mobile",
      toolspyStatus: "excellent",
    },
    {
      feature: "Format Support",
      toolspy: "✅ All major formats",
      adobe: "✅ All formats",
      ilovepdf: "⚠️ Limited formats",
      smallpdf: "⚠️ Limited formats",
      toolspyStatus: "excellent",
    },
  ];

  const pdfToolTypes = [
    {
      type: "PDF Compression",
      description: "Reduce PDF file sizes while maintaining quality",
      useCase: "Email attachments, storage optimization, faster sharing",
      precision: "High-quality compression",
      example: "Compress large PDFs for email sharing",
    },
    {
      type: "PDF Conversion",
      description: "Convert PDFs to and from various formats",
      useCase: "Document editing, format compatibility, workflow integration",
      precision: "Lossless conversion",
      example: "Convert PDF to Word or Excel",
    },
    {
      type: "PDF Merging",
      description: "Combine multiple PDFs into one document",
      useCase: "Document consolidation, report creation, file organization",
      precision: "Perfect page order",
      example: "Merge multiple reports into one PDF",
    },
    {
      type: "PDF Splitting",
      description: "Split PDFs into separate pages or sections",
      useCase: "Page extraction, document separation, selective sharing",
      precision: "Precise page selection",
      example: "Extract specific pages from a large PDF",
    },
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description: "All PDF processing happens in your browser - your documents never leave your device.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast Processing",
      description: "Process PDFs instantly with no uploads, downloads, or server delays.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Professional Quality",
      description: "Maintain high document quality with advanced algorithms and optimization.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Features",
      description: "Comprehensive PDF tools with professional-grade capabilities.",
    },
  ];

  const keyBenefits = [
    "💰 Professional PDF processing with complete privacy protection",
    "⚡ Instant processing with no server delays or uploads",
    "🔒 Complete privacy protection - documents never leave your device",
    "📊 Multiple PDF tools: compression, conversion, merging, splitting",
    "🔧 Real-time processing and instant results",
    "📊 Complete processing history and document tracking",
    "📋 Multiple export formats and copy options",
    "🎯 Professional-grade PDF processing capabilities",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tools requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 Precise PDF processing and quality control",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
    "📈 Comprehensive PDF analysis and optimization tools",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. Adobe Acrobat",
      advantages: [
        "Better Cost: Free forever vs. expensive subscription",
        "Better Privacy: Client-side vs. local file processing",
        "Better Speed: Instant vs. software loading time",
        "No Installation: Browser-based vs. software installation",
        "Mobile Friendly: Responsive vs. desktop only",
        "Ease of Use: Simple interface vs. complex learning curve",
      ],
    },
    {
      title: "Toolspy vs. iLovePDF",
      advantages: [
        "Better Privacy: Client-side vs. server-based processing",
        "Better Speed: Instant vs. server delays",
        "Better Quality: Professional vs. limited free features",
        "No Registration: Free forever vs. limited free tier",
        "Format Support: All major formats vs. limited formats",
        "Mobile Experience: Responsive design vs. basic mobile",
      ],
    },
    {
      title: "Toolspy vs. SmallPDF",
      advantages: [
        "Better Privacy: Client-side vs. server-based processing",
        "Better Speed: Instant vs. queue system",
        "Better Quality: Professional vs. watermarked free",
        "No Registration: Free forever vs. limited free tier",
        "Format Support: All major formats vs. limited formats",
        "Mobile Experience: Responsive design vs. limited mobile",
      ],
    },
  ];

  // Register FAQs for SEO
  registerToolFAQ("pdf-tools", [
    {
      question: "What are the best free PDF tools available online?",
      answer: "Toolspy offers the best free PDF tools including PDF compressor, PDF converter, PDF merger, and PDF splitter. All tools provide professional quality with complete privacy protection and no registration required."
    },
    {
      question: "How do I compress PDF files without losing quality?",
      answer: "Use Toolspy's PDF compressor which uses advanced algorithms to reduce file size while maintaining document quality. The tool processes PDFs in your browser, ensuring complete privacy and instant results."
    },
    {
      question: "Can I convert PDFs to other formats?",
      answer: "Yes! Toolspy's PDF converter supports conversion to and from Word, Excel, PowerPoint, images, and more. Convert between formats with high quality and instant processing."
    },
    {
      question: "Is it safe to use online PDF tools?",
      answer: "Toolspy's PDF tools are completely safe as all processing happens in your browser. Your documents never leave your device, ensuring complete privacy and security."
    },
    {
      question: "Do I need to register to use PDF tools?",
      answer: "No registration required! All Toolspy PDF tools are completely free to use forever with no watermarks, limitations, or account creation needed."
    },
    {
      question: "Can I merge multiple PDFs into one?",
      answer: "Absolutely! Use Toolspy's PDF merger to combine multiple PDF documents into one file with perfect page order and quality preservation."
    },
    {
      question: "How do I split a PDF into separate pages?",
      answer: "Use Toolspy's PDF splitter to extract specific pages or split PDFs into individual pages. Select pages by range or individual page numbers for precise control."
    },
    {
      question: "Are these PDF tools mobile-friendly?",
      answer: "Yes! All Toolspy PDF tools are fully responsive and work perfectly on mobile devices, tablets, and desktops without requiring any app downloads."
    }
  ]);

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="pdf-tools"
        title="Professional PDF Tools"
        description="Discover our comprehensive suite of PDF processing tools designed for professionals and everyday users."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Professional PDF Tools – Fast & Private
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Complete suite of professional PDF processing tools with complete privacy protection, 
            high-quality processing, and instant results. Perfect for professionals, 
            students, and anyone needing professional PDF manipulation.
          </p>
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-left">
                <div className="space-y-4">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Our{" "}
                    <strong className="text-red-600 dark:text-red-400">
                      professional PDF tools
                    </strong>{" "}
                    provide the ultimate{" "}
                    <strong className="text-orange-600 dark:text-orange-400">
                      PDF processing online
                    </strong>{" "}
                    for{" "}
                    <strong className="text-yellow-600 dark:text-yellow-400">
                      PDF compression
                    </strong>
                    ,{" "}
                    <strong className="text-green-600 dark:text-green-400">
                      PDF conversion
                    </strong>
                    ,{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      PDF merging
                    </strong>
                    , and{" "}
                    <strong className="text-purple-600 dark:text-purple-400">
                      PDF splitting
                    </strong>{" "}
                    with professional quality.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The{" "}
                    <strong className="text-red-600 dark:text-red-400">
                      PDF tools suite
                    </strong>{" "}
                    is designed for both professionals and everyday users. With{" "}
                    <strong className="text-orange-600 dark:text-orange-400">
                      advanced processing technology
                    </strong>
                    ,{" "}
                    <strong className="text-yellow-600 dark:text-yellow-400">
                      complete privacy protection
                    </strong>
                    , and{" "}
                    <strong className="text-green-600 dark:text-green-400">
                      instant processing
                    </strong>
                    , you can{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      process PDFs free
                    </strong>{" "}
                    without any software installation or registration required.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                    <div className="text-2xl font-bold text-red-600">{pdfTools.length}</div>
                    <div className="text-sm text-red-700 dark:text-red-300">
                      Tools
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      Free
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="text-2xl font-bold text-purple-600">∞</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">
                      Unlimited
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <div className="text-2xl font-bold text-orange-600">0ms</div>
                    <div className="text-sm text-orange-700 dark:text-orange-300">
                      Upload
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
                  <div className="grid grid-cols-2 gap-4">
                    {pdfTools.slice(0, 4).map((tool, index) => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        className="group p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                              {tool.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {tool.description.split(' ').slice(0, 4).join(' ')}...
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✨ Professional
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            How to Use Our PDF Tools
          </h3>
          <p className="text-lg text-muted-foreground">
            Simple steps to process your PDFs with professional quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-red-300 dark:hover:border-red-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-red-100 dark:bg-red-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Upload className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-lg">1. Upload PDF</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Select or drag and drop your PDF file. Supports all PDF formats.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-300 dark:hover:border-orange-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Settings className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-lg">2. Configure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Adjust settings like compression level, page range, or format.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-yellow-300 dark:hover:border-yellow-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <CardTitle className="text-lg">3. Process</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Click process and watch your PDF transform instantly.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-green-300 dark:hover:border-green-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg">4. Download</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Download your processed PDF or copy to clipboard.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PDF Tool Types */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Professional PDF Tool Types
          </h3>
          <p className="text-lg text-muted-foreground">
            Comprehensive PDF processing capabilities for every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pdfToolTypes.map((tool, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-red-300 dark:hover:border-red-600">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tool.type}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Use Case:</h4>
                  <p className="text-sm">{tool.useCase}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Precision:</h4>
                  <p className="text-sm">{tool.precision}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Example:</h4>
                  <p className="text-sm">{tool.example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Why Choose Our PDF Tools?
          </h3>
          <p className="text-lg text-muted-foreground">
            Professional PDF processing with unmatched benefits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-green-300 dark:hover:border-green-600">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-fit group-hover:scale-110 transition-transform mb-4">
                  {benefit.icon}
                </div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Benefits List */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Complete Feature Set
          </h3>
          <p className="text-lg text-muted-foreground">
            Everything you need for professional PDF processing
          </p>
        </div>

        <Card className="border-2 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Competitor Comparison */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Toolspy vs. Competitors
          </h3>
          <p className="text-lg text-muted-foreground">
            See how we compare to other PDF processing solutions
          </p>
        </div>

        <div className="space-y-6">
          {competitorAdvantages.map((competitor, index) => (
            <Card key={index} className="border-2 border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-xl text-center">{competitor.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {competitor.advantages.map((advantage, advIndex) => (
                    <div key={advIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{advantage}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Feature Comparison
          </h3>
          <p className="text-lg text-muted-foreground">
            Detailed comparison with popular PDF processing tools
          </p>
        </div>

        <Card className="border-2 border-indigo-200 dark:border-indigo-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-red-600 dark:text-red-400">Toolspy</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">Adobe</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">iLovePDF</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">SmallPDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.toolspyStatus === 'excellent' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {row.toolspy}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        {row.adobe}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        {row.ilovepdf}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        {row.smallpdf}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h3>
          <p className="text-lg text-muted-foreground">
            Common questions about our professional PDF tools
          </p>
        </div>

        <FAQ
          faqs={[
            {
              question: "What are the best free PDF tools available online?",
              answer: "Toolspy offers the best free PDF tools including PDF compressor, PDF converter, PDF merger, and PDF splitter. All tools provide professional quality with complete privacy protection and no registration required."
            },
            {
              question: "How do I compress PDF files without losing quality?",
              answer: "Use Toolspy's PDF compressor which uses advanced algorithms to reduce file size while maintaining document quality. The tool processes PDFs in your browser, ensuring complete privacy and instant results."
            },
            {
              question: "Can I convert PDFs to other formats?",
              answer: "Yes! Toolspy's PDF converter supports conversion to and from Word, Excel, PowerPoint, images, and more. Convert between formats with high quality and instant processing."
            },
            {
              question: "Is it safe to use online PDF tools?",
              answer: "Toolspy's PDF tools are completely safe as all processing happens in your browser. Your documents never leave your device, ensuring complete privacy and security."
            },
            {
              question: "Do I need to register to use PDF tools?",
              answer: "No registration required! All Toolspy PDF tools are completely free to use forever with no watermarks, limitations, or account creation needed."
            },
            {
              question: "Can I merge multiple PDFs into one?",
              answer: "Absolutely! Use Toolspy's PDF merger to combine multiple PDF documents into one file with perfect page order and quality preservation."
            },
            {
              question: "How do I split a PDF into separate pages?",
              answer: "Use Toolspy's PDF splitter to extract specific pages or split PDFs into individual pages. Select pages by range or individual page numbers for precise control."
            },
            {
              question: "Are these PDF tools mobile-friendly?",
              answer: "Yes! All Toolspy PDF tools are fully responsive and work perfectly on mobile devices, tablets, and desktops without requiring any app downloads."
            }
          ]}
        />
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Ready to Process Your PDFs?
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Start using our professional PDF tools today. No registration required, 
            completely free, and your documents never leave your device.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/pdf-compressor">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3">
                <FileText className="mr-2 h-5 w-5" />
                Start Compressing PDFs
              </Button>
            </Link>
            <Link href="/tools/pdf-converter">
              <Button size="lg" variant="outline" className="px-8 py-3">
                <Settings className="mr-2 h-5 w-5" />
                Convert PDFs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
