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
  ThumbsUp,
} from "lucide-react";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import { FacebookEngagementCalculatorSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface EngagementMetrics {
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  reach: number;
  impressions: number;
  reactions: number;
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

function FacebookEngagementCalculatorContent() {
  const { showToast } = useToast();
  const [followerCount, setFollowerCount] = useState("");
  const [metrics, setMetrics] = useState<EngagementMetrics>({
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
    reach: 0,
    impressions: 0,
    reactions: 0,
  });
  const [contentType, setContentType] = useState("post");
  const [accountType, setAccountType] = useState("personal");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateEngagement = () => {
    if (!followerCount || parseInt(followerCount) === 0) {
      showToast("Please enter your follower count", "error");
      return;
    }

    const followers = parseInt(followerCount);
    const totalEngagement = metrics.likes + metrics.comments + metrics.shares + metrics.saves + metrics.reactions;
    
    // Calculate engagement rate
    const engagementRate = (totalEngagement / followers) * 100;
    
    // Calculate quality score based on engagement types
    const commentWeight = 5; // Comments are worth more on Facebook
    const shareWeight = 4;   // Shares are very valuable
    const saveWeight = 3;    // Saves show intent
    const reactionWeight = 2; // Reactions are good
    const likeWeight = 1;    // Basic engagement
    
    const weightedEngagement = 
      (metrics.comments * commentWeight) +
      (metrics.shares * shareWeight) +
      (metrics.saves * saveWeight) +
      (metrics.reactions * reactionWeight) +
      (metrics.likes * likeWeight);
    
    const qualityScore = Math.min(100, (weightedEngagement / followers) * 100);

    // Determine engagement score
    let engagementScore = "";
    if (engagementRate >= 4) engagementScore = "Excellent";
    else if (engagementRate >= 2.5) engagementScore = "Good";
    else if (engagementRate >= 1.2) engagementScore = "Average";
    else engagementScore = "Poor";

    // Generate recommendations
    const recommendations = [];
    if (engagementRate < 1.2) {
      recommendations.push("Focus on creating more engaging content");
      recommendations.push("Increase posting frequency");
      recommendations.push("Use Facebook Live for better engagement");
    }
    if (metrics.comments / totalEngagement < 0.08) {
      recommendations.push("Ask questions to encourage comments");
      recommendations.push("Respond to existing comments promptly");
    }
    if (metrics.shares < totalEngagement * 0.03) {
      recommendations.push("Create shareable content");
      recommendations.push("Use trending topics and hashtags");
    }
    if (metrics.reactions < totalEngagement * 0.4) {
      recommendations.push("Create content that evokes emotions");
      recommendations.push("Use Facebook Stories for more reactions");
    }

    // Benchmark comparisons
    const benchmarkComparison = {
      excellent: 4.0,
      good: 2.5,
      average: 1.2,
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
    setFollowerCount("");
    setMetrics({
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      reach: 0,
      impressions: 0,
      reactions: 0,
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
          className="font-bold text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Professional Facebook Analytics
        </Badge>

        <h1 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-indigo-700 dark:to-indigo-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Facebook Engagement Calculator
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Calculate your Facebook engagement rate and analyze your social media performance 
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
                Enter your Facebook metrics to calculate engagement rate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Account Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="followers">Follower Count *</Label>
                  <Input
                    id="followers"
                    type="number"
                    placeholder="Enter your follower count"
                    value={followerCount}
                    onChange={(e) => setFollowerCount(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Account Type</Label>
                    <Select value={accountType} onValueChange={setAccountType}>
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
                        <SelectItem value="post">Post</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="story">Story</SelectItem>
                        <SelectItem value="live">Live</SelectItem>
                        <SelectItem value="reel">Reel</SelectItem>
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
                    <Label htmlFor="reactions" className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Reactions
                    </Label>
                    <Input
                      id="reactions"
                      type="number"
                      placeholder="0"
                      value={metrics.reactions}
                      onChange={(e) => setMetrics({...metrics, reactions: parseInt(e.target.value) || 0})}
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

                  <div>
                    <Label htmlFor="saves" className="flex items-center gap-2">
                      <Bookmark className="h-4 w-4" />
                      Saves
                    </Label>
                    <Input
                      id="saves"
                      type="number"
                      placeholder="0"
                      value={metrics.saves}
                      onChange={(e) => setMetrics({...metrics, saves: parseInt(e.target.value) || 0})}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reach" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Reach
                    </Label>
                    <Input
                      id="reach"
                      type="number"
                      placeholder="0 (optional)"
                      value={metrics.reach}
                      onChange={(e) => setMetrics({...metrics, reach: parseInt(e.target.value) || 0})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="impressions" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Impressions
                    </Label>
                    <Input
                      id="impressions"
                      type="number"
                      placeholder="0 (optional)"
                      value={metrics.impressions}
                      onChange={(e) => setMetrics({...metrics, impressions: parseInt(e.target.value) || 0})}
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
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                      <div className="text-2xl font-bold text-blue-600">
                        {result.engagementRate}%
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        Engagement Rate
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/20 dark:to-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                      <div className="text-2xl font-bold text-indigo-600">
                        {result.qualityScore}%
                      </div>
                      <div className="text-sm text-indigo-700 dark:text-indigo-300">
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
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
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
                  Enter your Facebook metrics and click "Calculate Engagement" to see your results.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <FacebookEngagementCalculatorSEOContent />
    </div>
  );
}

export default function FacebookEngagementCalculatorPage() {
  return (
    <ToolPageWrapper toolSlug="facebook-engagement-calculator"><ToastProvider>
      <FacebookEngagementCalculatorContent /></ToastProvider></ToolPageWrapper>
  );
}
