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
  Code,
  Eye,
  Download,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";

export function JsonFormatterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("json-formatter");

  const comparisonData = [
    {
      feature: "File Size Limit",
      toolspy: "50MB",
      jsonlint: "1MB",
      jsonviewer: "10MB",
      codebeautify: "5MB",
      toolspyStatus: "excellent",
    },
    {
      feature: "Tree Visualization",
      toolspy: "✅ Interactive tree",
      jsonlint: "❌ Text only",
      jsonviewer: "✅ Basic tree",
      codebeautify: "✅ Basic tree",
      toolspyStatus: "excellent",
    },
    {
      feature: "Error Detection",
      toolspy: "✅ Line/column details",
      jsonlint: "✅ Basic errors",
      jsonviewer: "✅ Basic errors",
      codebeautify: "✅ Basic errors",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Multiple files",
      jsonlint: "❌ Single file",
      jsonviewer: "❌ Single file",
      codebeautify: "❌ Single file",
      toolspyStatus: "excellent",
    },
    {
      feature: "Custom Formatting",
      toolspy: "✅ Advanced options",
      jsonlint: "✅ Basic options",
      jsonviewer: "✅ Limited options",
      codebeautify: "✅ Basic options",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side only",
      jsonlint: "⚠️ Server processing",
      jsonviewer: "⚠️ Server processing",
      codebeautify: "⚠️ Server processing",
      toolspyStatus: "excellent",
    },
    {
      feature: "Download Options",
      toolspy: "✅ Multiple formats",
      jsonlint: "✅ JSON only",
      jsonviewer: "✅ JSON only",
      codebeautify: "✅ JSON only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Comments Support",
      toolspy: "✅ Auto-remove option",
      jsonlint: "❌ Not supported",
      jsonviewer: "❌ Not supported",
      codebeautify: "❌ Not supported",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Smart JSON Validation",
      description: "Advanced error detection with precise line and column information for quick debugging."
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Interactive Tree View",
      description: "Visualize JSON structure with expandable/collapsible tree navigation."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Custom Formatting",
      description: "Control indentation, key sorting, comment removal, and output format."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "All processing happens in your browser - your data never leaves your device."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Instant formatting and validation with real-time feedback as you type."
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Export Options",
      description: "Download formatted JSON or copy to clipboard with one click."
    }
  ];

  const useCases = [
    {
      title: "API Development",
      description: "Validate and format JSON responses during API development and testing.",
      examples: ["REST API responses", "GraphQL queries", "Configuration files"]
    },
    {
      title: "Data Analysis",
      description: "Clean and structure JSON data for analysis and visualization.",
      examples: ["Log files", "Export data", "Survey responses"]
    },
    {
      title: "Code Review",
      description: "Format JSON for better readability during code reviews and documentation.",
      examples: ["Configuration files", "Test data", "Mock responses"]
    },
    {
      title: "Learning & Education",
      description: "Understand JSON structure and syntax with visual tree representation.",
      examples: ["Tutorial examples", "Student assignments", "Code samples"]
    }
  ];

  const faqs = [
    {
      question: "What is JSON and why do I need to format it?",
      answer: "JSON (JavaScript Object Notation) is a lightweight data format used for storing and exchanging data. Formatting JSON makes it human-readable by adding proper indentation and line breaks, making it easier to understand, debug, and maintain."
    },
    {
      question: "Is my JSON data secure when using this tool?",
      answer: "Yes, absolutely! Our JSON formatter processes everything locally in your browser. Your JSON data never leaves your device or gets sent to any server, ensuring complete privacy and security."
    },
    {
      question: "What's the maximum file size I can format?",
      answer: "You can format JSON files up to 50MB in size. This is much larger than most other online JSON formatters, making it suitable for large configuration files, API responses, and data exports."
    },
    {
      question: "Can I format JSON with comments?",
      answer: "Yes! Our tool can handle JSON with comments (JSONC format). You can choose to automatically remove comments during formatting or keep them in the output."
    },
    {
      question: "What's the difference between formatted and minified JSON?",
      answer: "Formatted JSON includes indentation and line breaks for readability, while minified JSON removes all unnecessary whitespace to reduce file size. Use formatted for development and minified for production."
    },
    {
      question: "How accurate is the error detection?",
      answer: "Our validator provides precise error locations with line and column numbers, making it easy to identify and fix JSON syntax errors quickly."
    },
    {
      question: "Can I use this tool for large datasets?",
      answer: "Yes, our tool is optimized for large JSON files and includes features like tree view for navigating complex nested structures efficiently."
    },
    {
      question: "Does the tool work offline?",
      answer: "Yes! Since all processing happens in your browser, the tool works offline once the page is loaded. No internet connection is required for formatting JSON."
    }
  ];

  // Register FAQ data for schema generation
  if (typeof window !== 'undefined') {
    registerToolFAQ('json-formatter', () => faqs);
  }

  return (
    <div className="space-y-12 mt-12">
      {/* Features Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our JSON Formatter?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced features and privacy-first approach make our JSON formatter the best choice for developers and data professionals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
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

      {/* Comparison Table */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How We Compare
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how our JSON formatter stacks up against popular alternatives.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold bg-blue-50">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Toolspy
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold">JSONLint</th>
                    <th className="text-center p-4 font-semibold">JSON Viewer</th>
                    <th className="text-center p-4 font-semibold">Code Beautify</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center bg-blue-50">
                        <div className="flex items-center justify-center gap-2">
                          {row.toolspyStatus === "excellent" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">{row.toolspy}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">{row.jsonlint}</td>
                      <td className="p-4 text-center">{row.jsonviewer}</td>
                      <td className="p-4 text-center">{row.codebeautify}</td>
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
            From API development to data analysis, our JSON formatter handles all your needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
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
            Everything you need to know about our JSON formatter and validator.
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
          currentToolSlug="json-formatter"
        />
      </section>
    </div>
  );
}