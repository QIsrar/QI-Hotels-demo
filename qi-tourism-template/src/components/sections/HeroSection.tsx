"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import GoogleRatingBadge from "@/components/ui/GoogleRatingBadge";

const stats = [
  { value: "3", label: "Room Types" },
  { value: "1,200m", label: "Elevation" },
  { value: "4.8★", label: "Google Rating" },
  { value: "24/7", label: "Power Backup" },
];

export default function HeroSection() {
  const waUrl = buildWhatsAppUrl();

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      aria-label="Hero section"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Background image ───────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt={`Panoramic mountain view at ${siteConfig.businessName}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
        {/* Top-to-bottom gradient — darkest at top and bottom, lighter in middle */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 38%, rgba(0,0,0,0.60) 68%, rgba(0,0,0,0.88) 100%)",
          }}
        />
        {/* Side vignettes */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.30) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.30) 100%)",
          }}
        />
      </div>

      {/* ── All content in a flex column: grows to fill viewport ── */}
      <div className="relative z-10 flex flex-col" style={{ minHeight: "100svh" }}>

        {/* Main content — vertically centered, takes all available space above stats bar */}
        <div className="flex-1 flex items-center">
          <div className="container-tight w-full py-32">
            <div className="max-w-2xl">

              {/* Google Rating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-5"
              >
                <GoogleRatingBadge />
              </motion.div>

              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-amber-300 font-semibold tracking-[0.2em] text-xs uppercase mb-4"
              >
                ✦ {siteConfig.tagline} ✦
              </motion.p>

              {/* ── HEADLINE ── fixed size, never overflow ── */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="text-white font-bold mb-5 leading-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
                  letterSpacing: "-0.01em",
                  textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                  color: "#fff"
                }}
              >
                {siteConfig.businessName}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.42 }}
                className="text-white/85 text-base md:text-lg leading-relaxed mb-8 max-w-lg"
                style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
              >
                {siteConfig.description}
              </motion.p>

              {/* CTA Row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-wrap items-center gap-4 mb-8"
              >
                <Link
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-7 py-3.5 text-sm shadow-2xl"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Book via WhatsApp
                </Link>
                <Link
                  href="#rooms"
                  className="group flex items-center gap-2 text-white/80 font-semibold text-sm hover:text-white transition-colors"
                >
                  <span className="w-6 h-px bg-white/50 group-hover:w-10 transition-all duration-300" />
                  Explore Rooms
                </Link>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.72, duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                <span className="text-white/55 text-xs">{siteConfig.contact.address}</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Stats bar — sits naturally at the very bottom ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="w-full"
        >
          <div className="container-tight">
            <div
              className="flex items-stretch divide-x divide-white/10 rounded-t-2xl overflow-hidden"
              style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(12px)" }}
            >
              {stats.map((s) => (
                <div key={s.label} className="flex-1 py-4 px-4 text-center">
                  <div
                    className="text-amber-300 font-bold text-base md:text-lg"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-white/50 text-[0.65rem] mt-0.5 uppercase tracking-wide">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute right-7 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        aria-hidden="true"
      >
        <span
          className="text-white/30 text-[0.6rem] tracking-[0.3em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-14 bg-gradient-to-b from-white/40 to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
