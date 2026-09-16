"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Sparkles, 
  Users, 
  Heart, 
  Award,
  Shield,
  Zap,
  Globe,
  Twitter,
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  X,
  Facebook
} from "lucide-react"
import Link from "next/link"
import { CookieConsentModal } from "@/components/consent/cookie-consent-modal"
import { getConsentState } from "@/lib/utils/consent"
import { useT, useLocale } from "@/lib/i18n/use-t"
import { localizeHref } from "@/lib/i18n/localize-href"
import Image from "next/image"

export function Footer() {
  const [showConsentModal, setShowConsentModal] = useState(false)
  const t = useT()
  const locale = useLocale()
  const L = (href: string) => localizeHref(locale, href)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleManageCookies = () => {
    setShowConsentModal(true)
  }

  const footerSections: Array<{
    title: string;
    links: Array<{
      href?: string;
      label: string;
      onClick?: () => void;
      isButton?: boolean;
    }>;
  }> = [
    {
      // Section titles + generic Company/Legal labels translate hote hain.
      // Specific tool/product NAMES (Image Compressor, PDF Converter…) English
      // rehte hain — brand/product names har bhasha me English standard hai.
      title: t("footer.sections.popularTools"),
      links: [
        { href: "/image-compressor", label: "Image Compressor" },
        { href: "/pdf-converter", label: "PDF Converter" },
        { href: "/base64-encoder-decoder", label: "Base64 Tools" },
        { href: "/age-calculator", label: "Calculators" },
        { href: "/image-converter", label: "Image Converter" },
        { href: "/merge-pdf", label: "PDF Merger" }
      ]
    },
    {
      title: t("footer.sections.company"),
      links: [
        { href: "/about", label: t("footer.links.aboutUs") },
        { href: "/blog", label: t("footer.links.blog") },
        { href: "/digital-marketing", label: t("footer.links.digitalMarketing") },
        { href: "/contact", label: t("footer.links.contact") },
        { href: "/help", label: t("footer.links.help") },
        { href: "/feedback", label: t("footer.links.feedback") },
        { label: t("footer.links.manageCookies"), onClick: handleManageCookies, isButton: true }
      ]
    },
    {
      title: t("footer.sections.legal"),
      links: [
        { href: "/privacy", label: t("footer.links.privacy") },
        { href: "/terms", label: t("footer.links.terms") },
        { href: "/disclaimer", label: t("footer.links.disclaimer") },
        { href: "/dmca", label: t("footer.links.dmca") },
        { href: "/cookie-policy", label: t("footer.links.cookiePolicy") },
        { href: "/gdpr-ccpa", label: t("footer.links.gdpr") }
      ]
    },
{
  title: t("footer.sections.toolCategories"),
  links: [
    { href: "/tools/image-tools", label: "Image Tools" },
    { href: "/tools/pdf-tools", label: "PDF Tools" },
    { href: "/tools/calculators", label: "Calculators" },
    { href: "/tools/base64-tools", label: "Base64 Tools" },
    { href: "/tools/json-tools", label: "JSON Tools" },
    { href: "/tools/ai-tools", label: "AI Tools" }
  ]
},
{
  title: t("footer.sections.moreCategories"),
  links: [
    { href: "/tools/code-tools", label: "Code Tools" },
    { href: "/tools/conversion-tools", label: "Conversion Tools" },
    { href: "/tools/gst-tools", label: "GST Tools" },
    { href: "/tools/exam-tools", label: "Exam Tools" },
    { href: "/tools/misc-tools", label: "Miscellaneous Tools" }
  ]
}
  ]

  const socialLinks = [
    { href: "https://x.com/ToolSpy170613", icon: <X className="h-5 w-5" />, label: "X" },
    { href: "https://www.facebook.com/profile.php?id=61581409970991", icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
    { href: "https://www.linkedin.com/company/109004927", icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" }
  ]

  return (
    <footer className="py-12 px-4 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-0">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 flex flex-col">
          <Link
              href={L("/")}
              className="h-20 -mt-10"
            >
                <Image
                  src="/logo/white.webp"
                  alt="Toolspy"
                  width={1080}
                  height={1080}
                  className="w-28"
                />
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {t("footer.tagline")}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                <Shield className="w-3 h-3 mr-1" />
                {t("footer.badges.privacyFirst")}
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                <Zap className="w-3 h-3 mr-1" />
                {t("footer.badges.lightningFast")}
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                <Globe className="w-3 h-3 mr-1" />
                {t("footer.badges.universalAccess")}
              </Badge>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.isButton ? (
                      <button
                        onClick={link.onClick}
                        className="text-slate-400 hover:text-white transition-colors duration-200 text-sm text-left"
                        aria-label={link.label}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={L(link.href || "#")}
                        className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-slate-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Toolspy. {t("footer.copyright")}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{t("footer.systemsOperational")}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
              aria-label={t("footer.scrollToTop")}
            >
              <ArrowUp className="h-4 w-4" />
              <span className="sr-only">{t("footer.scrollToTop")}</span>
            </Button>
          </div>
        </div>
      </div>

      {showConsentModal && (
        <CookieConsentModal
          onClose={(updatedConsent) => {
            setShowConsentModal(false)
            if (updatedConsent) {
              // Consent was updated, page will reload or update automatically
              window.location.reload()
            }
          }}
          initialConsent={getConsentState()}
        />
      )}
    </footer>
  )
}

