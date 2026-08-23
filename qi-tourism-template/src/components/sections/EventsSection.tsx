"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PartyPopper, Camera, Briefcase, CalendarHeart } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import Link from "next/link";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

// Icon mapping helper
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "party-popper":
      return <PartyPopper className="w-5 h-5" />;
    case "camera":
      return <Camera className="w-5 h-5" />;
    case "briefcase":
      return <Briefcase className="w-5 h-5" />;
    default:
      return <CalendarHeart className="w-5 h-5" />;
  }
};

export default function EventsSection() {
  const { events } = siteConfig;

  if (!events.offersEvents) return null;

  const handleBookEvent = () => {
    const msg = `Hi! I'm interested in booking ${siteConfig.businessName} for an event/venue. Could you share more details?`;
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  return (
    <section id="events" className="section-padding bg-white" aria-labelledby="events-heading">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-3">Host with us</p>
            <h2 id="events-heading" className="section-heading mb-6">
              Events & Private Venue
            </h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-8">
              Make your special moments unforgettable. Whether it's an intimate celebration, a corporate retreat, or a scenic photoshoot, our mountain sanctuary provides the perfect backdrop.
            </p>

            <div className="space-y-6 mb-10">
              {events.eventTypes.map((event, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] flex-shrink-0">
                    {getIcon(event.icon)}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-[var(--color-text)] mb-1">
                      {event.title}
                    </h4>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {event.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleBookEvent}
              className="btn-primary py-3 px-8 inline-flex gap-2 items-center"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Book Your Event
            </button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[450px] lg:h-[550px] w-full rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src={events.imagePath}
              alt={events.altText}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 border border-black/10 rounded-3xl pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
