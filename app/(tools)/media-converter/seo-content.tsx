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
  Video,
  Music,
  FileArchive,
  Download,
  Clock,
  Layers,
  Volume2,
} from "lucide-react";
import { getToolBySlug, tools } from "@/lib/tools-data";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";

export function MediaConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const tool = getToolBySlug("media-converter");

  const comparisonData = [
    {
      feature: "Video Formats",
      toolspy: "✅ 8+ formats",
      handbrake: "✅ 10+ formats",
      convertio: "✅ 15+ formats",
      onlineconvert: "✅ 12+ formats",
      toolspyStatus: "excellent",
    },
    {
      feature: "Audio Formats",
      toolspy: "✅ 7+ formats",
      handbrake: "⚠️ Limited",
      convertio: "✅ 10+ formats",
      onlineconvert: "✅ 8+ formats",
      toolspyStatus: "excellent",
    },
    {
      feature: "Batch Processing",
      toolspy: "✅ Multiple files",
      handbrake: "✅ Queue support",
      convertio: "⚠️ 2 files max",
      onlineconvert: "⚠️ Premium only",
      toolspyStatus: "excellent",
    },
    {
      feature: "Video to GIF",
      toolspy: "✅ Advanced options",
      handbrake: "❌ Not supported",
      convertio: "✅ Basic",
      onlineconvert: "✅ Basic",
      toolspyStatus: "excellent",
    },
    {
      feature: "Archive Support",
      toolspy: "✅ 5+ formats",
      handbrake: "❌ Not supported",
      convertio: "✅ Premium",
      onlineconvert: "✅ Limited",
      toolspyStatus: "excellent",
    },
    {
      feature: "Privacy Protection",
      toolspy: "✅ Client-side",
      handbrake: "✅ Offline app",
      convertio: "⚠️ Server upload",
      onlineconvert: "⚠️ Server upload",
      toolspyStatus: "excellent",
    },
    {
      feature: "File Size Limit",
      toolspy: "100MB",
      handbrake: "No limit",
      convertio: "100MB free",
      onlineconvert: "100MB free",
      toolspyStatus: "excellent",
    },
    {
      feature: "Registration Required",
      toolspy: "✅ No signup",
      handbrake: "✅ No signup",
      convertio: "⚠️ Email required",
      onlineconvert: "⚠️ Account needed",
      toolspyStatus: "excellent",
    },
  ];

  const features = [
    {
      icon: <Video className="h-6 w-6" />,
      title: "Video Conversion",
      description: "Convert between MP4, AVI, MOV, WMV, MKV, WebM, and more with quality presets from mobile to 4K."
    },
    {
      icon: <Music className="h-6 w-6" />,
      title: "Audio Conversion",
      description: "Transform audio files between MP3, WAV, AAC, OGG, FLAC, and other formats with customizable bitrates."
    },
    {
      icon: <FileArchive className="h-6 w-6" />,
      title: "Archive Processing",
      description: "Convert and compress archives between ZIP, RAR, 7Z, TAR, and GZ formats with adjustable compression."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Batch Processing",
      description: "Convert multiple files simultaneously with consistent settings and progress tracking."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "All conversions happen locally in your browser - files never leave your device."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Advanced Controls",
      description: "Fine-tune quality, bitrate, resolution, frame rate, and compression for optimal results."
    }
  ];

  const useCases = [
    {
      title: "Content Creation",
      description: "Convert videos for different platforms, create GIFs for social media, and optimize audio for podcasts.",
      examples: ["YouTube videos", "Instagram stories", "TikTok content", "Podcast audio"]
    },
    {
      title: "Media Optimization",
      description: "Reduce file sizes for web use, convert to compatible formats, and optimize for mobile devices.",
      examples: ["Website videos", "Email attachments", "Mobile playback", "Streaming optimization"]
    },
    {
      title: "Archive Management",
      description: "Convert between archive formats, compress files for storage, and extract content efficiently.",
      examples: ["File compression", "Format migration", "Storage optimization", "Backup creation"]
    },
    {
      title: "Format Compatibility",
      description: "Ensure media works across all devices and platforms by converting to universal formats.",
      examples: ["Device compatibility", "Platform support", "Legacy format updates", "Cross-platform sharing"]
    }
  ];

  const videoFormats = [
    { format: "MP4", description: "Universal compatibility", usage: "General use" },
    { format: "AVI", description: "High quality, larger files", usage: "Professional" },
    { format: "MOV", description: "Apple devices", usage: "iOS/macOS" },
    { format: "WMV", description: "Windows Media", usage: "Windows" },
    { format: "MKV", description: "Open source, versatile", usage: "High quality" },
    { format: "WebM", description: "Web optimized", usage: "Web streaming" },
    { format: "FLV", description: "Flash video", usage: "Legacy web" },
    { format: "GIF", description: "Animated images", usage: "Social media" }
  ];

  const audioFormats = [
    { format: "MP3", description: "Universal compatibility", usage: "General use" },
    { format: "WAV", description: "Uncompressed quality", usage: "Professional" },
    { format: "AAC", description: "Apple preferred", usage: "iTunes/iOS" },
    { format: "OGG", description: "Open source", usage: "Gaming/web" },
    { format: "FLAC", description: "Lossless compression", usage: "Audiophiles" },
    { format: "M4A", description: "iTunes audio", usage: "Apple devices" },
    { format: "WMA", description: "Windows Media", usage: "Windows" }
  ];

  const faqs = [
    {
      question: "What video formats can I convert between?",
      answer: "Our converter supports 8+ popular video formats including MP4, AVI, MOV, WMV, MKV, WebM, FLV, and M4V. You can also convert videos to animated GIFs with customizable quality and frame rate settings. Each format is optimized for specific use cases and device compatibility."
    },
    {
      question: "How do I convert video to GIF with good quality?",
      answer: "For optimal GIF quality, use our advanced settings: set frame rate to 10-15 FPS for smooth animation, adjust the scale to reduce file size, and trim the video to 2-5 seconds. Higher frame rates create smoother but larger GIFs, while lower rates save space but may appear choppy."
    },
    {
      question: "Can I convert multiple files at once?",
      answer: "Yes! Our batch processing feature allows you to upload and convert multiple files simultaneously. All files will use the same conversion settings, and you can monitor progress for each file individually. This is perfect for processing entire media libraries efficiently."
    },
    {
      question: "What audio formats are supported?",
      answer: "We support all major audio formats including MP3, WAV, AAC, OGG, FLAC, M4A, and WMA. You can customize audio quality from 64 kbps to 320 kbps, adjust sample rates from 22.05 kHz to 96 kHz, and choose between different audio codecs for optimal compatibility."
    },
    {
      question: "Is my media data secure during conversion?",
      answer: "Absolutely! All conversion processing happens locally in your browser using WebAssembly technology. Your files never leave your device, ensuring complete privacy and security. No uploads to external servers means your content stays 100% private."
    },
    {
      question: "How can I reduce video file size?",
      answer: "To reduce file size, try these settings: lower the video quality preset (720p instead of 1080p), reduce the bitrate, decrease frame rate to 24-30 FPS, or convert to a more efficient format like WebM or MP4 with H.264 compression. These changes maintain good quality while significantly reducing file size."
    },
    {
      question: "What's the maximum file size I can convert?",
      answer: "You can convert files up to 100MB each. For larger files, consider using our trimming feature to convert only the portions you need, or compress the file first using our archive converter to reduce size before video/audio conversion."
    },
    {
      question: "Can I trim videos during conversion?",
      answer: "Yes! Enable the trimming feature in settings to specify start and end times. This is perfect for extracting specific clips, removing unwanted sections, or creating shorter versions for social media. Trimming also helps reduce processing time and output file size."
    },
    {
      question: "Which format should I choose for social media?",
      answer: "For social media, use MP4 with H.264 codec for videos (universal compatibility), MP3 at 128 kbps for audio, and GIF for short animated clips. Instagram prefers MP4 at 1080x1080 or 9:16 aspect ratio, while YouTube works best with MP4 at 1920x1080 resolution."
    },
    {
      question: "How do I convert and compress archive files?",
      answer: "Upload your archive file (ZIP, RAR, 7Z, TAR, GZ) and select the target format. Adjust the compression level from 1 (fastest) to 9 (best compression). Higher levels create smaller files but take longer to process. ZIP format offers the best compatibility across all platforms."
    }
  ];

  // Register FAQ data for schema generation
  if (typeof window !== 'undefined') {
    registerToolFAQ('media-converter', () => faqs);
  }

  return (
    <div className="space-y-12 mt-12">
      {/* Features Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Complete Media Conversion Suite
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Convert videos, audio files, and archives with professional-grade quality and complete privacy protection.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
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

      {/* Supported Formats */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Supported File Formats
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive support for all popular media and archive formats with optimized conversion settings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Video Formats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-purple-600" />
                Video Formats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {videoFormats.map((format, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded border">
                    <div>
                      <div className="font-medium">{format.format}</div>
                      <div className="text-sm text-gray-600">{format.description}</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {format.usage}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Audio Formats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5 text-purple-600" />
                Audio Formats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {audioFormats.map((format, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded border">
                    <div>
                      <div className="font-medium">{format.format}</div>
                      <div className="text-sm text-gray-600">{format.description}</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {format.usage}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Comparison Table */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How We Compare
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how our media converter outperforms popular alternatives with better privacy and comprehensive format support.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold bg-purple-50">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Toolspy
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold">HandBrake</th>
                    <th className="text-center p-4 font-semibold">Convertio</th>
                    <th className="text-center p-4 font-semibold">OnlineConvert</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center bg-purple-50">
                        <div className="flex items-center justify-center gap-2">
                          {row.toolspyStatus === "excellent" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">{row.toolspy}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">{row.handbrake}</td>
                      <td className="p-4 text-center">{row.convertio}</td>
                      <td className="p-4 text-center">{row.onlineconvert}</td>
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
            Perfect for Every Media Need
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From content creation to media optimization, our converter handles all your file transformation needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
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

      {/* Quality Settings Guide */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Quality Settings Guide
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the right quality settings for your specific needs and use cases.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Mobile & Web</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div><strong>Video:</strong> 720p, 1000 kbps</div>
                <div><strong>Audio:</strong> 96 kbps AAC</div>
                <div><strong>Format:</strong> MP4 (H.264)</div>
                <div><strong>Best for:</strong> Social media, websites, mobile viewing</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Standard Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div><strong>Video:</strong> 1080p, 2000 kbps</div>
                <div><strong>Audio:</strong> 128 kbps AAC</div>
                <div><strong>Format:</strong> MP4 (H.264)</div>
                <div><strong>Best for:</strong> General use, sharing, streaming</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">High Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div><strong>Video:</strong> 4K, 8000 kbps</div>
                <div><strong>Audio:</strong> 320 kbps AAC</div>
                <div><strong>Format:</strong> MP4 (H.265) or MKV</div>
                <div><strong>Best for:</strong> Professional use, archival, editing</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about media conversion, formats, and optimization.
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
          currentToolSlug="media-converter"
        />
      </section>
    </div>
  );
}