"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/* Brand SVG icons */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const footerNavLinks = [
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Amenities", href: "#amenities" },
  { label: "Rooms", href: "#rooms" },
  { label: "Explore", href: "#attractions" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

if (siteConfig.events.offersEvents) {
  footerNavLinks.splice(6, 0, { label: "Events", href: "#events" });
}

export default function FooterSection() {
  const waUrl = buildWhatsAppUrl();
  const currentYear = new Date().getFullYear();

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newsletterEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      setNewsletterError("Please enter a valid email address.");
      return;
    }

    setNewsletterError("");
    setNewsletterSuccess(true);
    setNewsletterEmail("");

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      setNewsletterSuccess(false);
    }, 4500);
  };

  return (
    <footer id="contact" aria-label="Site footer">

      {/* ── CTA Band with Seamless Gradient Transition into Dark Footer ── */}
      <div
        className="relative overflow-hidden py-20 sm:py-24"
        style={{
          background: "linear-gradient(180deg, var(--color-primary) 0%, #1e3810 50%, #15250d 80%, #111a0c 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, var(--color-accent), transparent)" }} />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #fff, transparent)" }} />

        {/* Soft bottom blend to dark footer */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111a0c] to-transparent pointer-events-none" />

        <div className="container-tight relative z-10 text-center">
          <p className="text-amber-300 font-semibold tracking-widest text-xs uppercase mb-4">
            Ready to Escape?
          </p>
          <h2
            className="text-white text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "#fff" }}
          >
            Book Your Mountain Retreat Today
          </h2>
          <p className="text-white/70 text-base mb-8 max-w-lg mx-auto">
            Spots fill fast during peak season. Message us on WhatsApp for instant availability and personalised packages.
          </p>
          <Link
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap box-border w-full sm:w-max max-w-[280px] sm:max-w-none gap-2.5 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-bold text-sm sm:text-base px-4 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-green-900/30 mx-auto"
          >
            <WhatsAppIcon className="w-5 h-5" />
            WhatsApp Us Now
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

      {/* ── Main Footer Body (Balanced 12-Column Grid) ─────────── */}
      <div className="bg-[#111a0c]">
        <div className="container-tight pt-20 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

            {/* Col 1: Brand (4 cols) */}
            <div className="lg:col-span-4">
              <h2
                className="text-white text-xl font-bold mb-1"
                style={{ fontFamily: "var(--font-heading)", color: "#fff" }}
              >
                {siteConfig.businessName}
              </h2>
              <p className="text-amber-400/80 text-sm italic mb-4">
                {siteConfig.tagline}
              </p>
              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
                A luxury mountain retreat nestled in the serene pine forests of Abbottabad. Escape the city and rediscover tranquility.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                {siteConfig.social.instagram && (
                  <Link
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-amber-400/50 hover:bg-white/5 transition-all duration-200"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </Link>
                )}
                {siteConfig.social.facebook && (
                  <Link
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-amber-400/50 hover:bg-white/5 transition-all duration-200"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </Link>
                )}
                <Link
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#25D366]/50 hover:bg-white/5 transition-all duration-200"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Col 2: Quick links (2 cols) */}
            <div className="lg:col-span-2">
              <h3 className="text-white/90 text-xs font-bold uppercase tracking-widest mb-6">
                Navigation
              </h3>
              <ul className="space-y-3">
                {footerNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/45 text-sm hover:text-amber-300 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-3 h-px bg-white/20 group-hover:w-4 group-hover:bg-amber-300 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Contact & Newsletter (3 cols) */}
            <div className="lg:col-span-3">
              <h3 className="text-white/90 text-xs font-bold uppercase tracking-widest mb-6">
                Contact & Inquiries
              </h3>
              <ul className="space-y-3.5 mb-6">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/50 text-xs sm:text-sm leading-relaxed">
                    {siteConfig.contact.address}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <Link
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-white/50 text-xs sm:text-sm hover:text-white transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <Link
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-white/50 text-xs sm:text-sm hover:text-white transition-colors"
                  >
                    {siteConfig.contact.email}
                  </Link>
                </li>
              </ul>

              {/* Newsletter Signup (Inline, non-blocking confirmation) */}
              <div className="pt-5 border-t border-white/10 mt-6">
                <h4 className="text-white/80 text-[0.7rem] font-semibold uppercase tracking-wider mb-2">
                  Stay Updated
                </h4>
                <p className="text-white/60 text-xs mb-3.5 leading-relaxed">
                  Get seasonal retreat deals and mountain weather alerts.
                </p>
                <AnimatePresence mode="wait">
                  {newsletterSuccess ? (
                    <motion.div
                      key="newsletter-success"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Thanks — you&apos;re on the list!</span>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="newsletter-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleNewsletterSubmit}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="email"
                          value={newsletterEmail}
                          onChange={(e) => {
                            setNewsletterEmail(e.target.value);
                            if (newsletterError) setNewsletterError("");
                          }}
                          placeholder="Your email address"
                          required
                          aria-label="Email address for newsletter"
                          className="flex-1 min-w-0 h-10 px-3.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                        />
                        <button
                          type="submit"
                          className="flex-shrink-0 h-10 px-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap shadow-md cursor-pointer"
                        >
                          Join
                        </button>
                      </div>
                      {newsletterError && (
                        <p className="text-rose-400 text-[0.7rem] pl-1 font-medium">{newsletterError}</p>
                      )}
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Col 4: Find Us / Map (3 cols) */}
            <div className="lg:col-span-3">
              <h3 className="text-white/90 text-xs font-bold uppercase tracking-widest mb-6">
                Find Us
              </h3>
              <div className="rounded-xl overflow-hidden border border-white/10 h-52 relative z-10 shadow-lg">
                <iframe
                  title={`${siteConfig.businessName} on Google Maps`}
                  src={siteConfig.contact.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar (Separated Agency Badge) ────────────────── */}
        <div className="border-t border-white/5">
          <div className="container-tight py-8 pb-24 flex flex-col items-center justify-center text-center">
            <p className="text-white/40 text-xs sm:text-sm">
              &copy; {currentYear} {siteConfig.businessName}. All rights reserved.
            </p>
            {siteConfig.showAgencyCredit && (
              <div className="pt-4 mt-3 border-t border-white/5 w-full flex justify-center">
                <a
                  href="https://qi-tyrix.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap box-border w-auto px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 hover:scale-105"
                  style={{
                    border: "1px solid rgba(234, 179, 8, 0.4)",
                    background: "rgba(255, 255, 255, 0.06)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: "rgba(229, 231, 235, 0.95)",
                    letterSpacing: "0.06em",
                    boxShadow: "0 0 24px rgba(234, 179, 8, 0.15), 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(255, 255, 255, 0.12)";
                    el.style.borderColor = "rgba(234, 179, 8, 0.7)";
                    el.style.boxShadow = "0 0 36px rgba(234, 179, 8, 0.25), 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(255, 255, 255, 0.06)";
                    el.style.borderColor = "rgba(234, 179, 8, 0.4)";
                    el.style.boxShadow = "0 0 24px rgba(234, 179, 8, 0.15), 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)";
                  }}
                  aria-label="Visit QI Tyrix agency website"
                >
                  Developed by&nbsp;<span className="font-bold text-amber-300">QI Tyrix</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
