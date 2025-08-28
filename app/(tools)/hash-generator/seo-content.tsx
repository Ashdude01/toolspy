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
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function HashGeneratorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("hash-generator");

  const comparisonData = [
    {
      feature: "Hash Algorithms",
      toolspy: "15+ algorithms",
      hashgenerator: "8 algorithms",
      md5hashgenerator: "3 algorithms",
      hashcalculator: "5 algorithms",
      toolspyStatus: "excellent",
    },
    {
      feature: "Processing Speed",
      toolspy: "Instant processing",
      hashgenerator: "Server delays",
      md5hashgenerator: "Slow processing",
      hashcalculator: "Variable speed",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      hashgenerator: "⚠️ Server-based",
      md5hashgenerator: "⚠️ Server-based",
      hashcalculator: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "File Support",
      toolspy: "✅ Text & files",
      hashgenerator: "⚠️ Text only",
      md5hashgenerator: "❌ Text only",
      hashcalculator: "⚠️ Limited files",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      hashgenerator: "✅ Free",
      md5hashgenerator: "✅ Free",
      hashcalculator: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Options",
      toolspy: "✅ Multiple formats",
      hashgenerator: "⚠️ Copy only",
      md5hashgenerator: "❌ No export",
      hashcalculator: "⚠️ Basic export",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Multiple inputs",
      hashgenerator: "❌ Single input",
      md5hashgenerator: "❌ Single input",
      hashcalculator: "❌ Single input",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      hashgenerator: "❌ Ad-heavy",
      md5hashgenerator: "❌ Ad-heavy",
      hashcalculator: "❌ Ad-heavy",
      toolspyStatus: "excellent",
    },
  ];

  const hashAlgorithms = [
    {
      name: "MD5",
      description: "128-bit hash function",
      useCase: "File integrity checks, legacy systems",
      security: "Cryptographically broken",
      speed: "Very Fast",
    },
    {
      name: "SHA-1",
      description: "160-bit hash function",
      useCase: "Git version control, legacy applications",
      security: "Cryptographically broken",
      speed: "Fast",
    },
    {
      name: "SHA-256",
      description: "256-bit hash function",
      useCase: "Cryptocurrency, digital signatures",
      security: "Cryptographically secure",
      speed: "Medium",
    },
    {
      name: "SHA-512",
      description: "512-bit hash function",
      useCase: "High-security applications",
      security: "Cryptographically secure",
      speed: "Medium",
    },
    {
      name: "bcrypt",
      description: "Password hashing algorithm",
      useCase: "Password storage, authentication",
      security: "Designed for passwords",
      speed: "Slow (intentional)",
    },
    {
      name: "Argon2",
      description: "Memory-hard hash function",
      useCase: "Password hashing, key derivation",
      security: "Most secure for passwords",
      speed: "Slow (intentional)",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's hash generator completely free to use?",
      answer:
        "Yes, our professional hash generator is completely free with no hidden costs, registration requirements, or usage limitations. You can generate unlimited hashes without any restrictions. Unlike many competitors who have processing limits or require paid subscriptions for advanced features, Toolspy provides all hash generation capabilities free of charge.",
    },
    {
      question: "How secure is the hash generation process?",
      answer:
        "Absolutely secure! Our hash generator uses client-side processing, meaning your data is processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your sensitive information never leaves your device, making it safer than server-based hash generators that could potentially log or store your data.",
    },
    {
      question: "What is the difference between MD5, SHA-1, and SHA-256?",
      answer:
        "MD5 (128-bit) and SHA-1 (160-bit) are older hash functions that are cryptographically broken and should not be used for security purposes. SHA-256 (256-bit) is a modern, cryptographically secure hash function widely used in cryptocurrencies, digital signatures, and security applications. Our tool supports all major hash algorithms, allowing you to choose the appropriate one for your specific use case.",
    },
    {
      question: "Can I generate hashes from files?",
      answer:
        "Yes! Our hash generator supports both text input and file uploads. You can generate hashes from text strings, files, or even multiple files at once. The tool automatically detects file types and processes them efficiently. This is perfect for verifying file integrity, creating checksums, or generating hashes for security purposes.",
    },
    {
      question: "Which hash algorithm should I use for passwords?",
      answer:
        "For password hashing, use bcrypt or Argon2. These algorithms are specifically designed for password storage with built-in salt and adaptive cost factors. MD5, SHA-1, and SHA-256 are not suitable for password hashing as they are too fast and lack salt. Our tool includes bcrypt and Argon2 with configurable parameters for optimal password security.",
    },
    {
      question: "Why choose Toolspy over other free hash generators like HashGenerator.net or MD5HashGenerator.com?",
      answer:
        "Toolspy offers professional-grade features like 15+ hash algorithms, client-side processing for privacy, file support, batch processing, and real-time generation. Many competitors like HashGenerator.net and MD5HashGenerator.com have limited algorithms, use server-based processing, or lack advanced features. Our tool provides better privacy protection, more algorithms, and superior functionality completely free.",
    },
    {
      question: "How fast is the hash generation?",
      answer:
        "Our hash generator provides instant results for text input and fast processing for files. Since all processing happens in your browser, there are no server delays or upload times. The speed varies by algorithm - MD5 and SHA-1 are very fast, while bcrypt and Argon2 are intentionally slower for security. You'll see results immediately for most algorithms.",
    },
    {
      question: "Can I verify file integrity with the hash generator?",
      answer:
        "Yes! Our tool is perfect for file integrity verification. Generate a hash from a file, then later generate the same hash from the file again to verify it hasn't been modified. If the hashes match, the file is intact. This is commonly used for software downloads, backups, and ensuring data integrity in security applications.",
    },
    {
      question: "What are the security implications of different hash algorithms?",
      answer:
        "MD5 and SHA-1 are cryptographically broken and vulnerable to collision attacks. SHA-256 and SHA-512 are cryptographically secure and suitable for digital signatures and integrity checks. bcrypt and Argon2 are designed for password hashing with built-in salt and adaptive cost factors. Choose the algorithm based on your security requirements and use case.",
    },
    {
      question: "Is it safe to use online hash generators?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your data is processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based generators, our tool provides complete privacy and security for your hash generation process.",
    },
  ];

  const benefits = [
    {
      icon: <Hash className="h-6 w-6" />,
      title: "15+ Hash Algorithms",
      description:
        "Support for MD5, SHA-1, SHA-256, SHA-512, bcrypt, Argon2, and more algorithms.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Processing",
      description:
        "Real-time hash generation with no server delays or upload requirements.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your data never leaves your device, providing maximum security.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "File & Text Support",
      description:
        "Generate hashes from text strings, files, or multiple files simultaneously.",
    },
  ];

  const keyBenefits = [
    "🔒 15+ hash algorithms including MD5, SHA-1, SHA-256, SHA-512, bcrypt, Argon2",
    "⚡ Instant processing with no server delays or uploads",
    "🔒 Complete privacy protection - data never leaves your device",
    "📁 Support for text input and file uploads",
    "🔧 Batch processing for multiple inputs",
    "📊 Real-time hash generation and verification",
    "📋 Multiple export formats and copy options",
    "🎯 Professional-grade hash algorithms",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 File integrity verification capabilities",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
    "🔐 Cryptographically secure hash generation",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. HashGenerator.net",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "More Algorithms: 15+ vs. 8 algorithms",
        "File Support: Text & files vs. text only",
        "Batch Processing: Multiple inputs vs. single input",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Better Export: Multiple formats vs. copy only",
      ],
    },
    {
      title: "Toolspy vs. MD5HashGenerator.com",
      advantages: [
        "More Algorithms: 15+ vs. 3 algorithms",
        "Better Privacy: No data transmission vs. server-based",
        "File Support: Full file support vs. text only",
        "Faster Processing: Instant vs. slow processing",
        "Real-time Generation: Immediate results vs. delays",
        "Professional Features: Advanced options vs. basic generation",
      ],
    },
    {
      title: "Toolspy vs. HashCalculator.com",
      advantages: [
        "More Algorithms: 15+ vs. 5 algorithms",
        "Better Privacy: Client-side vs. server-based processing",
        "File Support: Full support vs. limited files",
        "Batch Processing: Multiple inputs vs. single input",
        "Export Options: Multiple formats vs. basic export",
        "Clean Interface: No ads vs. ad-heavy experience",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="hash-generator"
        title="Similar Tools You Might Like"
        description="Check out our other security and generation tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Generate Secure Hashes – Professional & Fast
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional hash generator with 15+ algorithms, instant processing, 
            and complete privacy protection. Perfect for developers, security professionals, 
            and anyone needing secure hash generation.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our Hash Generator</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to generate secure hashes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Choose Algorithm</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Select your preferred hash algorithm: MD5, SHA-1, SHA-256, SHA-512, 
              bcrypt, Argon2, or others. Each has different security and speed characteristics.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Input Data</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter text or upload files to generate hashes from. 
              Support for multiple files and batch processing available.
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
              Generate your secure hash and view the result instantly. 
              Copy to clipboard or export in your preferred format.
            </p>
          </Card>
        </div>
      </section>

      {/* Hash Algorithms Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Hash Algorithms & Security Levels</h3>
          <p className="text-muted-foreground">
            Choose the right hash algorithm for your security needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hashAlgorithms.map((algorithm, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Fingerprint className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{algorithm.name}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{algorithm.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Use Case:</strong> {algorithm.useCase}</div>
                <div><strong>Security:</strong> {algorithm.security}</div>
                <div><strong>Speed:</strong> {algorithm.speed}</div>
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
            See how our hash generator outperforms other free tools
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
                    <th className="text-center p-4 font-semibold">HashGenerator.net</th>
                    <th className="text-center p-4 font-semibold">MD5HashGenerator.com</th>
                    <th className="text-center p-4 font-semibold">HashCalculator.com</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.hashgenerator}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.md5hashgenerator}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.hashcalculator}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's Hash Generator?</h3>
          <p className="text-muted-foreground">
            Professional features that make hash generation secure and effortless
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
            See why security professionals choose our hash generator
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
            Everything you need to know about secure hash generation
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about secure hash generation"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for hash generation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">File Integrity</h4>
            <p className="text-sm text-muted-foreground">
              Generate checksums to verify file integrity and detect corruption
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Lock className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Password Storage</h4>
            <p className="text-sm text-muted-foreground">
              Create secure password hashes using bcrypt or Argon2 algorithms
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Database className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Digital Signatures</h4>
            <p className="text-sm text-muted-foreground">
              Generate hashes for digital signatures and authentication systems
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Download className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Data Verification</h4>
            <p className="text-sm text-muted-foreground">
              Verify data integrity in databases, backups, and secure communications
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Generate Secure Hashes?</h3>
        <p className="text-muted-foreground">
          Start using our professional hash generator now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try Hash Generator Now
        </Button>
      </section>
    </div>
  );
}
