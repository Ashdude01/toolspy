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
import { Switch } from "@/components/ui/switch";
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
  CreditCard,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { ITCCalculatorSEOContent } from "./seo-content";

interface ITCCalculation {
  totalInputGST: number;
  blockedITC: number;
  claimableITC: number;
  blockedPercentage: number;
  claimablePercentage: number;
  businessUse: number;
  personalUse: number;
  exemptSupplies: number;
  taxableSupplies: number;
}

const ITC_BLOCKED_CATEGORIES = [
  { category: "Motor Vehicles", blocked: true, description: "Motor vehicles for transportation of persons" },
  { category: "Food & Beverages", blocked: true, description: "Food, beverages, outdoor catering, etc." },
  { category: "Beauty Treatment", blocked: true, description: "Beauty treatment, health services, cosmetic surgery" },
  { category: "Club Membership", blocked: true, description: "Club membership, health and fitness center" },
  { category: "Travel Benefits", blocked: true, description: "Travel benefits to employees" },
  { category: "Works Contract", blocked: true, description: "Works contract services for construction of immovable property" },
  { category: "Telecom Services", blocked: false, description: "Telecom services for business use" },
  { category: "Rent Services", blocked: false, description: "Rent services for business premises" },
  { category: "Professional Services", blocked: false, description: "Legal, accounting, consulting services" },
  { category: "Office Supplies", blocked: false, description: "Office supplies and equipment" },
];

