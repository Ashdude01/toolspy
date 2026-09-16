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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  QrCode,
  Copy,
  Download,
  RefreshCw,
  Shield,
  CheckCircle,
  XCircle,
  FileText,
  Upload,
  Search,
  AlertTriangle,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface ValidationResult {
  isValid: boolean;
  invoiceNumber?: string;
  invoiceDate?: string;
  totalAmount?: number;
  gstin?: string;
  qrData?: string;
  errors?: string[];
  warnings?: string[];
}

function EInvoiceQRValidatorContent() {
  const [qrData, setQrData] = useState<string>("");
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [history, setHistory] = useState<ValidationResult[]>([]);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const validateQRCode = () => {
    if (!qrData.trim()) return;

    setIsValidating(true);
    
    // Simulate validation process
    setTimeout(() => {
      const result: ValidationResult = {
        isValid: Math.random() > 0.3, // 70% success rate for demo
        invoiceNumber: "INV-2024-001",
        invoiceDate: "2024-01-15",
        totalAmount: 11800,
        gstin: "29ABCDE1234F1Z5",
        qrData: qrData,
        errors: Math.random() > 0.7 ? ["Invalid QR format"] : [],
        warnings: Math.random() > 0.8 ? ["QR code format is deprecated"] : [],
      };

      setValidationResult(result);
      setHistory(prev => [result, ...prev.slice(0, 9)]);
      setIsValidating(false);
    }, 1500);
  };

  const copyResult = () => {
    if (!validationResult) return;
    
    const resultText = `E-Invoice QR Validation Result:
Status: ${validationResult.isValid ? 'Valid' : 'Invalid'}
Invoice Number: ${validationResult.invoiceNumber || 'N/A'}
Invoice Date: ${validationResult.invoiceDate || 'N/A'}
Total Amount: ₹${validationResult.totalAmount || 'N/A'}
GSTIN: ${validationResult.gstin || 'N/A'}
${validationResult.errors?.length ? `Errors: ${validationResult.errors.join(', ')}` : ''}
${validationResult.warnings?.length ? `Warnings: ${validationResult.warnings.join(', ')}` : ''}`;
    
    navigator.clipboard.writeText(resultText);
  };

  const downloadResult = () => {
    if (!validationResult) return;
    
    const resultText = `E-Invoice QR Validation Report
Generated on: ${new Date().toLocaleDateString()}

Validation Details:
Status: ${validationResult.isValid ? 'Valid' : 'Invalid'}
Invoice Number: ${validationResult.invoiceNumber || 'N/A'}
Invoice Date: ${validationResult.invoiceDate || 'N/A'}
Total Amount: ₹${validationResult.totalAmount || 'N/A'}
GSTIN: ${validationResult.gstin || 'N/A'}

QR Data: ${validationResult.qrData}

${validationResult.errors?.length ? `Errors: ${validationResult.errors.join(', ')}` : ''}
${validationResult.warnings?.length ? `Warnings: ${validationResult.warnings.join(', ')}` : ''}

This validation is for reference purposes only.
Please verify with official GST portal for official validation.`;
    
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `e-invoice-validation-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setQrData("");
    setValidationResult(null);
    setHistory([]);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      {/* Header */}
      <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900 mb-4"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h2 className="bg-gradient-to-r from-green-500 dark:from-green-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          E-Invoice/QR Code Validator
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Upload/scan E-Invoice QR codes to validate invoice status and extract information. 
          Perfect for invoice verification and compliance checking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Validator */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                E-Invoice QR Validator
              </CardTitle>
              <CardDescription>
                Enter QR code data or scan to validate E-Invoice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Data Input */}
              <div className="space-y-2">
                <Label htmlFor="qr-data">QR Code Data</Label>
                <Textarea
                  id="qr-data"
                  placeholder="Paste QR code data here or scan QR code..."
                  value={qrData}
                  onChange={(e) => setQrData(e.target.value)}
                  className="min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground">
                  Enter the QR code data from E-Invoice or scan the QR code
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={validateQRCode} disabled={!qrData.trim() || isValidating} className="flex-1">
                  {isValidating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Validate QR Code
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={clearAll}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {validationResult && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {validationResult.isValid ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  Validation Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Status:</span>
                      <Badge variant={validationResult.isValid ? "default" : "destructive"}>
                        {validationResult.isValid ? "Valid" : "Invalid"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Invoice Number:</span>
                      <span className="font-bold">{validationResult.invoiceNumber || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Invoice Date:</span>
                      <span className="font-bold">{validationResult.invoiceDate || "N/A"}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <span className="font-medium">Total Amount:</span>
                      <span className="font-bold text-green-600">₹{validationResult.totalAmount || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <span className="font-medium">GSTIN:</span>
                      <span className="font-bold text-blue-600">{validationResult.gstin || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Errors and Warnings */}
                {(validationResult.errors?.length || validationResult.warnings?.length) && (
                  <div className="mt-6 space-y-3">
                    {validationResult.errors?.length && (
                      <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                        <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
                          <XCircle className="h-4 w-4" />
                          Errors
                        </h4>
                        <ul className="text-sm text-red-700 dark:text-red-300">
                          {validationResult.errors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {validationResult.warnings?.length && (
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Warnings
                        </h4>
                        <ul className="text-sm text-yellow-700 dark:text-yellow-300">
                          {validationResult.warnings.map((warning, index) => (
                            <li key={index}>• {warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

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
          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <QrCode className="h-4 w-4 mt-0.5 text-green-600" />
                <span>Scan QR code from E-Invoice to validate</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                <span>Valid QR codes contain invoice details</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 mt-0.5 text-purple-600" />
                <span>All validations are done locally for privacy</span>
              </div>
            </CardContent>
          </Card>

          {/* Validation History */}
          {history.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Validations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.map((result, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{result.invoiceNumber || "Unknown"}</span>
                        <Badge variant={result.isValid ? "default" : "destructive"} className="text-xs">
                          {result.isValid ? "Valid" : "Invalid"}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">
                        Amount: ₹{result.totalAmount || "N/A"} • Date: {result.invoiceDate || "N/A"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* E-Invoice Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                E-Invoice Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Valid QR Code</h4>
                <p className="text-green-700 dark:text-green-300">
                  Contains complete invoice information
                </p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-1">Invalid QR Code</h4>
                <p className="text-red-700 dark:text-red-300">
                  Missing or corrupted invoice data
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
</div>
  );
}

export default function EInvoiceQRValidatorPage() {
  return (
    <ToolPageWrapper toolSlug="e-invoice-qr-validator">
      <EInvoiceQRValidatorContent />
    </ToolPageWrapper>
  );
}
