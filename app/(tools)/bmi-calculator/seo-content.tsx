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
  Activity,
  Calculator,
  Shield,
  Heart,
  Scale,
} from "lucide-react";

export function BmiCalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "What is BMI and how is it calculated?",
      answer:
        "BMI (Body Mass Index) is a measure of body fat based on height and weight. It's calculated by dividing weight in kilograms by height in meters squared (kg/m²). For imperial units, the formula is (weight in pounds / height in inches²) × 703.",
    },
    {
      question: "Is BMI an accurate measure of health?",
      answer:
        "BMI is a useful screening tool but not a perfect measure of health. It doesn't account for muscle mass, bone density, or fat distribution. Athletes with high muscle mass may have high BMI but be very healthy. It's best used alongside other health assessments.",
    },
    {
      question: "What are the BMI categories?",
      answer:
        "BMI categories are: Underweight (below 18.5), Normal weight (18.5-24.9), Overweight (25-29.9), Obesity Class I (30-34.9), Obesity Class II (35-39.9), and Obesity Class III (40 and above). Each category has different health implications.",
    },
    {
      question: "Is the BMI calculator free to use?",
      answer:
        "Yes, our BMI calculator is completely free with no registration required. Calculate your BMI unlimited times without any restrictions, ads, or hidden costs.",
    },
    {
      question: "How often should I calculate my BMI?",
      answer:
        "You can calculate BMI whenever you notice significant weight changes or as part of regular health monitoring. Most people check it monthly or quarterly, but it's not necessary to calculate it daily as weight can fluctuate.",
    },
    {
      question: "Does BMI apply to everyone?",
      answer:
        "BMI is designed for adults aged 20 and over. It may not be accurate for children, teens, elderly adults, pregnant women, or people with high muscle mass like athletes. Different standards may apply for different ethnic groups.",
    },
    {
      question: "What should I do if my BMI is outside the normal range?",
      answer:
        "If your BMI is outside the normal range, consider consulting with a healthcare provider. They can evaluate your overall health, consider factors BMI doesn't measure, and recommend appropriate lifestyle changes or medical interventions if needed.",
    },
    {
      question: "Can I use both metric and imperial units?",
      answer:
        "Yes, our calculator supports both metric (kg/cm) and imperial (lbs/inches) units. Simply select your preferred unit system, and the calculator will automatically use the correct formula and provide results in your chosen units.",
    },
    {
      question: "Is my BMI data stored or shared?",
      answer:
        "No, all calculations happen in your browser. Your weight, height, and BMI results are never stored, transmitted, or shared anywhere. Your privacy is completely protected with client-side processing.",
    },
    {
      question: "What's the difference between BMI and body fat percentage?",
      answer:
        "BMI measures weight relative to height, while body fat percentage measures the proportion of fat to total body weight. Body fat percentage is more accurate for assessing health risks but requires specialized equipment to measure accurately.",
    },
  ];

  const benefits = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Accurate BMI Calculation",
      description:
        "Get precise BMI calculations using standard medical formulas with support for both metric and imperial units.",
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Health Risk Assessment",
      description:
        "Understand your weight status and associated health risks with detailed category explanations and recommendations.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy",
      description:
        "All calculations happen in your browser. Your health data is never stored, transmitted, or shared anywhere.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Personalized Insights",
      description:
        "Receive tailored health recommendations and ideal weight ranges based on your specific BMI results.",
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
      name: "Love Calculator",
      description: "Calculate love compatibility between two people",
      href: "/love-calculator",
      keywords: "love calculator, compatibility",
      comingSoon: true,
    },
    {
      name: "Loan Calculator",
      description: "Calculate loan payments and interest rates",
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
              src="https://via.placeholder.com/1200x600/0ea5e9/ffffff?text=BMI+Calculator+%7C+Toolspy+-+Health+Assessment+%7C+Body+Mass+Index"
              alt="Toolspy BMI Calculator - Calculate Body Mass Index with health insights and recommendations"
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
            Professional BMI Calculator & Health Assessment
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Calculate your Body Mass Index (BMI) with precision and get comprehensive health insights. 
            Our tool provides accurate BMI calculations, health risk assessments, and personalized 
            recommendations for maintaining optimal health.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-4">
            Perfect for health monitoring, weight management, or medical consultations. Our calculator 
            supports both metric and imperial units and provides detailed explanations of BMI categories 
            and their health implications.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Use Our BMI Calculator?
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
          Related Health & Calculator Tools
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
        <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Calculate Your BMI Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Get your Body Mass Index and comprehensive health insights with complete privacy protection.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start BMI Assessment →
          </Button>
        </div>
      </section>
    </div>
  );
} 