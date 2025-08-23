"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Zap,
  TrendingUp,
  Shield,
  FileImage,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Star,
  Target,
  Settings,
  Smartphone,
  Monitor,
  Tablet,
  Camera,
  Image,
  Download,
  Upload,
  Info,
  Sparkles,
  Palette,
  Gauge,
  Globe,
  Mail,
  Printer,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Maximize2,
  Minimize2,
  Square,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import NextImage from "next/image";
import { FAQ } from "@/components/ui/faq";

export function ImageOptimizerSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const tool = getToolBySlug("image-optimizer");

  const comparisonData = [
    {
      feature: "Max File Size",
      toolspy: "100MB",
      tinypng: "5MB",
      squoosh: "10MB",
      imagemin: "No limit",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Up to 100 files",
      tinypng: "✅ Up to 20 files",
      squoosh: "❌ Single file",
      imagemin: "✅ Unlimited",
      toolspyStatus: "excellent",
    },
    {
      feature: "Format Support",
      toolspy: "✅ 15+ formats",
      tinypng: "⚠️ PNG/JPEG only",
      squoosh: "✅ 8 formats",
      imagemin: "✅ All formats",
      toolspyStatus: "excellent",
    },
    {
      feature: "Quality Control",
      toolspy: "✅ 1-100% precision",
      tinypng: "❌ No control",
      squoosh: "✅ Advanced options",
      imagemin: "✅ Full control",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy",
      toolspy: "✅ Client-side",
      tinypng: "❌ Server upload",
      squoosh: "✅ Client-side",
      imagemin: "✅ Local only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Cost",
      toolspy: "✅ Completely free",
      tinypng: "⚠️ Free with limits",
      squoosh: "✅ Free",
      imagemin: "✅ Free",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Lightning Fast Optimization",
      description: "Optimize images instantly with our advanced browser-based compression engine",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Privacy Protected",
      description: "Your images never leave your device - complete privacy and security guaranteed",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Smart Quality Control",
      description: "Advanced algorithms that balance file size and visual quality perfectly",
    },
    {
      icon: <Palette className="h-5 w-5" />,
      title: "Multiple Format Support",
      description: "Support for JPEG, PNG, WebP, AVIF, HEIC, and 10+ other formats",
    },
    {
      icon: <Gauge className="h-5 w-5" />,
      title: "Advanced Compression",
      description: "Up to 80% file size reduction while maintaining excellent visual quality",
    },
    {
      icon: <FileImage className="h-5 w-5" />,
      title: "Batch Processing",
      description: "Optimize up to 100 images simultaneously with consistent settings",
    },
  ];

  const useCases = [
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Website Performance",
      description: "Optimize images for faster loading websites, improved SEO, and better user experience",
      presets: ["WebP Conversion", "Quality Optimization", "Metadata Removal", "Progressive JPEG"],
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      title: "Social Media Optimization",
      description: "Perfect for Instagram, Facebook, Twitter, and LinkedIn with optimal compression",
      presets: ["Social Media Ready", "Fast Upload", "Quality Balance", "Mobile Optimized"],
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Marketing",
      description: "Optimize images for email newsletters and marketing campaigns",
      presets: ["Email Compatible", "Small File Size", "Universal Support", "Fast Loading"],
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Mobile Optimization",
      description: "Optimize images for mobile apps and responsive websites",
      presets: ["Mobile First", "Retina Ready", "Progressive Loading", "Bandwidth Friendly"],
    },
  ];

  const faqs = [
    {
      question: "What's the difference between lossless and lossy compression?",
      answer: "Lossless compression reduces file size without any quality loss by removing redundant data, while lossy compression achieves smaller files by removing some image data. Our optimizer uses intelligent algorithms to minimize quality loss while maximizing compression ratios. For web use, lossy compression often provides the best balance of file size and visual quality.",
    },
    {
      question: "Should I use WebP format for my images?",
      answer: "WebP provides 25-35% better compression than JPEG while maintaining similar or better quality. It's supported by all modern browsers and is ideal for web use. However, if you need maximum compatibility, JPEG is still the safest choice. Our tool automatically suggests the best format based on your use case.",
    },
    {
      question: "How much can I reduce my image file sizes?",
      answer: "File size reduction depends on the original image quality and your settings. Typically, you can expect 30-80% reduction while maintaining good visual quality. Photos often compress more than graphics, and already optimized images may see smaller improvements. Our tool shows you a preview so you can find the perfect balance.",
    },
    {
      question: "Is it safe to remove EXIF metadata from my images?",
      answer: "Yes, removing EXIF metadata is generally safe and recommended for web images. It reduces file size and removes potentially sensitive information like camera settings, GPS location, and personal data. However, if you're a photographer sharing work, you might want to preserve copyright information.",
    },
    {
      question: "What's the best quality setting for web images?",
      answer: "For web images, 80-85% quality usually provides the best balance of file size and visual quality. Use 90-95% for high-quality photos, 70-75% for thumbnails, and 60-70% for background images. Our tool provides presets for different use cases to help you choose the right setting.",
    },
    {
      question: "Can I optimize images for different devices?",
      answer: "Yes! Our tool supports responsive image optimization. You can create multiple versions of the same image optimized for different screen sizes and resolutions. This ensures fast loading on mobile devices while maintaining quality on high-resolution displays.",
    },
    {
      question: "How does image optimization affect SEO?",
      answer: "Image optimization significantly improves SEO by reducing page load times, which is a key ranking factor. Faster loading pages have lower bounce rates and better user engagement. Additionally, optimized images improve Core Web Vitals scores, which directly impact search rankings.",
    },
    {
      question: "What's the difference between WebP, AVIF, and HEIC formats?",
      answer: "WebP offers 25-35% better compression than JPEG and is widely supported. AVIF provides even better compression (up to 50% smaller than JPEG) but has limited browser support. HEIC is Apple's format with excellent compression but limited compatibility. Our tool automatically suggests the best format for your target audience.",
    },
    {
      question: "Can I optimize images for print?",
      answer: "For print optimization, use high-quality settings (95-100%) and avoid aggressive compression. Print requires higher resolution and quality than web use. Our tool includes print-specific presets that maintain the quality needed for professional printing while still providing some file size benefits.",
    },
    {
      question: "How do I know if my images are optimized enough?",
      answer: "Our tool provides detailed compression statistics showing original vs optimized file sizes, compression ratios, and quality metrics. For web use, aim for images under 200KB for photos and 50KB for graphics. The tool also shows loading time improvements to help you understand the impact.",
    },
  ];

  const optimizationTips = [
    {
      title: "Web Performance",
      tips: [
        "Use WebP format for 25-35% smaller file sizes",
        "Optimize images to actual display dimensions",
        "Set quality to 80-85% for optimal balance",
        "Remove unnecessary metadata for smaller files",
      ],
    },
    {
      title: "Social Media",
      tips: [
        "Use platform-specific dimensions for best display",
        "Keep file sizes under 5MB for faster uploads",
        "Optimize for mobile viewing experience",
        "Test images across different devices",
      ],
    },
    {
      title: "E-commerce",
      tips: [
        "Maintain high quality for product images",
        "Use progressive JPEG for faster perceived loading",
        "Optimize thumbnail images separately",
        "Consider WebP for modern browsers",
      ],
    },
    {
      title: "Email Marketing",
      tips: [
        "Keep images under 1MB for email compatibility",
        "Use universal formats like JPEG for maximum compatibility",
        "Optimize for both desktop and mobile email clients",
        "Test email rendering across different platforms",
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Main Content */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Free Online Image Optimizer
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            The #1 <strong className="text-blue-600 dark:text-blue-400">free image optimizer</strong> trusted by millions
          </p>
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-left">
                <div className="space-y-4">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Transform your images with our{" "}
                    <strong className="text-blue-600 dark:text-blue-400">free online image optimizer</strong> - the ultimate{" "}
                    <strong className="text-purple-600 dark:text-purple-400">image optimization tool</strong> for{" "}
                    <strong className="text-pink-600 dark:text-pink-400">optimize images for web</strong>,{" "}
                    <strong className="text-green-600 dark:text-green-400">compress images online</strong>, and{" "}
                    <strong className="text-orange-600 dark:text-orange-400">reduce image file size</strong> with professional quality.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our <strong className="text-blue-600 dark:text-blue-400">online image optimizer</strong> is designed for both
                    beginners and professionals. With{" "}
                    <strong className="text-purple-600 dark:text-purple-400">drag and drop functionality</strong>,{" "}
                    <strong className="text-pink-600 dark:text-pink-400">batch processing</strong>, and{" "}
                    <strong className="text-green-600 dark:text-green-400">multiple format support</strong>, you can{" "}
                    <strong className="text-blue-600 dark:text-blue-400">optimize images free</strong> without any software
                    installation or registration required.
                  </p>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-600">15+</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Formats</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600">100MB</div>
                    <div className="text-sm text-green-700 dark:text-green-300">Max Size</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="text-2xl font-bold text-purple-600">80%</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">Compression</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-800">
                    <div className="text-2xl font-bold text-pink-600">∞</div>
                    <div className="text-sm text-pink-700 dark:text-pink-300">Privacy</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <NextImage
                  width={600}
                  height={400}
                  src={tool?.posterImage || ""}
                  alt="Free Online Image Optimizer - Optimize Images Online"
                  className="w-full rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 hover:scale-105 transition-transform duration-300"
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

      {/* Enhanced Features Section */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/10 dark:via-purple-950/10 dark:to-pink-950/10">
        <CardContent className="prose prose-sm max-w-none dark:prose-invert py-12">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Why Choose Our Free Image Optimizer?
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The most advanced <strong className="text-blue-600">image optimization tool</strong> with{" "}
              <strong className="text-purple-600">optimize images online</strong> capabilities for{" "}
              <strong className="text-pink-600">compress images for web</strong>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 not-prose mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white dark:bg-gray-900/50 rounded-2xl border border-white/20 dark:border-gray-800/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                    <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
                      {feature.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 dark:text-gray-100">
                    {feature.title}
                  </h4>
                </div>
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Included in free plan</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Perfect for Every Use Case
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From <strong className="text-green-600">optimize images for web</strong> to{" "}
              <strong className="text-emerald-600">compress images for social media</strong> - we've got you covered
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mb-12">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="group p-8 bg-white dark:bg-gray-900/50 rounded-2xl border border-white/20 dark:border-gray-800/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl group-hover:from-green-500/20 group-hover:to-emerald-500/20 transition-all duration-300">
                    <div className="text-green-600 group-hover:text-green-700 transition-colors">
                      {useCase.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 dark:text-gray-100">
                    {useCase.title}
                  </h4>
                </div>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {useCase.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {useCase.presets.map((preset, presetIndex) => (
                    <Badge
                      key={presetIndex}
                      variant="outline"
                      className="text-sm bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40 transition-all duration-300 px-3 py-1"
                    >
                      {preset}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitor Comparison Table */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-orange-950/10 dark:via-red-950/10 dark:to-pink-950/10">
        <CardContent className="prose prose-sm max-w-none dark:prose-invert py-12">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Toolspy vs Other Image Optimizers
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See why our <strong className="text-orange-600">free image optimizer</strong> outperforms the competition
            </p>
          </div>
          
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100">Feature</th>
                  <th className="text-center p-4 font-semibold text-green-600">Toolspy</th>
                  <th className="text-center p-4 font-semibold text-gray-600 dark:text-gray-400">TinyPNG</th>
                  <th className="text-center p-4 font-semibold text-gray-600 dark:text-gray-400">Squoosh</th>
                  <th className="text-center p-4 font-semibold text-gray-600 dark:text-gray-400">ImageMin</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="p-4 font-medium text-gray-900 dark:text-gray-100">{row.feature}</td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {row.toolspy}
                      </span>
                    </td>
                    <td className="p-4 text-center text-gray-600 dark:text-gray-400">
                      {row.tinypng}
                    </td>
                    <td className="p-4 text-center text-gray-600 dark:text-gray-400">
                      {row.squoosh}
                    </td>
                    <td className="p-4 text-center text-gray-600 dark:text-gray-400">
                      {row.imagemin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Popular Keywords Section */}
          <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/10 dark:via-purple-950/10 dark:to-pink-950/10 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h4 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
              Popular Image Optimization Tasks
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
                <div className="text-2xl mb-2">🌐</div>
                <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">optimize images for web</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
                <div className="text-2xl mb-2">📱</div>
                <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">compress images for social media</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
                <div className="text-2xl mb-2">📧</div>
                <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">optimize images for email</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
                <div className="text-2xl mb-2">💾</div>
                <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">reduce image file size</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/10 dark:via-purple-950/10 dark:to-pink-950/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl">
            <Settings className="h-8 w-8 text-blue-600" />
            How to Use Our Free Image Optimizer
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="mt-2 text-lg px-4 py-2">
                1
              </Badge>
              <div>
                <h4 className="font-semibold text-xl mb-3">Upload Your Images</h4>
                <p className="text-base text-muted-foreground mb-3">
                  Select up to 100 images in JPEG, PNG, WebP, AVIF, HEIC, or other formats. Each file can be up to 100MB. 
                  Simply drag and drop your images or click to browse your files.
                </p>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Pro Tip:</strong> For best results, use high-resolution source images. Our tool can optimize 
                    without quality loss, but starting with better quality images gives you more flexibility.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="mt-2 text-lg px-4 py-2">
                2
              </Badge>
              <div>
                <h4 className="font-semibold text-xl mb-3">Configure Optimization Settings</h4>
                <p className="text-base text-muted-foreground mb-3">
                  Choose your optimization method: quality-based compression, file size targeting, or format conversion. 
                  Adjust quality settings (1-100%), select output format, and configure advanced options.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <strong>Quality:</strong> 1-100% precision control
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <strong>Format:</strong> Convert to WebP, AVIF, etc.
                  </div>
                  <div className="p-3 bg-pink-50 dark:bg-pink-950/20 rounded-lg">
                    <strong>Metadata:</strong> Remove or preserve EXIF
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="mt-2 text-lg px-4 py-2">
                3
              </Badge>
              <div>
                <h4 className="font-semibold text-xl mb-3">Optimize Your Images</h4>
                <p className="text-base text-muted-foreground mb-3">
                  Click optimize to process your images with advanced compression algorithms. Our tool uses intelligent 
                  optimization that balances file size and visual quality for the best results.
                </p>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-xl">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    <strong>Optimization Guide:</strong> 80-85% for web, 90-95% for photos, 70-75% for thumbnails
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="mt-2 text-lg px-4 py-2">
                4
              </Badge>
              <div>
                <h4 className="font-semibold text-xl mb-3">Download Optimized Results</h4>
                <p className="text-base text-muted-foreground mb-3">
                  Download optimized images individually or as a complete batch. View detailed compression statistics 
                  including file size reduction, compression ratios, and quality metrics.
                </p>
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-xl">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <strong>Batch Download:</strong> Download all optimized images at once for convenience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Format Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Format Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Format</th>
                  <th className="text-left p-2">Best For</th>
                  <th className="text-left p-2">Compression</th>
                  <th className="text-left p-2">Quality</th>
                  <th className="text-left p-2">Browser Support</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">WebP</td>
                  <td className="p-2">Web images</td>
                  <td className="p-2">Excellent</td>
                  <td className="p-2">High</td>
                  <td className="p-2">95%+</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">JPEG</td>
                  <td className="p-2">Photos</td>
                  <td className="p-2">Good</td>
                  <td className="p-2">Variable</td>
                  <td className="p-2">100%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">PNG</td>
                  <td className="p-2">Graphics</td>
                  <td className="p-2">Lossless</td>
                  <td className="p-2">Perfect</td>
                  <td className="p-2">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

{/* Optimization Tips Section */}
<Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/10 dark:via-emerald-950/10 dark:to-teal-950/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl justify-center">
            <Target className="h-8 w-8 text-green-600" />
            <h5>Professional Image Optimization Tips</h5>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto text-center">
            Master the art of image optimization with our expert tips. Learn how to balance quality, 
            file size, and performance for different use cases.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {optimizationTips.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-semibold text-xl text-gray-900 dark:text-gray-100">{section.title}</h4>
                <ul className="space-y-3">
                  {section.tips.map((tip, tipIndex) => (
                    <li
                      key={tipIndex}
                      className="flex items-start gap-3 text-base"
                    >
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

       {/* Enhanced FAQ */}
       <FAQ faqs={faqs} />

      

      {/* Technical Specifications */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-purple-950/10 dark:via-pink-950/10 dark:to-red-950/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl">
            <Zap className="h-8 w-8 text-purple-600" />
            Technical Specifications & Supported Formats
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="font-semibold text-lg text-purple-900 dark:text-purple-100 mb-4">
                Supported Formats
              </div>
              <ul className="space-y-3 text-purple-700 dark:text-purple-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  JPEG/JPG (Best for photos)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  PNG (Transparency support)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  WebP (Modern web format)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  AVIF (Next-gen format)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  HEIC/HEIF (Apple format)
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="font-semibold text-lg text-green-900 dark:text-green-100 mb-4">
                File Limits
              </div>
              <ul className="space-y-3 text-green-700 dark:text-green-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Max file size: 100MB
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Max files: 100 per batch
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Max dimensions: 10,000px
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Min dimensions: 1px
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="font-semibold text-lg text-blue-900 dark:text-blue-100 mb-4">
                Quality Options
              </div>
              <ul className="space-y-3 text-blue-700 dark:text-blue-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Quality: 1-100%
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Compression: Up to 80%
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Metadata control
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Format conversion
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="font-semibold text-lg text-pink-900 dark:text-pink-100 mb-4">
                Processing Features
              </div>
              <ul className="space-y-3 text-pink-700 dark:text-pink-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Client-side processing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Advanced algorithms
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Batch processing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Real-time preview
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="image-optimizer"
        title="Related Image Tools"
        description="Explore our other professional image processing tools"
      />
    </div>
  );
} 