import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/lib/config';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    Company: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    Tools: [
      { name: 'All Tools', href: '/tools' },
      { name: 'Image Tools', href: '/tools/image-tools' },
      { name: 'PDF Tools', href: '/tools/pdf-tools' },
      { name: 'Calculators', href: '/tools/calculators' },
      { name: 'Base64 Tools', href: '/tools/base64-tools' },
      { name: 'Utility Tools', href: '/tools/misc-tools' },
    ],
    Support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Feature Requests', href: '/feedback' },
      { name: 'Bug Reports', href: '/bug-report' },
      { name: 'Contact Support', href: '/contact' },
    ],
  };

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/toolspy',
      icon: Facebook,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram', 
      href: 'https://instagram.com/toolspy',
      icon: Instagram,
      color: 'hover:text-pink-600'
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/toolspy',
      icon: Twitter,
      color: 'hover:text-blue-400'
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@toolspy',
      icon: Youtube,
      color: 'hover:text-red-600'
    }
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">{siteConfig.name}.net</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {siteConfig.description}. Free, fast, and secure online tools for professionals.
            </p>
            <p className="text-xs text-muted-foreground">
              All processing happens locally in your browser for maximum privacy and security.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground transition-colors ${social.color}`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h3 className="font-semibold">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">
              Follow us on social media
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground transition-colors ${social.color}`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 