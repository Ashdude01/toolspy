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
  Palette,
  Pipette,
  Copy,
  Download,
  Palette as PaletteIcon,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function ColorPickerSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("color-picker");

  const comparisonData = [
    {
      feature: "Color Formats",
      toolspy: "✅ All formats",
      colorpicker: "⚠️ Basic formats",
      coolors: "✅ Most formats",
      adobe: "❌ Limited",
      toolspyStatus: "excellent",
    },
    {
      feature: "Eye Dropper",
      toolspy: "✅ Screen picker",
      colorpicker: "❌ No dropper",
      coolors: "❌ No dropper",
      adobe: "✅ Screen picker",
      toolspyStatus: "excellent",
    },
    {
      feature: "Color History",
      toolspy: "✅ Unlimited history",
      colorpicker: "⚠️ Limited history",
      coolors: "✅ Good history",
      adobe: "❌ No history",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      colorpicker: "⚠️ Server-based",
      coolors: "⚠️ Server-based",
      adobe: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      colorpicker: "✅ Free",
      coolors: "✅ Free",
      adobe: "❌ Account required",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Options",
      toolspy: "✅ Multiple formats",
      colorpicker: "⚠️ Copy only",
      coolors: "✅ Multiple formats",
      adobe: "❌ Limited export",
      toolspyStatus: "excellent",
    },
    {
      feature: "Accessibility",
      toolspy: "✅ WCAG compliant",
      colorpicker: "❌ No accessibility",
      coolors: "⚠️ Basic accessibility",
      adobe: "✅ WCAG compliant",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      colorpicker: "❌ Ad-heavy",
      coolors: "⚠️ Some ads",
      adobe: "✅ Clean interface",
      toolspyStatus: "excellent",
    },
  ];

  const colorFormats = [
    {
      format: "HEX",
      description: "Hexadecimal color codes",
      useCase: "Web development, CSS, HTML",
      example: "#FF5733",
      features: "6-digit hex codes, web standard",
    },
    {
      format: "RGB",
      description: "Red, Green, Blue values",
      useCase: "Digital design, programming",
      example: "rgb(255, 87, 51)",
      features: "0-255 range, additive color",
    },
    {
      format: "HSL",
      description: "Hue, Saturation, Lightness",
      useCase: "Color theory, design",
      example: "hsl(12, 100%, 60%)",
      features: "Intuitive color control",
    },
    {
      format: "CMYK",
      description: "Cyan, Magenta, Yellow, Key",
      useCase: "Print design, professional printing",
      example: "cmyk(0, 66, 80, 0)",
      features: "Print-optimized colors",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's color picker completely free to use?",
      answer:
        "Yes, our professional color picker is completely free with no hidden costs, registration requirements, or usage limitations. You can pick unlimited colors without any restrictions. Unlike many competitors who require paid subscriptions for advanced features or add watermarks, Toolspy provides all color picking capabilities free of charge.",
    },
    {
      question: "What color formats does the tool support?",
      answer:
        "Our color picker supports all major color formats including HEX, RGB, HSL, CMYK, and more. You can view colors in multiple formats simultaneously, copy values in any format, and convert between formats instantly. The tool also provides color names, accessibility information, and export options for professional use.",
    },
    {
      question: "How secure is the color picking process?",
      answer:
        "Absolutely secure! Our color picker uses client-side processing, meaning your color selections are processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your color choices never leave your device, making it safer than server-based color pickers.",
    },
    {
      question: "Can I pick colors from my screen?",
      answer:
        "Yes! Our color picker includes an advanced eye dropper tool that allows you to pick colors directly from your screen. Simply click the eye dropper icon and click anywhere on your screen to capture the exact color. This is perfect for matching colors from websites, images, or other applications.",
    },
    {
      question: "How does the color history feature work?",
      answer:
        "Our color picker automatically saves your recently selected colors in a convenient history panel. You can access previously picked colors, copy them again, or use them as a starting point for new color selections. The history is stored locally in your browser for privacy and convenience.",
    },
    {
      question: "Why choose Toolspy over other free color pickers like ColorPicker.com or Coolors?",
      answer:
        "Toolspy offers professional-grade features like screen color picking, unlimited color history, multiple export formats, and client-side processing for privacy. Many competitors like ColorPicker.com and Coolors lack these advanced features or have limited functionality. Our tool provides better privacy protection, more color formats, and superior user experience completely free.",
    },
    {
      question: "Can I export my selected colors?",
      answer:
        "Yes! Our color picker supports multiple export options including copying individual color values, exporting color palettes, and downloading color schemes. You can export colors in various formats like HEX, RGB, HSL, and more. The tool also provides CSS code snippets for web developers.",
    },
    {
      question: "How does the accessibility feature work?",
      answer:
        "Our color picker includes built-in accessibility features that check color contrast ratios and provide WCAG compliance information. The tool automatically calculates contrast ratios between colors and indicates whether they meet accessibility standards for text readability. This is essential for creating inclusive designs.",
    },
    {
      question: "Can I create and save color palettes?",
      answer:
        "Yes! Our color picker allows you to create custom color palettes by selecting multiple colors and organizing them into cohesive schemes. You can save palettes locally, export them in various formats, and use them for design projects. The tool also provides predefined color schemes for inspiration.",
    },
    {
      question: "What's the difference between RGB and HSL color formats?",
      answer:
        "RGB (Red, Green, Blue) uses additive color mixing with values from 0-255 for each channel. HSL (Hue, Saturation, Lightness) uses a more intuitive approach where hue represents the color wheel position (0-360°), saturation controls color intensity (0-100%), and lightness controls brightness (0-100%). HSL is often easier for designers to work with.",
    },
  ];

  const benefits = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "All Color Formats",
      description:
        "Support for HEX, RGB, HSL, CMYK, and all major color formats with instant conversion.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Screen Color Picker",
      description:
        "Advanced eye dropper tool to pick colors directly from your screen with pixel-perfect accuracy.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your color selections never leave your device, providing maximum security.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Features",
      description:
        "Color history, accessibility checking, palette creation, and multiple export options for professional use.",
    },
  ];

  const keyBenefits = [
    "🎨 All color formats: HEX, RGB, HSL, CMYK, and more",
    "👁️ Screen color picker with eye dropper tool",
    "🔒 Complete privacy protection - colors never leave your device",
    "📋 Unlimited color history with easy access",
    "♿ Accessibility checking with WCAG compliance",
    "📊 Multiple export formats and CSS code generation",
    "🎯 Professional-grade color selection algorithms",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "📈 Color palette creation and management",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
    "🔍 Pixel-perfect color accuracy",
    "📝 Copy color values in any format instantly",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. ColorPicker.com",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "Screen Picker: Eye dropper tool vs. no screen picking",
        "More Formats: All color formats vs. basic formats only",
        "Better History: Unlimited history vs. limited history",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Accessibility: WCAG compliance vs. no accessibility features",
      ],
    },
    {
      title: "Toolspy vs. Coolors",
      advantages: [
        "No Registration: Instant access vs. account requirements",
        "Faster Processing: No upload time vs. server processing",
        "Better Privacy: No data transmission vs. server-based",
        "Screen Picker: Eye dropper tool vs. no screen picking",
        "Unlimited History: No restrictions vs. limited history",
        "Clean Interface: No ads vs. some advertisements",
      ],
    },
    {
      title: "Toolspy vs. Adobe Color",
      advantages: [
        "No Registration: Free access vs. account required",
        "Better Privacy: Client-side vs. server-based processing",
        "More Formats: All color formats vs. limited formats",
        "Unlimited History: No restrictions vs. limited history",
        "No Subscription: Completely free vs. paid features",
        "Instant Access: No login vs. account creation required",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="color-picker"
        title="Similar Tools You Might Like"
        description="Check out our other design and color tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Pick Colors – Professional & Accurate
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional color picker with screen color selection, multiple formats, 
            and accessibility features. Perfect for designers, developers, 
            and anyone working with colors.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our Color Picker</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to pick colors with professional accuracy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Choose Selection Method</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Use the color wheel, sliders, or eye dropper tool to select your desired color. 
              The eye dropper allows you to pick colors directly from your screen.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">View Color Values</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              See your selected color in multiple formats: HEX, RGB, HSL, CMYK, and more. 
              All values update in real-time as you adjust the color.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Copy & Export</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Copy color values in any format, save to color history, or export 
              color palettes for use in your design projects.
            </p>
          </Card>
        </div>
      </section>

      {/* Color Formats Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Supported Color Formats</h3>
          <p className="text-muted-foreground">
            Comprehensive support for all major color formats
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {colorFormats.map((format, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <PaletteIcon className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{format.format}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{format.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Use Case:</strong> {format.useCase}</div>
                <div><strong>Example:</strong> {format.example}</div>
                <div><strong>Features:</strong> {format.features}</div>
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
            See how our color picker outperforms other free tools
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
                    <th className="text-center p-4 font-semibold">ColorPicker.com</th>
                    <th className="text-center p-4 font-semibold">Coolors</th>
                    <th className="text-center p-4 font-semibold">Adobe Color</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.colorpicker}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.coolors}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.adobe}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's Color Picker?</h3>
          <p className="text-muted-foreground">
            Professional features that make color picking effortless
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
            See why designers choose our color picker
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
            Everything you need to know about color picking
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about color picking"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for color picking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Palette className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Web Design</h4>
            <p className="text-sm text-muted-foreground">
              Pick colors from websites, match brand colors, and create cohesive color schemes
            </p>
          </Card>

                     <Card className="p-6 text-center">
             <Pipette className="h-8 w-8 mx-auto mb-4 text-primary" />
             <h4 className="font-semibold mb-2">Graphic Design</h4>
             <p className="text-sm text-muted-foreground">
               Extract colors from images, create palettes, and ensure color consistency
             </p>
           </Card>

          <Card className="p-6 text-center">
            <Copy className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Development</h4>
            <p className="text-sm text-muted-foreground">
              Get color values for CSS, generate color codes, and implement design systems
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Download className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Branding</h4>
            <p className="text-sm text-muted-foreground">
              Match brand colors, create color palettes, and maintain brand consistency
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Pick Colors?</h3>
        <p className="text-muted-foreground">
          Start using our professional color picker now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try Color Picker Now
        </Button>
      </section>
    </div>
  );
} 