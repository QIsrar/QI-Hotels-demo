"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { motion } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site.config";

export default function WhatsAppCTA() {
  const url = buildWhatsAppUrl();
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footerEl = document.getElementById("contact");
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="fixed z-50 transition-all duration-300 ease-out"
      style={{
        bottom: isFooterVisible ? "5.5rem" : undefined,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: isFooterVisible ? -16 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1.5 }}
    >
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 md:right-8">
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Book ${siteConfig.businessName} via WhatsApp`}
          className="wa-pulse flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold text-sm rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
          style={{
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            paddingLeft: "1.125rem",
            paddingRight: "1.375rem",
            transform: isFooterVisible ? "translateY(-4.5rem)" : "translateY(0)",
            transition: "transform 0.3s ease-out, background-color 0.2s ease",
          }}
        >
          <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
          <span className="hide-on-mobile">Book via WhatsApp</span>
        </Link>
      </div>
    </motion.div>
  );
}
