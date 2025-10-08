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
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Search,
  Copy,
  Download,
  Globe,
  Calendar,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Shield,
  Clock,
  RefreshCw,
  ExternalLink,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { DomainWhoisLookupSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { 
  validateDomain, 
  formatWhoisDate, 
  getDomainStatusColor,
  type WhoisData 
} from "@/lib/utils/domain-utils";

function DomainWhoisLookupContent() {
  const { showToast } = useToast();
  const [domain, setDomain] = useState("");
  const [whoisData, setWhoisData] = useState<WhoisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("whois-search-history");
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load search history:", error);
      }
    }
  }, []);

  // Save search history to localStorage
  const saveToHistory = (domain: string) => {
    const cleanDomain = domain.toLowerCase().trim();
    if (!cleanDomain) return;

    setSearchHistory((prev) => {
      const newHistory = [cleanDomain, ...prev.filter(d => d !== cleanDomain)].slice(0, 10);
      localStorage.setItem("whois-search-history", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const handleWhoisLookup = async () => {
    const cleanDomain = domain.trim().toLowerCase();
    
    if (!cleanDomain) {
      showToast("Please enter a domain name", "error");
      return;
    }

    if (!validateDomain(cleanDomain)) {
      showToast("Please enter a valid domain name", "error");
      return;
    }

    setIsLoading(true);
    setWhoisData(null);

    try {
      // Use API endpoint to avoid CORS issues
      const response = await fetch('/api/whois', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: cleanDomain }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to perform WHOIS lookup');
      }

      const whoisResult = await response.json();
      
      // The API returns the data directly, not wrapped in a data property
      setWhoisData(whoisResult);
      saveToHistory(cleanDomain);
      showToast("WHOIS lookup completed successfully", "success");
    } catch (error) {
      showToast("Failed to perform WHOIS lookup. Please try again.", "error");
      console.error("WHOIS lookup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard", "success");
    } catch (error) {
      showToast("Failed to copy to clipboard", "error");
    }
  };

  const downloadWhoisData = () => {
    if (!whoisData) return;

    const data = `WHOIS Lookup Results for ${whoisData.domainName}
Generated on: ${new Date().toISOString()}

${whoisData.raw}`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `whois-${whoisData.domainName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("WHOIS data downloaded", "success");
  };

  const formatDate = (dateString: string): string => {
    return formatWhoisDate(dateString);
  };

  const getDomainStatus = (status: string[]): { label: string; variant: "default" | "secondary" | "destructive" } => {
    if (!status || status.length === 0) {
      return { label: "Unknown", variant: "secondary" as const };
    }
    
    if (status.some(s => s.includes("clientTransferProhibited"))) {
      return { label: "Transfer Protected", variant: "default" as const };
    }
    if (status.some(s => s.includes("pendingDelete"))) {
      return { label: "Pending Delete", variant: "destructive" as const };
    }
    if (status.some(s => s.includes("ok") || s.includes("active"))) {
      return { label: "Active", variant: "secondary" as const };
    }
    return { label: "Active", variant: "secondary" as const };
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • Real-time Data
        </Badge>

        <h1 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-purple-700 dark:to-purple-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Domain WHOIS Lookup Tool
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Get comprehensive domain registration information with our free WHOIS lookup tool. 
          Check domain ownership, registration dates, and contact details instantly.
        </p>
      </div>

      {/* Search Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Domain WHOIS Lookup</CardTitle>
          <CardDescription>
            Enter a domain name to get detailed registration information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="domain-input" className="text-sm font-medium">
                Domain Name
              </Label>
              <div className="relative mt-1">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="domain-input"
                  type="text"
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleWhoisLookup()}
                  className="pl-10"
                />
              </div>
            </div>
            <Button
              onClick={handleWhoisLookup}
              disabled={isLoading || !domain.trim()}
              size="lg"
              className="sm:self-end"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Looking up...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Lookup Domain
                </>
              )}
            </Button>
          </div>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Recent Searches</Label>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((histDomain, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setDomain(histDomain)}
                  >
                    {histDomain}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {whoisData && (
        <div className="space-y-6">
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    {whoisData.domainName}
                  </CardTitle>
                  <CardDescription>
                    Domain registration information
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(whoisData.raw || "")}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadWhoisData}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building className="h-4 w-4" />
                    Registrar
                  </div>
                  <p className="font-medium">{whoisData.registrar || "Unknown"}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Created
                  </div>
                  <p className="font-medium">{formatDate(whoisData.creationDate || "")}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Expires
                  </div>
                  <p className="font-medium">{formatDate(whoisData.expirationDate || "")}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4" />
                    Status
                  </div>
                  <Badge variant={getDomainStatus(whoisData.status || []).variant}>
                    {getDomainStatus(whoisData.status || []).label}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Registrant Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Registrant Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {whoisData.registrant?.name && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Name</Label>
                    <p className="font-medium">{whoisData.registrant.name}</p>
                  </div>
                )}
                {whoisData.registrant?.organization && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Organization</Label>
                    <p className="font-medium">{whoisData.registrant.organization}</p>
                  </div>
                )}
                {whoisData.registrant?.email && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Email</Label>
                    <p className="font-medium">{whoisData.registrant.email}</p>
                  </div>
                )}
                {whoisData.registrant?.phone && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Phone</Label>
                    <p className="font-medium">{whoisData.registrant.phone}</p>
                  </div>
                )}
                {whoisData.registrant?.address && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Address</Label>
                    <p className="font-medium">{whoisData.registrant.address}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Administrative Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Administrative Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {whoisData.admin?.name && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Name</Label>
                    <p className="font-medium">{whoisData.admin.name}</p>
                  </div>
                )}
                {whoisData.admin?.organization && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Organization</Label>
                    <p className="font-medium">{whoisData.admin.organization}</p>
                  </div>
                )}
                {whoisData.admin?.email && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Email</Label>
                    <p className="font-medium">{whoisData.admin.email}</p>
                  </div>
                )}
                {whoisData.admin?.phone && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Phone</Label>
                    <p className="font-medium">{whoisData.admin.phone}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Name Servers */}
          {whoisData.nameServers && whoisData.nameServers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Name Servers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {whoisData.nameServers.map((ns, index) => (
                    <Badge key={index} variant="outline" className="justify-start">
                      {ns}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Raw WHOIS Data */}
          {whoisData.raw && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Raw WHOIS Data
                </CardTitle>
                <CardDescription>
                  Complete WHOIS response from the registry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={whoisData.raw}
                  readOnly
                  className="font-mono text-sm h-64"
                />
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* SEO Content Section */}
      <DomainWhoisLookupSEOContent />
    </div>
  );
}

export default function DomainWhoisLookupPage() {
  return (
    <ToolPageWrapper toolSlug="domain-whois-lookup">
      (
    <ToastProvider>
      <DomainWhoisLookupContent />
    </ToastProvider>
  )
    </ToolPageWrapper>
  );
}
