import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import GallerySection from "@/components/sections/GallerySection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import AccommodationSection from "@/components/sections/AccommodationSection";
import AttractionsSection from "@/components/sections/AttractionsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import EventsSection from "@/components/sections/EventsSection";
import FooterSection from "@/components/sections/FooterSection";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import BookingWizard from "@/components/ui/BookingWizard";

const Separator = () => (
  <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent my-4" />
);

export default function Home() {
  return (
    <>
      {/* Fixed navigation */}
      <Navbar />

      <main id="main-content">
        {/* 1. Hero — full-viewport background, headline, rating badge, CTA */}
        <HeroSection />

        {/* 2. Story / About — property history & host philosophy */}
        <StorySection />
        <Separator />

        {/* 3. Photo Gallery — masonry grid with lightbox */}
        <GallerySection />
        <Separator />

        {/* 4. Essential Amenities — icon grid */}
        <AmenitiesSection />
        <Separator />

        {/* 5. Accommodation — room cards with booking buttons */}
        <AccommodationSection />
        <Separator />

        {/* 6. Nearby Attractions — regional points of interest */}
        <AttractionsSection />
        <Separator />

        {/* 7. Testimonials — guest reviews */}
        <TestimonialsSection />
        <Separator />

        {/* 8. FAQs — animated accordion */}
        <FAQSection />
        <Separator />

        {/* 9. Events — hosted gatherings */}
        <EventsSection />

        {/* 10. Booking Wizard — reservation flow */}
        <BookingWizard />
      </main>

      {/* 11. Footer — contact, map, social links */}
      <FooterSection />

      {/* Floating sticky WhatsApp CTA (all viewports) */}
      <WhatsAppCTA />
    </>
  );
}
