import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Code2,
  FileText,
  LineChart,
  Megaphone,
  Palette,
  Search,
  Share2,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Video,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FAQ } from '@/components/ui/faq';
import { WebPageSchema, FAQSchema } from '@/components/seo/comprehensive-schemas';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Digital Marketing Services | Toolspy – Grow Your Brand Online',
  description:
    'Full-service digital marketing agency by Toolspy. Web & app development, graphic design, video production, content marketing, social media, performance ads, and SEO - data-driven strategies that deliver measurable growth.',
  keywords: [
    'digital marketing services',
    'web development agency',
    'app development services',
    'graphic design services',
    'video marketing',
    'content marketing',
    'social media marketing',
    'performance marketing',
    'PPC advertising',
    'SEO services',
    'online marketing agency',
    'brand growth',
    'toolspy digital marketing',
  ],
  openGraph: {
    title: 'Digital Marketing Services | Toolspy',
    description:
      'End-to-end digital marketing - web & app development, design, video, content, social media, performance ads, and SEO. Strategy-first, results-driven.',
    type: 'website',
    url: `${siteConfig.url}/digital-marketing`,
    images: [
      {
        url: `${siteConfig.url}/digital-marketing/hero.png`,
        width: 1200,
        height: 630,
        alt: 'Toolspy Digital Marketing Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Services | Toolspy',
    description:
      'Grow your brand with Toolspy - web & app development, design, video, content, social media, performance marketing, and SEO.',
    images: [`${siteConfig.url}/digital-marketing/hero.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/digital-marketing`,
  },
};

const services = [
  {
    title: 'Web Development',
    icon: Code2,
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    features: [
      'Custom business & e-commerce websites',
      'Landing pages optimized for conversions',
      'Responsive, mobile-first development',
      'CMS integration & ongoing maintenance',
    ],
  },
  {
    title: 'App Development',
    icon: Smartphone,
    color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400',
    features: [
      'Native iOS & Android applications',
      'Cross-platform apps (React Native, Flutter)',
      'Progressive Web Apps (PWA)',
      'App store optimization & maintenance',
    ],
  },
  {
    title: 'Graphic Design',
    icon: Palette,
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
    features: [
      'Logo & brand identity systems',
      'Social media & ad creatives',
      'Marketing collateral & presentations',
      'UI/UX design for digital products',
    ],
  },
  {
    title: 'Video Production',
    icon: Video,
    color: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
    features: [
      'Promotional & brand story videos',
      'Social reels & short-form content',
      'Product demos & explainer videos',
      'Video ads for YouTube, Meta & more',
    ],
  },
  {
    title: 'Content Marketing',
    icon: FileText,
    color: 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400',
    features: [
      'Blog posts & long-form articles',
      'Website copy & landing page content',
      'Email marketing campaigns',
      'Content calendars & editorial strategy',
    ],
  },
  {
    title: 'Social Media Marketing',
    icon: Share2,
    color: 'bg-pink-50 text-pink-600 dark:bg-pink-950 dark:text-pink-400',
    features: [
      'Platform strategy (Instagram, Facebook, LinkedIn, X)',
      'Content planning & community management',
      'Influencer outreach & collaborations',
      'Social analytics & performance reporting',
    ],
  },
  {
    title: 'Performance Marketing',
    icon: Megaphone,
    color: 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
    features: [
      'Google Ads & search campaigns',
      'Meta, Instagram & LinkedIn ads',
      'Retargeting & funnel optimization',
      'A/B testing & conversion rate optimization',
    ],
  },
  {
    title: 'SEO',
    icon: Search,
    color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400',
    features: [
      'Technical SEO audits & fixes',
      'On-page optimization & keyword strategy',
      'Local SEO & Google Business Profile',
      'Link building & authority growth',
    ],
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery & Audit',
    description:
      'We analyze your business, competitors, audience, and current digital presence to uncover opportunities.',
    icon: Target,
  },
  {
    step: '02',
    title: 'Strategy & Planning',
    description:
      'A tailored roadmap with clear KPIs, channel mix, timelines, and budget allocation aligned to your goals.',
    icon: LineChart,
  },
  {
    step: '03',
    title: 'Execution & Creative',
    description:
      'Our team builds, designs, writes, and launches campaigns across web, content, social, and paid channels.',
    icon: Zap,
  },
  {
    step: '04',
    title: 'Measure & Optimize',
    description:
      'Continuous tracking, reporting, and iteration to maximize ROI and scale what works.',
    icon: BarChart3,
  },
];

const stats = [
  { label: 'Services Offered', value: '8+', icon: Sparkles },
  { label: 'Avg. Client ROI', value: '3.2x', icon: TrendingUp },
  { label: 'Campaigns Launched', value: '500+', icon: Megaphone },
  { label: 'Industries Served', value: '25+', icon: Target },
];

const whyChooseUs = [
  {
    title: 'Full-Stack Digital Partner',
    description:
      'From website to SEO to paid ads - one team handles your entire digital ecosystem without agency handoffs.',
  },
  {
    title: 'Data-Driven Decisions',
    description:
      'Every recommendation is backed by analytics, industry benchmarks, and measurable KPIs - not guesswork.',
  },
  {
    title: 'Transparent Reporting',
    description:
      'Clear monthly dashboards showing traffic, leads, conversions, and ROI so you always know where you stand.',
  },
  {
    title: 'Scalable Solutions',
    description:
      'Whether you are a startup or an established brand, our packages grow with your business needs and budget.',
  },
];

const faqs = [
  {
    question: 'What digital marketing services does Toolspy offer?',
    answer:
      'Toolspy offers a complete suite of digital marketing services including web development, app development, graphic design, video production, content marketing, social media management, performance marketing (PPC), and SEO. We can handle individual services or build an integrated strategy across all channels.',
  },
  {
    question: 'How long does it take to see results from digital marketing?',
    answer:
      'Timeline varies by service. Paid ads can generate leads within days, while SEO typically shows meaningful results in 3–6 months. Web and app development projects range from 2–12 weeks depending on scope. We set realistic expectations and milestones during the discovery phase.',
  },
  {
    question: 'Do you work with small businesses and startups?',
    answer:
      'Yes. We design flexible packages for startups, SMBs, and enterprises. Our goal is to deliver maximum impact within your budget, starting with high-priority channels that drive the fastest returns.',
  },
  {
    question: 'How do you measure campaign success?',
    answer:
      'We track KPIs aligned to your business goals - website traffic, lead generation, conversion rates, cost per acquisition, ROAS, keyword rankings, and engagement metrics. You receive regular reports with actionable insights.',
  },
  {
    question: 'Can I hire Toolspy for just one service, like SEO or web development?',
    answer:
      'Absolutely. While we recommend an integrated approach for best results, you can engage us for any single service - web development, app development, graphic design, video, content, social media, performance marketing, or SEO - as a standalone project.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Contact us through our contact page or email support@toolspy.net with your project details. We will schedule a free consultation to understand your goals and propose a customized strategy.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Digital Marketing Services',
  provider: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  description:
    'Full-service digital marketing including web development, app development, graphic design, video production, content marketing, social media, performance marketing, and SEO.',
  serviceType: 'Digital Marketing',
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Marketing Services',
    itemListElement: services.map((service, index) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.features.join('. '),
      },
      position: index + 1,
    })),
  },
};

