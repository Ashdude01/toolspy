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
  FileText,
  Code,
  Download,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function Base64EncoderDecoderSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("base64-encoder-decoder");

  const comparisonData = [
    {
      feature: "Max Text Length",
      toolspy: "Unlimited",
      base64decode: "10MB limit",
      base64encode: "5MB limit",
      rapidtables: "1MB limit",
      toolspyStatus: "excellent",
    },
    {
      feature: "Character Encoding",
      toolspy: "UTF-8, ASCII, Latin1",
      base64decode: "UTF-8 only",
      base64encode: "UTF-8 only",
      rapidtables: "UTF-8 only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Multiple lines",
      base64decode: "❌ Single input",
      base64encode: "❌ Single input",
      rapidtables: "❌ Single input",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      base64decode: "⚠️ Server-based",
      base64encode: "⚠️ Server-based",
      rapidtables: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      base64decode: "✅ Free",
      base64encode: "✅ Free",
      rapidtables: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Advanced Features",
      toolspy: "✅ URL encoding, validation",
      base64decode: "❌ Basic only",
      base64encode: "❌ Basic only",
      rapidtables: "❌ Basic only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Error Detection",
      toolspy: "✅ Real-time validation",
      base64decode: "⚠️ Basic errors",
      base64encode: "⚠️ Basic errors",
      rapidtables: "⚠️ Basic errors",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Options",
      toolspy: "✅ Copy, download, share",
      base64decode: "✅ Copy only",
      base64encode: "✅ Copy only",
      rapidtables: "✅ Copy only",
      toolspyStatus: "excellent",
    },
  ];

  const encodingData = [
    {
      encoding: "UTF-8",
      description: "Universal character encoding",
      useCase: "International text, emojis",
      compatibility: "99% of modern systems",
      size: "Variable (1-4 bytes per character)",
    },
    {
      encoding: "ASCII",
      description: "Basic English character set",
      useCase: "English text, simple data",
      compatibility: "100% universal",
      size: "1 byte per character",
    },
    {
      encoding: "Latin1",
      description: "Western European characters",
      useCase: "European languages",
      compatibility: "95% of systems",
      size: "1 byte per character",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's Base64 encoder/decoder completely free to use?",
      answer:
        "Yes, our professional Base64 encoder/decoder is completely free with no hidden costs, registration requirements, or usage limitations. You can encode and decode unlimited text without any restrictions. Unlike many competitors who have file size limits or require paid subscriptions for advanced features, Toolspy provides all encoding capabilities free of charge.",
    },
    {
      question: "What is Base64 encoding and when should I use it?",
      answer:
        "Base64 encoding converts binary data into ASCII text format, making it safe for transmission over text-based protocols like email, HTTP, and JSON. It's commonly used for embedding images in HTML/CSS, storing binary data in databases, and encoding file attachments. Our tool supports multiple character encodings (UTF-8, ASCII, Latin1) for maximum compatibility.",
    },
    {
      question: "How secure is the data I encode/decode with Toolspy?",
      answer:
        "Absolutely secure! Our Base64 encoder/decoder uses client-side processing, meaning your data is processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security for your sensitive information. Your data never leaves your device, making it safer than server-based encoding tools.",
    },
    {
      question: "What character encodings does the tool support?",
      answer:
        "We support three major character encodings: UTF-8 for international text and emojis, ASCII for basic English text, and Latin1 for Western European languages. UTF-8 is recommended for most modern applications as it supports all Unicode characters. ASCII is perfect for simple English text, while Latin1 is ideal for European languages.",
    },
    {
      question: "Can I process large amounts of text with this tool?",
      answer:
        "Yes! Unlike many competitors who limit text to 1-10MB, our tool supports unlimited text length. You can encode or decode large documents, multiple lines of text, and complex data structures. The tool also supports batch processing, allowing you to handle multiple lines of text simultaneously with real-time validation.",
    },
    {
      question: "Why choose Toolspy over other free Base64 tools like Base64Decode.org or RapidTables?",
      answer:
        "Toolspy offers professional-grade features like multiple character encodings, unlimited text length, batch processing, real-time validation, and client-side processing. Many competitors like Base64Decode.org and RapidTables lack these advanced features or have strict file size limits. Our tool provides better privacy protection, more encoding options, and superior error detection completely free.",
    },
    {
      question: "How do I know if my Base64 string is valid?",
      answer:
        "Our tool provides real-time validation with detailed error messages. Valid Base64 strings contain only A-Z, a-z, 0-9, +, /, and = characters. The length should be a multiple of 4, with = padding at the end if necessary. Our advanced error detection highlights invalid characters and provides suggestions for correction.",
    },
    {
      question: "Can I encode/decode binary files like images or documents?",
      answer:
        "For binary files, we recommend using our specialized Image to Base64 and Base64 to Image converters. However, our text encoder can handle small binary data when converted to text format. For large files, use our dedicated file conversion tools for better performance and specialized handling.",
    },
    {
      question: "What's the difference between URL-safe and standard Base64?",
      answer:
        "Standard Base64 uses + and / characters, which can cause issues in URLs. URL-safe Base64 replaces + with - and / with _, making it safe for URL parameters and filenames. Our tool automatically detects the format and provides options for both encoding types. URL-safe encoding is recommended for web applications.",
    },
    {
      question: "How does batch processing work in Toolspy's Base64 tool?",
      answer:
        "You can paste multiple lines of text, and our tool will process each line individually. Each line can be encoded or decoded separately, and you can copy all results at once. This is perfect for processing lists of strings, multiple data entries, or converting entire documents line by line.",
    },
  ];

  const benefits = [
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your data never leaves your device, providing maximum security and privacy for sensitive information.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning-Fast Processing",
      description:
        "Instant encoding and decoding with no server delays. Process unlimited text with real-time validation and error detection.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Multiple Character Encodings",
      description:
        "Support for UTF-8, ASCII, and Latin1 encodings ensures compatibility with all systems and international text requirements.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Features",
      description:
        "Batch processing, URL-safe encoding, real-time validation, and comprehensive error detection for professional use cases.",
    },
  ];

  const keyBenefits = [
    "🔒 Complete privacy protection - data never leaves your device",
    "⚡ Lightning-fast client-side processing for instant results",
    "🌍 Multiple character encodings: UTF-8, ASCII, Latin1",
    "📝 Unlimited text length with no file size restrictions",
    "🔄 Batch processing support for multiple lines of text",
    "✅ Real-time validation with detailed error messages",
    "🔗 URL-safe encoding options for web applications",
    "📋 Advanced copy, download, and export functionality",
    "🎯 Professional-grade encoding algorithms",
    "🛡️ Comprehensive error detection and correction",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "📊 Detailed encoding statistics and character counts",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. Base64Decode.org",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "Multiple Encodings: UTF-8, ASCII, Latin1 vs. UTF-8 only",
        "Unlimited Length: No size restrictions vs. 10MB limit",
        "Batch Processing: Multiple lines vs. single input",
        "Advanced Features: URL encoding, validation vs. basic only",
        "No Ads: Clean interface vs. ad-heavy layout",
      ],
    },
    {
      title: "Toolspy vs. Base64Encode.org",
      advantages: [
        "No Registration: Instant access vs. account requirements",
        "Faster Processing: No upload time vs. server processing",
        "Better Privacy: No data transmission vs. server-based",
        "Multiple Encodings: Three options vs. single encoding",
        "Unlimited Size: No restrictions vs. 5MB limit",
        "Real-time Validation: Instant feedback vs. basic errors",
      ],
    },
    {
      title: "Toolspy vs. RapidTables",
      advantages: [
        "Unlimited Processing: No size limits vs. 1MB restriction",
        "Multiple Encodings: Comprehensive support vs. basic only",
        "Batch Processing: Handle multiple inputs vs. single line",
        "Advanced Features: Professional tools vs. basic converter",
        "Better Privacy: Client-side vs. server-based processing",
        "Clean Interface: No ads vs. ad-heavy experience",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="base64-encoder-decoder"
        title="Similar Tools You Might Like"
        description="Check out our other encoding and conversion tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Encode & Decode Base64 – Secure & Fast
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional Base64 encoding and decoding with multiple character encodings, 
            unlimited text length, and complete privacy protection. Perfect for developers, 
            system administrators, and anyone working with data encoding.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our Base64 Encoder/Decoder</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to encode or decode your text with professional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Enter Your Text</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Paste your text in the input field. For encoding, enter plain text. For decoding, 
              paste your Base64 string. The tool supports unlimited text length.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Choose Encoding</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Select your preferred character encoding: UTF-8 for international text, 
              ASCII for English, or Latin1 for European languages. Choose encode or decode mode.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Get Results</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Instantly see your encoded or decoded text with real-time validation. 
              Copy, download, or share your results with one click.
            </p>
          </Card>
        </div>
      </section>

      {/* Character Encoding Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Character Encoding Guide</h3>
          <p className="text-muted-foreground">
            Choose the right encoding for your specific use case
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {encodingData.map((encoding, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{encoding.encoding}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{encoding.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Use Case:</strong> {encoding.useCase}</div>
                <div><strong>Compatibility:</strong> {encoding.compatibility}</div>
                <div><strong>Size:</strong> {encoding.size}</div>
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
            See how our Base64 encoder/decoder outperforms other free tools
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
                    <th className="text-center p-4 font-semibold">Base64Decode.org</th>
                    <th className="text-center p-4 font-semibold">Base64Encode.org</th>
                    <th className="text-center p-4 font-semibold">RapidTables</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.base64decode}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.base64encode}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.rapidtables}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's Base64 Tool?</h3>
          <p className="text-muted-foreground">
            Professional features that make encoding and decoding effortless
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
            See why professionals choose our Base64 encoder/decoder
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
            Everything you need to know about Base64 encoding and decoding
          </p>
        </div>

                 <FAQ
           faqs={faqData}
           title="Everything you need to know about Base64 encoding and decoding"
           variant="modern"
         />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for Base64 encoding and decoding
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Code className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Web Development</h4>
            <p className="text-sm text-muted-foreground">
              Embed images in CSS, encode data in JSON, and handle binary data in web applications
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Download className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">File Attachments</h4>
            <p className="text-sm text-muted-foreground">
              Encode files for email transmission, database storage, and API responses
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Shield className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Data Security</h4>
            <p className="text-sm text-muted-foreground">
              Encode sensitive data for secure transmission and storage in text-based systems
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Settings className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">System Integration</h4>
            <p className="text-sm text-muted-foreground">
              Integrate binary data with text-based protocols and legacy systems
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Encode or Decode Your Data?</h3>
        <p className="text-muted-foreground">
          Start using our professional Base64 encoder/decoder now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try Base64 Encoder/Decoder Now
        </Button>
      </section>
    </div>
  );
} 