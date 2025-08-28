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
  RefreshCw,
  Image,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";

export function ImageConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("image-converter");

  const comparisonData = [
    {
      feature: "Format Support",
      toolspy: "15+ formats",
      convertio: "12 formats",
      cloudconvert: "20+ formats",
      zamzar: "10 formats",
      toolspyStatus: "excellent",
    },
    {
      feature: "Max File Size",
      toolspy: "100MB per file",
      convertio: "100MB (free)",
      cloudconvert: "1GB (paid)",
      zamzar: "50MB (free)",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Up to 100 files",
      convertio: "✅ Up to 10 files",
      cloudconvert: "✅ Up to 25 files",
      zamzar: "❌ 2 files max",
      toolspyStatus: "excellent",
    },
    {
      feature: "Quality Control",
      toolspy: "✅ Advanced settings",
      convertio: "✅ Basic options",
      cloudconvert: "✅ Professional",
      zamzar: "❌ Auto quality",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy",
      toolspy: "✅ Client-side processing",
      convertio: "⚠️ Server uploads",
      cloudconvert: "⚠️ Cloud processing",
      zamzar: "⚠️ Email delivery",
      toolspyStatus: "excellent",
    },
    {
      feature: "Speed",
      toolspy: "✅ Instant conversion",
      convertio: "⚠️ Upload + process time",
      cloudconvert: "⚠️ Queue delays",
      zamzar: "⚠️ Very slow",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      convertio: "✅ Limited free use",
      cloudconvert: "❌ Account required",
      zamzar: "❌ Email required",
      toolspyStatus: "excellent",
    },
    {
      feature: "Modern Formats",
      toolspy: "✅ WebP, AVIF, HEIC",
      convertio: "✅ WebP only",
      cloudconvert: "✅ All modern",
      zamzar: "❌ Basic formats",
      toolspyStatus: "excellent",
    },
  ];

  const supportedFormats = [
    {
      input: "JPEG/JPG",
      output: "PNG, WebP, AVIF, GIF, BMP, TIFF",
      useCase: "Photo optimization, web publishing",
      quality: "Lossless conversion available",
    },
    {
      input: "PNG",
      output: "JPEG, WebP, AVIF, GIF, BMP, TIFF",
      useCase: "Logo conversion, transparency removal",
      quality: "Maintains transparency when supported",
    },
    {
      input: "WebP",
      output: "JPEG, PNG, AVIF, GIF, BMP, TIFF",
      useCase: "Legacy browser compatibility",
      quality: "High compression efficiency",
    },
    {
      input: "AVIF",
      output: "JPEG, PNG, WebP, GIF, BMP, TIFF",
      useCase: "Next-gen format conversion",
      quality: "Superior compression ratios",
    },
    {
      input: "GIF",
      output: "JPEG, PNG, WebP, AVIF, BMP, TIFF",
      useCase: "Animation to static conversion",
      quality: "First frame extraction",
    },
    {
      input: "HEIC/HEIF",
      output: "JPEG, PNG, WebP, AVIF, GIF, BMP",
      useCase: "iPhone photo conversion",
      quality: "Apple format compatibility",
    },
  ];

  const faqData = [
    {
      question: "What image formats can I convert with Toolspy?",
      answer:
        "Our image converter supports 15+ formats including JPEG, PNG, WebP, AVIF, GIF, BMP, TIFF, HEIC, HEIF, SVG, and more. You can convert between any supported formats with high quality preservation. We also support modern formats like AVIF and WebP for next-generation web optimization.",
    },
    {
      question: "Is the image conversion completely free?",
      answer:
        "Yes! Our professional image converter is completely free with no hidden costs, registration requirements, or usage limitations. You can convert unlimited images without any restrictions. Unlike many competitors who require paid subscriptions for batch processing or large files, Toolspy provides all features free of charge.",
    },
    {
      question: "How does client-side conversion work and why is it better?",
      answer:
        "Client-side conversion means your images are processed directly in your browser using advanced JavaScript algorithms. This ensures complete privacy (your images never leave your device), faster processing (no upload time), and no file size limits imposed by servers. It's more secure and efficient than traditional server-based conversion.",
    },
    {
      question: "Can I convert multiple images at once?",
      answer:
        "Absolutely! Our batch conversion feature allows you to convert up to 100 images simultaneously. Simply select multiple files, choose your output format, and our tool will process each image individually with the same settings. You can download all converted images individually or as a convenient ZIP file.",
    },
    {
      question: "Will converting images reduce their quality?",
      answer:
        "Quality depends on the conversion type. Converting to lossless formats (PNG, TIFF) maintains original quality. Converting to lossy formats (JPEG, WebP) allows quality control from 1-100%. Our advanced algorithms minimize quality loss while maximizing compression. You can preview results before downloading to ensure satisfaction.",
    },
    {
      question: "How large can my image files be?",
      answer:
        "Our converter supports files up to 100MB per image, which is larger than most competitors. Convertio supports 100MB but with account limits, while Zamzar only handles 50MB files. This makes Toolspy ideal for high-resolution photography, professional graphics, and large image processing needs.",
    },
    {
      question: "Can I convert iPhone HEIC photos to JPEG?",
      answer:
        "Yes! Our converter fully supports HEIC and HEIF formats from Apple devices. Simply upload your iPhone photos and convert them to JPEG, PNG, or any other format for universal compatibility. The conversion preserves image quality and metadata while ensuring compatibility across all devices and platforms.",
    },
    {
      question: "What happens to image metadata during conversion?",
      answer:
        "You have full control over metadata handling. Choose to preserve EXIF data (camera settings, location, timestamps) for professional workflows, or remove it for privacy and smaller file sizes. Our converter can selectively preserve important metadata while removing sensitive information like GPS coordinates.",
    },
    {
      question: "Can I resize images during conversion?",
      answer:
        "Yes! Our converter includes built-in resizing options. You can specify exact dimensions, scale by percentage, or choose from preset sizes for common use cases like social media, web publishing, or print. Resizing and format conversion happen simultaneously for efficient workflow.",
    },
    {
      question:
        "Why choose Toolspy over online converters like Convertio or CloudConvert?",
      answer:
        "Toolspy offers superior privacy with client-side processing, faster conversion with no upload delays, larger batch processing (100 vs 10 files), and no registration requirements. While CloudConvert offers more formats, it requires paid accounts for full features. Toolspy provides professional capabilities completely free with better privacy protection.",
    },
  ];

  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Universal Format Support",
      description:
        "Convert between 15+ image formats including modern WebP, AVIF, and HEIC with professional quality preservation.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning-Fast Conversion",
      description:
        "Client-side processing for instant results with no upload delays or server processing time.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Your images never leave your device, ensuring complete privacy and security for sensitive photos and graphics.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Professional Quality Control",
      description:
        "Advanced settings for quality, compression, resizing, and metadata handling with real-time preview.",
    },
  ];

  const keyBenefits = [
    "🎯 Convert between 15+ image formats with professional quality",
    "⚡ Lightning-fast client-side processing for maximum privacy",
    "🔒 Complete privacy protection - images never leave your device",
    "🎛️ Advanced quality control with 1-100% precision settings",
    "📦 Batch processing support for up to 100 images simultaneously",
    "🎨 Support for modern formats: WebP, AVIF, HEIC, HEIF",
    "⚙️ Built-in image resizing and dimension control",
    "📱 Handle large files up to 100MB per image",
    "🎯 Metadata control: preserve, remove, or selective handling",
    "🔄 Real-time preview before downloading converted images",
    "🖥️ Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced conversion algorithms optimized for each format",
    "📊 Detailed conversion statistics and quality comparisons",
    "💼 Professional features for photographers and designers",
    "🌐 Works offline after initial page load",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. Convertio",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "Faster Processing: No upload time vs. server processing delays",
        "More Batch Files: 100 images vs. 10 file limit",
        "No Account Limits: Unlimited use vs. daily conversion limits",
        "Advanced Quality: Professional settings vs. basic options",
        "Modern Formats: Full AVIF/HEIC support vs. limited format support",
      ],
    },
    {
      title: "Toolspy vs. CloudConvert",
      advantages: [
        "No Registration: Instant access vs. mandatory account creation",
        "Better Privacy: Local processing vs. cloud-based conversion",
        "Free Professional Features: All capabilities vs. paid tiers",
        "Faster Results: Immediate conversion vs. queue processing",
        "Larger Batches: 100 files vs. 25 file limit",
        "Quality Control: Advanced settings vs. basic conversion options",
      ],
    },
    {
      title: "Toolspy vs. Zamzar",
      advantages: [
        "Much Larger Files: 100MB vs. 50MB maximum file size",
        "Instant Results: Immediate download vs. email delivery delays",
        "Massive Batches: 100 files vs. 2 file maximum",
        "Better Privacy: No email required vs. mandatory email signup",
        "Modern Interface: Contemporary design vs. outdated website",
        "Advanced Formats: WebP/AVIF support vs. basic format selection",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="image-converter"
        title="Similar Image Processing Tools"
        description="Complete your image workflow with these complementary tools."
      />

      {/* Tool Poster Image */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="relative mx-auto max-w-6xl">
            <img
              src={tool?.posterImage || ""}
              alt="Toolspy Professional Image Converter - Advanced format conversion with batch processing and quality control"
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
            Convert Images to Any Format – Fast, Private, Professional
          </h2>
          <p className="text-lg text-muted-foreground max-w-6xl mx-auto">
            Need to convert images between different formats? Toolspy's Image
            Converter makes it simple. Whether you're converting iPhone HEIC
            photos to JPEG, optimizing PNG images to WebP for your website, or
            preparing graphics for different platforms, our tool handles all
            major image formats with professional quality and complete privacy.
          </p>
          <p className="text-base text-muted-foreground max-w-6xl mx-auto mt-4">
            With support for 15+ formats including modern WebP, AVIF, and HEIC,
            you can convert any image to any format while maintaining quality.
            No uploads, no registration, no limits – just fast, reliable image
            conversion that works entirely in your browser.
          </p>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          How to Convert Images with Toolspy
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Converting your images is simple and takes just a few clicks:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">1. Upload Your Images</h4>
            <p className="text-sm text-muted-foreground">
              Drag and drop your images or click to select them. You can add up
              to 100 images at once for batch conversion.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">2. Choose Output Format</h4>
            <p className="text-sm text-muted-foreground">
              Select from JPEG, PNG, WebP, AVIF, GIF, BMP, TIFF, and more. Each
              format is optimized for specific use cases.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">3. Adjust Quality Settings</h4>
            <p className="text-sm text-muted-foreground">
              Fine-tune quality, compression, dimensions, and metadata handling
              for perfect results every time.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">4. Download Results</h4>
            <p className="text-sm text-muted-foreground">
              Preview your converted images and download them individually or
              all together in a ZIP file.
            </p>
          </Card>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Supported Format Conversions
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Convert between any of these popular image formats with professional
          quality preservation.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Format Conversion Matrix</CardTitle>
            <CardDescription>
              Complete overview of supported input formats and their conversion
              capabilities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Input Format</th>
                    <th className="text-left p-3 font-medium">Convert To</th>
                    <th className="text-left p-3 font-medium">Best Use Case</th>
                    <th className="text-left p-3 font-medium">Quality Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {supportedFormats.map((format, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{format.input}</td>
                      <td className="p-3 text-muted-foreground">
                        {format.output}
                      </td>
                      <td className="p-3">{format.useCase}</td>
                      <td className="p-3 text-green-600 text-xs">
                        {format.quality}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Key Benefits Grid */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Toolspy's Image Converter Rocks
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's what makes our tool special and why people love using it for
          their image conversion needs.
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
          Everything You Get with Our Image Converter
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          All the features you need for professional image conversion,
          completely free and private.
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
          Why Choose Toolspy Over Other Image Converters
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's how we compare to other popular image conversion tools you
          might have tried.
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
            <CardTitle>Toolspy vs. Leading Image Converters</CardTitle>
            <CardDescription>
              Comprehensive comparison of features and capabilities across
              popular image conversion tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Feature</th>
                    <th className="text-left p-3 font-medium">Toolspy</th>
                    <th className="text-left p-3 font-medium">Convertio</th>
                    <th className="text-left p-3 font-medium">CloudConvert</th>
                    <th className="text-left p-3 font-medium">Zamzar</th>
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
                        {row.convertio}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.cloudconvert}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.zamzar}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SEO Keyword Cluster Section */}
      <section className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-center mb-6">
            Convert Images to Any Format You Need
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground leading-relaxed">
              Looking to <strong>convert images</strong> between different
              formats? Need to <strong>convert JPEG to PNG</strong>,{" "}
              <strong>convert PNG to JPEG</strong>, or{" "}
              <strong>convert HEIC to JPEG</strong>? Toolspy's image converter
              handles all format conversions with professional quality. Whether
              you want to <strong>convert WebP to PNG</strong> for compatibility
              or <strong>convert images to WebP</strong> for web optimization,
              our tool delivers perfect results every time.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Our advanced converter supports modern formats like AVIF and HEIC,
              making it easy to <strong>convert iPhone photos</strong> to
              universal formats. Photographers love our tool for{" "}
              <strong>image format conversion</strong> while maintaining
              quality, and web developers appreciate the ability to{" "}
              <strong>convert images online</strong> without compromising
              privacy or speed.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Unlike other converters that require uploads and registration, our{" "}
              <strong>image converter online</strong> processes everything
              locally in your browser. From simple{" "}
              <strong>photo format conversion</strong> to professional{" "}
              <strong>batch image conversion</strong>, we handle up to 100 files
              simultaneously with complete privacy protection.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Try our image converter today and see why thousands of users
              choose Toolspy for their conversion needs. From{" "}
              <strong>convert photo format</strong> tasks to professional image
              optimization, we make format conversion fast, private, and
              completely free.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h3 className="text-2xl font-bold text-center">
          Your Questions Answered
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Everything you need to know about image format conversion with
          Toolspy.
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
                  <CardTitle className="text-base">
                    <h4>{faq.question}</h4>
                  </CardTitle>
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

      {/* Final CTA Section */}
      <section className="space-y-6">
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Convert Your Images?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Join thousands of people who use Toolspy every day to convert images
            between formats. It's free, fast, and your images stay private on
            your device.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Converting Now →
          </Button>
        </div>
      </section>
    </div>
  );
}
