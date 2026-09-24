"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Star, X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
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

function AccommodationSectionContent() {
  const searchParams = useSearchParams();
  const searchGuests = searchParams.get("guests") ? parseInt(searchParams.get("guests") as string, 10) : 1;

  // Lightbox state for room images
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeRoom = activeRoomId ? siteConfig.rooms.find(r => r.id === activeRoomId) : null;
  const isLightboxOpen = activeRoom !== null && lightboxIndex !== null;

  /* ── Lightbox Navigation ───────────────────────────────── */
  const close = useCallback(() => {
    setActiveRoomId(null);
    setLightboxIndex(null);
  }, []);

  const goNext = useCallback(() => {
    if (!activeRoom || lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % activeRoom.images.length);
  }, [activeRoom, lightboxIndex]);

  const goPrev = useCallback(() => {
    if (!activeRoom || lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + activeRoom.images.length) % activeRoom.images.length);
  }, [activeRoom, lightboxIndex]);

  useEffect(() => {
    if (!isLightboxOpen) return;
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
  }, [isLightboxOpen, close, goNext, goPrev]);

  /* ── Touch swipe handling ──────────────────────────────── */
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX - touchEndX;
    if (distance > 50) goNext();
    else if (distance < -50) goPrev();
    setTouchStartX(null);
  };

  return (
    <>
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
            className="text-center mb-16 md:mb-20"
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
            {siteConfig.rooms.map((room) => {
              const isNotSuitable = searchGuests > room.maxGuests;
              
              return (
                <motion.div
                  key={room.id}
                  variants={cardVariants}
                  className={`room-card relative group ${room.featured ? "featured" : ""}`}
                >
                  {/* Featured badge */}
                  {room.featured && !isNotSuitable && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-[var(--color-accent)] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                      <Star className="w-3.5 h-3.5 fill-white flex-shrink-0" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  {/* Guest capacity badge */}
                  <div className={`absolute top-4 ${room.featured && !isNotSuitable ? "right-4" : "left-4"} z-10 flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg whitespace-nowrap ${
                    isNotSuitable
                      ? "bg-gray-800 text-white"
                      : "bg-white/95 backdrop-blur-sm text-gray-700 border border-gray-200/80"
                  }`}>
                    {isNotSuitable ? `Max ${room.maxGuests} Guests` : `Up to ${room.maxGuests} Guests`}
                  </div>

                  {/* Room image */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`View photos of ${room.name}`}
                    className="relative h-52 overflow-hidden flex-shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                    onClick={() => { setActiveRoomId(room.id); setLightboxIndex(0); }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveRoomId(room.id);
                        setLightboxIndex(0);
                      }
                    }}
                  >
                    <Image
                      src={room.images[0].path}
                      alt={room.images[0].altText}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Price overlay on image */}
                    <div className="absolute bottom-3 right-3">
                      <div className="bg-black/70 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-xl flex items-baseline">
                        <span className="font-bold text-base" style={{ fontFamily: "var(--font-heading)" }}>
                          {room.price}
                        </span>
                        <span className="text-white/80 text-xs ml-1.5 font-normal">
                          {" "}/ {room.priceNote}
                        </span>
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

                    {/* Action buttons */}
                    <div className="mt-auto flex items-center gap-3">
                      <div className="flex-[1.5]">
                        <BookingButton
                          roomId={room.id}
                          roomName={room.name}
                          price={room.price}
                          fullWidth
                        />
                      </div>
                      <div className="flex-1">
                        <button
                          onClick={() => { setActiveRoomId(room.id); setLightboxIndex(0); }}
                          className="w-full btn-outline py-3 text-[0.8rem] flex justify-center items-center gap-1.5"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          Photos
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox Overlay ─────────────────────────────────── */}
      <AnimatePresence>
        {isLightboxOpen && activeRoom && lightboxIndex !== null && (
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
            aria-label={`${activeRoom.name} photo lightbox`}
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
                src={activeRoom.images[lightboxIndex].path}
                alt={activeRoom.images[lightboxIndex].altText}
                fill
                sizes="95vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Caption */}
            <div className="lightbox-caption" onClick={(e) => e.stopPropagation()}>
              <p className="text-white/80 text-sm text-center">
                {activeRoom.images[lightboxIndex].altText}
              </p>
              <p className="text-white/40 text-xs text-center mt-1">
                {lightboxIndex + 1} / {activeRoom.images.length}
              </p>
            </div>

            <button
              onClick={close}
              className="lightbox-close"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="lightbox-arrow lightbox-arrow-left"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
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

export default function AccommodationSection() {
  return (
    <Suspense fallback={<div className="h-96 w-full flex items-center justify-center bg-[var(--color-bg)]">Loading rooms...</div>}>
      <AccommodationSectionContent />
    </Suspense>
  );
}
