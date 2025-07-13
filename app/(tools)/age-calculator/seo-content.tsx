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
  Calendar,
  Calculator,
  Shield,
  Zap,
  Clock,
} from "lucide-react";

export function AgeCalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "How accurate is the age calculator?",
      answer:
        "Our age calculator is extremely accurate, calculating your exact age down to the minute. It accounts for leap years, varying month lengths, and provides precise calculations for years, months, days, hours, and minutes lived.",
    },
    {
      question: "What information does the age calculator provide?",
      answer:
        "The calculator provides comprehensive age information including exact age in years/months/days, total time lived (days, hours, minutes), next birthday countdown, and fun statistics like estimated heartbeats and breaths taken.",
    },
    {
      question: "Is the age calculator free to use?",
      answer:
        "Yes, our age calculator is completely free with no registration required. Calculate your age unlimited times without any restrictions, ads, or hidden costs.",
    },
    {
      question: "How does the calculator handle leap years?",
      answer:
        "Our calculator automatically accounts for leap years in its calculations. It correctly handles February 29th in leap years and ensures accurate age calculations for people born on or around leap days.",
    },
    {
      question: "Can I calculate age for future dates?",
      answer:
        "You can set any current date in the calculator to calculate age at specific points in time. However, birth dates cannot be set in the future. This is useful for planning or calculating age at specific milestones.",
    },
    {
      question: "What are the fun facts based on?",
      answer:
        "Fun facts like heartbeats and breaths are based on average human rates: 72 beats per minute for heart rate and 16 breaths per minute for breathing rate. Sleep hours assume 8 hours per day (1/3 of total time).",
    },
    {
      question: "Is my birth date information stored anywhere?",
      answer:
        "No, all calculations happen in your browser. Your birth date and personal information are never stored, transmitted, or saved anywhere. Complete privacy is guaranteed.",
    },
    {
      question: "Can I use this for age verification purposes?",
      answer:
        "While our calculator is accurate, it's designed for informational and entertainment purposes. For official age verification, please use official documents and government-approved methods.",
    },
    {
      question: "Why does the calculator update in real-time?",
      answer:
        "The calculator updates every minute to show your continuously changing age. This provides a live view of your exact age and demonstrates how time is constantly progressing.",
    },
    {
      question: "What time zone does the calculator use?",
      answer:
        "The calculator uses your local system time zone. Age calculations are based on your computer's current date and time settings, ensuring accuracy for your location.",
    },
  ];

  const benefits = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Precise Age Calculation",
      description:
        "Calculate exact age in years, months, days, hours, and minutes with complete accuracy and leap year handling.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-Time Updates",
      description:
        "Watch your age update in real-time with live calculations that refresh every minute automatically.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy",
      description:
        "All calculations happen in your browser. Your birth date and personal information never leave your device.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fun Statistics",
      description:
        "Get interesting statistics like total heartbeats, breaths taken, hours slept, and next birthday countdown.",
    },
  ];

  const relatedTools = [
    {
      name: "Love Calculator",
      description: "Calculate love compatibility between two people",
      href: "/love-calculator",
      keywords: "love calculator, compatibility",
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
      name: "Loan Calculator",
      description: "Calculate loan payments and interest",
      href: "/loan-calculator",
      keywords: "loan calculator, finance",
      comingSoon: true,
    },
    {
      name: "Investment Calculator",
      description: "Calculate investment growth and returns",
      href: "/investment-calculator",
      keywords: "investment calculator, finance",
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
              src="https://via.placeholder.com/1200x600/0ea5e9/ffffff?text=Age+Calculator+%7C+Toolspy+-+Precise+Age+Calculation+%7C+Real-time+Updates"
              alt="Toolspy Age Calculator - Calculate exact age with precision and get fun statistics"
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
            Professional Age Calculation Tool
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Calculate your exact age with precision using our advanced age calculator. Get detailed information 
            about your time lived including years, months, days, hours, minutes, and fascinating statistics 
            about your life journey.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-4">
            Perfect for birthday planning, milestone tracking, or simply satisfying your curiosity about your 
            exact age. Our calculator provides real-time updates and fun facts that make age calculation 
            both informative and entertaining.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Our Age Calculator?
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
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Calculate Your Age Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Discover your exact age and fascinating statistics about your time lived with complete privacy protection.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Calculating →
          </Button>
        </div>
      </section>
    </div>
  );
} 