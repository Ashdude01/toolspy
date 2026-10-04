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
  Percent,
  TrendingUp,
  TrendingDown,
  Shield,
  RefreshCw,
  Equal,
  ArrowRight,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { useT } from "@/lib/i18n/use-t";

interface PercentageResult {
  calculation: string;
  result: number;
  explanation: string;
  steps: string[];
}

function PercentageCalculatorContent() {
  const t = useT();
  const { showToast } = useToast();
  const [calculationType, setCalculationType] = useState("basic");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [result, setResult] = useState<PercentageResult | null>(null);

  const calculatePercentage = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);
    const num3 = parseFloat(value3);

    if (isNaN(num1) || isNaN(num2)) {
      showToast(t("tools.percentageCalculator.invalidNumbers"), "error");
      return;
    }

    let calculation = "";
    let resultValue = 0;
    let explanation = "";
    let steps: string[] = [];

    switch (calculationType) {
      case "basic": // X% of Y
        resultValue = (num1 / 100) * num2;
        calculation = `${num1}% of ${num2}`;
        explanation = `${num1}% of ${num2} equals ${resultValue}`;
        steps = [
          `Convert percentage to decimal: ${num1}% = ${num1}/100 = ${num1/100}`,
          `Multiply by the value: ${num1/100} × ${num2} = ${resultValue}`
        ];
        break;
      
      case "percentage": // X is what % of Y
        resultValue = (num1 / num2) * 100;
        calculation = `${num1} is ${resultValue.toFixed(2)}% of ${num2}`;
        explanation = `${num1} represents ${resultValue.toFixed(2)}% of ${num2}`;
        steps = [
          `Divide the part by the whole: ${num1} ÷ ${num2} = ${(num1/num2).toFixed(4)}`,
          `Convert to percentage: ${(num1/num2).toFixed(4)} × 100 = ${resultValue.toFixed(2)}%`
        ];
        break;
      
      case "increase": // Percentage increase from X to Y
        resultValue = ((num2 - num1) / num1) * 100;
        calculation = `Increase from ${num1} to ${num2}`;
        explanation = `The percentage increase from ${num1} to ${num2} is ${resultValue.toFixed(2)}%`;
        steps = [
          `Calculate the increase: ${num2} - ${num1} = ${num2 - num1}`,
          `Divide by original value: ${num2 - num1} ÷ ${num1} = ${((num2 - num1)/num1).toFixed(4)}`,
          `Convert to percentage: ${((num2 - num1)/num1).toFixed(4)} × 100 = ${resultValue.toFixed(2)}%`
        ];
        break;
      
      case "decrease": // Percentage decrease from X to Y
        resultValue = ((num1 - num2) / num1) * 100;
        calculation = `Decrease from ${num1} to ${num2}`;
        explanation = `The percentage decrease from ${num1} to ${num2} is ${resultValue.toFixed(2)}%`;
        steps = [
          `Calculate the decrease: ${num1} - ${num2} = ${num1 - num2}`,
          `Divide by original value: ${num1 - num2} ÷ ${num1} = ${((num1 - num2)/num1).toFixed(4)}`,
          `Convert to percentage: ${((num1 - num2)/num1).toFixed(4)} × 100 = ${resultValue.toFixed(2)}%`
        ];
        break;
      
      case "discount": // X% discount on Y
        const discountAmount = (num1 / 100) * num2;
        resultValue = num2 - discountAmount;
        calculation = `${num1}% discount on ${num2}`;
        explanation = `After ${num1}% discount, the final price is ${resultValue}`;
        steps = [
          `Calculate discount amount: ${num1}% of ${num2} = ${discountAmount}`,
          `Subtract from original price: ${num2} - ${discountAmount} = ${resultValue}`
        ];
        break;
      
      case "tip": // X% tip on Y
        const tipAmount = (num1 / 100) * num2;
        resultValue = num2 + tipAmount;
        calculation = `${num1}% tip on ${num2}`;
        explanation = `With ${num1}% tip, the total amount is ${resultValue}`;
        steps = [
          `Calculate tip amount: ${num1}% of ${num2} = ${tipAmount}`,
          `Add to original amount: ${num2} + ${tipAmount} = ${resultValue}`
        ];
        break;
      
      case "compound": // Compound percentage (requires 3 values)
        if (isNaN(num3)) {
          showToast(t("tools.percentageCalculator.enterPeriods"), "error");
          return;
        }
        resultValue = num2 * Math.pow(1 + (num1 / 100), num3);
        calculation = `${num2} with ${num1}% growth over ${num3} periods`;
        explanation = `${num2} compounded at ${num1}% for ${num3} periods equals ${resultValue.toFixed(2)}`;
        steps = [
          `Use compound formula: Final = Initial × (1 + rate)^periods`,
          `Final = ${num2} × (1 + ${num1/100})^${num3}`,
          `Final = ${num2} × ${Math.pow(1 + (num1/100), num3).toFixed(4)} = ${resultValue.toFixed(2)}`
        ];
        break;
      
      default:
        showToast(t("tools.percentageCalculator.selectType"), "error");
        return;
    }

    setResult({
      calculation,
      result: resultValue,
      explanation,
      steps
    });

    showToast(t("tools.percentageCalculator.calculationComplete"), "success");
  };

  const clearAll = () => {
    setValue1("");
    setValue2("");
    setValue3("");
    setResult(null);
    showToast(t("tools.percentageCalculator.valuesCleared"), "info");
  };

  const getInputLabels = () => {
    switch (calculationType) {
      case "basic":
        return { label1: t("tools.percentageCalculator.labelPercentage"), label2: t("tools.percentageCalculator.labelOfValue"), label3: "" };
      case "percentage":
        return { label1: t("tools.percentageCalculator.labelPartValue"), label2: t("tools.percentageCalculator.labelWholeValue"), label3: "" };
      case "increase":
        return { label1: t("tools.percentageCalculator.labelOriginalValue"), label2: t("tools.percentageCalculator.labelNewValue"), label3: "" };
      case "decrease":
        return { label1: t("tools.percentageCalculator.labelOriginalValue"), label2: t("tools.percentageCalculator.labelNewValue"), label3: "" };
      case "discount":
        return { label1: t("tools.percentageCalculator.labelDiscount"), label2: t("tools.percentageCalculator.labelOriginalPrice"), label3: "" };
      case "tip":
        return { label1: t("tools.percentageCalculator.labelTip"), label2: t("tools.percentageCalculator.labelBillAmount"), label3: "" };
      case "compound":
        return { label1: t("tools.percentageCalculator.labelGrowthRate"), label2: t("tools.percentageCalculator.labelInitialValue"), label3: t("tools.percentageCalculator.labelPeriods") };
      default:
        return { label1: t("tools.percentageCalculator.labelValue1"), label2: t("tools.percentageCalculator.labelValue2"), label3: "" };
    }
  };

  const { label1, label2, label3 } = getInputLabels();

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      {/* Header */}
      <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          {t("tools.percentageCalculator.privacyBadge")}
        </Badge>

        <h2 className="bg-gradient-to-r from-green-500 dark:from-green-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          {t("tools.percentageCalculator.title")}
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("tools.percentageCalculator.subtitle")}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Calculator Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              {t("tools.percentageCalculator.calculatorTitle")}
            </CardTitle>
            <CardDescription>
              {t("tools.percentageCalculator.calculatorDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Calculation Type */}
            <div className="space-y-2">
              <Label htmlFor="calc-type">{t("tools.percentageCalculator.calcTypeLabel")}</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger id="calc-type" aria-label={t("tools.percentageCalculator.calcTypePlaceholder")}>
                  <SelectValue placeholder={t("tools.percentageCalculator.calcTypePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">{t("tools.percentageCalculator.typeBasic")}</SelectItem>
                  <SelectItem value="percentage">{t("tools.percentageCalculator.typePercentage")}</SelectItem>
                  <SelectItem value="increase">{t("tools.percentageCalculator.typeIncrease")}</SelectItem>
                  <SelectItem value="decrease">{t("tools.percentageCalculator.typeDecrease")}</SelectItem>
                  <SelectItem value="discount">{t("tools.percentageCalculator.typeDiscount")}</SelectItem>
                  <SelectItem value="tip">{t("tools.percentageCalculator.typeTip")}</SelectItem>
                  <SelectItem value="compound">{t("tools.percentageCalculator.typeCompound")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Input Fields */}
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="value1">{label1} <span className="text-red-500" aria-label="required">*</span></Label>
                <Input
                  id="value1"
                  type="number"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  placeholder={`Enter ${label1.toLowerCase()}`}
                  required
                  aria-required="true"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="value2">{label2} <span className="text-red-500" aria-label="required">*</span></Label>
                <Input
                  id="value2"
                  type="number"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                  placeholder={`Enter ${label2.toLowerCase()}`}
                  required
                  aria-required="true"
                />
              </div>

              {label3 && (
                <div className="space-y-2">
                  <Label htmlFor="value3">{label3} <span className="text-red-500" aria-label="required">*</span></Label>
                  <Input
                    id="value3"
                    type="number"
                    value={value3}
                    onChange={(e) => setValue3(e.target.value)}
                    placeholder={`Enter ${label3.toLowerCase()}`}
                    required
                    aria-required="true"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={calculatePercentage} 
                className="flex-1"
                disabled={!value1 || !value2 || (!!label3 && !value3)}
                aria-label="Calculate percentage based on entered values"
              >
                <Calculator className="h-4 w-4 mr-2" aria-hidden="true" />
                {t("toolCommon.calculate")}
              </Button>
              <Button 
                variant="outline" 
                onClick={clearAll}
                aria-label="Clear all input values and results"
              >
                <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
                {t("toolCommon.clear")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Equal className="h-5 w-5" />
                {t("tools.percentageCalculator.resultTitle")}
              </CardTitle>
              <CardDescription>
                {result.explanation}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Result */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {typeof result.result === 'number' ? result.result.toFixed(2) : result.result}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {result.calculation}
                </div>
              </div>

              {/* Step-by-step explanation */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  {t("tools.percentageCalculator.stepByStepTitle")}
                </h4>
                <div className="space-y-2">
                  {result.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Badge variant="outline" className="text-xs font-mono">
                        {index + 1}
                      </Badge>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* SEO Content */}
      <div className="mt-12">
</div>
    </div>
  );
}

export default function PercentageCalculatorPage() {
  return (
    <ToolPageWrapper toolSlug="percentage-calculator"><ToastProvider>
      <PercentageCalculatorContent /></ToastProvider></ToolPageWrapper>
  );
} 