function ITCCalculatorContent() {
  const [totalInputGST, setTotalInputGST] = useState<string>("");
  const [businessUse, setBusinessUse] = useState<string>("100");
  const [blockedITCAmount, setBlockedITCAmount] = useState<string>("");
  const [calculation, setCalculation] = useState<ITCCalculation | null>(null);
  const [history, setHistory] = useState<ITCCalculation[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const calculateITC = () => {
    const totalGST = parseFloat(totalInputGST);
    const businessUsePercent = parseFloat(businessUse);
    const blockedAmount = parseFloat(blockedITCAmount) || 0;

    if (isNaN(totalGST) || totalGST <= 0) return;

    // Calculate business vs personal use
    const businessUseAmount = (totalGST * businessUsePercent) / 100;
    const personalUseAmount = totalGST - businessUseAmount;

    // Calculate blocked ITC
    const blockedITC = blockedAmount;
    const claimableITC = businessUseAmount - blockedITC;

    // Calculate percentages
    const blockedPercentage = totalGST > 0 ? (blockedITC / totalGST) * 100 : 0;
    const claimablePercentage = totalGST > 0 ? (claimableITC / totalGST) * 100 : 0;

    // Calculate supplies (simplified)
    const taxableSupplies = claimableITC;
    const exemptSupplies = blockedITC + personalUseAmount;

    const newCalculation: ITCCalculation = {
      totalInputGST: Math.round(totalGST * 100) / 100,
      blockedITC: Math.round(blockedITC * 100) / 100,
      claimableITC: Math.round(claimableITC * 100) / 100,
      blockedPercentage: Math.round(blockedPercentage * 100) / 100,
      claimablePercentage: Math.round(claimablePercentage * 100) / 100,
      businessUse: Math.round(businessUseAmount * 100) / 100,
      personalUse: Math.round(personalUseAmount * 100) / 100,
      exemptSupplies: Math.round(exemptSupplies * 100) / 100,
      taxableSupplies: Math.round(taxableSupplies * 100) / 100,
    };

    setCalculation(newCalculation);
    setHistory(prev => [newCalculation, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    if (totalInputGST && !isNaN(parseFloat(totalInputGST))) {
      calculateITC();
    }
  }, [totalInputGST, businessUse, blockedITCAmount]);

  const copyResult = () => {
    if (!calculation) return;
    
    const resultText = `ITC Calculation Result:
Total Input GST: ₹${calculation.totalInputGST}
Business Use: ₹${calculation.businessUse} (${businessUse}%)
Personal Use: ₹${calculation.personalUse}
Blocked ITC: ₹${calculation.blockedITC} (${calculation.blockedPercentage}%)
Claimable ITC: ₹${calculation.claimableITC} (${calculation.claimablePercentage}%)
Taxable Supplies: ₹${calculation.taxableSupplies}
Exempt Supplies: ₹${calculation.exemptSupplies}`;
    
    navigator.clipboard.writeText(resultText);
  };

  const downloadResult = () => {
    if (!calculation) return;
    
    const resultText = `ITC Calculation Report
Generated on: ${new Date().toLocaleDateString()}

Calculation Details:
Total Input GST: ₹${calculation.totalInputGST}
Business Use: ₹${calculation.businessUse} (${businessUse}%)
Personal Use: ₹${calculation.personalUse}
Blocked ITC: ₹${calculation.blockedITC} (${calculation.blockedPercentage}%)
Claimable ITC: ₹${calculation.claimableITC} (${calculation.claimablePercentage}%)
Taxable Supplies: ₹${calculation.taxableSupplies}
Exempt Supplies: ₹${calculation.exemptSupplies}

Selected Categories:
${selectedCategories.length > 0 ? selectedCategories.join(', ') : 'None selected'}

This calculation is for reference purposes only.
Please consult with a tax professional for official ITC calculations.`;
    
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `itc-calculation-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setTotalInputGST("");
    setBusinessUse("100");
    setBlockedITCAmount("");
    setCalculation(null);
    setHistory([]);
    setSelectedCategories([]);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
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

        <h1 className="bg-gradient-to-r from-green-500 dark:from-green-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Input Tax Credit (ITC) Calculator
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Track claimable credits vs blocked credits with Toolspy's professional ITC calculator. 
          Perfect for understanding ITC eligibility and compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                ITC Calculator
              </CardTitle>
              <CardDescription>
                Calculate claimable and blocked Input Tax Credit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Total Input GST */}
              <div className="space-y-2">
                <Label htmlFor="total-gst">Total Input GST (₹)</Label>
                <Input
                  id="total-gst"
                  type="number"
                  placeholder="Enter total input GST"
                  value={totalInputGST}
                  onChange={(e) => setTotalInputGST(e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* Business Use Percentage */}
              <div className="space-y-2">
                <Label htmlFor="business-use">Business Use Percentage (%)</Label>
                <Input
                  id="business-use"
                  type="number"
                  placeholder="100"
                  value={businessUse}
                  onChange={(e) => setBusinessUse(e.target.value)}
                  min="0"
                  max="100"
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground">
                  Percentage of input GST used for business purposes
                </p>
              </div>

              {/* Blocked ITC Amount */}
              <div className="space-y-2">
                <Label htmlFor="blocked-itc">Blocked ITC Amount (₹)</Label>
                <Input
                  id="blocked-itc"
                  type="number"
                  placeholder="Enter blocked ITC amount"
                  value={blockedITCAmount}
                  onChange={(e) => setBlockedITCAmount(e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground">
                  Amount of ITC that cannot be claimed (optional)
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={calculateITC} className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate ITC
                </Button>
                <Button variant="outline" onClick={clearAll}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {calculation && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  ITC Calculation Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Total Input GST:</span>
                      <span className="font-bold text-lg">₹{calculation.totalInputGST}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <span className="font-medium">Business Use:</span>
                      <span className="font-bold text-lg text-blue-600">₹{calculation.businessUse}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-950/20 rounded-lg border border-gray-200 dark:border-gray-800">
                      <span className="font-medium">Personal Use:</span>
                      <span className="font-bold text-lg text-gray-600">₹{calculation.personalUse}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                      <span className="font-medium">Blocked ITC:</span>
                      <span className="font-bold text-lg text-red-600">₹{calculation.blockedITC}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <span className="font-medium">Claimable ITC:</span>
                      <span className="font-bold text-lg text-green-600">₹{calculation.claimableITC}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <span className="font-medium">Claimable %:</span>
                      <span className="font-bold text-lg text-indigo-600">{calculation.claimablePercentage}%</span>
                    </div>
                  </div>
                </div>

                {/* ITC Breakdown */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">ITC Breakdown:</h4>
                  <div className="text-sm space-y-1">
                    <p>• Total Input GST: ₹{calculation.totalInputGST}</p>
                    <p>• Business Use ({businessUse}%): ₹{calculation.businessUse}</p>
                    <p>• Personal Use: ₹{calculation.personalUse}</p>
                    <p>• Blocked ITC: ₹{calculation.blockedITC} ({calculation.blockedPercentage}%)</p>
                    <p>• <strong>Claimable ITC: ₹{calculation.claimableITC} ({calculation.claimablePercentage}%)</strong></p>
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
          {/* ITC Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                ITC Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {ITC_BLOCKED_CATEGORIES.map((item, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      item.blocked 
                        ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800' 
                        : 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                    }`}
                    onClick={() => toggleCategory(item.category)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{item.category}</span>
                      {item.blocked ? (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                    {selectedCategories.includes(item.category) && (
                      <Badge variant="outline" className="text-xs mt-1">Selected</Badge>
                    )}
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
                  Recent Calculations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.map((calc, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">₹{calc.totalInputGST}</span>
                        <Badge variant="outline" className="text-xs">
                          {calc.claimablePercentage}%
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">
                        Claimable: ₹{calc.claimableITC} • Blocked: ₹{calc.blockedITC}
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
                <span>ITC can be claimed only for business use</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 text-red-600" />
                <span>Certain categories are blocked from ITC</span>
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
      <ITCCalculatorSEOContent />
    </div>
  );
}

export default function ITCCalculatorPage() {
  return <ITCCalculatorContent />;
}
