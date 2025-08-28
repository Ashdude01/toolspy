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
  Key,
  Copy,
  Download,
  Eye,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function PasswordGeneratorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("password-generator");

  const comparisonData = [
    {
      feature: "Password Length",
      toolspy: "Unlimited",
      passwordgenerator: "50 char limit",
      strongpassword: "32 char limit",
      randompassword: "20 char limit",
      toolspyStatus: "excellent",
    },
    {
      feature: "Character Types",
      toolspy: "✅ All types",
      passwordgenerator: "✅ All types",
      strongpassword: "⚠️ Limited types",
      randompassword: "❌ Basic only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Strength Analysis",
      toolspy: "✅ Real-time analysis",
      passwordgenerator: "⚠️ Basic analysis",
      strongpassword: "❌ No analysis",
      randompassword: "❌ No analysis",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      passwordgenerator: "⚠️ Server-based",
      strongpassword: "⚠️ Server-based",
      randompassword: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      passwordgenerator: "✅ Free",
      strongpassword: "✅ Free",
      randompassword: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Options",
      toolspy: "✅ Multiple formats",
      passwordgenerator: "⚠️ Copy only",
      strongpassword: "❌ No export",
      randompassword: "❌ No export",
      toolspyStatus: "excellent",
    },
    {
      feature: "Custom Patterns",
      toolspy: "✅ Pattern generation",
      passwordgenerator: "❌ No patterns",
      strongpassword: "❌ No patterns",
      randompassword: "❌ No patterns",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      passwordgenerator: "❌ Ad-heavy",
      strongpassword: "❌ Ad-heavy",
      randompassword: "❌ Ad-heavy",
      toolspyStatus: "excellent",
    },
  ];

  const passwordTypes = [
    {
      type: "Random Password",
      description: "Completely random character generation",
      useCase: "General accounts, temporary passwords",
      features: "Maximum randomness, high security",
      strength: "Very High",
    },
    {
      type: "Memorable Password",
      description: "Easy to remember but secure",
      useCase: "Personal accounts, frequent logins",
      features: "Word-based patterns, memorable phrases",
      strength: "High",
    },
    {
      type: "PIN Code",
      description: "Numeric-only passwords",
      useCase: "Mobile devices, ATM cards",
      features: "Numbers only, customizable length",
      strength: "Medium",
    },
    {
      type: "Custom Pattern",
      description: "User-defined character patterns",
      useCase: "Specific requirements, compliance",
      features: "Custom rules, pattern matching",
      strength: "Variable",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's password generator completely free to use?",
      answer:
        "Yes, our professional password generator is completely free with no hidden costs, registration requirements, or usage limitations. You can generate unlimited passwords without any restrictions. Unlike many competitors who have length limits or require paid subscriptions for advanced features, Toolspy provides all password generation capabilities free of charge.",
    },
    {
      question: "How secure is the password generation process?",
      answer:
        "Absolutely secure! Our password generator uses client-side processing, meaning your passwords are generated directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your passwords never leave your device, making it safer than server-based password generators that could potentially log or store your generated passwords.",
    },
    {
      question: "What makes a password strong and secure?",
      answer:
        "A strong password typically includes uppercase and lowercase letters, numbers, and special characters. Length is crucial - longer passwords are exponentially more secure. Our tool provides real-time strength analysis, showing you exactly how secure your generated password is and offering suggestions for improvement. We recommend passwords of at least 12 characters for optimal security.",
    },
    {
      question: "Can I customize the password generation options?",
      answer:
        "Yes! Our password generator offers extensive customization options including password length, character types (uppercase, lowercase, numbers, symbols), exclusion of similar characters, and custom patterns. You can also generate memorable passwords, PIN codes, and create passwords that meet specific requirements for different services and applications.",
    },
    {
      question: "How long should my passwords be?",
      answer:
        "For maximum security, we recommend passwords of at least 12 characters. Longer passwords (16+ characters) provide even better security. Our tool supports unlimited password length, so you can generate passwords as long as you need. The strength meter will show you exactly how secure your password is based on length and character variety.",
    },
    {
      question: "Why choose Toolspy over other free password generators like PasswordGenerator.net or StrongPasswordGenerator.com?",
      answer:
        "Toolspy offers professional-grade features like unlimited password length, real-time strength analysis, custom patterns, and client-side processing for privacy. Many competitors like PasswordGenerator.net and StrongPasswordGenerator.com have length limits, lack advanced features, or use server-based processing. Our tool provides better privacy protection, more generation options, and superior security analysis completely free.",
    },
    {
      question: "Can I generate memorable passwords that are still secure?",
      answer:
        "Yes! Our tool includes a memorable password generator that creates secure passwords using word patterns, phrases, and character substitutions. These passwords are easier to remember while maintaining high security. You can also customize the word list and character substitutions to create passwords that are both memorable and secure.",
    },
    {
      question: "How does the strength analysis work?",
      answer:
        "Our real-time strength analyzer evaluates passwords based on length, character variety, complexity, and common patterns. It provides a visual strength meter and detailed feedback about what makes your password strong or weak. The analysis considers factors like character types used, length, randomness, and common password patterns to give you accurate security assessment.",
    },
    {
      question: "Can I generate passwords for specific services or requirements?",
      answer:
        "Yes! Our tool supports custom patterns and requirements for different services. You can specify character types, exclude certain characters, set minimum requirements, and create passwords that meet specific compliance standards. This is perfect for generating passwords that meet the requirements of different websites, applications, or security policies.",
    },
    {
      question: "Is it safe to use online password generators?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your passwords are generated locally in your browser and never transmitted to our servers. This eliminates the risk of passwords being logged, stored, or intercepted. Unlike server-based generators, our tool provides complete privacy and security for your password generation process.",
    },
  ];

  const benefits = [
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Maximum Security",
      description:
        "Generate cryptographically secure passwords with unlimited length and character variety.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Analysis",
      description:
        "Instant password strength analysis with detailed feedback and security recommendations.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your passwords never leave your device, providing maximum security.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Customization",
      description:
        "Custom patterns, character types, and generation options for all your password needs.",
    },
  ];

  const keyBenefits = [
    "🔒 Maximum security with unlimited password length",
    "⚡ Real-time strength analysis and feedback",
    "🔒 Complete privacy protection - passwords never leave your device",
    "🎯 Multiple password types: random, memorable, PIN, custom patterns",
    "🔧 Advanced customization options and character types",
    "📊 Detailed strength analysis and security recommendations",
    "📋 Multiple export formats and copy options",
    "🎯 Professional-grade generation algorithms",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 Custom patterns for specific requirements",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
    "🔐 Cryptographically secure random generation",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. PasswordGenerator.net",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "Unlimited Length: No restrictions vs. 50 character limit",
        "Real-time Analysis: Instant feedback vs. basic analysis",
        "Custom Patterns: Advanced options vs. basic generation",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Better Export: Multiple formats vs. copy only",
      ],
    },
    {
      title: "Toolspy vs. StrongPasswordGenerator.com",
      advantages: [
        "No Registration: Instant access vs. account requirements",
        "Faster Processing: No upload time vs. server processing",
        "Better Privacy: No data transmission vs. server-based",
        "Unlimited Length: No restrictions vs. 32 character limit",
        "Real-time Analysis: Detailed feedback vs. no analysis",
        "Custom Patterns: Advanced options vs. basic generation",
      ],
    },
    {
      title: "Toolspy vs. RandomPasswordGenerator.com",
      advantages: [
        "Unlimited Processing: No size limits vs. 20 character limit",
        "Real-time Analysis: Instant feedback vs. no analysis",
        "Custom Patterns: Advanced options vs. basic generation",
        "Better Privacy: Client-side vs. server-based processing",
        "Export Options: Multiple formats vs. no export",
        "Clean Interface: No ads vs. ad-heavy experience",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="password-generator"
        title="Similar Tools You Might Like"
        description="Check out our other security and generation tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Generate Secure Passwords – Professional & Safe
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional password generator with unlimited length, real-time strength analysis, 
            and complete privacy protection. Perfect for individuals, businesses, 
            and anyone needing secure password generation.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our Password Generator</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to generate secure passwords
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Choose Password Type</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Select your preferred password type: random, memorable, PIN, or custom pattern. 
              Each type offers different security levels and use cases.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Customize Settings</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Set password length, choose character types (uppercase, lowercase, numbers, symbols), 
              and configure any specific requirements.
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
              Generate your secure password and view real-time strength analysis. 
              Copy to clipboard or export in your preferred format.
            </p>
          </Card>
        </div>
      </section>

      {/* Password Types Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Password Types & Security Levels</h3>
          <p className="text-muted-foreground">
            Choose the right password type for your security needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {passwordTypes.map((type, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Key className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{type.type}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Use Case:</strong> {type.useCase}</div>
                <div><strong>Features:</strong> {type.features}</div>
                <div><strong>Strength:</strong> {type.strength}</div>
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
            See how our password generator outperforms other free tools
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
                    <th className="text-center p-4 font-semibold">PasswordGenerator.net</th>
                    <th className="text-center p-4 font-semibold">StrongPasswordGenerator.com</th>
                    <th className="text-center p-4 font-semibold">RandomPasswordGenerator.com</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.passwordgenerator}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.strongpassword}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.randompassword}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's Password Generator?</h3>
          <p className="text-muted-foreground">
            Professional features that make password generation secure and effortless
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
            See why security professionals choose our password generator
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
            Everything you need to know about secure password generation
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about secure password generation"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for password generation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Lock className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Personal Accounts</h4>
            <p className="text-sm text-muted-foreground">
              Generate secure passwords for email, social media, banking, and personal accounts
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Key className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Business Security</h4>
            <p className="text-sm text-muted-foreground">
              Create strong passwords for business accounts, systems, and employee access
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Copy className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Development</h4>
            <p className="text-sm text-muted-foreground">
              Generate secure passwords for databases, APIs, and development environments
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Download className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Compliance</h4>
            <p className="text-sm text-muted-foreground">
              Create passwords that meet security policies and compliance requirements
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Generate Secure Passwords?</h3>
        <p className="text-muted-foreground">
          Start using our professional password generator now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try Password Generator Now
        </Button>
      </section>
    </div>
  );
}
