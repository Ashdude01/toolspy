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
  Code,
  Image,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";

export function Base64ToImageSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug('base64-to-image');

  const comparisonData = [
    {
      feature: "Max Data Size",
      toolspy: "50MB encoded data",
      base64guru: "10MB limit",
      onlineconvert: "100MB (paid)",
      codebeautify: "5MB limit",
      toolspyStatus: "excellent",
    },
    {
      feature: "Format Support",
      toolspy: "✅ All image formats",
      base64guru: "✅ Basic formats",
      onlineconvert: "✅ Multiple formats",
      codebeautify: "✅ Limited formats",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Multiple strings",
      base64guru: "❌ Single only",
      onlineconvert: "✅ Limited batch",
      codebeautify: "❌ Single only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Data URL Support",
      toolspy: "✅ Full data URL parsing",
      base64guru: "✅ Basic support",
      onlineconvert: "⚠️ Limited support",
      codebeautify: "✅ Basic support",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy",
      toolspy: "✅ Client-side processing",
      base64guru: "⚠️ Server-based",
      onlineconvert: "⚠️ Server uploads",
      codebeautify: "⚠️ Server processing",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      base64guru: "✅ Free with limits",
      onlineconvert: "❌ Account for features",
      codebeautify: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Error Handling",
      toolspy: "✅ Detailed error messages",
      base64guru: "⚠️ Basic errors",
      onlineconvert: "⚠️ Generic errors",
      codebeautify: "⚠️ Limited feedback",
      toolspyStatus: "excellent",
    },
    {
      feature: "Preview Quality",
      toolspy: "✅ High-res preview",
      base64guru: "⚠️ Basic preview",
      onlineconvert: "✅ Good preview",
      codebeautify: "⚠️ Small preview",
      toolspyStatus: "excellent",
    },
  ];

  const supportedFormats = [
    {
      format: "JPEG/JPG",
      mimeType: "image/jpeg",
      description: "Most common photo format",
      useCase: "Photos, web images",
    },
    {
      format: "PNG",
      mimeType: "image/png",
      description: "Lossless with transparency",
      useCase: "Graphics, logos, screenshots",
    },
    {
      format: "WebP",
      mimeType: "image/webp",
      description: "Modern web format",
      useCase: "Web optimization, modern browsers",
    },
    {
      format: "GIF",
      mimeType: "image/gif",
      description: "Animated and static graphics",
      useCase: "Animations, simple graphics",
    },
    {
      format: "SVG",
      mimeType: "image/svg+xml",
      description: "Scalable vector graphics",
      useCase: "Icons, scalable graphics",
    },
    {
      format: "BMP",
      mimeType: "image/bmp",
      description: "Uncompressed bitmap",
      useCase: "Windows applications, raw images",
    },
  ];

  const faqData = [
    {
      question: "What is Base64 encoding and why convert it to images?",
      answer:
        "Base64 is a method of encoding binary data (like images) into text format using 64 ASCII characters. This is commonly used in web development, APIs, and data storage. Converting Base64 back to images allows you to view, save, and use the original image files that were encoded as text strings.",
    },
    {
      question: "Is it safe to decode Base64 data with Toolspy?",
      answer:
        "Absolutely! Our Base64 to Image converter processes all data locally in your browser. Your encoded strings are never uploaded to our servers or stored anywhere. The conversion happens entirely on your device, ensuring complete privacy and security for your data.",
    },
    {
      question: "What image formats can I decode from Base64?",
      answer:
        "Our converter supports all major image formats including JPEG, PNG, WebP, GIF, SVG, BMP, TIFF, and more. The tool automatically detects the image format from the Base64 data header and converts it to the appropriate image file with the correct extension.",
    },
    {
      question: "Can I decode multiple Base64 strings at once?",
      answer:
        "Yes! Our tool supports batch processing. You can paste multiple Base64 strings (separated by new lines) and convert them all simultaneously. Each string will be processed individually and you can download all the resulting images at once or individually.",
    },
    {
      question: "What if my Base64 string includes the data URL prefix?",
      answer:
        "No problem! Our converter automatically handles both pure Base64 strings and complete data URLs (like 'data:image/png;base64,iVBORw0KGgo...'). The tool intelligently parses the format information and extracts the Base64 data for conversion.",
    },
    {
      question: "Why is my Base64 string not converting to an image?",
      answer:
        "Common issues include: incomplete Base64 strings, corrupted data, non-image data encoded as Base64, or invalid characters. Our tool provides detailed error messages to help identify the problem. Ensure your Base64 string is complete and represents valid image data.",
    },
    {
      question: "What's the maximum size of Base64 data I can convert?",
      answer:
        "Our converter supports Base64 strings up to 50MB of encoded data, which is significantly larger than most competitors. This allows you to decode high-resolution images and large graphics files without size restrictions that limit other tools.",
    },
    {
      question: "Can I preview the image before downloading?",
      answer:
        "Yes! Once decoded, you'll see a high-quality preview of the image directly in your browser. You can verify the image looks correct before downloading. The preview maintains the original resolution and quality of the decoded image.",
    },
    {
      question: "How do I use Base64 images in web development?",
      answer:
        "Base64 images are commonly used in CSS (background-image), HTML (img src), and JavaScript. They're useful for small images, icons, or when you want to embed images directly in code without separate file requests. However, they increase file size by about 33%.",
    },
    {
      question: "What's the difference between Base64 and regular image files?",
      answer:
        "Base64 is a text representation of binary image data. It's about 33% larger than the original image but can be embedded directly in text files, databases, or code. Regular image files are binary and more efficient for storage and loading, but require separate file handling.",
    },
  ];

  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Universal Format Support",
      description:
        "Decode Base64 strings to any image format including JPEG, PNG, WebP, GIF, SVG, and more with automatic format detection.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Conversion",
      description:
        "Client-side processing for immediate results with no upload delays or server processing time.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy",
      description:
        "Your Base64 data never leaves your device, ensuring complete privacy and security for sensitive images.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Smart Data Parsing",
      description:
        "Automatically handles both pure Base64 strings and complete data URLs with intelligent format detection.",
    },
  ];

  const keyBenefits = [
    "🎯 Support for all major image formats: JPEG, PNG, WebP, GIF, SVG, BMP",
    "⚡ Lightning-fast client-side processing for maximum privacy",
    "🔒 Complete privacy protection - data never leaves your device",
    "🎛️ Automatic format detection from Base64 data headers",
    "📦 Batch processing support for multiple Base64 strings",
    "🎨 High-quality image preview before downloading",
    "⚙️ Smart parsing of data URLs and pure Base64 strings",
    "📱 Handle large encoded data up to 50MB",
    "🎯 Detailed error messages for troubleshooting",
    "🔄 Download individual images or batch ZIP files",
    "🖥️ Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced parsing algorithms for corrupted data recovery",
    "📊 Real-time conversion progress and status updates",
    "💼 Professional features for developers and designers",
    "🌐 Works offline after initial page load",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. Base64.guru",
      advantages: [
        "Larger Data Limit: 50MB vs. 10MB maximum size",
        "Better Privacy: Client-side processing vs. server uploads",
        "Batch Processing: Multiple strings vs. single conversion only",
        "Better Errors: Detailed messages vs. basic error handling",
        "No Ads: Clean interface vs. advertisement distractions",
        "High-Res Preview: Full quality vs. basic small preview",
      ],
    },
    {
      title: "Toolspy vs. OnlineConvert",
      advantages: [
        "No Registration: Instant access vs. account required for features",
        "Better Privacy: Local processing vs. server-based conversion",
        "Free Features: All capabilities vs. paid tiers for full access",
        "Faster Processing: No upload time vs. server processing delays",
        "Data URL Support: Full parsing vs. limited data URL handling",
        "Clean Interface: Focused tool vs. complex website navigation",
      ],
    },
    {
      title: "Toolspy vs. Code Beautify",
      advantages: [
        "Much Larger Limit: 50MB vs. 5MB maximum data size",
        "Better Error Handling: Detailed feedback vs. limited error info",
        "Batch Support: Multiple conversions vs. single string only",
        "Higher Quality: Full-resolution preview vs. small preview images",
        "Advanced Features: Data URL parsing vs. basic Base64 only",
        "Professional Interface: Modern design vs. basic layout",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Tool Poster Image */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="relative mx-auto max-w-6xl">
            <img
              src={tool?.posterImage || ''}
              alt="Toolspy Base64 to Image Converter - Professional decoding tool with batch processing and format detection"
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
            Decode Base64 to Images – Fast, Private, Professional
          </h2>
          <p className="text-lg text-muted-foreground max-w-6xl mx-auto">
            Got Base64 encoded image data that you need to convert back to actual image files? Toolspy's Base64 to Image Converter makes it simple. Whether you're a developer working with APIs, handling data from databases, or just need to view encoded images, our tool decodes any Base64 string into high-quality image files instantly.
          </p>
          <p className="text-base text-muted-foreground max-w-6xl mx-auto mt-4">
            Our converter supports all image formats, handles both pure Base64 strings and complete data URLs, and processes everything locally in your browser for maximum privacy. No uploads, no registration, no limits – just fast, reliable Base64 to image conversion.
          </p>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          How to Convert Base64 to Images with Toolspy
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Converting your Base64 data to images is straightforward:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">1. Paste Base64 Data</h4>
            <p className="text-sm text-muted-foreground">
              Copy and paste your Base64 string or data URL. You can add multiple strings for batch processing.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">2. Auto Format Detection</h4>
            <p className="text-sm text-muted-foreground">
              Our tool automatically detects the image format from your Base64 data and prepares the conversion.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">3. Preview Results</h4>
            <p className="text-sm text-muted-foreground">
              See high-quality previews of your decoded images to verify they converted correctly.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">4. Download Images</h4>
            <p className="text-sm text-muted-foreground">
              Download individual images or get all converted files in a convenient ZIP archive.
            </p>
          </Card>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Supported Image Formats
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Our converter automatically detects and supports all major image formats from Base64 data.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportedFormats.map((format, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{format.format}</h4>
                  <Badge variant="outline" className="text-xs">
                    {format.mimeType}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {format.description}
                </p>
                <p className="text-xs font-medium text-primary">
                  {format.useCase}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Toolspy's Base64 Decoder Rocks
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's what makes our tool special and why developers and designers love using it.
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
          Everything You Get with Our Base64 Decoder
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          All the features you need for professional Base64 to image conversion, completely free.
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
          Why Choose Toolspy Over Other Base64 Decoders
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's how we compare to other popular Base64 to image conversion tools.
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
            <CardTitle>Toolspy vs. Leading Base64 Decoders</CardTitle>
            <CardDescription>
              Comprehensive comparison of features and capabilities across popular Base64 to image conversion tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Feature</th>
                    <th className="text-left p-3 font-medium">Toolspy</th>
                    <th className="text-left p-3 font-medium">Base64.guru</th>
                    <th className="text-left p-3 font-medium">OnlineConvert</th>
                    <th className="text-left p-3 font-medium">Code Beautify</th>
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
                        {row.base64guru}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.onlineconvert}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.codebeautify}
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
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-center mb-6">
            Convert Base64 to Image Files Instantly
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground leading-relaxed">
              Need to <strong>convert Base64 to image</strong> files? Working with encoded data that you need to <strong>decode Base64 to image</strong> format? Toolspy's converter makes it simple. Whether you need to <strong>Base64 to PNG</strong>, <strong>Base64 to JPEG</strong>, or any other image format, our tool handles all conversions with professional accuracy and complete privacy.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Our advanced decoder can <strong>convert Base64 string to image</strong> in seconds, supporting data URLs and pure Base64 strings. Developers love our tool for <strong>Base64 image decoder</strong> functionality, while designers appreciate the high-quality previews and batch processing capabilities. Unlike other tools, we handle large encoded data up to 50MB.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Whether you're extracting images from APIs, databases, or web applications, our <strong>Base64 to image converter</strong> processes everything locally in your browser. Your encoded data never leaves your device, ensuring complete privacy. From simple <strong>decode Base64 image</strong> tasks to complex batch conversions, we make it fast and secure.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Try our Base64 decoder today and see why thousands of developers and designers choose Toolspy for their encoding needs. From <strong>Base64 decode image</strong> tasks to professional data conversion, we deliver reliable results every time.
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
          Everything you need to know about Base64 to image conversion with Toolspy.
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
      <RelatedTools 
        currentToolSlug="base64-to-image"
        title="More Encoding & Decoding Tools"
        description="Complete your data conversion workflow with these complementary tools."
      />

      {/* Final CTA Section */}
      <section className="space-y-6">
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Decode Your Base64 Data?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Join thousands of developers who use Toolspy every day to convert Base64 data to images. It's free, fast, and your data stays private on your device.
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