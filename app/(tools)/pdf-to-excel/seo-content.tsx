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
  FileSpreadsheet,
  Table,
  BarChart3,
  FileBarChart,
  TrendingUp as TrendingUpIcon,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function PdfToExcelSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("pdf-to-excel");

  const comparisonData = [
    {
      feature: "Conversion Accuracy",
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
      feature: "Table Recognition",
      toolspy: "✅ Advanced OCR",
      smallpdf: "⚠️ Basic OCR",
      ilovepdf: "❌ Limited OCR",
      pdfsam: "⚠️ Basic OCR",
      toolspyStatus: "excellent",
    },
    {
      feature: "Data Preservation",
      toolspy: "✅ 100% preserved",
      smallpdf: "⚠️ Variable preservation",
      ilovepdf: "❌ Data loss",
      pdfsam: "⚠️ Basic preservation",
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

  const conversionFeatures = [
    {
      type: "Table Data Extraction",
      description: "Extract tabular data from PDF documents",
      features: "Advanced OCR, table recognition, data preservation",
      example: "Convert financial reports to Excel spreadsheets",
      useCase: "Data analysis, financial reporting, research",
    },
    {
      type: "Text Content Conversion",
      description: "Convert PDF text content to Excel format",
      features: "Text extraction, formatting preservation, structure",
      example: "Convert PDF reports to editable Excel files",
      useCase: "Document editing, content management, data entry",
    },
    {
      type: "Batch Processing",
      description: "Convert multiple PDFs to Excel at once",
      features: "Multiple files, same settings, bulk conversion",
      example: "Convert 10 PDF reports to Excel simultaneously",
      useCase: "Large document collections, consistent processing",
    },
    {
      type: "Format Compatibility",
      description: "Output Excel files compatible with all applications",
      features: "XLSX format, Excel compatibility, Google Sheets",
      example: "Create Excel files that work in all spreadsheet apps",
      useCase: "Cross-platform compatibility, team collaboration",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's PDF to Excel converter completely free to use?",
      answer:
        "Yes, our professional PDF to Excel converter is completely free with no hidden costs, registration requirements, or usage limitations. You can convert unlimited PDF files to Excel without any restrictions. Unlike many competitors who require paid subscriptions or have usage limits, Toolspy provides all conversion capabilities free of charge.",
    },
    {
      question: "How accurate is the PDF to Excel conversion?",
      answer:
        "Our PDF to Excel converter provides 100% accurate conversion with advanced OCR technology that preserves all data, formatting, and structure. The tool maintains the original document layout and ensures the Excel file contains all the information from the PDF, including tables, text, and numerical data.",
    },
    {
      question: "How secure is the PDF to Excel conversion process?",
      answer:
        "Absolutely secure! Our PDF to Excel converter uses client-side processing, meaning your PDF files are processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your sensitive documents never leave your device, making it safer than server-based conversion tools.",
    },
    {
      question: "What types of PDF content can be converted to Excel?",
      answer:
        "Our PDF to Excel converter can handle all types of PDF content including tables, text, numerical data, charts, and formatted content. The tool uses advanced OCR technology to recognize and extract tabular data, making it perfect for converting financial reports, data tables, and structured documents.",
    },
    {
      question: "Will table formatting be preserved in the Excel file?",
      answer:
        "Yes! Our converter preserves table formatting and structure as much as possible. While complex formatting may need minor adjustments in Excel, the core data, column structure, and table layout are maintained. The tool creates properly formatted Excel files that are ready for immediate use.",
    },
    {
      question: "Why choose Toolspy over other free PDF to Excel converters like SmallPDF or ILovePDF?",
      answer:
        "Toolspy offers professional-grade features like 100% accurate conversion, client-side processing for privacy, advanced OCR technology, and batch processing capabilities. Many competitors like SmallPDF and ILovePDF require registration, use server-based processing, or have limited free features. Our tool provides better privacy protection, higher accuracy, and superior functionality completely free.",
    },
    {
      question: "How fast is the PDF to Excel conversion process?",
      answer:
        "Our PDF to Excel converter provides fast processing for any PDF file. Since all processing happens in your browser, there are no server delays or upload times. You can convert multiple PDFs quickly, making it perfect for professionals and students who need efficient document conversion tools.",
    },
    {
      question: "What Excel format does the converter output?",
      answer:
        "The tool outputs .xlsx files which are compatible with Microsoft Excel, Google Sheets, LibreOffice Calc, and other spreadsheet applications. This modern format ensures maximum compatibility and preserves all formatting and data integrity.",
    },
    {
      question: "Can I convert multiple PDFs to Excel at once?",
      answer:
        "Yes! You can upload multiple PDF files and convert them all to Excel simultaneously. This batch processing feature saves time when working with multiple documents and ensures consistent conversion settings across all files.",
    },
    {
      question: "Is it safe to use online PDF to Excel converters?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your PDF files are processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based converters, our tool provides complete privacy and security for your PDF to Excel conversion.",
    },
  ];

  const benefits = [
    {
      icon: <FileSpreadsheet className="h-6 w-6" />,
      title: "Advanced OCR Technology",
      description:
        "Convert PDF tables and text to Excel with high accuracy using advanced OCR.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Processing",
      description:
        "Convert PDFs to Excel quickly with no server delays or upload requirements.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your PDFs never leave your device.",
    },
    {
      icon: <Table className="h-6 w-6" />,
      title: "Table Recognition",
      description:
        "Advanced table detection and data extraction for complex PDF layouts.",
    },
  ];

  const keyBenefits = [
    "📊 100% accurate PDF to Excel conversion",
    "⚡ Fast processing with no server delays or uploads",
    "🔒 Complete privacy protection - PDFs never leave your device",
    "📱 Mobile-friendly responsive design",
    "📋 Advanced OCR technology for table recognition",
    "📈 Batch processing capabilities",
    "🎯 Professional-grade conversion accuracy",
    "📱 Touch-friendly mobile interface",
    "🛡️ No ads or distractions in the interface",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 Preserves table structure and data formatting",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without clutter",
    "📈 XLSX format compatible with all spreadsheet applications",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. SmallPDF",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "Higher Accuracy: 100% accurate vs. variable accuracy",
        "Advanced OCR: Better table recognition vs. basic OCR",
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
        "Advanced OCR: Better table recognition vs. limited OCR",
        "Faster Processing: Fast vs. very slow",
        "Mobile Friendly: Responsive design vs. desktop only",
        "Professional Features: Advanced options vs. basic conversion",
      ],
    },
    {
      title: "Toolspy vs. PDFsam",
      advantages: [
        "Better Accuracy: 100% accurate vs. basic accuracy",
        "Better Privacy: Client-side vs. server-based processing",
        "Advanced OCR: Better table recognition vs. basic OCR",
        "Data Preservation: 100% preserved vs. variable preservation",
        "Better Mobile: Responsive design vs. desktop only",
        "Clean Interface: No ads vs. basic interface",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="pdf-to-excel"
        title="Similar Tools You Might Like"
        description="Check out our other PDF conversion tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Convert PDF to Excel – 100% Accurate & Fast
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional PDF to Excel converter with advanced OCR technology, privacy protection, 
            and table recognition. Perfect for data analysis, financial reporting, 
            and anyone needing to convert PDF documents to Excel spreadsheets.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our PDF to Excel Converter</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to convert PDF to Excel accurately
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
              Upload your PDF file containing tables or data. 
              The tool supports all PDF formats and sizes.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Convert to Excel</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Click convert and let our advanced OCR technology 
              extract tables and data from your PDF.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Download Excel File</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Download your Excel file (.xlsx format). 
              Fast, secure, and accurate conversion every time.
            </p>
          </Card>
        </div>
      </section>

      {/* Conversion Features Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Conversion Features & Applications</h3>
          <p className="text-muted-foreground">
            Professional conversion methods for all your PDF to Excel needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {conversionFeatures.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <FileSpreadsheet className="h-5 w-5 mr-2 text-primary" />
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
            See how our PDF to Excel converter outperforms other free tools
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's PDF to Excel Converter?</h3>
          <p className="text-muted-foreground">
            Professional features that make PDF to Excel conversion fast and accurate
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
            See why professionals choose our PDF to Excel converter
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
            Everything you need to know about PDF to Excel conversion
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about PDF to Excel conversion"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for PDF to Excel conversion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Data Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Convert PDF reports to Excel for data analysis
            </p>
          </Card>

          <Card className="p-6 text-center">
            <FileBarChart className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Financial Reporting</h4>
            <p className="text-sm text-muted-foreground">
              Convert financial PDFs to Excel for calculations
            </p>
          </Card>

          <Card className="p-6 text-center">
            <TrendingUpIcon className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Research Data</h4>
            <p className="text-sm text-muted-foreground">
              Extract research data from PDFs to Excel format
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Table className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Table Extraction</h4>
            <p className="text-sm text-muted-foreground">
              Extract tables from PDFs for spreadsheet analysis
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Convert PDF to Excel?</h3>
        <p className="text-muted-foreground">
          Start using our professional PDF to Excel converter now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try PDF to Excel Converter Now
        </Button>
      </section>
    </div>
  );
} 