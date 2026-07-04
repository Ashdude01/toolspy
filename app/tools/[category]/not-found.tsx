'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AlertTriangle, ArrowLeft, Search, Home, TrendingUp, Clock, Zap, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Available categories with accurate data
const availableCategories = [
  { name: 'Image Tools', slug: '/tools/image-tools', icon: '🖼️', description: 'Professional image processing tools', count: 8 },
  { name: 'PDF Tools', slug: '/tools/pdf-tools', icon: '📄', description: 'PDF manipulation and conversion', count: 12 },
  { name: 'Calculators', slug: '/tools/calculators', icon: '🧮', description: 'Advanced calculation tools', count: 6 },
  { name: 'AI Tools', slug: '/tools/ai-tools', icon: '🤖', description: 'AI-powered intelligent tools', count: 4 },
  { name: 'JSON Tools', slug: '/tools/json-tools', icon: '📋', description: 'JSON processing and formatting', count: 3 },
  { name: 'Base64 Tools', slug: '/tools/base64-tools', icon: '🔤', description: 'Base64 encoding and decoding', count: 2 },
  { name: 'Code Tools', slug: '/tools/code-tools', icon: '💻', description: 'Developer utilities', count: 3 },
  { name: 'Conversion Tools', slug: '/tools/conversion-tools', icon: '🔄', description: 'File format conversion', count: 5 },
  { name: 'Utility Tools', slug: '/tools/misc-tools', icon: '🧰', description: 'General utility tools', count: 4 },
];

// Popular tools suggestions
const popularTools = [
  { name: 'Image Compressor', slug: '/image-compressor', icon: '🗜️', category: 'Image Tools' },
  { name: 'PDF Converter', slug: '/pdf-converter', icon: '📄', category: 'PDF Tools' },
  { name: 'QR Code Generator', slug: '/qr-code-generator', icon: '📱', category: 'Utility Tools' },
  { name: 'JSON Formatter', slug: '/json-formatter', icon: '📋', category: 'JSON Tools' },
  { name: 'Color Picker', slug: '/color-picker', icon: '🎨', category: 'Utility Tools' },
  { name: 'Base64 Encoder', slug: '/base64-encoder-decoder', icon: '🔤', category: 'Base64 Tools' },
];

export default function CategoryNotFound() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="mx-auto">
          <Card className="text-center border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
            <CardHeader className="pb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <AlertTriangle className="h-16 w-16 text-amber-500 animate-bounce" />
                  <div className="absolute inset-0 h-16 w-16 bg-amber-500/20 rounded-full animate-ping"></div>
                </div>
              </div>
              <CardTitle className="text-4xl font-bold mb-4">
                Category Not Found
              </CardTitle>
              <CardDescription className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The tool category you're looking for doesn't exist or may have been moved. 
                But don't worry - we've got plenty of amazing tools waiting for you!
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

              {/* Available Categories Section */}
              <div className="pt-8 border-t">
                <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                  <MapPin className="h-6 w-6 text-blue-500" />
                  Available Categories
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableCategories.map((category) => (
                    <Link key={category.slug} href={category.slug}>
                      <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20 group">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <span className="text-3xl group-hover:scale-110 transition-transform">
                              {category.icon}
                            </span>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{category.name}</h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                {category.description}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {category.count} tools
                              </Badge>
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
                  <h3 className="text-xl font-semibold mb-4 text-center">Need Help Finding Something?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <Link href="/tools" className="hover:text-primary transition-colors">
                      <div className="p-4 rounded-lg hover:bg-background transition-colors">
                        <h4 className="font-medium">All Tools</h4>
                        <p className="text-sm text-muted-foreground">Browse our complete collection</p>
                      </div>
                    </Link>
                    <Link href="/contact" className="hover:text-primary transition-colors">
                      <div className="p-4 rounded-lg hover:bg-background transition-colors">
                        <h4 className="font-medium">Contact Us</h4>
                        <p className="text-sm text-muted-foreground">Get help from our team</p>
                      </div>
                    </Link>
                    <Link href="/feedback" className="hover:text-primary transition-colors">
                      <div className="p-4 rounded-lg hover:bg-background transition-colors">
                        <h4 className="font-medium">Suggest Tools</h4>
                        <p className="text-sm text-muted-foreground">Request new tools or categories</p>
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