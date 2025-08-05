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
import { Label } from "@/components/ui/label";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Star,
  Target,
  Zap,
  Shield,
  Settings,
  FileText,
  Brain,
  TrendingUp,
  Download,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";

export function AiResumeBuilderSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("ai-resume-builder");

  const comparisonData = [
    {
      feature: "AI Content Generation",
      toolspy: "✅ Smart suggestions",
      resumegenius: "✅ AI writing help",
      canva: "❌ Templates only",
      indeed: "✅ Basic suggestions",
      toolspyStatus: "excellent",
    },
    {
      feature: "Job Matching",
      toolspy: "✅ AI job compatibility",
      resumegenius: "❌ Not available",
      canva: "❌ Not available",
      indeed: "❌ Not available",
      toolspyStatus: "excellent",
    },
    {
      feature: "ATS Optimization",
      toolspy: "✅ Built-in ATS scanner",
      resumegenius: "✅ ATS checker",
      canva: "❌ Not available",
      indeed: "✅ ATS friendly",
      toolspyStatus: "excellent",
    },
    {
      feature: "Template Variety",
      toolspy: "✅ 5 professional templates",
      resumegenius: "✅ 20+ templates",
      canva: "✅ 100+ templates",
      indeed: "✅ Basic templates",
      toolspyStatus: "excellent",
    },
    {
      feature: "Export Formats",
      toolspy: "✅ PDF, DOCX, TXT",
      resumegenius: "✅ PDF, DOCX",
      canva: "✅ PDF, PNG, JPG",
      indeed: "✅ PDF only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Local processing",
      resumegenius: "⚠️ Cloud storage",
      canva: "⚠️ Account required",
      indeed: "⚠️ Profile creation",
      toolspyStatus: "excellent",
    },
    {
      feature: "Free Usage",
      toolspy: "✅ Unlimited free",
      resumegenius: "✅ Limited free",
      canva: "✅ Limited free",
      indeed: "✅ Free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Real-time Preview",
      toolspy: "✅ Live preview",
      resumegenius: "✅ Preview mode",
      canva: "✅ Design preview",
      indeed: "✅ Basic preview",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Content",
      description: "Generate professional summaries, achievements, and skill suggestions tailored to your target role and industry."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Smart Job Matching",
      description: "AI analyzes your resume against job descriptions and provides compatibility scores with improvement recommendations."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "ATS Optimization",
      description: "Built-in applicant tracking system optimization ensures your resume passes automated screening filters."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Professional Templates",
      description: "Choose from expertly designed templates optimized for different industries and career levels."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "All resume building happens locally in your browser - your personal information stays private and secure."
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Multiple Formats",
      description: "Download your resume in PDF, DOCX, or TXT format, optimized for different submission requirements."
    }
  ];

  const useCases = [
    {
      title: "Job Seekers",
      description: "Create compelling resumes that stand out in competitive job markets and pass ATS screening.",
      examples: ["Career changers", "Recent graduates", "Experienced professionals", "Remote workers"]
    },
    {
      title: "Career Advancement",
      description: "Optimize existing resumes for promotions, industry transitions, and leadership positions.",
      examples: ["Management roles", "Executive positions", "Industry pivots", "Skill showcasing"]
    },
    {
      title: "Students & Graduates",
      description: "Build professional resumes with limited experience using AI-powered content suggestions.",
      examples: ["Entry-level positions", "Internship applications", "Graduate school", "First jobs"]
    },
    {
      title: "Freelancers & Contractors",
      description: "Create project-focused resumes that highlight diverse skills and client successes.",
      examples: ["Contract work", "Portfolio showcase", "Skill demonstrations", "Client testimonials"]
    }
  ];

  const templateTypes = [
    {
      name: "Modern Professional",
      description: "Clean, contemporary design",
      bestFor: ["Tech industry", "Startups", "Creative roles", "Modern companies"]
    },
    {
      name: "Classic Elegant",
      description: "Traditional, formal layout",
      bestFor: ["Finance", "Law", "Government", "Conservative industries"]
    },
    {
      name: "Creative Designer",
      description: "Eye-catching, artistic format",
      bestFor: ["Design roles", "Marketing", "Media", "Creative industries"]
    },
    {
      name: "Minimalist Clean",
      description: "Simple, content-focused design",
      bestFor: ["Academic", "Research", "Healthcare", "Education"]
    }
  ];

  const faqs = [
    {
      question: "How does the AI content generation work?",
      answer: "Our AI analyzes your target job title and industry to generate personalized professional summaries, achievement statements, and skill recommendations. It uses best practices from successful resumes in your field and incorporates industry-specific keywords for ATS optimization."
    },
    {
      question: "What is ATS optimization and why is it important?",
      answer: "ATS (Applicant Tracking System) optimization ensures your resume can be properly read and ranked by automated screening software used by most employers. Our tool formats your resume with proper keywords, structure, and formatting to pass these initial screenings and reach human recruiters."
    },
    {
      question: "How accurate is the AI job matching feature?",
      answer: "Our AI job matching analyzes your resume content against job requirements, providing compatibility scores based on skill matches, experience level, and keyword alignment. While highly accurate for guidance, it should be used alongside your professional judgment and industry knowledge."
    },
    {
      question: "Can I customize the AI-generated content?",
      answer: "Absolutely! All AI suggestions are fully editable. Use them as starting points and customize the content to reflect your unique experience, achievements, and voice. The AI provides structure and ideas, but your personal touch makes the resume authentic."
    },
    {
      question: "Which resume template should I choose?",
      answer: "Template choice depends on your industry and role level. Use Modern Professional for tech/startups, Classic Elegant for traditional industries like finance/law, Creative Designer for artistic roles, and Minimalist Clean for academic/research positions. Consider your company culture when deciding."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, completely secure! All resume building happens locally in your browser. Your personal information, work history, and resume content never leave your device or get stored on our servers, ensuring complete privacy and data protection."
    },
    {
      question: "What file formats can I download?",
      answer: "You can download your resume in PDF (best for most applications), DOCX (for easy editing), or TXT (for plain text submissions). Each format is optimized for different use cases and submission requirements."
    },
    {
      question: "How do I make my resume stand out?",
      answer: "Focus on quantifiable achievements rather than just job duties, use industry-specific keywords, tailor content to each application, and leverage our AI suggestions for professional language. Strong action verbs and specific metrics make the biggest impact."
    },
    {
      question: "Can I create multiple versions of my resume?",
      answer: "Yes! You can create different versions for different roles or industries. Save your base information and modify the summary, skills, and emphasis for each target position. This customization significantly improves your application success rate."
    },
    {
      question: "How long should my resume be?",
      answer: "Generally, 1-2 pages is optimal. Entry-level positions should aim for 1 page, while experienced professionals can use 2 pages. Focus on relevance over length - include only information that strengthens your candidacy for the specific role you're targeting."
    }
  ];

  // Register FAQ data for schema generation
  if (typeof window !== 'undefined') {
    registerToolFAQ('ai-resume-builder', () => faqs);
  }

  return (
    <div className="space-y-12 mt-12">
      {/* Features Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our AI Resume Builder?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced AI technology combined with professional templates and job matching capabilities to create resumes that get results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Template Guide */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Professional Resume Templates
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the perfect template for your industry and career level with our expertly designed options.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templateTypes.map((template, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Best for:</Label>
                  {template.bestFor.map((use, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {use}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How We Compare
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how our AI resume builder outperforms popular alternatives with advanced features and better privacy.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold bg-blue-50">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Toolspy
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold">Resume Genius</th>
                    <th className="text-center p-4 font-semibold">Canva</th>
                    <th className="text-center p-4 font-semibold">Indeed</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center bg-blue-50">
                        <div className="flex items-center justify-center gap-2">
                          {row.toolspyStatus === "excellent" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">{row.toolspy}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">{row.resumegenius}</td>
                      <td className="p-4 text-center">{row.canva}</td>
                      <td className="p-4 text-center">{row.indeed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Use Cases */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Perfect For Every Career Stage
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From students to executives, our AI resume builder adapts to your career level and industry needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  {useCase.title}
                </CardTitle>
                <CardDescription>{useCase.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {useCase.examples.map((example, idx) => (
                    <Badge key={idx} variant="secondary">
                      {example}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about building professional resumes with AI assistance and ATS optimization.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto"
                  onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                >
                  <CardTitle className="text-left text-lg font-semibold">
                    {faq.question}
                  </CardTitle>
                  {selectedFaq === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </CardHeader>
              {selectedFaq === index && (
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section>
                <RelatedTools
          currentToolSlug="ai-resume-builder"
        />
      </section>
    </div>
  );
}