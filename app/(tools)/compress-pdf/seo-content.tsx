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
  Gauge,
  FileText,
  Shield,
  Zap,
  Target,
} from "lucide-react";

export function CompressPdfSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "How much can I reduce my PDF file size?",
      answer:
        "Typically, you can achieve 20-60% file size reduction depending on the compression level and content type. PDFs with many images compress more significantly, while text-only documents may compress less but still benefit from optimization.",
    },
    {
      question: "Is PDF compression free to use?",
      answer:
        "Yes, our PDF compressor is completely free with no registration required. Compress unlimited PDF files without watermarks, file limits, or hidden costs. All compression happens in your browser for maximum privacy.",
    },
    {
      question: "Will compression affect the quality of my PDF?",
      answer:
        "Our compression algorithm is designed to maintain visual quality while reducing file size. Choose from Light (minimal quality loss), Balanced (good compromise), or Maximum compression (smallest files) based on your needs.",
    },
    {
      question: "How many PDF files can I compress at once?",
      answer:
        "You can compress up to 20 PDF files simultaneously. Each file can be up to 50MB in size, making it perfect for batch processing of documents, presentations, and reports.",
    },
    {
      question: "Is my data secure when compressing PDFs?",
      answer:
        "Absolutely! All compression happens directly in your browser using client-side processing. Your PDF files never leave your device, ensuring complete privacy and security for sensitive documents.",
    },
    {
      question: "What types of PDFs compress best?",
      answer:
        "PDFs with high-resolution images, scanned documents, and presentations typically compress most effectively. Text-only PDFs may show smaller reductions but still benefit from optimization and structure improvements.",
    },
    {
      question: "Can I compress password-protected PDFs?",
      answer:
        "Currently, our tool works with unprotected PDF files. If you have a password-protected PDF, you'll need to remove the password protection first before compression.",
    },
    {
      question: "What's the difference between compression levels?",
      answer:
        "Light compression (10-20% reduction) maintains highest quality, Balanced compression (20-40% reduction) offers good quality-to-size ratio, and Maximum compression (40-60% reduction) prioritizes smallest file size with acceptable quality loss.",
    },
    {
      question: "Will compressed PDFs work with all PDF readers?",
      answer:
        "Yes, compressed PDFs maintain full compatibility with all standard PDF readers including Adobe Acrobat, web browsers, mobile apps, and other PDF viewers. The compression only affects file size, not functionality.",
    },
    {
      question: "How long does PDF compression take?",
      answer:
        "Compression is nearly instantaneous since it happens in your browser. Processing time depends on file size and number of files, but most operations complete within seconds without any server delays.",
    },
  ];

  const benefits = [
    {
      icon: <Gauge className="h-6 w-6" />,
      title: "Intelligent Compression",
      description:
        "Advanced algorithms reduce file size by up to 60% while maintaining document quality and readability.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Flexible Compression Levels",
      description:
        "Choose from Light, Balanced, or Maximum compression based on your quality vs. size preferences.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy",
      description:
        "Client-side processing ensures your documents never leave your device, providing maximum security.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Batch Processing",
      description:
        "Compress up to 20 PDF files simultaneously with intelligent processing and progress tracking.",
    },
  ];

  const relatedTools = [
    {
      name: "PDF to Image Converter",
      description: "Convert PDF pages to high-quality images",
      href: "/pdf-to-image",
      keywords: "pdf to image, convert pdf",
      comingSoon: true,
    },
    {
      name: "Merge PDF Files",
      description: "Combine multiple PDF documents into one",
      href: "/merge-pdf",
      keywords: "merge pdf, combine pdf",
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
              src="https://via.placeholder.com/1200x600/0ea5e9/ffffff?text=PDF+Compressor+%7C+Toolspy+-+Reduce+File+Size+%7C+Quality+Maintained"
              alt="Toolspy PDF Compressor - Reduce PDF file size while maintaining quality with privacy protection"
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
            Professional PDF Compression Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Reduce your PDF file sizes by up to 60% while maintaining document quality and readability. 
            Our advanced compression engine optimizes documents for faster sharing, reduced storage costs, 
            and improved web performance without compromising on visual fidelity.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-4">
            Perfect for email attachments, cloud storage optimization, website integration, or any scenario 
            where you need smaller PDF files without sacrificing quality. Our tool provides intelligent 
            compression with complete privacy protection.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Our PDF Compressor?
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
            Compress Your PDF Files Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Reduce your PDF file sizes while maintaining quality with complete privacy protection and professional results.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Compressing →
          </Button>
        </div>
      </section>
    </div>
  );
} 