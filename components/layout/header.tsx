"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { siteConfig } from "@/lib/config";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<
    Set<ToolCategory>
  >(new Set());
  const [isToolsExpanded, setIsToolsExpanded] = useState(true);
  const { theme, setTheme } = useTheme();

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

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={closeMenu}
            >
              {theme === "dark" ? (
                <Image
                  src="/logo/white.webp"
                  alt="Toolspy"
                  width={1080}
                  height={1080}
                  className="w-28"
                />
              ) : (
                <Image
                  src="/logo/black.webp"
                  alt="Toolspy"
                  width={1080}
                  height={1080}
                  className="w-28"
                />
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link
                href="/about"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                About
              </Link>

              {/* Desktop Tools Dropdown */}
              <div className="relative group">
                <button className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1">
                  Tools
                  <ChevronDown className="h-3 w-3" />
                </button>

                <div className="absolute top-8 left-3/2 -translate-x-1/2 mt-2 w-[90vw] min-w-96 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4">
                    <div className="grid grid-cols-5 gap-6">
                      {(
                        Object.entries(toolCategories) as [
                          ToolCategory,
                          (typeof toolCategories)[ToolCategory]
                        ][]
                      ).map(([categoryKey, category]) => (
                        <div key={categoryKey} className="space-y-2">
                          <Link
                            href={`/tools/${categoryKey}`}
                            className="block px-3 py-2 text-sm font-medium text-primary hover:bg-accent rounded-md"
                          >
                            {category.icon} {category.name}
                          </Link>
                          <div className="ml-4 space-y-1">
                            {toolsByCategory[categoryKey]?.map((tool) => (
                              <Link
                                key={tool.id}
                                href={tool.path}
                                className={`block px-3 py-1 text-xs hover:bg-accent rounded-md transition-colors ${
                                  tool.status === "coming-soon"
                                    ? "text-muted-foreground/60 cursor-not-allowed"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                                onClick={
                                  tool.status === "coming-soon"
                                    ? (e) => e.preventDefault()
                                    : undefined
                                }
                              >
                                {tool.icon} {tool.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hidden sm:flex"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                <span className="sr-only">Toggle menu</span>
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
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-background border-l shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={closeMenu}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col h-full overflow-y-auto pb-[4.5rem]">
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {/* About Link */}
              <Link
                href="/about"
                className="block px-4 py-3 text-base font-medium transition-colors hover:text-primary hover:bg-accent rounded-lg"
                onClick={closeMenu}
              >
                About
              </Link>

              {/* Tools Section */}
              <div className="space-y-1">
                <div
                  className="flex items-center justify-between px-4 py-3 text-base font-medium cursor-pointer hover:bg-accent rounded-lg"
                  onClick={toggleTools}
                >
                  <span>Tools</span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isToolsExpanded ? "rotate-90" : ""
                    }`}
                  />
                </div>

                {/* Tool Categories */}
                {isToolsExpanded && (
                  <div className="ml-4 space-y-1">
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
                            href={`/tools/${categoryKey}`}
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
                          >
                            <ChevronRight
                              className={`h-3 w-3 transition-transform duration-200 ${
                                expandedCategories.has(categoryKey)
                                  ? "rotate-90"
                                  : ""
                              }`}
                            />
                          </Button>
                        </div>

                        {/* Category Tools */}
                        {expandedCategories.has(categoryKey) && (
                          <div className="ml-6 space-y-1 border-l border-border pl-1 mt-1">
                            {toolsByCategory[categoryKey]?.map((tool) => (
                              <Link
                                key={tool.id}
                                href={
                                  tool.status === "active" ? tool.path : "#"
                                }
                                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                                  tool.status === "coming-soon"
                                    ? "text-muted-foreground/60 cursor-not-allowed"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                }`}
                                onClick={
                                  tool.status === "coming-soon"
                                    ? (e) => e.preventDefault()
                                    : closeMenu
                                }
                              >
                                <span className="mr-2">{tool.icon}</span>
                                {tool.name}
                                {tool.status === "beta" && (
                                  <span className="ml-2 text-xs text-blue-500">
                                    (Beta)
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Link */}
              <Link
                href="/contact"
                className="block px-4 py-3 text-base font-medium transition-colors hover:text-primary hover:bg-accent rounded-lg"
                onClick={closeMenu}
              >
                Contact
              </Link>
            </div>
          </nav>

          {/* Theme Toggle at Bottom */}
          <div className="">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full justify-start text-md border-t py-6 rounded-none"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="mr-3 h-4 w-4" />
                  Switch to Light Mode
                </>
              ) : (
                <>
                  <Moon className="mr-3 h-4 w-4" />
                  Switch to Dark Mode
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
