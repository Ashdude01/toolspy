import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Users, Shield, Zap, Heart, Globe, Award, TrendingUp, Clock, CheckCircle, Star, ArrowRight, Download, Lock, Smartphone, Code, Calculator, FileText, Image, Palette } from 'lucide-react';
import Link from 'next/link';
import StaticPageSchema from '@/components/seo/StaticPageSchema';
import { WebPageSchema } from '@/components/seo/comprehensive-schemas';

export const metadata: Metadata = {
  title: 'About Toolspy - Professional Online Tools Platform',
  description: 'Learn about Toolspy, your trusted destination for professional online tools. Discover our mission to provide free, secure, and reliable digital utilities for image compression, PDF conversion, calculators, and more.',
  keywords: [
    'about toolspy', 
    'online tools platform', 
    'mission', 
    'professional tools', 
    'free utilities',
    'image compression tools',
    'PDF converter online',
    'base64 encoder',
    'digital tools',
    'web-based utilities',
    'privacy-focused tools',
    'mobile-optimized tools',
    'free online calculators',
    'document converter',
    'file compression tools'
  ],
  openGraph: {
    title: 'About Toolspy - Professional Online Tools Platform',
    description: 'Learn about Toolspy, your trusted destination for professional online tools. Discover our mission to provide free, secure, and reliable digital utilities.',
    type: 'website',
    url: 'https://toolspy.net/about',
    images: [
      {
        url: 'https://toolspy.net/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'About Toolspy - Professional Online Tools Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Toolspy - Professional Online Tools Platform',
    description: 'Learn about Toolspy, your trusted destination for professional online tools. Discover our mission to provide free, secure, and reliable digital utilities.',
    images: ['https://toolspy.net/og-about.jpg']
  }
};

export default function AboutPage() {
  const stats = [
    { label: 'Professional Tools', value: '50+', icon: Target, description: 'Free online utilities' },
    { label: 'Global Users', value: '1M+', icon: Users, description: 'Trusted worldwide' },
    { label: 'Files Processed', value: '10M+', icon: Zap, description: 'Monthly operations' },
    { label: 'Countries Served', value: '190+', icon: Globe, description: 'Global reach' },
  ];

  const values = [
    {
      title: 'Privacy First',
      description: 'Your data never leaves your device. We use client-side processing to ensure maximum privacy and security.',
      icon: <Shield className="h-6 w-6" />,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Always Free',
      description: 'Professional-grade tools should be accessible to everyone. No hidden costs, no premium tiers, no limitations.',
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-red-50 text-red-600'
    },
    {
      title: 'Quality Focus',
      description: 'Every tool is built with professional standards in mind, offering enterprise-level features and reliability.',
      icon: <Award className="h-6 w-6" />,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'User-Centric',
      description: 'We listen to our users and continuously improve based on real feedback and usage patterns.',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-green-50 text-green-600'
    }
  ];

  const toolCategories = [
    {
      title: 'Image Processing',
      description: 'Compress, convert, and optimize images with professional quality',
      icon: <Image className="h-8 w-8" />,
      tools: ['Image Compressor', 'Image Converter', 'Background Remover'],
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'PDF Tools',
      description: 'Merge, split, convert, and compress PDF documents securely',
      icon: <FileText className="h-8 w-8" />,
      tools: ['PDF Merger', 'PDF Splitter', 'PDF to Word'],
      color: 'bg-red-50 text-red-600'
    },
    {
      title: 'Developer Tools',
      description: 'Base64 encoding, JSON formatting, and code beautification',
      icon: <Code className="h-8 w-8" />,
      tools: ['Base64 Encoder', 'JSON Formatter', 'Code Beautifier'],
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Calculators',
      description: 'Financial, mathematical, and conversion calculators',
      icon: <Calculator className="h-8 w-8" />,
      tools: ['Loan Calculator', 'Percentage Calculator', 'Unit Converter'],
      color: 'bg-green-50 text-green-600'
    }
  ];

  const features = [
    {
      title: 'Client-Side Processing',
      description: 'Your files never leave your device. Advanced algorithms run directly in your browser.',
      icon: <Lock className="h-6 w-6" />
    },
    {
      title: 'Mobile Optimized',
      description: 'Touch-friendly interfaces that work perfectly on smartphones and tablets.',
      icon: <Smartphone className="h-6 w-6" />
    },
    {
      title: 'Batch Processing',
      description: 'Process multiple files simultaneously with intelligent progress tracking.',
      icon: <Download className="h-6 w-6" />
    },
    {
      title: 'No Registration',
      description: 'Start using tools immediately. No accounts, no personal data required.',
      icon: <CheckCircle className="h-6 w-6" />
    }
  ];

  return (
    <>
      <StaticPageSchema pageType="about" />
      <WebPageSchema
        title="About Toolspy - Professional Online Tools Platform"
        description="Learn about Toolspy, your trusted destination for professional online tools. Discover our mission to provide free, secure, and reliable digital utilities for image compression, PDF conversion, calculators, and more."
        url="https://toolspy.net/about"
        breadcrumbs={[
          { name: "Home", url: "https://toolspy.net" },
          { name: "About", url: "https://toolspy.net/about" }
        ]}
      />
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <div className="space-y-6">
            <Badge variant="secondary" className="text-sm font-medium">
              Trusted by 1M+ Users Worldwide
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              About Toolspy
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Your trusted destination for professional online tools that actually work. 
              Built by developers, for everyone who needs reliable digital utilities.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Button asChild size="lg">
                <Link href="/tools">
                  Explore Our Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Mission Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We believe that powerful digital tools shouldn't be locked behind paywalls or come with privacy compromises. 
              Our mission is to provide professional-grade online utilities that are completely free, secure, and accessible to everyone.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="space-y-6">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                Our Story
              </CardTitle>
              <CardDescription className="text-lg">How Toolspy came to be</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-lg leading-relaxed">
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
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide everything we do at Toolspy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 p-3 rounded-lg ${value.color}`}>
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tool Categories Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Our Comprehensive Toolkit</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional-grade tools for every digital task
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {toolCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription className="text-base">{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{tool}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Why Choose Toolspy?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with modern technology for maximum performance and security
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-6">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                Built by Developers, for Everyone
              </CardTitle>
              <CardDescription className="text-lg">Meet the team behind Toolspy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-lg leading-relaxed">
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
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Technology & Security</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with modern web technologies for maximum performance and security
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Lock className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Client-Side Processing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Most of our tools run entirely in your browser using WebAssembly and modern JavaScript, 
                  ensuring your files never leave your device.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Code className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Modern Web Standards</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Built with React, Next.js, and TypeScript for reliability, performance, and maintainability 
                  across all modern browsers.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Security First</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Zero data collection, secure HTTPS connections, and client-side processing ensure your 
                  privacy and security are never compromised.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="space-y-6">
          <Card className="p-12 bg-gradient-to-r from-primary/5 to-primary/10 border-2 border-primary/20">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Star className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold">Ready to Experience Better Tools?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join millions of users who trust Toolspy for their daily digital tasks. 
                All tools are free, secure, and designed for professional results.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Button asChild size="lg" className="px-8">
                  <Link href="/tools">
                    Explore Our Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="px-8">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
} 