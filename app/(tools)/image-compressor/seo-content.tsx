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
  Image,
  Copy,
  Download,
  FileText,
  File,
  ArrowRight,
  FileDown,
  BarChart3,
  Sparkles,
  Palette,
  Smartphone,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { FAQ } from "@/components/ui/faq";
import NextImage from "next/image";
// Import FAQ function from server-side loader
import { getImageCompressorFAQs } from './faq-loader'

export function ImageCompressorSEOContent() {
  const tool = getToolBySlug("image-compressor");

  const comparisonData = [
    {
      feature: "Compression Quality",
      toolspy: "✅ High quality",
      tinypng: "⚠️ Limited quality",
      imagecompressor: "❌ Low quality",
      compressjpeg: "⚠️ Variable quality",
      toolspyStatus: "excellent",
    },
    {
      feature: "Processing Speed",
      toolspy: "✅ Fast processing",
      tinypng: "⚠️ Slow processing",
      imagecompressor: "❌ Very slow",
      compressjpeg: "⚠️ Variable speed",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      tinypng: "⚠️ Server-based",
      imagecompressor: "⚠️ Server-based",
      compressjpeg: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      tinypng: "⚠️ Limited free",
      imagecompressor: "✅ Free",
      compressjpeg: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Responsive design",
      tinypng: "⚠️ Basic mobile",
      imagecompressor: "❌ Poor mobile",
      compressjpeg: "⚠️ Limited mobile",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Options",
      toolspy: "✅ Multiple formats",
      tinypng: "⚠️ Limited formats",
      imagecompressor: "❌ No export",
      compressjpeg: "⚠️ Basic export",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Multiple images",
      tinypng: "⚠️ Limited batch",
      imagecompressor: "❌ No batch",
      compressjpeg: "⚠️ Basic batch",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      tinypng: "❌ Ad-heavy",
      imagecompressor: "❌ Ad-heavy",
      compressjpeg: "❌ Ad-heavy",
      toolspyStatus: "excellent",
    },
  ];

  const compressorTypes = [
    {
      type: "Image Compressor",
      description: "Compress images to reduce file size",
      useCase: "File size reduction, storage optimization, web optimization",
      precision: "High-quality compression",
      example: "Compress images for web use",
    },
    {
      type: "Quality Control",
      description: "Control compression quality and settings",
      useCase: "Quality optimization, specific requirements, professional use",
      precision: "Quality control options",
      example: "Adjust quality settings during compression",
    },
    {
      type: "Format Support",
      description: "Support for all major image formats",
      useCase: "Multi-format projects, cross-platform compatibility",
      precision: "Multiple format support",
      example: "Compress various image formats",
    },
    {
      type: "Batch Processing",
      description: "Process multiple images simultaneously",
      useCase: "Bulk compression, image libraries, project requirements",
      precision: "Multiple image processing",
      example: "Compress entire image collections",
    },
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your data never leaves your device.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Processing",
      description:
        "Compress images quickly with no server delays or uploads.",
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: "High-Quality Compression",
      description:
        "Compress images with professional quality and size control.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Features",
      description:
        "Advanced compression with customization options and professional tools.",
    },
  ];

  const keyBenefits = [
    "💰 Professional image compression with complete privacy protection",
    "⚡ Fast processing with no server delays or uploads",
    "🔒 Complete privacy protection - data never leaves your device",
    "📊 Multiple compressor types: image compressor, quality control, format support, batch processing",
    "🔧 Real-time processing and instant results",
    "📊 Complete compression history and image tracking",
    "📋 Multiple export formats and copy options",
    "🎯 Professional-grade compression capabilities",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 Precise compression and quality control",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
    "📈 Comprehensive image compression and analysis tools",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. TinyPNG",
      advantages: [
        "Better Quality: High quality vs. limited quality",
        "Better Speed: Fast processing vs. slow processing",
        "Better Privacy: Client-side vs. server-based",
        "Export Options: Multiple formats vs. limited formats",
        "Mobile Experience: Responsive design vs. basic mobile",
        "Batch Processing: Multiple images vs. limited batch",
      ],
    },
    {
      title: "Toolspy vs. ImageCompressor",
      advantages: [
        "Better Quality: High quality vs. low quality",
        "Better Speed: Fast processing vs. very slow",
        "Better Privacy: Client-side vs. server-based",
        "Export Options: Multiple formats vs. no export",
        "Mobile Experience: Responsive design vs. poor mobile",
        "Batch Processing: Multiple images vs. no batch",
      ],
    },
    {
      title: "Toolspy vs. CompressJPEG",
      advantages: [
        "Better Quality: High quality vs. variable quality",
        "Better Speed: Fast processing vs. variable speed",
        "Better Privacy: Client-side vs. server-based",
        "Export Options: Multiple formats vs. basic export",
        "Mobile Experience: Responsive design vs. limited mobile",
        "Batch Processing: Multiple images vs. basic batch",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="image-compressor"
        title="Similar Tools You Might Like"
        description="Check out our other image and optimization tools that work great with image compression and optimization projects."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Compress Images – Fast & Private
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional image compressor with complete privacy protection, 
            high-quality compression, and fast processing. Perfect for web developers, 
            designers, and anyone needing professional image compression.
          </p>
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-left">
                <div className="space-y-4">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Our{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      free image compressor
                    </strong>{" "}
                    is the ultimate{" "}
                    <strong className="text-purple-600 dark:text-purple-400">
                      image compressor online
                    </strong>{" "}
                    for{" "}
                    <strong className="text-pink-600 dark:text-pink-400">
                      compress images
                    </strong>
                    ,{" "}
                    <strong className="text-green-600 dark:text-green-400">
                      image compressor free
                    </strong>
                    , and{" "}
                    <strong className="text-orange-600 dark:text-orange-400">
                      image compressor download
                    </strong>{" "}
                    with professional quality.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      image compressor app
                    </strong>{" "}
                    is designed for both professionals and everyday users. With{" "}
                    <strong className="text-purple-600 dark:text-purple-400">
                      advanced compression technology
                    </strong>
                    ,{" "}
                    <strong className="text-pink-600 dark:text-pink-400">
                      complete privacy protection
                    </strong>
                    , and{" "}
                    <strong className="text-green-600 dark:text-green-400">
                      fast processing
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
                    <div className="text-2xl font-bold text-blue-600">4</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      Types
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600">
                      ⚡
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      Fast
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="text-2xl font-bold text-purple-600">
                      🔒
                    </div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">
                      Private
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-800">
                    <div className="text-2xl font-bold text-pink-600">🗜️</div>
                    <div className="text-sm text-pink-700 dark:text-pink-300">
                      Compress
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <NextImage
                  width={1200}
                  height={680}
                  src={tool?.posterImage || ""}
                  alt="Toolspy Professional Image Compressor - High-quality compression with complete privacy protection and fast processing"
                  className="w-full rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 hover:scale-105 transition-transform duration-300 h-full"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✨ High Quality
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          How to Use Our Image Compressor
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Follow these simple steps to compress images securely with professional precision:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">1. Upload Image</h4>
            <p className="text-sm text-muted-foreground">
              Upload the image you want 
              to compress.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">2. Choose Settings</h4>
            <p className="text-sm text-muted-foreground">
              Select your compression 
              preferences and quality settings.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">3. Compress Image</h4>
            <p className="text-sm text-muted-foreground">
              Click compress and get your 
              compressed image instantly.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">4. Download & Use</h4>
            <p className="text-sm text-muted-foreground">
              Download the compressed image 
              and use it in your projects.
            </p>
          </Card>
        </div>
      </section>

      {/* Compressor Types Guide */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Compressor Types & Use Cases
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Choose the right compressor type for your specific needs with detailed information and examples.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {compressorTypes.map((type, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Image className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{type.type}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Use Case:</strong> {type.useCase}</div>
                <div><strong>Precision:</strong> {type.precision}</div>
                <div><strong>Example:</strong> {type.example}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Toolspy's Image Compressor Rocks
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's what makes our tool special and why professionals and users love using it.
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
          All the features you need for professional image compression, completely free.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyBenefits.map((benefit, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <p className="text-sm">{benefit}</p>
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
            <CardTitle>Toolspy vs. Leading Image Compressors</CardTitle>
            <CardDescription>
              Comprehensive comparison of features and capabilities across popular image compression tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Feature</th>
                    <th className="text-left p-3 font-medium">Toolspy</th>
                    <th className="text-left p-3 font-medium">TinyPNG</th>
                    <th className="text-left p-3 font-medium">ImageCompressor</th>
                    <th className="text-left p-3 font-medium">CompressJPEG</th>
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
                      <td className="p-3 text-muted-foreground">{row.tinypng}</td>
                      <td className="p-3 text-muted-foreground">{row.imagecompressor}</td>
                      <td className="p-3 text-muted-foreground">{row.compressjpeg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Competitor Advantages */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Toolspy Over Other Image Compressors
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's how we compare to other popular image compression tools.
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
              title: "Upload Image",
              description:
                "Upload the image you want to compress.",
            },
            {
              step: "2",
              title: "Choose Settings",
              description:
                "Select your compression preferences and quality settings.",
            },
            {
              step: "3",
              title: "Compress Image",
              description:
                "Click compress and get your compressed image instantly.",
            },
            {
              step: "4",
              title: "Download & Use",
              description:
                "Download the compressed image and use it in your projects.",
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

      {/* Use Cases Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Common Use Cases
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Professional applications for image compression across various scenarios.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">File Size Reduction</h4>
            <p className="text-sm text-muted-foreground">
              Reduce image file sizes for storage
            </p>
          </Card>

          <Card className="p-6 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Web Optimization</h4>
            <p className="text-sm text-muted-foreground">
              Optimize images for web use
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Image className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Quality Control</h4>
            <p className="text-sm text-muted-foreground">
              Control image quality during compression
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Smartphone className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Mobile Compression</h4>
            <p className="text-sm text-muted-foreground">
              Compress images on mobile devices
            </p>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={getImageCompressorFAQs()} />

      {/* SEO Keyword Cluster Section */}
      <section className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-center mb-6">
            Professional Image Compression for All Project Needs
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground leading-relaxed">
              Need to <strong>compress images</strong> for your project needs? Looking for a reliable way to <strong>image compressor</strong> online? Toolspy's professional tool makes it effortless. Whether you need to <strong>compress images</strong>, <strong>compress images free</strong>, or <strong>compress images online</strong>, our tool handles all compression with professional accuracy and complete privacy.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Our advanced <strong>image compressor online</strong> provides support for all major compression types. Users love our tool for <strong>image compressor free</strong> functionality, while professionals appreciate the complete privacy protection and high-quality compression. Unlike other tools, we provide instant results with no server delays.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Whether you're reducing file sizes, optimizing for web, or controlling quality, our <strong>image compressor app</strong> processes everything locally in your browser. Your data never leaves your device, ensuring complete privacy. From simple <strong>compress images</strong> tasks to complex compression requirements, we make it fast and secure.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Try our image compressor today and see why thousands of users choose Toolspy for their image compression needs. From <strong>image compressor free</strong> planning to professional compression, we deliver reliable results every time.
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
            Join thousands of users who use Toolspy every day to compress images. It's free, secure, and your data stays private on your device.
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

// Re-export FAQ function for use in client component
export { getImageCompressorFAQs }
