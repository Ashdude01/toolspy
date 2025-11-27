'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Star,
  Target,
  Zap,
  Shield,
  Settings,
  Calculator,
  FileImage,
  FileText,
  Code,
  Globe,
  Smartphone,
  Clock,
  Download,
  Lock,
  Users,
  TrendingUp,
  Heart,
  Award,
  Sparkles
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { RelatedTools } from '@/components/tools/related-tools';
import Image from 'next/image';

export function HomeSeoContent({faqData}: any) {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const comparisonData = [
    {
      feature: "Number of Tools",
      toolspy: "50+ Professional Tools",
      ilovepdf: "25 Basic Tools",
      cloudconvert: "200+ Formats",
      imageresizer: "Desktop Only",
      toolspyStatus: "excellent",
    },
    {
      feature: "File Processing",
      toolspy: "✅ Client-side (Private)",
      ilovepdf: "⚠️ Server uploads",
      cloudconvert: "⚠️ Cloud processing",
      imageresizer: "❌ Local software",
      toolspyStatus: "excellent",
    },
    {
      feature: "File Size Limits",
      toolspy: "✅ Up to 100MB",
      ilovepdf: "❌ 25MB (free)",
      cloudconvert: "✅ Unlimited (paid)",
      imageresizer: "✅ No limits",
      toolspyStatus: "excellent",
    },
    {
      feature: "Free Usage",
      toolspy: "✅ Unlimited forever",
      ilovepdf: "❌ Limited tasks",
      cloudconvert: "❌ 10 files/day",
      imageresizer: "⚠️ Freemium model",
      toolspyStatus: "excellent",
    },
    {
      feature: "Registration Required",
      toolspy: "✅ No registration",
      ilovepdf: "❌ Account required",
      cloudconvert: "❌ API access needs signup",
      imageresizer: "✅ No registration",
      toolspyStatus: "excellent",
    },
    {
      feature: "Ads & Watermarks",
      toolspy: "✅ Clean interface",
      ilovepdf: "❌ Ads in free tier",
      cloudconvert: "✅ No ads",
      imageresizer: "✅ No ads",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Optimized",
      toolspy: "✅ Fully responsive",
      ilovepdf: "✅ Mobile apps",
      cloudconvert: "⚠️ Basic mobile",
      imageresizer: "❌ Desktop only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Processing Speed",
      toolspy: "✅ Instant (offline)",
      ilovepdf: "⚠️ Upload + wait",
      cloudconvert: "⚠️ Queue system",
      imageresizer: "✅ Fast (local)",
      toolspyStatus: "excellent",
    },
  ];

  const toolCategories = [
    {
      icon: <FileImage className="h-6 w-6" />,
      title: "Image Processing Tools",
      description: "Professional image compression, conversion, resizing, and optimization tools",
      tools: ["Image Compressor", "Image Converter", "Image Resizer", "Image Optimizer", "JFIF to JPG"]
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "PDF Processing Tools",
      description: "Complete PDF manipulation suite for merging, splitting, converting, and protecting documents",
      tools: ["PDF Converter", "Merge PDF", "Split PDF", "PDF to Word", "PDF to Excel", "PDF to Image"]
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Base64 & Encoding Tools",
      description: "Secure encoding and decoding tools for developers and data processing",
      tools: ["Base64 Encoder", "Base64 to Image", "Image to Base64", "Base64 Decoder"]
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Advanced Calculators",
      description: "Financial, mathematical, and unit conversion calculators for every need",
      tools: ["Age Calculator", "BMI Calculator", "Percentage Calculator", "Investment Calculator", "EMI Calculator"]
    }
  ];

  

  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Professional-Grade Tools",
      description: "Get access to enterprise-quality tools with advanced algorithms and professional features, all completely free and browser-based."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning-Fast Processing",
      description: "Client-side processing ensures maximum speed and privacy with no upload delays or server processing time for most tools."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description: "Your files never leave your device with our secure client-side processing. No data collection, no tracking, no storage on our servers."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Control Options",
      description: "Precision controls and professional settings give you complete control over output quality and file specifications."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Universal Compatibility",
      description: "Works on all devices and browsers with no software installation required. Full mobile optimization included for all tools."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Always Available",
      description: "24/7 access to all tools with no downtime, registration, or usage limits. Process files anytime, anywhere you need."
    }
  ];

  const keyBenefits = [
    "🎯 50+ professional-grade online tools completely free forever",
    "⚡ Client-side processing for maximum privacy and lightning speed",
    "🔒 No registration, account creation, or personal data required ever",
    "📱 Fully responsive design optimized for all devices and screen sizes",
    "🖥️ Works offline after initial page load for many processing tools",
    "📦 Batch processing support for efficient workflow and time savings",
    "🎨 Clean, professional interface without intrusive ads or distractions",
    "⚙️ Advanced options and precision controls for professional results",
    "🌐 Universal browser compatibility across all platforms and devices",
    "💼 Suitable for both personal and commercial use without restrictions",
    "🔄 Regular updates with new tools and features based on user feedback",
    "💯 No watermarks, usage limits, or premium tiers hiding features",
    "🚀 Instant results with real-time processing feedback and progress tracking",
    "📊 Detailed processing statistics and before/after comparisons available",
    "💾 Multiple download options including individual files and ZIP archives",
    "🛡️ Enterprise-level security and privacy protection built into every tool",
    "🎯 Smart defaults and presets for quick results without manual configuration",
    "📈 Scalable processing that handles small files to large professional documents"
  ];

  const popularTools = [
    {
      name: "Image Compressor",
      description: "Compress images up to 80% with professional quality control",
      icon: "🗜️",
      slug: "image-compressor"
    },
    {
      name: "PDF Converter",
      description: "Convert PDFs to Word, Excel, and other formats instantly",
      icon: "📄",
      slug: "pdf-converter"
    },
    {
      name: "Base64 Encoder",
      description: "Secure encoding and decoding for developers and data processing",
      icon: "🔤",
      slug: "base64-encoder-decoder"
    },
    {
      name: "Age Calculator",
      description: "Calculate age, time differences, and date calculations",
      icon: "📅",
      slug: "age-calculator"
    }
  ];

  const useCases = [
    {
      category: "For Students",
      tools: ["PDF to Word converter", "Image compressor", "Percentage calculator", "Age calculator"],
      description: "Perfect for academic projects, research papers, and homework assignments"
    },
    {
      category: "For Professionals",
      tools: ["PDF merger", "Image converter", "Investment calculator", "Salary calculator"],
      description: "Essential tools for business documents, presentations, and financial planning"
    },
    {
      category: "For Developers",
      tools: ["Base64 encoder", "JSON formatter", "Hash generator", "Code beautifier"],
      description: "Professional coding utilities for data processing and development workflows"
    },
    {
      category: "For Content Creators",
      tools: ["Image optimizer", "QR code generator", "Meme generator", "Social media tools"],
      description: "Creative tools for social media, marketing, and digital content creation"
    }
  ];

  return (
    <div className="space-y-12 my-16 max-w-7xl mx-auto container px-4">
      {/* Hero Section with Enhanced Visual Appeal */}      

      {/* Enhanced Introduction Section - Two Column Layout */}
      <section className="space-y-8">
        <div className="text-center space-y-6">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Free Online Tools - Professional Quality, Zero Cost
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
                    Welcome to Toolspy, your go-to destination for <strong className="text-blue-600 dark:text-blue-400">professional online tools</strong> that actually work! Whether you need to <strong className="text-purple-600 dark:text-purple-400">compress images online</strong>, <strong className="text-pink-600 dark:text-pink-400">convert PDF to Word</strong>, use an <strong className="text-green-600 dark:text-green-400">online calculator</strong>, or access <strong className="text-orange-600 dark:text-orange-400">Base64 encoding tools</strong>, we've got you covered with over 50 powerful tools that work instantly in your browser.
                  </p>
          <div className="mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-left">
                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our <strong className="text-blue-600 dark:text-blue-400">free online converters</strong> support all major file formats and work entirely in your browser for maximum security. Need to <strong className="text-purple-600 dark:text-purple-400">resize images</strong>, <strong className="text-pink-600 dark:text-pink-400">merge PDF files</strong>, or use our <strong className="text-green-600 dark:text-green-400">percentage calculator</strong>? All tools feature <strong className="text-blue-600 dark:text-blue-400">batch processing</strong>, real-time previews, and professional-grade algorithms.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    From <strong className="text-purple-600 dark:text-purple-400">image optimization</strong> and <strong className="text-pink-600 dark:text-pink-400">document conversion</strong> to <strong className="text-green-600 dark:text-green-400">advanced calculators</strong> and <strong className="text-orange-600 dark:text-orange-400">encoding tools</strong>, Toolspy offers the complete digital toolkit for students, professionals, developers, and businesses. Experience the convenience of having enterprise-grade tools at your fingertips—completely free, secure, and optimized for every device.
                  </p>
                </div>

                {/* Enhanced Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600">70+</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Professional Tools</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600">100MB</div>
              <div className="text-sm text-green-700 dark:text-green-300">Max File Size</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600">∞</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Free Forever</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-800">
              <div className="text-2xl font-bold text-pink-600">100%</div>
              <div className="text-sm text-pink-700 dark:text-pink-300">Private & Secure</div>
            </div>
          </div>
              </div>

              <div className="relative">
                <Image
                  width={1200}
                  height={680}
                  src={"/images/main.webp"}
                  alt="Toolspy Professional Online Tools - Advanced compression, conversion, and calculation tools with batch processing and quality control"
                  className="w-full rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 hover:scale-105 transition-transform duration-300 h-full"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✨ Most Popular
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          How to Use Toolspy's Free Online Tools
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          It's incredibly simple! Here's how you can access professional tools in seconds:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">1. Choose Your Tool</h4>
            <p className="text-sm text-muted-foreground">
              Browse our collection of 50+ professional tools. From image compression to PDF conversion, we have everything you need for your digital tasks.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">2. Upload Your Files</h4>
            <p className="text-sm text-muted-foreground">
              Simply drag and drop your files or click to select them. Most tools support batch processing - perfect for handling multiple files at once.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">3. Customize Settings</h4>
            <p className="text-sm text-muted-foreground">
              Adjust quality settings, choose output formats, or use our smart presets. Every tool gives you professional-grade control options.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">4. Download Results</h4>
            <p className="text-sm text-muted-foreground">
              Get your processed files instantly with detailed statistics. Download individually or as a convenient ZIP archive for batch operations.
            </p>
          </Card>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Perfect for Every User Type
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Whether you're a student, professional, developer, or content creator, Toolspy has the tools you need to succeed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <h4 className="font-semibold mb-3 text-primary">{useCase.category}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {useCase.description}
                </p>
                <div className="space-y-2">
                  {useCase.tools.map((tool, toolIndex) => (
                    <Badge key={toolIndex} variant="secondary" className="text-xs mr-1 mb-1">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="space-y-6">
        <div className="">
          <h2 className="text-3xl font-bold text-center mb-6">
            Most Popular Free Online Tools
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover our most-used professional tools that millions trust for their daily digital tasks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTools.map((tool, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tool.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = `/${tool.slug}`}
                  >
                    Try Now →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Categories Overview */}
      <section className="space-y-6">
        <div className=" flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-center">
            Complete Tool Categories for Every Digital Need
          </h3>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive collection of <strong>professional online tools</strong>, organized by category for easy access and maximum productivity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {toolCategories.map((category, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
                    {category.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{category.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {category.tools.map((tool, toolIndex) => (
                        <Badge key={toolIndex} variant="secondary" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="space-y-6">
        <div className=" flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-center">
            Why Professionals Choose Toolspy for Online Tools
          </h3>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Experience the difference with professional-grade tools designed for privacy, speed, and reliability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Point-wise Benefits */}
      <section className="space-y-6">
        <div className=" flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-center">
            Everything You Get with Toolspy's Free Online Tools
          </h3>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Comprehensive features and capabilities that make Toolspy the preferred choice for <strong>online tools</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyBenefits.map((benefit, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                <p className="text-sm">{benefit}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <div className=" flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-center">
            How Toolspy Compares to Popular Online Tool Platforms
          </h3>
          <Card>
            <CardHeader>
              <CardTitle>Toolspy vs. iLovePDF, CloudConvert & ImageResizer</CardTitle>
              <CardDescription>
                See how we stack up against the most popular <strong>online tool platforms</strong> and why users are switching to Toolspy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Feature</th>
                      <th className="text-left p-3 font-medium">Toolspy</th>
                      <th className="text-left p-3 font-medium">iLovePDF</th>
                      <th className="text-left p-3 font-medium">CloudConvert</th>
                      <th className="text-left p-3 font-medium">ImageResizer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{row.feature}</td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <span>{row.toolspy}</span>
                            {row.toolspyStatus === "excellent" && (
                              <Star className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {row.ilovepdf}
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {row.cloudconvert}
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {row.imageresizer}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <div className=" flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-center">
            Frequently Asked Questions About Our Free Online Tools
          </h3>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about using Toolspy's <strong>online tools</strong> and services.
          </p>
          <div className="space-y-3">
            {faqData.map((faq: any, index: any) => (
              <Card key={index}>
                <CardHeader
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() =>
                    setSelectedFaq(selectedFaq === index ? null : index)
                  }
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base"><h4>{faq.question}</h4></CardTitle>
                    {selectedFaq === index ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </CardHeader>
                {selectedFaq === index && (
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced SEO Keyword Cluster Section */}
      <section className="space-y-6">
        <div className="">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-center mb-6">
              Professional Online Tools for Every Digital Need
            </h3>
            <div className="max-w-4xl mx-auto">
              <p className="text-muted-foreground leading-relaxed">
                Looking for reliable <strong>online tools</strong> that actually work? Toolspy is your one-stop destination for <strong>free online utilities</strong> that professionals trust. Whether you need to <strong>compress images online</strong>, <strong>convert PDF to Word</strong>, use an <strong>online calculator</strong>, or access <strong>Base64 encoding tools</strong>, we've designed every tool with privacy, speed, and professional results in mind.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Our <strong>free online converters</strong> support all major file formats and work entirely in your browser for maximum security. Need to <strong>resize images</strong>, <strong>merge PDF files</strong>, or use our <strong>percentage calculator</strong>? All tools feature <strong>batch processing</strong>, real-time previews, and professional-grade algorithms. From <strong>image optimization</strong> to <strong>document conversion</strong>, every tool is optimized for both personal and commercial use.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Experience the difference with <strong>browser-based tools</strong> that require no downloads, registration, or payment. Our <strong>web-based utilities</strong> include advanced features like precision quality control, multiple format support, and secure client-side processing. Whether you're a student, developer, designer, or business professional, Toolspy provides the <strong>digital tools</strong> you need to work efficiently and securely.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Join thousands who use Toolspy daily for <strong>file processing</strong>, <strong>image compression</strong>, <strong>PDF manipulation</strong>, and <strong>data conversion</strong>. All tools are mobile-optimized, regularly updated, and built with enterprise-level security. Try our <strong>online tool collection</strong> today and discover why professionals choose Toolspy for their digital workflow needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="space-y-6">
        <div className="">
          <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Streamline Your Digital Workflow?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Join millions of users who trust Toolspy for their daily digital tasks. All <strong>online tools</strong> are free, secure, and designed for professional results.
            </p>
            <Button
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Explore All Free Online Tools →
            </Button>
          </div>
        </div>
      </section>
      
    </div>
  );
} 