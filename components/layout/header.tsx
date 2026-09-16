"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useT, useLocale } from "@/lib/i18n/use-t";
import { localizeHref } from "@/lib/i18n/localize-href";
import {
  toolCategories,
  getToolsByCategory,
  type ToolCategory,
} from "@/lib/tools-data";
import Image from "next/image";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isDesktopExtensionsOpen, setIsDesktopExtensionsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<
    Set<ToolCategory>
  >(new Set());
  const [isToolsExpanded, setIsToolsExpanded] = useState(true);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useT();
  const locale = useLocale();
  // Locale-aware internal link: /de/ pe routable links ko /de/<slug> banata hai,
  // baaki English hi rehte hain (localizeHref 404 kabhi nahi banata).
  const L = (href: string) => localizeHref(locale, href);

  // Ensure we're mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme toggle between dark and light only (dark default)
  const cycleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };


  const getThemeLabel = () => {
    if (!mounted) return t("header.toggleTheme");
    return resolvedTheme === "dark" ? t("header.switchToLight") : t("header.switchToDark");
  };

  // Get tools by category
  const toolsByCategory = getToolsByCategory();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const toggleCategory = (category: ToolCategory) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleTools = () => {
    setIsToolsExpanded(!isToolsExpanded);
    // When tools section is closed, collapse all categories
    if (isToolsExpanded) {
      setExpandedCategories(new Set());
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedCategories(new Set());
  };

  const closeDesktopDropdown = () => {
    setIsDesktopDropdownOpen(false);
  };

  const closeDesktopExtensions = () => {
    setIsDesktopExtensionsOpen(false);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        closeDesktopDropdown();
        closeDesktopExtensions();
      }
    };

    if (isMenuOpen || isDesktopDropdownOpen || isDesktopExtensionsOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    
    if (isMenuOpen) {
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isDesktopDropdownOpen, isDesktopExtensionsOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href={L("/")}
              className="flex items-center space-x-2"
              onClick={closeMenu}
            >
                <Image
                  src="/logo/black.webp"
                  alt="Toolspy"
                  width={1080}
                  height={1080}
                  className="w-28 block dark:hidden"
                />
                <Image
                  src="/logo/white.webp"
                  alt="Toolspy"
                  width={1080}
                  height={1080}
                  className="w-28 hidden dark:block"
                />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link
                href={L("/about")}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {t("nav.about")}
              </Link>

               {/* Desktop Extensions Dropdown */}
               <div
                className="relative"
                onMouseEnter={() => setIsDesktopExtensionsOpen(true)}
                onMouseLeave={() => setIsDesktopExtensionsOpen(false)}
              >
                <button
                  className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
                  aria-expanded={isDesktopExtensionsOpen}
                  aria-haspopup="true"
                  aria-label="Extensions menu"
                >
                  {t("nav.extensions")}
                  <ChevronDown className="h-3 w-3" />
                </button>

                <div
                  className={`absolute top-8 left-1/2 -translate-x-1/2 mt-2 w-80 bg-background border rounded-lg shadow-lg transition-all duration-200 z-50 ${
                    isDesktopExtensionsOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                  role="menu"
                  aria-label="Extensions menu"
                >
                  <div className="p-2">
                    <Link
                      href="/extensions/image-compressor"
                      className="block px-3 py-2 text-sm hover:bg-accent rounded-md"
                      onClick={closeDesktopExtensions}
                    >
                      Image Compressor
                    </Link>
                    <Link
                      href="/extensions/facebook-photo-downloader"
                      className="block px-3 py-2 text-sm hover:bg-accent rounded-md"
                      onClick={closeDesktopExtensions}
                    >
                      Facebook Photo Downloader
                    </Link>
                    <Link
                      href="/extensions/image-downloader"
                      className="block px-3 py-2 text-sm hover:bg-accent rounded-md"
                      onClick={closeDesktopExtensions}
                    >
                      Image Downloader
                    </Link>
                  </div>
                </div>
              </div>

              {/* Desktop Tools Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsDesktopDropdownOpen(true)}
                onMouseLeave={() => setIsDesktopDropdownOpen(false)}
              >
                <button 
                  className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
                  aria-expanded={isDesktopDropdownOpen}
                  aria-haspopup="true"
                  aria-label="Tools menu"
                >
                  {t("nav.tools")}
                  <ChevronDown className="h-3 w-3" />
                </button>

                <div 
                  className={`absolute top-8 -left-3/2 -translate-x-1/2 mt-2 w-[90vw] min-w-96 bg-background border rounded-lg shadow-lg transition-all duration-200 z-50 ${
                    isDesktopDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  role="menu"
                  aria-label="Tools menu"
                >
                  <div className="p-4 !pb-24 overflow-y-auto h-[90vh]">
                    <div className="grid grid-cols-5 gap-6">
                      {(
                        Object.entries(toolCategories) as [
                          ToolCategory,
                          (typeof toolCategories)[ToolCategory]
                        ][]
                      ).map(([categoryKey, category]) => (
                        <div key={categoryKey} className="space-y-2">
                          <Link
                            href={L(`/tools/${categoryKey}`)}
                            className="block px-3 py-2 text-sm font-medium text-primary hover:bg-accent rounded-md"
                            onClick={closeDesktopDropdown}
                          >
                            {category.icon} {category.name}
                          </Link>
                          <div className="ml-4 space-y-1">
                            {toolsByCategory[categoryKey]?.map((tool) =>
                              tool.status === "coming-soon" ? (
                                // No href="#" for coming-soon tools - dead links hurt
                                // crawl budget and UX. Render a plain span instead.
                                <span
                                  key={tool.id}
                                  className="block px-3 py-1 text-xs rounded-md text-muted-foreground/60 cursor-not-allowed"
                                  title={t("common.comingSoon")}
                                >
                                  {tool.icon} {tool.name}
                                </span>
                              ) : (
                                <Link
                                  key={tool.id}
                                  href={L(tool.path)}
                                  className="block px-3 py-1 text-xs hover:bg-accent rounded-md transition-colors text-foreground hover:text-foreground"
                                  onClick={closeDesktopDropdown}
                                >
                                  {tool.icon} {tool.name}
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href={L("/careers")}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {t("nav.careers")}
              </Link>

              <Link
                href={L("/contact")}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {t("nav.contact")}
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Language Switcher — tab dikhta hai jab pehla locale PUBLISHED ho */}
              <LanguageSwitcher />
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={cycleTheme}
                className="hidden sm:flex"
                aria-label={getThemeLabel()}
                title={getThemeLabel()}
              >
                <Moon className="h-4 w-4 text-yellow-300 hidden dark:block" />
                <Sun className="h-4 w-4 text-amber-600 block dark:hidden" />
                <span className="sr-only">{getThemeLabel()}</span>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? t("header.closeMenu") : t("header.openMenu")}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <div className="relative w-5 h-5">
                  <span
                    className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 ease-in-out ${
                      isMenuOpen ? "rotate-45 top-2" : "top-0.5"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 ease-in-out top-2 ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 ease-in-out ${
                      isMenuOpen ? "-rotate-45 top-2" : "top-3.5"
                    }`}
                  />
                </div>
                <span className="sr-only">{isMenuOpen ? t("header.closeMenu") : t("header.openMenu")}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Sliding Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-background border-l shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 id="mobile-menu-title" className="text-lg font-semibold">{t("header.menu")}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeMenu}
            aria-label={t("header.closeMenu")}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">{t("header.closeMenu")}</span>
          </Button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col h-full overflow-y-auto pb-[4.5rem]">
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {/* About Link */}
              <Link
                href={L("/about")}
                className="block px-4 py-3 text-base font-medium transition-colors hover:text-primary hover:bg-accent rounded-lg"
                onClick={closeMenu}
              >
                {t("nav.about")}
              </Link>
              

              {/* Tools Section */}
              <div className="space-y-1">
                <button
                  className="flex items-center justify-between px-4 py-3 text-base font-medium cursor-pointer hover:bg-accent rounded-lg w-full text-left"
                  onClick={toggleTools}
                  aria-expanded={isToolsExpanded}
                  aria-controls="mobile-tools-list"
                >
                  <span>{t("nav.tools")}</span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isToolsExpanded ? "rotate-90" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* Tool Categories */}
                {isToolsExpanded && (
                  <div id="mobile-tools-list" className="ml-4 space-y-1">
                    {(
                      Object.entries(toolCategories) as [
                        ToolCategory,
                        (typeof toolCategories)[ToolCategory]
                      ][]
                    ).map(([categoryKey, category]) => (
                      <div key={categoryKey}>
                        {/* Category Header */}
                        <div className="flex items-center justify-between">
                          <Link
                            href={L(`/tools/${categoryKey}`)}
                            className="flex-1 px-4 py-2 text-sm font-medium text-primary hover:bg-accent rounded-lg"
                            onClick={closeMenu}
                          >
                            <span className="mr-2">{category.icon}</span>
                            {category.name}
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toggleCategory(categoryKey)}
                            aria-expanded={expandedCategories.has(categoryKey)}
                            aria-label={`${expandedCategories.has(categoryKey) ? 'Collapse' : 'Expand'} ${category.name} tools`}
                          >
                            <ChevronRight
                              className={`h-3 w-3 transition-transform duration-200 ${
                                expandedCategories.has(categoryKey)
                                  ? "rotate-90"
                                  : ""
                              }`}
                              aria-hidden="true"
                            />
                          </Button>
                        </div>

                        {/* Category Tools */}
                        {expandedCategories.has(categoryKey) && (
                          <div className="ml-6 space-y-1 border-l border-border pl-1 mt-1">
                            {toolsByCategory[categoryKey]?.map((tool) =>
                              tool.status === "coming-soon" ? (
                                // No href="#" for coming-soon tools - render a span.
                                <span
                                  key={tool.id}
                                  className="block px-3 py-2 text-sm rounded-md text-muted-foreground/60 cursor-not-allowed"
                                  title={t("common.comingSoon")}
                                >
                                  <span className="mr-2">{tool.icon}</span>
                                  {tool.name}
                                </span>
                              ) : (
                                <Link
                                  key={tool.id}
                                  href={L(tool.path)}
                                  className="block px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent"
                                  onClick={closeMenu}
                                >
                                  <span className="mr-2">{tool.icon}</span>
                                  {tool.name}
                                  {tool.status === "beta" && (
                                    <span className="ml-2 text-xs text-blue-500">
                                      ({t("common.beta")})
                                    </span>
                                  )}
                                </Link>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Extensions Links */}
              <div className="space-y-1">
                <div className="block px-4 py-3 text-base font-medium rounded-lg">
                  {t("nav.extensions")}
                </div>
                <div className="ml-6 space-y-1 border-l border-border pl-1 -mt-1">
                  <Link
                    href="/extensions/image-compressor"
                    className="block px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent"
                    onClick={closeMenu}
                  >
                    Image Compressor
                  </Link>
                  <Link
                    href="/extensions/facebook-photo-downloader"
                    className="block px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent"
                    onClick={closeMenu}
                  >
                    Facebook Photo Downloader
                  </Link>
                  <Link
                    href="/extensions/image-downloader"
                    className="block px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent"
                    onClick={closeMenu}
                  >
                    Image Downloader
                  </Link>
                </div>
              </div>

              <Link
                href={L("/blog")}
                className="block px-4 py-3 text-base font-medium transition-colors hover:text-primary hover:bg-accent rounded-lg"
                onClick={closeMenu}
              >
                {t("nav.blog")}
              </Link>

              <Link
                href={L("/digital-marketing")}
                className="block px-4 py-3 text-base font-medium transition-colors hover:text-primary hover:bg-accent rounded-lg"
                onClick={closeMenu}
              >
                {t("nav.digitalMarketing")}
              </Link>

              {/* Careers Link */}
              <Link
                href={L("/careers")}
                className="block px-4 py-3 text-base font-medium transition-colors hover:text-primary hover:bg-accent rounded-lg"
                onClick={closeMenu}
              >
                {t("nav.careers")}
              </Link>

              {/* Contact Link */}
              <Link
                href={L("/contact")}
                className="block px-4 py-3 text-base font-medium transition-colors hover:text-primary hover:bg-accent rounded-lg"
                onClick={closeMenu}
              >
                {t("nav.contact")}
              </Link>
            </div>
          </nav>

          {/* Theme Toggle at Bottom */}
          <div className="">
            <Button
              variant="secondary"
              size="lg"
              onClick={cycleTheme}
              className="w-full justify-start text-md border-t py-6 rounded-none"
            >
              <span className="mr-3">
              <Moon className="h-4 w-4 text-yellow-300 hidden dark:block" />
              <Sun className="h-4 w-4 text-amber-600 block dark:hidden" /></span>
              {getThemeLabel()}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
