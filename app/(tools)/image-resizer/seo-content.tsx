"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Maximize2,
  Minimize2,
  Square,
  Zap,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Star,
  Target,
  Shield,
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
  FileImage,
  Globe,
  Mail,
  Printer,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import NextImage from "next/image";
import { FAQ } from "@/components/ui/faq";

export function ImageResizerSEOContent() {

  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const tool = getToolBySlug("image-resizer");

  const comparisonData = [
    {
      feature: "Processing Speed",
      toolspy: "✅ Instant browser processing",
      photoshop: "⚠️ Software installation required",
      canva: "⚠️ Cloud upload required",
      gimp: "❌ Complex interface",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ 100% client-side processing",
      photoshop: "✅ Local processing",
      canva: "❌ Cloud storage required",
      gimp: "✅ Local processing",
      toolspyStatus: "excellent",
    },
    {
      feature: "Ease of Use",
      toolspy: "✅ Drag & drop interface",
      photoshop: "❌ Steep learning curve",
      canva: "✅ User-friendly",
      gimp: "❌ Complex for beginners",
      toolspyStatus: "excellent",
    },
    {
      feature: "Cost",
      toolspy: "✅ Completely free",
      photoshop: "❌ $20.99/month",
      canva: "⚠️ Free with limitations",
      gimp: "✅ Free but complex",
      toolspyStatus: "excellent",
    },
    {
      feature: "Format Support",
      toolspy: "✅ JPEG, PNG, WebP, GIF",
      photoshop: "✅ All major formats",
      canva: "⚠️ Limited export options",
      gimp: "✅ Most formats",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Up to 10 images",
      photoshop: "✅ Advanced batch",
      canva: "❌ One at a time",
      gimp: "⚠️ Complex batch",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Lightning Fast Processing",
      description:
        "Resize images instantly with our optimized browser-based engine",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Privacy Protected",
      description:
        "Your images never leave your device - complete privacy guaranteed",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Precise Control",
      description: "Resize by percentage, exact pixels, or use popular presets",
    },
    {
      icon: <Palette className="h-5 w-5" />,
      title: "Multiple Formats",
      description: "Support for JPEG, PNG, WebP, and GIF with quality control",
    },
    {
      icon: <Gauge className="h-5 w-5" />,
      title: "Quality Optimization",
      description: "Adjust compression to balance file size and visual quality",
    },
    {
      icon: <FileImage className="h-5 w-5" />,
      title: "Batch Processing",
      description:
        "Resize multiple images simultaneously with consistent settings",
    },
  ];

  const useCases = [
    {
      icon: <Instagram className="h-5 w-5" />,
      title: "Social Media Optimization",
      description:
        "Perfect for Instagram posts (1080×1080), Facebook covers (851×315), Twitter posts (1200×675), and LinkedIn posts (1200×627)",
      presets: [
        "Instagram Post",
        "Facebook Post",
        "Twitter Post",
        "LinkedIn Post",
      ],
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Website & Blog Images",
      description:
        "Optimize images for faster loading websites, blog posts, and email newsletters",
      presets: [
        "Website Banner",
        "Blog Post",
        "Email Header",
        "Profile Picture",
      ],
    },
    {
      icon: <Printer className="h-5 w-5" />,
      title: "Print & Professional Use",
      description:
        "High-resolution images for business cards, posters, and print materials",
      presets: ["A4 Portrait", "A4 Landscape", "Business Card", "Poster"],
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Mobile Optimization",
      description:
        "Resize images for mobile apps, responsive websites, and mobile-first design",
      presets: ["Mobile Banner", "App Icon", "Thumbnail", "Profile Picture"],
    },
  ];

  const faqs = [
    {
      question: "How do I resize an image without losing quality?",
      answer:
        "To minimize quality loss, avoid enlarging images significantly. When making images smaller, use high-quality settings (90-95%) and consider using PNG format for graphics with text or sharp edges. Our tool uses advanced algorithms to maintain the best possible quality during resizing.",
    },
    {
      question: "What's the best image size for social media?",
      answer:
        "Different platforms have optimal dimensions: Instagram posts (1080×1080), Facebook posts (1200×630), Twitter posts (1200×675), LinkedIn posts (1200×627), and YouTube thumbnails (1280×720). Our preset options automatically apply these dimensions.",
    },
    {
      question: "Can I resize multiple images at once?",
      answer:
        "Yes! You can upload up to 10 images simultaneously and resize them all with the same settings. This is perfect for batch processing photos from events, creating consistent social media content, or optimizing website images.",
    },
    {
      question: "What's the difference between JPEG, PNG, and WebP?",
      answer:
        "JPEG is best for photographs with small file sizes, PNG is ideal for graphics with transparency, and WebP offers the best compression for web use. Choose based on your needs - photos (JPEG), graphics with transparency (PNG), or web optimization (WebP).",
    },
    {
      question: "How do I maintain aspect ratio when resizing?",
      answer:
        "Our tool automatically maintains aspect ratio by default. When you change width or height, the other dimension adjusts proportionally. You can disable this feature if you need to stretch or crop images to specific dimensions.",
    },
    {
      question: "Is my data safe when using this tool?",
      answer:
        "Absolutely! All image processing happens locally in your browser. Your images never leave your device or get uploaded to our servers. This ensures complete privacy and security for your sensitive photos and documents.",
    },
    {
      question: "What's the maximum file size I can resize?",
      answer:
        "You can resize images up to 10MB each, with support for up to 10 images per batch. This covers most common use cases including high-resolution photos, professional graphics, and print-ready images.",
    },
    {
      question: "Can I resize images for print?",
      answer:
        "Yes! Our tool supports high-resolution output perfect for print. Use our print presets like A4 Portrait (2480×3508) or A4 Landscape (3508×2480) for professional printing. Set quality to 95-100% for best print results.",
    },
    {
      question: "How do I optimize images for web performance?",
      answer:
        "For web optimization, use WebP format with 80-90% quality, resize to appropriate dimensions (max 1920px width), and enable compression. This ensures fast loading times while maintaining visual quality.",
    },
    {
      question: "What's the difference between resizing and cropping?",
      answer:
        "Resizing changes the overall dimensions while maintaining the full image content, while cropping removes parts of the image to fit specific dimensions. Our tool focuses on resizing, but you can disable aspect ratio to achieve crop-like effects.",
    },
    {
      question: "Can I resize animated GIFs?",
      answer:
        "Currently, our tool supports static GIFs only. For animated GIFs, we recommend using our dedicated GIF tools or converting to video format first for better compression and quality control.",
    },
    {
      question: "How do I choose the right quality setting?",
      answer:
        "Use 90-95% for high-quality photos, 80-85% for web images, and 70-75% for thumbnails or preview images. Higher quality means larger file sizes, so balance based on your specific needs.",
    },
  ];

  const socialMediaDimensions = [
    {
      platform: "Instagram",
      dimensions: [
        { name: "Square Post", width: 1080, height: 1080 },
        { name: "Portrait Post", width: 1080, height: 1350 },
        { name: "Landscape Post", width: 1080, height: 566 },
        { name: "Story", width: 1080, height: 1920 },
        { name: "Reel", width: 1080, height: 1920 },
        { name: "Profile Picture", width: 320, height: 320 },
      ],
    },
    {
      platform: "Facebook",
      dimensions: [
        { name: "Profile Picture", width: 170, height: 170 },
        { name: "Cover Photo", width: 851, height: 315 },
        { name: "Post Image", width: 1200, height: 630 },
        { name: "Event Cover", width: 1920, height: 1080 },
      ],
    },
    {
      platform: "Twitter/X",
      dimensions: [
        { name: "Post Image", width: 1200, height: 675 },
        { name: "Header Image", width: 1500, height: 500 },
        { name: "Profile Picture", width: 400, height: 400 },
      ],
    },
    {
      platform: "LinkedIn",
      dimensions: [
        { name: "Post Image", width: 1200, height: 627 },
        { name: "Cover Photo", width: 1584, height: 396 },
        { name: "Profile Picture", width: 400, height: 400 },
      ],
    },
    {
      platform: "YouTube",
      dimensions: [
        { name: "Thumbnail", width: 1280, height: 720 },
        { name: "Channel Banner", width: 2560, height: 1440 },
        { name: "Profile Picture", width: 800, height: 800 },
      ],
    },
  ];

  const imageOptimizationTips = [
    {
      title: "Web Performance",
      tips: [
        "Use WebP format for 25-35% smaller file sizes",
        "Resize images to actual display dimensions",
        "Set quality to 80-85% for optimal balance",
        "Enable compression for faster loading",
      ],
    },
    {
      title: "Social Media",
      tips: [
        "Use platform-specific dimensions for best display",
        "Maintain aspect ratio to avoid cropping",
        "Test images on mobile devices",
        "Keep file sizes under 5MB for faster uploads",
      ],
    },
    {
      title: "Print Quality",
      tips: [
        "Use 300 DPI resolution for professional printing",
        "Set quality to 95-100% for best results",
        "Choose PNG for graphics with transparency",
        "Use CMYK color profile for print materials",
      ],
    },
    {
      title: "Mobile Optimization",
      tips: [
        "Resize images to 2x display size for retina screens",
        "Use progressive JPEG for faster perceived loading",
        "Optimize for mobile-first design",
        "Consider lazy loading for better performance",
      ],
    },
  ];

  return (
    <div className="space-y-8">
        {/* Related Tools */}
        <RelatedTools
        currentToolSlug="image-resizer"
        title="Related Image Tools"
        description="Explore our other professional image processing tools"
      />
      
      {/* Hero Section */}
      <section className="space-y-8">
        <div className="text-center">
          <div className="relative mx-auto">
            <div className="w-full h-64 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative text-center text-white z-10">
                <Maximize2 className="w-20 h-20 mx-auto mb-6 opacity-90 drop-shadow-lg" />
                <h2 className="text-4xl font-bold mb-3 drop-shadow-lg">Professional Image Resizer</h2>
                <p className="text-xl opacity-95 mb-4">Free • Fast • Secure</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Shield className="w-3 h-3 mr-1" />
                    Privacy-First
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Zap className="w-3 h-3 mr-1" />
                    Instant Processing
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    No Registration
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Resize Images Online for FREE
              </h2>
              <p className="text-xl text-muted-foreground mb-4">
                The #1 <strong className="text-blue-600 dark:text-blue-400">free image resizer</strong> trusted by millions
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
              <div className="space-y-6 text-left">
                <div className="space-y-4">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Transform your images with our{" "}
                    <strong className="text-blue-600 dark:text-blue-400">free online image resizer</strong> - the ultimate{" "}
                    <strong className="text-purple-600 dark:text-purple-400">image resize tool</strong> for{" "}
                    <strong className="text-pink-600 dark:text-pink-400">resizing photos for social media</strong>,{" "}
                    <strong className="text-green-600 dark:text-green-400">resize image for instagram</strong>, and{" "}
                    <strong className="text-orange-600 dark:text-orange-400">resize image for facebook</strong> with professional quality.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our <strong className="text-blue-600 dark:text-blue-400">online image resizer</strong> is designed for both
                    beginners and professionals. With{" "}
                    <strong className="text-purple-600 dark:text-purple-400">drag and drop functionality</strong>,{" "}
                    <strong className="text-pink-600 dark:text-pink-400">batch processing</strong>, and{" "}
                    <strong className="text-green-600 dark:text-green-400">multiple format support</strong>, you can{" "}
                    <strong className="text-blue-600 dark:text-blue-400">resize images free</strong> without any software
                    installation or registration required.
              </p>
            </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-600">10+</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Formats</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600">10MB</div>
                    <div className="text-sm text-green-700 dark:text-green-300">Max Size</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="text-2xl font-bold text-purple-600">100%</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">Free</div>
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
                  alt="Free Online Image Resizer - Resize Images Online"
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

      <Card>
        <CardContent className="prose prose-sm max-w-none dark:prose-invert py-10">
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose Our Free Image Resizer?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
                      {feature.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-lg text-blue-900 dark:text-blue-100">
                    {feature.title}
                  </h4>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                  {feature.description}
              </p>
            </div>

            ))}
          </div>

          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Perfect for Every Use Case
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-12">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="group p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                    <div className="text-green-600 group-hover:text-green-700 transition-colors">
                      {useCase.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-lg text-green-900 dark:text-green-100">
                    {useCase.title}
                  </h4>
            </div>
                <p className="text-sm text-green-700 dark:text-green-300 mb-4 leading-relaxed">
                  {useCase.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {useCase.presets.map((preset, presetIndex) => (
                    <Badge
                      key={presetIndex}
                      variant="outline"
                      className="text-xs bg-white/50 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
                    >
                      {preset}
                    </Badge>
                  ))}
            </div>

              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-8 text-center">Toolspy vs Other Image Resizers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Feature</th>
                  <th className="text-center p-2 font-medium">Toolspy</th>
                  <th className="text-center p-2 font-medium">Photoshop</th>
                  <th className="text-center p-2 font-medium">Canva</th>
                  <th className="text-center p-2 font-medium">GIMP</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30">
                    <td className="p-2 font-medium">{row.feature}</td>
                    <td className="p-2 text-center text-green-600 font-medium">
                      {row.toolspy}
                    </td>
                    <td className="p-2 text-center text-muted-foreground">
                      {row.photoshop}
                    </td>
                    <td className="p-2 text-center text-muted-foreground">
                      {row.canva}
                    </td>
                    <td className="p-2 text-center text-muted-foreground">
                      {row.gimp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>

          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            How to Use Our Free Image Resizer
          </CardTitle>
        </CardHeader>
        <CardContent>

          <div className="space-y-6">
            <div className="flex items-start gap-3">

              <Badge variant="secondary" className="mt-1">
                1
              </Badge>
              <div>

                <h4 className="font-semibold text-lg">Upload Your Images</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Select up to 10 images in JPEG, PNG, WebP, or GIF format. Each
                  file can be up to 10MB. Simply drag and drop your images or
                  click to browse your files.
                </p>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    <strong>Pro Tip:</strong> For best results, use
                    high-resolution source images. Our tool can resize down
                    without quality loss, but enlarging may reduce sharpness.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">

              <Badge variant="secondary" className="mt-1">
                2
              </Badge>
              <div>

                <h4 className="font-semibold text-lg">
                  Choose Your Resize Method
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Select from three powerful resizing options: percentage
                  scaling for proportional resizing, custom dimensions for exact
                  pixel sizes, or use our popular presets for common use cases.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded">
                    <strong>Percentage:</strong> Scale by 10-300%
                  </div>
                  <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded">
                    <strong>Custom:</strong> Set exact dimensions
                  </div>
                  <div className="p-2 bg-pink-50 dark:bg-pink-950/20 rounded">
                    <strong>Presets:</strong> Social media & print sizes
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">

              <Badge variant="secondary" className="mt-1">
                3
              </Badge>
              <div>

                <h4 className="font-semibold text-lg">
                  Fine-tune Your Settings
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Configure quality settings (10-100%), choose output format
                  (JPEG, PNG, WebP), and decide whether to maintain aspect ratio
                  for professional results.
                </p>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">
                    <strong>Quality Guide:</strong> 90-95% for photos, 80-85%
                    for web, 70-75% for thumbnails
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">

              <Badge variant="secondary" className="mt-1">
                4
              </Badge>
              <div>

                <h4 className="font-semibold text-lg">
                  Download Your Resized Images
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Process your images with one click and download them
                  individually or as a complete batch. Each file is
                  automatically named with its new dimensions for easy
                  organization.
                </p>
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <p className="text-xs text-green-700 dark:text-green-300">
                    <strong>Batch Download:</strong> Download all processed
                    images at once for convenience
                </p>
              </div>
            </div>

            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Dimensions Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Instagram className="h-5 w-5" />
            Complete Social Media Image Dimensions Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Get perfect image sizes for every social media platform. Our
            comprehensive guide ensures your images display optimally across all
            devices and platforms.
          </p>
          <div className="space-y-6">
            {socialMediaDimensions.map((platform, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  {platform.platform === "Instagram" && (
                    <Instagram className="h-4 w-4 text-pink-600" />
                  )}
                  {platform.platform === "Facebook" && (
                    <Facebook className="h-4 w-4 text-blue-600" />
                  )}
                  {platform.platform === "Twitter/X" && (
                    <Twitter className="h-4 w-4 text-blue-400" />
                  )}
                  {platform.platform === "LinkedIn" && (
                    <Linkedin className="h-4 w-4 text-blue-700" />
                  )}
                  {platform.platform === "YouTube" && (
                    <Youtube className="h-4 w-4 text-red-600" />
                  )}
                  {platform.platform}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {platform.dimensions.map((dim, dimIndex) => (
                    <div key={dimIndex} className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-medium text-sm">{dim.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {dim.width} × {dim.height} pixels
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Image Optimization Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Professional Image Optimization Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Master the art of image optimization with our expert tips. Learn how
            to balance quality, file size, and performance for different use
            cases.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {imageOptimizationTips.map((section, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold text-lg">{section.title}</h4>
                <ul className="space-y-2">
                  {section.tips.map((tip, tipIndex) => (
                    <li
                      key={tipIndex}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />

            Technical Specifications & Supported Formats
          </CardTitle>
        </CardHeader>
        <CardContent>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="font-medium text-blue-900 dark:text-blue-100 mb-3">
                Supported Formats
              </div>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  JPEG/JPG (Best for photos)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  PNG (Transparency support)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  WebP (Modern web format)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  GIF (Static images)
                </li>
              </ul>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="font-medium text-green-900 dark:text-green-100 mb-3">
                File Limits
              </div>
              <ul className="space-y-2 text-green-700 dark:text-green-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Max file size: 10MB
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Max files: 10 per batch
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Max dimensions: 10,000px
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Min dimensions: 1px
                </li>
              </ul>
            </div>
            

            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="font-medium text-purple-900 dark:text-purple-100 mb-3">
                Quality Options
              </div>
              <ul className="space-y-2 text-purple-700 dark:text-purple-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Quality: 10-100%
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Scale: 10-300%
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Aspect ratio control
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Format conversion
                </li>
              </ul>
            </div>
            

            <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
              <div className="font-medium text-pink-900 dark:text-pink-100 mb-3">
                Processing Features
              </div>
              <ul className="space-y-2 text-pink-700 dark:text-pink-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Client-side processing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  High-quality algorithms
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Batch processing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Instant preview
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Why Choose Our Image Resizer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Why Choose Our Free Online Image Resizer?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-green-700 dark:text-green-300">
                  ✅ Advantages of Our Tool
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>100% free with no hidden costs or watermarks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>No registration or account creation required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Complete privacy - images never leave your device
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Works on all devices - desktop, tablet, and mobile
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Professional-quality results with advanced algorithms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Instant processing with no waiting time</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-blue-700 dark:text-blue-300">
                  🎯 Perfect For
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Social media managers and content creators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Web developers and designers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Photographers and graphic designers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>E-commerce store owners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Bloggers and content marketers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Anyone needing quick image resizing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced FAQ */}
      <FAQ faqs={faqs} variant="default"/>

      {/* Common Use Cases & Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Common Use Cases & Real-World Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">
                  📱 Social Media Content Creation
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-pink-50 dark:bg-pink-950/20 rounded-lg">
                    <div className="font-medium text-sm">Instagram Post</div>
                    <div className="text-xs text-muted-foreground">
                      Resize product photos to 1080×1080 for perfect square
                      posts
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="font-medium text-sm">Facebook Cover</div>
                    <div className="text-xs text-muted-foreground">
                      Optimize banner images to 851×315 for professional
                      business pages
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="font-medium text-sm">Twitter Post</div>
                    <div className="text-xs text-muted-foreground">
                      Resize images to 1200×675 for optimal Twitter engagement
                    </div>
                  </div>
                </div>
            </div>
            

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">
                  🌐 Website & E-commerce
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="font-medium text-sm">Product Images</div>
                    <div className="text-xs text-muted-foreground">
                      Resize product photos to 800×800 for consistent catalog
                      display
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <div className="font-medium text-sm">Blog Post Images</div>
                    <div className="text-xs text-muted-foreground">
                      Optimize featured images to 1200×630 for better SEO and
                      sharing
                    </div>
                  </div>
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg">
                    <div className="font-medium text-sm">Email Marketing</div>
                    <div className="text-xs text-muted-foreground">
                      Resize images to 600×400 for email newsletter
                      compatibility
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>

        </CardContent>
      </Card>

      {/* Best Practices Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Best Practices for Image Resizing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">
                  📐 Dimension Guidelines
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Always start with high-resolution source images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Maintain aspect ratio unless specific cropping is needed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Use platform-specific dimensions for social media
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Consider mobile viewing when choosing dimensions
                    </span>
                  </li>
                </ul>
            </div>
            

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">
                  🎨 Quality Optimization
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Use 90-95% quality for photographs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Choose PNG for graphics with transparency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Use WebP for web optimization when possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Test different quality settings for optimal balance
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );

} 
