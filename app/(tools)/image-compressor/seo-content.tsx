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

export function ImageCompressorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

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

  const relatedTools = [
    {
      name: "Image to Base64 Converter",
      description:
        "Convert images to Base64 encoding for web embedding and data URIs",
      href: "/image-to-base64",
      keywords: "base64 converter, image encoding, data uri",
    },
    {
      name: "Base64 to Image Decoder",
      description:
        "Decode Base64 strings back to image files with format detection",
      href: "/base64-to-image",
      keywords: "base64 decoder, image decoding",
    },
    {
      name: "Image Resizer",
      description:
        "Resize images to specific dimensions while maintaining aspect ratio",
      href: "/image-resizer",
      comingSoon: true,
      keywords: "image resize, dimension change",
    },
    {
      name: "Image Format Converter",
      description:
        "Convert between different image formats (PNG to JPG, WebP, etc.)",
      href: "/image-converter",
      comingSoon: true,
      keywords: "format converter, image conversion",
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
        "Progressive Encoding: Advanced web optimization features",
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
      {/* Tool Poster Image */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="relative mx-auto max-w-4xl">
            <img
              src="https://via.placeholder.com/1200x600/0ea5e9/ffffff?text=Professional+Image+Compressor+%7C+Toolspy+-+Reduce+File+Sizes+by+80%25+%7C+Advanced+Compression+Engine"
              alt="Toolspy Professional Image Compressor - Advanced compression technology with batch processing and quality control"
              className="w-full rounded-xl shadow-lg border"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Professional Image Compression Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Toolspy's Professional Image Compressor is the ultimate online image
            compression tool designed to reduce file sizes while maintaining
            exceptional image quality. Our advanced compression engine supports
            multiple formats including JPEG, PNG, WebP, and AVIF, making it the
            perfect solution for web developers, photographers, and content
            creators who need optimized images without compromising visual
            fidelity.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-4">
            Whether you're optimizing images for your website, social media
            campaigns, email newsletters, or storage management, our image
            compressor delivers superior results compared to other online
            compression tools. With intelligent algorithms and customizable
            settings, you can achieve up to 80% file size reduction while
            preserving the visual integrity of your images.
          </p>
        </div>
      </section>

      {/* Image Gallery - How to Use */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          How to Use This Tool - Visual Guide
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Follow these simple steps to compress your images professionally with
          Toolspy's advanced compression engine.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x400/f3f4f6/6b7280?text=Upload+Interface+-+Drag+and+Drop+Images"
              alt="Image Upload Interface - Drag and drop interface for easy file selection and batch processing"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">1. Upload Interface</h4>
            <p className="text-sm text-muted-foreground">
              Intuitive drag-and-drop interface for easy file selection. Support
              for batch uploading up to 100 images simultaneously.
            </p>
          </Card>

          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x300/ddd6fe/7c3aed?text=Compression+Presets+-+Balanced+High+Quality+Max+Web"
              alt="Compression Presets - Balanced, High Quality, Max Compression, Web Optimized settings"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">2. Compression Presets</h4>
            <p className="text-sm text-muted-foreground">
              Four optimized presets for different compression needs: Balanced,
              High Quality, Max Compression, and Web Optimized.
            </p>
          </Card>

          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x500/dcfce7/16a34a?text=Advanced+Settings+-+Quality+Format+Resize+EXIF"
              alt="Advanced Settings Panel - Quality control, format conversion, resize options, EXIF management"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">3. Advanced Settings Panel</h4>
            <p className="text-sm text-muted-foreground">
              Professional controls for precise compression customization
              including quality slider, format conversion, and EXIF management.
            </p>
          </Card>

          <Card className="p-4">
            <img
              src="https://via.placeholder.com/800x400/fef3c7/d97706?text=Results+-+Before+After+Compression+Ratio+Download"
              alt="Compression Results - Before and after comparison with compression ratio and download options"
              className="w-full rounded-lg mb-4"
              loading="lazy"
            />
            <h4 className="font-semibold mb-2">4. Compression Results</h4>
            <p className="text-sm text-muted-foreground">
              Detailed results showing file size reduction, compression ratio,
              and quality preservation with download options.
            </p>
          </Card>
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Toolspy's Image Compressor?
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Our professional image compression tool offers advanced features that
          set it apart from basic online compressors.
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
          Complete Benefits of Our Image Compressor
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Comprehensive features that make Toolspy the best choice for
          professional image compression needs.
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
          How Toolspy Outperforms Competitors
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Detailed comparison showing why Toolspy is superior to other popular
          image compression tools.
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
                "Select from our optimized presets (Balanced, High Quality, Max Compression, Web Optimized) or customize quality, format, and compression parameters.",
            },
            {
              step: "3",
              title: "Configure Advanced Options",
              description:
                "Set advanced options like EXIF data handling (remove/keep/selective), progressive encoding, image resizing, and target file size.",
            },
            {
              step: "4",
              title: "Download Optimized Results",
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
                    <td className="font-medium p-1.5 w-1/2">1% to 100% precision</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5">
                      File Size Limits:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">Up to 50MB per image</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5">
                      Batch Processing:
                    </td>
                    <td className="font-medium p-1.5 w-1/2">Up to 100 images</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5">
                      Dimension Limits:
                    </td>
                      <td className="font-medium p-1.5 w-1/2">Up to 8000x8000 pixels</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                      <td className="text-muted-foreground p-1.5">Color Depth:</td>
                    <td className="font-medium p-1.5 w-1/2">8-bit and 16-bit support</td>
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
                    <td className="text-muted-foreground p-1.5 w-1/2">Chrome:</td>
                    <td className="font-medium p-1.5 w-1/2">Version 80+</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">Firefox:</td>
                    <td className="font-medium p-1.5 w-1/2">Version 75+</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">Safari:</td>
                    <td className="font-medium p-1.5 w-1/2">Version 13+</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">Edge:</td>
                    <td className="font-medium p-1.5 w-1/2">Version 80+</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">Mobile Browsers:</td>
                    <td className="font-medium p-1.5 w-1/2">iOS 13+, Android 8+</td>
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
                    <td className="text-muted-foreground p-1.5 w-1/2">Processing Speed:</td>
                    <td className="font-medium p-1.5 w-1/2">Instant (client-side)</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">Memory Usage:</td>
                    <td className="font-medium p-1.5 w-1/2">Low (&lt; 200MB)</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">Network Required:</td>
                    <td className="font-medium p-1.5 w-1/2">No (offline capable)</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">Data Privacy:</td>
                    <td className="font-medium p-1.5 w-1/2">100% private</td>
                  </tr>
                  <tr className="flex justify-between divide-x">
                    <td className="text-muted-foreground p-1.5 w-1/2">Compression Quality:</td>
                    <td className="font-medium p-1.5 w-1/2">Industry-leading</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h3 className="text-2xl font-bold text-center">
          Frequently Asked Questions
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Comprehensive answers to common questions about image compression,
          features, and usage.
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
      </section>

      {/* Related Tools */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Related Tools & Internal Linking
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Explore our complete suite of professional image processing and
          conversion tools for all your needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedTools.map((tool, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">{tool.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tool.description}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Keywords: {tool.keywords}
                  </p>
                  {tool.comingSoon ? (
                    <Badge variant="secondary">Coming Soon</Badge>
                  ) : (
                    <Button variant="outline" size="sm" asChild>
                      <a href={tool.href}>Try Tool →</a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2">
            Why Use Multiple Toolspy Tools?
          </h4>
          <p className="text-sm text-muted-foreground">
            Our integrated suite of professional tools ensures consistent
            quality and user experience across all your digital tasks. All tools
            feature the same privacy-focused, client-side processing for maximum
            security and performance. Whether you're compressing images,
            converting formats, or encoding data, Toolspy provides
            professional-grade solutions completely free.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="space-y-6">
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Start Compressing Your Images Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Join thousands of professionals who trust Toolspy for their image
            compression needs. No registration required, completely free, and
            your privacy is guaranteed.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Compress Images Now →
          </Button>
        </div>
      </section>
    </div>
  );
}
