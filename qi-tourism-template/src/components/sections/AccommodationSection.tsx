"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import BookingButton from "@/components/ui/BookingButton";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};

export default function AccommodationSection() {
  return (
    <section
      id="rooms"
      className="section-padding"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-labelledby="rooms-heading"
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
          <p className="section-label mb-3">Our Rooms</p>
          <h2 id="rooms-heading" className="section-heading mb-4">
            Find Your Perfect Stay
          </h2>
          <div className="divider-accent mx-auto mb-6" />
          <p className="section-subheading mx-auto text-center">
            Three thoughtfully designed spaces — each offering mountain serenity at different price points.
          </p>
        </motion.div>

        {/* Room Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-7"
        >
          {siteConfig.rooms.map((room) => (
            <motion.div
              key={room.id}
              variants={cardVariants}
              className={`room-card relative group ${room.featured ? "featured" : ""}`}
            >
              {/* Featured badge */}
              {room.featured && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-[var(--color-accent)] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  <Star className="w-3 h-3 fill-white" />
                  Most Popular
                </div>
              )}

              {/* Room image */}
              <div className="relative h-52 overflow-hidden flex-shrink-0">
                <Image
                  src={room.imagePath}
                  alt={room.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Price overlay on image */}
                <div className="absolute bottom-3 right-3">
                  <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl">
                    <span className="font-bold text-base" style={{ fontFamily: "var(--font-heading)" }}>
                      {room.price}
                    </span>
                    <span className="text-white/70 text-xs ml-1">{room.priceNote}</span>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1">
                <h3
                  className="text-[1.1rem] font-semibold text-[var(--color-text)] mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {room.name}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5 line-clamp-3">
                  {room.description}
                </p>

                {/* Amenity tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {room.amenities.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-[0.68rem] font-medium px-2.5 py-1 rounded-full bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-[var(--color-primary)]" />
                      {tag}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="text-[0.68rem] text-[var(--color-text-muted)] px-2 py-1">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>

                {/* Full-width CTA */}
                <div className="mt-auto">
                  <BookingButton
                    roomName={room.name}
                    price={room.price}
                    fullWidth
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
