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
  Camera,
  Edit3,
  Maximize,
  RotateCcw,
  Filter,
  Upload,
} from "lucide-react";
import { getToolsByCategory } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import NextImage from "next/image";
import Link from "next/link";

export function ImageToolsSEOContent() {
  const imageTools = getToolsByCategory()['image-tools'];

  const comparisonData = [
    {
      feature: "Image Quality",
      toolspy: "✅ Professional quality",
      canva: "⚠️ Limited quality",
      photoshop: "❌ Complex interface",
      gimp: "⚠️ Steep learning curve",
      toolspyStatus: "excellent",
    },
    {
      feature: "Processing Speed",
      toolspy: "✅ Instant processing",
      canva: "⚠️ Server dependent",
      photoshop: "❌ Heavy software",
      gimp: "⚠️ Resource intensive",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      canva: "⚠️ Cloud-based",
      photoshop: "❌ Local files",
      gimp: "❌ Local files",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      canva: "⚠️ Limited free",
      photoshop: "❌ Subscription required",
      gimp: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Responsive design",
      canva: "⚠️ App required",
      photoshop: "❌ Desktop only",
      gimp: "❌ Desktop only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Format Support",
      toolspy: "✅ All major formats",
      canva: "⚠️ Limited formats",
      photoshop: "✅ All formats",
      gimp: "✅ Most formats",
      toolspyStatus: "excellent",
    },
  ];

  const imageToolTypes = [
    {
      type: "Image Compression",
      description: "Reduce file sizes while maintaining quality",
      useCase: "Web optimization, storage savings, faster loading",
      precision: "High-quality compression",
      example: "Compress images for websites and applications",
    },
    {
      type: "Image Conversion",
      description: "Convert between different image formats",
      useCase: "Format compatibility, optimization, workflow",
      precision: "Lossless conversion",
      example: "Convert PNG to JPEG or WebP",
    },
    {
      type: "Image Resizing",
      description: "Resize images to specific dimensions",
      useCase: "Social media, thumbnails, responsive design",
      precision: "Aspect ratio preservation",
      example: "Resize images for different screen sizes",
    },
    {
      type: "Base64 Encoding",
      description: "Convert images to Base64 strings",
      useCase: "Web development, data URIs, embedding",
      precision: "Secure encoding",
      example: "Embed images directly in HTML/CSS",
    },
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description: "All image processing happens in your browser - your files never leave your device.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast Processing",
      description: "Process images instantly with no uploads, downloads, or server delays.",
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: "Professional Quality",
      description: "Maintain high image quality with advanced algorithms and optimization.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Features",
      description: "Comprehensive image tools with professional-grade capabilities.",
    },
  ];

  const keyBenefits = [
    "💰 Professional image processing with complete privacy protection",
    "⚡ Instant processing with no server delays or uploads",
    "🔒 Complete privacy protection - images never leave your device",
    "📊 Multiple image tools: compression, conversion, resizing, Base64 encoding",
    "🔧 Real-time processing and instant results",
    "📊 Complete processing history and image tracking",
    "📋 Multiple export formats and copy options",
    "🎯 Professional-grade image processing capabilities",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tools requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 Precise image processing and quality control",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
    "📈 Comprehensive image analysis and optimization tools",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. Canva",
      advantages: [
        "Better Privacy: Client-side vs. cloud-based processing",
        "Better Speed: Instant vs. server-dependent processing",
        "Better Quality: Professional vs. limited quality options",
        "No Registration: Free forever vs. limited free tier",
        "Format Support: All major formats vs. limited formats",
        "Mobile Experience: Responsive design vs. app required",
      ],
    },
    {
      title: "Toolspy vs. Photoshop",
      advantages: [
        "Better Accessibility: Browser-based vs. heavy software",
        "Better Speed: Instant vs. software loading time",
        "Better Privacy: Client-side vs. local file processing",
        "No Cost: Free forever vs. subscription required",
        "Mobile Friendly: Responsive vs. desktop only",
        "Ease of Use: Simple interface vs. complex learning curve",
      ],
    },
    {
      title: "Toolspy vs. GIMP",
      advantages: [
        "Better Performance: Browser-based vs. resource intensive",
        "Better Speed: Instant vs. software startup time",
        "Better Privacy: Client-side vs. local file processing",
        "Mobile Friendly: Responsive vs. desktop only",
        "Ease of Use: Simple interface vs. steep learning curve",
        "Accessibility: No installation vs. software installation",
      ],
    },
  ];

  // Register FAQs for SEO
  registerToolFAQ("image-tools", () => [
    {
      question: "What are the best free image tools available online?",
      answer: "Toolspy offers the best free image tools including image compressor, image converter, image resizer, and Base64 encoder/decoder. All tools provide professional quality with complete privacy protection and no registration required."
    },
    {
      question: "How do I compress images without losing quality?",
      answer: "Use Toolspy's image compressor which uses advanced algorithms to reduce file size while maintaining visual quality. The tool processes images in your browser, ensuring complete privacy and instant results."
    },
    {
      question: "Can I convert images between different formats?",
      answer: "Yes! Toolspy's image converter supports all major formats including JPEG, PNG, WebP, GIF, and more. Convert between formats with lossless quality and instant processing."
    },
    {
      question: "Is it safe to use online image tools?",
      answer: "Toolspy's image tools are completely safe as all processing happens in your browser. Your images never leave your device, ensuring complete privacy and security."
    },
    {
      question: "Do I need to register to use image tools?",
      answer: "No registration required! All Toolspy image tools are completely free to use forever with no watermarks, limitations, or account creation needed."
    },
    {
      question: "Can I resize images for social media?",
      answer: "Absolutely! Use Toolspy's image resizer to create perfect dimensions for Instagram, Facebook, Twitter, and other social media platforms with aspect ratio preservation."
    },
    {
      question: "What is Base64 encoding for images?",
      answer: "Base64 encoding converts images into text strings that can be embedded directly in HTML, CSS, or JSON. Toolspy's Base64 tools make this conversion simple and secure."
    },
    {
      question: "Are these image tools mobile-friendly?",
      answer: "Yes! All Toolspy image tools are fully responsive and work perfectly on mobile devices, tablets, and desktops without requiring any app downloads."
    }
  ]);

  return (
    <div className="space-y-12 mt-16 container max-w-7xl mx-auto px-4 py-4">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="image-tools"
        title="Professional Image Tools"
        description="Discover our comprehensive suite of image processing tools designed for professionals and everyday users."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Professional Image Tools – Fast & Private
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Complete suite of professional image processing tools with complete privacy protection, 
            high-quality processing, and instant results. Perfect for web developers, 
            designers, and anyone needing professional image manipulation.
          </p>
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-left">
                <div className="space-y-4">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Our{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      professional image tools
                    </strong>{" "}
                    provide the ultimate{" "}
                    <strong className="text-purple-600 dark:text-purple-400">
                      image processing online
                    </strong>{" "}
                    for{" "}
                    <strong className="text-pink-600 dark:text-pink-400">
                      image compression
                    </strong>
                    ,{" "}
                    <strong className="text-green-600 dark:text-green-400">
                      image conversion
                    </strong>
                    ,{" "}
                    <strong className="text-orange-600 dark:text-orange-400">
                      image resizing
                    </strong>
                    , and{" "}
                    <strong className="text-red-600 dark:text-red-400">
                      Base64 encoding
                    </strong>{" "}
                    with professional quality.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      image tools suite
                    </strong>{" "}
                    is designed for both professionals and everyday users. With{" "}
                    <strong className="text-purple-600 dark:text-purple-400">
                      advanced processing technology
                    </strong>
                    ,{" "}
                    <strong className="text-pink-600 dark:text-pink-400">
                      complete privacy protection
                    </strong>
                    , and{" "}
                    <strong className="text-green-600 dark:text-green-400">
                      instant processing
                    </strong>
                    , you can{" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      process images free
                    </strong>{" "}
                    without any software installation or registration required.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-600">{imageTools.length}</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      Tools
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      Free
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="text-2xl font-bold text-purple-600">∞</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">
                      Unlimited
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <div className="text-2xl font-bold text-orange-600">0ms</div>
                    <div className="text-sm text-orange-700 dark:text-orange-300">
                      Upload
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
              <NextImage
                  width={1200}
                  height={680}
                  src="https://res.cloudinary.com/drby9raee/image/upload/Image_Tools_yxrkil.png"
                  alt="Image Processing Tools"
                  className="w-full rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 hover:scale-105 transition-transform duration-300 h-full"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
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
            How to Use Our Image Tools
          </h3>
          <p className="text-lg text-muted-foreground">
            Simple steps to process your images with professional quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300 dark:hover:border-blue-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg">1. Upload Image</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Select or drag and drop your image file. Supports all major formats.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-green-300 dark:hover:border-green-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg">2. Configure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Adjust settings like quality, dimensions, or format as needed.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-300 dark:hover:border-purple-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-lg">3. Process</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Click process and watch your image transform instantly.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-300 dark:hover:border-orange-600">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Download className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-lg">4. Download</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Download your processed image or copy to clipboard.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Image Tool Types */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Professional Image Tool Types
          </h3>
          <p className="text-lg text-muted-foreground">
            Comprehensive image processing capabilities for every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {imageToolTypes.map((tool, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300 dark:hover:border-blue-600">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <Image className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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
            Why Choose Our Image Tools?
          </h3>
          <p className="text-lg text-muted-foreground">
            Professional image processing with unmatched benefits
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
            Everything you need for professional image processing
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
            See how we compare to other image processing solutions
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
            Detailed comparison with popular image processing tools
          </p>
        </div>

        <Card className="border-2 border-indigo-200 dark:border-indigo-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600 dark:text-blue-400">Toolspy</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">Canva</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">Photoshop</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">GIMP</th>
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
                        {row.canva}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        {row.photoshop}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                        {row.gimp}
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
            Common questions about our professional image tools
          </p>
        </div>

        <FAQ
          faqs={[
            {
              question: "What are the best free image tools available online?",
              answer: "Toolspy offers the best free image tools including image compressor, image converter, image resizer, and Base64 encoder/decoder. All tools provide professional quality with complete privacy protection and no registration required."
            },
            {
              question: "How do I compress images without losing quality?",
              answer: "Use Toolspy's image compressor which uses advanced algorithms to reduce file size while maintaining visual quality. The tool processes images in your browser, ensuring complete privacy and instant results."
            },
            {
              question: "Can I convert images between different formats?",
              answer: "Yes! Toolspy's image converter supports all major formats including JPEG, PNG, WebP, GIF, and more. Convert between formats with lossless quality and instant processing."
            },
            {
              question: "Is it safe to use online image tools?",
              answer: "Toolspy's image tools are completely safe as all processing happens in your browser. Your images never leave your device, ensuring complete privacy and security."
            },
            {
              question: "Do I need to register to use image tools?",
              answer: "No registration required! All Toolspy image tools are completely free to use forever with no watermarks, limitations, or account creation needed."
            },
            {
              question: "Can I resize images for social media?",
              answer: "Absolutely! Use Toolspy's image resizer to create perfect dimensions for Instagram, Facebook, Twitter, and other social media platforms with aspect ratio preservation."
            },
            {
              question: "What is Base64 encoding for images?",
              answer: "Base64 encoding converts images into text strings that can be embedded directly in HTML, CSS, or JSON. Toolspy's Base64 tools make this conversion simple and secure."
            },
            {
              question: "Are these image tools mobile-friendly?",
              answer: "Yes! All Toolspy image tools are fully responsive and work perfectly on mobile devices, tablets, and desktops without requiring any app downloads."
            }
          ]}
        />
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Ready to Process Your Images?
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Start using our professional image tools today. No registration required, 
            completely free, and your images never leave your device.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/image-compressor">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                <Image className="mr-2 h-5 w-5" />
                Start Compressing Images
              </Button>
            </Link>
            <Link href="/image-converter">
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
