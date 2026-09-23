"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Amenities", href: "#amenities" },
  { label: "Rooms", href: "#rooms" },
  { label: "Explore", href: "#attractions" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

if (siteConfig.events.offersEvents) {
  navLinks.splice(6, 0, { label: "Events", href: "#events" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", "")).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-90px 0px -55% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const waUrl = buildWhatsAppUrl();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
        scrolled ? "glass-nav py-3 shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="container-tight flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 text-decoration-none group"
          aria-label={`${siteConfig.businessName} home`}
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "/");
              setActiveSection("");
            }
          }}
        >
          {siteConfig.logo?.path && (
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={siteConfig.logo.path}
                alt={siteConfig.logo.alt}
                fill
                className="object-contain"
                sizes="36px"
                priority
              />
            </div>
          )}
          {siteConfig.logo?.showTextFallback && (
            <span
              className={`font-heading text-lg sm:text-xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-[var(--color-primary)]" : "text-white"
              }`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {siteConfig.businessName}
            </span>
          )}
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 py-1 ${
                  isActive
                    ? "text-[var(--color-accent-dark)] font-semibold"
                    : scrolled
                    ? "text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[var(--color-accent)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Actions (Desktop + Mobile) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Persistent Desktop "Book Now" CTA */}
          <Link
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn-primary !py-2 !px-4 text-xs font-semibold shadow-md items-center gap-1.5"
            aria-label="Book via WhatsApp"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            Book Now
          </Link>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-1.5 rounded-md transition-colors ${
              scrolled ? "text-[var(--color-text)]" : "text-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden glass-nav border-t border-[var(--color-border)] overflow-hidden"
          >
            <nav className="container-tight py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-medium py-3 px-3 rounded-lg transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-[var(--color-accent)]/15 text-[var(--color-accent-dark)] font-bold border-l-4 border-[var(--color-accent)]"
                        : "text-[var(--color-text)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                    )}
                  </Link>
                );
              })}
              <Link
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-3 justify-center"
                onClick={() => setMobileOpen(false)}
              >
                <WhatsAppIcon className="w-4 h-4" />
                Book via WhatsApp
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
