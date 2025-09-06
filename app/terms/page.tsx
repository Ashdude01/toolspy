import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Shield, Users, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions - Toolspy Online Tools',
  description: 'Read Toolspy\'s terms and conditions. Understand your rights and responsibilities when using our free online tools platform.',
  keywords: ['terms and conditions', 'terms of service', 'legal', 'user agreement', 'toolspy terms'],
};

export default function TermsPage() {
  const lastUpdated = 'January 1, 2025';

  const keyPoints = [
    {
      title: 'Free to Use',
      description: 'All tools are completely free for personal and commercial use without restrictions.',
      icon: <Users className="h-6 w-6" />
    },
    {
      title: 'No Registration Required',
      description: 'Use all tools without creating an account or providing personal information.',
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: 'Fair Use',
      description: 'Use tools reasonably and don\'t attempt to abuse or overload our services.',
      icon: <Scale className="h-6 w-6" />
    },
    {
      title: 'No Warranties',
      description: 'Tools are provided as-is without guarantees, though we strive for reliability.',
      icon: <AlertTriangle className="h-6 w-6" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Terms and Conditions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using Toolspy's online tools platform.
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Key Points */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {keyPoints.map((point, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
                  {point.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Terms Content */}
      <section className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
            <CardDescription>Agreement to these terms</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              By accessing and using Toolspy ("the Service"), you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Description of Service</CardTitle>
            <CardDescription>What Toolspy provides</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Toolspy provides a collection of free online tools for various purposes including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Image processing and conversion tools</li>
              <li>PDF manipulation and conversion tools</li>
              <li>Base64 encoding and decoding utilities</li>
              <li>Mathematical calculators and converters</li>
              <li>Various utility tools for digital tasks</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              All tools are provided free of charge and do not require user registration or account creation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. User Responsibilities</CardTitle>
            <CardDescription>Your obligations when using our service</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Acceptable Use</h4>
              <p className="text-sm text-muted-foreground">You agree to use the service only for lawful purposes and in accordance with these terms. You must not:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
                <li>Use the service for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Upload malicious files or content</li>
                <li>Abuse or overload our services</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Content Responsibility</h4>
              <p className="text-sm text-muted-foreground">
                You are solely responsible for any content you process using our tools. You must ensure you have 
                the right to process any files you upload and that such content does not violate any laws or 
                third-party rights.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Privacy and Data Processing</CardTitle>
            <CardDescription>How we handle your data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Client-Side Processing</h4>
              <p className="text-sm text-muted-foreground">
                Most of our tools process files entirely in your browser. This means your files never leave 
                your device and we have no access to them.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Server Processing</h4>
              <p className="text-sm text-muted-foreground">
                For tools that require server processing, files are automatically deleted immediately after 
                processing. We do not store, analyze, or share your files.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">No Data Collection</h4>
              <p className="text-sm text-muted-foreground">
                We do not collect personal information, track usage, or store user data. See our Privacy Policy 
                for complete details.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Intellectual Property</CardTitle>
            <CardDescription>Rights and ownership</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Service Content</h4>
              <p className="text-sm text-muted-foreground">
                The Toolspy service, including its original content, features, and functionality, is owned by 
                Toolspy and is protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property laws.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">User Content</h4>
              <p className="text-sm text-muted-foreground">
                You retain all rights to any content you process using our tools. We claim no ownership or 
                rights over your files or data.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Disclaimers and Limitations</CardTitle>
            <CardDescription>Service limitations and warranties</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Service Availability</h4>
              <p className="text-sm text-muted-foreground">
                We strive to provide reliable service but do not guarantee 100% uptime. The service may be 
                temporarily unavailable due to maintenance, updates, or technical issues.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">No Warranties</h4>
              <p className="text-sm text-muted-foreground">
                The service is provided "as is" without warranties of any kind, either express or implied. 
                We do not warrant that the service will meet your requirements or be error-free.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Limitation of Liability</h4>
              <p className="text-sm text-muted-foreground">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages resulting from your use of the service.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Commercial Use</CardTitle>
            <CardDescription>Using tools for business purposes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You are free to use our tools for commercial purposes without restriction. This includes using 
              the tools for client work, business projects, or any other commercial application. No licensing 
              fees or attribution is required for commercial use.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Service Modifications</CardTitle>
            <CardDescription>Changes to the service</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We reserve the right to modify, suspend, or discontinue any part of the service at any time 
              without notice. We may also update these terms from time to time. Continued use of the service 
              constitutes acceptance of any changes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Termination</CardTitle>
            <CardDescription>Ending service access</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We may terminate or suspend access to our service immediately, without prior notice or liability, 
              for any reason whatsoever, including without limitation if you breach the Terms. Since no accounts 
              are required, termination typically involves blocking access from specific IP addresses.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Governing Law</CardTitle>
            <CardDescription>Legal jurisdiction</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              These terms shall be interpreted and governed by the laws of the jurisdiction in which Toolspy 
              operates, without regard to its conflict of law provisions. Any disputes shall be resolved in 
              the courts of that jurisdiction.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Contact Information</CardTitle>
            <CardDescription>Getting in touch</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <strong>Email:</strong> legal@toolspy.net
              </p>
              <p className="text-sm">
                <strong>Contact Page:</strong> <a href="/contact" className="text-primary hover:underline">/contact</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 