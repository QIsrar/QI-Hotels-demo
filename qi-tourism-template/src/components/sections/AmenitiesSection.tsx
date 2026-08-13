"use client";

import { motion } from "framer-motion";
import {
  Zap, Flame, Car, Utensils, Wifi, Shield,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";

const iconMap: Record<string, React.ElementType> = {
  zap: Zap,
  flame: Flame,
  car: Car,
  utensils: Utensils,
  wifi: Wifi,
  shield: Shield,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function AmenitiesSection() {
  return (
    <section
      id="amenities"
      className="section-padding"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-labelledby="amenities-heading"
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
          <p className="section-label mb-3">What We Offer</p>
          <h2 id="amenities-heading" className="section-heading mb-4">
            Everything You Need
          </h2>
          <div className="divider-accent mx-auto mb-6" />
          <p className="section-subheading mx-auto text-center">
            Built for Pakistani mountain travel — we&apos;ve thought of every essential so you can focus on the experience.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-5"
        >
          {siteConfig.amenities.map((amenity) => {
            const Icon = iconMap[amenity.iconKey] ?? Zap;
            return (
              <motion.div
                key={amenity.label}
                variants={itemVariants}
                className="amenity-card"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(45, 80, 22, 0.08)" }}
                >
                  <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <h3
                  className="font-semibold text-[var(--color-text)] mb-2 text-sm md:text-base"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {amenity.label}
                </h3>
                <p className="text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {amenity.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
