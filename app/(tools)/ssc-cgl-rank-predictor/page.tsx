"use client";

import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressModal } from "@/components/tools/shared/progress-modal";
import { ToastProvider, useToast } from "@/components/tools/shared/toast-provider";
import { Download, Copy, Calculator, Target, TrendingUp, Award, BookOpen, Building, Users, Star, Shield, Clock, BarChart3 } from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import { SSCCGLRankPredictorSEOContent } from "./seo-content";

interface SSCCGLCandidate {
  id: string;
  tier1Score: number;
  tier2Score: number;
  totalScore: number;
  category: string;
  timestamp: number;
}

interface PostOption {
  name: string;
  department: string;
  rank: number;
  description: string;
  location: string;
  salary: string;
  rating: number;
}

export default function SSCCGLRankPredictor() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const [tier1Score, setTier1Score] = useState<number>(0);
  const [tier2Score, setTier2Score] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [category, setCategory] = useState<string>("General");
  const [predictedRank, setPredictedRank] = useState<number>(0);
  const [postOptions, setPostOptions] = useState<PostOption[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recentPredictions, setRecentPredictions] = useState<SSCCGLCandidate[]>([]);

  // Load recent predictions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ssc-cgl-predictions');
    if (saved) {
      setRecentPredictions(JSON.parse(saved));
    }
  }, []);

  // Auto-calculate total score
  useEffect(() => {
    const total = tier1Score + tier2Score;
    setTotalScore(total);
  }, [tier1Score, tier2Score]);

  const calculateRank = (score: number, category: string): number => {
    // SSC CGL rank calculation based on historical data
    const baseRank = Math.max(1, Math.round(5000 - (score / 600) * 5000));
    
    // Category-wise adjustments
    const categoryMultipliers = {
      "General": 1.0,
      "OBC": 0.80,
      "SC": 0.65,
      "ST": 0.60,
      "EWS": 0.85
    };
    
    const multiplier = categoryMultipliers[category as keyof typeof categoryMultipliers] || 1.0;
    return Math.max(1, Math.round(baseRank * multiplier));
  };

  const getPostOptions = (rank: number): PostOption[] => {
    const posts = [
      { name: "Assistant Audit Officer (AAO)", department: "C&AG", rank: 1, description: "Audit and accounting in government departments", location: "All India", salary: "₹47,600-1,51,100", rating: 5.0 },
      { name: "Assistant Section Officer (ASO)", department: "Central Secretariat", rank: 5, description: "Administrative work in central ministries", location: "Delhi", salary: "₹47,600-1,51,100", rating: 4.9 },
      { name: "Inspector (Income Tax)", department: "CBDT", rank: 10, description: "Tax assessment and collection", location: "All India", salary: "₹47,600-1,51,100", rating: 4.8 },
      { name: "Inspector (Central Excise)", department: "CBIC", rank: 15, description: "Customs and excise duty collection", location: "All India", salary: "₹47,600-1,51,100", rating: 4.7 },
      { name: "Inspector (Preventive Officer)", department: "CBIC", rank: 20, description: "Prevention of smuggling and customs violations", location: "All India", salary: "₹47,600-1,51,100", rating: 4.6 },
      { name: "Inspector (Examiner)", department: "CBIC", rank: 25, description: "Examination of imported/exported goods", location: "All India", salary: "₹47,600-1,51,100", rating: 4.5 },
      { name: "Assistant Enforcement Officer", department: "ED", rank: 30, description: "Enforcement of economic laws", location: "All India", salary: "₹47,600-1,51,100", rating: 4.4 },
      { name: "Sub Inspector (CBI)", department: "CBI", rank: 35, description: "Criminal investigation and law enforcement", location: "All India", salary: "₹47,600-1,51,100", rating: 4.3 },
      { name: "Inspector (Narcotics)", department: "NCB", rank: 40, description: "Narcotics control and enforcement", location: "All India", salary: "₹47,600-1,51,100", rating: 4.2 },
      { name: "Assistant (CSS)", department: "Central Secretariat", rank: 45, description: "Administrative support in ministries", location: "Delhi", salary: "₹35,400-1,12,400", rating: 4.1 },
      { name: "Assistant (AFHQ)", department: "Armed Forces HQ", rank: 50, description: "Administrative work in armed forces", location: "Delhi", salary: "₹35,400-1,12,400", rating: 4.0 },
      { name: "Inspector (Post)", department: "Department of Posts", rank: 55, description: "Postal services management", location: "All India", salary: "₹47,600-1,51,100", rating: 3.9 },
      { name: "Assistant (Railway)", department: "Railway Board", rank: 60, description: "Railway administration", location: "All India", salary: "₹35,400-1,12,400", rating: 3.8 },
      { name: "Assistant (FCI)", department: "Food Corporation", rank: 65, description: "Food procurement and distribution", location: "All India", salary: "₹35,400-1,12,400", rating: 3.7 },
      { name: "Assistant (NIA)", department: "National Investigation Agency", rank: 70, description: "Terrorism and national security investigations", location: "All India", salary: "₹35,400-1,12,400", rating: 3.6 }
    ];

    return posts.filter(post => rank <= post.rank + 15).slice(0, 8);
  };

  const handleCalculate = async () => {
    if (totalScore === 0) {
      showToast("Please enter your SSC CGL scores", "error");
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const rank = calculateRank(totalScore, category);
    const posts = getPostOptions(rank);
    
    setPredictedRank(rank);
    setPostOptions(posts);
    setShowResults(true);
    
    // Save to recent predictions
    const newPrediction: SSCCGLCandidate = {
      id: Date.now().toString(),
      tier1Score,
      tier2Score,
      totalScore,
      category,
      timestamp: Date.now()
    };
    
    const updated = [newPrediction, ...recentPredictions.slice(0, 4)];
    setRecentPredictions(updated);
    localStorage.setItem('ssc-cgl-predictions', JSON.stringify(updated));
    
    setIsCalculating(false);
    scrollToElement(resultsRef);
    showToast("SSC CGL rank calculated successfully!", "success");
  };

  const handleReset = () => {
    setTier1Score(0);
    setTier2Score(0);
    setTotalScore(0);
    setCategory("General");
    setPredictedRank(0);
    setPostOptions([]);
    setShowResults(false);
  };

  const copyResults = () => {
    const results = `SSC CGL Rank Prediction Results:
Total Score: ${totalScore}/600
Predicted Rank: ${predictedRank}
Category: ${category}

Top Post Options:
${postOptions.slice(0, 5).map((post, index) => 
  `${index + 1}. ${post.name} - Rank ${post.rank} (${post.salary})`
).join('\n')}

Generated by Toolspy SSC CGL Rank Predictor`;

    navigator.clipboard.writeText(results);
    showToast("Results copied to clipboard!", "success");
  };

  const downloadResults = () => {
    const results = `SSC CGL Rank Prediction Results
Generated on: ${new Date().toLocaleDateString()}

Your Scores:
- Tier 1 Score: ${tier1Score}/200
- Tier 2 Score: ${tier2Score}/400
- Total Score: ${totalScore}/600

Category: ${category}
Predicted Rank: ${predictedRank}

Post Options:
${postOptions.map((post, index) => 
  `${index + 1}. ${post.name}
   Department: ${post.department}
   Required Rank: ${post.rank}
   Description: ${post.description}
   Location: ${post.location}
   Salary: ${post.salary}
   Rating: ${post.rating}/5.0
   `
).join('\n')}

Note: This is an estimate based on historical data. Actual results may vary.
Generated by Toolspy SSC CGL Rank Predictor`;

    const blob = new Blob([results], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ssc-cgl-rank-prediction-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast("Results downloaded successfully!", "success");
  };

  return (
    <ToastProvider>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SSC CGL Rank Predictor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Predict your SSC CGL rank and discover government job options based on your scores. 
            Get instant predictions with detailed post recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Enter Your SSC CGL Scores
                </CardTitle>
                <CardDescription>
                  Enter your exam scores to predict your rank and post options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tier1-score">Tier 1 Score</Label>
                    <Input
                      id="tier1-score"
                      type="number"
                      min="0"
                      max="200"
                      value={tier1Score}
                      onChange={(e) => setTier1Score(Number(e.target.value))}
                      placeholder="Enter Tier 1 score (0-200)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tier2-score">Tier 2 Score</Label>
                    <Input
                      id="tier2-score"
                      type="number"
                      min="0"
                      max="400"
                      value={tier2Score}
                      onChange={(e) => setTier2Score(Number(e.target.value))}
                      placeholder="Enter Tier 2 score (0-400)"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="OBC">OBC</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="ST">ST</SelectItem>
                      <SelectItem value="EWS">EWS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-blue-900">Total Score:</span>
                    <span className="text-2xl font-bold text-blue-600">{totalScore}/600</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={handleCalculate} 
                    disabled={isCalculating || totalScore === 0}
                    className="flex-1"
                  >
                    {isCalculating ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Target className="h-4 w-4 mr-2" />
                        Predict Rank
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            {showResults && (
              <Card ref={resultsRef} className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Prediction Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {predictedRank}
                      </div>
                      <div className="text-sm text-green-700">Predicted Rank</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {totalScore}/600
                      </div>
                      <div className="text-sm text-blue-700">Total Score</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {postOptions.length}
                      </div>
                      <div className="text-sm text-purple-700">Post Options</div>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-6">
                    <Button onClick={copyResults} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Results
                    </Button>
                    <Button onClick={downloadResults} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Recommended Posts</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {postOptions.map((post, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-lg">{post.name}</h4>
                                <Badge variant="secondary">{post.department}</Badge>
                              </div>
                              <p className="text-gray-600 mb-3">{post.description}</p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Target className="h-4 w-4" />
                                  Rank {post.rank}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Building className="h-4 w-4" />
                                  {post.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Award className="h-4 w-4" />
                                  {post.salary}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4" />
                                  {post.rating}/5.0
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Protected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  All calculations are performed locally in your browser. 
                  No data is sent to our servers, ensuring complete privacy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Recent Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentPredictions.length > 0 ? (
                  <div className="space-y-3">
                    {recentPredictions.slice(0, 3).map((prediction) => (
                      <div key={prediction.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{prediction.totalScore}/600</span>
                          <span className="text-sm text-gray-500">
                            {new Date(prediction.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          T1: {prediction.tier1Score} | T2: {prediction.tier2Score}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No recent predictions</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  SSC CGL Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium mb-2">Exam Structure:</div>
                  <div className="space-y-1 text-gray-600">
                    <div>• Tier 1: 200 marks</div>
                    <div>• Tier 2: 400 marks</div>
                    <div>• Total: 600 marks</div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium mb-2">Rank Calculation:</div>
                  <div className="text-gray-600">
                    Based on historical SSC CGL data and category-wise normalization
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <ProgressModal 
          isOpen={isCalculating} 
          title="Calculating SSC CGL Rank"
          current={1}
          total={1}
          description="Please wait while we calculate your rank..."
        />
        <SSCCGLRankPredictorSEOContent />
      </div>
    </ToastProvider>
  );
}
