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
} from "lucide-react";
import { getToolsByCategory } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import NextImage from "next/image";
import Link from "next/link";

export function Base64ToolsSEOContent() {
  const base64Tools = getToolsByCategory()['base64-tools'];

  const comparisonData = [
    {
      feature: "Encoding Quality",
      toolspy: "✅ Perfect accuracy",
      base64encode: "⚠️ Limited features",
      base64decode: "❌ Basic functionality",
      onlinebase64: "⚠️ Ad-heavy interface",
      toolspyStatus: "excellent",
    },
    {
      feature: "Processing Speed",
      toolspy: "✅ Instant processing",
      base64encode: "⚠️ Server dependent",
      base64decode: "❌ Slow processing",
      onlinebase64: "⚠️ Queue system",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      base64encode: "⚠️ Server-based",
      base64decode: "⚠️ Server-based",
      onlinebase64: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      base64encode: "✅ Free",
      base64decode: "✅ Free",
      onlinebase64: "⚠️ Limited free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Responsive design",
      base64encode: "⚠️ Basic mobile",
      base64decode: "❌ Poor mobile",
      onlinebase64: "⚠️ Limited mobile",
      toolspyStatus: "excellent",
    },
    {
      feature: "Format Support",
      toolspy: "✅ All formats",
      base64encode: "⚠️ Limited formats",
      base64decode: "⚠️ Limited formats",
      onlinebase64: "⚠️ Limited formats",
      toolspyStatus: "excellent",
    },
  ];

  const base64ToolTypes = [
    {
      type: "Base64 Encoder",
      description: "Convert text, images, and files to Base64 format",
      useCase: "Data embedding, web development, API integration",
      precision: "Perfect encoding accuracy",
      example: "Encode images for data URIs in HTML/CSS",
    },
    {
      type: "Base64 Decoder",
      description: "Convert Base64 strings back to original format",
      useCase: "Data extraction, debugging, format conversion",
      precision: "Lossless decoding",
      example: "Decode Base64 images to view original files",
    },
    {
      type: "Image to Base64",
      description: "Convert images directly to Base64 strings",
      useCase: "Web development, data URIs, embedding",
      precision: "High-quality conversion",
      example: "Convert images for inline embedding",
    },
    {
      type: "Base64 to Image",
      description: "Convert Base64 strings back to images",
      useCase: "Image recovery, debugging, format conversion",
      precision: "Perfect image reconstruction",
      example: "Convert Base64 data back to viewable images",
    },
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description: "All Base64 processing happens in your browser - your data never leaves your device.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast Processing",
      description: "Process Base64 data instantly with no uploads, downloads, or server delays.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Perfect Accuracy",
      description: "Maintain perfect data integrity with advanced encoding and decoding algorithms.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Features",
      description: "Comprehensive Base64 tools with professional-grade capabilities.",
    },
  ];

  const keyBenefits = [
    "💰 Professional Base64 processing with complete privacy protection",
    "⚡ Instant processing with no server delays or uploads",
    "🔒 Complete privacy protection - data never leaves your device",
    "📊 Multiple Base64 tools: encoder, decoder, image conversion",
    "🔧 Real-time processing and instant results",
    "📊 Complete processing history and data tracking",
    "📋 Multiple export formats and copy options",
    "🎯 Professional-grade Base64 processing capabilities",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tools requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 Precise Base64 processing and data integrity",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
    "📈 Comprehensive Base64 analysis and conversion tools",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. Base64Encode",
      advantages: [
        "Better Quality: Perfect accuracy vs. limited features",
        "Better Speed: Instant vs. server-dependent processing",
        "Better Privacy: Client-side vs. server-based",
        "Format Support: All formats vs. limited formats",
        "Mobile Experience: Responsive design vs. basic mobile",
        "Advanced Features: Professional tools vs. basic functionality",
      ],
    },
    {
      title: "Toolspy vs. Base64Decode",
      advantages: [
        "Better Quality: Perfect accuracy vs. basic functionality",
        "Better Speed: Instant vs. slow processing",
        "Better Privacy: Client-side vs. server-based",
        "Format Support: All formats vs. limited formats",
        "Mobile Experience: Responsive design vs. poor mobile",
        "Advanced Features: Professional tools vs. basic decoding",
      ],
    },
    {
      title: "Toolspy vs. OnlineBase64",
      advantages: [
        "Better Quality: Perfect accuracy vs. limited features",
        "Better Speed: Instant vs. queue system",
        "Better Privacy: Client-side vs. server-based",
        "No Ads: Clean interface vs. ad-heavy interface",
        "Format Support: All formats vs. limited formats",
        "Mobile Experience: Responsive design vs. limited mobile",
      ],
    },
  ];

  // Register FAQs for SEO
  registerToolFAQ("base64-tools", [
    {
      question: "What are the best free Base64 tools available online?",
      answer: "Toolspy offers the best free Base64 tools including Base64 encoder, Base64 decoder, image to Base64, and Base64 to image converter. All tools provide perfect accuracy with complete privacy protection and no registration required."
    },
    {
      question: "How do I encode text to Base64?",
      answer: "Use Toolspy's Base64 encoder to convert any text, image, or file to Base64 format. The tool processes data in your browser, ensuring complete privacy and instant results with perfect accuracy."
    },
    {
      question: "Can I decode Base64 strings back to original format?",
      answer: "Yes! Toolspy's Base64 decoder can convert Base64 strings back to their original format including text, images, and files. Decode with perfect accuracy and instant processing."
    },
    {
      question: "Is it safe to use online Base64 tools?",
      answer: "Toolspy's Base64 tools are completely safe as all processing happens in your browser. Your data never leaves your device, ensuring complete privacy and security."
    },
    {
      question: "Do I need to register to use Base64 tools?",
      answer: "No registration required! All Toolspy Base64 tools are completely free to use forever with no watermarks, limitations, or account creation needed."
    },
    {
      question: "Can I convert images to Base64 for web development?",
      answer: "Absolutely! Use Toolspy's image to Base64 converter to create data URIs for embedding images directly in HTML, CSS, or JavaScript with perfect quality."
    },
    {
      question: "What is Base64 encoding used for?",
      answer: "Base64 encoding is used for embedding binary data in text-based formats, data URIs, API communication, email attachments, and web development. Toolspy makes Base64 encoding simple and secure."
    },
    {
      question: "Are these Base64 tools mobile-friendly?",
      answer: "Yes! All Toolspy Base64 tools are fully responsive and work perfectly on mobile devices, tablets, and desktops without requiring any app downloads."
    }
  ]);

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="base64-tools"
        title="Professional Base64 Tools"
        description="Discover our comprehensive suite of Base64 encoding and decoding tools designed for developers and professionals."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Professional Base64 Tools – Fast & Private
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Complete suite of professional Base64 encoding and decoding tools with complete privacy protection, 
            perfect accuracy, and instant results. Perfect for developers, 
            web designers, and anyone needing professional data encoding.
          </p>
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-left">
                <div className="space-y-4">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Our{" "}
                    <strong className="text-green-600 dark:text-green-400">
                      professional Base64 tools
                    </strong>{" "}
                    provide the ultimate{" "}
                    <strong className="text-teal-600 dark:text-teal-400">
                      Base64 encoding online
                    </strong>{" "}
                    for{" "}
                    <strong className="text-cyan-600 dark:text-cyan-400">
                      Base64 encoding
                    </strong>
                    ,{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      Base64 decoding
                    </strong>
                    ,{" "}
                    <strong className="text-purple-600 dark:text-purple-400">
                      image to Base64
                    </strong>
                    , and{" "}
                    <strong className="text-pink-600 dark:text-pink-400">
                      Base64 to image
                    </strong>{" "}
                    with perfect accuracy.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The{" "}
                    <strong className="text-green-600 dark:text-green-400">
                      Base64 tools suite
                    </strong>{" "}
                    is designed for both developers and everyday users. With{" "}
                    <strong className="text-teal-600 dark:text-teal-400">
                      advanced encoding technology
                    </strong>
                    ,{" "}
                    <strong className="text-cyan-600 dark:text-cyan-400">
                      complete privacy protection
                    </strong>
                    , and{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      instant processing
                    </strong>
                    , you can{" "}
                    <strong className="text-purple-600 dark:text-purple-400">
                      encode and decode Base64 free
                    </strong>{" "}
                    without any software installation or registration required.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600">{base64Tools.length}</div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      Tools
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/20 dark:to-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                    <div className="text-2xl font-bold text-teal-600">100%</div>
                    <div className="text-sm text-teal-700 dark:text-teal-300">
                      Accurate
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/20 dark:to-cyan-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
                    <div className="text-2xl font-bold text-cyan-600">∞</div>
                    <div className="text-sm text-cyan-700 dark:text-cyan-300">
                      Unlimited
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-600">0ms</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      Upload
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
                  <div className="grid grid-cols-2 gap-4">
                    {base64Tools.slice(0, 4).map((tool, index) => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        className="group p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <Code className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
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
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
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
            How to Use Our Base64 Tools
          </h3>
          <p className="text-lg text-muted-foreground">
            Simple steps to encode and decode Base64 data with perfect accuracy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-green-300 dark:hover:border-green-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Upload className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg">1. Input Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Enter text, upload files, or paste Base64 strings. Supports all formats.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-teal-300 dark:hover:border-teal-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Settings className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <CardTitle className="text-lg">2. Configure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Choose encoding/decoding options and format preferences.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-cyan-300 dark:hover:border-cyan-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <CardTitle className="text-lg">3. Process</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Click process and watch your data transform instantly.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300 dark:hover:border-blue-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Copy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg">4. Copy/Download</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Copy the result or download the processed file.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Base64 Tool Types */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Professional Base64 Tool Types
          </h3>
          <p className="text-lg text-muted-foreground">
            Comprehensive Base64 processing capabilities for every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {base64ToolTypes.map((tool, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-green-300 dark:hover:border-green-600">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <Code className="h-5 w-5 text-green-600 dark:text-green-400" />
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
            Why Choose Our Base64 Tools?
          </h3>
          <p className="text-lg text-muted-foreground">
            Professional Base64 processing with unmatched benefits
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
            Everything you need for professional Base64 processing
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
            See how we compare to other Base64 processing solutions
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
            Detailed comparison with popular Base64 processing tools
          </p>
        </div>

        <Card className="border-2 border-indigo-200 dark:border-indigo-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-green-600 dark:text-green-400">Toolspy</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">Base64Encode</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">Base64Decode</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">OnlineBase64</th>
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
                        {row.base64encode}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        {row.base64decode}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        {row.onlinebase64}
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
            Common questions about our professional Base64 tools
          </p>
        </div>

        <FAQ
          faqs={[
            {
              question: "What are the best free Base64 tools available online?",
              answer: "Toolspy offers the best free Base64 tools including Base64 encoder, Base64 decoder, image to Base64, and Base64 to image converter. All tools provide perfect accuracy with complete privacy protection and no registration required."
            },
            {
              question: "How do I encode text to Base64?",
              answer: "Use Toolspy's Base64 encoder to convert any text, image, or file to Base64 format. The tool processes data in your browser, ensuring complete privacy and instant results with perfect accuracy."
            },
            {
              question: "Can I decode Base64 strings back to original format?",
              answer: "Yes! Toolspy's Base64 decoder can convert Base64 strings back to their original format including text, images, and files. Decode with perfect accuracy and instant processing."
            },
            {
              question: "Is it safe to use online Base64 tools?",
              answer: "Toolspy's Base64 tools are completely safe as all processing happens in your browser. Your data never leaves your device, ensuring complete privacy and security."
            },
            {
              question: "Do I need to register to use Base64 tools?",
              answer: "No registration required! All Toolspy Base64 tools are completely free to use forever with no watermarks, limitations, or account creation needed."
            },
            {
              question: "Can I convert images to Base64 for web development?",
              answer: "Absolutely! Use Toolspy's image to Base64 converter to create data URIs for embedding images directly in HTML, CSS, or JavaScript with perfect quality."
            },
            {
              question: "What is Base64 encoding used for?",
              answer: "Base64 encoding is used for embedding binary data in text-based formats, data URIs, API communication, email attachments, and web development. Toolspy makes Base64 encoding simple and secure."
            },
            {
              question: "Are these Base64 tools mobile-friendly?",
              answer: "Yes! All Toolspy Base64 tools are fully responsive and work perfectly on mobile devices, tablets, and desktops without requiring any app downloads."
            }
          ]}
        />
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Ready to Process Your Base64 Data?
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Start using our professional Base64 tools today. No registration required, 
            completely free, and your data never leaves your device.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/base64-encoder-decoder">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3">
                <Code className="mr-2 h-5 w-5" />
                Start Encoding Base64
              </Button>
            </Link>
            <Link href="/tools/image-to-base64">
              <Button size="lg" variant="outline" className="px-8 py-3">
                <Settings className="mr-2 h-5 w-5" />
                Convert Images
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
