"use client";
import { BookOpen, Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Quran", href: "/quran" },
    { name: "Hadith", href: "/hadith" },
    { name: "Contact", href: "/contact" },
    { name: "❤️ Dedicate", href: "/dedicate" },
  ];

  if (!mounted) return null;

  return (
    <header
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300",
        scrolled
          ? theme === "dark"
            ? "bg-gray-950/95 backdrop-blur-md border-b border-gray-800"
            : "bg-white/95 backdrop-blur-md border-b border-gray-200"
          : "bg-white dark:bg-gray-950 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Q&A With
              </span>
              <span className="text-white bg-emerald-600 dark:bg-emerald-700 rounded-full py-1 px-2 text-sm font-bold">
                AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  theme === "dark"
                    ? "text-gray-300 hover:text-emerald-400"
                    : "text-gray-700 hover:text-emerald-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={cn(
                "rounded-full hover:bg-gray-200 dark:hover:bg-gray-800",
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              )}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Link href="/">
              <Button
                variant="default"
                className="hidden md:flex bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white dark:text-gray-50"
              >
                Ask Question
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden ml-[-10px] rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-black dark:text-gray-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 " />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          className={cn(
            "md:hidden",
            theme === "dark" ? "bg-gray-900 " : "bg-white"
          )}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  theme === "dark"
                    ? "text-gray-200 hover:bg-gray-800 hover:text-emerald-400"
                    : "text-gray-800 hover:bg-gray-100 hover:text-emerald-600"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/" className="block">
              <Button
                variant="default"
                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white"
              >
                Ask Question
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
