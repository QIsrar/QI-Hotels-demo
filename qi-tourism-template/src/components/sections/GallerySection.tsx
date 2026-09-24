"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { siteConfig } from "@/config/site.config";

/* ── Masonry span pattern ────────────────────────────────── */
// Alternates tall/wide to create visual variety in the grid.
// Index maps: 0=tall, 1=wide, 2=normal, 3=normal, 4=wide, 5=tall, 6=normal, 7=wide
const spanPattern = [
  "gallery-item-wide",   // 1
  "",                    // 2
  "gallery-item-tall",   // 3
  "",                    // 4
  "gallery-item-tall",   // 5
  "",                    // 6
  "gallery-item-wide",   // 7
  "",                    // 8
];

export default function GallerySection() {
  const { gallery, galleryCategories } = siteConfig;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredGallery = activeCategory === "All" 
    ? gallery 
    : gallery.filter(item => item.category === activeCategory);

  const isOpen = lightboxIndex !== null;

  /* ── Keyboard navigation ───────────────────────────────── */
  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredGallery.length : null
    );
  }, [filteredGallery.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredGallery.length) % filteredGallery.length : null
    );
  }, [filteredGallery.length]);

  const close = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, goNext, goPrev]);

  /* ── Touch swipe handling ──────────────────────────────── */
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX - touchEndX;

    // Minimum swipe distance of 50px
    if (distance > 50) {
      goNext();
    } else if (distance < -50) {
      goPrev();
    }
    setTouchStartX(null);
  };

  return (
    <>
      <section
        id="gallery"
        className="section-padding bg-white overflow-hidden"
        aria-labelledby="gallery-heading"
      >
        <div className="container-tight">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <p className="section-label mb-3">Visual Tour</p>
            <h2 id="gallery-heading" className="section-heading mb-4">
              Moments at the Retreat
            </h2>
            <div className="divider-accent mx-auto mb-6" />
            <p className="section-subheading mx-auto text-center">
              A glimpse of the experience that awaits — from sunrise on the
              balcony to BBQ evenings under the stars.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-24 md:mb-32"
          >
            {galleryCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 md:px-8 py-3 rounded-full text-sm md:text-base font-semibold whitespace-nowrap transition-all border-2 ${
                  activeCategory === cat
                    ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="gallery-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item, i) => (
                <motion.button
                  key={item.imagePath}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`gallery-item ${spanPattern[i % spanPattern.length] || ""}`}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View photo: ${item.altText}`}
                >
                <Image
                  src={item.imagePath}
                  alt={item.altText}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="gallery-item-overlay">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </motion.button>
            ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox Overlay ─────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && lightboxIndex !== null && filteredGallery[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lightbox-overlay touch-pan-y"
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
          >
            {/* Image container — stops click propagation */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="lightbox-image-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredGallery[lightboxIndex].imagePath}
                alt={filteredGallery[lightboxIndex].altText}
                fill
                sizes="95vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Caption */}
            <div className="lightbox-caption" onClick={(e) => e.stopPropagation()}>
              <p className="text-white/80 text-sm text-center">
                {filteredGallery[lightboxIndex].altText}
              </p>
              <p className="text-white/40 text-xs text-center mt-1">
                {lightboxIndex + 1} / {filteredGallery.length}
              </p>
            </div>

            {/* Close button — top right, large touch target */}
            <button
              onClick={close}
              className="lightbox-close"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation arrows — positioned outside image on desktop, overlaid on mobile with large touch targets */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="lightbox-arrow lightbox-arrow-left"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="lightbox-arrow lightbox-arrow-right"
              aria-label="Next photo"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
