'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, Shield, Zap, Users } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export function HeroSection() {
  const scrollToTools = () => {
    document.getElementById('tools')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 py-16 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Privacy-First • No Data Collection
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Professional Tools
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {siteConfig.description}. Professional image compression, base64 conversion, and more. 
            All processing happens locally in your browser for maximum security.
          </p>

          {/* CTA Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={scrollToTools}
              className="text-lg px-8 py-6"
            >
              Explore Tools
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6"
            >
              View Documentation
            </Button>
          </div> */}

          {/* Feature Highlights */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Instant results with no server delays
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Completely Private</h3>
              <p className="text-sm text-muted-foreground">
                All processing happens in your browser
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Always Free</h3>
              <p className="text-sm text-muted-foreground">
                No registration or payment required
              </p>
            </div>
          </div> */}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
        <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-primary/30 dark:to-secondary/30 dark:opacity-100"></div>
        </div>
      </div>
    </section>
  );
} 