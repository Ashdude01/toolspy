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
  Clock
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { RelatedTools } from '@/components/tools/related-tools';
import Image from 'next/image';

export function HomeSeoContent() {
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
      tools: ["Image Compressor", "Image Converter", "Image Resizer", "Image Optimizer"]
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "PDF Processing Tools",
      description: "Complete PDF manipulation suite for merging, splitting, converting, and protecting documents",
      tools: ["PDF Converter", "Merge PDF", "Split PDF", "PDF to Word", "PDF to Excel"]
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
      tools: ["Age Calculator", "BMI Calculator", "Percentage Calculator", "Investment Calculator"]
    }
  ];

  const faqData = [
    {
      question: "Are all Toolspy tools really free to use?",
      answer: "Absolutely! Every single tool on Toolspy is completely free with no hidden costs, registration requirements, or usage limitations. You can compress images, convert PDFs, use calculators, and access encoding tools as many times as you want. Unlike many competitors who require paid subscriptions for advanced features, we believe professional-grade tools should be accessible to everyone."
    },
    {
      question: "How do you keep my files secure when using Toolspy tools?",
      answer: "Your privacy is incredibly important to us. Most of our tools, including image processors and calculators, work entirely in your browser using client-side processing. This means your files never leave your device - they're processed right on your computer. For tools that do require server processing, files are automatically deleted immediately after processing. We never store, access, or share your data with anyone."
    },
    {
      question: "What file formats and sizes can I work with on Toolspy?",
      answer: "Toolspy supports virtually all major file formats you'll encounter. For images, we handle JPEG, PNG, WebP, AVIF, BMP, and TIFF. For documents, we work with PDF, Word, Excel, PowerPoint, and more. Most tools support files up to 100MB, which is much larger than many competitors. Our tools are built to handle both small personal files and large professional documents efficiently."
    },
    {
      question: "Do I need to download or install anything to use Toolspy?",
      answer: "Not at all! All Toolspy tools are browser-based and work instantly on any device with an internet connection. Just visit our website, select your tool, upload your files, and get results immediately. Our tools work perfectly on Windows, Mac, Linux, iOS, and Android devices using any modern browser. No downloads, no installations, no hassle."
    },
    {
      question: "Can I use Toolspy tools on my phone or tablet?",
      answer: "Yes, definitely! All our tools are designed to work flawlessly on mobile devices, tablets, and desktop computers. The interface automatically adapts to your screen size with touch-optimized controls. Whether you're compressing images on your phone, converting PDFs on your tablet, or using calculators anywhere, you'll get the same professional results."
    },
    {
      question: "How does batch processing work, and how many files can I process?",
      answer: "Many of our tools support batch processing, which is super handy when you have multiple files to work with. For example, you can compress up to 100 images at once, merge several PDFs, or convert multiple documents in one go. Progress is shown in real-time with detailed status updates, and you can download all processed files individually or as a convenient ZIP archive."
    },
    {
      question: "What makes Toolspy better than other free online tool websites?",
      answer: "Several things set us apart: we use client-side processing for better privacy, we support higher file size limits (up to 100MB vs 25MB on competitors like iLovePDF), we don't require registration, our interface is clean without annoying ads, and we offer professional-grade features that are usually behind paywalls. Plus, our tools are faster because many work directly in your browser."
    },
    {
      question: "Are these tools good enough for business and professional use?",
      answer: "Absolutely! Our tools are designed with professional standards in mind. We offer advanced features like precise quality control, multiple format support, batch processing, and high file size limits. Many businesses, freelancers, developers, and content creators rely on Toolspy for their daily workflows including image optimization, document conversion, and data processing tasks."
    },
    {
      question: "How often do you add new tools or update existing ones?",
      answer: "We're constantly working to improve and expand Toolspy based on user feedback and emerging digital needs. We regularly add new tools for image processing, PDF manipulation, calculators, and developer utilities. We also update existing tools with new features and improved algorithms to make sure you always have access to the latest technology."
    },
    {
      question: "Can I use Toolspy tools for my business or client work?",
      answer: "Yes, you can! All Toolspy tools are free for both personal and commercial use without any restrictions. You can use them for client work, business projects, marketing campaigns, content creation, and any commercial application. There are no attribution requirements, licensing fees, or usage limits for commercial purposes."
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

  return (
    <div className="space-y-12 my-16">
      {/* Poster Image Section */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="relative mx-auto max-w-6xl">
            <Image
              width={1200}
              height={680}
              src={"/images/main.webp"}
              alt="Toolspy Professional Image Compressor - Advanced compression technology with batch processing and quality control"
              className="w-full rounded-xl shadow-lg border"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="space-y-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Your Complete Digital Toolkit - All Free, All Online
            </h2>
            <p className="text-lg text-muted-foreground max-w-6xl mx-auto">
              Welcome to Toolspy, your go-to destination for professional online tools that actually work! Whether you need to compress images, convert PDFs, calculate finances, or process data, we've got you covered with over 50 powerful tools that work instantly in your browser. No downloads, no registration, no limits—just professional results when you need them.
            </p>
            <p className="text-base text-muted-foreground max-w-6xl mx-auto mt-4">
              From image optimization and document conversion to advanced calculators and encoding tools, Toolspy offers the complete digital toolkit for students, professionals, developers, and businesses. Experience the convenience of having enterprise-grade tools at your fingertips—completely free, secure, and optimized for every device.
            </p>
          </div>
        </div>
      </section>

      {/* Tool Categories Overview */}
      <section className="space-y-6">
        <div className="container mx-auto px-4 flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-center">
            Complete Tool Categories for Every Need
          </h3>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive collection of professional online tools, organized by category for easy access and maximum productivity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {toolCategories.map((category, index) => (
              <Card key={index} className="p-6">
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
        <div className="container mx-auto px-4 flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-center">
            Why Professionals Choose Toolspy
          </h3>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Experience the difference with professional-grade tools designed for privacy, speed, and reliability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6">
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
        <div className="container mx-auto px-4 flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-center">
            Everything You Get with Toolspy
          </h3>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Comprehensive features and capabilities that make Toolspy the preferred choice for online tools.
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
        <div className="container mx-auto px-4 flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-center">
            How Toolspy Compares to Popular Competitors
          </h3>
          <Card>
            <CardHeader>
              <CardTitle>Toolspy vs. iLovePDF, CloudConvert & ImageResizer</CardTitle>
              <CardDescription>
                See how we stack up against the most popular online tool platforms and why users are switching to Toolspy.
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
        <div className="container mx-auto px-4 flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-center">
            Frequently Asked Questions
          </h3>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about using Toolspy's online tools and services.
          </p>
          <div className="space-y-3">
            {faqData.map((faq, index) => (
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

      {/* SEO Keyword Cluster Section */}
      <section className="space-y-6">
        <div className="container mx-auto px-4">
          {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-8 rounded-xl"> */}
            <h3 className="text-2xl font-bold text-center mb-6">
              Professional Online Tools for Every Digital Need
            </h3>
            <div className="mx-auto">
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
          {/* </div> */}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="space-y-6">
        <div className="container mx-auto px-4">
          <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Streamline Your Digital Workflow?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Join millions of users who trust Toolspy for their daily digital tasks. All tools are free, secure, and designed for professional results.
            </p>
            <Button
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Explore All Tools →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 