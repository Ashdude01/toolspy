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
  ArrowLeftRight,
  Database,
  Table,
  Download,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";

export function JsonTableConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("json-table-converter");

  const comparisonData = [
    {
      feature: "File Size Limit",
      toolspy: "50MB",
      tableconvert: "5MB",
      csvjson: "1MB",
      convertio: "10MB",
      toolspyStatus: "excellent",
    },
    {
      feature: "Bidirectional Conversion",
      toolspy: "✅ JSON ↔ CSV/Excel",
      tableconvert: "✅ Multi-format",
      csvjson: "✅ JSON ↔ CSV",
      convertio: "✅ Limited formats",
      toolspyStatus: "excellent",
    },
    {
      feature: "Nested Object Handling",
      toolspy: "✅ Auto-flatten option",
      tableconvert: "✅ Basic support",
      csvjson: "❌ No flattening",
      convertio: "❌ No flattening",
      toolspyStatus: "excellent",
    },
    {
      feature: "Data Type Preservation",
      toolspy: "✅ Smart type detection",
      tableconvert: "✅ Basic types",
      csvjson: "❌ String only",
      convertio: "❌ String only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Custom Delimiters",
      toolspy: "✅ Any delimiter",
      tableconvert: "✅ Common delimiters",
      csvjson: "✅ Comma only",
      convertio: "✅ Limited options",
      toolspyStatus: "excellent",
    },
    {
      feature: "Table Preview",
      toolspy: "✅ Interactive preview",
      tableconvert: "✅ Basic preview",
      csvjson: "❌ No preview",
      convertio: "❌ No preview",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Multiple files",
      tableconvert: "❌ Single file",
      csvjson: "❌ Single file",
      convertio: "❌ Single file",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side only",
      tableconvert: "⚠️ Server processing",
      csvjson: "⚠️ Server processing",
      convertio: "⚠️ Server processing",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <ArrowLeftRight className="h-6 w-6" />,
      title: "Bidirectional Conversion",
      description: "Seamlessly convert between JSON, CSV, and Excel formats in both directions with intelligent data mapping."
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Smart Data Handling",
      description: "Automatically flatten nested objects, preserve data types, and handle complex JSON structures."
    },
    {
      icon: <Table className="h-6 w-6" />,
      title: "Interactive Preview",
      description: "Preview your converted data in a table format before downloading, with pagination for large datasets."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Options",
      description: "Customize delimiters, headers, data types, and formatting to match your exact requirements."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Processing",
      description: "All conversions happen locally in your browser - your data never leaves your device."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Bulk Operations",
      description: "Process multiple files at once with batch conversion capabilities for enhanced productivity."
    }
  ];

  const useCases = [
    {
      title: "Data Migration",
      description: "Convert data between different formats when migrating between systems or databases.",
      examples: ["Database exports", "API responses", "Legacy data conversion"]
    },
    {
      title: "Spreadsheet Analysis",
      description: "Transform JSON data into CSV/Excel format for analysis in spreadsheet applications.",
      examples: ["Sales data", "Survey responses", "Analytics reports"]
    },
    {
      title: "API Development",
      description: "Convert between JSON and tabular formats during API development and testing.",
      examples: ["Mock data creation", "Response formatting", "Data validation"]
    },
    {
      title: "Business Intelligence",
      description: "Prepare data for BI tools and reporting systems that require specific formats.",
      examples: ["Dashboard data", "Report generation", "KPI tracking"]
    }
  ];

  const formatSupport = [
    {
      format: "JSON",
      description: "JavaScript Object Notation",
      features: ["Nested objects", "Arrays", "All data types", "Comments support"]
    },
    {
      format: "CSV",
      description: "Comma-Separated Values",
      features: ["Custom delimiters", "Header rows", "Quoted fields", "Excel compatibility"]
    },
    {
      format: "Excel (XLSX)",
      description: "Microsoft Excel format",
      features: ["Multiple sheets", "Formatting", "Formulas", "Charts"]
    },
    {
      format: "TSV",
      description: "Tab-Separated Values",
      features: ["Tab delimiters", "Text fields", "Database export", "Import ready"]
    }
  ];

  const faqs = [
    {
      question: "How do I convert JSON to CSV format?",
      answer: "Simply paste your JSON data or upload a JSON file, select 'JSON → Table' mode, choose CSV as output format, and click Convert. The tool will automatically flatten nested objects and create proper CSV headers."
    },
    {
      question: "Can I convert nested JSON objects to CSV?",
      answer: "Yes! Our tool can automatically flatten nested JSON objects into CSV columns. For example, 'user.address.city' becomes a single column with dot notation. You can enable/disable this feature in the settings."
    },
    {
      question: "What's the maximum file size I can convert?",
      answer: "You can convert files up to 50MB in size, which is significantly larger than most online converters. This allows you to handle large datasets and complex JSON structures."
    },
    {
      question: "How do I preserve data types when converting CSV to JSON?",
      answer: "Enable the 'Preserve Types' option in settings. The tool will automatically detect and convert numbers, booleans, null values, and even JSON arrays/objects within CSV fields."
    },
    {
      question: "Can I use custom delimiters for CSV files?",
      answer: "Absolutely! You can specify any delimiter (comma, semicolon, pipe, tab, etc.) in the settings. This is useful for regional CSV formats or specific system requirements."
    },
    {
      question: "Is my data secure during conversion?",
      answer: "Yes, completely secure! All conversions happen locally in your browser. Your data never leaves your device or gets sent to any server, ensuring complete privacy."
    },
    {
      question: "Can I preview the converted data before downloading?",
      answer: "Yes! The tool provides an interactive table preview showing exactly how your data will look after conversion. You can see headers, data types, and sample rows."
    },
    {
      question: "Does the tool work with Excel files?",
      answer: "Currently, the tool outputs Excel-compatible CSV format. Full Excel (XLSX) support with multiple sheets and formatting is planned for a future update."
    },
    {
      question: "How do I handle CSV files with headers?",
      answer: "Use the 'Include Headers' toggle to specify whether your CSV file has a header row. When enabled, the first row becomes JSON object keys; when disabled, generic column names are used."
    },
    {
      question: "Can I convert multiple files at once?",
      answer: "Yes! The tool supports batch processing. You can upload and convert multiple JSON or CSV files simultaneously, saving time on large conversion tasks."
    }
  ];

  // Register FAQ data for schema generation
  if (typeof window !== 'undefined') {
    registerToolFAQ('json-table-converter', () => faqs);
  }

  return (
    <div className="space-y-12 mt-12">
      {/* Features Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our JSON Table Converter?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced conversion capabilities with intelligent data handling make complex format transformations simple and secure.
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

      {/* Format Support */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Supported Formats
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive support for popular data formats with advanced parsing and generation capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {formatSupport.map((format, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{format.format}</CardTitle>
                <CardDescription>{format.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {format.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
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
            See how our converter outperforms popular alternatives with advanced features and better limits.
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
                    <th className="text-center p-4 font-semibold">TableConvert</th>
                    <th className="text-center p-4 font-semibold">CSVJSON</th>
                    <th className="text-center p-4 font-semibold">Convertio</th>
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
                      <td className="p-4 text-center">{row.tableconvert}</td>
                      <td className="p-4 text-center">{row.csvjson}</td>
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
            Perfect For Every Use Case
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From data migration to business intelligence, our converter handles all your format transformation needs.
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
            Everything you need to know about converting between JSON, CSV, and Excel formats.
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
          currentToolSlug="json-table-converter"
        />
      </section>
    </div>
  );
}