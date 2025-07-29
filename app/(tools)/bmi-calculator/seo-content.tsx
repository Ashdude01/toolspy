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
  Activity,
  Heart,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";

export function BMICalculatorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug('bmi-calculator');

  const comparisonData = [
    {
      feature: "BMI Categories",
      toolspy: "7 detailed categories",
      calculator: "4 basic categories",
      webmd: "4 basic categories",
      nhlbi: "4 basic categories",
      toolspyStatus: "excellent",
    },
    {
      feature: "Unit Support",
      toolspy: "✅ Metric & Imperial",
      calculator: "✅ Both systems",
      webmd: "✅ Both systems",
      nhlbi: "✅ Both systems",
      toolspyStatus: "good",
    },
    {
      feature: "Health Insights",
      toolspy: "✅ Detailed analysis",
      calculator: "❌ Basic result only",
      webmd: "✅ Basic insights",
      nhlbi: "✅ Medical info",
      toolspyStatus: "excellent",
    },
    {
      feature: "Recommendations",
      toolspy: "✅ Personalized advice",
      calculator: "❌ No advice",
      webmd: "✅ General tips",
      nhlbi: "✅ Medical guidelines",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy",
      toolspy: "✅ No data stored",
      calculator: "⚠️ May track usage",
      webmd: "⚠️ Collects data",
      nhlbi: "✅ Government site",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Ads",
      toolspy: "✅ Clean interface",
      calculator: "⚠️ Has advertisements",
      webmd: "⚠️ Many ads",
      nhlbi: "✅ No ads",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Fully responsive",
      calculator: "✅ Mobile optimized",
      webmd: "⚠️ Heavy interface",
      nhlbi: "⚠️ Basic mobile",
      toolspyStatus: "excellent",
    },
    {
      feature: "Additional Tools",
      toolspy: "✅ Body fat, ideal weight",
      calculator: "❌ BMI only",
      webmd: "✅ Some tools",
      nhlbi: "❌ BMI only",
      toolspyStatus: "excellent",
    },
  ];

  const bmiCategories = [
    {
      category: "Severely Underweight",
      range: "Below 16.0",
      color: "text-red-600",
      description: "Significantly below healthy weight",
      recommendation: "Consult healthcare provider immediately",
    },
    {
      category: "Underweight",
      range: "16.0 - 18.4",
      color: "text-orange-600",
      description: "Below healthy weight range",
      recommendation: "Consider weight gain with medical guidance",
    },
    {
      category: "Normal Weight",
      range: "18.5 - 24.9",
      color: "text-green-600",
      description: "Healthy weight range",
      recommendation: "Maintain current weight with balanced diet",
    },
    {
      category: "Overweight",
      range: "25.0 - 29.9",
      color: "text-yellow-600",
      description: "Above healthy weight range",
      recommendation: "Consider weight loss through diet and exercise",
    },
    {
      category: "Obese Class I",
      range: "30.0 - 34.9",
      color: "text-orange-600",
      description: "Moderately obese",
      recommendation: "Weight loss recommended, consult healthcare provider",
    },
    {
      category: "Obese Class II",
      range: "35.0 - 39.9",
      color: "text-red-600",
      description: "Severely obese",
      recommendation: "Medical supervision for weight loss strongly advised",
    },
    {
      category: "Obese Class III",
      range: "40.0 and above",
      color: "text-red-800",
      description: "Very severely obese",
      recommendation: "Immediate medical intervention recommended",
    },
  ];

  const faqData = [
    {
      question: "What is BMI and why is it important?",
      answer:
        "BMI (Body Mass Index) is a simple calculation using your height and weight to determine if you're in a healthy weight range. It's calculated as weight (kg) divided by height (m) squared. While not perfect, BMI is a useful screening tool that helps identify potential weight-related health risks and is widely used by healthcare professionals worldwide.",
    },
    {
      question: "How accurate is BMI for determining health?",
      answer:
        "BMI is a good general indicator but has limitations. It doesn't distinguish between muscle and fat mass, so athletes or muscular individuals may have high BMI despite being healthy. It also doesn't account for age, gender, or body composition. Use BMI as one factor among others when assessing health, and consult healthcare providers for comprehensive evaluation.",
    },
    {
      question: "Is this BMI calculator suitable for children and teens?",
      answer:
        "This calculator is designed for adults (18+ years). Children and teenagers require age and gender-specific BMI percentile charts because their body composition changes as they grow. For minors, consult pediatric BMI calculators or healthcare providers who can properly interpret results using growth charts.",
    },
    {
      question: "What should I do if my BMI indicates I'm overweight or obese?",
      answer:
        "Don't panic! BMI is just one indicator. First, consult with a healthcare provider or registered dietitian for personalized advice. Generally, gradual weight loss through balanced nutrition and regular physical activity is recommended. Aim for 1-2 pounds per week weight loss through a combination of diet and exercise.",
    },
    {
      question: "Can BMI be misleading for certain body types?",
      answer:
        "Yes, BMI can be misleading for very muscular individuals, elderly people with muscle loss, or those with different body compositions. Athletes may have high BMI due to muscle mass, while some people may have normal BMI but high body fat percentage. Consider additional measurements like waist circumference and body fat percentage for a complete picture.",
    },
    {
      question: "How often should I calculate my BMI?",
      answer:
        "For general health monitoring, calculating BMI monthly or quarterly is sufficient. If you're actively trying to lose or gain weight, weekly or bi-weekly calculations can help track progress. However, don't obsess over daily changes as weight naturally fluctuates. Focus on long-term trends rather than day-to-day variations.",
    },
    {
      question: "What's the difference between metric and imperial calculations?",
      answer:
        "The BMI formula differs slightly: Metric uses weight (kg) ÷ height (m)², while Imperial uses (weight (lbs) ÷ height (inches)²) × 703. Our calculator handles both automatically, so you can enter measurements in your preferred system and get accurate results without manual conversion.",
    },
    {
      question: "Is my personal information stored when I use this calculator?",
      answer:
        "No, absolutely not! Our BMI calculator processes all calculations locally in your browser. We don't store, collect, or transmit your height, weight, or BMI results anywhere. Your privacy is completely protected, and you can use the calculator with confidence that your personal health information remains private.",
    },
    {
      question: "What BMI range should I aim for?",
      answer:
        "The healthy BMI range is typically 18.5-24.9 for most adults. However, the ideal BMI can vary based on factors like age, muscle mass, and ethnicity. Some studies suggest that slightly higher BMI (up to 27) may be acceptable for older adults. Consult with healthcare providers to determine your personal healthy weight range.",
    },
    {
      question: "Can I use this calculator if I'm pregnant?",
      answer:
        "BMI calculations during pregnancy require special consideration as weight gain is expected and healthy. Standard BMI categories don't apply to pregnant women. If you're pregnant or planning pregnancy, consult with your healthcare provider about appropriate weight gain based on your pre-pregnancy BMI and individual circumstances.",
    },
  ];

  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Accurate Health Assessment",
      description:
        "Get precise BMI calculations with detailed health insights and personalized recommendations based on your results.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Results",
      description:
        "Calculate your BMI instantly with real-time results and immediate health category classification.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Privacy",
      description:
        "All calculations happen in your browser. No personal data is stored or transmitted anywhere.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Flexible Units",
      description:
        "Use metric (kg/cm) or imperial (lbs/ft-in) units with automatic conversion and accurate calculations.",
    },
  ];

  const keyBenefits = [
    "🎯 Accurate BMI calculation using WHO standard formula",
    "⚡ Instant results with detailed health category classification",
    "🔒 Complete privacy - no data stored or transmitted",
    "🎛️ Support for both metric and imperial measurement systems",
    "📦 Detailed BMI categories from underweight to severely obese",
    "🎨 Personalized health recommendations based on your BMI",
    "⚙️ Additional calculations: ideal weight range and body fat estimation",
    "📱 Mobile-friendly responsive design for any device",
    "🎯 Color-coded results for easy interpretation",
    "🔄 Health insights and lifestyle recommendations",
    "🖥️ Works offline after initial page load",
    "💯 Completely free with no registration required",
    "🚀 Fast calculations with professional accuracy",
    "📊 Visual BMI scale and category explanations",
    "💼 Based on medical and scientific standards",
    "🌐 Clean, ad-free interface focused on your health",
  ];

  const competitorAdvantages = [
    {
      title: "Toolspy vs. Calculator.net",
      advantages: [
        "Better Interface: Clean, modern design vs. cluttered layout",
        "More Categories: 7 detailed BMI categories vs. 4 basic ones",
        "Health Insights: Detailed recommendations vs. basic results",
        "No Ads: Clean experience vs. advertisement-heavy interface",
        "Privacy Focus: No tracking vs. potential data collection",
        "Mobile Optimized: Fully responsive vs. basic mobile support",
      ],
    },
    {
      title: "Toolspy vs. WebMD BMI Calculator",
      advantages: [
        "Faster Loading: Lightweight tool vs. heavy medical website",
        "No Distractions: Focused calculator vs. medical content overload",
        "Better Privacy: Local processing vs. data collection for ads",
        "Cleaner Results: Easy-to-read format vs. complex medical jargon",
        "More Detailed: Comprehensive categories vs. basic classification",
        "Ad-Free: Distraction-free vs. multiple advertisements",
      ],
    },
    {
      title: "Toolspy vs. NHLBI Calculator",
      advantages: [
        "Modern Interface: Contemporary design vs. government website style",
        "Additional Features: Ideal weight calculation vs. BMI only",
        "Better Mobile: Optimized for phones vs. desktop-focused design",
        "Faster Access: No navigation through government site structure",
        "Enhanced Recommendations: Personalized advice vs. general guidelines",
        "User-Friendly: Intuitive design vs. clinical interface",
      ],
    },
  ];

  return (
    <div className="space-y-12 mt-16">
      {/* Tool Poster Image */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="relative mx-auto max-w-6xl">
            <img
              src={tool?.posterImage || ''}
              alt="Toolspy BMI Calculator - Professional health assessment tool with detailed BMI categories"
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
            Know Your Health Status – Calculate BMI Instantly
          </h2>
          <p className="text-lg text-muted-foreground max-w-6xl mx-auto">
            Wondering if you're at a healthy weight? Toolspy's BMI Calculator gives you instant answers. Our tool calculates your Body Mass Index and provides detailed health insights, helping you understand where you stand and what steps you might consider for optimal health.
          </p>
          <p className="text-base text-muted-foreground max-w-6xl mx-auto mt-4">
            Whether you're tracking fitness progress, planning a health journey, or just curious about your BMI, our calculator provides accurate results with personalized recommendations. No registration needed, completely private, and works with both metric and imperial measurements.
          </p>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          How to Calculate Your BMI with Toolspy
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Getting your BMI is simple and takes just seconds:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">1. Enter Your Height</h4>
            <p className="text-sm text-muted-foreground">
              Input your height in feet/inches or centimeters. Our calculator accepts both measurement systems for your convenience.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">2. Add Your Weight</h4>
            <p className="text-sm text-muted-foreground">
              Enter your current weight in pounds or kilograms. The calculator will automatically handle the conversion.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">3. Get Instant Results</h4>
            <p className="text-sm text-muted-foreground">
              See your BMI calculation immediately with color-coded health category and detailed explanation of what it means.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">4. Review Recommendations</h4>
            <p className="text-sm text-muted-foreground">
              Get personalized health insights and recommendations based on your BMI category for your wellness journey.
            </p>
          </Card>
        </div>
      </section>

      {/* BMI Categories */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Understanding BMI Categories
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Our calculator provides detailed BMI categories to help you understand your health status better.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bmiCategories.map((category, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{category.category}</h4>
                  <Badge variant="outline" className={category.color}>
                    {category.range}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
                <p className="text-xs font-medium text-primary">
                  {category.recommendation}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Use Toolspy's BMI Calculator
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's what makes our calculator special and why people trust it for their health assessments.
        </p>
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

      {/* Point-wise Benefits */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Everything You Get with Our BMI Calculator
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          All the features you need for accurate health assessment, completely free and private.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyBenefits.map((benefit, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <p className="text-sm">{benefit}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Competitor Advantages */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Toolspy Over Other BMI Calculators
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's how we compare to other popular BMI calculators you might have used.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {competitorAdvantages.map((competitor, index) => (
            <Card key={index} className="p-6">
              <h4 className="font-semibold mb-4 text-primary">
                {competitor.title}
              </h4>
              <ul className="space-y-2">
                {competitor.advantages.map((advantage, advIndex) => (
                  <li
                    key={advIndex}
                    className="text-sm flex items-start space-x-2"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Detailed Feature Comparison
        </h3>
        <Card>
          <CardHeader>
            <CardTitle>Toolspy vs. Popular BMI Calculators</CardTitle>
            <CardDescription>
              Comprehensive comparison of features and capabilities across leading BMI calculation tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Feature</th>
                    <th className="text-left p-3 font-medium">Toolspy</th>
                    <th className="text-left p-3 font-medium">Calculator.net</th>
                    <th className="text-left p-3 font-medium">WebMD</th>
                    <th className="text-left p-3 font-medium">NHLBI</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{row.feature}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <span>{row.toolspy}</span>
                          {row.toolspyStatus === "excellent" && (
                            <Star className="h-4 w-4 text-yellow-500" />
                          )}
                          {row.toolspyStatus === "good" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.calculator}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.webmd}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.nhlbi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SEO Keyword Cluster Section */}
      <section className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-center mb-6">
            Calculate BMI and Understand Your Health Status
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground leading-relaxed">
              Looking to <strong>calculate BMI</strong> accurately? Need to understand your <strong>body mass index</strong> and what it means for your health? Toolspy's BMI calculator makes it simple. Whether you want to <strong>calculate BMI for adults</strong>, track your fitness progress, or understand healthy weight ranges, our tool provides instant, accurate results with detailed health insights.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Our <strong>BMI calculator</strong> uses the standard WHO formula to determine if you're underweight, normal weight, overweight, or obese. Simply enter your height and weight, and we'll <strong>calculate your BMI</strong> instantly while providing personalized recommendations for your health category. Unlike basic calculators, we offer detailed BMI categories and actionable health advice.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Whether you prefer metric or imperial measurements, our <strong>body mass index calculator</strong> handles both systems automatically. Students, fitness enthusiasts, and health-conscious individuals trust our tool to <strong>calculate BMI accurately</strong> while maintaining complete privacy. Your measurements are processed locally and never stored or shared.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Try our BMI calculator today and take the first step toward better health awareness. From understanding your current status to setting realistic health goals, we make <strong>BMI calculation</strong> simple, private, and informative for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h3 className="text-2xl font-bold text-center">
          Your Questions Answered
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Everything you need to know about BMI calculation and health assessment.
        </p>
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
                  <CardTitle className="text-base"><h4>{faq.question}</h4></CardTitle>
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
      <RelatedTools 
        currentToolSlug="bmi-calculator"
        title="More Health & Fitness Calculators"
        description="Explore other calculators to support your health and wellness journey."
      />

      {/* Final CTA Section */}
      <section className="space-y-6">
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Check Your BMI?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Join thousands of people who use Toolspy every day to monitor their health. It's free, private, and gives you the insights you need for better wellness.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Calculate Your BMI Now →
          </Button>
        </div>
      </section>
    </div>
  );
} 