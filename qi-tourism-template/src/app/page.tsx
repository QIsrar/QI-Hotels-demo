import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import AccommodationSection from "@/components/sections/AccommodationSection";
import AttractionsSection from "@/components/sections/AttractionsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import FooterSection from "@/components/sections/FooterSection";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";

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

        {/* 3. Essential Amenities — icon grid */}
        <AmenitiesSection />

        {/* 4. Accommodation — room cards with booking buttons */}
        <AccommodationSection />

        {/* 5. Nearby Attractions — regional points of interest */}
        <AttractionsSection />

        {/* 6. Testimonials — guest reviews */}
        <TestimonialsSection />

        {/* 7. FAQs — animated accordion */}
        <FAQSection />
      </main>

      {/* 8. Footer — contact, map, social links */}
      <FooterSection />

      {/* Floating sticky WhatsApp CTA (all viewports) */}
      <WhatsAppCTA />
    </>
  );
}
