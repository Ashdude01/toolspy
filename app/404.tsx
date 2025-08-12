'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AlertTriangle, ArrowLeft, Search, Home, TrendingUp, Clock, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Popular tools data
const popularTools = [
  { name: 'Image Compressor', slug: '/image-compressor', icon: '🗜️', category: 'Image Tools' },
  { name: 'PDF Converter', slug: '/pdf-converter', icon: '📄', category: 'PDF Tools' },
  { name: 'QR Code Generator', slug: '/qr-code-generator', icon: '📱', category: 'Utility Tools' },
  { name: 'Base64 Encoder', slug: '/base64-encoder-decoder', icon: '🔤', category: 'Base64 Tools' },
  { name: 'JSON Formatter', slug: '/json-formatter', icon: '📋', category: 'JSON Tools' },
  { name: 'Color Picker', slug: '/color-picker', icon: '🎨', category: 'Utility Tools' },
];

const categories = [
  { name: 'Image Tools', slug: '/tools/image-tools', icon: '🖼️', count: 8 },
  { name: 'PDF Tools', slug: '/tools/pdf-tools', icon: '📄', count: 12 },
  { name: 'Calculators', slug: '/tools/calculators', icon: '🧮', count: 6 },
  { name: 'AI Tools', slug: '/tools/ai-tools', icon: '🤖', count: 4 },
  { name: 'JSON Tools', slug: '/tools/json-tools', icon: '📋', count: 3 },
  { name: 'Base64 Tools', slug: '/tools/base64-tools', icon: '🔤', count: 2 },
];

export default function Custom404() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Main 404 Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="text-center border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
            <CardHeader className="pb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <AlertTriangle className="h-20 w-20 text-amber-500 animate-bounce" />
                  <div className="absolute inset-0 h-20 w-20 bg-amber-500/20 rounded-full animate-ping"></div>
                </div>
              </div>
              <CardTitle className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                404
              </CardTitle>
              <CardTitle className="text-3xl font-bold mb-4">
                Oops! Page Not Found
              </CardTitle>
              <CardDescription className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {currentPath.startsWith('/tools/') 
                  ? `The category "${currentPath.replace('/tools/', '').replace(/\/$/, '')}" doesn't exist. But don't worry - we've got plenty of amazing tools waiting for you!`
                  : "The page you're looking for seems to have wandered off. But don't worry - we've got plenty of amazing tools waiting for you!"
                }
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Search Section */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search for tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 text-lg"
                  />
                </div>
                <Button asChild className="w-full mt-3" size="lg">
                  <Link href={`/tools?search=${encodeURIComponent(searchQuery)}`}>
                    <Search className="mr-2 h-4 w-4" />
                    Search Tools
                  </Link>
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="default" size="lg">
                  <Link href="/tools">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Browse All Tools
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>

              {/* Popular Tools Section */}
              <div className="pt-8 border-t">
                <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                  <Zap className="h-6 w-6 text-yellow-500" />
                  Popular Tools
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularTools.map((tool) => (
                    <Link key={tool.slug} href={tool.slug}>
                      <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{tool.icon}</span>
                            <div className="flex-1 text-left">
                              <h4 className="font-semibold text-sm">{tool.name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {tool.category}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories Section */}
              <div className="pt-8 border-t">
                <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                  <Clock className="h-6 w-6 text-blue-500" />
                  Explore Categories
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Link key={category.slug} href={category.slug}>
                      <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20 group">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <span className="text-3xl group-hover:scale-110 transition-transform">
                              {category.icon}
                            </span>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{category.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {category.count} tools available
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Help Section */}
              <div className="pt-8 border-t">
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-center">Need Help?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <Link href="/contact" className="hover:text-primary transition-colors">
                      <div className="p-4 rounded-lg hover:bg-background transition-colors">
                        <h4 className="font-medium">Contact Us</h4>
                        <p className="text-sm text-muted-foreground">Get in touch with our team</p>
                      </div>
                    </Link>
                    <Link href="/help" className="hover:text-primary transition-colors">
                      <div className="p-4 rounded-lg hover:bg-background transition-colors">
                        <h4 className="font-medium">Help Center</h4>
                        <p className="text-sm text-muted-foreground">Find answers to common questions</p>
                      </div>
                    </Link>
                    <Link href="/feedback" className="hover:text-primary transition-colors">
                      <div className="p-4 rounded-lg hover:bg-background transition-colors">
                        <h4 className="font-medium">Send Feedback</h4>
                        <p className="text-sm text-muted-foreground">Help us improve Toolspy</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
