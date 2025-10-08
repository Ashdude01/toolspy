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
  Calculator,
  Briefcase,
  DollarSign,
  Clock,
  Shield,
  RefreshCw,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { SalaryCalculatorSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface SalaryResult {
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  biWeeklyRate: number;
  monthlyRate: number;
  annualSalary: number;
  grossPay: number;
  netPay: number;
  totalTax: number;
  workingHours: {
    hoursPerWeek: number;
    hoursPerMonth: number;
    hoursPerYear: number;
  };
  payPeriods: {
    weekly: number;
    biWeekly: number;
    monthly: number;
    annual: number;
  };
}

function SalaryCalculatorContent() {
  const { showToast } = useToast();
  const [inputType, setInputType] = useState("hourly");
  const [inputValue, setInputValue] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [taxRate, setTaxRate] = useState("25");
  const [result, setResult] = useState<SalaryResult | null>(null);

  const calculateSalary = () => {
    const value = parseFloat(inputValue);
    const hours = parseFloat(hoursPerWeek);
    const weeks = parseFloat(weeksPerYear);
    const tax = parseFloat(taxRate) / 100;

    if (!value || value <= 0 || hours <= 0 || weeks <= 0) {
      showToast("Please enter valid salary and working hours", "error");
      return;
    }

    let hourlyRate = 0;
    let annualSalary = 0;

    // Convert input to hourly rate and annual salary
    switch (inputType) {
      case "hourly":
        hourlyRate = value;
        annualSalary = hourlyRate * hours * weeks;
        break;
      case "weekly":
        hourlyRate = value / hours;
        annualSalary = value * weeks;
        break;
      case "monthly":
        annualSalary = value * 12;
        hourlyRate = annualSalary / (hours * weeks);
        break;
      case "annual":
        annualSalary = value;
        hourlyRate = annualSalary / (hours * weeks);
        break;
      default:
        hourlyRate = value;
        annualSalary = hourlyRate * hours * weeks;
    }

    // Calculate different pay periods
    const dailyRate = hourlyRate * 8; // Assuming 8-hour workday
    const weeklyRate = hourlyRate * hours;
    const biWeeklyRate = weeklyRate * 2;
    const monthlyRate = annualSalary / 12;

    // Calculate tax implications
    const totalTax = annualSalary * tax;
    const netPay = annualSalary - totalTax;

    // Calculate working hours
    const hoursPerMonth = (hours * weeks) / 12;
    const hoursPerYear = hours * weeks;

    // Calculate pay periods with tax
    const payPeriods = {
      weekly: weeklyRate * (1 - tax),
      biWeekly: biWeeklyRate * (1 - tax),
      monthly: monthlyRate * (1 - tax),
      annual: netPay
    };

    const salaryResult: SalaryResult = {
      hourlyRate,
      dailyRate,
      weeklyRate,
      biWeeklyRate,
      monthlyRate,
      annualSalary,
      grossPay: annualSalary,
      netPay,
      totalTax,
      workingHours: {
        hoursPerWeek: hours,
        hoursPerMonth,
        hoursPerYear
      },
      payPeriods
    };

    setResult(salaryResult);
    showToast("Salary calculated successfully!", "success");
  };

  const resetCalculator = () => {
    setInputType("hourly");
    setInputValue("");
    setHoursPerWeek("40");
    setWeeksPerYear("52");
    setTaxRate("25");
    setResult(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getInputLabel = () => {
    switch (inputType) {
      case "hourly": return "Hourly Rate ($)";
      case "weekly": return "Weekly Salary ($)";
      case "monthly": return "Monthly Salary ($)";
      case "annual": return "Annual Salary ($)";
      default: return "Salary ($)";
    }
  };

  const getInputPlaceholder = () => {
    switch (inputType) {
      case "hourly": return "25.00";
      case "weekly": return "1000";
      case "monthly": return "4333";
      case "annual": return "52000";
      default: return "25.00";
    }
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

        <h1 className="bg-gradient-to-r from-green-500 dark:from-green-600 to-blue-600 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Salary Calculator
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert between hourly, weekly, monthly, and annual salaries. 
          Calculate take-home pay with tax considerations and compare different pay periods.
        </p>
      </div>

      {/* Calculator Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-green-500" />
            Salary Information
          </CardTitle>
          <CardDescription>
            Enter your salary details to calculate all pay periods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Salary Type</Label>
              <Select value={inputType} onValueChange={setInputType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly Rate</SelectItem>
                  <SelectItem value="weekly">Weekly Salary</SelectItem>
                  <SelectItem value="monthly">Monthly Salary</SelectItem>
                  <SelectItem value="annual">Annual Salary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="inputValue">{getInputLabel()}</Label>
              <Input
                id="inputValue"
                type="number"
                placeholder={getInputPlaceholder()}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hoursPerWeek">Hours per Week</Label>
              <Input
                id="hoursPerWeek"
                type="number"
                placeholder="40"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
                step="0.5"
                min="1"
                max="80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weeksPerYear">Weeks per Year</Label>
              <Input
                id="weeksPerYear"
                type="number"
                placeholder="52"
                value={weeksPerYear}
                onChange={(e) => setWeeksPerYear(e.target.value)}
                step="1"
                min="1"
                max="52"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxRate">Tax Rate (%) - Optional</Label>
            <Input
              id="taxRate"
              type="number"
              placeholder="25"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              step="0.1"
              min="0"
              max="50"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={calculateSalary} 
              className="flex-1"
              disabled={!inputValue}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Salary
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

      {/* Salary Results */}
      {result && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Salary Breakdown
            </CardTitle>
            <CardDescription>
              Your salary converted to different pay periods
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Main Annual Salary Display */}
            <div className="text-center mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">
                {formatCurrency(result.annualSalary)}
              </div>
              <div className="text-lg text-muted-foreground mb-2">Annual Gross Salary</div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {formatCurrency(result.netPay)}
              </div>
              <div className="text-sm text-muted-foreground">
                Annual Take-Home Pay (After {taxRate}% Tax)
              </div>
            </div>

            {/* Salary Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {formatCurrency(result.hourlyRate)}
                  </div>
                  <div className="text-sm text-muted-foreground">Hourly Rate</div>
                </div>
              </Card>
              <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {formatCurrency(result.weeklyRate)}
                  </div>
                  <div className="text-sm text-muted-foreground">Weekly Gross</div>
                </div>
              </Card>
              <Card className="p-4 bg-orange-50 dark:bg-orange-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {formatCurrency(result.biWeeklyRate)}
                  </div>
                  <div className="text-sm text-muted-foreground">Bi-Weekly Gross</div>
                </div>
              </Card>
              <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {formatCurrency(result.monthlyRate)}
                  </div>
                  <div className="text-sm text-muted-foreground">Monthly Gross</div>
                </div>
              </Card>
            </div>

            {/* Net Pay Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5" />
                    Net Pay Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Weekly Take-Home:</span>
                    <span className="font-semibold">{formatCurrency(result.payPeriods.weekly)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bi-Weekly Take-Home:</span>
                    <span className="font-semibold">{formatCurrency(result.payPeriods.biWeekly)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Take-Home:</span>
                    <span className="font-semibold">{formatCurrency(result.payPeriods.monthly)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Take-Home:</span>
                    <span className="font-semibold">{formatCurrency(result.payPeriods.annual)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5" />
                    Working Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Hours per Week:</span>
                    <span className="font-semibold">{result.workingHours.hoursPerWeek}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hours per Month:</span>
                    <span className="font-semibold">{result.workingHours.hoursPerMonth.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hours per Year:</span>
                    <span className="font-semibold">{result.workingHours.hoursPerYear.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weeks per Year:</span>
                    <span className="font-semibold">{weeksPerYear}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tax Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Tax Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-red-600">{formatCurrency(result.totalTax)}</div>
                    <div className="text-sm text-muted-foreground">Annual Tax</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{formatCurrency(result.totalTax / 12)}</div>
                    <div className="text-sm text-muted-foreground">Monthly Tax</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-green-600">{taxRate}%</div>
                    <div className="text-sm text-muted-foreground">Tax Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Salary Comparison */}
      {result && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Salary Comparison</CardTitle>
            <CardDescription>
              Compare your salary with different scenarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Pay Period</th>
                    <th className="text-right p-2">Gross Pay</th>
                    <th className="text-right p-2">Tax</th>
                    <th className="text-right p-2">Net Pay</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">Hourly</td>
                    <td className="text-right p-2">{formatCurrency(result.hourlyRate)}</td>
                    <td className="text-right p-2">{formatCurrency(result.hourlyRate * parseFloat(taxRate) / 100)}</td>
                    <td className="text-right p-2">{formatCurrency(result.hourlyRate * (1 - parseFloat(taxRate) / 100))}</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">Weekly</td>
                    <td className="text-right p-2">{formatCurrency(result.weeklyRate)}</td>
                    <td className="text-right p-2">{formatCurrency(result.weeklyRate * parseFloat(taxRate) / 100)}</td>
                    <td className="text-right p-2">{formatCurrency(result.payPeriods.weekly)}</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">Bi-Weekly</td>
                    <td className="text-right p-2">{formatCurrency(result.biWeeklyRate)}</td>
                    <td className="text-right p-2">{formatCurrency(result.biWeeklyRate * parseFloat(taxRate) / 100)}</td>
                    <td className="text-right p-2">{formatCurrency(result.payPeriods.biWeekly)}</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">Monthly</td>
                    <td className="text-right p-2">{formatCurrency(result.monthlyRate)}</td>
                    <td className="text-right p-2">{formatCurrency(result.monthlyRate * parseFloat(taxRate) / 100)}</td>
                    <td className="text-right p-2">{formatCurrency(result.payPeriods.monthly)}</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">Annual</td>
                    <td className="text-right p-2">{formatCurrency(result.annualSalary)}</td>
                    <td className="text-right p-2">{formatCurrency(result.totalTax)}</td>
                    <td className="text-right p-2">{formatCurrency(result.netPay)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Salary Tips */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Salary Planning Tips</CardTitle>
          <CardDescription>
            Important considerations for salary and compensation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Total Compensation</div>
              <div className="text-muted-foreground">
                Consider benefits, health insurance, retirement contributions beyond base salary
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Tax Optimization</div>
              <div className="text-muted-foreground">
                Maximize pre-tax deductions like 401(k), HSA, and insurance premiums
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Hourly vs Salary</div>
              <div className="text-muted-foreground">
                Consider overtime eligibility and work-life balance factors
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Negotiation Strategy</div>
              <div className="text-muted-foreground">
                Research market rates and prepare for salary discussions
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <SalaryCalculatorSEOContent />
    </div>
  );
}

export default function SalaryCalculatorPage() {
  return (
    <ToolPageWrapper toolSlug="salary-calculator">
      (
    <ToastProvider>
      <SalaryCalculatorContent />
    </ToastProvider>
  )
    </ToolPageWrapper>
  );
} 