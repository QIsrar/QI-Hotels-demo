"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mountain, TreePine, Heart, Star } from "lucide-react";
import { siteConfig } from "@/config/site.config";

const iconMap: Record<string, React.ElementType> = {
  mountain: Mountain,
  trees: TreePine,
  heart: Heart,
  star: Star,
};

export default function StorySection() {
  const { story } = siteConfig;

  return (
    <section
      id="story"
      className="section-padding bg-white overflow-hidden relative"
      aria-labelledby="about-heading"
    >
      <span id="about" className="sr-only" />
      <div className="container-tight">
        {/* Section header — centered top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="section-label mb-3">{story.subheading}</p>
          <h2
            id="about-heading"
            className="section-heading mb-5"
          >
            {story.heading}
          </h2>
          <div className="divider-accent mx-auto" />
        </motion.div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Main image */}
            {/* Main image — chips are INSIDE this container */}
            <div className="relative h-[460px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={story.imagePath}
                alt={story.altText}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                loading="lazy"
              />
              {/* Gradient at bottom for chip readability */}
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

              {/* Stat chip badges — standardized 2x2 grid */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-10 grid grid-cols-2 gap-2.5 sm:gap-3">
                {story.highlights.map((h) => {
                  const Icon = iconMap[h.icon] ?? Star;
                  return (
                    <div
                      key={h.label}
                      className="h-11 sm:h-12 flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3 sm:px-4 rounded-xl shadow-lg border border-white/80 transition-all hover:bg-white"
                    >
                      <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                      <span className="text-xs font-semibold text-stone-800 truncate leading-tight">
                        {h.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Decorative quote mark */}
            <div
              className="text-9xl leading-none text-amber-100 select-none mb-2"
              style={{ fontFamily: "Georgia, serif", lineHeight: 0.8 }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <div className="space-y-5 mb-10">
              {story.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className={`leading-relaxed text-base md:text-[1.0625rem] ${
                    i === 0
                      ? "text-gray-800 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-100 mb-8" />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "5+", label: "Years Hosting" },
                { value: "500+", label: "Happy Guests" },
                { value: "4.8★", label: "Avg Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-2xl font-bold text-[var(--color-primary)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
