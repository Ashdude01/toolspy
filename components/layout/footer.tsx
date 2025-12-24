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
  Facebook,
  RedoDotIcon,
  Instagram
} from "lucide-react"
import Link from "next/link"
import { CookieConsentModal } from "@/components/consent/cookie-consent-modal"
import { getConsentState } from "@/lib/utils/consent"

export function Footer() {
  const [showConsentModal, setShowConsentModal] = useState(false)

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
      title: "Popular Tools",
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
      title: "Company",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/help", label: "Help Center" },
        { href: "/feedback", label: "Feedback" },
        { label: "Manage Cookies", onClick: handleManageCookies, isButton: true }
      ]
    },
{
  title: "Tool Categories",
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
  title: "More Categories",
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
    { href: "https://www.linkedin.com/company/109004927", icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
    { href: "#", icon: <Instagram className="h-5 w-5" />, label: "Instagram" }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Toolspy</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Professional online tools for all your digital needs. Free, secure, and privacy-focused. 
              Trusted by millions of users worldwide.
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
                Privacy First
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                <Zap className="w-3 h-3 mr-1" />
                Lightning Fast
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                <Globe className="w-3 h-3 mr-1" />
                Universal Access
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
                        href={link.href || "#"} 
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
              © 2024 Toolspy. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
              <span className="sr-only">Scroll to top</span>
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

