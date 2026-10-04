"use client";

import { useT } from "@/lib/i18n/use-t";
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
  Search,
  Copy,
  Download,
  RefreshCw,
  Shield,
  FileText,
  Percent,
  IndianRupee,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface HSNSACCode {
  code: string;
  description: string;
  gstRate: number;
  category: string;
  type: 'HSN' | 'SAC';
}

const SAMPLE_HSN_CODES = [
  { code: "0101", description: "Live horses, asses, mules and hinnies", gstRate: 0, category: "Animals", type: "HSN" as const },
  { code: "0201", description: "Meat of bovine animals, fresh or chilled", gstRate: 0, category: "Food", type: "HSN" as const },
  { code: "1001", description: "Wheat and meslin", gstRate: 0, category: "Cereals", type: "HSN" as const },
  { code: "2710", description: "Petroleum oils and oils obtained from bituminous minerals", gstRate: 18, category: "Petroleum", type: "HSN" as const },
  { code: "8517", description: "Telephone sets, including telephones for cellular networks", gstRate: 18, category: "Electronics", type: "HSN" as const },
  { code: "9997", description: "Services by way of transportation of goods by road", gstRate: 5, category: "Transportation", type: "SAC" as const },
  { code: "9983", description: "Services by way of transportation of passengers", gstRate: 5, category: "Transportation", type: "SAC" as const },
  { code: "9987", description: "Services by way of supply of food or any other article for human consumption", gstRate: 5, category: "Food Services", type: "SAC" as const },
];

function HSNSACFinderContent() {
  const t = useT();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<'all' | 'HSN' | 'SAC'>('all');
  const [searchResults, setSearchResults] = useState<HSNSACCode[]>([]);
  const [selectedCode, setSelectedCode] = useState<HSNSACCode | null>(null);
  const [history, setHistory] = useState<HSNSACCode[]>([]);

  const searchCodes = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = SAMPLE_HSN_CODES.filter(code => {
      const matchesType = searchType === 'all' || code.type === searchType;
      const matchesQuery = code.code.toLowerCase().includes(query) || 
                          code.description.toLowerCase().includes(query) ||
                          code.category.toLowerCase().includes(query);
      return matchesType && matchesQuery;
    });

    setSearchResults(filtered);
  };

  useEffect(() => {
    searchCodes();
  }, [searchQuery, searchType]);

  const selectCode = (code: HSNSACCode) => {
    setSelectedCode(code);
    setHistory(prev => [code, ...prev.filter(c => c.code !== code.code).slice(0, 9)]);
  };

  const copyCode = () => {
    if (!selectedCode) return;
    
    const codeText = `${selectedCode.type} Code: ${selectedCode.code}
Description: ${selectedCode.description}
GST Rate: ${selectedCode.gstRate}%
Category: ${selectedCode.category}`;
    
    navigator.clipboard.writeText(codeText);
  };

  const downloadCode = () => {
    if (!selectedCode) return;
    
    const codeText = `HSN/SAC Code Information
Generated on: ${new Date().toLocaleDateString()}

Code Details:
${selectedCode.type} Code: ${selectedCode.code}
Description: ${selectedCode.description}
GST Rate: ${selectedCode.gstRate}%
Category: ${selectedCode.category}

This information is for reference purposes only.
Please verify with official GST portal for latest updates.`;
    
    const blob = new Blob([codeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hsn-sac-${selectedCode.code}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSelectedCode(null);
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
          HSN/SAC Code Finder
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Find HSN (Harmonized System of Nomenclature) and SAC (Services Accounting Code) 
          codes with GST rates. Quick search with auto-suggest and reference links.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                HSN/SAC Code Search
              </CardTitle>
              <CardDescription>
                {t("tools.hsnSacFinder.searchForHsnOrSacCodes")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search Input */}
              <div className="space-y-2">
                <Label htmlFor="search">{t("tools.hsnSacFinder.searchQuery")}</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder={t("tools.hsnSacFinder.enterHsnSacCodeDescriptionOr")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* Search Type */}
              <div className="space-y-2">
                <Label htmlFor="search-type">{t("tools.hsnSacFinder.searchType")}</Label>
                <Select value={searchType} onValueChange={(value: 'all' | 'HSN' | 'SAC') => setSearchType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("tools.hsnSacFinder.allCodes")}</SelectItem>
                    <SelectItem value="HSN">{t("tools.hsnSacFinder.hsnCodesOnly")}</SelectItem>
                    <SelectItem value="SAC">{t("tools.hsnSacFinder.sacCodesOnly")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={searchCodes} className="flex-1">
                  <Search className="h-4 w-4 mr-2" />
                  Search Codes
                </Button>
                <Button variant="outline" onClick={clearAll}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Search Results ({searchResults.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {searchResults.map((code, index) => (
                    <div 
                      key={index} 
                      className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => selectCode(code)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={code.type === 'HSN' ? 'default' : 'secondary'}>
                            {code.type}
                          </Badge>
                          <span className="font-mono font-bold text-lg">{code.code}</span>
                        </div>
                        <Badge variant="outline" className="text-sm">
                          {code.gstRate}% GST
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{code.description}</p>
                      <p className="text-xs text-muted-foreground">Category: {code.category}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Selected Code Details */}
          {selectedCode && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Code Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Code Type:</span>
                      <Badge variant={selectedCode.type === 'HSN' ? 'default' : 'secondary'}>
                        {selectedCode.type}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Code:</span>
                      <span className="font-mono font-bold text-lg">{selectedCode.code}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <span className="font-medium">GST Rate:</span>
                      <span className="font-bold text-lg text-green-600">{selectedCode.gstRate}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <span className="font-medium">Category:</span>
                      <span className="font-bold text-lg text-blue-600">{selectedCode.category}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Description:</h4>
                  <p className="text-sm">{selectedCode.description}</p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" onClick={copyCode} className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Details
                  </Button>
                  <Button variant="outline" onClick={downloadCode} className="flex-1">
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
              <CardTitle>{t("tools.hsnSacFinder.quickTips")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Search className="h-4 w-4 mt-0.5 text-green-600" />
                <span>Search by code, description, or category</span>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 mt-0.5 text-blue-600" />
                <span>HSN codes are for goods, SAC codes are for services</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 mt-0.5 text-purple-600" />
                <span>All searches are done locally for privacy</span>
              </div>
            </CardContent>
          </Card>

          {/* Search History */}
          {history.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Searches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.map((code, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono font-medium">{code.code}</span>
                        <Badge variant="outline" className="text-xs">
                          {code.gstRate}%
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">
                        {code.description.substring(0, 50)}...
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {code.type} • {code.category}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* GST Rates Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5" />
                Common GST Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">0% (Exempt)</span>
                  <Badge variant="outline" className="text-xs">{t("tools.hsnSacFinder.essential")}</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">5%</span>
                  <Badge variant="outline" className="text-xs">{t("tools.hsnSacFinder.basic")}</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">12%</span>
                  <Badge variant="outline" className="text-xs">{t("tools.hsnSacFinder.standard")}</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">18%</span>
                  <Badge variant="outline" className="text-xs">{t("tools.hsnSacFinder.standard")}</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">28%</span>
                  <Badge variant="outline" className="text-xs">{t("tools.hsnSacFinder.luxury")}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
</div>
  );
}

export default function HSNSACFinderPage() {
  return (
    <ToolPageWrapper toolSlug="hsn-sac-finder">
      <HSNSACFinderContent />
    </ToolPageWrapper>
  );
}
