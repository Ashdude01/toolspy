'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, RefreshCw, Home, Bug, ArrowLeft, Wifi, Clock, Shield } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { logError, getUserFriendlyMessage, getSuggestedActions, trackErrorPageEngagement, trackErrorPagePerformance } from '@/lib/utils/error-handler';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const [suggestedActions] = useState(() => getSuggestedActions(error));
  const [userFriendlyMessage] = useState(() => getUserFriendlyMessage(error));

  useEffect(() => {
    // Log the error and track performance
    logError(error);
    trackErrorPagePerformance();
    trackErrorPageEngagement('error_page_viewed');
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
            <CardHeader className="pb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <AlertTriangle className="h-20 w-20 text-red-500 animate-bounce" />
                  <div className="absolute inset-0 h-20 w-20 bg-red-500/20 rounded-full animate-ping"></div>
                </div>
              </div>
              <CardTitle className="text-4xl font-bold mb-4">
                Something Went Wrong
              </CardTitle>
              <CardDescription className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {userFriendlyMessage}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-muted/50 rounded-lg p-4 text-left">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Bug className="h-4 w-4" />
                    Error Details (Development)
                  </h4>
                  <div className="text-sm font-mono bg-background p-3 rounded border overflow-auto">
                    <p className="text-red-500 mb-2">{error.message}</p>
                    {error.digest && (
                      <p className="text-muted-foreground">
                        Error ID: {error.digest}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Recovery Actions */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Let's Get You Back on Track</h3>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => {
                      trackErrorPageEngagement('try_again_clicked');
                      reset();
                    }} 
                    variant="default" 
                    size="lg"
                    className="group"
                  >
                    <RefreshCw className="mr-2 h-4 w-4 group-hover:animate-spin" />
                    Try Again
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/" onClick={() => trackErrorPageEngagement('go_home_clicked')}>
                      <Home className="mr-2 h-4 w-4" />
                      Go Home
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Suggested Actions */}
              {suggestedActions.length > 0 && (
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Suggested Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {suggestedActions.map((action, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                          action.priority === 'high' 
                            ? 'border-red-200 bg-red-50 hover:border-red-300' 
                            : action.priority === 'medium'
                            ? 'border-yellow-200 bg-yellow-50 hover:border-yellow-300'
                            : 'border-blue-200 bg-blue-50 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {action.priority === 'high' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                          {action.priority === 'medium' && <Clock className="h-4 w-4 text-yellow-500" />}
                          {action.priority === 'low' && <Shield className="h-4 w-4 text-blue-500" />}
                          <span className="text-sm font-medium">{action.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Alternative Navigation */}
              <div className="pt-8 border-t">
                <h3 className="text-xl font-semibold mb-6">Or Try These Options</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link href="/tools" onClick={() => trackErrorPageEngagement('browse_tools_clicked')}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl mb-3">🛠️</div>
                        <h4 className="font-semibold">Browse Tools</h4>
                        <p className="text-sm text-muted-foreground mt-2">
                          Explore our collection of tools
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/contact" onClick={() => trackErrorPageEngagement('contact_support_clicked')}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl mb-3">📧</div>
                        <h4 className="font-semibold">Contact Support</h4>
                        <p className="text-sm text-muted-foreground mt-2">
                          Get help from our team
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/bug-report" onClick={() => trackErrorPageEngagement('report_bug_clicked')}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl mb-3">🐛</div>
                        <h4 className="font-semibold">Report Bug</h4>
                        <p className="text-sm text-muted-foreground mt-2">
                          Help us fix this issue
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>

              {/* Status Information */}
              <div className="pt-8 border-t">
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">What Happened?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="text-left">
                      <h4 className="font-medium mb-2">Possible Causes:</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Temporary server issue</li>
                        <li>• Network connectivity problem</li>
                        <li>• Browser cache conflict</li>
                        <li>• Unusual traffic spike</li>
                      </ul>
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium mb-2">What We're Doing:</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Automatically monitoring the issue</li>
                        <li>• Working to resolve it quickly</li>
                        <li>• Logging details for analysis</li>
                        <li>• Keeping you updated</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="pt-4">
                <Button 
                  asChild 
                  variant="ghost" 
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Link 
                    href="javascript:history.back()" 
                    onClick={() => trackErrorPageEngagement('go_back_clicked')}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
