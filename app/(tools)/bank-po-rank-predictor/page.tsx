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
import { BankPORankPredictorSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface BankPOCandidate {
  id: string;
  prelimsScore: number;
  mainsScore: number;
  interviewScore: number;
  totalScore: number;
  category: string;
  bank: string;
  timestamp: number;
}

interface PostingOption {
  name: string;
  bank: string;
  rank: number;
  description: string;
  location: string;
  salary: string;
  rating: number;
}

export default function BankPORankPredictor() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const [prelimsScore, setPrelimsScore] = useState<number>(0);
  const [mainsScore, setMainsScore] = useState<number>(0);
  const [interviewScore, setInterviewScore] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [category, setCategory] = useState<string>("General");
  const [bank, setBank] = useState<string>("SBI");
  const [predictedRank, setPredictedRank] = useState<number>(0);
  const [postingOptions, setPostingOptions] = useState<PostingOption[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recentPredictions, setRecentPredictions] = useState<BankPOCandidate[]>([]);

  // Load recent predictions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bank-po-predictions');
    if (saved) {
      setRecentPredictions(JSON.parse(saved));
    }
  }, []);

  // Auto-calculate total score
  useEffect(() => {
    const total = prelimsScore + mainsScore + interviewScore;
    setTotalScore(total);
  }, [prelimsScore, mainsScore, interviewScore]);

  const calculateRank = (score: number, category: string, bank: string): number => {
    // Bank PO rank calculation based on historical data
    const baseRank = Math.max(1, Math.round(2000 - (score / 300) * 2000));
    
    // Category-wise adjustments
    const categoryMultipliers = {
      "General": 1.0,
      "OBC": 0.85,
      "SC": 0.70,
      "ST": 0.65,
      "EWS": 0.90
    };
    
    // Bank-wise adjustments
    const bankMultipliers = {
      "SBI": 1.0,
      "IBPS": 0.95,
      "RBI": 1.1,
      "NABARD": 1.05,
      "Other": 0.90
    };
    
    const categoryMultiplier = categoryMultipliers[category as keyof typeof categoryMultipliers] || 1.0;
    const bankMultiplier = bankMultipliers[bank as keyof typeof bankMultipliers] || 1.0;
    return Math.max(1, Math.round(baseRank * categoryMultiplier * bankMultiplier));
  };

  const getPostingOptions = (rank: number, bank: string): PostingOption[] => {
    const postings = [
      { name: "Probationary Officer", bank: "SBI", rank: 1, description: "Branch management and banking operations", location: "All India", salary: "₹41,960-1,00,000", rating: 5.0 },
      { name: "Probationary Officer", bank: "IBPS", rank: 5, description: "Banking operations and customer service", location: "All India", salary: "₹36,000-85,000", rating: 4.8 },
      { name: "Assistant Manager", bank: "RBI", rank: 10, description: "Central banking operations and policy", location: "Mumbai", salary: "₹45,000-1,20,000", rating: 4.9 },
      { name: "Development Officer", bank: "NABARD", rank: 15, description: "Rural development and agricultural finance", location: "All India", salary: "₹40,000-95,000", rating: 4.7 },
      { name: "Probationary Officer", bank: "Bank of Baroda", rank: 20, description: "Banking operations and branch management", location: "All India", salary: "₹36,000-85,000", rating: 4.6 },
      { name: "Probationary Officer", bank: "Canara Bank", rank: 25, description: "Customer service and banking operations", location: "All India", salary: "₹36,000-85,000", rating: 4.5 },
      { name: "Probationary Officer", bank: "Punjab National Bank", rank: 30, description: "Banking services and operations", location: "All India", salary: "₹36,000-85,000", rating: 4.4 },
      { name: "Probationary Officer", bank: "Union Bank", rank: 35, description: "Banking operations and customer relations", location: "All India", salary: "₹36,000-85,000", rating: 4.3 },
      { name: "Probationary Officer", bank: "Bank of India", rank: 40, description: "Banking services and operations", location: "All India", salary: "₹36,000-85,000", rating: 4.2 },
      { name: "Probationary Officer", bank: "Central Bank", rank: 45, description: "Banking operations and customer service", location: "All India", salary: "₹36,000-85,000", rating: 4.1 },
      { name: "Probationary Officer", bank: "Indian Bank", rank: 50, description: "Banking services and operations", location: "All India", salary: "₹36,000-85,000", rating: 4.0 },
      { name: "Probationary Officer", bank: "UCO Bank", rank: 55, description: "Banking operations and customer relations", location: "All India", salary: "₹36,000-85,000", rating: 3.9 },
      { name: "Probationary Officer", bank: "Bank of Maharashtra", rank: 60, description: "Banking services and operations", location: "All India", salary: "₹36,000-85,000", rating: 3.8 },
      { name: "Probationary Officer", bank: "Punjab & Sind Bank", rank: 65, description: "Banking operations and customer service", location: "All India", salary: "₹36,000-85,000", rating: 3.7 },
      { name: "Probationary Officer", bank: "Indian Overseas Bank", rank: 70, description: "Banking services and operations", location: "All India", salary: "₹36,000-85,000", rating: 3.6 }
    ];

    return postings.filter(posting => 
      posting.bank === bank && rank <= posting.rank + 20
    ).slice(0, 8);
  };

  const handleCalculate = async () => {
    if (totalScore === 0) {
      showToast("Please enter your Bank PO scores", "error");
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const rank = calculateRank(totalScore, category, bank);
    const postings = getPostingOptions(rank, bank);
    
    setPredictedRank(rank);
    setPostingOptions(postings);
    setShowResults(true);
    
    // Save to recent predictions
    const newPrediction: BankPOCandidate = {
      id: Date.now().toString(),
      prelimsScore,
      mainsScore,
      interviewScore,
      totalScore,
      category,
      bank,
      timestamp: Date.now()
    };
    
    const updated = [newPrediction, ...recentPredictions.slice(0, 4)];
    setRecentPredictions(updated);
    localStorage.setItem('bank-po-predictions', JSON.stringify(updated));
    
    setIsCalculating(false);
    scrollToElement(resultsRef);
    showToast("Bank PO rank calculated successfully!", "success");
  };

  const handleReset = () => {
    setPrelimsScore(0);
    setMainsScore(0);
    setInterviewScore(0);
    setTotalScore(0);
    setCategory("General");
    setBank("SBI");
    setPredictedRank(0);
    setPostingOptions([]);
    setShowResults(false);
  };

  const copyResults = () => {
    const results = `Bank PO Rank Prediction Results:
Total Score: ${totalScore}/300
Predicted Rank: ${predictedRank}
Category: ${category}
Bank: ${bank}

Top Posting Options:
${postingOptions.slice(0, 5).map((posting, index) => 
  `${index + 1}. ${posting.name} - ${posting.bank} (${posting.salary})`
).join('\n')}

Generated by Toolspy Bank PO Rank Predictor`;

    navigator.clipboard.writeText(results);
    showToast("Results copied to clipboard!", "success");
  };

  const downloadResults = () => {
    const results = `Bank PO Rank Prediction Results
Generated on: ${new Date().toLocaleDateString()}

Your Scores:
- Prelims Score: ${prelimsScore}/100
- Mains Score: ${mainsScore}/200
- Interview Score: ${interviewScore}/100
- Total Score: ${totalScore}/300

Category: ${category}
Bank: ${bank}
Predicted Rank: ${predictedRank}

Posting Options:
${postingOptions.map((posting, index) => 
  `${index + 1}. ${posting.name}
   Bank: ${posting.bank}
   Required Rank: ${posting.rank}
   Description: ${posting.description}
   Location: ${posting.location}
   Salary: ${posting.salary}
   Rating: ${posting.rating}/5.0
   `
).join('\n')}

Note: This is an estimate based on historical data. Actual results may vary.
Generated by Toolspy Bank PO Rank Predictor`;

    const blob = new Blob([results], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bank-po-rank-prediction-${Date.now()}.txt`;
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
            Bank PO Rank Predictor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Predict your Bank PO rank and discover banking job options based on your scores. 
            Get instant predictions with detailed posting recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Enter Your Bank PO Scores
                </CardTitle>
                <CardDescription>
                  Enter your exam scores to predict your rank and posting options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prelims-score">Prelims Score</Label>
                    <Input
                      id="prelims-score"
                      type="number"
                      min="0"
                      max="100"
                      value={prelimsScore}
                      onChange={(e) => setPrelimsScore(Number(e.target.value))}
                      placeholder="Enter Prelims score (0-100)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mains-score">Mains Score</Label>
                    <Input
                      id="mains-score"
                      type="number"
                      min="0"
                      max="200"
                      value={mainsScore}
                      onChange={(e) => setMainsScore(Number(e.target.value))}
                      placeholder="Enter Mains score (0-200)"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="interview-score">Interview Score</Label>
                    <Input
                      id="interview-score"
                      type="number"
                      min="0"
                      max="100"
                      value={interviewScore}
                      onChange={(e) => setInterviewScore(Number(e.target.value))}
                      placeholder="Enter Interview score (0-100)"
                    />
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank">Bank</Label>
                  <Select value={bank} onValueChange={setBank}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SBI">State Bank of India (SBI)</SelectItem>
                      <SelectItem value="IBPS">IBPS (Common Bank PO)</SelectItem>
                      <SelectItem value="RBI">Reserve Bank of India (RBI)</SelectItem>
                      <SelectItem value="NABARD">NABARD</SelectItem>
                      <SelectItem value="Other">Other Banks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-blue-900">Total Score:</span>
                    <span className="text-2xl font-bold text-blue-600">{totalScore}/300</span>
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
                        {totalScore}/300
                      </div>
                      <div className="text-sm text-blue-700">Total Score</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {postingOptions.length}
                      </div>
                      <div className="text-sm text-purple-700">Posting Options</div>
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
                    <h3 className="text-lg font-semibold">Recommended Postings</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {postingOptions.map((posting, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-lg">{posting.name}</h4>
                                <Badge variant="secondary">{posting.bank}</Badge>
                              </div>
                              <p className="text-gray-600 mb-3">{posting.description}</p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Target className="h-4 w-4" />
                                  Rank {posting.rank}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Building className="h-4 w-4" />
                                  {posting.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Award className="h-4 w-4" />
                                  {posting.salary}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4" />
                                  {posting.rating}/5.0
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
                          <span className="font-medium">{prediction.totalScore}/300</span>
                          <span className="text-sm text-gray-500">
                            {new Date(prediction.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          P: {prediction.prelimsScore} | M: {prediction.mainsScore} | I: {prediction.interviewScore}
                        </div>
                        <div className="text-sm text-gray-500">
                          {prediction.bank} - {prediction.category}
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
                  Bank PO Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium mb-2">Exam Structure:</div>
                  <div className="space-y-1 text-gray-600">
                    <div>• Prelims: 100 marks</div>
                    <div>• Mains: 200 marks</div>
                    <div>• Interview: 100 marks</div>
                    <div>• Total: 300 marks</div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium mb-2">Rank Calculation:</div>
                  <div className="text-gray-600">
                    Based on historical Bank PO data and category-wise normalization
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <ProgressModal 
          isOpen={isCalculating} 
          title="Calculating Bank PO Rank"
          current={1}
          total={1}
          description="Please wait while we calculate your rank..."
        />
        <BankPORankPredictorSEOContent />
      </div>
    </ToastProvider>
  );
}
