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
  Heart,
  Calculator,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

export function LoveCalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "How does the love calculator work?",
      answer:
        "Our love calculator uses a fun algorithm that analyzes the names entered, looking at letter combinations, name lengths, and other factors to generate a compatibility percentage. While it's designed for entertainment, it can spark interesting conversations about relationships.",
    },
    {
      question: "Is the love calculator accurate?",
      answer:
        "The love calculator is designed for fun and entertainment purposes. Real love compatibility depends on many factors like shared values, communication, trust, and emotional connection that can't be measured by a simple algorithm.",
    },
    {
      question: "Is the love calculator free to use?",
      answer:
        "Yes, our love calculator is completely free with no registration required. Calculate love compatibility unlimited times without any restrictions, ads, or hidden costs.",
    },
    {
      question: "What information is required?",
      answer:
        "You only need to enter two names to use the love calculator. The tool doesn't require personal information, birth dates, or other sensitive data - just the names of the people whose compatibility you want to check.",
    },
    {
      question: "Can I use nicknames or full names?",
      answer:
        "You can use either nicknames or full names in the calculator. The algorithm works with any name format, so use whatever feels most appropriate for your situation - first names, nicknames, or even full names.",
    },
    {
      question: "Why do I get different results with different names?",
      answer:
        "The algorithm analyzes the specific letters and patterns in the names entered. Different names will naturally produce different compatibility scores based on letter combinations and other name characteristics.",
    },
    {
      question: "Is my information stored or shared?",
      answer:
        "No, all calculations happen in your browser. Names entered are never stored, transmitted, or shared anywhere. Your privacy is completely protected with client-side processing.",
    },
    {
      question: "Can I share my love calculator results?",
      answer:
        "While you can share your results manually, the calculator is designed for personal entertainment. Feel free to screenshot or note down your results to share with friends or your partner.",
    },
    {
      question: "What do the different percentage ranges mean?",
      answer:
        "Higher percentages (80-100%) suggest strong compatibility, medium ranges (50-79%) indicate good potential with effort, and lower percentages (below 50%) suggest you may have different approaches to love.",
    },
    {
      question: "Should I make relationship decisions based on these results?",
      answer:
        "Absolutely not! This tool is purely for entertainment. Real relationships depend on communication, shared values, mutual respect, and many other factors that can't be calculated by an algorithm.",
    },
  ];

  const benefits = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Fun Compatibility Testing",
      description:
        "Get instant entertainment with love compatibility percentages and personalized relationship insights.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Personalized Results",
      description:
        "Receive unique compatibility messages and relationship tips based on your specific results.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy",
      description:
        "All calculations happen in your browser. Names and results are never stored or shared anywhere.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Relationship Tips",
      description:
        "Get helpful relationship advice and tips regardless of your compatibility percentage.",
    },
  ];

  const relatedTools = [
    {
      name: "Age Calculator",
      description: "Calculate exact age with precision and fun statistics",
      href: "/age-calculator",
      keywords: "age calculator, birthday",
      comingSoon: true,
    },
    {
      name: "BMI Calculator",
      description: "Calculate Body Mass Index and health status",
      href: "/bmi-calculator",
      keywords: "bmi calculator, health",
      comingSoon: true,
    },
    {
      name: "Investment Calculator",
      description: "Calculate investment growth and returns",
      href: "/investment-calculator",
      keywords: "investment calculator, finance",
      comingSoon: true,
    },
    {
      name: "Loan Calculator",
      description: "Calculate loan payments and interest rates",
      href: "/loan-calculator",
      keywords: "loan calculator, finance",
      comingSoon: true,
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Tool Poster Image */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="relative mx-auto max-w-4xl">
            <img
              src="https://via.placeholder.com/1200x600/ff69b4/ffffff?text=Love+Calculator+%7C+Toolspy+-+Compatibility+Testing+%7C+Relationship+Fun"
              alt="Toolspy Love Calculator - Fun love compatibility testing with personalized insights"
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
            Fun Love Compatibility Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Discover the love compatibility between any two people with our entertaining love calculator. 
            Get instant compatibility percentages, personalized relationship insights, and helpful tips 
            for building stronger connections.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-4">
            Perfect for couples, friends, or anyone curious about relationship compatibility. Our tool 
            provides fun entertainment while offering genuine relationship advice and conversation starters 
            for deepening connections.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Use Our Love Calculator?
        </h3>
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

      {/* FAQ Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Frequently Asked Questions
        </h3>
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

      {/* Related Tools */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Related Calculator Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedTools.map((tool, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">{tool.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tool.description}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Keywords: {tool.keywords}
                  </p>
                  {tool.comingSoon ? (
                    <Badge variant="secondary">Coming Soon</Badge>
                  ) : (
                    <Button variant="outline" size="sm" asChild>
                      <a href={tool.href}>Try Tool →</a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="space-y-6">
        <div className="text-center p-8 bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Calculate Love Compatibility Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Discover your love compatibility and get personalized relationship insights with complete privacy protection.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Love Test →
          </Button>
        </div>
      </section>
    </div>
  );
} 