import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe2, ShieldCheck, UserCheck, FileSearch } from 'lucide-react';
import { WebPageSchema } from '@/components/seo/comprehensive-schemas';

export const metadata: Metadata = {
  title: 'GDPR & CCPA Compliance - Toolspy Online Tools',
  description:
    'How Toolspy complies with GDPR and CCPA: your data rights, client-side processing, consent management, and how to exercise access or deletion requests.',
  keywords: ['gdpr', 'ccpa', 'data rights', 'privacy compliance', 'toolspy gdpr'],
  alternates: {
    canonical: 'https://toolspy.net/gdpr-ccpa',
  },
};

export default function GdprCcpaPage() {
  const lastUpdated = 'July 3, 2026';

  const rights = [
    {
      icon: <FileSearch className="h-6 w-6" />,
      title: 'Right to Access & Portability',
      body: 'You can request a copy of any personal data we hold about you. In practice, Toolspy holds very little: files you process never leave your browser, and we do not require accounts to use tools.',
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: 'Right to Deletion / Erasure',
      body: 'You may request deletion of personal data you have shared with us (for example via the contact or feedback forms). We honor valid GDPR erasure and CCPA deletion requests within the legally required timeframes.',
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: 'Consent & Opt-Out',
      body: 'Analytics and advertising cookies load only after consent in GDPR regions (via our consent banner and Google Consent Mode). You can withdraw consent anytime with the "Manage Cookies" footer link. California residents may opt out of the "sale" or "sharing" of personal information as defined by the CCPA/CPRA using the same control.',
    },
    {
      icon: <Globe2 className="h-6 w-6" />,
      title: 'Data Minimization by Design',
      body: 'Toolspy is built privacy-first: client-side processing means your images, PDFs, and documents are processed on your own device. We do not collect, view, store, or transmit your file contents - this is stronger than what GDPR/CCPA require.',
    },
  ];

  return (
    <>
      <WebPageSchema
        title="GDPR & CCPA Compliance - Toolspy Online Tools"
        description="How Toolspy complies with GDPR and CCPA: your data rights and how to exercise them."
        url="https://toolspy.net/gdpr-ccpa"
        breadcrumbs={[
          { name: 'Home', url: 'https://toolspy.net' },
          { name: 'GDPR & CCPA', url: 'https://toolspy.net/gdpr-ccpa' },
        ]}
      />
      <div className="container mx-auto px-4 py-12 space-y-12 max-w-5xl">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">GDPR &amp; CCPA Compliance</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your data rights under the EU General Data Protection Regulation (GDPR) and the
            California Consumer Privacy Act (CCPA/CPRA), and how Toolspy honors them.
          </p>
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {rights.map((r, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <span className="text-primary">{r.icon}</span>
                  {r.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{r.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-3 text-muted-foreground leading-relaxed">
          <h2 className="text-2xl font-semibold text-foreground">How to Exercise Your Rights</h2>
          <p>
            Submit any GDPR or CCPA request through our{' '}
            <a href="/contact" className="underline underline-offset-4 text-foreground">
              contact page
            </a>{' '}
            with the subject &quot;Data Rights Request&quot;. Please describe the request type
            (access, deletion, opt-out) so we can respond quickly. We do not discriminate against
            users who exercise their privacy rights.
          </p>
          <p>
            Related pages:{' '}
            <a href="/privacy" className="underline underline-offset-4 text-foreground">
              Privacy Policy
            </a>{' '}
            ·{' '}
            <a href="/cookie-policy" className="underline underline-offset-4 text-foreground">
              Cookie Policy
            </a>{' '}
            ·{' '}
            <a href="/disclaimer" className="underline underline-offset-4 text-foreground">
              Disclaimer
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
