"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Star,
  Target,
  Zap,
  Shield,
  Settings,
  FileText,
  Copy,
  Download,
  File,
  ArrowRight,
  FileDown,
  BarChart3,
  Sparkles,
  Palette,
  Smartphone,
  Code,
  Edit3,
  Maximize,
  Compress,
  RotateCcw,
  Filter,
  Upload,
  Lock,
  Unlock,
  Hash,
  Type,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { getToolsByCategory } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import NextImage from "next/image";
import Link from "next/link";

export function JSONToolsSEOContent() {
  const jsonTools = getToolsByCategory()['json-tools'];

  const comparisonData = [
    {
      feature: "JSON Processing",
      toolspy: "✅ Perfect accuracy",
      jsonlint: "⚠️ Basic validation",
      jsonformatter: "❌ Limited features",
      onlinejson: "⚠️ Ad-heavy interface",
      toolspyStatus: "excellent",
    },
    {
      feature: "Processing Speed",
      toolspy: "✅ Instant processing",
      jsonlint: "⚠️ Server dependent",
      jsonformatter: "❌ Slow processing",
      onlinejson: "⚠️ Queue system",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      jsonlint: "⚠️ Server-based",
      jsonformatter: "⚠️ Server-based",
      onlinejson: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      jsonlint: "✅ Free",
      jsonformatter: "✅ Free",
      onlinejson: "⚠️ Limited free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Responsive design",
      jsonlint: "⚠️ Basic mobile",
      jsonformatter: "❌ Poor mobile",
      onlinejson: "⚠️ Limited mobile",
      toolspyStatus: "excellent",
    },
    {
      feature: "Advanced Features",
      toolspy: "✅ Professional tools",
      jsonlint: "❌ Basic validation",
      jsonformatter: "⚠️ Limited formatting",
      onlinejson: "⚠️ Limited features",
      toolspyStatus: "excellent",
    },
  ];

  const jsonToolTypes = [
    {
      type: "JSON Formatter",
      description: "Format and beautify JSON data with proper indentation",
      useCase: "Code readability, debugging, data presentation",
      precision: "Perfect formatting",
      example: "Format minified JSON for better readability",
    },
    {
      type: "JSON Validator",
      description: "Validate JSON syntax and structure",
      useCase: "Error detection, data validation, API testing",
      precision: "Accurate validation",
      example: "Validate JSON before processing or storage",
    },
    {
      type: "JSON Minifier",
      description: "Minify JSON by removing unnecessary whitespace",
      useCase: "File size reduction, API optimization, storage efficiency",
      precision: "Lossless minification",
      example: "Minify JSON for faster API responses",
    },
    {
      type: "JSON Converter",
      description: "Convert between JSON and other data formats",
      useCase: "Data transformation, format compatibility, integration",
      precision: "Accurate conversion",
      example: "Convert CSV to JSON or XML to JSON",
    },
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description: "All JSON processing happens in your browser - your data never leaves your device.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast Processing",
      description: "Process JSON data instantly with no uploads, downloads, or server delays.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Perfect Accuracy",
      description: "Maintain perfect JSON integrity with advanced processing algorithms.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Features",
      description: "Comprehensive JSON tools with professional-grade capabilities.",
    },
  ];

  const keyBenefits = [
    "💰 Professional JSON processing with complete privacy protection",
    "⚡ Instant processing with no server delays or uploads",
    "🔒 Complete privacy protection - data never leaves your device",
    "📊 Multiple JSON tools: formatter, validator, minifier, converter",
    "🔧 Real-time processing and instant results",
    "📊 Complete processing history and data tracking",
    "📋 Multiple export formats and copy options",
    "🎯 Professional-grade JSON processing capabilities",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tools requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 Precise JSON processing and data integrity",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
    "📈 Comprehensive JSON analysis and optimization tools",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. JSONLint",
      advantages: [
        "Better Features: Professional tools vs. basic validation",
        "Better Speed: Instant vs. server-dependent processing",
        "Better Privacy: Client-side vs. server-based",
        "Advanced Features: Multiple tools vs. basic validation",
        "Mobile Experience: Responsive design vs. basic mobile",
        "Professional Tools: Comprehensive suite vs. single function",
      ],
    },
    {
      title: "Toolspy vs. JSONFormatter",
      advantages: [
        "Better Quality: Perfect accuracy vs. limited features",
        "Better Speed: Instant vs. slow processing",
        "Better Privacy: Client-side vs. server-based",
        "Advanced Features: Multiple tools vs. limited formatting",
        "Mobile Experience: Responsive design vs. poor mobile",
        "Professional Tools: Comprehensive suite vs. basic formatter",
      ],
    },
    {
      title: "Toolspy vs. OnlineJSON",
      advantages: [
        "Better Quality: Perfect accuracy vs. limited features",
        "Better Speed: Instant vs. queue system",
        "Better Privacy: Client-side vs. server-based",
        "No Ads: Clean interface vs. ad-heavy interface",
        "Advanced Features: Multiple tools vs. limited features",
        "Mobile Experience: Responsive design vs. limited mobile",
      ],
    },
  ];

  // Register FAQs for SEO
  registerToolFAQ("json-tools", [
    {
      question: "What are the best free JSON tools available online?",
      answer: "Toolspy offers the best free JSON tools including JSON formatter, JSON validator, JSON minifier, and JSON converter. All tools provide perfect accuracy with complete privacy protection and no registration required."
    },
    {
      question: "How do I format JSON data properly?",
      answer: "Use Toolspy's JSON formatter to beautify and format JSON data with proper indentation and structure. The tool processes data in your browser, ensuring complete privacy and instant results."
    },
    {
      question: "Can I validate JSON syntax and structure?",
      answer: "Yes! Toolspy's JSON validator can check JSON syntax, validate structure, and identify errors with perfect accuracy and detailed error reporting."
    },
    {
      question: "Is it safe to use online JSON tools?",
      answer: "Toolspy's JSON tools are completely safe as all processing happens in your browser. Your data never leaves your device, ensuring complete privacy and security."
    },
    {
      question: "Do I need to register to use JSON tools?",
      answer: "No registration required! All Toolspy JSON tools are completely free to use forever with no watermarks, limitations, or account creation needed."
    },
    {
      question: "Can I minify JSON for smaller file sizes?",
      answer: "Absolutely! Use Toolspy's JSON minifier to remove unnecessary whitespace and reduce file size while maintaining perfect data integrity."
    },
    {
      question: "How do I convert between JSON and other formats?",
      answer: "Use Toolspy's JSON converter to transform data between JSON, CSV, XML, and other formats with accurate conversion and data preservation."
    },
    {
      question: "Are these JSON tools mobile-friendly?",
      answer: "Yes! All Toolspy JSON tools are fully responsive and work perfectly on mobile devices, tablets, and desktops without requiring any app downloads."
    }
  ]);

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="json-tools"
        title="Professional JSON Tools"
        description="Discover our comprehensive suite of JSON processing tools designed for developers and professionals."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Professional JSON Tools – Fast & Private
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Complete suite of professional JSON processing tools with complete privacy protection, 
            perfect accuracy, and instant results. Perfect for developers, 
            data analysts, and anyone working with JSON data.
          </p>
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-left">
                <div className="space-y-4">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Our{" "}
                    <strong className="text-yellow-600 dark:text-yellow-400">
                      professional JSON tools
                    </strong>{" "}
                    provide the ultimate{" "}
                    <strong className="text-orange-600 dark:text-orange-400">
                      JSON processing online
                    </strong>{" "}
                    for{" "}
                    <strong className="text-red-600 dark:text-red-400">
                      JSON formatting
                    </strong>
                    ,{" "}
                    <strong className="text-pink-600 dark:text-pink-400">
                      JSON validation
                    </strong>
                    ,{" "}
                    <strong className="text-purple-600 dark:text-purple-400">
                      JSON minification
                    </strong>
                    , and{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      JSON conversion
                    </strong>{" "}
                    with perfect accuracy.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The{" "}
                    <strong className="text-yellow-600 dark:text-yellow-400">
                      JSON tools suite
                    </strong>{" "}
                    is designed for both developers and data professionals. With{" "}
                    <strong className="text-orange-600 dark:text-orange-400">
                      advanced processing technology
                    </strong>
                    ,{" "}
                    <strong className="text-red-600 dark:text-red-400">
                      complete privacy protection
                    </strong>
                    , and{" "}
                    <strong className="text-pink-600 dark:text-pink-400">
                      instant processing
                    </strong>
                    , you can{" "}
                    <strong className="text-purple-600 dark:text-purple-400">
                      process JSON free
                    </strong>{" "}
                    without any software installation or registration required.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                    <div className="text-2xl font-bold text-yellow-600">{jsonTools.length}</div>
                    <div className="text-sm text-yellow-700 dark:text-yellow-300">
                      Tools
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <div className="text-2xl font-bold text-orange-600">100%</div>
                    <div className="text-sm text-orange-700 dark:text-orange-300">
                      Accurate
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                    <div className="text-2xl font-bold text-red-600">∞</div>
                    <div className="text-sm text-red-700 dark:text-red-300">
                      Unlimited
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-800">
                    <div className="text-2xl font-bold text-pink-600">0ms</div>
                    <div className="text-sm text-pink-700 dark:text-pink-300">
                      Processing
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-800">
                  <div className="grid grid-cols-2 gap-4">
                    {jsonTools.slice(0, 4).map((tool, index) => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        className="group p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-600 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                            <Code className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                              {tool.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {tool.description.split(' ').slice(0, 4).join(' ')}...
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✨ Professional
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            How to Use Our JSON Tools
          </h3>
          <p className="text-lg text-muted-foreground">
            Simple steps to process JSON data with professional quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-yellow-300 dark:hover:border-yellow-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Type className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <CardTitle className="text-lg">1. Input JSON</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Paste or upload your JSON data for processing.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-300 dark:hover:border-orange-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Settings className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-lg">2. Configure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Set formatting options, validation rules, or conversion settings.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-red-300 dark:hover:border-red-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-red-100 dark:bg-red-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-lg">3. Process</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Click process and get instant, accurate results.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-pink-300 dark:hover:border-pink-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Copy className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <CardTitle className="text-lg">4. Copy/Download</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Copy the result or download the processed JSON.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* JSON Tool Types */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Professional JSON Tool Types
          </h3>
          <p className="text-lg text-muted-foreground">
            Comprehensive JSON processing capabilities for every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jsonToolTypes.map((tool, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-yellow-300 dark:hover:border-yellow-600">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <Code className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tool.type}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Use Case:</h4>
                  <p className="text-sm">{tool.useCase}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Precision:</h4>
                  <p className="text-sm">{tool.precision}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Example:</h4>
                  <p className="text-sm">{tool.example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Why Choose Our JSON Tools?
          </h3>
          <p className="text-lg text-muted-foreground">
            Professional JSON processing with unmatched benefits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-green-300 dark:hover:border-green-600">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-fit group-hover:scale-110 transition-transform mb-4">
                  {benefit.icon}
                </div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Benefits List */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Complete Feature Set
          </h3>
          <p className="text-lg text-muted-foreground">
            Everything you need for professional JSON processing
          </p>
        </div>

        <Card className="border-2 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Competitor Comparison */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Toolspy vs. Competitors
          </h3>
          <p className="text-lg text-muted-foreground">
            See how we compare to other JSON processing solutions
          </p>
        </div>

        <div className="space-y-6">
          {competitorAdvantages.map((competitor, index) => (
            <Card key={index} className="border-2 border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-xl text-center">{competitor.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {competitor.advantages.map((advantage, advIndex) => (
                    <div key={advIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{advantage}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Feature Comparison
          </h3>
          <p className="text-lg text-muted-foreground">
            Detailed comparison with popular JSON processing tools
          </p>
        </div>

        <Card className="border-2 border-indigo-200 dark:border-indigo-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-yellow-600 dark:text-yellow-400">Toolspy</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">JSONLint</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">JSONFormatter</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">OnlineJSON</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.toolspyStatus === 'excellent' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {row.toolspy}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        {row.jsonlint}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        {row.jsonformatter}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        {row.onlinejson}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h3>
          <p className="text-lg text-muted-foreground">
            Common questions about our professional JSON tools
          </p>
        </div>

        <FAQ
          faqs={[
            {
              question: "What are the best free JSON tools available online?",
              answer: "Toolspy offers the best free JSON tools including JSON formatter, JSON validator, JSON minifier, and JSON converter. All tools provide perfect accuracy with complete privacy protection and no registration required."
            },
            {
              question: "How do I format JSON data properly?",
              answer: "Use Toolspy's JSON formatter to beautify and format JSON data with proper indentation and structure. The tool processes data in your browser, ensuring complete privacy and instant results."
            },
            {
              question: "Can I validate JSON syntax and structure?",
              answer: "Yes! Toolspy's JSON validator can check JSON syntax, validate structure, and identify errors with perfect accuracy and detailed error reporting."
            },
            {
              question: "Is it safe to use online JSON tools?",
              answer: "Toolspy's JSON tools are completely safe as all processing happens in your browser. Your data never leaves your device, ensuring complete privacy and security."
            },
            {
              question: "Do I need to register to use JSON tools?",
              answer: "No registration required! All Toolspy JSON tools are completely free to use forever with no watermarks, limitations, or account creation needed."
            },
            {
              question: "Can I minify JSON for smaller file sizes?",
              answer: "Absolutely! Use Toolspy's JSON minifier to remove unnecessary whitespace and reduce file size while maintaining perfect data integrity."
            },
            {
              question: "How do I convert between JSON and other formats?",
              answer: "Use Toolspy's JSON converter to transform data between JSON, CSV, XML, and other formats with accurate conversion and data preservation."
            },
            {
              question: "Are these JSON tools mobile-friendly?",
              answer: "Yes! All Toolspy JSON tools are fully responsive and work perfectly on mobile devices, tablets, and desktops without requiring any app downloads."
            }
          ]}
        />
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            Ready to Process Your JSON Data?
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Start using our professional JSON tools today. No registration required, 
            completely free, and your data never leaves your device.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/json-formatter">
              <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-8 py-3">
                <Code className="mr-2 h-5 w-5" />
                Start Formatting JSON
              </Button>
            </Link>
            <Link href="/tools/json-validator">
              <Button size="lg" variant="outline" className="px-8 py-3">
                <CheckCircle className="mr-2 h-5 w-5" />
                Validate JSON
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
