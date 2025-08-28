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
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import Image from "next/image";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import NextImage from "next/image";

export function ImageCompressorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("image-compressor");

  const comparisonData = [
    {
      feature: "Max File Size",
      toolspy: "50MB",
      iloveimg: "25MB",
      cloudconvert: "100MB",
      imageresizer: "10MB",
      toolspyStatus: "good",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Up to 100 files",
      iloveimg: "✅ Up to 15 files",
      cloudconvert: "✅ Up to 5 files",
      imageresizer: "❌ Single file",
      toolspyStatus: "excellent",
    },
    {
      feature: "Quality Control",
      toolspy: "✅ 1-100% precision",
      iloveimg: "✅ Basic presets",
      cloudconvert: "✅ Limited options",
      imageresizer: "✅ Basic slider",
      toolspyStatus: "excellent",
    },
    {
      feature: "Format Conversion",
      toolspy: "✅ All formats",
      iloveimg: "✅ Limited",
      cloudconvert: "✅ Extensive",
      imageresizer: "❌ JPEG/PNG only",
      toolspyStatus: "excellent",
    },
    {
      feature: "EXIF Data Control",
      toolspy: "✅ Selective/Remove/Keep",
      iloveimg: "❌ Auto-remove",
      cloudconvert: "✅ Remove only",
      imageresizer: "❌ No control",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy",
      toolspy: "✅ Client-side processing",
      iloveimg: "⚠️ Server-based",
      cloudconvert: "⚠️ Server-based",
      imageresizer: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      iloveimg: "✅ Limited usage",
      cloudconvert: "❌ Account required",
      imageresizer: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Progressive Encoding",
      toolspy: "✅ Available",
      iloveimg: "❌ Not available",
      cloudconvert: "✅ Available",
      imageresizer: "❌ Not available",
      toolspyStatus: "excellent",
    },
  ];

  const formatData = [
    {
      format: "JPEG",
      extension: ".jpg, .jpeg",
      type: "Lossy compression",
      useCase: "Photos, web images",
      compression: "Up to 95%",
    },
    {
      format: "PNG",
      extension: ".png",
      type: "Lossless compression",
      useCase: "Graphics, transparency",
      compression: "Up to 70%",
    },
    {
      format: "WebP",
      extension: ".webp",
      type: "Lossy/Lossless",
      useCase: "Modern web images",
      compression: "Up to 90%",
    },
    {
      format: "AVIF",
      extension: ".avif",
      type: "Next-gen compression",
      useCase: "Ultra-efficient web images",
      compression: "Up to 95%",
    },
    {
      format: "BMP",
      extension: ".bmp",
      type: "Uncompressed",
      useCase: "Windows bitmaps",
      compression: "Up to 98%",
    },
    {
      format: "TIFF",
      extension: ".tiff, .tif",
      type: "Lossless",
      useCase: "Professional photography",
      compression: "Up to 60%",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's image compressor completely free to use?",
      answer:
        "Yes, our professional image compressor is completely free with no hidden costs, registration requirements, or usage limitations. You can compress unlimited images without any restrictions. Unlike many competitors who require paid subscriptions for advanced features, Toolspy provides all compression capabilities free of charge.",
    },
    {
      question:
        "How much can I reduce my image file size with this compressor?",
      answer:
        "Typically, you can achieve 50-80% file size reduction while maintaining excellent visual quality. JPEG images can be compressed up to 95%, PNG images up to 70%, and WebP images up to 90%. The actual compression ratio depends on your image type, content complexity, and quality settings. Our advanced algorithms ensure optimal compression for each image format.",
    },
    {
      question: "Is it safe to upload my images to Toolspy's compressor?",
      answer:
        "Absolutely! Our image compressor uses client-side processing, meaning your images are compressed directly in your browser and never uploaded to our servers. This ensures complete privacy and security for your sensitive images. Your data never leaves your device, making it safer than server-based compression tools.",
    },
    {
      question: "What image formats does the compressor support?",
      answer:
        "We support all major image formats including JPEG, PNG, WebP, AVIF, BMP, and TIFF. You can also convert between formats during compression for maximum flexibility. Our tool handles both modern formats like AVIF and WebP, as well as traditional formats like JPEG and PNG with equal efficiency.",
    },
    {
      question: "How does batch compression work in Toolspy?",
      answer:
        "You can select up to 100 images simultaneously for batch processing. Our tool processes each image individually using the same settings, providing consistent results across your entire batch. Progress is tracked in real-time with detailed status updates. You can download all compressed images individually or as a convenient ZIP file.",
    },
    {
      question:
        "Why choose Toolspy over other free image compressors like ILoveImg or CloudConvert?",
      answer:
        "Toolspy offers professional-grade features like target file size control, selective EXIF removal, progressive encoding, and client-side processing. Many competitors like ILoveImg and CloudConvert lack these advanced features or require paid upgrades. Our tool provides better privacy protection, more precise quality control, and superior compression algorithms completely free.",
    },
    {
      question:
        "Can I compress images for specific platforms like Instagram, Facebook, or websites?",
      answer:
        "Yes! Use our 'Web Optimized' preset or customize settings for social media requirements. For Instagram posts, we recommend 1080x1080px and under 100KB. For Facebook, use 1200x630px for optimal display. For websites, aim for 75-85% quality for the best balance of file size and visual quality.",
    },
    {
      question: "What is the maximum file size I can compress?",
      answer:
        "Our image compressor supports files up to 50MB per image, which is larger than many competitors. ILoveImg supports up to 25MB, while ImageResizer only handles 10MB files. This makes Toolspy ideal for high-resolution photography and professional image processing needs.",
    },
    {
      question: "Does image compression affect image metadata and EXIF data?",
      answer:
        "You have complete control over metadata handling with our advanced EXIF management system. Choose to remove all EXIF data for smaller files and privacy, preserve everything for professional workflows, or use selective removal to keep important data while removing sensitive location and camera information.",
    },
    {
      question: "How does progressive JPEG encoding improve web performance?",
      answer:
        "Progressive JPEG encoding allows images to load in multiple passes, showing a low-quality version first that gradually improves. This enhances user experience on websites by providing immediate visual feedback, making pages feel faster even with larger images. This feature is unique to Toolspy among free compressors.",
    },
  ];

  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Superior Compression Ratios",
      description:
        "Achieve up to 80% file size reduction without visible quality loss using intelligent algorithms optimized for each image format.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning-Fast Processing",
      description:
        "Client-side compression for maximum privacy and speed with no file upload delays or server processing time.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Your images never leave your device, ensuring complete privacy and security. No server uploads, no data collection.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Professional Quality Control",
      description:
        "Precision quality slider (1-100%) for exact compression control with real-time preview and compression ratio display.",
    },
  ];

  const keyBenefits = [
    "🎯 Up to 80% file size reduction without visible quality loss",
    "⚡ Lightning-fast client-side processing for maximum privacy and security",
    "🔒 Complete privacy protection - images never leave your device",
    "🎛️ Professional quality control with 1-100% precision slider",
    "📦 Batch processing support for up to 100 images simultaneously",
    "🎨 Multiple format support: JPEG, PNG, WebP, AVIF, BMP, TIFF with conversion",
    "⚙️ Advanced EXIF data management with selective removal options",
    "📱 Progressive JPEG encoding for better web loading experience",
    "🎯 Target file size control for precise output requirements",
    "🔄 Real-time format conversion capabilities during compression",
    "🖥️ Browser-based tool requiring no software installation or registration",
    "💯 Completely free with no watermarks, limits, or premium features",
    "🚀 Advanced compression algorithms optimized for each format",
    "📊 Detailed compression statistics and before/after comparisons",
    "💼 Professional features typically found in paid desktop software",
    "🌐 Works offline after initial page load - no internet required for compression",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. ILoveImg",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "Higher Quality: Advanced algorithms preserve more image detail",
        "More Control: Precise quality settings vs. basic presets only",
        "Target File Size: Specify exact output size requirements",
        "No Ads: Clean, professional interface without distractions",
        "EXIF Control: Selective metadata removal vs. automatic removal",
      ],
    },
    {
      title: "Toolspy vs. CloudConvert",
      advantages: [
        "No Registration: Instant access without account creation",
        "Faster Processing: No upload time, immediate compression",
        "Better Quality Control: More granular compression settings",
        "Cost-Effective: Completely free vs. paid tiers for full features",
        "Privacy First: No server processing vs. cloud-based compression",
        "Progressive Encoding: Advanced web compression features",
      ],
    },
    {
      title: "Toolspy vs. ImageResizer.com",
      advantages: [
        "Multi-Format Support: Comprehensive format compatibility vs. JPEG/PNG only",
        "Advanced Features: EXIF control, progressive encoding vs. basic compression",
        "Batch Processing: Handle multiple images efficiently vs. single file only",
        "Professional Tools: Target file size, format conversion capabilities",
        "Larger File Support: 50MB vs. 10MB maximum file size",
        "Modern Formats: WebP and AVIF support for next-gen compression",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="image-compressor"
        title="Similar Tools You Might Like"
        description="Check out our other image tools that work great with the compressor."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Compress Images Easily – Keep Quality
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Tired of slow-loading websites or running out of storage because of
            large image files? Toolspy's Image Compressor is here to help. Our
            tool shrinks your images without sacrificing the crisp details you
            love. Whether you're a web designer, photographer, or just want to
            share photos faster, you'll get smaller files and the same great
            look.{" "}
          </p>
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-left">
                <div className="space-y-4">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Transform your images with our{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      free online image compressor
                    </strong>{" "}
                    - the ultimate{" "}
                    <strong className="text-purple-600 dark:text-purple-400">
                      image compression tool
                    </strong>{" "}
                    for{" "}
                    <strong className="text-pink-600 dark:text-pink-400">
                      compress images for web
                    </strong>
                    ,{" "}
                    <strong className="text-green-600 dark:text-green-400">
                      compress images online
                    </strong>
                    , and{" "}
                    <strong className="text-orange-600 dark:text-orange-400">
                      reduce image file size
                    </strong>{" "}
                    with professional quality.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      online image compressor
                    </strong>{" "}
                    is designed for both beginners and professionals. With{" "}
                    <strong className="text-purple-600 dark:text-purple-400">
                      drag and drop functionality
                    </strong>
                    ,{" "}
                    <strong className="text-pink-600 dark:text-pink-400">
                      batch processing
                    </strong>
                    , and{" "}
                    <strong className="text-green-600 dark:text-green-400">
                      multiple format support
                    </strong>
                    , you can{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      compress images free
                    </strong>{" "}
                    without any software installation or registration required.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-600">15+</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      Formats
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600">
                      100MB
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      Max Size
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="text-2xl font-bold text-purple-600">
                      80%
                    </div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">
                      Compression
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-800">
                    <div className="text-2xl font-bold text-pink-600">∞</div>
                    <div className="text-sm text-pink-700 dark:text-pink-300">
                      Privacy
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <NextImage
                  width={1200}
                  height={680}
                  src={tool?.posterImage || ""}
                  alt="Toolspy Professional Image Compressor - Advanced compression technology with batch processing and quality control"
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

      {/* - How to Use */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          How to Compress Your Images with Toolspy
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          It's simple! Here's how you can make your images lighter in seconds:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">1. Upload Your Images</h4>
            <p className="text-sm text-muted-foreground">
              Drag and drop your pictures or click to select them. You can add
              up to 100 images at once—perfect for big projects or quick
              batches.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">2. Pick a Compression Style</h4>
            <p className="text-sm text-muted-foreground">
              Choose from our handy presets: Balanced, High Quality, Max
              Compression, or Web Optimized. Not sure? Start with Balanced for
              great results.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">3. Fine-Tune If You Want</h4>
            <p className="text-sm text-muted-foreground">
              Want more control? Adjust the quality slider, change the format,
              or manage EXIF data. You're in charge of every detail.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">4. Download and Go</h4>
            <p className="text-sm text-muted-foreground">
              See how much space you saved, then download your compressed
              images—one by one or all together in a ZIP file.
            </p>
          </Card>
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Toolspy's Image Compressor Rocks
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's what makes our tool special and why people love using it for
          their image compression needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </section>

      {/* Point-wise Benefits */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Everything You Get with Our Image Compressor
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          All the features you need for professional image compression,
          completely free and easy to use.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyBenefits.map((benefit, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <p className="text-sm">{benefit}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Competitor Advantages */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Toolspy Over Other Compressors
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's how we stack up against other popular image compression tools
          you might have tried.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {competitorAdvantages.map((competitor, index) => (
            <Card key={index} className="p-6">
              <h4 className="font-semibold mb-4 text-primary">
                {competitor.title}
              </h4>
              <ul className="space-y-2">
                {competitor.advantages.map((advantage, advIndex) => (
                  <li
                    key={advIndex}
                    className="text-sm flex items-start space-x-2"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Detailed Feature Comparison
        </h3>
        <Card>
          <CardHeader>
            <CardTitle>Toolspy vs. Leading Competitors</CardTitle>
            <CardDescription>
              Comprehensive comparison of features, limitations, and
              capabilities across popular image compression tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Feature</th>
                    <th className="text-left p-3 font-medium">Toolspy</th>
                    <th className="text-left p-3 font-medium">ILoveImg</th>
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
                          {row.toolspyStatus === "good" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.iloveimg}
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
      </section>

      {/* Step-by-Step Guide */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Complete Step-by-Step Guide
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Detailed instructions for getting the best results from our
          professional image compression tool.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Upload Your Images",
              description:
                "Click the upload area or drag and drop your images. Supports JPEG, PNG, WebP, AVIF, BMP, TIFF formats up to 50MB each.",
            },
            {
              step: "2",
              title: "Choose Compression Settings",
              description:
                "Select from our compression presets (Balanced, High Quality, Max Compression, Web Optimized) or customize quality, format, and compression parameters.",
            },
            {
              step: "3",
              title: "Configure Advanced Options",
              description:
                "Set advanced options like EXIF data handling (remove/keep/selective), progressive encoding, image resizing, and target file size.",
            },
            {
              step: "4",
              title: "Download Compressed Results",
              description:
                "Get your compressed images with detailed compression statistics. Download individually, all at once, or as a convenient ZIP archive.",
            },
          ].map((item, index) => (
            <Card key={index} className="text-center p-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="space-y-6" id="specifications">
        <h3 className="text-2xl font-bold text-center">
          Technical Specifications & Supported Formats
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Comprehensive technical details about supported formats, compression
          capabilities, and system requirements.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Supported Input Formats & Compression Ratios</CardTitle>
            <CardDescription>
              Complete format support with expected compression performance for
              different image types.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Format</th>
                    <th className="text-left p-3 font-medium">Extension</th>
                    <th className="text-left p-3 font-medium">
                      Compression Type
                    </th>
                    <th className="text-left p-3 font-medium">
                      Max Compression
                    </th>
                    <th className="text-left p-3 font-medium">Best Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  {formatData.map((format, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{format.format}</td>
                      <td className="p-3 text-muted-foreground">
                        {format.extension}
                      </td>
                      <td className="p-3">{format.type}</td>
                      <td className="p-3 font-medium text-green-600">
                        {format.compression}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {format.useCase}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Output Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <table className="w-full">
                <tbody className="divide-y">
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">
                      Quality Range:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">
                      1% to 100% precision
                    </td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5">
                      File Size Limits:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">
                      Up to 50MB per image
                    </td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5">
                      Batch Processing:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">
                      Up to 100 images
                    </td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5">
                      Dimension Limits:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">
                      Up to 8000x8000 pixels
                    </td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5">
                      Color Depth:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">
                      8-bit and 16-bit support
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Browser Compatibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <table className="w-full">
                <tbody className="divide-y">
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">
                      Chrome:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">Version 80+</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">
                      Firefox:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">Version 75+</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">
                      Safari:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">Version 13+</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">Edge:</td>
                    <td className="font-medium p-1.5 w-1/2">Version 80+</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">
                      Mobile Browsers:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">
                      iOS 13+, Android 8+
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <table className="w-full">
                <tbody className="divide-y">
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">
                      Processing Speed:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">
                      Instant (client-side)
                    </td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">
                      Memory Usage:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">
                      Low (&lt; 200MB)
                    </td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">
                      Network Required:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">
                      No (offline capable)
                    </td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">
                      Data Privacy:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">100% private</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">
                      Compression Quality:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">
                      Industry-leading
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={faqData} />

      {/* SEO Keyword Cluster Section */}
      <section className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-center mb-6">
            Compress Images to Any Size You Need
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground leading-relaxed">
              If you're looking for a simple way to{" "}
              <strong>compress image size in KB</strong>, you're in the right
              place. With Toolspy's image compressor, you can easily{" "}
              <strong>compress images to 500KB</strong>, <strong>200KB</strong>,{" "}
              <strong>100KB</strong>, or even as small as <strong>50KB</strong>{" "}
              or <strong>20KB</strong>—perfect for web uploads, emails, or
              social media. Whether you need to{" "}
              <strong>compress image to 1MB</strong> for high-quality sharing or{" "}
              <strong>compress image to 15KB</strong> for ultra-lightweight
              needs, our tool gives you full control over your image file size.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              No more guessing or trial and error! Just upload your photo, set
              your target size (like <strong>compress image to 30KB</strong> or{" "}
              <strong>compress image to 100KB</strong>), and let our smart
              compressor do the rest. You'll see a real-time preview, so you can
              balance quality and file size before downloading. This is
              especially useful for students, professionals, and anyone who
              needs to meet strict upload limits on government forms, job
              portals, or online applications.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Our online image compressor works with all major formats—JPEG,
              PNG, WebP, and more. You don't need to install any software or
              sign up. Everything happens right in your browser, keeping your
              images private and secure. Whether you want to{" "}
              <strong>compress image to 500KB</strong> for a website,{" "}
              <strong>compress image to 200KB</strong> for a form, or{" "}
              <strong>compress image to 50KB</strong> for a fast upload, Toolspy
              makes it quick and easy.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Try compressing your image size in KB today and see how much space
              you can save—without losing the quality you care about. Toolspy is
              your go-to solution for compressing images to any size, from{" "}
              <strong>1MB</strong> down to <strong>15KB</strong>, in just a few
              clicks.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="space-y-6">
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Compress Your Images?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Join thousands of people who use Toolspy every day to make their
            images smaller and faster. It's free, fast, and your photos stay
            private on your device.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Compressing Now →
          </Button>
        </div>
      </section>
    </div>
  );
}

// Export FAQ data for schema generation
export function getImageCompressorFAQs() {
  return [
    {
      question:
        "How much can I reduce my image file size with this compressor?",
      answer:
        "Typically, you can achieve 50-80% file size reduction while maintaining excellent visual quality. JPEG images can be compressed up to 95%, PNG images up to 70%, and WebP images up to 90%. The actual compression ratio depends on your image type, content complexity, and quality settings. Our advanced algorithms ensure optimal compression for each image format.",
    },
    {
      question: "Is it safe to upload my images to Toolspy's compressor?",
      answer:
        "Absolutely! Our image compressor uses client-side processing, meaning your images are compressed directly in your browser and never uploaded to our servers. This ensures complete privacy and security for your sensitive images. Your data never leaves your device, making it safer than server-based compression tools.",
    },
    {
      question: "What image formats does the compressor support?",
      answer:
        "We support all major image formats including JPEG, PNG, WebP, AVIF, BMP, and TIFF. You can also convert between formats during compression for maximum flexibility. Our tool handles both modern formats like AVIF and WebP, as well as traditional formats like JPEG and PNG with equal efficiency.",
    },
    {
      question: "How does batch compression work in Toolspy?",
      answer:
        "You can select up to 100 images simultaneously for batch processing. Our tool processes each image individually using the same settings, providing consistent results across your entire batch. Progress is tracked in real-time with detailed status updates. You can download all compressed images individually or as a convenient ZIP file.",
    },
    {
      question:
        "Why choose Toolspy over other free image compressors like ILoveImg or CloudConvert?",
      answer:
        "Toolspy offers professional-grade features like target file size control, selective EXIF removal, progressive encoding, and client-side processing. Many competitors like ILoveImg and CloudConvert lack these advanced features or require paid upgrades. Our tool provides better privacy protection, more precise quality control, and superior compression algorithms completely free.",
    },
    {
      question:
        "Can I compress images for specific platforms like Instagram, Facebook, or websites?",
      answer:
        "Yes! Use our 'Web Optimized' preset or customize settings for social media requirements. For Instagram posts, we recommend 1080x1080px and under 100KB. For Facebook, use 1200x630px for optimal display. For websites, aim for 75-85% quality for the best balance of file size and visual quality.",
    },
    {
      question: "What is the maximum file size I can compress?",
      answer:
        "Our image compressor supports files up to 50MB per image, which is larger than many competitors. ILoveImg supports up to 25MB, while ImageResizer only handles 10MB files. This makes Toolspy ideal for high-resolution photography and professional image processing needs.",
    },
    {
      question: "Does image compression affect image metadata and EXIF data?",
      answer:
        "You have complete control over metadata handling with our advanced EXIF management system. Choose to remove all EXIF data for smaller files and privacy, preserve everything for professional workflows, or use selective removal to keep important data while removing sensitive location and camera information.",
    },
    {
      question: "How does progressive JPEG encoding improve web performance?",
      answer:
        "Progressive JPEG encoding allows images to load in multiple passes, showing a low-quality version first that gradually improves. This enhances user experience on websites by providing immediate visual feedback, making pages feel faster even with larger images. This feature is unique to Toolspy among free compressors.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("image-compressor", getImageCompressorFAQs);