export default function DigitalMarketingPage() {
  const pageUrl = `${siteConfig.url}/digital-marketing`;

  return (
    <>
      <WebPageSchema
        title="Digital Marketing Services | Toolspy"
        description="Full-service digital marketing - web & app development, graphic design, video, content, social media, performance ads, and SEO."
        url={pageUrl}
        image={`${siteConfig.url}/digital-marketing/hero.png`}
        breadcrumbs={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Digital Marketing', url: pageUrl },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden text-white">
        <Image
          src="/digital-marketing/hero.png"
          alt="Toolspy digital marketing command center with analytics dashboards"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80" />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center container mx-auto px-4 py-20 lg:py-28">
          <div className="space-y-8 max-w-4xl">
            <Badge className="bg-white/10 text-white/90 border-white/20 hover:bg-white/15 text-xs tracking-widest uppercase font-medium px-4 py-1.5">
              Full-Service Digital Marketing Agency
            </Badge>
            <h1 className="font-bold tracking-tight text-white !text-4xl md:!text-5xl lg:!text-6xl !pb-0 leading-tight">
              Grow Your Brand with Data-Driven Digital Marketing
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
              From stunning websites and apps to high-converting ad campaigns - Toolspy delivers
              end-to-end digital marketing services that help businesses attract, engage, and
              convert their ideal customers online.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8">
                <Link href="/contact">
                  Get a Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/60 text-white hover:bg-white/10 hover:text-white bg-transparent px-8"
              >
                <Link href="#services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats inside hero */}
        <div className="relative z-10 container mx-auto px-4 pb-12 lg:pb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-4 py-6 hover:bg-white/15 transition-colors"
              >
                <div className="flex justify-center mb-3">
                  <stat.icon className="h-6 w-6 text-white/80" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs font-medium text-white/70 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-20 overflow-x-hidden">
        {/* Services */}
        <section id="services" className="space-y-10 scroll-mt-24">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Our Digital Marketing Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Eight core disciplines. One integrated team. Everything your brand needs to dominate
              online.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            {services.map((service) => (
              <Card
                key={service.title}
                className="hover:shadow-md hover:border-cyan-500/20 transition-all duration-300 group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl shrink-0 ${service.color}`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl leading-snug pt-0.5">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Our Proven Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A structured, transparent workflow that turns strategy into measurable results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item) => (
              <Card key={item.step} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <span className="text-5xl font-bold text-primary/10 absolute top-4 right-4">
                    {item.step}
                  </span>
                  <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Why Brands Choose Toolspy</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We combine creative excellence with technical expertise and analytics rigor.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseUs.map((item) => (
              <Card key={item.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Industries */}
        <section>
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="py-12 px-8 text-center space-y-6">
              <h2 className="text-3xl font-bold">Industries We Serve</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We have helped businesses across e-commerce, SaaS, healthcare, education, real
                estate, hospitality, finance, and local services build their digital presence and
                drive growth.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                {[
                  'E-Commerce',
                  'SaaS & Tech',
                  'Healthcare',
                  'Education',
                  'Real Estate',
                  'Hospitality',
                  'Finance',
                  'Local Business',
                ].map((industry) => (
                  <Badge key={industry} variant="outline" className="text-sm py-1.5 px-4">
                    {industry}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section>
          <FAQ
            title="Frequently Asked Questions"
            description="Everything you need to know before getting started."
            faqs={faqs}
            variant="modern"
          />
        </section>

        {/* CTA */}
        <section>
          <Card className="p-10 md:p-14 bg-gradient-to-r from-slate-950 to-blue-950 border border-cyan-500/20 text-white">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-cyan-500/15 rounded-full">
                  <TrendingUp className="h-8 w-8 text-cyan-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold">Ready to Accelerate Your Growth?</h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Let&apos;s build a digital marketing strategy tailored to your business goals. Book a
                free consultation and discover how Toolspy can help you scale.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Button asChild size="lg" className="px-8 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold">
                  <Link href="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="px-8 border-cyan-500/40 text-cyan-100 hover:bg-cyan-500/10 hover:text-white bg-transparent"
                >
                  <Link href="mailto:support@toolspy.net">Email Us Directly</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
}
