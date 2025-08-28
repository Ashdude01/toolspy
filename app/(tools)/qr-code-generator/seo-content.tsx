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
  QrCode,
  Smartphone,
  Download,
  Palette,
  Share2,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function QrCodeGeneratorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("qr-code-generator");

  const comparisonData = [
    {
      feature: "QR Code Types",
      toolspy: "✅ All types",
      qrcodegenerator: "⚠️ Basic only",
      "qrcode-monkey": "✅ Most types",
      goqr: "❌ Limited",
      toolspyStatus: "excellent",
    },
    {
      feature: "Customization",
      toolspy: "✅ Full customization",
      qrcodegenerator: "❌ Basic colors",
      "qrcode-monkey": "✅ Good customization",
      goqr: "⚠️ Limited options",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Quality",
      toolspy: "✅ High resolution",
      qrcodegenerator: "⚠️ Medium quality",
      "qrcode-monkey": "✅ High quality",
      goqr: "❌ Low quality",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      qrcodegenerator: "⚠️ Server-based",
      "qrcode-monkey": "⚠️ Server-based",
      goqr: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      qrcodegenerator: "✅ Free",
      "qrcode-monkey": "✅ Free",
      goqr: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Formats",
      toolspy: "✅ All formats",
      qrcodegenerator: "⚠️ PNG only",
      "qrcode-monkey": "✅ Multiple formats",
      goqr: "❌ Limited formats",
      toolspyStatus: "excellent",
    },
    {
      feature: "Error Correction",
      toolspy: "✅ All levels",
      qrcodegenerator: "⚠️ Basic levels",
      "qrcode-monkey": "✅ All levels",
      goqr: "❌ No control",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Watermarks",
      toolspy: "✅ Clean QR codes",
      qrcodegenerator: "❌ Watermarks",
      "qrcode-monkey": "⚠️ Some watermarks",
      goqr: "❌ Watermarks",
      toolspyStatus: "excellent",
    },
  ];

  const qrCodeTypes = [
    {
      type: "URL QR Code",
      description: "Link to websites and web pages",
      useCase: "Business cards, marketing materials, social media",
      features: "Direct website access, analytics tracking",
      example: "https://example.com",
    },
    {
      type: "Text QR Code",
      description: "Display plain text or messages",
      useCase: "Contact information, notes, instructions",
      features: "Simple text display, no internet required",
      example: "Hello, this is a text message",
    },
    {
      type: "Email QR Code",
      description: "Pre-filled email with subject and body",
      useCase: "Contact forms, customer service, feedback",
      features: "Auto-fill email client, professional communication",
      example: "mailto:contact@example.com?subject=Inquiry",
    },
    {
      type: "Phone QR Code",
      description: "Direct phone number dialing",
      useCase: "Business cards, contact information, emergency contacts",
      features: "One-tap calling, international support",
      example: "tel:+1234567890",
    },
    {
      type: "WiFi QR Code",
      description: "Connect to WiFi networks automatically",
      useCase: "Home networks, business WiFi, guest access",
      features: "Auto-connect, password sharing, network details",
      example: "WIFI:S:NetworkName;T:WPA;P:Password123;;",
    },
    {
      type: "SMS QR Code",
      description: "Pre-filled text message",
      useCase: "Marketing campaigns, customer support, notifications",
      features: "Auto-fill message, quick communication",
      example: "sms:+1234567890:Hello from Toolspy",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's QR code generator completely free to use?",
      answer:
        "Yes, our professional QR code generator is completely free with no hidden costs, registration requirements, or usage limitations. You can create unlimited QR codes without any restrictions. Unlike many competitors who add watermarks or require paid subscriptions for advanced features, Toolspy provides all QR code generation capabilities free of charge.",
    },
    {
      question: "What types of QR codes can I create?",
      answer:
        "Our QR code generator supports all major QR code types including URLs, text, email, phone numbers, WiFi networks, SMS messages, vCard contacts, and more. You can create QR codes for websites, contact information, WiFi passwords, payment information, and any other data you want to share quickly and easily.",
    },
    {
      question: "How secure is the data I use to create QR codes?",
      answer:
        "Absolutely secure! Our QR code generator uses client-side processing, meaning your data is processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security for your sensitive information. Your data never leaves your device, making it safer than server-based QR code generators.",
    },
    {
      question: "Can I customize the appearance of my QR codes?",
      answer:
        "Yes! Our QR code generator offers extensive customization options including colors, logo placement, corner styles, and background customization. You can create branded QR codes that match your business identity, add your company logo, and choose from various color schemes. The tool also supports different error correction levels for optimal scanning reliability.",
    },
    {
      question: "What export formats are available for QR codes?",
      answer:
        "Our tool supports multiple export formats including PNG, SVG, PDF, and EPS. PNG is perfect for web use and digital sharing, SVG is ideal for scalable graphics, PDF is great for printing and documentation, and EPS is perfect for professional design work. All formats maintain high quality and are suitable for both digital and print use.",
    },
    {
      question: "Why choose Toolspy over other free QR code generators like QRCode-Generator.com or QRCode-Monkey?",
      answer:
        "Toolspy offers professional-grade features like unlimited QR code generation, high-resolution exports, extensive customization options, and client-side processing for privacy. Many competitors like QRCode-Generator.com and QRCode-Monkey add watermarks, have limited customization, or require server processing. Our tool provides better privacy protection, more customization options, and superior export quality completely free.",
    },
    {
      question: "How do I ensure my QR codes scan reliably?",
      answer:
        "Our QR code generator automatically optimizes for reliable scanning by using appropriate error correction levels and ensuring proper contrast. For best results, use high contrast colors (dark QR code on light background), choose appropriate error correction levels based on your customization needs, and test your QR codes with multiple scanning apps before widespread use.",
    },
    {
      question: "Can I create QR codes for WiFi networks?",
      answer:
        "Yes! Our WiFi QR code generator allows you to create QR codes that automatically connect devices to WiFi networks. Simply enter your network name (SSID), select the security type (WPA, WEP, or open), and enter the password. When scanned, the QR code will automatically connect the device to your WiFi network without manually entering credentials.",
    },
    {
      question: "What's the difference between error correction levels?",
      answer:
        "Error correction levels determine how much of the QR code can be damaged or obscured while still remaining scannable. Low (L) allows 7% damage, Medium (M) allows 15% damage, Quartile (Q) allows 25% damage, and High (H) allows 30% damage. Higher levels are better for customized QR codes with logos or colors, while lower levels create smaller, cleaner QR codes.",
    },
    {
      question: "Can I track QR code scans and analytics?",
      answer:
        "For URL QR codes, you can track scans by using URL shorteners with analytics or by creating QR codes that redirect through tracking services. Our tool generates clean, direct QR codes, but you can combine them with third-party tracking services for analytics. For other QR code types, tracking depends on the scanning app and device capabilities.",
    },
  ];

  const benefits = [
    {
      icon: <QrCode className="h-6 w-6" />,
      title: "All QR Code Types",
      description:
        "Support for URLs, text, email, phone, WiFi, SMS, vCard, and all major QR code formats.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Generation",
      description:
        "Real-time QR code generation with live preview and instant customization options.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your data never leaves your device, providing maximum security.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Full Customization",
      description:
        "Customize colors, logos, corner styles, and error correction levels for professional results.",
    },
  ];

  const keyBenefits = [
    "📱 All QR code types: URL, text, email, phone, WiFi, SMS, vCard",
    "⚡ Instant generation with real-time preview",
    "🔒 Complete privacy protection - data never leaves your device",
    "🎨 Full customization: colors, logos, corner styles, error correction",
    "📊 High-resolution exports: PNG, SVG, PDF, EPS formats",
    "🔍 Multiple error correction levels for optimal scanning",
    "📋 No watermarks or branding on generated QR codes",
    "🔄 Unlimited QR code generation with no restrictions",
    "🎯 Professional-grade generation algorithms",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "📈 Business-ready QR codes for marketing and branding",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. QRCode-Generator.com",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "No Watermarks: Clean QR codes vs. branded watermarks",
        "More Types: All QR code types vs. basic types only",
        "Better Customization: Full options vs. limited colors",
        "Higher Quality: High-resolution exports vs. medium quality",
        "No Ads: Clean interface vs. ad-heavy layout",
      ],
    },
    {
      title: "Toolspy vs. QRCode-Monkey",
      advantages: [
        "No Registration: Instant access vs. account requirements",
        "Faster Processing: No upload time vs. server processing",
        "Better Privacy: No data transmission vs. server-based",
        "More Formats: All export formats vs. limited options",
        "Unlimited Generation: No restrictions vs. usage limits",
        "Clean Interface: No watermarks vs. some branding",
      ],
    },
    {
      title: "Toolspy vs. GoQR.me",
      advantages: [
        "More Types: All QR code types vs. limited options",
        "Better Customization: Full options vs. basic customization",
        "Higher Quality: High-resolution exports vs. low quality",
        "Better Privacy: Client-side vs. server-based processing",
        "More Formats: All export formats vs. limited formats",
        "Professional Features: Advanced options vs. basic generator",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="qr-code-generator"
        title="Similar Tools You Might Like"
        description="Check out our other generation and conversion tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Generate QR Codes – Professional & Free
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional QR code generator with full customization, high-resolution exports, 
            and support for all QR code types. Perfect for businesses, marketers, 
            and anyone needing to share information quickly.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How to Use Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">How to Use Our QR Code Generator</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to create professional QR codes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Choose QR Code Type</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Select the type of QR code you want to create: URL, text, email, 
              phone, WiFi, SMS, or other supported formats.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Enter Your Data</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Input your information in the appropriate fields. The generator 
              provides real-time preview as you type with instant validation.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Customize & Export</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Customize colors, add logos, adjust error correction, then 
              download in PNG, SVG, PDF, or EPS format.
            </p>
          </Card>
        </div>
      </section>

      {/* QR Code Types Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">QR Code Types & Use Cases</h3>
          <p className="text-muted-foreground">
            Comprehensive support for all QR code applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {qrCodeTypes.map((type, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <QrCode className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{type.type}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Use Case:</strong> {type.useCase}</div>
                <div><strong>Features:</strong> {type.features}</div>
                <div><strong>Example:</strong> {type.example}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Toolspy vs. Competitors</h3>
          <p className="text-muted-foreground">
            See how our QR code generator outperforms other free tools
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">Toolspy</th>
                    <th className="text-center p-4 font-semibold">QRCode-Generator</th>
                    <th className="text-center p-4 font-semibold">QRCode-Monkey</th>
                    <th className="text-center p-4 font-semibold">GoQR.me</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center">
                        <Badge variant={row.toolspyStatus === "excellent" ? "default" : "secondary"}>
                          {row.toolspy}
                        </Badge>
                      </td>
                      <td className="p-4 text-center text-muted-foreground">{row.qrcodegenerator}</td>
                      <td className="p-4 text-center text-muted-foreground">{row["qrcode-monkey"]}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.goqr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Key Benefits List */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's QR Code Generator?</h3>
          <p className="text-muted-foreground">
            Professional features that make QR code generation effortless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyBenefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Competitor Advantages */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Toolspy Advantages Over Competitors</h3>
          <p className="text-muted-foreground">
            See why businesses choose our QR code generator
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {competitorAdvantages.map((comparison, index) => (
            <Card key={index} className="p-6">
              <h4 className="font-semibold mb-4 text-center">{comparison.title}</h4>
              <ul className="space-y-2">
                {comparison.advantages.map((advantage, advIndex) => (
                  <li key={advIndex} className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{advantage}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Frequently Asked Questions</h3>
          <p className="text-muted-foreground">
            Everything you need to know about QR code generation
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about QR code generation"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for QR code generation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Smartphone className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Business Cards</h4>
            <p className="text-sm text-muted-foreground">
              Create QR codes linking to contact information, websites, or social media profiles
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Share2 className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Marketing Materials</h4>
            <p className="text-sm text-muted-foreground">
              Add QR codes to flyers, posters, and brochures for instant website access
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Download className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">WiFi Sharing</h4>
            <p className="text-sm text-muted-foreground">
              Generate WiFi QR codes for easy network access in homes and businesses
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Palette className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Branded QR Codes</h4>
            <p className="text-sm text-muted-foreground">
              Create custom QR codes with company logos and brand colors for professional use
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Generate QR Codes?</h3>
        <p className="text-muted-foreground">
          Start using our professional QR code generator now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try QR Code Generator Now
        </Button>
      </section>
    </div>
  );
} 