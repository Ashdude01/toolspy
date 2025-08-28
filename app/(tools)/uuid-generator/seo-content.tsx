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
  Lock,
  Hash,
  Copy,
  Download,
  Eye,
  FileText,
  Fingerprint,
  Database,
  Key,
  Cpu,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function UUIDGeneratorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("uuid-generator");

  const comparisonData = [
    {
      feature: "UUID Versions",
      toolspy: "All 5 versions",
      uuidgenerator: "3 versions",
      randomuuid: "2 versions",
      uuidtools: "4 versions",
      toolspyStatus: "excellent",
    },
    {
      feature: "Generation Speed",
      toolspy: "Instant generation",
      uuidgenerator: "Server delays",
      randomuuid: "Slow processing",
      uuidtools: "Variable speed",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      uuidgenerator: "⚠️ Server-based",
      randomuuid: "⚠️ Server-based",
      uuidtools: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Generation",
      toolspy: "✅ Unlimited batches",
      uuidgenerator: "⚠️ Limited batches",
      randomuuid: "❌ Single generation",
      uuidtools: "⚠️ Small batches",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      uuidgenerator: "✅ Free",
      randomuuid: "✅ Free",
      uuidtools: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Options",
      toolspy: "✅ Multiple formats",
      uuidgenerator: "⚠️ Copy only",
      randomuuid: "❌ No export",
      uuidtools: "⚠️ Basic export",
      toolspyStatus: "excellent",
    },
    {
      feature: "Format Options",
      toolspy: "✅ All formats",
      uuidgenerator: "⚠️ Limited formats",
      randomuuid: "❌ Single format",
      uuidtools: "⚠️ Basic formats",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      uuidgenerator: "❌ Ad-heavy",
      randomuuid: "❌ Ad-heavy",
      uuidtools: "❌ Ad-heavy",
      toolspyStatus: "excellent",
    },
  ];

  const uuidVersions = [
    {
      version: "UUID v1",
      description: "Time-based UUID with MAC address",
      useCase: "Distributed systems, temporal ordering",
      uniqueness: "Time + MAC address",
      format: "xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx",
    },
    {
      version: "UUID v3",
      description: "MD5 hash-based UUID with namespace",
      useCase: "Name-based UUIDs, deterministic generation",
      uniqueness: "Namespace + name hash",
      format: "xxxxxxxx-xxxx-3xxx-yxxx-xxxxxxxxxxxx",
    },
    {
      version: "UUID v4",
      description: "Random UUID with cryptographically secure random",
      useCase: "General purpose, unique identifiers",
      uniqueness: "Random generation",
      format: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
    },
    {
      version: "UUID v5",
      description: "SHA-1 hash-based UUID with namespace",
      useCase: "Name-based UUIDs, deterministic generation",
      uniqueness: "Namespace + name hash",
      format: "xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx",
    },
    {
      version: "UUID v6",
      description: "Time-ordered UUID with random data",
      useCase: "Database primary keys, temporal ordering",
      uniqueness: "Time + random data",
      format: "xxxxxxxx-xxxx-6xxx-yxxx-xxxxxxxxxxxx",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's UUID generator completely free to use?",
      answer:
        "Yes, our professional UUID generator is completely free with no hidden costs, registration requirements, or usage limitations. You can generate unlimited UUIDs without any restrictions. Unlike many competitors who have generation limits or require paid subscriptions for advanced features, Toolspy provides all UUID generation capabilities free of charge.",
    },
    {
      question: "How secure is the UUID generation process?",
      answer:
        "Absolutely secure! Our UUID generator uses client-side processing, meaning your UUIDs are generated directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your generated UUIDs never leave your device, making it safer than server-based generators that could potentially log or store your UUIDs.",
    },
    {
      question: "What is the difference between UUID v1, v4, and v5?",
      answer:
        "UUID v1 is time-based with MAC address, good for temporal ordering but reveals device information. UUID v4 is completely random and most commonly used for general purposes. UUID v5 is name-based using SHA-1 hash, deterministic for the same input. Our tool supports all UUID versions, allowing you to choose the appropriate one for your specific use case.",
    },
    {
      question: "Can I generate UUIDs in different formats?",
      answer:
        "Yes! Our UUID generator supports multiple output formats including standard format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx), compact format (xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx), uppercase, lowercase, and custom separators. You can also generate UUIDs with or without braces and choose your preferred formatting style.",
    },
    {
      question: "How many UUIDs can I generate at once?",
      answer:
        "Our tool supports unlimited batch generation. You can generate 1, 10, 100, 1000, or any number of UUIDs you need. The tool processes them instantly in your browser with no server delays. This is perfect for bulk operations, database seeding, or generating large sets of unique identifiers.",
    },
    {
      question: "Why choose Toolspy over other free UUID generators like UUIDGenerator.net or RandomUUID.com?",
      answer:
        "Toolspy offers professional-grade features like all 5 UUID versions, client-side processing for privacy, unlimited batch generation, multiple formats, and real-time generation. Many competitors like UUIDGenerator.net and RandomUUID.com have limited versions, use server-based processing, or lack advanced features. Our tool provides better privacy protection, more options, and superior functionality completely free.",
    },
    {
      question: "How fast is the UUID generation?",
      answer:
        "Our UUID generator provides instant results for any number of UUIDs. Since all processing happens in your browser, there are no server delays or upload times. You can generate thousands of UUIDs in milliseconds, making it perfect for high-volume applications, testing, or bulk operations.",
    },
    {
      question: "Can I use UUIDs for database primary keys?",
      answer:
        "Yes! UUIDs are excellent for database primary keys, especially UUID v4 for random distribution or UUID v6 for time-ordered keys. Our tool generates cryptographically secure UUIDs that are globally unique, making them perfect for distributed databases, microservices, and systems requiring unique identifiers across multiple servers.",
    },
    {
      question: "What are the security implications of different UUID versions?",
      answer:
        "UUID v1 reveals timestamp and MAC address information, which could be a privacy concern. UUID v4 is completely random and secure for most applications. UUID v3 and v5 are deterministic but require careful namespace management. UUID v6 provides time ordering without MAC address exposure. Choose based on your security and uniqueness requirements.",
    },
    {
      question: "Is it safe to use online UUID generators?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your UUIDs are generated locally in your browser and never transmitted to our servers. This eliminates the risk of UUIDs being logged, stored, or intercepted. Unlike server-based generators, our tool provides complete privacy and security for your UUID generation process.",
    },
  ];

  const benefits = [
    {
      icon: <Fingerprint className="h-6 w-6" />,
      title: "All UUID Versions",
      description:
        "Support for UUID v1, v3, v4, v5, and v6 with different generation methods.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Generation",
      description:
        "Real-time UUID generation with no server delays or upload requirements.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your UUIDs never leave your device, providing maximum security.",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Unlimited Batch Generation",
      description:
        "Generate 1, 10, 100, 1000, or any number of UUIDs simultaneously.",
    },
  ];

  const keyBenefits = [
    "🔒 All 5 UUID versions: v1, v3, v4, v5, and v6",
    "⚡ Instant generation with no server delays or uploads",
    "🔒 Complete privacy protection - UUIDs never leave your device",
    "📦 Unlimited batch generation for bulk operations",
    "🔧 Multiple output formats and customizations",
    "📊 Real-time generation and validation",
    "📋 Multiple export formats and copy options",
    "🎯 Professional-grade UUID algorithms",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 UUID validation and format checking",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
    "🔐 Cryptographically secure random generation",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. UUIDGenerator.net",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "More Versions: All 5 versions vs. 3 versions",
        "Unlimited Batches: No limits vs. limited batches",
        "Multiple Formats: All formats vs. limited formats",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Better Export: Multiple formats vs. copy only",
      ],
    },
    {
      title: "Toolspy vs. RandomUUID.com",
      advantages: [
        "More Versions: All 5 versions vs. 2 versions",
        "Better Privacy: No data transmission vs. server-based",
        "Batch Generation: Unlimited vs. single generation",
        "Faster Processing: Instant vs. slow processing",
        "Real-time Generation: Immediate results vs. delays",
        "Professional Features: Advanced options vs. basic generation",
      ],
    },
    {
      title: "Toolspy vs. UUIDTools.com",
      advantages: [
        "More Versions: All 5 versions vs. 4 versions",
        "Better Privacy: Client-side vs. server-based processing",
        "Unlimited Batches: No limits vs. small batches",
        "Multiple Formats: All formats vs. basic formats",
        "Export Options: Multiple formats vs. basic export",
        "Clean Interface: No ads vs. ad-heavy experience",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="uuid-generator"
        title="Similar Tools You Might Like"
        description="Check out our other generation and utility tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Generate UUIDs – Professional & Secure
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional UUID generator with all 5 versions, instant processing, 
            and complete privacy protection. Perfect for developers, database administrators, 
            and anyone needing unique identifiers.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our UUID Generator</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to generate secure UUIDs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Choose UUID Version</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Select your preferred UUID version: v1 (time-based), v4 (random), 
              v5 (name-based), or others. Each has different characteristics and use cases.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Set Generation Options</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Choose quantity, format (standard, compact, uppercase), and any specific 
              requirements for your UUIDs.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Generate & Copy</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Generate your UUIDs and view them instantly. Copy individual UUIDs 
              or export the entire batch in your preferred format.
            </p>
          </Card>
        </div>
      </section>

      {/* UUID Versions Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">UUID Versions & Use Cases</h3>
          <p className="text-muted-foreground">
            Choose the right UUID version for your specific needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {uuidVersions.map((version, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Key className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{version.version}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{version.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Use Case:</strong> {version.useCase}</div>
                <div><strong>Uniqueness:</strong> {version.uniqueness}</div>
                <div><strong>Format:</strong> {version.format}</div>
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
            See how our UUID generator outperforms other free tools
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
                    <th className="text-center p-4 font-semibold">UUIDGenerator.net</th>
                    <th className="text-center p-4 font-semibold">RandomUUID.com</th>
                    <th className="text-center p-4 font-semibold">UUIDTools.com</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.uuidgenerator}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.randomuuid}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.uuidtools}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's UUID Generator?</h3>
          <p className="text-muted-foreground">
            Professional features that make UUID generation secure and effortless
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
            See why developers choose our UUID generator
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
            Everything you need to know about UUID generation
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about UUID generation"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for UUID generation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Database className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Database Keys</h4>
            <p className="text-sm text-muted-foreground">
              Generate unique primary keys for distributed databases and microservices
            </p>
          </Card>

          <Card className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">API Development</h4>
            <p className="text-sm text-muted-foreground">
              Create unique identifiers for API endpoints, sessions, and transactions
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Cpu className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">System Integration</h4>
            <p className="text-sm text-muted-foreground">
              Generate unique IDs for system integration, data synchronization, and tracking
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Download className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Testing & Development</h4>
            <p className="text-sm text-muted-foreground">
              Create test data, mock objects, and development environments with unique IDs
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Generate UUIDs?</h3>
        <p className="text-muted-foreground">
          Start using our professional UUID generator now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try UUID Generator Now
        </Button>
      </section>
    </div>
  );
}
