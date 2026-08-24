"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeft,
  CalendarDays,
  Users,
  User,
  Phone,
  MessageSquare,
  Star,
  CheckCircle2,
  Sparkles,
  BedDouble,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import Image from "next/image";

// ── Helpers ────────────────────────────────────────────────────────────────
const toLocalDateStr = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const formatDisplayDate = (dateStr: string) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-PK", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getNights = (checkIn: string, checkOut: string) => {
  if (!checkIn || !checkOut) return 0;
  const [y1, m1, d1] = checkIn.split("-").map(Number);
  const [y2, m2, d2] = checkOut.split("-").map(Number);
  const diff =
    new Date(y2, m2 - 1, d2).getTime() - new Date(y1, m1 - 1, d1).getTime();
  return Math.max(0, Math.round(diff / 86400000));
};

const inputClasses =
  "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent)]/20";

// ── Step Progress Bar ──────────────────────────────────────────────────────
function StepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center w-full">
      {[1, 2].map((s, idx) => (
        <div key={s} className="flex items-center flex-1">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
              step > s
                ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white"
                : step === s
                ? "bg-white border-[var(--color-accent)] text-[var(--color-accent)]"
                : "bg-white border-gray-200 text-gray-400"
            }`}
          >
            {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
          </div>
          {idx < 1 && (
            <div className="flex-1 h-0.5 mx-1">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  step > 1 ? "bg-[var(--color-accent)]" : "bg-gray-200"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Room Summary Pane (desktop left column) ────────────────────────────────
function RoomPane({
  room,
  checkIn,
  checkOut,
}: {
  room: (typeof siteConfig.rooms)[number];
  checkIn: string;
  checkOut: string;
}) {
  const nights = getNights(checkIn, checkOut);
  const priceNum = parseInt(room.price.replace(/[^\d]/g, ""), 10);
  const total = nights > 0 ? priceNum * nights : priceNum;

  return (
    <div className="hidden md:flex flex-col h-full bg-gradient-to-b from-[var(--color-primary)] to-[#1a3009] text-white overflow-hidden">
      {/* Room image */}
      <div className="relative h-52 flex-shrink-0 overflow-hidden">
        <Image
          src={room.images[0].path}
          alt={room.images[0].altText}
          fill
          className="object-cover opacity-80"
          sizes="320px"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-primary)]" />
        {room.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-[var(--color-accent)] text-white text-xs font-bold px-2 py-1 rounded-full">
            <Sparkles className="w-3 h-3" />
            Featured
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-6 gap-4 overflow-y-auto">
        <div>
          <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">
            Selected Room
          </p>
          <h3 className="font-heading text-xl font-bold leading-tight">
            {room.name}
          </h3>
          <div className="flex items-center gap-1 mt-1.5 text-white/70 text-sm">
            <Users className="w-3.5 h-3.5" />
            <span>Up to {room.maxGuests} guests</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-1.5">
          {room.amenities.slice(0, 5).map((a) => (
            <div key={a} className="flex items-center gap-2 text-sm text-white/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-accent)] flex-shrink-0" />
              {a}
            </div>
          ))}
        </div>

        <div className="border-t border-white/10" />

        {/* Price summary */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center text-white/70">
            <span>Price per night</span>
            <span className="font-semibold text-white">{room.price}</span>
          </div>
          {nights > 0 && (
            <>
              <div className="flex justify-between items-center text-white/70">
                <span>Nights</span>
                <span className="font-semibold text-white">{nights}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between items-center">
                <span className="font-semibold">Est. Total</span>
                <span className="font-bold text-[var(--color-accent)] text-base">
                  PKR {total.toLocaleString()}
                </span>
              </div>
            </>
          )}
          {checkIn && checkOut && (
            <div className="bg-white/10 rounded-xl p-3 space-y-1.5 mt-1">
              <div className="flex items-center gap-2 text-white/80 text-xs">
                <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{formatDisplayDate(checkIn)}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-xs">
                <CalendarDays className="w-3.5 h-3.5 flex-shrink-0 opacity-0" />
                <span>→ {formatDisplayDate(checkOut)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Star rating */}
        {siteConfig.googleRating.value && (
          <div className="flex items-center gap-1.5 text-sm text-white/70 mt-auto pt-2">
            <Star className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
            <span>
              {siteConfig.googleRating.value} · {siteConfig.googleRating.count} Reviews
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Mobile Room Header ─────────────────────────────────────────────────────
function MobileRoomHeader({
  room,
  checkIn,
  checkOut,
}: {
  room: (typeof siteConfig.rooms)[number];
  checkIn: string;
  checkOut: string;
}) {
  const nights = getNights(checkIn, checkOut);

  return (
    <div className="md:hidden relative h-36 overflow-hidden flex-shrink-0">
      <Image
        src={room.images[0].path}
        alt={room.images[0].altText}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-end p-4">
        <div>
          <p className="text-white/70 text-xs uppercase tracking-wider font-semibold mb-0.5">
            Booking
          </p>
          <h3 className="font-heading text-lg font-bold text-white leading-tight">
            {room.name}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-white/80 text-xs">
            <span>{room.price} / night</span>
            {nights > 0 && (
              <span>
                · {nights} {nights === 1 ? "night" : "nights"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Reusable Input Field ───────────────────────────────────────────────────
function InputField({
  label,
  icon: Icon,
  hint,
  isTextarea,
  children,
}: {
  label: string;
  icon: React.ElementType;
  hint?: string;
  isTextarea?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative">
        {/* Icon — for textarea, place at top; for single-line, vertically centre */}
        <div
          className={`absolute left-3.5 text-gray-400 pointer-events-none z-10 ${
            isTextarea ? "top-3.5" : "top-1/2 -translate-y-1/2"
          }`}
        >
          <Icon className="w-4 h-4" />
        </div>
        {children}
      </div>
      {hint && <p className="text-xs text-gray-400 mt-1.5 ml-1">{hint}</p>}
    </div>
  );
}

// ── Main Wizard Content ────────────────────────────────────────────────────
function BookingWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get("booking") === "open";
  const roomId = searchParams.get("roomId");
  const room = siteConfig.rooms.find((r) => r.id === roomId);

  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const today = new Date();
  const todayStr = toLocalDateStr(today);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsRedirecting(false);
      setName("");
      setPhone("");
      setNote("");

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = toLocalDateStr(tomorrow);

      const rawIn = searchParams.get("checkin") || todayStr;
      const rawOut = searchParams.get("checkout") || tomorrowStr;
      const safeIn = rawIn < todayStr ? todayStr : rawIn;
      const safeOut = rawOut <= safeIn ? tomorrowStr : rawOut;

      setCheckIn(safeIn);
      setCheckOut(safeOut);
      setGuests(
        searchParams.get("guests")
          ? parseInt(searchParams.get("guests")!, 10)
          : 1
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const nights = getNights(checkIn, checkOut);
    const message =
      `Hi! I'd like to book a room at ${siteConfig.businessName}.\n\n` +
      `🏨 Room: ${room?.name}\n` +
      `📅 Check-in: ${formatDisplayDate(checkIn)}\n` +
      `📅 Check-out: ${formatDisplayDate(checkOut)}\n` +
      `🌙 Nights: ${nights}\n` +
      `👤 Guests: ${guests}\n` +
      `📛 Name: ${name}\n` +
      `📞 Phone: ${phone}` +
      (note ? `\n📝 Note: ${note}` : "") +
      `\n\nPlease confirm availability. 🙏`;

    const waUrl = buildWhatsAppUrl(message);
    setTimeout(() => {
      window.open(waUrl, "_blank");
      close();
    }, 1400);
  };

  const minCheckOut = (() => {
    if (!checkIn) return todayStr;
    const d = new Date(checkIn + "T00:00:00");
    d.setDate(d.getDate() + 1);
    return toLocalDateStr(d);
  })();

  const nights = getNights(checkIn, checkOut);

  if (!isOpen || !room) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="booking-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
        style={{ background: "rgba(0,0,0,0.65)" }}
        onClick={close}
      >
        <motion.div
          key="booking-modal"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Left pane (desktop) ── */}
          {/* Ensure the wrapper has the bottom-most gradient color (#1a3009) so it seamlessly blends if content is taller */}
          <div className="md:w-72 lg:w-80 flex-shrink-0 flex flex-col bg-[#1a3009]">
            <RoomPane room={room} checkIn={checkIn} checkOut={checkOut} />
          </div>

          {/* ── Right pane ── */}
          <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
            {/* Mobile banner */}
            <MobileRoomHeader room={room} checkIn={checkIn} checkOut={checkOut} />

            {/* Form header */}
            <div className="px-5 sm:px-7 pt-6 pb-4 border-b border-gray-100 flex items-start justify-between gap-4 flex-shrink-0">
              <div className="flex-1">
                <div className="mb-3">
                  <StepBar step={step} />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-lg">
                  {step === 1 ? "Select Your Dates" : "Your Details"}
                </h3>
                <p className="text-gray-500 text-sm mt-0.5">
                  {step === 1
                    ? "When would you like to stay?"
                    : "Almost there! Tell us a bit about yourself."}
                </p>
              </div>
              <button
                onClick={close}
                className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500 mt-0.5"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form body */}
            <div className="px-5 sm:px-7 py-6 flex-1">
              {isRedirecting ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-[var(--color-accent)]/20 border-t-[var(--color-accent)] rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <WhatsAppIcon className="w-7 h-7 text-[#25D366]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-gray-900 text-lg mb-1">
                      Opening WhatsApp…
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Your booking request is ready. We'll confirm within minutes.
                    </p>
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.form
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleNext}
                      className="space-y-5"
                    >
                      {/* Check-in */}
                      <InputField label="Check-in Date" icon={CalendarDays}>
                        <input
                          type="date"
                          required
                          min={todayStr}
                          value={checkIn}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCheckIn(val);
                            if (checkOut <= val) {
                              const d = new Date(val + "T00:00:00");
                              d.setDate(d.getDate() + 1);
                              setCheckOut(toLocalDateStr(d));
                            }
                          }}
                          className={inputClasses}
                        />
                      </InputField>

                      {/* Check-out */}
                      <InputField label="Check-out Date" icon={CalendarDays}>
                        <input
                          type="date"
                          required
                          min={minCheckOut}
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className={inputClasses}
                        />
                      </InputField>

                      {/* Guests */}
                      <InputField label="Number of Guests" icon={Users}>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className={`${inputClasses} cursor-pointer appearance-none`}
                        >
                          {Array.from(
                            { length: room.maxGuests },
                            (_, i) => i + 1
                          ).map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                      </InputField>

                      {/* Live price strip */}
                      {nights > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3"
                        >
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <BedDouble className="w-4 h-4 text-amber-600" />
                            <span>
                              {nights} {nights === 1 ? "night" : "nights"} ·{" "}
                              {guests} {guests === 1 ? "guest" : "guests"}
                            </span>
                          </div>
                          <span className="text-sm font-bold text-[var(--color-primary)]">
                            Est. PKR{" "}
                            {(
                              parseInt(room.price.replace(/[^\d]/g, ""), 10) *
                              nights
                            ).toLocaleString()}
                          </span>
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        className="w-full btn-primary py-3.5 text-base font-semibold"
                      >
                        Continue →
                      </button>
                    </motion.form>
                  )}

                  {step === 2 && (
                    <motion.form
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* Booking summary recap */}
                      <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between text-sm border border-gray-200">
                        <div className="flex items-center gap-2 text-gray-600">
                          <CalendarDays className="w-4 h-4 text-gray-400" />
                          <span>
                            {formatDisplayDate(checkIn)} →{" "}
                            {formatDisplayDate(checkOut)}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-[var(--color-accent)] text-xs font-semibold hover:underline"
                        >
                          Edit
                        </button>
                      </div>

                      {/* Name */}
                      <InputField
                        label="Full Name"
                        icon={User}
                        hint="Letters only (e.g. Abdullah Khan)"
                      >
                        <input
                          type="text"
                          required
                          pattern="^[A-Za-z\s]+$"
                          title="Name should only contain letters and spaces"
                          placeholder="Abdullah Khan"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={inputClasses}
                        />
                      </InputField>

                      {/* Phone */}
                      <InputField
                        label="WhatsApp Number"
                        icon={Phone}
                        hint="11-digit Pakistani number, e.g. 03001234567"
                      >
                        <input
                          type="tel"
                          required
                          pattern="^\d{11}$"
                          title="Phone number must be exactly 11 digits"
                          maxLength={11}
                          placeholder="03001234567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={inputClasses}
                        />
                      </InputField>

                      {/* Special requests */}
                      <InputField
                        label="Special Requests (Optional)"
                        icon={MessageSquare}
                        isTextarea
                      >
                        <textarea
                          rows={3}
                          placeholder="Dietary requirements, celebration setups, early check-in…"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          className={`${inputClasses} resize-none`}
                        />
                      </InputField>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="btn-outline py-3.5 px-5 flex items-center justify-center gap-1.5 flex-shrink-0"
                          aria-label="Go back"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 btn-primary py-3.5 flex justify-center items-center gap-2 text-base font-semibold"
                        >
                          <WhatsAppIcon className="w-5 h-5" />
                          Request to Book
                        </button>
                      </div>

                      <p className="text-center text-xs text-gray-400">
                        We'll send your request via WhatsApp and confirm within
                        minutes.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
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
