"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, CalendarDays, Users, User, Phone, MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function BookingWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const isOpen = searchParams.get("booking") === "open";
  const roomId = searchParams.get("roomId");
  
  const room = siteConfig.rooms.find(r => r.id === roomId);

  // Form State
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const [isRedirecting, setIsRedirecting] = useState(false);

  // Initialize from searchParams
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsRedirecting(false);
      
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formatDate = (d: Date) => d.toISOString().split("T")[0];

      setCheckIn(searchParams.get("checkin") || formatDate(today));
      setCheckOut(searchParams.get("checkout") || formatDate(tomorrow));
      setGuests(searchParams.get("guests") ? parseInt(searchParams.get("guests")!, 10) : 1);
    }
  }, [isOpen, searchParams]);

  const close = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("booking");
    params.delete("roomId");
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRedirecting(true);

    const message = `Hi! I'd like to book a room at ${siteConfig.businessName}.
Room: ${room?.name}
Check-in: ${checkIn} | Check-out: ${checkOut}
Guests: ${guests}
Name: ${name}
Phone: ${phone}${note ? `\nNote: ${note}` : ""}

Please confirm availability. 🙏`;

    const waUrl = buildWhatsAppUrl(message);

    setTimeout(() => {
      window.open(waUrl, "_blank");
      close();
    }, 1200);
  };

  if (!isOpen || !room) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h3 className="font-heading font-bold text-xl text-gray-900">Book {room.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Step {step} of 2 &mdash; {step === 1 ? "Stay Details" : "Contact Info"}
              </p>
            </div>
            <button
              onClick={close}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors text-gray-500"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto">
            {isRedirecting ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mb-4" />
                <h4 className="font-heading font-semibold text-lg mb-2">Redirecting you to WhatsApp...</h4>
                <p className="text-gray-500 text-sm">We'll confirm within minutes on WhatsApp.</p>
              </div>
            ) : (
              <>
                {step === 1 && (
                  <form onSubmit={handleNext} className="space-y-5">
                    <div className="space-y-4">
                      {/* Check-in */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Check-in Date</label>
                        <div className="relative">
                          <input
                            type="date"
                            required
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Check-out */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Check-out Date</label>
                        <div className="relative">
                          <input
                            type="date"
                            required
                            min={checkIn}
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Guests */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Guests</label>
                        <div className="relative">
                          <select
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all cursor-pointer"
                          >
                            {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button type="submit" className="w-full btn-primary py-3">
                        Continue to Details
                      </button>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            pattern="^[A-Za-z\s]+$"
                            title="Name should only contain letters and spaces"
                            placeholder="Abdullah Khan"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">WhatsApp Number</label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            pattern="^\d{11}$"
                            title="Phone number must be exactly 11 digits"
                            maxLength={11}
                            placeholder="03001234567"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Note */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Special Requests (Optional)</label>
                        <div className="relative">
                          <textarea
                            rows={3}
                            placeholder="Any dietary requirements or special occasions?"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="btn-outline py-3 px-4 flex items-center justify-center gap-2"
                        aria-label="Go back"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button type="submit" className="flex-1 btn-primary py-3 flex justify-center items-center gap-2">
                        <WhatsAppIcon className="w-4 h-4" />
                        Request to Book
                      </button>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-3">We'll confirm within minutes on WhatsApp.</p>
                  </form>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function BookingWizard() {
  return (
    <Suspense fallback={null}>
      <BookingWizardContent />
    </Suspense>
  );
}
