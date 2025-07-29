import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Users, Shield, Zap, Heart, Globe } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Toolspy - Professional Online Tools Platform',
  description: 'Learn about Toolspy, your trusted destination for professional online tools. Discover our mission, values, and commitment to providing free, secure, and reliable digital utilities.',
  keywords: ['about toolspy', 'online tools platform', 'mission', 'professional tools', 'free utilities'],
};

export default function AboutPage() {
  const stats = [
    { label: 'Tools Available', value: '50+', icon: Target },
    { label: 'Users Served', value: '1M+', icon: Users },
    { label: 'Files Processed', value: '10M+', icon: Zap },
    { label: 'Countries', value: '190+', icon: Globe },
  ];

  const values = [
    {
      title: 'Privacy First',
      description: 'Your data never leaves your device. We use client-side processing to ensure maximum privacy and security.',
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: 'Always Free',
      description: 'Professional-grade tools should be accessible to everyone. No hidden costs, no premium tiers, no limitations.',
      icon: <Heart className="h-6 w-6" />
    },
    {
      title: 'Quality Focus',
      description: 'Every tool is built with professional standards in mind, offering enterprise-level features and reliability.',
      icon: <Target className="h-6 w-6" />
    },
    {
      title: 'User-Centric',
      description: 'We listen to our users and continuously improve based on real feedback and usage patterns.',
      icon: <Users className="h-6 w-6" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">About Toolspy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted destination for professional online tools that actually work. 
            Built by developers, for everyone who needs reliable digital utilities.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-2">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Mission Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            We believe that powerful digital tools shouldn't be locked behind paywalls or come with privacy compromises. 
            Our mission is to provide professional-grade online utilities that are completely free, secure, and accessible to everyone.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
            <CardDescription>How Toolspy came to be</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Toolspy was born out of frustration with existing online tool platforms. Too often, we found ourselves 
              needing simple utilities like image compression or PDF conversion, only to encounter tools that were 
              either limited in their free versions, required registration, or worse - uploaded our files to unknown servers.
            </p>
            <p>
              As developers, we knew there was a better way. We could build tools that work entirely in your browser, 
              providing professional results without compromising your privacy. What started as a small project for 
              personal use quickly grew into a comprehensive platform serving millions of users worldwide.
            </p>
            <p>
              Today, Toolspy offers over 50 professional-grade tools covering everything from image processing and 
              PDF manipulation to calculators and encoding utilities. Every tool is built with the same core principles: 
              free access, maximum privacy, and professional quality.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Values Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            These principles guide everything we do at Toolspy
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Built by Developers, for Everyone</CardTitle>
            <CardDescription>Meet the team behind Toolspy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Toolspy is built and maintained by a passionate team of developers who understand the frustrations 
              of dealing with unreliable online tools. We're committed to creating utilities that we ourselves 
              would want to use - and that means no compromises on quality, security, or accessibility.
            </p>
            <p>
              Our team combines expertise in web development, image processing, cryptography, and user experience 
              design to create tools that are both powerful and easy to use. We're constantly working to add new 
              features, improve performance, and ensure compatibility across all devices and browsers.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Technology Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Technology & Security</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Built with modern web technologies for maximum performance and security
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Client-Side Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Most of our tools run entirely in your browser using WebAssembly and modern JavaScript, 
                ensuring your files never leave your device.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Modern Web Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built with React, Next.js, and TypeScript for reliability, performance, and maintainability 
                across all modern browsers.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Zero data collection, secure HTTPS connections, and client-side processing ensure your 
                privacy and security are never compromised.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6">
        <Card className="p-8 bg-primary/5">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Ready to Experience Better Tools?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join millions of users who trust Toolspy for their daily digital tasks. 
              All tools are free, secure, and designed for professional results.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/">Explore Tools</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
} 