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
          className="text-center mb-16 md:mb-20"
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
              className="text-[var(--color-accent-dark)] font-semibold hover:underline"
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
          <div className="bg-white rounded-xl shadow-sm border border-[var(--color-border)] overflow-hidden">
            {siteConfig.faqs.map((faq, i) => (
              <div
                key={i}
                className={`border-b border-[var(--color-border)] last:border-b-0 border-l-4 transition-all duration-200 ${
                  openIndex === i
                    ? "border-l-[var(--color-accent)] bg-amber-50/40"
                    : "border-l-transparent hover:border-l-[var(--color-accent-light)] hover:bg-stone-50/70"
                }`}
              >
                <button
                  type="button"
                  className="w-full flex justify-between items-start gap-4 px-6 sm:px-7 py-5 sm:py-6 text-left transition-colors cursor-pointer"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-trigger-${i}`}
                >
                  <div className="flex items-start gap-3.5 flex-1">
                    <HelpCircle
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-colors duration-200 ${
                        openIndex === i ? "text-[var(--color-accent)]" : "text-stone-300"
                      }`}
                    />
                    <span
                      className={`font-semibold text-base sm:text-[1.05rem] leading-snug transition-colors duration-200 ${
                        openIndex === i ? "text-[var(--color-primary)]" : "text-[var(--color-text)]"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === i
                        ? "bg-[var(--color-accent)] text-white shadow-md rotate-180"
                        : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                    }`}
                  >
                    {openIndex === i ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
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
                      transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-6 pt-1 pl-[3.25rem] sm:pl-[3.5rem] pr-6 sm:pr-8">
                        <p className="text-stone-600 leading-relaxed text-sm md:text-base">
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
