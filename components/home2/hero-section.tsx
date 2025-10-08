"use client";

import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TypewriterText } from "@/components/ui/typewriter-text";
import {
  Search,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Star,
  Users,
  Clock,
  CheckCircle,
  Download,
  Smartphone,
  Laptop,
  Sparkles,
  TrendingUp,
  Heart,
  Award,
  Target,
  Settings,
  Lock,
  Play,
  ArrowDown,
  Filter,
  Sparkle,
} from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function HeroSection({ onSearch, searchQuery }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Dynamic words for typewriter effect
  const typewriterWords = [
    "Image Files",
    "PDF Docs",
    "Base64 Data",
    "Calculations",
    "Conversions",
    "JSON Data",
    "Code Snippets",
    "AI Content",
  ];

  const stats = [
    {
      label: "Professional Tools",
      value: "70+",
      icon: <Target className="h-5 w-5" />,
    },
    {
      label: "Max File Size",
      value: "100MB",
      icon: <Download className="h-5 w-5" />,
    },
    { label: "Free Forever", value: "∞", icon: <Heart className="h-5 w-5" /> },
    {
      label: "Private & Secure",
      value: "100%",
      icon: <Shield className="h-5 w-5" />,
    },
  ];

  return (
    
  );
}
