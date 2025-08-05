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
  Brain,
  Palette,
  Download,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";

export function CodeBeautifierSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("code-beautifier");

  const comparisonData = [
    {
      feature: "Supported Languages",
      toolspy: "✅ JS, CSS, HTML, JSON, XML",
      prettier: "✅ 20+ languages",
      codebeautify: "✅ 10+ languages",
      freeformatter: "✅ 5 languages",
      toolspyStatus: "excellent",
    },
    {
      feature: "AI Code Explanation",
      toolspy: "✅ Intelligent analysis",
      prettier: "❌ Not available",
      codebeautify: "❌ Not available",
      freeformatter: "❌ Not available",
      toolspyStatus: "excellent",
    },
    {
      feature: "Syntax Error Detection",
      toolspy: "✅ Real-time validation",
      prettier: "✅ Basic errors",
      codebeautify: "❌ No validation",
      freeformatter: "❌ No validation",
      toolspyStatus: "excellent",
    },
    {
      feature: "Custom Formatting Rules",
      toolspy: "✅ Extensive options",
      prettier: "✅ Configuration file",
      codebeautify: "✅ Basic options",
      freeformatter: "✅ Limited options",
      toolspyStatus: "excellent",
    },
    {
      feature: "File Size Limit",
      toolspy: "50MB",
      prettier: "No limit (local)",
      codebeautify: "1MB",
      freeformatter: "500KB",
      toolspyStatus: "excellent",
    },
    {
      feature: "Minification",
      toolspy: "✅ Advanced compression",
      prettier: "❌ Beautify only",
      codebeautify: "✅ Basic minify",
      freeformatter: "✅ Basic minify",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side only",
      prettier: "✅ Local tool",
      codebeautify: "⚠️ Server processing",
      freeformatter: "⚠️ Server processing",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Multiple files",
      prettier: "✅ Via CLI",
      codebeautify: "❌ Single file",
      freeformatter: "❌ Single file",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Multi-Language Support",
      description: "Format and minify JavaScript, CSS, HTML, JSON, and XML with language-specific optimization."
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Code Analysis",
      description: "Get intelligent explanations of your code structure, quality insights, and improvement suggestions."
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Advanced Formatting",
      description: "Customize indentation, quotes, semicolons, line wrapping, and comment handling to match your style."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Syntax Validation",
      description: "Real-time error detection with precise line and column information for quick debugging."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Smart Compression",
      description: "Intelligent minification that preserves functionality while maximizing size reduction."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Flexible Configuration",
      description: "Fine-tune formatting rules with extensive options for professional code standards."
    }
  ];

  const useCases = [
    {
      title: "Development Workflow",
      description: "Integrate into your development process for consistent code formatting and optimization.",
      examples: ["Code reviews", "Pre-commit hooks", "Team standards", "CI/CD pipelines"]
    },
    {
      title: "Performance Optimization",
      description: "Minify production code to reduce bundle sizes and improve loading times.",
      examples: ["Production builds", "CDN optimization", "Mobile performance", "Bandwidth savings"]
    },
    {
      title: "Code Maintenance",
      description: "Clean up legacy code and ensure consistent formatting across projects.",
      examples: ["Legacy refactoring", "Code migration", "Style consistency", "Documentation"]
    },
    {
      title: "Learning & Education",
      description: "Understand code structure and best practices with AI-powered explanations.",
      examples: ["Code tutorials", "Student projects", "Skill development", "Code analysis"]
    }
  ];

  const languageFeatures = [
    {
      language: "JavaScript",
      features: ["ES6+ syntax", "JSX support", "Semicolon control", "Quote preferences", "Arrow functions"]
    },
    {
      language: "CSS",
      features: ["Property sorting", "Vendor prefixes", "Color optimization", "Selector formatting", "Media queries"]
    },
    {
      language: "HTML",
      features: ["Tag formatting", "Attribute sorting", "Self-closing tags", "Indentation control", "Comment handling"]
    },
    {
      language: "JSON",
      features: ["Key sorting", "Pretty printing", "Validation", "Minification", "Structure analysis"]
    }
  ];

  const faqs = [
    {
      question: "What programming languages does the code beautifier support?",
      answer: "Our tool supports JavaScript (including ES6+), CSS, HTML, JSON, and XML. Each language has specific formatting rules and optimization techniques tailored for best practices."
    },
    {
      question: "How does the AI code explanation feature work?",
      answer: "The AI analyzes your code structure, identifies patterns, detects potential issues, and provides insights about code quality, complexity, and best practices. It helps you understand what your code does and how to improve it."
    },
    {
      question: "Can I customize the formatting rules?",
      answer: "Yes! You can customize indentation size, indent type (spaces/tabs), quote style, semicolon usage, line wrapping, comment preservation, and many other formatting options to match your coding standards."
    },
    {
      question: "What's the difference between beautifying and minifying code?",
      answer: "Beautifying adds proper indentation, spacing, and line breaks to make code readable. Minifying removes unnecessary whitespace, comments, and optimizes syntax to reduce file size for production use."
    },
    {
      question: "Is my code secure when using this tool?",
      answer: "Absolutely! All code processing happens locally in your browser. Your code never leaves your device or gets sent to any server, ensuring complete privacy and security of your intellectual property."
    },
    {
      question: "Does the tool detect syntax errors?",
      answer: "Yes, our tool performs real-time syntax validation and highlights errors with precise line and column information. It helps identify common issues like missing semicolons, unmatched brackets, and syntax violations."
    },
    {
      question: "Can I process multiple files at once?",
      answer: "Yes, the tool supports batch processing for multiple files. You can upload and format several code files simultaneously, saving time when working with large projects."
    },
    {
      question: "What's the maximum file size I can process?",
      answer: "You can process files up to 50MB in size, which is significantly larger than most online code formatters. This allows you to handle large codebases and complex projects."
    },
    {
      question: "How accurate is the minification process?",
      answer: "Our minification process is designed to preserve functionality while maximizing compression. It intelligently removes whitespace, optimizes syntax, and can optionally remove comments while maintaining code behavior."
    },
    {
      question: "Can I save my formatting preferences?",
      answer: "Currently, preferences are saved for your session. We're working on adding user accounts to save custom formatting presets permanently across visits."
    }
  ];

  // Register FAQ data for schema generation
  if (typeof window !== 'undefined') {
    registerToolFAQ('code-beautifier', () => faqs);
  }

  return (
    <div className="space-y-12 mt-12">
      {/* Features Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our Code Beautifier?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced formatting capabilities with AI-powered analysis make code beautification intelligent and secure.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
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

      {/* Language Features */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Language-Specific Features
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tailored formatting rules and optimizations for each supported programming language.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {languageFeatures.map((lang, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Code className="h-5 w-5 text-purple-600" />
                  {lang.language}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {lang.features.map((feature, idx) => (
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
            See how our code beautifier stands out with unique features and superior capabilities.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold bg-purple-50">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Toolspy
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold">Prettier</th>
                    <th className="text-center p-4 font-semibold">Code Beautify</th>
                    <th className="text-center p-4 font-semibold">FreeFormatter</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center bg-purple-50">
                        <div className="flex items-center justify-center gap-2">
                          {row.toolspyStatus === "excellent" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">{row.toolspy}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">{row.prettier}</td>
                      <td className="p-4 text-center">{row.codebeautify}</td>
                      <td className="p-4 text-center">{row.freeformatter}</td>
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
            Perfect For Every Developer Need
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From development workflows to performance optimization, our tool handles all your code formatting needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
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
            Everything you need to know about code formatting, minification, and our advanced features.
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
          currentToolSlug="code-beautifier"
        />
      </section>
    </div>
  );
}