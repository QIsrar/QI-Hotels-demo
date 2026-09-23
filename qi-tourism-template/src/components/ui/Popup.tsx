"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const waUrl = buildWhatsAppUrl("Hi! I saw the direct booking offer on your website and would like to claim the 10% discount.");

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("qi_popup_shown")) return;

    const triggerPopup = () => {
      setIsOpen(true);
      sessionStorage.setItem("qi_popup_shown", "1");
    };

    // 1. Time-based trigger: 8 seconds
    const timer = setTimeout(triggerPopup, 8000);

    // 2. Scroll-depth trigger: 35% of page height
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0 && window.scrollY / scrollHeight > 0.35) {
        triggerPopup();
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(timer);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Escape key to dismiss
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors"
              aria-label="Close offer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-dark)] bg-amber-50 px-3 py-1 rounded-full mb-3 border border-amber-200/60">
              Limited Time Direct Offer
            </span>

            <h3 id="promo-title" className="font-heading text-2xl font-bold text-gray-900 mb-3">
              Special Mountain Getaway!
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
              Book directly with us via WhatsApp to get an exclusive <strong>10% discount</strong> on your retreat stay.
            </p>
            
            <Link
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center py-3.5 text-base font-semibold shadow-lg"
              onClick={close}
            >
              <WhatsAppIcon className="w-5 h-5" />
              Claim 10% Off on WhatsApp
            </Link>
            
            <p className="text-xs text-gray-400 mt-4">
              Click anywhere outside or press Esc to close
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
