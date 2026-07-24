"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calculator,
  Copy,
  Download,
  RefreshCw,
  Shield,
  TrendingUp,
  FileText,
  Percent,
  IndianRupee,
  Scale,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface SchemeComparison {
  totalTurnover: number;
  compositionTax: number;
  regularTax: number;
  savings: number;
  savingsPercentage: number;
  recommendedScheme: 'composition' | 'regular';
  compositionRate: number;
  regularRate: number;
}

const COMPOSITION_RATES = [
  { category: "Restaurant Services", rate: 5, description: "Restaurant services (non-AC)" },
  { category: "Other Services", rate: 6, description: "Other services (except restaurant)" },
  { category: "Manufacturing", rate: 1, description: "Manufacturing of goods" },
  { category: "Trading", rate: 1, description: "Trading of goods" },
  { category: "Mixed Business", rate: 1, description: "Mixed business (goods + services)" },
];

const REGULAR_RATES = [
  { category: "5% GST", rate: 5, description: "Essential goods and services" },
  { category: "12% GST", rate: 12, description: "Standard rate goods and services" },
  { category: "18% GST", rate: 18, description: "Most goods and services" },
  { category: "28% GST", rate: 28, description: "Luxury goods and services" },
];

function CompositionRegularSchemeEstimatorContent() {
  const [totalTurnover, setTotalTurnover] = useState<string>("");
  const [compositionRate, setCompositionRate] = useState<number>(6);
  const [regularRate, setRegularRate] = useState<number>(18);
  const [comparison, setComparison] = useState<SchemeComparison | null>(null);
  const [history, setHistory] = useState<SchemeComparison[]>([]);

  const calculateComparison = () => {
    const turnover = parseFloat(totalTurnover);
    if (isNaN(turnover) || turnover <= 0) return;

    // Calculate Composition Scheme Tax
    const compositionTax = (turnover * compositionRate) / 100;

    // Calculate Regular Scheme Tax (simplified - assumes all turnover is taxable)
    const regularTax = (turnover * regularRate) / 100;

    // Calculate savings
    const savings = regularTax - compositionTax;
    const savingsPercentage = regularTax > 0 ? (savings / regularTax) * 100 : 0;

    // Determine recommended scheme
    const recommendedScheme = savings > 0 ? 'composition' : 'regular';

    const newComparison: SchemeComparison = {
      totalTurnover: Math.round(turnover * 100) / 100,
      compositionTax: Math.round(compositionTax * 100) / 100,
      regularTax: Math.round(regularTax * 100) / 100,
      savings: Math.round(savings * 100) / 100,
      savingsPercentage: Math.round(savingsPercentage * 100) / 100,
      recommendedScheme,
      compositionRate,
      regularRate,
    };

    setComparison(newComparison);
    setHistory(prev => [newComparison, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    if (totalTurnover && !isNaN(parseFloat(totalTurnover))) {
      calculateComparison();
    }
  }, [totalTurnover, compositionRate, regularRate]);

  const copyResult = () => {
    if (!comparison) return;
    
    const resultText = `Scheme Comparison Result:
Total Turnover: ₹${comparison.totalTurnover}
Composition Scheme Tax (${comparison.compositionRate}%): ₹${comparison.compositionTax}
Regular Scheme Tax (${comparison.regularRate}%): ₹${comparison.regularTax}
Savings: ₹${comparison.savings} (${comparison.savingsPercentage}%)
Recommended Scheme: ${comparison.recommendedScheme === 'composition' ? 'Composition' : 'Regular'}`;
    
    navigator.clipboard.writeText(resultText);
  };

  const downloadResult = () => {
    if (!comparison) return;
    
    const resultText = `Scheme Comparison Report
Generated on: ${new Date().toLocaleDateString()}

Comparison Details:
Total Turnover: ₹${comparison.totalTurnover}
Composition Scheme Tax (${comparison.compositionRate}%): ₹${comparison.compositionTax}
Regular Scheme Tax (${comparison.regularRate}%): ₹${comparison.regularTax}
Savings: ₹${comparison.savings} (${comparison.savingsPercentage}%)
Recommended Scheme: ${comparison.recommendedScheme === 'composition' ? 'Composition' : 'Regular'}

This comparison is for reference purposes only.
Please consult with a tax professional for official scheme selection.`;
    
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scheme-comparison-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setTotalTurnover("");
    setCompositionRate(6);
    setRegularRate(18);
    setComparison(null);
    setHistory([]);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900 mb-4"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h2 className="bg-gradient-to-r from-green-500 dark:from-green-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Composition vs Regular Scheme Estimator
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Compare tax liability under Composition and Regular GST schemes. 
          Perfect for choosing the optimal scheme for your business.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Scheme Comparison Calculator
              </CardTitle>
              <CardDescription>
                Compare tax liability under different GST schemes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Total Turnover */}
              <div className="space-y-2">
                <Label htmlFor="turnover">Total Annual Turnover (₹)</Label>
                <Input
                  id="turnover"
                  type="number"
                  placeholder="Enter total annual turnover"
                  value={totalTurnover}
                  onChange={(e) => setTotalTurnover(e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* Composition Rate */}
              <div className="space-y-2">
                <Label htmlFor="composition-rate">Composition Scheme Rate (%)</Label>
                <Select value={compositionRate.toString()} onValueChange={(value) => setCompositionRate(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPOSITION_RATES.map((rate) => (
                      <SelectItem key={rate.category} value={rate.rate.toString()}>
                        {rate.rate}% - {rate.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Regular Rate */}
              <div className="space-y-2">
                <Label htmlFor="regular-rate">Regular Scheme Rate (%)</Label>
                <Select value={regularRate.toString()} onValueChange={(value) => setRegularRate(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {REGULAR_RATES.map((rate) => (
                      <SelectItem key={rate.category} value={rate.rate.toString()}>
                        {rate.rate}% - {rate.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={calculateComparison} className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Compare Schemes
                </Button>
                <Button variant="outline" onClick={clearAll}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {comparison && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Scheme Comparison Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Total Turnover:</span>
                      <span className="font-bold text-lg">₹{comparison.totalTurnover}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <span className="font-medium">Composition Tax ({comparison.compositionRate}%):</span>
                      <span className="font-bold text-lg text-blue-600">₹{comparison.compositionTax}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <span className="font-medium">Regular Tax ({comparison.regularRate}%):</span>
                      <span className="font-bold text-lg text-purple-600">₹{comparison.regularTax}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className={`flex justify-between items-center p-3 rounded-lg border ${
                      comparison.savings > 0 
                        ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                        : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                    }`}>
                      <span className="font-medium">Savings:</span>
                      <span className={`font-bold text-lg ${
                        comparison.savings > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ₹{comparison.savings}
                      </span>
                    </div>
                    <div className={`flex justify-between items-center p-3 rounded-lg border ${
                      comparison.savings > 0 
                        ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                        : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                    }`}>
                      <span className="font-medium">Savings %:</span>
                      <span className={`font-bold text-lg ${
                        comparison.savings > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {comparison.savingsPercentage}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <span className="font-medium">Recommended:</span>
                      <Badge variant={comparison.recommendedScheme === 'composition' ? 'default' : 'secondary'}>
                        {comparison.recommendedScheme === 'composition' ? 'Composition' : 'Regular'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Recommendation Explanation */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Recommendation:</h4>
                  <div className="text-sm space-y-1">
                    {comparison.recommendedScheme === 'composition' ? (
                      <>
                        <p><strong>Composition Scheme is recommended</strong> for your business.</p>
                        <p>• You can save ₹{comparison.savings} ({comparison.savingsPercentage}%) in taxes</p>
                        <p>• Composition tax: ₹{comparison.compositionTax} vs Regular tax: ₹{comparison.regularTax}</p>
                        <p>• Note: Composition scheme has restrictions on inter-state sales and ITC</p>
                      </>
                    ) : (
                      <>
                        <p><strong>Regular Scheme is recommended</strong> for your business.</p>
                        <p>• Regular scheme offers better tax benefits for your turnover</p>
                        <p>• Regular tax: ₹{comparison.regularTax} vs Composition tax: ₹{comparison.compositionTax}</p>
                        <p>• Regular scheme allows ITC and inter-state sales</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" onClick={copyResult} className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Result
                  </Button>
                  <Button variant="outline" onClick={downloadResult} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Composition Rates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5" />
                Composition Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {COMPOSITION_RATES.map((rate) => (
                  <div key={rate.category} className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{rate.category}</span>
                      <Badge variant="outline" className="text-xs">
                        {rate.rate}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{rate.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regular Rates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5" />
                Regular GST Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {REGULAR_RATES.map((rate) => (
                  <div key={rate.category} className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{rate.category}</span>
                      <Badge variant="outline" className="text-xs">
                        {rate.rate}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{rate.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calculation History */}
          {history.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Comparisons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.map((comp, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">₹{comp.totalTurnover}</span>
                        <Badge variant={comp.recommendedScheme === 'composition' ? 'default' : 'secondary'} className="text-xs">
                          {comp.recommendedScheme === 'composition' ? 'Comp' : 'Regular'}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">
                        Savings: ₹{comp.savings} ({comp.savingsPercentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                <span>Composition scheme has lower tax rates but restrictions</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-600" />
                <span>Regular scheme allows ITC and inter-state sales</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 mt-0.5 text-purple-600" />
                <span>All calculations are done locally for privacy</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
</div>
  );
}

export default function CompositionRegularSchemeEstimatorPage() {
  return (
    <ToolPageWrapper toolSlug="composition-regular-scheme-estimator">
      <CompositionRegularSchemeEstimatorContent />
    </ToolPageWrapper>
  );
}
