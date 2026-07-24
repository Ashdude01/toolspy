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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calculator,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  BarChart3,
  Target,
  Zap,
  Shield,
  Settings,
  Play,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface EngagementMetrics {
  likes: number;
  dislikes: number;
  comments: number;
  shares: number;
  subscribers: number;
  views: number;
  watchTime: number; // in minutes
  clickThroughRate: number; // percentage
}

interface CalculationResult {
  engagementRate: number;
  engagementScore: string;
  qualityScore: number;
  recommendations: string[];
  benchmarkComparison: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
  };
}

function YouTubeEngagementCalculatorContent() {
  const { showToast } = useToast();
  const [subscriberCount, setSubscriberCount] = useState("");
  const [metrics, setMetrics] = useState<EngagementMetrics>({
    likes: 0,
    dislikes: 0,
    comments: 0,
    shares: 0,
    subscribers: 0,
    views: 0,
    watchTime: 0,
    clickThroughRate: 0,
  });
  const [contentType, setContentType] = useState("video");
  const [channelType, setChannelType] = useState("personal");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateEngagement = () => {
    if (!subscriberCount || parseInt(subscriberCount) === 0) {
      showToast("Please enter your subscriber count", "error");
      return;
    }

    const subscribers = parseInt(subscriberCount);
    const totalEngagement = metrics.likes + metrics.comments + metrics.shares;
    
    // Calculate engagement rate
    const engagementRate = (totalEngagement / subscribers) * 100;
    
    // Calculate quality score based on engagement types and watch time
    const commentWeight = 8; // Comments are worth more on YouTube
    const shareWeight = 6;   // Shares are very valuable
    const likeWeight = 1;    // Basic engagement
    const watchTimeWeight = 0.1; // Watch time bonus
    const ctrWeight = 0.5;   // Click-through rate bonus
    
    const weightedEngagement = 
      (metrics.comments * commentWeight) +
      (metrics.shares * shareWeight) +
      (metrics.likes * likeWeight) +
      (metrics.watchTime * watchTimeWeight) +
      (metrics.clickThroughRate * ctrWeight);
    
    const qualityScore = Math.min(100, (weightedEngagement / subscribers) * 100);

    // Determine engagement score
    let engagementScore = "";
    if (engagementRate >= 5.0) engagementScore = "Excellent";
    else if (engagementRate >= 3.0) engagementScore = "Good";
    else if (engagementRate >= 1.5) engagementScore = "Average";
    else engagementScore = "Poor";

    // Generate recommendations
    const recommendations = [];
    if (engagementRate < 1.5) {
      recommendations.push("Focus on creating more engaging content");
      recommendations.push("Improve video titles and thumbnails");
      recommendations.push("Increase posting frequency");
    }
    if (metrics.comments / totalEngagement < 0.1) {
      recommendations.push("Ask questions to encourage comments");
      recommendations.push("Respond to existing comments promptly");
      recommendations.push("Create content that sparks discussion");
    }
    if (metrics.shares < totalEngagement * 0.02) {
      recommendations.push("Create shareable content");
      recommendations.push("Use trending topics and hashtags");
      recommendations.push("Collaborate with other creators");
    }
    if (metrics.watchTime < 5) {
      recommendations.push("Improve video retention with better hooks");
      recommendations.push("Create longer, more engaging content");
      recommendations.push("Optimize video pacing and editing");
    }
    if (metrics.clickThroughRate < 3) {
      recommendations.push("Improve thumbnail design and titles");
      recommendations.push("Use more compelling video descriptions");
      recommendations.push("Test different thumbnail styles");
    }

    // Benchmark comparisons
    const benchmarkComparison = {
      excellent: 5.0,
      good: 3.0,
      average: 1.5,
      poor: 0.5,
    };

    setResult({
      engagementRate: Math.round(engagementRate * 100) / 100,
      engagementScore,
      qualityScore: Math.round(qualityScore * 100) / 100,
      recommendations,
      benchmarkComparison,
    });

    showToast("Engagement rate calculated successfully!", "success");
  };

  const resetCalculator = () => {
    setSubscriberCount("");
    setMetrics({
      likes: 0,
      dislikes: 0,
      comments: 0,
      shares: 0,
      subscribers: 0,
      views: 0,
      watchTime: 0,
      clickThroughRate: 0,
    });
    setResult(null);
    showToast("Calculator reset", "info");
  };

  const getEngagementColor = (score: string) => {
    switch (score) {
      case "Excellent": return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300";
      case "Good": return "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300";
      case "Average": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300";
      case "Poor": return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-900"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Professional YouTube Analytics
        </Badge>

        <h2 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-red-700 dark:to-red-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          YouTube Engagement Calculator
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Calculate your YouTube engagement rate and analyze your video performance 
          with our professional analytics tool. Get insights and recommendations to improve your reach.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Engagement Calculator
              </CardTitle>
              <CardDescription>
                Enter your YouTube metrics to calculate engagement rate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Account Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subscribers">Subscriber Count *</Label>
                  <Input
                    id="subscribers"
                    type="number"
                    placeholder="Enter your subscriber count"
                    value={subscriberCount}
                    onChange={(e) => setSubscriberCount(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Channel Type</Label>
                    <Select value={channelType} onValueChange={setChannelType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="creator">Creator</SelectItem>
                        <SelectItem value="influencer">Influencer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Content Type</Label>
                    <Select value={contentType} onValueChange={setContentType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="short">Short</SelectItem>
                        <SelectItem value="live">Live Stream</SelectItem>
                        <SelectItem value="premiere">Premiere</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Engagement Metrics */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Engagement Metrics</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="likes" className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      Likes
                    </Label>
                    <Input
                      id="likes"
                      type="number"
                      placeholder="0"
                      value={metrics.likes}
                      onChange={(e) => setMetrics({...metrics, likes: parseInt(e.target.value) || 0})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dislikes" className="flex items-center gap-2">
                      <ThumbsDown className="h-4 w-4" />
                      Dislikes
                    </Label>
                    <Input
                      id="dislikes"
                      type="number"
                      placeholder="0"
                      value={metrics.dislikes}
                      onChange={(e) => setMetrics({...metrics, dislikes: parseInt(e.target.value) || 0})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="comments" className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Comments
                    </Label>
                    <Input
                      id="comments"
                      type="number"
                      placeholder="0"
                      value={metrics.comments}
                      onChange={(e) => setMetrics({...metrics, comments: parseInt(e.target.value) || 0})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="shares" className="flex items-center gap-2">
                      <Share className="h-4 w-4" />
                      Shares
                    </Label>
                    <Input
                      id="shares"
                      type="number"
                      placeholder="0"
                      value={metrics.shares}
                      onChange={(e) => setMetrics({...metrics, shares: parseInt(e.target.value) || 0})}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="views" className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Views
                    </Label>
                    <Input
                      id="views"
                      type="number"
                      placeholder="0 (optional)"
                      value={metrics.views}
                      onChange={(e) => setMetrics({...metrics, views: parseInt(e.target.value) || 0})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="watchTime" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Watch Time (minutes)
                    </Label>
                    <Input
                      id="watchTime"
                      type="number"
                      placeholder="0 (optional)"
                      value={metrics.watchTime}
                      onChange={(e) => setMetrics({...metrics, watchTime: parseInt(e.target.value) || 0})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="clickThroughRate" className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Click-Through Rate (%)
                    </Label>
                    <Input
                      id="clickThroughRate"
                      type="number"
                      placeholder="0 (optional)"
                      value={metrics.clickThroughRate}
                      onChange={(e) => setMetrics({...metrics, clickThroughRate: parseFloat(e.target.value) || 0})}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={calculateEngagement} className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Engagement
                </Button>
                <Button onClick={resetCalculator} variant="outline">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {result ? (
            <>
              {/* Main Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Engagement Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                      <div className="text-2xl font-bold text-red-600">
                        {result.engagementRate}%
                      </div>
                      <div className="text-sm text-red-700 dark:text-red-300">
                        Engagement Rate
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                      <div className="text-2xl font-bold text-orange-600">
                        {result.qualityScore}%
                      </div>
                      <div className="text-sm text-orange-700 dark:text-orange-300">
                        Quality Score
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Badge className={`text-lg px-4 py-2 ${getEngagementColor(result.engagementScore)}`}>
                      {result.engagementScore} Performance
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Benchmark Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Industry Benchmarks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Excellent</span>
                      <span className="text-sm font-medium text-green-600">≥ {result.benchmarkComparison.excellent}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Good</span>
                      <span className="text-sm font-medium text-blue-600">≥ {result.benchmarkComparison.good}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average</span>
                      <span className="text-sm font-medium text-yellow-600">≥ {result.benchmarkComparison.average}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Poor</span>
                      <span className="text-sm font-medium text-red-600">&lt; {result.benchmarkComparison.poor}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Results Will Appear Here
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Enter your YouTube metrics and click "Calculate Engagement" to see your results.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
</div>
  );
}

export default function YouTubeEngagementCalculatorPage() {
  return (
    <ToolPageWrapper toolSlug="youtube-engagement-calculator"><ToastProvider>
      <YouTubeEngagementCalculatorContent /></ToastProvider></ToolPageWrapper>
  );
}
