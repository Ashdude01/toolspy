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
  Download,
  Video,
  Music,
  Image as ImageIcon,
  Youtube,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";

export function SocialMediaDownloaderSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("social-media-downloader");

  const comparisonData = [
    {
      feature: "Supported Platforms",
      toolspy: "✅ 5 major platforms",
      savefrom: "✅ 10+ platforms",
      y2mate: "✅ YouTube only",
      "4k-downloader": "✅ Multiple platforms",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Downloads",
      toolspy: "✅ Multiple URLs at once",
      savefrom: "❌ Single only",
      y2mate: "❌ Single only",
      "4k-downloader": "✅ Batch support",
      toolspyStatus: "excellent",
    },
    {
      feature: "Quality Options",
      toolspy: "✅ Up to 4K quality",
      savefrom: "✅ Up to 1080p",
      y2mate: "✅ Up to 720p",
      "4k-downloader": "✅ Up to 8K",
      toolspyStatus: "excellent",
    },
    {
      feature: "Audio Extraction",
      toolspy: "✅ MP3, high quality",
      savefrom: "✅ Basic audio",
      y2mate: "✅ MP3 only",
      "4k-downloader": "✅ Multiple formats",
      toolspyStatus: "excellent",
    },
    {
      feature: "No Registration",
      toolspy: "✅ Completely free",
      savefrom: "✅ No signup required",
      y2mate: "✅ Free to use",
      "4k-downloader": "⚠️ Premium features",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ No data storage",
      savefrom: "⚠️ Server processing",
      y2mate: "⚠️ Ads and tracking",
      "4k-downloader": "✅ Local software",
      toolspyStatus: "excellent",
    },
    {
      feature: "Download Speed",
      toolspy: "✅ Fast downloads",
      savefrom: "✅ Good speed",
      y2mate: "⚠️ Variable speed",
      "4k-downloader": "✅ Very fast",
      toolspyStatus: "excellent",
    },
    {
      feature: "Mobile Friendly",
      toolspy: "✅ Responsive design",
      savefrom: "✅ Mobile optimized",
      y2mate: "⚠️ Basic mobile",
      "4k-downloader": "❌ Desktop only",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Download className="h-6 w-6" />,
      title: "Multi-Platform Support",
      description: "Download from YouTube, Instagram, TikTok, Twitter, and Facebook with a single tool."
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "High-Quality Downloads",
      description: "Get videos in up to 4K resolution and audio in high-quality MP3 format."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Batch Processing",
      description: "Download multiple videos, images, and audio files simultaneously for efficient workflow."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "No registration required, no data stored, and completely secure downloads."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Format Options",
      description: "Choose from multiple video formats (MP4, WebM) and audio formats (MP3, WAV)."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Smart Analysis",
      description: "Automatically detect media type, quality options, and provide detailed information."
    }
  ];

  const useCases = [
    {
      title: "Content Creation",
      description: "Download videos and images for editing, compilation, and creating new content.",
      examples: ["Video editing", "Compilation videos", "Reaction content", "Educational materials"]
    },
    {
      title: "Marketing & Business",
      description: "Save promotional content, competitor analysis, and social media assets for campaigns.",
      examples: ["Ad inspiration", "Competitor research", "Brand assets", "Campaign materials"]
    },
    {
      title: "Education & Training",
      description: "Download educational videos, tutorials, and resources for offline learning.",
      examples: ["Online courses", "Tutorial videos", "Educational content", "Training materials"]
    },
    {
      title: "Personal Archive",
      description: "Save memorable content, favorite videos, and personal collections for offline viewing.",
      examples: ["Favorite videos", "Music collection", "Photo memories", "Entertainment content"]
    }
  ];

  const platformFeatures = [
    {
      platform: "YouTube",
      icon: <Youtube className="h-5 w-5 text-red-600" />,
      features: ["Videos up to 4K", "Audio extraction", "Playlists support", "Live streams"]
    },
    {
      platform: "Instagram",
      icon: <Instagram className="h-5 w-5 text-purple-600" />,
      features: ["Stories & Reels", "High-res images", "IGTV videos", "Profile pictures"]
    },
    {
      platform: "TikTok",
      icon: <Video className="h-5 w-5 text-black" />,
      features: ["HD videos", "No watermark", "Audio extraction", "Trending content"]
    },
    {
      platform: "Twitter",
      icon: <Twitter className="h-5 w-5 text-blue-500" />,
      features: ["Video tweets", "GIF downloads", "Image threads", "Profile media"]
    }
  ];

  const faqs = [
    {
      question: "Which social media platforms are supported?",
      answer: "We support downloads from YouTube, Instagram, TikTok, Twitter, and Facebook. You can download videos, images, and audio content from these platforms in various quality options up to 4K resolution."
    },
    {
      question: "Is it legal to download content from social media?",
      answer: "Downloading content is generally legal for personal use, but you should respect copyright laws and platform terms of service. Always ensure you have permission to download and use content, especially for commercial purposes. Check local laws and platform policies."
    },
    {
      question: "What video qualities and formats are available?",
      answer: "We offer multiple quality options including 360p, 480p, 720p, 1080p, and up to 4K (when available). Supported formats include MP4, WebM for videos, and MP3, WAV for audio. The available options depend on the original content quality."
    },
    {
      question: "Can I download audio only from videos?",
      answer: "Yes! You can extract audio from any video and download it as MP3 or other audio formats. This is perfect for downloading music, podcasts, or any audio content from video platforms."
    },
    {
      question: "How does batch downloading work?",
      answer: "Batch downloading allows you to process multiple URLs simultaneously. Simply switch to batch mode, add multiple URLs (one per line), and click 'Download All'. The tool will process each URL and download all files automatically."
    },
    {
      question: "Do you store downloaded content or user data?",
      answer: "No, we don't store any content or user data. All processing happens in your browser, downloads go directly to your device, and no personal information is collected or stored on our servers."
    },
    {
      question: "Why can't I download some videos?",
      answer: "Some videos may be protected by copyright, set to private, or have download restrictions. Age-restricted content, live streams, or region-blocked videos might also be unavailable. We respect platform policies and content creator rights."
    },
    {
      question: "How do I download Instagram Stories or Reels?",
      answer: "For Instagram content, paste the direct URL of the story, reel, or post. You may need to get the URL by right-clicking on the content or using Instagram's share feature. Stories are only available while they're active (24 hours)."
    },
    {
      question: "Can I remove TikTok watermarks?",
      answer: "Our tool can download TikTok videos in their highest available quality. While we provide options to minimize watermarks where technically possible, we always respect content creators' rights and platform terms of service."
    },
    {
      question: "What should I do if a download fails?",
      answer: "If a download fails, try checking the URL format, ensure the content is public and accessible, refresh the page, or try again later. Some content may have temporary restrictions or the platform may have updated their security measures."
    }
  ];

  // Register FAQ data for schema generation
  if (typeof window !== 'undefined') {
    registerToolFAQ('social-media-downloader', () => faqs);
  }

  return (
    <div className="space-y-12 mt-12">
      {/* Features Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our Social Media Downloader?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Fast, secure, and feature-rich downloading from all major social media platforms with no registration required.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-pink-200 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
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

      {/* Platform Features */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Platform-Specific Features
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Optimized downloading capabilities for each social media platform with specialized features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformFeatures.map((platform, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {platform.icon}
                  <CardTitle className="text-lg">{platform.platform}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {platform.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
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
            See how our social media downloader outperforms popular alternatives with better features and privacy.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold bg-pink-50">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Toolspy
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold">SaveFrom</th>
                    <th className="text-center p-4 font-semibold">Y2Mate</th>
                    <th className="text-center p-4 font-semibold">4K Downloader</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center bg-pink-50">
                        <div className="flex items-center justify-center gap-2">
                          {row.toolspyStatus === "excellent" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">{row.toolspy}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">{row.savefrom}</td>
                      <td className="p-4 text-center">{row.y2mate}</td>
                      <td className="p-4 text-center">{row["4k-downloader"]}</td>
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
            Perfect For Every Need
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From content creation to personal archiving, our downloader serves creators, marketers, educators, and enthusiasts.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-pink-600" />
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
            Everything you need to know about downloading content from social media platforms safely and legally.
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
          currentToolSlug="social-media-downloader"
        />
      </section>
    </div>
  );
}