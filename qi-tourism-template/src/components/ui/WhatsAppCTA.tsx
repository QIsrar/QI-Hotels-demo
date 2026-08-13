"use client";

import Link from "next/link";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { motion } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site.config";

export default function WhatsAppCTA() {
  const url = buildWhatsAppUrl();

  return (
    <motion.div
      className="fixed bottom-6 right-5 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1.5 }}
    >
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Book ${siteConfig.businessName} via WhatsApp`}
        className="wa-pulse flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold text-sm rounded-full shadow-2xl transition-colors duration-200"
        style={{
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
          paddingLeft: "1.125rem",
          paddingRight: "1.375rem",
        }}
      >
        <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
        <span className="hide-on-mobile">Book via WhatsApp</span>
      </Link>
    </motion.div>
  );
}
