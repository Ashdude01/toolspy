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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  PiggyBank,
  Calculator,
  TrendingUp,
  Target,
  Shield,
  RefreshCw,
  Calendar,
  DollarSign,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface RetirementResult {
  totalNeeded: number;
  currentSavings: number;
  monthlyRequired: number;
  projectedValue: number;
  shortfall: number;
  yearsToRetirement: number;
  replacementRatio: number;
  yearlyBreakdown: {
    year: number;
    age: number;
    balance: number;
    contributions: number;
  }[];
}

function RetirementCalculatorContent() {
  const { showToast } = useToast();
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [currentIncome, setCurrentIncome] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [incomeReplacement, setIncomeReplacement] = useState("80");
  const [result, setResult] = useState<RetirementResult | null>(null);

  const calculateRetirement = () => {
    const age = parseFloat(currentAge);
    const retAge = parseFloat(retirementAge);
    const income = parseFloat(currentIncome);
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const returnRate = parseFloat(expectedReturn) / 100;
    const inflation = parseFloat(inflationRate) / 100;
    const replacement = parseFloat(incomeReplacement) / 100;

    if (!age || !retAge || !income || !expectedReturn || !inflationRate || 
        age <= 0 || retAge <= age || income <= 0 || returnRate <= 0) {
      showToast("Please enter valid retirement planning details", "error");
      return;
    }

    const yearsToRetirement = retAge - age;
    const yearsInRetirement = 85 - retAge; // Assume living to 85
    
    // Calculate future income needed (adjusted for inflation)
    const futureIncome = income * Math.pow(1 + inflation, yearsToRetirement);
    const annualIncomeNeeded = futureIncome * replacement;
    
    // Calculate total retirement savings needed
    // Using present value of annuity formula for retirement years
    const retirementReturn = returnRate - inflation; // Real return in retirement
    const totalNeeded = annualIncomeNeeded * ((1 - Math.pow(1 + retirementReturn, -yearsInRetirement)) / retirementReturn);
    
    // Calculate future value of current savings
    const futureCurrentSavings = savings * Math.pow(1 + returnRate, yearsToRetirement);
    
    // Calculate future value of monthly contributions
    const monthlyRate = returnRate / 12;
    const totalMonths = yearsToRetirement * 12;
    const futureContributions = monthly * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
    
    const projectedValue = futureCurrentSavings + futureContributions;
    const shortfall = Math.max(0, totalNeeded - projectedValue);
    
    // Calculate required monthly savings to meet goal
    const additionalNeeded = shortfall;
    const monthlyRequired = additionalNeeded > 0 ? 
      (additionalNeeded * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1) : 0;
    
    // Generate yearly breakdown
    const yearlyBreakdown = [];
    let balance = savings;
    let totalContributions = savings;
    
    for (let year = 1; year <= yearsToRetirement; year++) {
      const yearlyContribution = monthly * 12;
      totalContributions += yearlyContribution;
      balance = balance * (1 + returnRate) + yearlyContribution;
      
      yearlyBreakdown.push({
        year,
        age: age + year,
        balance,
        contributions: totalContributions
      });
    }

    const retirementResult: RetirementResult = {
      totalNeeded,
      currentSavings: savings,
      monthlyRequired: monthlyRequired + monthly,
      projectedValue,
      shortfall,
      yearsToRetirement,
      replacementRatio: replacement,
      yearlyBreakdown
    };

    setResult(retirementResult);
    showToast("Retirement plan calculated successfully!", "success");
  };

  const resetCalculator = () => {
    setCurrentAge("");
    setRetirementAge("");
    setCurrentIncome("");
    setCurrentSavings("");
    setMonthlyContribution("");
    setExpectedReturn("");
    setInflationRate("");
    setIncomeReplacement("80");
    setResult(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getRetirementStatus = (shortfall: number) => {
    if (shortfall <= 0) return { status: "On Track", color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" };
    if (shortfall < 100000) return { status: "Nearly There", color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20" };
    return { status: "Behind", color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" };
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h1 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-green-600 dark:to-green-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Retirement Calculator
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Plan for your retirement with comprehensive savings calculations. 
          Determine how much you need to save and track your progress toward retirement goals.
        </p>
      </div>

      {/* Calculator Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-blue-500" />
            Retirement Planning Details
          </CardTitle>
          <CardDescription>
            Enter your current situation and retirement goals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentAge">Current Age</Label>
              <Input
                id="currentAge"
                type="number"
                placeholder="35"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                step="1"
                min="18"
                max="80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retirementAge">Retirement Age</Label>
              <Input
                id="retirementAge"
                type="number"
                placeholder="65"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                step="1"
                min="50"
                max="80"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentIncome">Current Annual Income ($)</Label>
              <Input
                id="currentIncome"
                type="number"
                placeholder="75000"
                value={currentIncome}
                onChange={(e) => setCurrentIncome(e.target.value)}
                step="1000"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentSavings">Current Retirement Savings ($)</Label>
              <Input
                id="currentSavings"
                type="number"
                placeholder="50000"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                step="1000"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
              <Input
                id="monthlyContribution"
                type="number"
                placeholder="1000"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                step="50"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
              <Input
                id="expectedReturn"
                type="number"
                placeholder="7"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                step="0.1"
                min="0.1"
                max="15"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
              <Input
                id="inflationRate"
                type="number"
                placeholder="3"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                step="0.1"
                min="0"
                max="10"
              />
            </div>
            <div className="space-y-2">
              <Label>Income Replacement Ratio</Label>
              <Select value={incomeReplacement} onValueChange={setIncomeReplacement}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">60% - Basic lifestyle</SelectItem>
                  <SelectItem value="70">70% - Moderate lifestyle</SelectItem>
                  <SelectItem value="80">80% - Comfortable lifestyle</SelectItem>
                  <SelectItem value="90">90% - Maintain current lifestyle</SelectItem>
                  <SelectItem value="100">100% - Enhanced lifestyle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={calculateRetirement} 
              className="flex-1"
              disabled={!currentAge || !retirementAge || !currentIncome || !expectedReturn || !inflationRate}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Retirement
            </Button>
            <Button 
              variant="outline" 
              onClick={resetCalculator}
              className="flex-1 sm:flex-initial"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Retirement Results */}
      {result && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              Retirement Plan Analysis
            </CardTitle>
            <CardDescription>
              Your retirement savings projection and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Retirement Status */}
            <div className={`p-6 rounded-lg mb-6 ${getRetirementStatus(result.shortfall).bg}`}>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getRetirementStatus(result.shortfall).color} mb-2`}>
                  {getRetirementStatus(result.shortfall).status}
                </div>
                <div className="text-lg text-muted-foreground">
                  {result.shortfall > 0 
                    ? `${formatCurrency(result.shortfall)} shortfall`
                    : "You're on track for retirement!"
                  }
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {formatCurrency(result.totalNeeded)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Needed</div>
                </div>
              </Card>
              <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {formatCurrency(result.projectedValue)}
                  </div>
                  <div className="text-sm text-muted-foreground">Projected Value</div>
                </div>
              </Card>
              <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {formatCurrency(result.monthlyRequired)}
                  </div>
                  <div className="text-sm text-muted-foreground">Monthly Required</div>
                </div>
              </Card>
              <Card className="p-4 bg-orange-50 dark:bg-orange-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {result.yearsToRetirement}
                  </div>
                  <div className="text-sm text-muted-foreground">Years to Retirement</div>
                </div>
              </Card>
            </div>

            {/* Retirement Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="h-5 w-5" />
                    Retirement Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Current Age:</span>
                    <span className="font-semibold">{currentAge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retirement Age:</span>
                    <span className="font-semibold">{retirementAge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Years to Retirement:</span>
                    <span className="font-semibold">{result.yearsToRetirement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Income Replacement:</span>
                    <span className="font-semibold">{(result.replacementRatio * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Savings:</span>
                    <span className="font-semibold">{formatCurrency(result.currentSavings)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5" />
                    Savings Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Progress to Goal</span>
                        <span className="font-semibold">
                          {((result.projectedValue / result.totalNeeded) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-500 h-3 rounded-full transition-all duration-1000" 
                          style={{ width: `${Math.min((result.projectedValue / result.totalNeeded) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Projected</div>
                        <div className="font-semibold">{formatCurrency(result.projectedValue)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Target</div>
                        <div className="font-semibold">{formatCurrency(result.totalNeeded)}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Savings Projection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Savings Projection by Year
                </CardTitle>
                <CardDescription>
                  Annual breakdown of your retirement savings growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Year</th>
                        <th className="text-left p-2">Age</th>
                        <th className="text-right p-2">Balance</th>
                        <th className="text-right p-2">Contributions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyBreakdown.slice(0, 10).map((year, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-2">{year.year}</td>
                          <td className="p-2">{year.age}</td>
                          <td className="text-right p-2">{formatCurrency(year.balance)}</td>
                          <td className="text-right p-2">{formatCurrency(year.contributions)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {result.yearlyBreakdown.length > 10 && (
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Showing first 10 years of {result.yearlyBreakdown.length} total years
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Retirement Tips */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Retirement Planning Tips</CardTitle>
          <CardDescription>
            Key strategies for successful retirement planning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Start Early</div>
              <div className="text-muted-foreground">
                The power of compound interest is greatest over long periods
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Maximize Employer Match</div>
              <div className="text-muted-foreground">
                Always contribute enough to get full employer 401(k) matching
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Increase Gradually</div>
              <div className="text-muted-foreground">
                Increase contributions by 1% annually or with salary raises
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Diversify Investments</div>
              <div className="text-muted-foreground">
                Spread risk across different asset classes and sectors
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
</div>
  );
}

export default function RetirementCalculatorPage() {
  return (
    <ToolPageWrapper toolSlug="retirement-calculator"><ToastProvider>
      <RetirementCalculatorContent /></ToastProvider></ToolPageWrapper>
  );
} 