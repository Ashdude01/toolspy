import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, Server, Database, Users } from 'lucide-react';
import { WebPageSchema } from '@/components/seo/comprehensive-schemas';

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
    <>
      <WebPageSchema
        title="Privacy Policy - Toolspy Online Tools"
        description="Read Toolspy's privacy policy. Learn how we protect your data with client-side processing and our commitment to zero data collection."
        url="https://toolspy.net/privacy"
        breadcrumbs={[
          { name: "Home", url: "https://toolspy.net" },
          { name: "Privacy Policy", url: "https://toolspy.net/privacy" }
        ]}
      />
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
                We use Google Analytics and other analytics services to understand how visitors interact with our website. 
                This helps us improve our services and user experience. Analytics data is collected anonymously and aggregated.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Advertising Data</h4>
              <p className="text-sm text-muted-foreground">
                We use advertising services (Google AdSense, Ezoic) that may collect information about your browsing behavior 
                to serve relevant advertisements. This information is collected through cookies and similar technologies as 
                described in the Advertising Services section below.
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
            <CardTitle>Google AdSense and Third-Party Advertising</CardTitle>
            <CardDescription>Advertising services and personalized ads</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This website uses Google AdSense, a service for including advertisements from Google Inc. ("Google"). 
              Google AdSense uses cookies and similar technologies to analyze your use of this website and to serve 
              advertisements based on your interests and browsing behavior.
            </p>
            
            <div>
              <h4 className="font-semibold mb-2">Google AdSense Cookies</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Google, as a third-party vendor, uses cookies to serve ads on this site. Google's use of the DART cookie 
                enables it to serve ads to users based on their visit to this site and other sites on the Internet. 
                DART uses "non-personally identifiable information" and does NOT track personal information about you, 
                such as your name, email address, physical address, etc.
              </p>
              <p className="text-sm text-muted-foreground">
                You may opt out of the use of the DART cookie by visiting the{' '}
                <a 
                  href="https://www.google.com/privacy_ads.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google ad and content network privacy policy
                </a>.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Third-Party Vendors and Ad Networks</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this 
                website or other websites. Google's use of advertising cookies enables it and its partners to serve ads 
                to users based on their visit to this site and/or other sites on the Internet.
              </p>
              <p className="text-sm text-muted-foreground">
                You may opt out of personalized advertising by visiting{' '}
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google's Ads Settings
                </a>
                {' '}or{' '}
                <a 
                  href="https://www.aboutads.info/choices/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.aboutads.info
                </a>.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Information Collected by AdSense</h4>
              <p className="text-sm text-muted-foreground mb-2">
                When you visit this website, Google AdSense and its advertising partners may collect the following types 
                of information:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Your IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages you visit on this site and other sites</li>
                <li>Time and date of your visit</li>
                <li>Referring website addresses</li>
                <li>Device identifiers</li>
                <li>Geographic location (general)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">How AdSense Uses Information</h4>
              <p className="text-sm text-muted-foreground">
                Google uses the information collected through AdSense to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4 mt-2">
                <li>Serve relevant advertisements to you</li>
                <li>Measure the effectiveness of advertisements</li>
                <li>Prevent fraud and abuse</li>
                <li>Improve advertising services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Google's Privacy Policies</h4>
              <p className="text-sm text-muted-foreground">
                For more information about how Google uses data when you use our site, please visit{' '}
                <a 
                  href="https://policies.google.com/technologies/partner-sites" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  How Google uses data when you use our partners' sites or apps
                </a>
                . You can also review{' '}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google's Privacy Policy
                </a>
                {' '}and{' '}
                <a 
                  href="https://policies.google.com/technologies/ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google's Advertising Privacy Policy
                </a>.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ezoic Services</CardTitle>
            <CardDescription>Advertising and content management services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This website uses the services of Ezoic Inc. ("Ezoic"), including to manage third-party interest-based advertising. 
              Ezoic may employ a variety of technologies on this website, including tools to serve content, display advertisements 
              and enable advertising to visitors of this website, which may utilize first and third-party cookies.
            </p>
            
            <div>
              <h4 className="font-semibold mb-2">Cookies and Tracking Technologies</h4>
              <p className="text-sm text-muted-foreground mb-2">
                A cookie is a small text file sent to your device by a web server that enables the website to remember information 
                about your browsing activity. First-party cookies are created by the site you are visiting, while third-party cookies 
                are set by domains other than the one you're visiting.
              </p>
              <p className="text-sm text-muted-foreground">
                Ezoic and our partners may place third-party cookies, tags, beacons, pixels, and similar technologies to monitor 
                interactions with advertisements and optimize ad targeting. Please note that disabling cookies may limit access to 
                certain content and features on the website, and rejecting cookies does not eliminate advertisements but will result 
                in non-personalized advertising.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                You can find more information about cookies and how to manage them{' '}
                <a 
                  href="https://www.ezoic.com/privacy-policy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  here
                </a>.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Information Collected for Personalized Advertising</h4>
              <p className="text-sm text-muted-foreground mb-2">
                The following information may be collected, used, and stored in a cookie when serving personalized ads:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>IP address</li>
                <li>Operating system type and version</li>
                <li>Device type</li>
                <li>Language preferences</li>
                <li>Web browser type</li>
                <li>Email (in a hashed or encrypted form)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Data Usage and Targeting</h4>
              <p className="text-sm text-muted-foreground">
                Ezoic and its partners may use this data in combination with information that has been independently collected to 
                deliver targeted advertisements across various platforms and websites. Ezoic's partners may also gather additional 
                data, such as unique IDs, advertising IDs, geolocation data, usage data, device information, traffic data, referral 
                sources, and interactions between users and websites or advertisements, to create audience segments for targeted 
                advertising across different devices, browsers, and apps.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                You can find more information about interest-based advertising and how to manage them{' '}
                <a 
                  href="https://www.ezoic.com/privacy-policy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  here
                </a>.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Additional Resources</h4>
              <p className="text-sm text-muted-foreground">
                You can view{' '}
                <a 
                  href="https://www.ezoic.com/privacy-policy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Ezoic's privacy policy here
                </a>
                , or for additional information about Ezoic's advertising and other partners, you can view{' '}
                <a 
                  href="https://www.ezoic.com/advertising-partners/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Ezoic's advertising partners here
                </a>.
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
              <h4 className="font-semibold mb-2">Advertising Cookies</h4>
              <p className="text-sm text-muted-foreground">
                We use advertising cookies from Google AdSense, Ezoic, and their partners to serve personalized 
                advertisements. These cookies help advertisers show you relevant ads based on your browsing 
                history and interests. You can opt out of personalized advertising through your browser settings 
                or by visiting the opt-out pages provided in the Advertising Services section above.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Local Storage</h4>
              <p className="text-sm text-muted-foreground">
                Some tools may temporarily store processing results in your browser's local storage 
                for your convenience. This data never leaves your device and can be cleared at any time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Managing Cookies</h4>
              <p className="text-sm text-muted-foreground">
                You can control and manage cookies through your browser settings. Most browsers allow you to 
                refuse or accept cookies, delete existing cookies, or receive a notification before a cookie 
                is stored. Please note that disabling cookies may affect the functionality of this website 
                and may result in non-personalized advertisements.
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
              You have the following rights regarding your data and privacy:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>You can use our tools completely anonymously</li>
              <li>You can opt out of personalized advertising through{' '}
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google's Ads Settings
                </a>
                {' '}or{' '}
                <a 
                  href="https://www.aboutads.info/choices/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.aboutads.info
                </a>
              </li>
              <li>You can control cookies through your browser settings</li>
              <li>You can clear any local storage data through your browser settings</li>
              <li>You can contact us with any privacy-related questions or concerns</li>
              <li>You can request information about our data practices at any time</li>
              <li>You have the right to know what data is collected and how it's used</li>
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
    </>
  );
} 