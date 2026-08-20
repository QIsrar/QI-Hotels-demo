"use client";

import { useState, useEffect } from "react";
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          className="flex items-center gap-2 text-decoration-none"
          aria-label={`${siteConfig.businessName} home`}
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "/");
            }
          }}
        >
          <span
            className={`font-heading text-xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-[var(--color-primary)]" : "text-white"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {siteConfig.businessName}
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-[var(--color-accent)] ${
                scrolled ? "text-[var(--color-text-muted)]" : "text-white/85"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Header Actions (Desktop + Mobile) */}
        <div className="flex items-center gap-2 sm:gap-4">
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[var(--color-text)] font-medium py-3 px-3 rounded-lg hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
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
