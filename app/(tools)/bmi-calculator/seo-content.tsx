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
  Type,
  BookOpen,
  AlignLeft,
  Calendar,
  Clock,
  Calculator,
  User,
  Heart,
  Users,
  Sparkles,
  TrendingUp,
  Activity,
  Scale,
  Target as TargetIcon,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";

export function BMICalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("bmi-calculator");

  const comparisonData = [
    {
      feature: "Calculation Accuracy",
      toolspy: "WHO standards",
      bmicalculator: "Basic calculation",
      bmichart: "Approximate only",
      weightcalculator: "Limited accuracy",
      toolspyStatus: "excellent",
    },
    {
      feature: "Calculation Speed",
      toolspy: "Instant calculation",
      bmicalculator: "Server delays",
      bmichart: "Slow processing",
      weightcalculator: "Variable speed",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side processing",
      bmicalculator: "⚠️ Server-based",
      bmichart: "⚠️ Server-based",
      weightcalculator: "⚠️ Server-based",
      toolspyStatus: "excellent",
    },
    {
      feature: "Health Insights",
      toolspy: "✅ Detailed analysis",
      bmicalculator: "⚠️ Basic result",
      bmichart: "❌ No insights",
      weightcalculator: "⚠️ Limited analysis",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Free forever",
      bmicalculator: "✅ Free",
      bmichart: "✅ Free",
      weightcalculator: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Options",
      toolspy: "✅ Multiple formats",
      bmicalculator: "⚠️ Copy only",
      bmichart: "❌ No export",
      weightcalculator: "⚠️ Basic export",
      toolspyStatus: "excellent",
    },
    {
      feature: "Health Recommendations",
      toolspy: "✅ Personalized advice",
      bmicalculator: "❌ No recommendations",
      bmichart: "❌ No recommendations",
      weightcalculator: "❌ No recommendations",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      bmicalculator: "❌ Ad-heavy",
      bmichart: "❌ Ad-heavy",
      weightcalculator: "❌ Ad-heavy",
      toolspyStatus: "excellent",
    },
  ];

  const bmiCategories = [
    {
      category: "Underweight",
      range: "Below 18.5",
      description: "BMI less than 18.5",
      healthRisk: "Nutritional deficiencies",
      recommendation: "Consult healthcare provider for healthy weight gain",
      color: "text-blue-500",
    },
    {
      category: "Normal Weight",
      range: "18.5 - 24.9",
      description: "Healthy BMI range",
      healthRisk: "Lowest health risks",
      recommendation: "Maintain current weight with healthy lifestyle",
      color: "text-green-500",
    },
    {
      category: "Overweight",
      range: "25.0 - 29.9",
      description: "Above healthy range",
      healthRisk: "Increased health risks",
      recommendation: "Focus on diet and exercise for gradual weight loss",
      color: "text-yellow-500",
    },
    {
      category: "Obese",
      range: "30.0 and above",
      description: "Significantly above healthy range",
      healthRisk: "High health risks",
      recommendation: "Consult healthcare provider for weight management plan",
      color: "text-red-500",
    },
  ];

  const faqData = [
    {
      question: "Is Toolspy's BMI calculator completely free to use?",
      answer:
        "Yes, our professional BMI calculator is completely free with no hidden costs, registration requirements, or usage limitations. You can calculate BMI unlimited times without any restrictions. Unlike many competitors who have calculation limits or require paid subscriptions for advanced features, Toolspy provides all BMI calculation capabilities free of charge.",
    },
    {
      question: "How accurate is the BMI calculation?",
      answer:
        "Our BMI calculator uses the World Health Organization (WHO) standard formula and provides precise calculations based on your height and weight. The calculation is accurate for most adults, though it may not be suitable for athletes, pregnant women, or children under 18. For these groups, we recommend consulting healthcare professionals for appropriate assessments.",
    },
    {
      question: "How secure is the BMI calculation process?",
      answer:
        "Absolutely secure! Our BMI calculator uses client-side processing, meaning your height, weight, and personal health information are processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your sensitive health data never leaves your device, making it safer than server-based calculators.",
    },
    {
      question: "What is BMI and why is it important?",
      answer:
        "BMI (Body Mass Index) is a measure of body fat based on height and weight. It's an important health indicator that helps assess weight-related health risks. While BMI doesn't directly measure body fat, it's a useful screening tool for identifying potential health issues related to weight. Our calculator provides detailed insights into your BMI category and health implications.",
    },
    {
      question: "What different BMI categories are there?",
      answer:
        "Our BMI calculator categorizes results into four main groups: Underweight (below 18.5), Normal Weight (18.5-24.9), Overweight (25.0-29.9), and Obese (30.0 and above). Each category has different health implications and recommendations. The tool provides detailed explanations of each category and personalized health advice based on your results.",
    },
    {
      question: "Why choose Toolspy over other free BMI calculators like BMICalculator.net or BMIChart.com?",
      answer:
        "Toolspy offers professional-grade features like WHO-standard calculations, client-side processing for privacy, detailed health insights, and personalized recommendations. Many competitors like BMICalculator.net and BMIChart.com have basic calculations, use server-based processing, or lack comprehensive health analysis. Our tool provides better privacy protection, more detailed insights, and superior functionality completely free.",
    },
    {
      question: "How fast is the BMI calculation?",
      answer:
        "Our BMI calculator provides instant results for any height and weight combination. Since all processing happens in your browser, there are no server delays or upload times. You can calculate BMI for multiple measurements in milliseconds, making it perfect for tracking progress or comparing different measurements.",
    },
    {
      question: "Can I use the BMI calculator for children or athletes?",
      answer:
        "Our BMI calculator is designed for adults (18+ years). For children and adolescents, BMI interpretation requires age and gender-specific charts. For athletes with high muscle mass, BMI may not accurately reflect body composition. In these cases, we recommend consulting healthcare professionals for appropriate assessments and alternative measurements.",
    },
    {
      question: "What health recommendations does the calculator provide?",
      answer:
        "Our tool provides personalized health recommendations based on your BMI category. This includes dietary advice, exercise suggestions, lifestyle recommendations, and guidance on when to consult healthcare professionals. The recommendations are evidence-based and designed to support healthy weight management and overall wellness.",
    },
    {
      question: "Is it safe to use online BMI calculators?",
      answer:
        "With Toolspy, yes! Our client-side processing ensures your height, weight, and health information are processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based calculators, our tool provides complete privacy and security for your health calculations.",
    },
  ];

  const benefits = [
    {
      icon: <Scale className="h-6 w-6" />,
      title: "WHO Standard Calculation",
      description:
        "Accurate BMI calculation using World Health Organization standards and formulas.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Results",
      description:
        "Real-time BMI calculation with no server delays or upload requirements.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy Protection",
      description:
        "Client-side processing ensures your health data never leaves your device, providing maximum security.",
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Health Insights",
      description:
        "Detailed health analysis, category explanations, and personalized recommendations.",
    },
  ];

  const keyBenefits = [
    "⚖️ WHO-standard BMI calculation with precise accuracy",
    "⚡ Instant calculation with no server delays or uploads",
    "🔒 Complete privacy protection - health data never leaves your device",
    "📊 Detailed BMI categories and health risk analysis",
    "🔧 Personalized health recommendations and advice",
    "📊 Real-time calculation and category assessment",
    "📋 Multiple export formats and copy options",
    "🎯 Professional-grade health calculation algorithms",
    "📱 Mobile-friendly responsive design",
    "💻 Browser-based tool requiring no software installation",
    "💯 Completely free with no watermarks or limitations",
    "🚀 Advanced features typically found in paid software",
    "🔍 Comprehensive health insights and explanations",
    "🌐 Works offline after initial page load",
    "🎨 Clean, professional interface without distractions",
    "🏥 Evidence-based health recommendations",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. BMICalculator.net",
      advantages: [
        "Better Privacy: Client-side processing vs. server uploads",
        "More Accurate: WHO standards vs. basic calculation",
        "Health Insights: Detailed analysis vs. basic result",
        "Personalized Advice: Recommendations vs. no advice",
        "No Ads: Clean interface vs. ad-heavy layout",
        "Better Export: Multiple formats vs. copy only",
      ],
    },
    {
      title: "Toolspy vs. BMIChart.com",
      advantages: [
        "More Accurate: WHO standards vs. approximate calculation",
        "Better Privacy: No data transmission vs. server-based",
        "Health Insights: Comprehensive vs. no insights",
        "Faster Processing: Instant vs. slow processing",
        "Real-time Calculation: Immediate results vs. delays",
        "Professional Features: Advanced options vs. basic calculation",
      ],
    },
    {
      title: "Toolspy vs. WeightCalculator.com",
      advantages: [
        "More Accurate: WHO standards vs. limited accuracy",
        "Better Privacy: Client-side vs. server-based processing",
        "Health Insights: Comprehensive vs. limited analysis",
        "Multiple Formats: All formats vs. basic formatting",
        "Export Options: Multiple formats vs. basic export",
        "Clean Interface: No ads vs. ad-heavy experience",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="bmi-calculator"
        title="Similar Tools You Might Like"
        description="Check out our other health and calculation tools."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Calculate BMI – Professional & Accurate
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Professional BMI calculator with WHO-standard calculations, instant processing, 
            and complete privacy protection. Perfect for health monitoring, fitness tracking, 
            and anyone needing accurate body mass index calculations.
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
          <h3 className="text-3xl font-bold mb-4">How to Use Our BMI Calculator</h3>
          <p className="text-muted-foreground">
            Follow these simple steps to calculate your BMI accurately
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h4 className="font-semibold">Enter Measurements</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Input your height and weight using metric or imperial units. 
              The tool automatically converts between measurement systems.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h4 className="font-semibold">Get Results</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              View your BMI calculation instantly with category classification, 
              health risk assessment, and personalized recommendations.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h4 className="font-semibold">Review Insights</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Read detailed health insights, category explanations, and 
              personalized recommendations for your BMI range.
            </p>
          </Card>
        </div>
      </section>

      {/* BMI Categories Guide */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">BMI Categories & Health Implications</h3>
          <p className="text-muted-foreground">
            Understand what your BMI category means for your health
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bmiCategories.map((category, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <TargetIcon className="h-5 w-5 mr-2 text-primary" />
                <h4 className={`font-semibold ${category.color}`}>{category.category}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Range:</strong> {category.range}</div>
                <div><strong>Health Risk:</strong> {category.healthRisk}</div>
                <div><strong>Recommendation:</strong> {category.recommendation}</div>
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
            See how our BMI calculator outperforms other free tools
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
                    <th className="text-center p-4 font-semibold">BMICalculator.net</th>
                    <th className="text-center p-4 font-semibold">BMIChart.com</th>
                    <th className="text-center p-4 font-semibold">WeightCalculator.com</th>
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
                      <td className="p-4 text-center text-muted-foreground">{row.bmicalculator}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.bmichart}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.weightcalculator}</td>
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Toolspy's BMI Calculator?</h3>
          <p className="text-muted-foreground">
            Professional features that make BMI calculation accurate and insightful
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
            See why health professionals choose our BMI calculator
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
            Everything you need to know about BMI calculation
          </p>
        </div>

        <FAQ
          faqs={faqData}
          title="Everything you need to know about BMI calculation"
          variant="modern"
        />
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Common Use Cases</h3>
          <p className="text-muted-foreground">
            Professional applications for BMI calculation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Activity className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Health Monitoring</h4>
            <p className="text-sm text-muted-foreground">
              Track BMI changes over time for health monitoring and wellness goals
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Scale className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Fitness Tracking</h4>
            <p className="text-sm text-muted-foreground">
              Monitor body composition changes during fitness programs and weight management
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Heart className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Health Assessment</h4>
            <p className="text-sm text-muted-foreground">
              Assess weight-related health risks and determine appropriate health strategies
            </p>
          </Card>

          <Card className="p-6 text-center">
            <TargetIcon className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Goal Setting</h4>
            <p className="text-sm text-muted-foreground">
              Set realistic health and fitness goals based on BMI category and recommendations
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h3 className="text-3xl font-bold">Ready to Calculate Your BMI?</h3>
        <p className="text-muted-foreground">
          Start using our professional BMI calculator now - it's completely free!
        </p>
        <Button size="lg" className="mt-4">
          Try BMI Calculator Now
        </Button>
      </section>
    </div>
  );
} 