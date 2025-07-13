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
  Plus,
  Shield,
  Zap,
  Settings,
} from "lucide-react";

export function MergePdfSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const comparisonData = [
    {
      feature: "Max Files",
      toolspy: "20 files",
      smallpdf: "2 files",
      ilovepdf: "10 files",
      sejda: "3 files",
      toolspyStatus: "excellent",
    },
    {
      feature: "File Size Limit",
      toolspy: "50MB per file",
      smallpdf: "5MB per file",
      ilovepdf: "25MB per file",
      sejda: "200MB total",
      toolspyStatus: "excellent",
    },
    {
      feature: "Page Reordering",
      toolspy: "✅ Full control",
      smallpdf: "❌ No control",
      ilovepdf: "❌ No control",
      sejda: "✅ Basic control",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy",
      toolspy: "✅ Client-side processing",
      smallpdf: "⚠️ Server-based",
      ilovepdf: "⚠️ Server-based",
      sejda: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      smallpdf: "❌ Account required",
      ilovepdf: "✅ Limited usage",
      sejda: "❌ Account required",
      toolspyStatus: "excellent",
    },
    {
      feature: "Output Quality",
      toolspy: "✅ Original quality",
      smallpdf: "✅ Good quality",
      ilovepdf: "✅ Good quality",
      sejda: "✅ Good quality",
      toolspyStatus: "excellent",
    },
    {
      feature: "Processing Speed",
      toolspy: "✅ Instant",
      smallpdf: "⚠️ Server delays",
      ilovepdf: "⚠️ Server delays",
      sejda: "⚠️ Server delays",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Operations",
      toolspy: "✅ Single operation",
      smallpdf: "❌ Multiple uploads",
      ilovepdf: "❌ Multiple uploads",
      sejda: "❌ Multiple uploads",
      toolspyStatus: "excellent",
    },
  ];

  const faqData = [
    {
      question: "How do I merge multiple PDF files into one document?",
      answer:
        "Simply upload your PDF files using our drag-and-drop interface, arrange them in the desired order using the arrow buttons, and click 'Merge PDF Files'. The tool will combine all pages from your PDFs into a single document while maintaining the original quality and formatting.",
    },
    {
      question: "Is Toolspy's PDF merger completely free to use?",
      answer:
        "Yes, our PDF merger is completely free with no hidden costs, registration requirements, or usage limitations. You can merge unlimited PDF files without any restrictions. Unlike many competitors that limit free users to 2-3 files, we allow up to 20 files per merge operation.",
    },
    {
      question: "Can I control the order of pages in the merged PDF?",
      answer:
        "Absolutely! You have complete control over the order of your PDF files. Use the up/down arrow buttons to rearrange files in your preferred sequence. The merged PDF will contain all pages from the first file, followed by all pages from the second file, and so on.",
    },
    {
      question: "Is it safe to upload my PDF files to this merger?",
      answer:
        "Yes, it's completely safe! Our PDF merger uses client-side processing, meaning your files are processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security for your sensitive documents. Your data never leaves your device.",
    },
    {
      question: "What's the maximum number of PDF files I can merge?",
      answer:
        "You can merge up to 20 PDF files in a single operation, which is significantly more than most competitors. SmallPDF only allows 2 files, ILovePDF allows 10, and Sejda allows 3. Our generous limit makes it perfect for combining extensive document collections.",
    },
    {
      question: "What's the maximum file size supported?",
      answer:
        "Each PDF file can be up to 50MB in size, giving you plenty of room for high-quality documents with images, graphics, and complex layouts. This is larger than SmallPDF (5MB) and competitive with other professional tools.",
    },
    {
      question: "Will the merged PDF maintain the original quality?",
      answer:
        "Yes, our merger preserves the original quality of all your PDF documents. We don't compress or alter the content during the merging process. The output PDF maintains the same resolution, formatting, and quality as your original files.",
    },
    {
      question: "Can I merge password-protected PDF files?",
      answer:
        "Currently, our tool works with unprotected PDF files. If you have password-protected PDFs, you'll need to remove the password protection first. We're working on adding support for password-protected files in future updates.",
    },
    {
      question: "How long does it take to merge PDF files?",
      answer:
        "The merging process is nearly instantaneous since it happens directly in your browser. Processing time depends on the number and size of your files, but most operations complete within seconds. There's no waiting for server processing or file uploads.",
    },
    {
      question: "Can I merge PDFs with different page sizes?",
      answer:
        "Yes, you can merge PDFs with different page sizes (A4, Letter, Legal, etc.). The merged PDF will preserve the original page size of each document. Pages will appear in their original dimensions within the final merged document.",
    },
  ];

  const benefits = [
    {
      icon: <Plus className="h-6 w-6" />,
      title: "Simple File Combining",
      description:
        "Easily combine multiple PDF documents into a single file with our intuitive drag-and-drop interface.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Full Order Control",
      description:
        "Rearrange your PDF files in any order before merging with easy-to-use arrow controls.",
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
        "Instant merging with no upload delays or server processing time. Process files directly in your browser.",
    },
  ];

  const relatedTools = [
    {
      name: "PDF Compressor",
      description: "Reduce PDF file size while maintaining quality",
      href: "/compress-pdf",
      keywords: "pdf compressor, reduce size",
      comingSoon: true,
    },
    {
      name: "PDF to Image Converter",
      description: "Convert PDF pages to various image formats",
      href: "/pdf-to-image",
      keywords: "pdf to image, convert pdf",
      comingSoon: true,
    },
    {
      name: "JFIF to PDF Converter",
      description: "Convert JFIF images to PDF documents",
      href: "/jfif-to-pdf",
      keywords: "jfif to pdf, image to pdf",
      comingSoon: true,
    },
    {
      name: "Image Compressor",
      description: "Compress images while maintaining quality",
      href: "/image-compressor",
      keywords: "image compressor, optimize images",
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Tool Poster Image */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="relative mx-auto max-w-4xl">
            <img
              src="https://via.placeholder.com/1200x600/0ea5e9/ffffff?text=Merge+PDF+Files+%7C+Toolspy+-+Combine+Documents+%7C+Privacy+Protected"
              alt="Toolspy Merge PDF Files - Combine multiple PDF documents with complete privacy and control"
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
            Professional PDF Merging Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Toolspy's PDF Merger is the ultimate solution for combining multiple PDF documents into a single, organized file. 
            Our advanced merging technology provides complete control over document order while maintaining original quality 
            and formatting throughout the process.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-4">
            Whether you're combining reports, presentations, contracts, or any other PDF documents, our tool delivers 
            professional results with complete privacy protection. Perfect for business professionals, students, and 
            anyone who needs to organize multiple PDF files efficiently.
          </p>
        </div>
      </section>

      {/* How to Use Guide */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          How to Merge PDF Files
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Follow these simple steps to combine your PDF documents into a single file.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x400/f3f4f6/6b7280?text=Upload+PDF+Files+-+Drag+and+Drop+Interface"
              alt="PDF Upload Interface - Drag and drop multiple PDF files for merging"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">1. Upload PDF Files</h4>
            <p className="text-sm text-muted-foreground">
              Drag and drop your PDF files or click to browse. Upload up to 20 files simultaneously for batch merging.
            </p>
          </Card>

          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x400/ddd6fe/7c3aed?text=Arrange+Order+-+File+Reordering+Controls"
              alt="File Ordering Interface - Rearrange PDF files in desired order"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">2. Arrange File Order</h4>
            <p className="text-sm text-muted-foreground">
              Use the arrow buttons to rearrange your PDF files in the exact order you want them merged.
            </p>
          </Card>

          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x400/dcfce7/16a34a?text=Merge+Process+-+Real-time+Progress+Tracking"
              alt="Merging Process - Real-time progress tracking during PDF combination"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">3. Merge Documents</h4>
            <p className="text-sm text-muted-foreground">
              Click merge and watch real-time progress as your PDF files are combined into a single document.
            </p>
          </Card>

          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x400/fef3c7/d97706?text=Download+Result+-+Merged+PDF+Document"
              alt="Download Interface - Download merged PDF document"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">4. Download Merged PDF</h4>
            <p className="text-sm text-muted-foreground">
              Download your merged PDF document with all pages combined in your specified order.
            </p>
          </Card>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Toolspy's PDF Merger?
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
              See how Toolspy compares to other PDF merging tools
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
                    <th className="text-left p-3 font-medium">Sejda</th>
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
                      <td className="p-3 text-muted-foreground">{row.sejda}</td>
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
            Merge Your PDF Files Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Combine multiple PDF documents into a single file with complete privacy protection and professional results.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Merging PDFs →
          </Button>
        </div>
      </section>
    </div>
  );
} 