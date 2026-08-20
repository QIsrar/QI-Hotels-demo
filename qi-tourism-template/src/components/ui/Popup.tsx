"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const waUrl = buildWhatsAppUrl();

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("qi_popup_shown")) return;
    const timer = setTimeout(() => {
      setIsOpen(true);
      if (typeof window !== "undefined") sessionStorage.setItem("qi_popup_shown", "1");
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
              Special Offer!
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Book directly with us via WhatsApp to get an exclusive 10% discount on your stay.
            </p>
            
            <Link
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
              onClick={() => setIsOpen(false)}
            >
              <WhatsAppIcon className="w-5 h-5" />
              Claim Offer on WhatsApp
            </Link>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
