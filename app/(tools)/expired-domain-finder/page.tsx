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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
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
  Clock,
  RefreshCw,
  ExternalLink,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Filter,
  SortAsc,
  SortDesc,
  Eye,
  Star,
  TrendingUp,
  DollarSign,
  Shield,
  Zap,
  Target,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { 
  searchExpiredDomains, 
  estimateDomainValue,
  type ExpiredDomainData 
} from "@/lib/utils/domain-utils";

interface ExpiredDomain {
  domain: string;
  expirationDate: string;
  daysExpired: number;
  domainAge: number;
  backlinks: number;
  domainAuthority: number;
  estimatedValue: number;
  category: string;
  status: 'expired' | 'pending-delete' | 'available' | 'taken';
  lastChecked: string;
}

interface SearchFilters {
  minAge: string;
  maxAge: string;
  minBacklinks: string;
  minDomainAuthority: string;
  maxDaysExpired: string;
  categories: string[];
  status: string[];
}

function ExpiredDomainFinderContent() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ExpiredDomain[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    minAge: "",
    maxAge: "",
    minBacklinks: "",
    minDomainAuthority: "",
    maxDaysExpired: "",
    categories: [],
    status: [],
  });
  const [sortBy, setSortBy] = useState("expirationDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const categories = [
    "Technology",
    "Business",
    "Health",
    "Education",
    "Entertainment",
    "Sports",
    "News",
    "Shopping",
    "Travel",
    "Finance",
    "Real Estate",
    "Automotive",
    "Food",
    "Fashion",
    "Other"
  ];

  const statusOptions = [
    { value: "expired", label: "Expired", color: "destructive" },
    { value: "pending-delete", label: "Pending Delete", color: "default" },
    { value: "available", label: "Available", color: "secondary" },
    { value: "taken", label: "Taken", color: "outline" },
  ];

  const performSearch = async () => {
    if (!searchQuery.trim()) {
      showToast("Please enter a search term", "error");
      return;
    }

    setIsLoading(true);
    setSearchResults([]);

    try {
      const results = await searchExpiredDomains(searchQuery.trim(), filters);
      
      // Convert to the expected format
      const formattedResults: ExpiredDomain[] = results.map(result => ({
        domain: result.domain,
        expirationDate: result.expirationDate,
        daysExpired: result.daysExpired,
        domainAge: result.domainAge,
        backlinks: result.backlinks,
        domainAuthority: result.domainAuthority,
        estimatedValue: result.estimatedValue,
        category: result.category,
        status: result.status as 'expired' | 'pending-delete' | 'available' | 'taken',
        lastChecked: result.lastChecked
      }));

      setSearchResults(formattedResults);
      showToast(`Found ${formattedResults.length} expired domains`, "success");
    } catch (error) {
      showToast("Failed to search for expired domains. Please try again.", "error");
      console.error("Search error:", error);
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

  const downloadResults = () => {
    if (searchResults.length === 0) return;

    const data = `Expired Domain Search Results
Generated on: ${new Date().toISOString()}
Search Query: ${searchQuery}

${searchResults.map(domain => 
  `${domain.domain},${domain.expirationDate},${domain.daysExpired},${domain.domainAge},${domain.backlinks},${domain.domainAuthority},${domain.estimatedValue},${domain.category},${domain.status}`
).join('\n')}`;

    const blob = new Blob([data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expired-domains-${searchQuery}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Results downloaded", "success");
  };

  const toggleDomainSelection = (domain: string) => {
    setSelectedDomains(prev => 
      prev.includes(domain) 
        ? prev.filter(d => d !== domain)
        : [...prev, domain]
    );
  };

  const selectAllDomains = () => {
    setSelectedDomains(searchResults.map(d => d.domain));
  };

  const clearSelection = () => {
    setSelectedDomains([]);
  };

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(s => s.value === status);
    if (!statusOption) return null;
    
    return (
      <Badge variant={statusOption.color as any}>
        {statusOption.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const sortedResults = [...searchResults].sort((a, b) => {
    let aValue: any = a[sortBy as keyof ExpiredDomain];
    let bValue: any = b[sortBy as keyof ExpiredDomain];

    if (sortBy === "expirationDate" || sortBy === "lastChecked") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • Real-time Data
        </Badge>

        <h2 className="bg-gradient-to-r from-green-500 dark:from-green-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Expired Domain Finder
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Discover valuable expired domains with our comprehensive search tool. 
          Find domains with high domain authority, backlinks, and potential value.
        </p>
      </div>

      {/* Search Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Find Expired Domains</CardTitle>
          <CardDescription>
            Search for expired domains by keyword, category, or criteria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search-input" className="text-sm font-medium">
                Search Keywords
              </Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="search-input"
                  type="text"
                  placeholder="Enter keywords (e.g., tech, health, business)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && performSearch()}
                  className="pl-10"
                />
              </div>
            </div>
            <Button
              onClick={performSearch}
              disabled={isLoading || !searchQuery.trim()}
              size="lg"
              className="sm:self-end"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Find Domains
                </>
              )}
            </Button>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              size="sm"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? "Hide" : "Show"} Advanced Filters
              {showFilters ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium">Min Domain Age (years)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.minAge}
                    onChange={(e) => setFilters(prev => ({ ...prev, minAge: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Max Domain Age (years)</Label>
                  <Input
                    type="number"
                    placeholder="20"
                    value={filters.maxAge}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxAge: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Min Backlinks</Label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={filters.minBacklinks}
                    onChange={(e) => setFilters(prev => ({ ...prev, minBacklinks: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Min Domain Authority</Label>
                  <Input
                    type="number"
                    placeholder="20"
                    value={filters.minDomainAuthority}
                    onChange={(e) => setFilters(prev => ({ ...prev, minDomainAuthority: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Max Days Expired</Label>
                  <Input
                    type="number"
                    placeholder="90"
                    value={filters.maxDaysExpired}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxDaysExpired: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <Select
                    value={filters.categories[0] || "all"}
                    onValueChange={(value) => setFilters(prev => ({ 
                      ...prev, 
                      categories: value && value !== "all" ? [value] : [] 
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {searchResults.length > 0 && (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                Found {searchResults.length} Expired Domains
              </h2>
              <p className="text-sm text-muted-foreground">
                Click on domains to select them for bulk actions
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAllDomains}
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSelection}
                >
                  Clear
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(selectedDomains.join('\n'))}
                  disabled={selectedDomains.length === 0}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Selected
                </Button>
                <Button
                  size="sm"
                  onClick={downloadResults}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Sort by:</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expirationDate">Expiration Date</SelectItem>
                  <SelectItem value="daysExpired">Days Expired</SelectItem>
                  <SelectItem value="domainAge">Domain Age</SelectItem>
                  <SelectItem value="backlinks">Backlinks</SelectItem>
                  <SelectItem value="domainAuthority">Domain Authority</SelectItem>
                  <SelectItem value="estimatedValue">Estimated Value</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedResults.map((domain, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedDomains.includes(domain.domain) 
                    ? "ring-2 ring-primary bg-primary/5" 
                    : ""
                }`}
                onClick={() => toggleDomainSelection(domain.domain)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold truncate">
                        {domain.domain}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(domain.status)}
                        <Badge variant="outline" className="text-xs">
                          {domain.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(domain.domain);
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`https://${domain.domain}`, '_blank');
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Expired</span>
                      </div>
                      <p className="font-medium">{formatDate(domain.expirationDate)}</p>
                      <p className="text-xs text-muted-foreground">
                        {domain.daysExpired} days ago
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Age</span>
                      </div>
                      <p className="font-medium">{domain.domainAge} years</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        <span>Backlinks</span>
                      </div>
                      <p className="font-medium">{domain.backlinks.toLocaleString()}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Star className="h-3 w-3" />
                        <span>DA</span>
                      </div>
                      <p className="font-medium">{domain.domainAuthority}/100</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="h-3 w-3" />
                        <span className="text-xs">Est. Value</span>
                      </div>
                      <p className="font-semibold text-green-600">
                        {formatCurrency(domain.estimatedValue)}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last checked: {formatDate(domain.lastChecked)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
</div>
  );
}

export default function ExpiredDomainFinderPage() {
  return (
    <ToolPageWrapper toolSlug="expired-domain-finder"><ToastProvider>
      <ExpiredDomainFinderContent /></ToastProvider></ToolPageWrapper>
  );
}
