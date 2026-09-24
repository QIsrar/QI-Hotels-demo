"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { motion, AnimatePresence } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site.config";

export default function WhatsAppCTA() {
  const url = buildWhatsAppUrl();
  const [isInHero, setIsInHero] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 1. Check if user is inside the Hero section
    const checkScroll = () => {
      setIsInHero(window.scrollY < 380);
      setIsModalOpen(document.body.style.overflow === "hidden");
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();

    // Periodic check for modal state (e.g. body overflow locked)
    const interval = setInterval(() => {
      setIsModalOpen(document.body.style.overflow === "hidden");
    }, 400);

    // 2. Observer for footer to avoid covering footer elements
    const footerEl = document.getElementById("contact");
    let observer: IntersectionObserver | null = null;
    if (footerEl) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsFooterVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      observer.observe(footerEl);
    }

    return () => {
      window.removeEventListener("scroll", checkScroll);
      clearInterval(interval);
      if (observer) observer.disconnect();
    };
  }, []);

  // Hidden while in the hero or when a booking modal is open
  const shouldShow = !isInHero && !isModalOpen;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="floating-wa"
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: isFooterVisible ? -24 : 0,
          }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed bottom-5 sm:bottom-6 right-4 sm:right-6 md:right-8 z-40"
        >
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Book ${siteConfig.businessName} via WhatsApp`}
            className="wa-pulse flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold text-sm rounded-full shadow-2xl transition-all duration-300 hover:scale-105 px-4 sm:px-5 py-3"
          >
            <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
            <span className="hidden sm:inline">Book via WhatsApp</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
