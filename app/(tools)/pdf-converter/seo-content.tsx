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
  FileText,
  Download,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";

export function PDFConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug('pdf-converter');

  const comparisonData = [
    {
      feature: "Max File Size",
      toolspy: "100MB",
      smallpdf: "50MB",
      ilovepdf: "25MB",
      pdftron: "200MB",
      toolspyStatus: "good",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Up to 50 files",
      smallpdf: "✅ Up to 10 files (paid)",
      ilovepdf: "✅ Up to 15 files",
      pdftron: "✅ Up to 5 files",
      toolspyStatus: "excellent",
    },
    {
      feature: "Format Support",
      toolspy: "✅ 15+ formats",
      smallpdf: "✅ 10 formats",
      ilovepdf: "✅ 8 formats",
      pdftron: "✅ 20+ formats",
      toolspyStatus: "excellent",
    },
    {
      feature: "Quality Control",
      toolspy: "✅ High/Medium/Low",
      smallpdf: "✅ Basic options",
      ilovepdf: "✅ Limited control",
      pdftron: "✅ Advanced options",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy",
      toolspy: "✅ Client-side processing",
      smallpdf: "⚠️ Server-based",
      ilovepdf: "⚠️ Server-based",
      pdftron: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      smallpdf: "❌ Limited free use",
      ilovepdf: "✅ Limited usage",
      pdftron: "❌ Account required",
      toolspyStatus: "excellent",
    },
    {
      feature: "OCR Support",
      toolspy: "✅ Advanced OCR",
      smallpdf: "✅ Basic OCR",
      ilovepdf: "❌ Not available",
      pdftron: "✅ Professional OCR",
      toolspyStatus: "excellent",
    },
    {
      feature: "Conversion Speed",
      toolspy: "✅ Lightning fast",
      smallpdf: "⚠️ Moderate",
      ilovepdf: "⚠️ Slow",
      pdftron: "✅ Fast",
      toolspyStatus: "excellent",
    },
  ];

  const formatData = [
    {
      format: "Word (DOCX)",
      extension: ".docx",
      type: "Editable document",
      useCase: "Text editing, reports",
      accuracy: "95%+",
    },
    {
      format: "Excel (XLSX)",
      extension: ".xlsx",
      type: "Spreadsheet",
      useCase: "Data analysis, tables",
      accuracy: "90%+",
    },
    {
      format: "PowerPoint (PPTX)",
      extension: ".pptx",
      type: "Presentation",
      useCase: "Slides, presentations",
      accuracy: "85%+",
    },
    {
      format: "HTML",
      extension: ".html",
      type: "Web document",
      useCase: "Web publishing, emails",
      accuracy: "95%+",
    },
    {
      format: "Images (JPG/PNG)",
      extension: ".jpg, .png",
      type: "Image files",
      useCase: "Graphics, printing",
      accuracy: "100%",
    },
    {
      format: "Text (TXT)",
      extension: ".txt",
      type: "Plain text",
      useCase: "Simple text extraction",
      accuracy: "98%+",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's PDF converter completely free to use?",
      answer:
        "Yes, our professional PDF converter is completely free with no hidden costs, registration requirements, or usage limitations. You can convert unlimited PDF files without any restrictions. Unlike many competitors who require paid subscriptions for advanced features, Toolspy provides all conversion capabilities free of charge.",
    },
    {
      question: "What file formats can I convert PDFs to?",
      answer:
        "Our PDF converter supports 15+ output formats including Word (DOCX), Excel (XLSX), PowerPoint (PPTX), HTML, images (JPG, PNG, WebP), text files, and more. You can also convert various formats to PDF. Each conversion maintains high quality and preserves formatting as much as possible.",
    },
    {
      question: "Is it safe to upload my PDFs to Toolspy's converter?",
      answer:
        "Absolutely! Our PDF converter uses client-side processing, meaning your documents are converted directly in your browser and never uploaded to our servers. This ensures complete privacy and security for your sensitive documents. Your data never leaves your device, making it safer than server-based conversion tools.",
    },
    {
      question: "How accurate is the PDF to Word conversion?",
      answer:
        "Our advanced OCR and text extraction algorithms achieve 95%+ accuracy for PDF to Word conversions. Complex layouts, tables, and images are preserved with high fidelity. For best results, ensure your PDFs contain clear, readable text rather than low-quality scanned images.",
    },
    {
      question: "Can I convert password-protected PDFs?",
      answer:
        "Yes, if you know the password. Simply enter the password when prompted during the conversion process. Our tool will decrypt the PDF and convert it to your desired format while maintaining security. The password is processed locally and never stored or transmitted.",
    },
    {
      question: "What's the maximum file size I can convert?",
      answer:
        "Our PDF converter supports files up to 100MB per document, which is larger than many competitors. SmallPDF supports up to 50MB, while ILovePDF only handles 25MB files. This makes Toolspy ideal for large documents, presentations, and professional reports.",
    },
    {
      question: "How does batch conversion work?",
      answer:
        "You can select up to 50 PDF files simultaneously for batch processing. Our tool processes each document individually using the same settings, providing consistent results across your entire batch. Progress is tracked in real-time with detailed status updates for each file.",
    },
    {
      question: "Do you preserve formatting and layout during conversion?",
      answer:
        "Yes! Our advanced conversion engine is specifically designed to preserve original formatting, fonts, colors, images, and layout structure. Tables, headers, footers, and complex layouts are maintained with high accuracy. Some minor adjustments may occur with very complex designs.",
    },
    {
      question: "Can I convert scanned PDFs (images) to editable text?",
      answer:
        "Absolutely! Our built-in OCR (Optical Character Recognition) technology can extract text from scanned PDFs and image-based documents. The OCR engine supports multiple languages and can handle various fonts and layouts, converting them to fully editable formats.",
    },
    {
      question: "How long does the conversion process take?",
      answer:
        "Conversion speed depends on file size and complexity, but most documents convert within seconds. Simple text PDFs convert almost instantly, while complex documents with images and graphics may take 30-60 seconds. Batch conversions process multiple files simultaneously for efficiency.",
    },
  ];

  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Superior Conversion Accuracy",
      description:
        "Advanced OCR and text extraction algorithms ensure 95%+ accuracy while preserving original formatting, fonts, and layout structure.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning-Fast Processing",
      description:
        "Client-side conversion for maximum privacy and speed with no file upload delays or server processing time.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Your documents never leave your device, ensuring complete privacy and security. No server uploads, no data collection.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Professional Format Support",
      description:
        "Convert to 15+ formats including Word, Excel, PowerPoint, HTML, images, and more with industry-leading accuracy.",
    },
  ];

  const keyBenefits = [
    "🎯 Convert to 15+ formats including Word, Excel, PowerPoint, HTML, and images",
    "⚡ Lightning-fast client-side processing for maximum privacy and security",
    "🔒 Complete privacy protection - documents never leave your device",
    "🎛️ Advanced OCR technology for scanned PDFs and image-based documents",
    "📦 Batch processing support for up to 50 files simultaneously",
    "🎨 Preserve original formatting, fonts, colors, and layout structure",
    "⚙️ Support for password-protected PDFs with secure local decryption",
    "📱 High-quality output with 95%+ conversion accuracy",
    "🎯 Handle complex layouts, tables, headers, and footers",
    "🔄 Bi-directional conversion: PDF to other formats and vice versa",
    "🖥️ Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks, limits, or premium features",
    "🚀 Advanced algorithms optimized for different document types",
    "📊 Real-time conversion progress tracking and status updates",
    "💼 Professional features typically found in paid desktop software",
    "🌐 Works offline after initial page load - no internet required",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. SmallPDF",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "Higher File Limit: 100MB vs. 50MB maximum file size",
        "No Registration: Instant access without account creation",
        "Advanced OCR: Superior text extraction from scanned documents",
        "No Ads: Clean, professional interface without distractions",
        "Batch Processing: Handle more files simultaneously",
      ],
    },
    {
      title: "Toolspy vs. ILovePDF",
      advantages: [
        "Larger Files: 100MB vs. 25MB file size limit",
        "Better Privacy: No server processing vs. cloud-based conversion",
        "More Formats: 15+ formats vs. 8 supported formats",
        "Advanced Features: OCR and complex layout preservation",
        "Faster Processing: Client-side conversion vs. server delays",
        "Professional Quality: Higher accuracy and better formatting",
      ],
    },
    {
      title: "Toolspy vs. Adobe Acrobat",
      advantages: [
        "No Cost: Completely free vs. expensive monthly subscription",
        "No Installation: Browser-based vs. large software download",
        "Privacy First: Local processing vs. cloud-based conversion",
        "Instant Access: No account setup or software licensing",
        "Cross-Platform: Works on any device with a modern browser",
        "Regular Updates: Always latest features without manual updates",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Tool Poster Image */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="relative mx-auto max-w-6xl">
            <img
              src={tool?.posterImage || ''}
              alt="Toolspy Professional PDF Converter - Advanced conversion technology with OCR and batch processing"
              className="w-full rounded-xl shadow-lg border"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Convert PDFs Easily – Keep Quality, Change Format
          </h2>
          <p className="text-lg text-muted-foreground max-w-6xl mx-auto">
            Need to edit a PDF but it's locked? Want to extract data from a scanned document? Toolspy's PDF Converter makes it simple. Our tool transforms your PDFs into editable Word documents, Excel spreadsheets, PowerPoint presentations, and more – all while keeping the original formatting and quality you need.
          </p>
          <p className="text-base text-muted-foreground max-w-6xl mx-auto mt-4">
            With support for 15+ output formats and advanced OCR technology, you can convert any PDF – whether it's a text document, scanned image, or complex layout – into the format you need. No more struggling with locked documents or manual retyping.
          </p>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          How to Convert Your PDFs with Toolspy
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Converting your PDFs is simple and takes just a few clicks:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">1. Upload Your PDF</h4>
            <p className="text-sm text-muted-foreground">
              Drag and drop your PDF files or click to select them. You can add up to 50 files at once for batch conversion.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">2. Choose Output Format</h4>
            <p className="text-sm text-muted-foreground">
              Select from Word, Excel, PowerPoint, HTML, images, or other formats. Each option is optimized for the best results.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">3. Set Quality Options</h4>
            <p className="text-sm text-muted-foreground">
              Adjust conversion settings like OCR language, image quality, and formatting preferences for perfect results.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">4. Download and Edit</h4>
            <p className="text-sm text-muted-foreground">
              Get your converted files instantly. Open them in your favorite editor and make all the changes you need.
            </p>
          </Card>
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Toolspy's PDF Converter Rocks
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's what makes our tool special and why people love using it for their PDF conversion needs.
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
          Everything You Get with Our PDF Converter
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          All the features you need for professional PDF conversion, completely free and easy to use.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyBenefits.map((benefit, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <p className="text-sm">{benefit}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Competitor Advantages */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Toolspy Over Other PDF Converters
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's how we stack up against other popular PDF conversion tools you might have tried.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {competitorAdvantages.map((competitor, index) => (
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
              capabilities across popular PDF conversion tools.
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
                    <th className="text-left p-3 font-medium">PDFTron</th>
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
                      <td className="p-3 text-muted-foreground">
                        {row.smallpdf}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.ilovepdf}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.pdftron}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Technical Specifications */}
      <section className="space-y-6" id="specifications">
        <h3 className="text-2xl font-bold text-center">
          Supported Formats & Conversion Accuracy
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Comprehensive format support with expected conversion performance for different document types.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Output Formats & Accuracy Rates</CardTitle>
            <CardDescription>
              Complete format support with expected conversion performance for different PDF types.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Format</th>
                    <th className="text-left p-3 font-medium">Extension</th>
                    <th className="text-left p-3 font-medium">Document Type</th>
                    <th className="text-left p-3 font-medium">Accuracy</th>
                    <th className="text-left p-3 font-medium">Best Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  {formatData.map((format, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{format.format}</td>
                      <td className="p-3 text-muted-foreground">
                        {format.extension}
                      </td>
                      <td className="p-3">{format.type}</td>
                      <td className="p-3 font-medium text-green-600">
                        {format.accuracy}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {format.useCase}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SEO Keyword Cluster Section */}
      <section className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-center mb-6">
            Convert PDF to Any Format You Need
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground leading-relaxed">
              Looking for a reliable way to <strong>convert PDF to Word</strong>? Need to <strong>convert PDF to Excel</strong> for data analysis? Toolspy's PDF converter makes it simple. Whether you want to <strong>convert PDF to PowerPoint</strong> for presentations, <strong>convert PDF to HTML</strong> for web publishing, or <strong>convert PDF to images</strong> for graphics work, our tool handles it all with professional accuracy.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Our advanced OCR technology can even <strong>convert scanned PDF to Word</strong>, turning image-based documents into fully editable text. Students, professionals, and businesses trust our converter to <strong>convert PDF to DOCX</strong>, <strong>convert PDF to XLSX</strong>, and other formats while preserving original formatting and layout.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Unlike other converters that require registration or have file size limits, Toolspy lets you <strong>convert PDF files</strong> up to 100MB completely free. Your documents are processed locally in your browser, ensuring privacy and security. Whether you need to <strong>convert PDF to editable format</strong> or extract specific content, our tool delivers professional results every time.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Try our PDF converter today and see why thousands of users choose Toolspy for their document conversion needs. From simple text extraction to complex layout preservation, we make <strong>PDF conversion</strong> fast, accurate, and completely free.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h3 className="text-2xl font-bold text-center">
          Your Questions Answered
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Everything you need to know about converting PDFs with Toolspy.
        </p>
        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <Card key={index}>
              <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() =>
                  setSelectedFaq(selectedFaq === index ? null : index)
                }
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base"><h4>{faq.question}</h4></CardTitle>
                  {selectedFaq === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </CardHeader>
              {selectedFaq === index && (
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools 
        currentToolSlug="pdf-converter"
        title="More PDF Tools You'll Love"
        description="Complete your PDF workflow with these complementary tools."
      />

      {/* Final CTA Section */}
      <section className="space-y-6">
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Convert Your PDFs?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Join thousands of people who use Toolspy every day to convert their PDFs to editable formats. It's free, fast, and your documents stay private on your device.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Converting Now →
          </Button>
        </div>
      </section>
    </div>
  );
} 