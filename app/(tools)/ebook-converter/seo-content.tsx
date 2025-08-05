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
  BookOpen,
  Edit,
  Download,
  Clock,
  Layers,
  User,
  Globe,
  FileText,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";

export function EbookConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("ebook-converter");

  const comparisonData = [
    {
      feature: "Format Support",
      toolspy: "✅ 6+ formats",
      calibre: "✅ 30+ formats",
      zamzar: "✅ 15+ formats",
      convertio: "✅ 20+ formats",
      toolspyStatus: "excellent",
    },
    {
      feature: "Metadata Editing",
      toolspy: "✅ Full editor",
      calibre: "✅ Advanced",
      zamzar: "❌ Basic only",
      convertio: "❌ Limited",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Multiple files",
      calibre: "✅ Bulk convert",
      zamzar: "⚠️ Premium only",
      convertio: "⚠️ 2 files max",
      toolspyStatus: "excellent",
    },
    {
      feature: "Cover Image Support",
      toolspy: "✅ Upload & embed",
      calibre: "✅ Full support",
      zamzar: "❌ Not supported",
      convertio: "❌ Not supported",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side",
      calibre: "✅ Offline app",
      zamzar: "⚠️ Server upload",
      convertio: "⚠️ Server upload",
      toolspyStatus: "excellent",
    },
    {
      feature: "Auto-fill Metadata",
      toolspy: "✅ Smart suggestions",
      calibre: "⚠️ Manual only",
      zamzar: "❌ Not available",
      convertio: "❌ Not available",
      toolspyStatus: "excellent",
    },
    {
      feature: "File Size Limit",
      toolspy: "50MB",
      calibre: "No limit",
      zamzar: "50MB free",
      convertio: "100MB free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Registration Required",
      toolspy: "✅ No signup",
      calibre: "✅ No signup",
      zamzar: "⚠️ Email required",
      convertio: "⚠️ Account needed",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Universal Format Support",
      description: "Convert between EPUB, MOBI, PDF, DOCX, TXT, and HTML with perfect compatibility across all devices."
    },
    {
      icon: <Edit className="h-6 w-6" />,
      title: "Professional Metadata Editor",
      description: "Edit title, author, publisher, description, genre, language, and ISBN with auto-fill suggestions."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Batch Conversion",
      description: "Convert multiple e-books simultaneously with consistent settings and progress tracking."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "All conversion processing happens locally in your browser - your e-books never leave your device."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Options",
      description: "Fine-tune formatting, image optimization, font embedding, and table of contents generation."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Cover Image Support",
      description: "Upload and embed custom cover images to make your e-books look professional."
    }
  ];

  const useCases = [
    {
      title: "Authors & Publishers",
      description: "Convert manuscripts between formats for different publishing platforms and e-book stores.",
      examples: ["Amazon Kindle", "Apple Books", "Google Play", "Draft manuscripts"]
    },
    {
      title: "Students & Researchers",
      description: "Convert academic papers, research documents, and study materials for different devices.",
      examples: ["Research papers", "Academic texts", "Study guides", "Reference materials"]
    },
    {
      title: "Digital Libraries",
      description: "Standardize e-book collections and ensure compatibility across all reading devices.",
      examples: ["Library digitization", "Archive conversion", "Format standardization", "Legacy document updates"]
    },
    {
      title: "Content Creators",
      description: "Transform blog posts, articles, and content into professional e-book formats.",
      examples: ["Blog compilations", "Article collections", "How-to guides", "Course materials"]
    }
  ];

  const formatGuide = [
    {
      format: "EPUB",
      description: "Most universal e-book format",
      bestFor: "E-readers, tablets, phones",
      features: ["Reflowable text", "Multimedia support", "Universal compatibility"]
    },
    {
      format: "MOBI/AZW",
      description: "Amazon Kindle exclusive format",
      bestFor: "Kindle devices and apps",
      features: ["Kindle optimized", "Whispersync support", "Notes & highlights"]
    },
    {
      format: "PDF",
      description: "Fixed layout document format",
      bestFor: "Print-replica books, academic papers",
      features: ["Fixed formatting", "Print ready", "Cross-platform viewing"]
    },
    {
      format: "DOCX",
      description: "Microsoft Word document format",
      bestFor: "Editing and collaboration",
      features: ["Full editing", "Track changes", "Comments & reviews"]
    }
  ];

  const conversionTips = [
    {
      title: "EPUB to MOBI",
      tip: "Enable 'Embed fonts' for consistent Kindle display and use 'Generate TOC' for better navigation."
    },
    {
      title: "PDF to EPUB",
      tip: "Enable 'Preserve formatting' but disable 'Optimize images' for text-heavy documents to maintain readability."
    },
    {
      title: "DOCX to EPUB",
      tip: "Use 'Generate TOC' and ensure proper heading styles in your Word document for automatic chapter detection."
    },
    {
      title: "HTML to E-book",
      tip: "Clean up HTML code first and use 'Optimize images' to reduce file size while maintaining quality."
    }
  ];

  const faqs = [
    {
      question: "What e-book formats can I convert between?",
      answer: "Our converter supports all major e-book formats including EPUB (universal), MOBI/AZW (Kindle), PDF (fixed layout), DOCX (Word), TXT (plain text), and HTML (web). You can convert between any of these formats with full compatibility and professional results."
    },
    {
      question: "How do I edit e-book metadata like title and author?",
      answer: "For single files, click 'Edit Metadata' to access our comprehensive editor. You can modify title, author, publisher, description, genre, language, ISBN, publish date, and more. Use the 'Auto-fill' feature for quick setup with sample data, and upload custom cover images for professional presentation."
    },
    {
      question: "Can I convert multiple e-books at once?",
      answer: "Yes! Upload multiple e-book files to enable batch processing mode. All files will be converted using the same settings and target format. You can monitor individual progress and download all converted files at once for efficient bulk conversion."
    },
    {
      question: "Which format should I choose for Amazon Kindle?",
      answer: "For Kindle devices and apps, choose MOBI or AZW format. Enable 'Embed fonts' and 'Generate TOC' settings for optimal Kindle experience. These formats support Whispersync, notes, highlights, and other Kindle-specific features."
    },
    {
      question: "Is my e-book data secure during conversion?",
      answer: "Absolutely! All conversion processing happens locally in your browser using advanced client-side technology. Your e-books and metadata never leave your device, ensuring complete privacy and security of your intellectual property and personal documents."
    },
    {
      question: "How can I optimize e-books for different devices?",
      answer: "Use EPUB for universal compatibility (tablets, phones, e-readers), MOBI for Kindle devices, PDF for fixed layouts or print-replica books, and DOCX for editing. Enable 'Optimize images' to reduce file size and 'Preserve formatting' to maintain layout across devices."
    },
    {
      question: "What should I do if my converted e-book has formatting issues?",
      answer: "Try these settings: Enable 'Preserve formatting' for layout retention, disable 'Optimize images' for text-heavy documents, use 'Generate TOC' for proper navigation, and ensure your source document has proper heading styles. For PDF sources, the original layout quality affects conversion results."
    },
    {
      question: "Can I add a custom cover image to my e-book?",
      answer: "Yes! In the metadata editor, click 'Upload Cover' to add a custom cover image. We support JPG, PNG, and other image formats. The cover will be embedded in your converted e-book and displayed in e-reader libraries and bookstores."
    },
    {
      question: "How do I convert a Word document to an e-book?",
      answer: "Upload your DOCX file and select your target format (EPUB for universal compatibility). Use proper heading styles in Word for automatic chapter detection, enable 'Generate TOC' for navigation, and edit metadata to add title, author, and description information."
    },
    {
      question: "What's the difference between EPUB and MOBI formats?",
      answer: "EPUB is the universal standard supported by most e-readers, tablets, and phones. MOBI/AZW is Amazon's proprietary format for Kindle devices. EPUB offers broader compatibility, while MOBI provides Kindle-specific features like Whispersync. Choose based on your target reading platform."
    }
  ];

  // Register FAQ data for schema generation
  if (typeof window !== 'undefined') {
    registerToolFAQ('ebook-converter', () => faqs);
  }

  return (
    <div className="space-y-12 mt-12">
      {/* Features Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Professional E-book Conversion Suite
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Convert e-books between all major formats with advanced metadata editing, cover image support, and complete privacy protection.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-indigo-200 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Format Guide */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            E-book Format Guide
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the right format for your needs and target reading platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {formatGuide.map((format, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  {format.format}
                </CardTitle>
                <CardDescription>{format.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Best for:</div>
                    <div className="text-sm text-gray-600">{format.bestFor}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {format.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Conversion Tips */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Conversion Best Practices
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Expert tips for optimal conversion results between different e-book formats.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {conversionTips.map((tip, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg text-indigo-600">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{tip.tip}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How We Compare
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how our e-book converter outperforms popular alternatives with better privacy and professional features.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold bg-indigo-50">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Toolspy
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold">Calibre</th>
                    <th className="text-center p-4 font-semibold">Zamzar</th>
                    <th className="text-center p-4 font-semibold">Convertio</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center bg-indigo-50">
                        <div className="flex items-center justify-center gap-2">
                          {row.toolspyStatus === "excellent" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">{row.toolspy}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">{row.calibre}</td>
                      <td className="p-4 text-center">{row.zamzar}</td>
                      <td className="p-4 text-center">{row.convertio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Use Cases */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Perfect for Every Publishing Need
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From independent authors to digital libraries, our converter handles all e-book transformation needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-indigo-600" />
                  {useCase.title}
                </CardTitle>
                <CardDescription>{useCase.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {useCase.examples.map((example, idx) => (
                    <Badge key={idx} variant="secondary">
                      {example}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Publishing Platforms Guide */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Publishing Platform Requirements
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the right format for different e-book publishing platforms and stores.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">Amazon Kindle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div><strong>Format:</strong> MOBI, AZW, KPF</div>
                <div><strong>Requirements:</strong> Embedded fonts, TOC navigation</div>
                <div><strong>Optimal:</strong> Enable Kindle-specific features</div>
                <div><strong>Tips:</strong> Use auto-fill metadata for KDP publishing</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Apple Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div><strong>Format:</strong> EPUB 3.0</div>
                <div><strong>Requirements:</strong> Validated EPUB, proper metadata</div>
                <div><strong>Optimal:</strong> High-quality cover image</div>
                <div><strong>Tips:</strong> Enable multimedia and interactive features</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Universal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div><strong>Format:</strong> EPUB 2.0/3.0</div>
                <div><strong>Requirements:</strong> Standard metadata, reflowable text</div>
                <div><strong>Optimal:</strong> Cross-platform compatibility</div>
                <div><strong>Tips:</strong> Works on most e-readers and apps</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about e-book conversion, formats, and publishing requirements.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto"
                  onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                >
                  <CardTitle className="text-left text-lg font-semibold">
                    {faq.question}
                  </CardTitle>
                  {selectedFaq === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </CardHeader>
              {selectedFaq === index && (
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section>
                <RelatedTools
          currentToolSlug="ebook-converter"
        />
      </section>
    </div>
  );
}