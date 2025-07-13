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
  Image,
} from "lucide-react";

export function JfifToPdfSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const comparisonData = [
    {
      feature: "Max File Size",
      toolspy: "50MB",
      smallpdf: "5MB",
      ilovepdf: "25MB",
      pdfcandy: "100MB",
      toolspyStatus: "good",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Up to 50 files",
      smallpdf: "❌ Single file",
      ilovepdf: "✅ Up to 10 files",
      pdfcandy: "✅ Up to 20 files",
      toolspyStatus: "excellent",
    },
    {
      feature: "Page Layout Control",
      toolspy: "✅ Full control",
      smallpdf: "❌ Auto only",
      ilovepdf: "✅ Basic options",
      pdfcandy: "✅ Limited options",
      toolspyStatus: "excellent",
    },
    {
      feature: "Custom Margins",
      toolspy: "✅ 0-50mm precision",
      smallpdf: "❌ Fixed margins",
      ilovepdf: "❌ No control",
      pdfcandy: "✅ Basic control",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy",
      toolspy: "✅ Client-side processing",
      smallpdf: "⚠️ Server-based",
      ilovepdf: "⚠️ Server-based",
      pdfcandy: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      smallpdf: "❌ Account required",
      ilovepdf: "✅ Limited usage",
      pdfcandy: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Output Quality",
      toolspy: "✅ High quality",
      smallpdf: "✅ Good quality",
      ilovepdf: "✅ Good quality",
      pdfcandy: "✅ Standard quality",
      toolspyStatus: "excellent",
    },
    {
      feature: "Page Size Options",
      toolspy: "✅ A4, Letter, Legal",
      smallpdf: "✅ A4, Letter",
      ilovepdf: "✅ A4 only",
      pdfcandy: "✅ A4, Letter",
      toolspyStatus: "excellent",
    },
  ];

  const faqData = [
    {
      question: "What is JFIF format and why convert it to PDF?",
      answer:
        "JFIF (JPEG File Interchange Format) is a standard format for storing JPEG images. Converting JFIF to PDF is useful for creating documents, presentations, portfolios, or archiving images in a universally compatible format. PDFs preserve image quality while providing professional document structure.",
    },
    {
      question: "Is Toolspy's JFIF to PDF converter completely free?",
      answer:
        "Yes, our JFIF to PDF converter is completely free with no hidden costs, registration requirements, or usage limitations. Convert unlimited JFIF files to PDF without any restrictions. Unlike many competitors that require paid subscriptions for batch processing, all our features are available free of charge.",
    },
    {
      question: "How many JFIF files can I convert to PDF at once?",
      answer:
        "You can convert up to 50 JFIF files simultaneously in a single batch. Our tool processes each file individually and creates separate PDF documents for each JFIF image. This is significantly more than most competitors who limit batch processing to paid users.",
    },
    {
      question: "Is it safe to upload my JFIF images to this converter?",
      answer:
        "Absolutely! Our JFIF to PDF converter uses client-side processing, meaning your images are converted directly in your browser and never uploaded to our servers. This ensures complete privacy and security for your sensitive images. Your data never leaves your device.",
    },
    {
      question: "What page sizes and orientations are supported?",
      answer:
        "We support multiple page sizes including A4 (210×297 mm), Letter (8.5×11 in), and Legal (8.5×14 in). You can choose from auto-orientation (based on image dimensions), portrait, or landscape orientations. The tool automatically optimizes layout for the best fit.",
    },
    {
      question: "Can I control the positioning of images in the PDF?",
      answer:
        "Yes! You have full control over image positioning within the PDF pages. Choose from center, top-left, top-center, or top-right positioning. You can also customize margins from 0-50mm for precise layout control. Images are automatically scaled to fit while maintaining aspect ratio.",
    },
    {
      question: "Will the image quality be preserved in the PDF?",
      answer:
        "Yes, our converter preserves the original image quality when converting JFIF to PDF. The images are embedded in the PDF without additional compression or quality loss. The resulting PDF maintains the same visual quality as your original JFIF files.",
    },
    {
      question: "What's the maximum file size supported?",
      answer:
        "Our converter supports JFIF files up to 50MB each, which is larger than many competitors. SmallPDF only supports 5MB files, while ILovePDF supports up to 25MB. This makes our tool ideal for high-resolution photography and professional image processing.",
    },
    {
      question: "Can I convert other image formats to PDF?",
      answer:
        "Yes! Besides JFIF, we support converting many other image formats to PDF including JPEG, PNG, WebP, HEIC, and more. Check our other conversion tools for specific format support. All our converters use the same high-quality, privacy-focused approach.",
    },
    {
      question: "Do I need to install any software to use this tool?",
      answer:
        "No installation required! Our JFIF to PDF converter is a web-based tool that runs entirely in your browser. It works on all modern browsers including Chrome, Firefox, Safari, and Edge. The tool also works on mobile devices for on-the-go conversions.",
    },
  ];

  const benefits = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Professional PDF Creation",
      description:
        "Create high-quality PDF documents from JFIF images with professional layout options and customizable settings.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Batch Processing",
      description:
        "Convert up to 50 JFIF files simultaneously with intelligent processing and progress tracking.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy",
      description:
        "Client-side processing ensures your images never leave your device, providing maximum privacy and security.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Customizable Layout",
      description:
        "Control page size, orientation, image positioning, and margins for perfect document layout.",
    },
  ];

  const relatedTools = [
    {
      name: "PDF to Image Converter",
      description: "Convert PDF documents to various image formats",
      href: "/pdf-to-image",
      keywords: "pdf to image, pdf converter",
      comingSoon: true,
    },
    {
      name: "Image Compressor",
      description: "Compress images while maintaining quality",
      href: "/image-compressor",
      keywords: "image compressor, optimize images",
    },
    {
      name: "HEIC to PDF Converter",
      description: "Convert HEIC images to PDF documents",
      href: "/heic-to-pdf",
      keywords: "heic to pdf, apple images",
      comingSoon: true,
    },
    {
      name: "Merge PDF Files",
      description: "Combine multiple PDF files into a single document",
      href: "/merge-pdf",
      keywords: "merge pdf, combine pdf",
      comingSoon: true,
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Tool Poster Image */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="relative mx-auto max-w-4xl">
            <img
              src="https://via.placeholder.com/1200x600/0ea5e9/ffffff?text=JFIF+to+PDF+Converter+%7C+Toolspy+-+Professional+Document+Creation+%7C+Batch+Processing"
              alt="Toolspy JFIF to PDF Converter - Professional document creation with batch processing and layout control"
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
            Professional JFIF to PDF Conversion Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Toolspy's JFIF to PDF Converter is the ultimate solution for transforming JFIF images into professional PDF documents. 
            Our advanced conversion engine provides complete control over page layout, image positioning, and document structure, 
            making it perfect for creating portfolios, presentations, and archival documents.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-4">
            Whether you're a photographer organizing your portfolio, a business professional creating presentations, or anyone 
            needing to convert JFIF images to PDF format, our tool delivers superior results with complete privacy protection 
            and professional-grade features.
          </p>
        </div>
      </section>

      {/* How to Use Guide */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          How to Convert JFIF to PDF
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Follow these simple steps to convert your JFIF images to professional PDF documents.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x400/f3f4f6/6b7280?text=Upload+JFIF+Files+-+Drag+and+Drop+Interface"
              alt="JFIF Upload Interface - Drag and drop JFIF files for conversion"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">1. Upload JFIF Files</h4>
            <p className="text-sm text-muted-foreground">
              Drag and drop your JFIF images or click to browse. Support for batch uploading up to 50 files simultaneously.
            </p>
          </Card>

          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x400/ddd6fe/7c3aed?text=PDF+Settings+-+Page+Size+Orientation+Position"
              alt="PDF Settings Panel - Configure page size, orientation, and image positioning"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">2. Configure PDF Settings</h4>
            <p className="text-sm text-muted-foreground">
              Choose page size, orientation, image position, and margins for perfect document layout.
            </p>
          </Card>

          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x400/dcfce7/16a34a?text=Conversion+Process+-+Real-time+Progress+Tracking"
              alt="Conversion Progress - Real-time progress tracking during JFIF to PDF conversion"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">3. Convert to PDF</h4>
            <p className="text-sm text-muted-foreground">
              Click convert and watch real-time progress as your JFIF images are transformed into PDF documents.
            </p>
          </Card>

          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x400/fef3c7/d97706?text=Download+PDFs+-+Individual+or+Batch+Download"
              alt="Download PDF Results - Download individual PDFs or all at once"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">4. Download PDF Files</h4>
            <p className="text-sm text-muted-foreground">
              Download your converted PDF files individually or all at once. Perfect quality preservation guaranteed.
            </p>
          </Card>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Toolspy's JFIF to PDF Converter?
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
              See how Toolspy compares to other JFIF to PDF converters
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
                    <th className="text-left p-3 font-medium">PDFCandy</th>
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
                      <td className="p-3 text-muted-foreground">{row.pdfcandy}</td>
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
          Related Tools
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
            Convert Your JFIF Images to PDF Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Transform your JFIF images into professional PDF documents with complete privacy protection and advanced layout control.
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