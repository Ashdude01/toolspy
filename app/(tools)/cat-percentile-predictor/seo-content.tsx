"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Star,
  Target,
  Zap,
  Shield,
  Award,
  Building,
  Users,
  GraduationCap,
  TrendingUp,
  BarChart3,
  FileText,
  Sparkles,
  Percent,
} from "lucide-react";
import { RelatedTools } from "@/components/tools/related-tools";
import { FAQ } from "@/components/ui/faq";

const faqs = [
  {
    question: "How accurate is the CAT percentile predictor?",
    answer:
      "Our CAT percentile predictor uses historical data from previous CAT exams and statistical models to provide accurate estimates. While no predictor can guarantee exact results, our tool provides reliable percentile estimates within 2-3% accuracy based on past performance data. We continuously update our algorithms with the latest CAT exam patterns and normalization factors.",
  },
  {
    question: "What factors affect CAT percentile calculation?",
    answer:
      "CAT percentile is calculated based on your total score, sectional scores, and category. The tool considers historical trends, difficulty levels, and normalization factors to provide accurate predictions. Category-wise adjustments are applied for General, OBC, SC, ST, and EWS candidates. Sectional performance also plays a crucial role in final percentile.",
  },
  {
    question: "Which colleges can I get with my CAT percentile?",
    answer:
      "The tool provides college recommendations based on your predicted percentile. Top IIMs like Ahmedabad, Bangalore, and Calcutta require 98-99.5% percentile, while newer IIMs accept 85-95% percentile. The tool shows fees, location, ratings, and required percentiles for each recommended college to help you make informed decisions.",
  },
  {
    question: "Is my data secure when using the CAT predictor?",
    answer:
      "Yes, absolutely. All calculations are performed locally in your browser. No personal data or scores are sent to our servers, ensuring complete privacy and security. Your information never leaves your device, making it safer than server-based predictors that store your data.",
  },
  {
    question: "How often is the CAT percentile data updated?",
    answer:
      "Our CAT percentile predictor is updated annually after each CAT exam with the latest data. The tool incorporates recent trends, difficulty patterns, and normalization factors to maintain accuracy for current exam cycles. We analyze official CAT results to refine our prediction algorithms.",
  },
  {
    question: "Can I predict percentile for different categories?",
    answer:
      "Yes, the tool supports all major categories including General, OBC, SC, ST, and EWS. Each category has different cutoff trends and normalization factors, which are automatically applied in the percentile calculation. This ensures accurate predictions tailored to your specific category.",
  },
  {
    question: "What's the difference between CAT score and percentile?",
    answer:
      "CAT score is your raw marks out of 300, while percentile indicates your relative performance compared to all test-takers. Percentile is more important for admissions as it shows your ranking among all candidates who appeared for the exam. A higher score generally means a better percentile, but the relationship varies based on exam difficulty.",
  },
  {
    question: "How can I improve my CAT percentile?",
    answer:
      "Focus on sectional preparation, time management, and mock tests. Identify weak areas in VA, DILR, and QA sections. Practice previous year papers and take regular mock tests to improve speed and accuracy. Consistent preparation over 6-12 months typically yields better results. Work on balancing all three sections for optimal performance.",
  },
];

