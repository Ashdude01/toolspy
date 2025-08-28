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
  FileText,
  Search,
  Download,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function JsonFormatterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("json-formatter");

  const comparisonData = [
    {
      feature: "Max File Size",
      toolspy: "Unlimited",
      jsonlint: "10MB limit",
      jsonformatter: "5MB limit",
      jsonbeautifier: "1MB limit",
      toolspyStatus: "excellent",
    },
    {
      feature: "Tree View",
      toolspy: "✅ Interactive tree",
      jsonlint: "❌ Text only",
      jsonformatter: "⚠️ Basic tree",
      jsonbeautifier: "❌ No tree view",
      toolspyStatus: "excellent",
    },
    {
      feature: "Error Detection",
      toolspy: "✅ Real-time highlighting",
      jsonlint: "✅ Basic errors",
      jsonformatter: "⚠️ Limited errors",
      jsonbeautifier: "❌ No validation",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      jsonlint: "⚠️ Server-based",
      jsonformatter: "⚠️ Server-based",
      jsonbeautifier: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Options",
      toolspy: "✅ Multiple formats",
      jsonlint: "✅ Copy only",
      jsonformatter: "✅ Basic export",
      jsonbeautifier: "❌ No export",
      toolspyStatus: "excellent",
    },
    {
      feature: "Syntax Highlighting",
      toolspy: "✅ Advanced highlighting",
      jsonlint: "❌ No highlighting",
      jsonformatter: "⚠️ Basic colors",
      jsonbeautifier: "❌ No highlighting",
      toolspyStatus: "excellent",
    },
    {
      feature: "Minify/Beautify",
      toolspy: "✅ Both options",
      jsonlint: "❌ Format only",
      jsonformatter: "✅ Both options",
      jsonbeautifier: "⚠️ Beautify only",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      jsonlint: "✅ Free",
      jsonformatter: "✅ Free",
      jsonbeautifier: "✅ Free",
      toolspyStatus: "excellent",
    },
  ];

  const formatData = [
    {
      format: "Pretty Print",
      description: "Human-readable formatting",
      useCase: "Development, debugging",
      features: "Indentation, line breaks, color coding",
      size: "Larger file size",
    },
    {
      format: "Minified",
      description: "Compact single-line format",
      useCase: "Production, transmission",
      features: "No whitespace, minimal size",
      size: "Smallest file size",
    },
    {
      format: "Compact",
      description: "Balanced formatting",
      useCase: "Storage, readability",
      features: "Minimal whitespace, structured",
      size: "Medium file size",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's JSON formatter completely free to use?",
      answer:
        "Yes, our professional JSON formatter and validator is completely free with no hidden costs, registration requirements, or usage limitations. You can format, validate, and process unlimited JSON data without any restrictions. Unlike many competitors who have file size limits or require paid subscriptions for advanced features, Toolspy provides all JSON processing capabilities free of charge.",
    },
    {
      question: "What is JSON formatting and why is it important?",
      answer:
        "JSON formatting makes JSON data human-readable by adding proper indentation, line breaks, and spacing. This is crucial for developers debugging code, reviewing API responses, and understanding data structures. Properly formatted JSON is easier to read, debug, and maintain. Our tool also validates JSON syntax to ensure it's properly structured and error-free.",
    },
    {
      question: "How secure is the JSON data I process with Toolspy?",
      answer:
        "Absolutely secure! Our JSON formatter uses client-side processing, meaning your data is processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security for your sensitive JSON data. Your data never leaves your device, making it safer than server-based formatting tools.",
    },
    {
      question: "What features does the interactive tree view provide?",
      answer:
        "Our interactive tree view allows you to expand and collapse JSON objects and arrays, making it easy to navigate large JSON structures. You can click on any object or array to expand it, see the data types, and quickly locate specific values. This is especially useful for debugging API responses and understanding complex data structures.",
    },
    {
      question: "Can I process large JSON files with this tool?",
      answer:
        "Yes! Unlike many competitors who limit files to 1-10MB, our tool supports unlimited JSON file size. You can format and validate large datasets, API responses, and complex JSON structures. The tool also provides real-time validation with detailed error messages, helping you identify and fix JSON syntax issues instantly.",
    },
    {
      question: "Why choose Toolspy over other free JSON tools like JSONLint or JSONFormatter.org?",
      answer:
        "Toolspy offers professional-grade features like interactive tree view, unlimited file size, real-time error highlighting, multiple export formats, and client-side processing. Many competitors like JSONLint and JSONFormatter.org lack these advanced features or have strict file size limits. Our tool provides better privacy protection, more visualization options, and superior error detection completely free.",
    },
    {
      question: "How does the error detection and highlighting work?",
      answer:
        "Our tool provides real-time JSON validation with detailed error messages and visual highlighting. Invalid syntax is highlighted in red, and specific error messages explain what's wrong and how to fix it. The tool checks for missing commas, brackets, quotes, and other common JSON syntax errors, making it easy to debug malformed JSON data.",
    },
    {
      question: "What's the difference between minify and beautify?",
      answer:
        "Beautify (pretty print) adds indentation, line breaks, and spacing to make JSON human-readable. Minify removes all unnecessary whitespace to create the smallest possible file size for production use. Our tool supports both options, allowing you to switch between formats based on your needs. Compact format provides a middle ground with minimal but readable formatting.",
    },
    {
      question: "Can I export formatted JSON in different formats?",
      answer:
        "Yes! Our tool supports multiple export options including copy to clipboard, download as file, and direct sharing. You can export in pretty-printed, minified, or compact formats. The tool also provides syntax highlighting in the exported format, making it easy to use the formatted JSON in your development environment.",
    },
    {
      question: "How does the tree view help with JSON debugging?",
      answer:
        "The interactive tree view makes it easy to navigate complex JSON structures by allowing you to expand and collapse objects and arrays. You can quickly locate specific values, understand the data hierarchy, and identify issues in nested structures. This is especially valuable when working with large API responses or complex configuration files.",
    },
  ];

  const benefits = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Interactive Tree View",
      description:
        "Navigate complex JSON structures with expandable/collapsible tree view for easy debugging and data exploration.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Validation",
      description:
        "Instant JSON validation with detailed error messages and syntax highlighting for quick debugging.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your JSON data never leaves your device, providing maximum security.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Multiple Format Options",
      description:
        "Format JSON as pretty-printed, minified, or compact with syntax highlighting and export options.",
    },
  ];

  const keyBenefits = [
    "🌳 Interactive tree view for easy JSON navigation",
    "⚡ Real-time validation with detailed error messages",
    "🔒 Complete privacy protection - data never leaves your device",
    "🎨 Advanced syntax highlighting for better readability",
    "📝 Unlimited file size with no restrictions",
    "🔄 Minify and beautify options for all use cases",
    "📋 Multiple export formats: copy, download, share",
    "🔍 Search and filter capabilities within JSON data",
    "🎯 Professional-grade formatting algorithms",
    "🛡️ Comprehensive error detection and correction",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "📊 Detailed JSON statistics and structure analysis",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. JSONLint",
      advantages: [
        "Better Visualization: Interactive tree view vs. text only",
        "Unlimited Size: No restrictions vs. 10MB limit",
        "Advanced Features: Minify, export vs. format only",
        "Better Privacy: Client-side vs. server-based processing",
        "Syntax Highlighting: Advanced colors vs. no highlighting",
        "Export Options: Multiple formats vs. copy only",
      ],
    },
    {
      title: "Toolspy vs. JSONFormatter.org",
      advantages: [
        "No Registration: Instant access vs. account requirements",
        "Faster Processing: No upload time vs. server processing",
        "Better Privacy: No data transmission vs. server-based",
        "Interactive Tree: Advanced navigation vs. basic tree",
        "Unlimited Size: No restrictions vs. 5MB limit",
        "Real-time Validation: Instant feedback vs. basic errors",
      ],
    },
    {
      title: "Toolspy vs. JSONBeautifier",
      advantages: [
        "Unlimited Processing: No size limits vs. 1MB restriction",
        "Tree View: Interactive navigation vs. no tree view",
        "Error Detection: Real-time validation vs. no validation",
        "Advanced Features: Professional tools vs. basic formatter",
        "Better Privacy: Client-side vs. server-based processing",
        "Export Options: Multiple formats vs. no export",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="json-formatter"
        title="Similar Tools You Might Like"
        description="Check out our other data processing and formatting tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Format & Validate JSON – Professional Tools
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional JSON formatter and validator with interactive tree view, 
            real-time error detection, and complete privacy protection. Perfect for 
            developers, API testing, and data analysis.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our JSON Formatter</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to format and validate your JSON data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Paste Your JSON</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Paste your JSON data into the input field. The tool supports unlimited 
              file size and will automatically detect and highlight any syntax errors.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Choose Format</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Select your preferred format: pretty-printed for readability, 
              minified for production, or compact for a balance of both.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Explore & Export</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Use the interactive tree view to explore your data structure, 
              then copy, download, or share your formatted JSON.
            </p>
          </Card>
        </div>
      </section>

      {/* Format Options Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">JSON Format Options</h3>
          <p className="text-muted-foreground">
            Choose the right format for your specific use case
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formatData.map((format, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{format.format}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{format.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Use Case:</strong> {format.useCase}</div>
                <div><strong>Features:</strong> {format.features}</div>
                <div><strong>Size:</strong> {format.size}</div>
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
            See how our JSON formatter outperforms other free tools
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
                    <th className="text-center p-4 font-semibold">JSONLint</th>
                    <th className="text-center p-4 font-semibold">JSONFormatter.org</th>
                    <th className="text-center p-4 font-semibold">JSONBeautifier</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.jsonlint}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.jsonformatter}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.jsonbeautifier}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's JSON Formatter?</h3>
          <p className="text-muted-foreground">
            Professional features that make JSON formatting and validation effortless
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
            See why developers choose our JSON formatter
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
            Everything you need to know about JSON formatting and validation
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about JSON formatting and validation"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for JSON formatting and validation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Code className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">API Development</h4>
            <p className="text-sm text-muted-foreground">
              Format and validate API responses, debug JSON payloads, and test data structures
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Search className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Data Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Explore complex JSON datasets, navigate nested structures, and analyze data hierarchies
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Eye className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Configuration Files</h4>
            <p className="text-sm text-muted-foreground">
              Format and validate JSON configuration files, settings, and metadata
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Download className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Data Export</h4>
            <p className="text-sm text-muted-foreground">
              Prepare JSON data for export, optimize file sizes, and ensure proper formatting
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Format Your JSON?</h3>
        <p className="text-muted-foreground">
          Start using our professional JSON formatter and validator now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try JSON Formatter Now
        </Button>
      </section>
    </div>
  );
}