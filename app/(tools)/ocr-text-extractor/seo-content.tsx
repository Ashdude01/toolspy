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
  Brain,
  Languages,
  Download,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";

export function OcrTextExtractorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("ocr-text-extractor");

  const comparisonData = [
    {
      feature: "Language Support",
      toolspy: "✅ 12+ languages",
      googledrive: "✅ 50+ languages",
      onlineocr: "✅ 46 languages",
      freeocr: "✅ English only",
      toolspyStatus: "excellent",
    },
    {
      feature: "File Formats",
      toolspy: "✅ Images + PDF",
      googledrive: "✅ Images + PDF",
      onlineocr: "✅ Images + PDF",
      freeocr: "✅ Images only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Multiple files",
      googledrive: "❌ Single file",
      onlineocr: "❌ Single file",
      freeocr: "❌ Single file",
      toolspyStatus: "excellent",
    },
    {
      feature: "Text Editing",
      toolspy: "✅ Built-in editor",
      googledrive: "✅ Google Docs",
      onlineocr: "❌ View only",
      freeocr: "❌ View only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Formats",
      toolspy: "✅ TXT, DOCX, PDF",
      googledrive: "✅ Multiple formats",
      onlineocr: "✅ TXT, DOC, PDF",
      freeocr: "✅ TXT only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side OCR",
      googledrive: "⚠️ Google servers",
      onlineocr: "⚠️ Server processing",
      freeocr: "⚠️ Server processing",
      toolspyStatus: "excellent",
    },
    {
      feature: "File Size Limit",
      toolspy: "50MB",
      googledrive: "100MB",
      onlineocr: "15MB",
      freeocr: "5MB",
      toolspyStatus: "excellent",
    },
    {
      feature: "Registration Required",
      toolspy: "✅ No signup needed",
      googledrive: "⚠️ Google account",
      onlineocr: "⚠️ Email required",
      freeocr: "✅ No registration",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Advanced OCR Engine",
      description: "State-of-the-art optical character recognition with high accuracy for printed and handwritten text."
    },
    {
      icon: <Languages className="h-6 w-6" />,
      title: "Multi-Language Support",
      description: "Extract text in 12+ languages including English, Spanish, French, German, Chinese, Japanese, and more."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Multiple File Formats",
      description: "Process images (JPG, PNG, GIF) and PDF documents with automatic format detection."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Batch Processing",
      description: "Upload and process multiple documents simultaneously for efficient bulk text extraction."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "All OCR processing happens locally in your browser - your documents never leave your device."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Options",
      description: "Customize OCR settings including image enhancement, table detection, and confidence thresholds."
    }
  ];

  const useCases = [
    {
      title: "Document Digitization",
      description: "Convert physical documents, scanned papers, and old files into searchable, editable text.",
      examples: ["Scanned documents", "Old books", "Historical papers", "Handwritten notes"]
    },
    {
      title: "Business & Office",
      description: "Digitize contracts, invoices, reports, and business documents for easy management.",
      examples: ["Contracts", "Invoices", "Business cards", "Meeting notes"]
    },
    {
      title: "Education & Research",
      description: "Extract text from academic papers, textbooks, and research materials for analysis.",
      examples: ["Academic papers", "Textbooks", "Research notes", "Lecture slides"]
    },
    {
      title: "Data Entry & Automation",
      description: "Automate data entry by extracting information from forms, certificates, and IDs.",
      examples: ["Forms", "Certificates", "ID cards", "Receipts"]
    }
  ];

  const languageSupport = [
    { flag: "🇺🇸", name: "English", accuracy: "99%" },
    { flag: "🇪🇸", name: "Spanish", accuracy: "98%" },
    { flag: "🇫🇷", name: "French", accuracy: "98%" },
    { flag: "🇩🇪", name: "German", accuracy: "97%" },
    { flag: "🇮🇹", name: "Italian", accuracy: "97%" },
    { flag: "🇨🇳", name: "Chinese", accuracy: "95%" },
    { flag: "🇯🇵", name: "Japanese", accuracy: "94%" },
    { flag: "🇷🇺", name: "Russian", accuracy: "96%" }
  ];

  const faqs = [
    {
      question: "How accurate is the OCR text extraction?",
      answer: "Our OCR engine achieves 95-99% accuracy for high-quality printed text. Accuracy varies based on image quality, font clarity, and language. Handwritten text typically achieves 80-90% accuracy. The tool provides confidence scores to help you assess result quality."
    },
    {
      question: "Which file formats are supported?",
      answer: "We support all common image formats (JPG, PNG, GIF, BMP, TIFF) and PDF documents. Files can be up to 50MB in size. For best results, use high-resolution images (300 DPI or higher) with clear, well-contrasted text."
    },
    {
      question: "Can I extract text from handwritten documents?",
      answer: "Yes, our OCR can process handwritten text, though accuracy depends on handwriting legibility. Printed text generally provides better results. For handwritten documents, ensure clear writing, good lighting, and minimal background noise for optimal extraction."
    },
    {
      question: "How many languages does the OCR support?",
      answer: "We support 12+ major languages including English, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Arabic, and Hindi. The auto-detect feature can automatically identify the document language for optimal processing."
    },
    {
      question: "Is my document data secure and private?",
      answer: "Absolutely! All OCR processing happens locally in your browser using client-side technology. Your documents and extracted text never leave your device, ensuring complete privacy and security of sensitive information."
    },
    {
      question: "Can I edit the extracted text?",
      answer: "Yes! Our built-in text editor allows you to review and modify extracted text before downloading. This is particularly useful for correcting any OCR errors or formatting issues. Changes are saved in real-time."
    },
    {
      question: "What output formats are available?",
      answer: "You can download extracted text as TXT (plain text), DOCX (Microsoft Word), or PDF format. The text maintains basic formatting when possible, and you can copy text directly to your clipboard for immediate use."
    },
    {
      question: "How does batch processing work?",
      answer: "Upload multiple images or PDFs simultaneously and our tool will process them all with the same settings. Each file is processed individually, and you can view, edit, and download results for each document separately or in bulk."
    },
    {
      question: "What should I do if OCR accuracy is low?",
      answer: "Try improving image quality by ensuring good lighting, proper orientation, and minimal skew. Use our image enhancement options, adjust the confidence threshold, or enable auto-rotation. Higher resolution images (300+ DPI) generally produce better results."
    },
    {
      question: "Can the tool detect and preserve table structures?",
      answer: "Yes, enable the 'Detect tables' option in settings to maintain tabular data structure when possible. While complex tables may require manual formatting, simple tables and lists are generally preserved in the extracted text."
    }
  ];

  // Register FAQ data for schema generation
  if (typeof window !== 'undefined') {
    registerToolFAQ('ocr-text-extractor', () => faqs);
  }

  return (
    <div className="space-y-12 mt-12">
      {/* Features Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our OCR Text Extractor?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced optical character recognition technology with multi-language support, batch processing, and complete privacy protection.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
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

      {/* Language Support */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Multi-Language OCR Support
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Extract text accurately from documents in multiple languages with high recognition rates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {languageSupport.map((lang, index) => (
            <Card key={index}>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-2">{lang.flag}</div>
                <div className="font-semibold">{lang.name}</div>
                <div className="text-sm text-gray-600">Accuracy: {lang.accuracy}</div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: lang.accuracy }}
                    />
                  </div>
                </div>
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
            See how our OCR tool outperforms popular alternatives with better privacy and advanced features.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold bg-green-50">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Toolspy
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold">Google Drive</th>
                    <th className="text-center p-4 font-semibold">OnlineOCR</th>
                    <th className="text-center p-4 font-semibold">FreeOCR</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center bg-green-50">
                        <div className="flex items-center justify-center gap-2">
                          {row.toolspyStatus === "excellent" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">{row.toolspy}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">{row.googledrive}</td>
                      <td className="p-4 text-center">{row.onlineocr}</td>
                      <td className="p-4 text-center">{row.freeocr}</td>
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
            Perfect For Every Document Need
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From business documents to academic research, our OCR tool handles all types of text extraction needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
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

      {/* FAQ Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about OCR technology, text extraction, and using our advanced features.
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
          currentToolSlug="ocr-text-extractor"
        />
      </section>
    </div>
  );
}