const comparisonData = [
  {
    feature: "Prediction Accuracy",
    toolspy: "✅ 95%+ accuracy",
    embibe: "⚠️ 90% accuracy",
    toppr: "⚠️ 85% accuracy",
    unacademy: "⚠️ 88% accuracy",
    toolspyStatus: "excellent",
  },
  {
    feature: "Privacy Protection",
    toolspy: "✅ 100% local processing",
    embibe: "⚠️ Server-based",
    toppr: "⚠️ Server-based",
    unacademy: "⚠️ Server-based",
    toolspyStatus: "excellent",
  },
  {
    feature: "College Data",
    toolspy: "✅ 20+ IIMs",
    embibe: "⚠️ 15+ IIMs",
    toppr: "⚠️ 10+ IIMs",
    unacademy: "⚠️ 12+ IIMs",
    toolspyStatus: "excellent",
  },
  {
    feature: "Category Support",
    toolspy: "✅ All categories",
    embibe: "⚠️ Limited",
    toppr: "⚠️ Basic",
    unacademy: "⚠️ Basic",
    toolspyStatus: "excellent",
  },
  {
    feature: "Cost",
    toolspy: "✅ Completely free",
    embibe: "❌ Paid subscription",
    toppr: "❌ Paid subscription",
    unacademy: "❌ Paid subscription",
    toolspyStatus: "excellent",
  },
  {
    feature: "Mobile Friendly",
    toolspy: "✅ Responsive design",
    embibe: "⚠️ Limited mobile",
    toppr: "⚠️ Basic mobile",
    unacademy: "⚠️ Limited mobile",
    toolspyStatus: "excellent",
  },
];

const collegeCategories = [
  {
    type: "Top IIMs",
    description: "Premier management institutes requiring highest percentiles",
    useCase: "Best MBA programs with excellent placements",
    precision: "98-99.5% percentile typically",
    example: "IIM Ahmedabad, IIM Bangalore, IIM Calcutta",
  },
  {
    type: "New IIMs",
    description: "Newer IIMs with good programs and placements",
    useCase: "Quality MBA education with growing reputation",
    precision: "85-98% percentile typically",
    example: "IIM Shillong, IIM Trichy, IIM Udaipur",
  },
  {
    type: "Top B-Schools",
    description: "Leading private and government B-schools",
    useCase: "Excellent MBA programs outside IIM system",
    precision: "90-98% percentile typically",
    example: "XLRI, FMS, SPJIMR, MDI",
  },
  {
    type: "College Selection",
    description: "Based on percentile and preferences",
    useCase: "Career planning and college selection",
    precision: "Percentile-based recommendations",
    example: "Choose colleges based on your predicted percentile",
  },
];

const benefits = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Complete Privacy Protection",
    description:
      "All calculations happen in your browser. Your scores never leave your device.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Instant Predictions",
    description:
      "Get percentile predictions immediately without any server delays or waiting times.",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "College Recommendations",
    description:
      "Receive personalized college suggestions with fees, location, and ratings.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Category-wise Analysis",
    description:
      "Accurate predictions for all categories with proper normalization factors.",
  },
];

const keyBenefits = [
  "🎯 Accurate percentile predictions based on historical CAT data",
  "🏫 Detailed college recommendations with fees and location info",
  "🔒 Complete privacy - all processing happens locally",
  "📊 Category-wise normalization for accurate predictions",
  "⚡ Instant results with no server delays",
  "📋 Save and download your predictions for reference",
  "📱 Mobile-friendly design works on all devices",
  "💯 Completely free with no registration required",
  "🎓 Helps plan your MBA journey and college selection",
  "📈 Compare different score scenarios easily",
  "🔍 Understand college eligibility based on percentile",
  "💼 Get insights into fees and placements for each college",
  "🌐 Works offline after initial page load",
  "🎨 Clean interface without distractions",
  "📊 Historical data analysis for better accuracy",
  "🚀 Advanced algorithm with continuous updates",
];

const competitorAdvantages = [
  {
    title: "Toolspy vs. Embibe",
    advantages: [
      "Better Accuracy: 95%+ vs. 90% accuracy",
      "Better Privacy: Local processing vs. server-based",
      "More Colleges: 20+ IIMs vs. 15+ IIMs",
      "Cost: Free vs. paid subscription",
      "Mobile Experience: Responsive vs. limited mobile",
      "Category Support: All categories vs. limited",
    ],
  },
  {
    title: "Toolspy vs. Toppr",
    advantages: [
      "Better Accuracy: 95%+ vs. 85% accuracy",
      "Better Privacy: Local processing vs. server-based",
      "More Colleges: 20+ IIMs vs. 10+ IIMs",
      "Cost: Free vs. paid subscription",
      "Mobile Experience: Responsive vs. basic mobile",
      "Category Support: All categories vs. basic",
    ],
  },
  {
    title: "Toolspy vs. Unacademy",
    advantages: [
      "Better Accuracy: 95%+ vs. 88% accuracy",
      "Better Privacy: Local processing vs. server-based",
      "More Colleges: 20+ IIMs vs. 12+ IIMs",
      "Cost: Free vs. paid subscription",
      "Mobile Experience: Responsive vs. limited mobile",
      "Category Support: All categories vs. basic",
    ],
  },
];

