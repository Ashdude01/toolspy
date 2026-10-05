import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copyright, FileWarning, Mail, ShieldCheck } from 'lucide-react';
import { WebPageSchema } from '@/components/seo/comprehensive-schemas';

export const metadata: Metadata = {
  title: 'DMCA Policy - Toolspy Online Tools',
  description:
    'Toolspy DMCA & copyright policy. Learn how to submit a takedown notice or counter-notice for content you believe infringes your copyright.',
  keywords: ['dmca', 'copyright policy', 'takedown notice', 'toolspy dmca'],
  alternates: {
    canonical: 'https://toolspy.net/dmca',
  },
};

export default function DMCAPage() {
  const lastUpdated = 'July 3, 2026';

  return (
    <>
      <WebPageSchema
        title="DMCA Policy - Toolspy Online Tools"
        description="Toolspy DMCA & copyright policy. Learn how to submit a takedown notice or counter-notice."
        url="https://toolspy.net/dmca"
        breadcrumbs={[
          { name: 'Home', url: 'https://toolspy.net' },
          { name: 'DMCA Policy', url: 'https://toolspy.net/dmca' },
        ]}
      />
      <div className="container mx-auto px-4 py-12 space-y-12 max-w-5xl">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">DMCA &amp; Copyright Policy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Toolspy respects intellectual property rights and complies with the Digital Millennium
            Copyright Act (DMCA) and equivalent laws.
          </p>
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <span className="text-primary"><ShieldCheck className="h-6 w-6" /></span>
                How Toolspy Handles Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Most Toolspy tools process files entirely in your browser - we do not host,
                store, or redistribute the files you work with. Where a tool fetches publicly
                available content at your request, you are responsible for ensuring you have the
                right to download and use that content. Toolspy does not encourage or condone
                copyright infringement in any form.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <span className="text-primary"><Copyright className="h-6 w-6" /></span>
                Filing a Takedown Notice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                If you believe content on toolspy.net infringes your copyright, send a notice
                containing: (1) identification of the copyrighted work; (2) the exact URL of the
                allegedly infringing material; (3) your contact details; (4) a good-faith
                statement that the use is not authorized; (5) a statement, under penalty of
                perjury, that the information is accurate and you are the rights holder or
                authorized to act for them; and (6) your physical or electronic signature.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <span className="text-primary"><FileWarning className="h-6 w-6" /></span>
                Counter-Notices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                If your content was removed due to a DMCA notice and you believe this was a
                mistake or misidentification, you may submit a counter-notice with your contact
                information, identification of the removed material, and a statement under
                penalty of perjury that you have a good-faith belief the removal was erroneous.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <span className="text-primary"><Mail className="h-6 w-6" /></span>
                Where to Send Notices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Send DMCA notices and counter-notices via our{' '}
                <a href="/contact" className="underline underline-offset-4 text-foreground">
                  contact page
                </a>{' '}
                with the subject line &quot;DMCA Notice&quot;. We review valid notices promptly
                and take appropriate action, including removing or disabling access to the
                material in question.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3 text-muted-foreground leading-relaxed">
          <h2 className="text-2xl font-semibold text-foreground">Repeat Infringers</h2>
          <p>
            Toolspy reserves the right to restrict access to features for users who repeatedly
            misuse tools to infringe the rights of others, to the extent such restriction is
            technically feasible.
          </p>
        </section>
      </div>
    </>
  );
}
