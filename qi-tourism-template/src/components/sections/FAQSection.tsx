"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const waUrl = buildWhatsAppUrl("Hi! I have a quick question about Pine Crest Retreat.");

  return (
    <section
      id="faq"
      className="section-padding"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-labelledby="faq-heading"
    >
      <div className="container-tight">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">Got Questions?</p>
          <h2 id="faq-heading" className="section-heading mb-4">
            Frequently Asked Questions
          </h2>
          <div className="divider-accent mx-auto mb-6" />
          <p className="section-subheading mx-auto text-center">
            Everything you need to know before booking. Can&apos;t find your answer?{" "}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] font-semibold hover:underline"
            >
              WhatsApp us
            </a>{" "}
            — we reply within minutes.
          </p>
        </motion.div>

        {/* FAQ accordion — full width, clean layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
            {siteConfig.faqs.map((faq, i) => (
              <div
                key={i}
                className={`border-b border-[var(--color-border)] last:border-b-0 ${
                  openIndex === i ? "bg-amber-50/50" : ""
                } transition-colors duration-200`}
              >
                <button
                  className="w-full flex justify-between items-start gap-4 px-6 py-5 text-left hover:bg-amber-50/30 transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-trigger-${i}`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <HelpCircle
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-colors ${
                        openIndex === i ? "text-[var(--color-accent)]" : "text-gray-300"
                      }`}
                    />
                    <span
                      className={`font-medium text-base leading-snug transition-colors ${
                        openIndex === i ? "text-[var(--color-primary)]" : "text-[var(--color-text)]"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      openIndex === i
                        ? "bg-[var(--color-accent)] text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {openIndex === i ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pl-[3.25rem]">
                        <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <p className="text-gray-400 text-sm mb-4">Still have questions?</p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Ask Us on WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
