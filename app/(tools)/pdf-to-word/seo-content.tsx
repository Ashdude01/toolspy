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
  FileText,
  FileType,
  Shield,
  Zap,
  Settings,
} from "lucide-react";

export function PdfToWordSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const comparisonData = [
    {
      feature: "Max Files",
      toolspy: "10 files",
      smallpdf: "2 files",
      ilovepdf: "1 file",
      zamzar: "5 files",
      toolspyStatus: "excellent",
    },
    {
      feature: "File Size Limit",
      toolspy: "50MB per file",
      smallpdf: "5MB per file",
      ilovepdf: "10MB per file",
      zamzar: "50MB per file",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy",
      toolspy: "✅ Client-side processing",
      smallpdf: "⚠️ Server-based",
      ilovepdf: "⚠️ Server-based",
      zamzar: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      smallpdf: "❌ Account required",
      ilovepdf: "✅ Limited usage",
      zamzar: "❌ Account required",
      toolspyStatus: "excellent",
    },
    {
      feature: "Output Quality",
      toolspy: "✅ Good quality",
      smallpdf: "✅ Good quality",
      ilovepdf: "✅ Good quality",
      zamzar: "✅ Excellent quality",
      toolspyStatus: "good",
    },
    {
      feature: "Processing Speed",
      toolspy: "✅ Instant",
      smallpdf: "⚠️ Server delays",
      ilovepdf: "⚠️ Server delays",
      zamzar: "⚠️ Server delays",
      toolspyStatus: "excellent",
    },
  ];

  const faqData = [
    {
      question: "How do I convert PDF to Word document?",
      answer:
        "Simply upload your PDF files using our drag-and-drop interface and click 'Convert to Word'. The tool will extract text content and create a downloadable .docx file that you can edit in Microsoft Word or other word processors.",
    },
    {
      question: "Is Toolspy's PDF to Word converter completely free?",
      answer:
        "Yes, our PDF to Word converter is completely free with no hidden costs, registration requirements, or usage limitations. You can convert unlimited PDF files without any restrictions.",
    },
    {
      question: "Will the formatting be preserved when converting PDF to Word?",
      answer:
        "Our current implementation focuses on text extraction. While basic text content is preserved, complex formatting, images, and layouts may need manual adjustment in the Word document. We're working on enhanced formatting preservation in future updates.",
    },
    {
      question: "Is it safe to upload my PDF files to this converter?",
      answer:
        "Yes, it's completely safe! Our PDF to Word converter uses client-side processing, meaning your files are processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security for your sensitive documents.",
    },
    {
      question: "What's the maximum number of PDF files I can convert?",
      answer:
        "You can convert up to 10 PDF files in a single operation. This generous limit allows you to batch process multiple documents efficiently without needing multiple sessions.",
    },
    {
      question: "What's the maximum file size supported?",
      answer:
        "Each PDF file can be up to 50MB in size, which accommodates most standard documents including those with images and complex layouts. This size limit ensures optimal performance while handling substantial documents.",
    },
    {
      question: "Can I convert password-protected PDF files?",
      answer:
        "Currently, our tool works with unprotected PDF files. If you have password-protected PDFs, you'll need to remove the password protection first using our PDF Password Remover tool (coming soon).",
    },
    {
      question: "How long does the conversion process take?",
      answer:
        "The conversion process is nearly instantaneous since it happens directly in your browser. Processing time depends on the file size and complexity, but most conversions complete within seconds.",
    },
    {
      question: "What Word format does the tool output?",
      answer:
        "The tool outputs .docx files (Microsoft Word format) that are compatible with Microsoft Word, Google Docs, LibreOffice Writer, and other modern word processing applications.",
    },
    {
      question: "Can I edit the converted Word document?",
      answer:
        "Yes, absolutely! The converted .docx file is fully editable in any word processing application. You can modify text, add formatting, insert images, and make any other changes just like a regular Word document.",
    },
  ];

  const benefits = [
    {
      icon: <FileType className="h-6 w-6" />,
      title: "Easy PDF to Word Conversion",
      description:
        "Convert PDF documents to editable Word files with our simple drag-and-drop interface.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Batch Processing",
      description:
        "Convert multiple PDF files to Word format simultaneously to save time and effort.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy",
      description:
        "Client-side processing ensures your documents never leave your device, providing maximum security.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description:
        "Instant conversion with no upload delays or server processing time. Process files directly in your browser.",
    },
  ];

  const relatedTools = [
    {
      name: "PDF to Excel Converter",
      description: "Convert PDF documents to Excel spreadsheets",
      href: "/pdf-to-excel",
      keywords: "pdf to excel, convert pdf to xlsx",
      comingSoon: true,
    },
    {
      name: "PDF to CSV Converter",
      description: "Extract tabular data from PDF to CSV format",
      href: "/pdf-to-csv",
      keywords: "pdf to csv, extract data",
      comingSoon: true,
    },
    {
      name: "Split PDF",
      description: "Split large PDF files into smaller documents",
      href: "/split-pdf",
      keywords: "split pdf, divide pdf",
      comingSoon: true,
    },
    {
      name: "Merge PDF",
      description: "Combine multiple PDF documents into one file",
      href: "/merge-pdf",
      keywords: "merge pdf, combine pdf",
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Introduction Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Professional PDF to Word Conversion Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Toolspy's PDF to Word Converter provides reliable document conversion that transforms your PDF files into editable Word documents. 
            Our advanced processing technology extracts text content while maintaining document structure for easy editing and modification.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-4">
            Perfect for business professionals, students, and content creators who need to edit PDF content, extract text for reports, 
            or convert documents for collaborative editing. Our privacy-focused approach ensures your sensitive documents remain secure.
          </p>
        </div>
      </section>

      {/* How to Use Guide */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          How to Convert PDF to Word
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Follow these simple steps to convert your PDF documents into editable Word files.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <div className="w-full h-32 bg-red-100 rounded-lg mb-4 flex items-center justify-center">
              <FileText className="h-12 w-12 text-red-500" />
            </div>
            <h4 className="font-semibold mb-2">1. Upload PDF Files</h4>
            <p className="text-sm text-muted-foreground">
              Drag and drop your PDF files or click to browse. Upload up to 10 files for batch conversion.
            </p>
          </Card>

          <Card className="p-4">
            <div className="w-full h-32 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
              <FileType className="h-12 w-12 text-blue-500" />
            </div>
            <h4 className="font-semibold mb-2">2. Start Conversion</h4>
            <p className="text-sm text-muted-foreground">
              Click the convert button and watch as your PDF files are processed into editable Word documents.
            </p>
          </Card>

          <Card className="p-4">
            <div className="w-full h-32 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
              <Zap className="h-12 w-12 text-green-500" />
            </div>
            <h4 className="font-semibold mb-2">3. Instant Processing</h4>
            <p className="text-sm text-muted-foreground">
              Your files are converted instantly in your browser with real-time progress tracking.
            </p>
          </Card>

          <Card className="p-4">
            <div className="w-full h-32 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
              <FileType className="h-12 w-12 text-purple-500" />
            </div>
            <h4 className="font-semibold mb-2">4. Download Word Files</h4>
            <p className="text-sm text-muted-foreground">
              Download your converted .docx files individually or all at once for immediate editing.
            </p>
          </Card>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Toolspy's PDF to Word Converter?
        </h3>
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

      {/* Comparison Table */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Toolspy vs. Competitors
        </h3>
        <Card>
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
            <CardDescription>
              See how Toolspy compares to other PDF to Word conversion tools
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
                    <th className="text-left p-3 font-medium">Zamzar</th>
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
                      <td className="p-3 text-muted-foreground">{row.zamzar}</td>
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
        <h3 className="text-2xl font-bold text-center">
          Frequently Asked Questions
        </h3>
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
                  <CardTitle className="text-base">
                    <h4>{faq.question}</h4>
                  </CardTitle>
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
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Related PDF Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedTools.map((tool, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">{tool.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tool.description}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Keywords: {tool.keywords}
                  </p>
                  {tool.comingSoon ? (
                    <Badge variant="secondary">Coming Soon</Badge>
                  ) : (
                    <Button variant="outline" size="sm" asChild>
                      <a href={tool.href}>Try Tool →</a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="space-y-6">
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Convert Your PDF Files to Word Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Transform your PDF documents into editable Word files with complete privacy protection and instant results.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Converting PDFs →
          </Button>
        </div>
      </section>
    </div>
  );
} 