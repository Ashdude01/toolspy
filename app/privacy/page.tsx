import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, Server, Database, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - Toolspy Online Tools',
  description: 'Read Toolspy\'s privacy policy. Learn how we protect your data with client-side processing and our commitment to zero data collection.',
  keywords: ['privacy policy', 'data protection', 'client-side processing', 'security', 'toolspy privacy'],
};

export default function PrivacyPage() {
  const lastUpdated = 'January 1, 2025';

  const privacyFeatures = [
    {
      title: 'Client-Side Processing',
      description: 'Most tools process files entirely in your browser, meaning your data never leaves your device.',
      icon: <Lock className="h-6 w-6" />
    },
    {
      title: 'Zero Data Collection',
      description: 'We don\'t collect, store, or analyze your personal information or usage patterns.',
      icon: <Database className="h-6 w-6" />
    },
    {
      title: 'No Tracking',
      description: 'No cookies, no analytics, no tracking pixels. Your browsing remains completely private.',
      icon: <Eye className="h-6 w-6" />
    },
    {
      title: 'Secure Connections',
      description: 'All communications are encrypted using HTTPS to protect data in transit.',
      icon: <Shield className="h-6 w-6" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your privacy is our top priority. Learn how we protect your data and respect your privacy 
            while using Toolspy's online tools.
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Privacy Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {privacyFeatures.map((feature, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Main Content */}
      <section className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
            <CardDescription>What data we collect and why</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Personal Information</h4>
              <p className="text-sm text-muted-foreground">
                We do not collect any personal information. We don't require registration, email addresses, 
                or any form of personal identification to use our tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">File Data</h4>
              <p className="text-sm text-muted-foreground">
                Most of our tools process files entirely in your browser using client-side JavaScript. 
                This means your files never leave your device and are never uploaded to our servers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Usage Analytics</h4>
              <p className="text-sm text-muted-foreground">
                We do not use analytics services, tracking pixels, or any other monitoring tools. 
                We have no visibility into how you use our tools or what files you process.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How We Protect Your Data</CardTitle>
            <CardDescription>Technical and organizational measures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Client-Side Processing</h4>
              <p className="text-sm text-muted-foreground">
                Our primary data protection mechanism is client-side processing. Tools like image compression, 
                PDF conversion, and calculators run entirely in your browser using modern web technologies 
                like WebAssembly and JavaScript.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Secure Connections</h4>
              <p className="text-sm text-muted-foreground">
                All communications with our website are encrypted using HTTPS with TLS 1.3, ensuring that 
                any data transmitted is protected from interception.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">No Data Storage</h4>
              <p className="text-sm text-muted-foreground">
                Since we don't collect data, there's nothing to store or secure. This eliminates the risk 
                of data breaches, leaks, or unauthorized access to your information.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Server-Side Tools</CardTitle>
            <CardDescription>For tools that require server processing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              A small number of our tools may require server-side processing due to technical limitations 
              or complexity. For these tools:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Files are processed immediately and automatically deleted after processing</li>
              <li>No files are stored permanently on our servers</li>
              <li>Processing happens on secure, encrypted servers</li>
              <li>We have no access to view or analyze the content of uploaded files</li>
              <li>Files are never shared with third parties</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Third-Party Services</CardTitle>
            <CardDescription>External services we use</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Content Delivery Network</h4>
              <p className="text-sm text-muted-foreground">
                We use a CDN to serve our website files faster. The CDN provider may log IP addresses 
                for security and performance purposes, but this data is not shared with us.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Hosting Provider</h4>
              <p className="text-sm text-muted-foreground">
                Our website is hosted on secure cloud infrastructure. Standard server logs may be 
                generated for security and operational purposes.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cookies and Local Storage</CardTitle>
            <CardDescription>Browser storage usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Essential Cookies</h4>
              <p className="text-sm text-muted-foreground">
                We may use essential cookies required for the website to function properly, such as 
                remembering your theme preference (dark/light mode).
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Local Storage</h4>
              <p className="text-sm text-muted-foreground">
                Some tools may temporarily store processing results in your browser's local storage 
                for your convenience. This data never leaves your device and can be cleared at any time.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
            <CardDescription>What rights you have regarding your data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Since we don't collect personal data, most traditional data protection rights don't apply. However:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>You can use our tools completely anonymously</li>
              <li>You can clear any local storage data through your browser settings</li>
              <li>You can contact us with any privacy-related questions or concerns</li>
              <li>You can request information about our data practices at any time</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
            <CardDescription>How we handle policy updates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We may update this privacy policy from time to time to reflect changes in our practices 
              or legal requirements. Any changes will be posted on this page with an updated "Last Updated" 
              date. We encourage you to review this policy periodically.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>Questions about privacy</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              If you have any questions about this privacy policy or our data practices, please contact us at:
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <strong>Email:</strong> privacy@toolspy.net
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