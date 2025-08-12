'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, Zap, Clock, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Preparing amazing tools...');

  const loadingMessages = [
    'Preparing amazing tools...',
    'Loading your workspace...',
    'Optimizing performance...',
    'Almost ready...',
    'Final touches...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <Card className="w-96 border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* Main Loading Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
                <div className="absolute inset-0 h-16 w-16 bg-primary/20 rounded-full animate-ping"></div>
              </div>
            </div>

            {/* Loading Title */}
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Toolspy
            </h2>
            <p className="text-muted-foreground mb-6">
              {loadingText}
            </p>

            {/* Progress Bar */}
            <div className="space-y-3 mb-6">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {Math.round(progress)}% complete
              </p>
            </div>

            {/* Loading Features */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Zap className="h-6 w-6 text-yellow-500 animate-pulse" />
                </div>
                <p className="text-xs text-muted-foreground">Fast</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Sparkles className="h-6 w-6 text-purple-500 animate-pulse delay-300" />
                </div>
                <p className="text-xs text-muted-foreground">Secure</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Clock className="h-6 w-6 text-blue-500 animate-pulse delay-600" />
                </div>
                <p className="text-xs text-muted-foreground">Reliable</p>
              </div>
            </div>

            {/* Loading Tips */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                💡 Tip: While you wait, check out our latest tools and features!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-4xl animate-bounce delay-1000">🛠️</div>
        <div className="absolute top-1/3 right-1/4 text-4xl animate-bounce delay-2000">📄</div>
        <div className="absolute bottom-1/4 left-1/3 text-4xl animate-bounce delay-3000">🎨</div>
        <div className="absolute bottom-1/3 right-1/3 text-4xl animate-bounce delay-4000">🧮</div>
      </div>
    </div>
  );
}