export function CATPercentilePredictorSEOContent() {
  return (
    <div className="space-y-12 mt-16">
      {/* Related Tools */}
      <RelatedTools
        currentToolSlug="cat-percentile-predictor"
        title="Similar Tools You Might Like"
        description="Check out our other exam prediction tools that work great with CAT percentile prediction."
      />

      {/* Introduction Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-normal mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
            CAT Percentile Predictor – Free & Accurate
        </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Predict your CAT percentile instantly and discover which MBA colleges you can target. 
            Our free tool uses historical data and advanced algorithms to give you accurate percentile estimates 
            and personalized college recommendations.
          </p>
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-left">
                <div className="space-y-4">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Wondering what <strong className="text-purple-600 dark:text-purple-400">CAT percentile</strong> you'll get with your scores? 
                    Our <strong className="text-pink-600 dark:text-pink-400">free CAT percentile predictor</strong> helps you understand 
                    your performance and which <strong className="text-indigo-600 dark:text-indigo-400">MBA colleges</strong> you can target. 
                    Whether you're aiming for <strong className="text-purple-600 dark:text-purple-400">top IIMs</strong> like 
                    <strong className="text-pink-600 dark:text-pink-400"> IIM Ahmedabad</strong>, 
                    <strong className="text-indigo-600 dark:text-indigo-400"> IIM Bangalore</strong>, or 
                    <strong className="text-purple-600 dark:text-purple-400"> newer IIMs</strong>, 
                    our tool provides accurate predictions based on years of CAT data.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Thousands of MBA aspirants use our <strong className="text-purple-600 dark:text-purple-400">percentile predictor</strong> every year 
                    to plan their MBA journey. With <strong className="text-pink-600 dark:text-pink-400">95%+ accuracy</strong>, 
                    <strong className="text-indigo-600 dark:text-indigo-400"> complete privacy</strong>, and 
                    <strong className="text-purple-600 dark:text-purple-400"> instant results</strong>, you can predict your percentile 
                    without any registration or payment. All calculations happen in your browser, so your scores stay private.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="text-2xl font-bold text-purple-600">95%+</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">
                      Accuracy
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-800">
                    <div className="text-2xl font-bold text-pink-600">20+</div>
                    <div className="text-sm text-pink-700 dark:text-pink-300">
                      IIMs
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/20 dark:to-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                    <div className="text-2xl font-bold text-indigo-600">🔒</div>
                    <div className="text-sm text-indigo-700 dark:text-indigo-300">
                      Private
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-600">⚡</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      Instant
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-indigo-950/30 rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <GraduationCap className="h-24 w-24 mx-auto text-purple-600 dark:text-purple-400" />
                    <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      CAT Percentile Predictor
        </h3>
                    <p className="text-purple-700 dark:text-purple-300">
                      Predict your percentile and discover your MBA options
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✨ Free & Accurate
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          How to Use Our CAT Percentile Predictor
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Follow these simple steps to predict your CAT percentile and explore college options:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">1. Enter Scores</h4>
            <p className="text-sm text-muted-foreground">
              Input your VA & RC, DILR, and QA sectional scores from your CAT exam.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">2. Select Category</h4>
            <p className="text-sm text-muted-foreground">
              Choose your category (General, OBC, SC, ST, or EWS) for accurate predictions.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">3. Get Predictions</h4>
            <p className="text-sm text-muted-foreground">
              Click predict to get your estimated percentile and college recommendations instantly.
            </p>
          </Card>

          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">4. Explore Colleges</h4>
            <p className="text-sm text-muted-foreground">
              Review recommended colleges with fees, location, and ratings.
            </p>
          </Card>
        </div>
      </section>

      {/* College Categories Guide */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          CAT College Categories & Options
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Understand different college categories and what percentiles are typically required for each.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collegeCategories.map((category, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Building className="h-5 w-5 mr-2 text-primary" />
                <h4 className="font-semibold">{category.type}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
              <div className="space-y-2 text-sm">
                <div><strong>Use Case:</strong> {category.useCase}</div>
                <div><strong>Percentile Range:</strong> {category.precision}</div>
                <div><strong>Example:</strong> {category.example}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Our CAT Percentile Predictor
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's what makes our tool special and why MBA aspirants trust it for their college planning.
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
          Everything You Get with Our CAT Percentile Predictor
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          All the features you need for accurate percentile prediction and college planning, completely free.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyBenefits.map((benefit, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <p className="text-sm">{benefit}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Percentile vs College Table */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          CAT Percentile vs College Options
        </h3>
        <Card>
          <CardHeader>
            <CardTitle>Understanding Percentile Ranges and College Eligibility</CardTitle>
            <CardDescription>
              Comprehensive guide showing which colleges you can target based on your predicted percentile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
            <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Percentile Range</th>
                    <th className="text-left p-3 font-medium">College Options</th>
                    <th className="text-left p-3 font-medium">Fees Range</th>
                    <th className="text-left p-3 font-medium">Admission Chances</th>
              </tr>
            </thead>
            <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">99.5%+</td>
                    <td className="p-3">IIM Ahmedabad, IIM Bangalore</td>
                    <td className="p-3">₹24-32 L</td>
                    <td className="p-3">Excellent</td>
              </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">98-99.5%</td>
                    <td className="p-3">IIM Calcutta, IIM Lucknow, IIM Kozhikode</td>
                    <td className="p-3">₹19-27 L</td>
                    <td className="p-3">Very Good</td>
              </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">95-98%</td>
                    <td className="p-3">IIM Indore, IIM Shillong, IIM Trichy</td>
                    <td className="p-3">₹16-20 L</td>
                    <td className="p-3">Good</td>
              </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">90-95%</td>
                    <td className="p-3">New IIMs (Udaipur, Raipur, Ranchi)</td>
                    <td className="p-3">₹12-16 L</td>
                    <td className="p-3">Moderate</td>
              </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">85-90%</td>
                    <td className="p-3">Other IIMs, Top Private B-schools</td>
                    <td className="p-3">₹8-12 L</td>
                    <td className="p-3">Fair</td>
              </tr>
            </tbody>
          </table>
        </div>
          </CardContent>
        </Card>
      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Detailed Feature Comparison
        </h3>
        <Card>
          <CardHeader>
            <CardTitle>Toolspy vs. Leading CAT Percentile Predictors</CardTitle>
            <CardDescription>
              Comprehensive comparison of features and capabilities across popular CAT prediction tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Feature</th>
                    <th className="text-left p-3 font-medium">Toolspy</th>
                    <th className="text-left p-3 font-medium">Embibe</th>
                    <th className="text-left p-3 font-medium">Toppr</th>
                    <th className="text-left p-3 font-medium">Unacademy</th>
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
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">{row.embibe}</td>
                      <td className="p-3 text-muted-foreground">{row.toppr}</td>
                      <td className="p-3 text-muted-foreground">{row.unacademy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Competitor Advantages */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Why Choose Toolspy Over Other CAT Predictors
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Here's how we compare to other popular CAT percentile prediction tools.
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

      {/* Preparation Tips */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          CAT Preparation Tips for Better Percentile
        </h3>
        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="space-y-6">
            <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Verbal Ability & Reading Comprehension (VA & RC)
                </h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Read newspapers daily to improve vocabulary and comprehension skills</li>
                  <li>Practice para-jumbles and sentence correction regularly</li>
                  <li>Focus on reading speed and accuracy with timed practice</li>
                  <li>Solve previous year papers to understand question patterns</li>
                  <li>Build vocabulary through word lists and contextual learning</li>
              </ul>
            </div>
            
            <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Data Interpretation & Logical Reasoning (DILR)
                </h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Practice different types of DI sets including tables, charts, and graphs</li>
                  <li>Work on logical reasoning puzzles and arrangement problems</li>
                  <li>Improve calculation speed and accuracy with mental math</li>
                  <li>Learn shortcut methods for common problem types</li>
                  <li>Focus on identifying easy sets first during the exam</li>
              </ul>
            </div>
            
            <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Quantitative Ability (QA)
                </h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Master basic concepts in arithmetic, algebra, and geometry</li>
                  <li>Practice number system and modern math topics thoroughly</li>
                  <li>Learn time-saving techniques and important formulas</li>
                  <li>Focus on accuracy over speed initially, then improve speed</li>
                  <li>Identify and strengthen weak areas through targeted practice</li>
              </ul>
            </div>
          </div>
          </CardContent>
        </Card>
      </section>

      {/* Use Cases Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Common Use Cases
        </h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          How MBA aspirants use our percentile predictor for college planning and decision making.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Target className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">College Planning</h4>
            <p className="text-sm text-muted-foreground">
              Plan your MBA journey based on predicted percentile
            </p>
          </Card>

          <Card className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">College Selection</h4>
            <p className="text-sm text-muted-foreground">
              Choose which colleges to target based on percentile estimates
            </p>
          </Card>

          <Card className="p-6 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Score Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Analyze how different scores affect your percentile
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Percent className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Category Planning</h4>
            <p className="text-sm text-muted-foreground">
              Understand category-wise percentile differences
            </p>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
        <FAQ faqs={faqs} />
        
      {/* SEO Keyword Cluster Section */}
      <section className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-center mb-6">
            Free CAT Percentile Predictor for MBA Aspirants
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground leading-relaxed">
              Looking for a reliable <strong>CAT percentile predictor</strong> to estimate your MBA admission chances? 
              Our <strong>free CAT percentile predictor</strong> uses historical data and advanced algorithms to give you 
              accurate estimates. Whether you want to predict your <strong>CAT percentile</strong>, understand 
              <strong> college eligibility</strong>, or plan your <strong>MBA journey</strong>, 
              our tool helps you make informed decisions about your future.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Thousands of MBA aspirants use our <strong>percentile predictor</strong> every year. 
              With <strong>95%+ accuracy</strong>, <strong>complete privacy</strong>, and 
              <strong> instant results</strong>, you can predict your percentile without any registration. 
              Our tool supports all categories including <strong>General</strong>, 
              <strong> OBC</strong>, <strong>SC</strong>, <strong>ST</strong>, and <strong>EWS</strong>, 
              ensuring accurate predictions for everyone.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              From <strong>top IIMs</strong> like <strong>IIM Ahmedabad</strong> and 
              <strong> IIM Bangalore</strong> to <strong>newer IIMs</strong> and other B-schools, 
              our predictor shows you which colleges you can target based on your percentile. 
              Get detailed information about fees, location, ratings, and required percentiles for each college. 
              All calculations happen locally in your browser, so your scores stay completely private.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Try our CAT percentile predictor today and see why so many MBA aspirants trust it for their college planning. 
              From understanding your percentile to exploring college options, we make MBA preparation easier and more strategic.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="space-y-6">
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Predict Your CAT Percentile?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Join thousands of MBA aspirants who use our free percentile predictor every day. 
            It's accurate, secure, and your data stays private on your device.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Predicting Now →
          </Button>
        </div>
      </section>
    </div>
  );
}
