"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ExternalLink, MapPin, Search } from "lucide-react";
import { siteConfig } from "@/config/site.config";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function AttractionsSection() {
  return (
    <section
      id="attractions"
      className="section-padding bg-white"
      aria-labelledby="attractions-heading"
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
          <p className="section-label mb-3">Explore the Region</p>
          <h2 id="attractions-heading" className="section-heading mb-4">
            What&apos;s Nearby
          </h2>
          <div className="divider-accent mx-auto mb-6" />
          <p className="section-subheading mx-auto text-center">
            Step outside and discover some of Pakistan&apos;s most breathtaking landscapes — all within easy reach.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {siteConfig.attractions.map((attraction) => {
            // Google search URL — opens a Maps/search for this place in Pakistan
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(attraction.name + " Pakistan")}`;
            const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(attraction.name + " Pakistan")}`;

            return (
              <motion.article
                key={attraction.name}
                variants={cardVariants}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image with name overlay */}
                <div className="relative h-52 overflow-hidden flex-shrink-0">
                  <Image
                    src={attraction.imagePath}
                    alt={attraction.altText}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Full gradient for readability */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.72) 100%)",
                    }}
                  />

                  {/* Travel time — top left */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20"
                      style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(6px)" }}>
                      <Clock className="w-3 h-3 text-amber-300" />
                      {attraction.travelTime}
                    </span>
                  </div>

                  {/* Place name — bottom of image, always visible */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4">
                    <h3
                      className="text-white font-bold text-base leading-tight"
                      style={{
                        fontFamily: "var(--font-heading)",
                        textShadow: "0 1px 8px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)",
                        color: "#fff"
                      }}
                    >
                      {attraction.name}
                    </h3>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
                    {attraction.description}
                  </p>

                  {/* Explore links */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-white rounded-lg py-2.5 transition-all duration-200 hover:opacity-90 hover:shadow-md"
                      style={{ background: "var(--color-primary)" }}
                      aria-label={`View ${attraction.name} on Google Maps`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      Maps
                    </a>
                    <a
                      href={googleSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold rounded-lg py-2.5 border border-gray-200 text-gray-500 bg-transparent transition-all duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
                      aria-label={`Search ${attraction.name} on Google`}
                    >
                      <Search className="w-3.5 h-3.5" />
                      Search
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
