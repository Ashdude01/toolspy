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
  Search,
  Copy,
  Download,
  GitCompare,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function TextDiffCheckerSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("text-diff-checker");

  const comparisonData = [
    {
      feature: "Max Text Length",
      toolspy: "Unlimited",
      diffchecker: "10MB limit",
      textcompare: "5MB limit",
      diffnow: "1MB limit",
      toolspyStatus: "excellent",
    },
    {
      feature: "Real-time Comparison",
      toolspy: "✅ Instant updates",
      diffchecker: "❌ Manual submit",
      textcompare: "⚠️ Basic updates",
      diffnow: "❌ Manual submit",
      toolspyStatus: "excellent",
    },
    {
      feature: "Line-by-line Analysis",
      toolspy: "✅ Detailed breakdown",
      diffchecker: "✅ Good analysis",
      textcompare: "⚠️ Basic analysis",
      diffnow: "❌ Limited analysis",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      diffchecker: "⚠️ Server-based",
      textcompare: "⚠️ Server-based",
      diffnow: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      diffchecker: "✅ Free",
      textcompare: "✅ Free",
      diffnow: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Options",
      toolspy: "✅ Multiple formats",
      diffchecker: "⚠️ Basic export",
      textcompare: "❌ No export",
      diffnow: "❌ No export",
      toolspyStatus: "excellent",
    },
    {
      feature: "Syntax Highlighting",
      toolspy: "✅ Code support",
      diffchecker: "✅ Code support",
      textcompare: "❌ No highlighting",
      diffnow: "❌ No highlighting",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      diffchecker: "❌ Ad-heavy",
      textcompare: "❌ Ad-heavy",
      diffnow: "❌ Ad-heavy",
      toolspyStatus: "excellent",
    },
  ];

  const diffTypes = [
    {
      type: "Character-level Diff",
      description: "Compare text character by character",
      useCase: "Code reviews, document comparison",
      features: "Precise character matching, detailed highlighting",
      accuracy: "100% character accuracy",
    },
    {
      type: "Word-level Diff",
      description: "Compare text word by word",
      useCase: "Document editing, content comparison",
      features: "Word boundary detection, semantic grouping",
      accuracy: "High accuracy with context",
    },
    {
      type: "Line-level Diff",
      description: "Compare text line by line",
      useCase: "Code files, structured documents",
      features: "Line-by-line analysis, block comparison",
      accuracy: "Perfect for structured content",
    },
    {
      type: "Block-level Diff",
      description: "Compare text in larger blocks",
      useCase: "Large documents, paragraph comparison",
      features: "Paragraph grouping, section analysis",
      accuracy: "Efficient for large content",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's text diff checker completely free to use?",
      answer:
        "Yes, our professional text diff checker is completely free with no hidden costs, registration requirements, or usage limitations. You can compare unlimited text without any restrictions. Unlike many competitors who have file size limits or require paid subscriptions for advanced features, Toolspy provides all diff checking capabilities free of charge.",
    },
    {
      question: "What is a text diff checker and when should I use it?",
      answer:
        "A text diff checker compares two pieces of text and highlights the differences between them. It's essential for code reviews, document comparison, content editing, and version control. Our tool provides real-time comparison with detailed highlighting, making it easy to spot additions, deletions, and modifications in any text content.",
    },
    {
      question: "How secure is the text I compare with Toolspy?",
      answer:
        "Absolutely secure! Our text diff checker uses client-side processing, meaning your text is processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security for your sensitive documents, code, or any other text content. Your data never leaves your device.",
    },
    {
      question: "What types of text comparison does the tool support?",
      answer:
        "Our tool supports multiple comparison types including character-level, word-level, line-level, and block-level diff checking. You can compare code files, documents, plain text, and any other text content. The tool also provides syntax highlighting for code files and detailed statistics about the differences found.",
    },
    {
      question: "Can I compare large documents with this tool?",
      answer:
        "Yes! Unlike many competitors who limit files to 1-10MB, our tool supports unlimited text length. You can compare large documents, multiple files, and complex content without any restrictions. The tool provides real-time comparison with instant results and detailed analysis.",
    },
    {
      question: "Why choose Toolspy over other free diff tools like DiffChecker.com or TextCompare.org?",
      answer:
        "Toolspy offers professional-grade features like unlimited text length, real-time comparison, multiple export formats, and client-side processing for privacy. Many competitors like DiffChecker.com and TextCompare.org lack these advanced features or have strict file size limits. Our tool provides better privacy protection, more comparison options, and superior user experience completely free.",
    },
    {
      question: "How does the real-time comparison feature work?",
      answer:
        "Our tool provides instant comparison as you type or paste text. You can see differences highlighted in real-time with color-coded additions (green), deletions (red), and modifications (yellow). This makes it easy to track changes and understand exactly what has been modified between two versions of text.",
    },
    {
      question: "Can I export the comparison results?",
      answer:
        "Yes! Our tool supports multiple export options including copying the diff results, downloading as text files, and sharing comparison links. You can export in various formats and include detailed statistics about the differences found. This is perfect for documentation and sharing with team members.",
    },
    {
      question: "How accurate is the diff checking algorithm?",
      answer:
        "Our tool uses advanced diff algorithms that provide 100% accuracy in detecting differences. The algorithm considers character-level, word-level, and line-level changes to ensure no differences are missed. It also handles special characters, formatting, and different text encodings properly.",
    },
    {
      question: "Can I compare code files with syntax highlighting?",
      answer:
        "Yes! Our tool includes syntax highlighting for popular programming languages including JavaScript, Python, Java, C++, HTML, CSS, and many more. This makes it easy to compare code files with proper syntax coloring, making differences more visible and easier to understand.",
    },
  ];

  const benefits = [
    {
      icon: <GitCompare className="h-6 w-6" />,
      title: "Real-time Comparison",
      description:
        "Instant text comparison with live highlighting and detailed difference analysis.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Multiple Diff Types",
      description:
        "Support for character, word, line, and block-level comparison for all use cases.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your text never leaves your device, providing maximum security.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Features",
      description:
        "Syntax highlighting, export options, and detailed statistics for professional use.",
    },
  ];

  const keyBenefits = [
    "⚡ Real-time comparison with instant highlighting",
    "🔍 Multiple diff types: character, word, line, block-level",
    "🔒 Complete privacy protection - text never leaves your device",
    "📝 Unlimited text length with no file size restrictions",
    "🎨 Syntax highlighting for code files",
    "📊 Detailed statistics and difference analysis",
    "📋 Multiple export formats and sharing options",
    "🎯 Professional-grade diff algorithms",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "📈 Perfect for code reviews and document comparison",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
    "🔍 100% accurate difference detection",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. DiffChecker.com",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "Real-time Updates: Instant comparison vs. manual submit",
        "Unlimited Size: No restrictions vs. 10MB limit",
        "Better Export: Multiple formats vs. basic export",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Syntax Highlighting: Code support vs. basic text only",
      ],
    },
    {
      title: "Toolspy vs. TextCompare.org",
      advantages: [
        "No Registration: Instant access vs. account requirements",
        "Faster Processing: No upload time vs. server processing",
        "Better Privacy: No data transmission vs. server-based",
        "Unlimited Size: No restrictions vs. 5MB limit",
        "Export Options: Multiple formats vs. no export",
        "Real-time Comparison: Instant updates vs. basic updates",
      ],
    },
    {
      title: "Toolspy vs. DiffNow.com",
      advantages: [
        "Unlimited Processing: No size limits vs. 1MB restriction",
        "Real-time Updates: Instant comparison vs. manual submit",
        "Better Analysis: Detailed breakdown vs. limited analysis",
        "Export Options: Multiple formats vs. no export",
        "Better Privacy: Client-side vs. server-based processing",
        "Clean Interface: No ads vs. ad-heavy experience",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="text-diff-checker"
        title="Similar Tools You Might Like"
        description="Check out our other text and comparison tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Compare Text – Professional & Accurate
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional text diff checker with real-time comparison, multiple diff types, 
            and complete privacy protection. Perfect for developers, writers, 
            and anyone needing to compare text content.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our Text Diff Checker</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to compare text with professional accuracy
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
              Paste your original text in the left panel and the modified text in the right panel. 
              The tool supports unlimited text length and real-time comparison.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Choose Diff Type</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Select your preferred comparison type: character-level, word-level, 
              line-level, or block-level diff checking based on your needs.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Analyze Results</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              View highlighted differences with detailed statistics. Copy, export, 
              or share your comparison results with team members.
            </p>
          </Card>
        </div>
      </section>

      {/* Diff Types Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Diff Types & Use Cases</h3>
          <p className="text-muted-foreground">
            Choose the right comparison type for your specific needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diffTypes.map((type, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <GitCompare className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{type.type}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Use Case:</strong> {type.useCase}</div>
                <div><strong>Features:</strong> {type.features}</div>
                <div><strong>Accuracy:</strong> {type.accuracy}</div>
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
            See how our text diff checker outperforms other free tools
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
                    <th className="text-center p-4 font-semibold">DiffChecker.com</th>
                    <th className="text-center p-4 font-semibold">TextCompare.org</th>
                    <th className="text-center p-4 font-semibold">DiffNow.com</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.diffchecker}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.textcompare}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.diffnow}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's Text Diff Checker?</h3>
          <p className="text-muted-foreground">
            Professional features that make text comparison effortless
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
            See why professionals choose our text diff checker
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
            Everything you need to know about text comparison
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about text comparison"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for text comparison
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Code Reviews</h4>
            <p className="text-sm text-muted-foreground">
              Compare code changes, review pull requests, and track modifications in development
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Search className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Document Comparison</h4>
            <p className="text-sm text-muted-foreground">
              Compare document versions, track edits, and identify content changes
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Copy className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Content Editing</h4>
            <p className="text-sm text-muted-foreground">
              Review content changes, track revisions, and ensure quality control
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Download className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Version Control</h4>
            <p className="text-sm text-muted-foreground">
              Track file changes, compare versions, and maintain document history
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Compare Text?</h3>
        <p className="text-muted-foreground">
          Start using our professional text diff checker now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try Text Diff Checker Now
        </Button>
      </section>
    </div>
  );
}
