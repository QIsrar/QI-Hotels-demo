"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { siteConfig } from "@/config/site.config";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "star-filled fill-amber-400" : "star-empty"}`}
        />
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="section-padding bg-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-tight">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">Guest Stories</p>
          <h2 id="testimonials-heading" className="section-heading mb-4">
            What Our Guests Say
          </h2>
          <div className="divider-accent mx-auto mb-6" />
          {siteConfig.googleRating.value !== null && (
            <p className="text-[var(--color-text-muted)]">
              <span className="font-bold text-[var(--color-primary)] text-xl">
                {siteConfig.googleRating.value}★
              </span>{" "}
              average rating across{" "}
              <strong>{siteConfig.googleRating.count?.toLocaleString()}</strong> Google reviews
            </p>
          )}
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {siteConfig.testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              variants={itemVariants}
              className="testimonial-card relative"
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-5 right-5 w-8 h-8 opacity-10 text-[var(--color-primary)]"
                aria-hidden="true"
              />

              <StarRating rating={t.rating} />

              <p className="mt-4 mb-5 text-[var(--color-text)] leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <footer className="flex items-center gap-3">
                {/* Avatar initial */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }}
                  aria-hidden="true"
                >
                  {t.author.charAt(0)}
                </div>
                <div>
                  <cite className="font-semibold text-[var(--color-text)] not-italic text-sm">
                    {t.author}
                  </cite>
                  <p className="text-xs text-[var(--color-text-muted)]">{t.location}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
