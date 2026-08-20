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
      id="about"
      className="section-padding bg-white overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="container-tight">
        {/* Section header — centered top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/55 to-transparent" />

              {/* Stat chip badges — inside the image, bottom overlay */}
              <div className="absolute bottom-5 left-5 right-5 z-10 flex gap-2 flex-wrap">
                {story.highlights.map((h) => {
                  const Icon = iconMap[h.icon] ?? Star;
                  return (
                    <div
                      key={h.label}
                      className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-md border border-white/60"
                    >
                      <Icon className="w-3 h-3 text-amber-600 flex-shrink-0" />
                      <span className="text-[0.68rem] font-semibold text-gray-800 whitespace-nowrap">{h.label}</span>
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
              "
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
