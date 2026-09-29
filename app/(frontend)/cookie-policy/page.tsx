import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie, Settings2, BarChart3, Megaphone } from 'lucide-react';
import { WebPageSchema } from '@/components/seo/comprehensive-schemas';

export const metadata: Metadata = {
  title: 'Cookie Policy - Toolspy Online Tools',
  description:
    'Toolspy cookie policy: which cookies we use (essential, analytics, advertising), why we use them, and how you can manage or withdraw consent anytime.',
  keywords: ['cookie policy', 'cookies', 'consent', 'toolspy cookies', 'manage cookies'],
  alternates: {
    canonical: 'https://toolspy.net/cookie-policy',
  },
};

export default function CookiePolicyPage() {
  const lastUpdated = 'July 3, 2026';

  const cookieTypes = [
    {
      icon: <Cookie className="h-6 w-6" />,
      title: 'Essential Cookies',
      body: 'Required for the website to function - for example, remembering your theme preference (dark/light) and your cookie-consent choice. These cannot be switched off because the site does not work correctly without them.',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Analytics Cookies',
      body: 'Used via Google Tag Manager / Google Analytics to understand which tools people use and how the site performs (page views, events like "tool used"). This data is aggregated and helps us decide which tools to improve. Loaded only after you give consent.',
    },
    {
      icon: <Megaphone className="h-6 w-6" />,
      title: 'Advertising Cookies',
      body: 'Toolspy is supported by advertising (Google AdSense and partner networks). Ad partners may use cookies to show relevant ads and measure ad performance. In regions covered by GDPR, personalized advertising cookies are set only with your consent; otherwise non-personalized ads may be shown.',
    },
    {
      icon: <Settings2 className="h-6 w-6" />,
      title: 'Managing Your Preferences',
      body: 'You can change or withdraw your consent at any time using the "Manage Cookies" link in the footer of every page. You can also clear or block cookies in your browser settings - the site will keep working, though some preferences may reset.',
    },
  ];

  return (
    <>
      <WebPageSchema
        title="Cookie Policy - Toolspy Online Tools"
        description="Toolspy cookie policy: which cookies we use, why, and how you can manage consent."
        url="https://toolspy.net/cookie-policy"
        breadcrumbs={[
          { name: 'Home', url: 'https://toolspy.net' },
          { name: 'Cookie Policy', url: 'https://toolspy.net/cookie-policy' },
        ]}
      />
      <div className="container mx-auto px-4 py-12 space-y-12 max-w-5xl">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Cookie Policy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            This page explains what cookies Toolspy uses, why we use them, and the controls you
            have. Your files are always processed client-side - cookies never touch your file
            content.
          </p>
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {cookieTypes.map((c, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <span className="text-primary">{c.icon}</span>
                  {c.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{c.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-3 text-muted-foreground leading-relaxed">
          <h2 className="text-2xl font-semibold text-foreground">Third-Party Cookies</h2>
          <p>
            Third parties that may set cookies on Toolspy include Google (Analytics, Tag Manager,
            AdSense) and our consent-management platform. Each third party&apos;s use of data is
            governed by its own privacy policy. For details on how we handle personal data more
            broadly, see our{' '}
            <a href="/privacy" className="underline underline-offset-4 text-foreground">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/gdpr-ccpa" className="underline underline-offset-4 text-foreground">
              GDPR &amp; CCPA page
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}
