"use client";

import { useState, useRef, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Upload,
  Search,
  Globe,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  Play,
  Pause,
  Download,
  RefreshCw,
  FileText,
  Zap,
  Clock,
  BookOpen,
} from "lucide-react";
import { GoogleIndexingApiSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface ServiceAccount {
  project_id: string;
  private_key: string;
  client_email: string;
  private_key_id: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  type: string;
}

interface SubmissionResult {
  url: string;
  status: 'pending' | 'success' | 'error' | 'rate_limited';
  message?: string;
  timestamp?: Date;
}

interface ProgressStats {
  total: number;
  submitted: number;
  successful: number;
  failed: number;
  rateLimited: number;
}

function GoogleIndexingApiContent() {
  const { showToast } = useToast();
  const [serviceAccount, setServiceAccount] = useState<ServiceAccount | null>(null);
  const [urls, setUrls] = useState<string>('');
  const [sitemapUrl, setSitemapUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [results, setResults] = useState<SubmissionResult[]>([]);
  const [progress, setProgress] = useState<ProgressStats>({
    total: 0,
    submitted: 0,
    successful: 0,
    failed: 0,
    rateLimited: 0,
  });
  const [accessToken, setAccessToken] = useState<string>('');
  const [tokenExpiry, setTokenExpiry] = useState<Date | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Handle service account JSON upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/json') {
      showToast("Please upload a valid JSON file", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        
        // Validate required fields
        const requiredFields = ['project_id', 'private_key', 'client_email', 'private_key_id', 'client_id'];
        const missingFields = requiredFields.filter(field => !jsonData[field]);
        
        if (missingFields.length > 0) {
          showToast(`Invalid service account JSON. Missing fields: ${missingFields.join(', ')}`, "error");
          return;
        }

        setServiceAccount(jsonData);
        showToast("Service account JSON loaded successfully", "success");
      } catch (error) {
        showToast("Invalid JSON file format", "error");
      }
    };
    reader.readAsText(file);
  };

  // Get OAuth token for API access (client-side)
  const getAccessToken = async (): Promise<string> => {
    if (!serviceAccount) {
      throw new Error('No service account loaded');
    }

    // Check if we have a valid token
    if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
      return accessToken;
    }

    try {
      // Import jose library dynamically for client-side use
      const { SignJWT, importPKCS8 } = await import('jose');
      
      // Prepare the private key
      const privateKey = serviceAccount.private_key.replace(/\\n/g, '\n');
      
      // Import the private key using jose
      const key = await importPKCS8(privateKey, 'RS256');

      // Create JWT payload
      const now = Math.floor(Date.now() / 1000);
      const payload = {
        iss: serviceAccount.client_email,
        scope: 'https://www.googleapis.com/auth/indexing',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
      };

      // Create and sign the JWT
      const jwt = await new SignJWT(payload)
        .setProtectedHeader({ 
          alg: 'RS256', 
          typ: 'JWT',
          kid: serviceAccount.private_key_id 
        })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(key);

      // Request access token from Google
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: jwt,
        }),
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        console.error('Token request failed:', errorData);
        throw new Error('Failed to get access token: ' + (errorData.error_description || errorData.error));
      }

      const tokenData = await tokenResponse.json();
      setAccessToken(tokenData.access_token);
      setTokenExpiry(new Date(Date.now() + (tokenData.expires_in - 60) * 1000));
      
      return tokenData.access_token;
    } catch (error) {
      console.error('Authentication error:', error);
      throw new Error('Failed to authenticate with Google API: ' + (error as Error).message);
    }
  };

  // Extract URLs from sitemap (client-side)
  const fetchSitemapUrls = async () => {
    if (!sitemapUrl.trim()) {
      showToast("Please enter a sitemap URL", "error");
      return;
    }

    try {
      // Validate URL format
      let url;
      try {
        url = new URL(sitemapUrl.trim());
      } catch {
        showToast("Invalid sitemap URL format", "error");
        return;
      }

      showToast("Fetching sitemap...", "info");

      // Fetch the sitemap directly from client
      const response = await fetch(sitemapUrl.trim(), {
        headers: {
          'User-Agent': 'Toolspy Sitemap Parser/1.0',
        },
        mode: 'cors', // Handle CORS
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch sitemap: HTTP ${response.status}`);
      }

      const xmlContent = await response.text();
      
      // Parse XML using DOMParser (built into browsers)
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
      
      // Check for parsing errors
      const parseError = xmlDoc.querySelector('parsererror');
      if (parseError) {
        throw new Error('Invalid XML sitemap format');
      }

      const extractedUrls: string[] = [];

      // Handle sitemap index files
      const sitemapElements = xmlDoc.querySelectorAll('sitemapindex > sitemap > loc');
      if (sitemapElements.length > 0) {
        // This is a sitemap index, fetch individual sitemaps
        for (let i = 0; i < Math.min(sitemapElements.length, 10); i++) { // Limit to 10 sitemaps
          const sitemapUrl = sitemapElements[i].textContent?.trim();
          if (sitemapUrl) {
            try {
              const subResponse = await fetch(sitemapUrl, {
                headers: { 'User-Agent': 'Toolspy Sitemap Parser/1.0' },
                mode: 'cors',
              });
              
              if (subResponse.ok) {
                const subXmlContent = await subResponse.text();
                const subXmlDoc = parser.parseFromString(subXmlContent, 'text/xml');
                const subUrlElements = subXmlDoc.querySelectorAll('urlset > url > loc');
                
                subUrlElements.forEach(element => {
                  const url = element.textContent?.trim();
                  if (url) extractedUrls.push(url);
                });
              }
            } catch (error) {
              console.error(`Failed to fetch sub-sitemap ${sitemapUrl}:`, error);
            }
          }
        }
      } else {
        // Regular sitemap with URLs
        const urlElements = xmlDoc.querySelectorAll('urlset > url > loc');
        urlElements.forEach(element => {
          const url = element.textContent?.trim();
          if (url) extractedUrls.push(url);
        });
      }

      // Filter and validate URLs
      const validUrls = extractedUrls
        .filter(url => url && typeof url === 'string')
        .map(url => url.trim())
        .filter(url => {
          try {
            new URL(url);
            return true;
          } catch {
            return false;
          }
        })
        // Remove duplicates
        .filter((url, index, array) => array.indexOf(url) === index)
        // Limit to reasonable number
        .slice(0, 1000);

      if (validUrls.length === 0) {
        showToast("No valid URLs found in sitemap", "error");
        return;
      }

      const urlList = validUrls.join('\n');
      setUrls(urlList);
      showToast(`Found ${validUrls.length} URLs in sitemap`, "success");
      
    } catch (error) {
      console.error('Sitemap parsing error:', error);
      showToast(`Failed to fetch sitemap: ${(error as Error).message}`, "error");
    }
  };

  // Submit URLs to Google Indexing API
  const submitUrls = async () => {
    if (!serviceAccount) {
      showToast("Please upload a service account JSON file first", "error");
      return;
    }

    const urlList = urls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url && isValidUrl(url));

    if (urlList.length === 0) {
      showToast("Please enter valid URLs to submit", "error");
      return;
    }

    setIsSubmitting(true);
    setIsPaused(false);
    setResults([]);
    setProgress({
      total: urlList.length,
      submitted: 0,
      successful: 0,
      failed: 0,
      rateLimited: 0,
    });

    // Create abort controller for pausing/stopping
    abortControllerRef.current = new AbortController();

    try {
      const token = await getAccessToken();
      
      for (let i = 0; i < urlList.length; i++) {
        // Check if paused or aborted
        if (isPaused || abortControllerRef.current?.signal.aborted) {
          break;
        }

        const url = urlList[i];
        const result = await submitSingleUrl(url, token);
        
        setResults(prev => [...prev, result]);
        setProgress(prev => ({
          ...prev,
          submitted: i + 1,
          successful: result.status === 'success' ? prev.successful + 1 : prev.successful,
          failed: result.status === 'error' ? prev.failed + 1 : prev.failed,
          rateLimited: result.status === 'rate_limited' ? prev.rateLimited + 1 : prev.rateLimited,
        }));

        // Rate limiting: wait between requests
        if (i < urlList.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
        }
      }

      if (!isPaused && !abortControllerRef.current?.signal.aborted) {
        showToast("URL submission completed", "success");
      }
    } catch (error) {
      showToast("Failed to submit URLs: " + (error as Error).message, "error");
    } finally {
      setIsSubmitting(false);
      setIsPaused(false);
    }
  };

  // Submit single URL to Google Indexing API
  const submitSingleUrl = async (url: string, token: string): Promise<SubmissionResult> => {
    try {
      const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          type: 'URL_UPDATED',
        }),
      });

      if (response.status === 429) {
        return {
          url,
          status: 'rate_limited',
          message: 'Rate limit exceeded',
          timestamp: new Date(),
        };
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          url,
          status: 'error',
          message: errorData.error?.message || `HTTP ${response.status}`,
          timestamp: new Date(),
        };
      }

      return {
        url,
        status: 'success',
        message: 'Successfully submitted',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        url,
        status: 'error',
        message: (error as Error).message,
        timestamp: new Date(),
      };
    }
  };

  // Validate URL format
  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Pause/Resume submission
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Stop submission
  const stopSubmission = () => {
    abortControllerRef.current?.abort();
    setIsSubmitting(false);
    setIsPaused(false);
  };

  // Export results to CSV
  const exportResults = () => {
    if (results.length === 0) {
      showToast("No results to export", "error");
      return;
    }

    const csvContent = [
      ['URL', 'Status', 'Message', 'Timestamp'],
      ...results.map(result => [
        result.url,
        result.status,
        result.message || '',
        result.timestamp?.toISOString() || '',
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `google-indexing-results-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    showToast("Results exported to CSV", "success");
  };

  // Clear all data
  const clearAll = () => {
    stopSubmission();
    setServiceAccount(null);
    setUrls('');
    setSitemapUrl('');
    setResults([]);
    setProgress({
      total: 0,
      submitted: 0,
      successful: 0,
      failed: 0,
      rateLimited: 0,
    });
    setAccessToken('');
    setTokenExpiry(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showToast("All data cleared", "success");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'rate_limited':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      {/* Enhanced Header */}
      <div className="text-center mb-8 sm:mb-12">
        <Badge
        variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
          >
            <Shield className="w-4 h-4 mr-2" />
            Secure API Integration • Privacy-First • Enterprise-Grade
          </Badge>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          </div>
          <h1 className="relative !leading-snug bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Google Indexing API Tool
          </h1>
        </div>
        
        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          Submit website URLs directly to Google for <span className="font-semibold text-primary">lightning-fast indexing</span> and 
          improved search visibility. Professional bulk submission with real-time progress tracking.
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>2-6 Hour Indexing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Bulk URL Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span>Real-time Tracking</span>
          </div>
        </div>
      </div>

      {/* Enhanced Service Account Setup */}
      <Card className="mb-8 sm:mb-10 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50 border-slate-200 dark:border-slate-700 shadow-lg">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
              <Shield className="h-5 w-5" />
            </div>
            Service Account Authentication
          </CardTitle>
          <CardDescription className="text-base">
            Upload your Google service account JSON file to authenticate with the Indexing API. 
            <span className="font-medium text-primary">This is a one-time setup process.</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">Service Account JSON File</Label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 h-12 px-6 border-2 border-dashed border-blue-300 dark:border-blue-700 hover:border-blue-500 dark:hover:border-blue-500 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-all duration-200"
              >
                <Upload className="h-5 w-5" />
                <span className="font-medium">Upload JSON File</span>
              </Button>
              {serviceAccount && (
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-700 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-700 dark:text-green-300">Authentication Ready</div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {serviceAccount.client_email}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {!serviceAccount && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                  <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 dark:text-amber-200 text-lg mb-2">
                    Quick Setup Guide (5 minutes)
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
                    Don't worry! Setting up Google credentials is easier than you think. Follow these simple steps:
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div className="text-sm">
                      <div className="font-medium">Create Google Cloud Project</div>
                      <div className="text-muted-foreground">Free Google Cloud account needed</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div className="text-sm">
                      <div className="font-medium">Enable Indexing API</div>
                      <div className="text-muted-foreground">One-click enable, completely free</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div className="text-sm">
                      <div className="font-medium">Download JSON Credentials</div>
                      <div className="text-muted-foreground">Secure authentication file</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                    <div className="text-sm">
                      <div className="font-medium">Add to Search Console</div>
                      <div className="text-muted-foreground">Grant permissions to your site</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                  📹 Detailed video tutorial available in our setup guide below
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced URL Input */}
      <Card className="mb-8 sm:mb-10 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-indigo-200 dark:border-indigo-700 shadow-lg">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg text-white">
              <Globe className="h-5 w-5" />
            </div>
            URLs to Submit
          </CardTitle>
          <CardDescription className="text-base">
            Add URLs manually or extract them automatically from your sitemap. 
            <span className="font-medium text-primary">Both methods work seamlessly together.</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sitemap URL Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="text-base font-medium">Quick Import from Sitemap</Label>
              <Badge variant="secondary" className="text-xs">
                ⚡ Fastest Method
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="https://yourwebsite.com/sitemap.xml"
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
                className="flex-1 h-12 border-2 border-indigo-200 dark:border-indigo-700 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-900"
              />
              <Button
                variant="outline"
                onClick={fetchSitemapUrls}
                disabled={!sitemapUrl.trim()}
                className="h-12 px-6 bg-indigo-50 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-950/50"
              >
                <FileText className="h-4 w-4 mr-2" />
                <span className="font-medium">Import URLs</span>
              </Button>
            </div>
            <p className="text-sm text-indigo-600 dark:text-indigo-400">
              💡 Enter your sitemap URL and we'll automatically extract all URLs for you
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            <span className="text-sm text-muted-foreground font-medium">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          </div>

          {/* Manual URL Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="text-base font-medium">Manual URL Entry</Label>
              <Badge variant="secondary" className="text-xs">
                🎯 Precise Control
              </Badge>
            </div>
            <Textarea
              placeholder="https://yourwebsite.com/page1&#10;https://yourwebsite.com/page2&#10;https://yourwebsite.com/blog/new-post&#10;https://yourwebsite.com/products/amazing-product"
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              className="min-h-40 font-mono text-sm border-2 border-blue-200 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-900 resize-y"
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                💡 Paste one URL per line - we'll validate them automatically
              </p>
              <div className="flex items-center gap-2">
                {urls.split('\n').filter(url => url.trim() && isValidUrl(url.trim())).length > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      {urls.split('\n').filter(url => url.trim() && isValidUrl(url.trim())).length} valid URLs
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Submission Controls */}
      <Card className="mb-8 sm:mb-10 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 border-green-200 dark:border-green-700 shadow-lg">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg text-white">
              <Zap className="h-5 w-5" />
            </div>
            Submit to Google Indexing API
          </CardTitle>
          <CardDescription className="text-base">
            Ready to index your URLs? Click the button below to start the submission process.
            <span className="font-medium text-primary"> You can pause or stop anytime.</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              onClick={submitUrls}
              disabled={!serviceAccount || !urls.trim() || isSubmitting}
              className="h-14 px-8 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              size="lg"
            >
              <Search className="h-5 w-5" />
              {isSubmitting ? 'Submitting URLs...' : 'Submit to Google'}
            </Button>

            {isSubmitting && (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={togglePause}
                  className="h-14 px-6 border-2 border-yellow-300 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-950/30 hover:bg-yellow-100 dark:hover:bg-yellow-950/50 flex items-center gap-2"
                >
                  {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                  <span className="font-medium">{isPaused ? 'Resume' : 'Pause'}</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={stopSubmission}
                  className="h-14 px-6 border-2 border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 flex items-center gap-2"
                >
                  <XCircle className="h-5 w-5" />
                  <span className="font-medium">Stop</span>
                </Button>
              </div>
            )}

            {results.length > 0 && !isSubmitting && (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={exportResults}
                  className="h-14 px-6 border-2 border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 flex items-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  <span className="font-medium">Export CSV</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={clearAll}
                  className="h-14 px-6 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-950/30 hover:bg-gray-100 dark:hover:bg-gray-950/50 flex items-center gap-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  <span className="font-medium">Clear All</span>
                </Button>
              </div>
            )}
          </div>

          {/* Prerequisites Check */}          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`flex items-center gap-3 p-4 rounded-lg border-2 ${
              serviceAccount 
                ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-700' 
                : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-700'
            }`}>
              {serviceAccount ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <div>
                <div className={`font-medium ${serviceAccount ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  Service Account
                </div>
                <div className={`text-sm ${serviceAccount ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {serviceAccount ? 'Ready for submission' : 'Please upload JSON file'}
                </div>
              </div>
            </div>

            <div className={`flex items-center gap-3 p-4 rounded-lg border-2 ${
              urls.trim() && urls.split('\n').filter(url => url.trim() && isValidUrl(url.trim())).length > 0
                ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-700' 
                : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-700'
            }`}>
              {urls.trim() && urls.split('\n').filter(url => url.trim() && isValidUrl(url.trim())).length > 0 ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <div>
                <div className={`font-medium ${
                  urls.trim() && urls.split('\n').filter(url => url.trim() && isValidUrl(url.trim())).length > 0
                    ? 'text-green-700 dark:text-green-300' 
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  URLs Ready
                </div>
                <div className={`text-sm ${
                  urls.trim() && urls.split('\n').filter(url => url.trim() && isValidUrl(url.trim())).length > 0
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {urls.trim() && urls.split('\n').filter(url => url.trim() && isValidUrl(url.trim())).length > 0
                    ? `${urls.split('\n').filter(url => url.trim() && isValidUrl(url.trim())).length} valid URLs`
                    : 'Please add URLs to submit'
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Progress Section */}
          {progress.total > 0 && (
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-lg">Submission Progress</h4>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round((progress.submitted / progress.total) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {progress.submitted} / {progress.total} URLs
                  </div>
                </div>
              </div>
              
              <Progress value={(progress.submitted / progress.total) * 100} className="h-3 mb-6" />
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-xl text-green-700 dark:text-green-300">
                      {progress.successful}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      Successful
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-700">
                  <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <div className="font-bold text-xl text-red-700 dark:text-red-300">
                      {progress.failed}
                    </div>
                    <div className="text-sm text-red-600 dark:text-red-400">
                      Failed
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-full">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-bold text-xl text-yellow-700 dark:text-yellow-300">
                      {progress.rateLimited}
                    </div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400">
                      Rate Limited
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-950/30 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-2 bg-gray-100 dark:bg-gray-900/50 rounded-full">
                    <AlertCircle className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-bold text-xl text-gray-700 dark:text-gray-300">
                      {progress.total - progress.submitted}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Remaining
                    </div>
                  </div>
                </div>
              </div>
              
              {isSubmitting && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>{isPaused ? 'Submission paused - click Resume to continue' : 'Submitting URLs to Google...'}</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Submission Results</CardTitle>
            <CardDescription>
              {results.length} URL(s) processed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {getStatusIcon(result.status)}
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-sm truncate">{result.url}</div>
                      {result.message && (
                        <div className="text-xs text-muted-foreground">{result.message}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {result.timestamp?.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Important Notes */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Important Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
              <div>
                <strong>Daily Limits:</strong> Google Indexing API has a default limit of 200 requests per day.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <strong>Verification Required:</strong> You can only submit URLs from websites you own and have verified in Google Search Console.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <strong>Processing Time:</strong> Submitted URLs are typically crawled within a few hours to a day.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-purple-500 mt-0.5" />
              <div>
                <strong>Privacy:</strong> Your service account credentials are processed locally and never stored on our servers.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <GoogleIndexingApiSEOContent />
    </div>
  );
}

export default function GoogleIndexingApiPage() {
  return (
    <ToolPageWrapper toolSlug="google-indexing-api"><ToastProvider>
      <GoogleIndexingApiContent /></ToastProvider></ToolPageWrapper>
  );
}