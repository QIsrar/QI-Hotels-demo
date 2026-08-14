"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
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
  { label: "Amenities", href: "#amenities" },
  { label: "Rooms", href: "#rooms" },
  { label: "Explore", href: "#attractions" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function FooterSection() {
  const waUrl = buildWhatsAppUrl();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" aria-label="Site footer">

      {/* ── CTA Band ──────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden py-16"
        style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, #1e3810 60%, #3d6b1f 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, var(--color-accent), transparent)" }} />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #fff, transparent)" }} />

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

      {/* ── Main Footer Body ──────────────────────────────────── */}
      <div className="bg-[#111a0c]">
        <div className="container-tight py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Col 1: Brand */}
            <div className="lg:col-span-1">
              <h2
                className="text-white text-xl font-bold mb-1"
                style={{ fontFamily: "var(--font-heading)", color: "#fff" }}
              >
                {siteConfig.businessName}
              </h2>
              <p className="text-amber-400/80 text-sm italic mb-5">
                {siteConfig.tagline}
              </p>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                A luxury mountain retreat in the Himalayan foothills of Abbottabad, Pakistan.
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

            {/* Col 2: Quick links */}
            <div>
              <h3 className="text-white/90 text-xs font-bold uppercase tracking-widest mb-6">
                Quick Links
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

            {/* Col 3: Contact */}
            <div>
              <h3 className="text-white/90 text-xs font-bold uppercase tracking-widest mb-6">
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/50 text-sm leading-relaxed">
                    {siteConfig.contact.address}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <Link
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <Link
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {siteConfig.contact.email}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Map */}
            <div>
              <h3 className="text-white/90 text-xs font-bold uppercase tracking-widest mb-6">
                Find Us
              </h3>
              <div className="rounded-xl overflow-hidden border border-white/10 h-44">
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

        {/* Bottom bar */}
        <div className="border-t border-white/5">
          <div className="container-tight py-6 pb-20 md:pb-24 flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-white/30 text-xs">
              &copy; {currentYear} {siteConfig.businessName}. All rights reserved.
            </p>
            <a
              href="https://qi-tyrix.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap box-border w-full sm:w-max max-w-[280px] sm:max-w-none mt-3 px-4 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 mx-auto"
              style={{
                border: "1px solid rgba(234, 179, 8, 0.4)",
                background: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "rgba(229, 231, 235, 0.95)",
                letterSpacing: "0.06em",
                boxShadow: "0 0 24px rgba(234, 179, 8, 0.15), 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                textShadow: "0 0 12px rgba(234, 179, 8, 0.15)",
                boxSizing: "border-box"
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
              aria-label="Visit QI Tyrix on LinkedIn"
            >
              Developed by{" "}
              <span className="font-bold">QI Tyrix</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
