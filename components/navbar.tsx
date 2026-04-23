"use client";

import { useState, useEffect } from "react";
import { Phone, Wrench, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_LINKS, BUSINESS } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-navy-900/95 backdrop-blur-md border-b border-navy-800 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
            aria-label="Go to homepage"
          >
            <div className="relative h-10 w-10 mr-2 flex-shrink-0">
              <div className="absolute inset-0 bg-gold-500 rounded-full flex items-center justify-center">
                <Settings className="h-6 w-6 text-navy-900 absolute" />
                <Wrench className="h-5 w-5 text-navy-900 absolute transform rotate-45" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gold-500 leading-none font-oswald">
                ASSEMBLY LINE
              </span>
              <span className="text-sm font-medium text-gold-300 leading-none font-oswald">
                AUTO REPAIR
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-zinc-300 hover:text-gold-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded px-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Button
              className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold shadow-lg shadow-gold-500/20"
              onClick={() => scrollTo("#contact")}
            >
              <Phone size={16} className="mr-2" aria-hidden="true" />
              Book Service
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-zinc-300 hover:text-gold-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded p-1"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-900/98 backdrop-blur-md border-t border-navy-800">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left text-base font-medium text-zinc-300 hover:text-gold-400 hover:bg-navy-800 transition-colors px-3 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-navy-800 mt-2">
              <Button
                className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold"
                onClick={() => scrollTo("#contact")}
              >
                <Phone size={16} className="mr-2" aria-hidden="true" />
                Book Service
              </Button>
            </div>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="text-center text-sm text-zinc-400 hover:text-gold-400 transition-colors py-2"
            >
              {BUSINESS.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
