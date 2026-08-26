"use client";

import { useState, Suspense } from "react";
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
  CheckCircle2,
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

const inputClasses = "wizard-input";

// ── Step Progress Bar ──────────────────────────────────────────────────────
function StepBar({ step, setStep }: { step: number; setStep: (s: number) => void }) {
  return (
    <div className="flex items-center w-full">
      {[1, 2].map((s, idx) => (
        <div key={s} className="flex items-center flex-1">
          <button
            type="button"
            onClick={() => setStep(s)}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 cursor-pointer ${
              step > s
                ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)]"
                : step === s
                ? "bg-white border-[var(--color-accent)] text-[var(--color-accent)]"
                : "bg-white border-gray-200 text-gray-400 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            }`}
          >
            {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
          </button>
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

// ── Compact Room Header (always shown at top of modal) ─────────────────────
function RoomHeader({
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
    <div className="relative overflow-hidden flex-shrink-0" style={{ minHeight: '140px' }}>
      {/* Background image with overlay */}
      <div className="relative" style={{ height: '140px' }}>
        <Image
          src={room.images[0].path}
          alt={room.images[0].altText}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 560px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        {/* Room info overlay */}
        <div className="absolute inset-0 flex items-center px-5 sm:px-7">
          <div className="flex-1 min-w-0">
            <p className="text-white/60 text-[0.65rem] uppercase tracking-widest font-semibold mb-0.5">
              Selected Room
            </p>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white leading-tight truncate">
              {room.name}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 text-white/80 text-xs flex-wrap">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                Up to {room.maxGuests} guests
              </span>
              <span className="font-semibold text-white">
                {room.price}
                <span className="text-white/60 font-normal ml-1">/night</span>
              </span>
            </div>
          </div>

          {/* Price summary (right side) */}
          {nights > 0 && (
            <div className="flex-shrink-0 text-right ml-4 hidden sm:block">
              <p className="text-white/50 text-[0.65rem] uppercase tracking-wider font-semibold">
                {nights} {nights === 1 ? "night" : "nights"}
              </p>
              <p className="text-[var(--color-accent)] font-bold text-lg font-heading leading-tight">
                PKR {total.toLocaleString()}
              </p>
            </div>
          )}
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
      <label style={{
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: 700,
        color: '#374151',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
        marginBottom: '0.5rem',
      }}>
        {label}
      </label>
      <div className="relative">
        {/* Icon — for textarea, place at top; for single-line, vertically centre */}
        <div
          style={{
            position: 'absolute',
            left: '0.875rem',
            ...(isTextarea
              ? { top: '0.875rem' }
              : { top: '50%', transform: 'translateY(-50%)' }),
            color: '#9ca3af',
            pointerEvents: 'none' as const,
            zIndex: 10,
          }}
        >
          <Icon className="w-4 h-4" />
        </div>
        {children}
      </div>
      {hint && <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.375rem', marginLeft: '0.25rem' }}>{hint}</p>}
    </div>
  );
}

// ── Main Wizard Content ────────────────────────────────────────────────────
interface BookingWizardModalProps {
  room: (typeof siteConfig.rooms)[number];
  close: () => void;
  initialCheckIn: string;
  initialCheckOut: string;
  initialGuests: number;
}

function BookingWizardModal({
  room,
  close,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
}: BookingWizardModalProps) {
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const todayStr = toLocalDateStr(new Date());

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
      `Room: ${room?.name}\n` +
      `Check-in: ${formatDisplayDate(checkIn)}\n` +
      `Check-out: ${formatDisplayDate(checkOut)}\n` +
      `Nights: ${nights}\n` +
      `Guests: ${guests}\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}` +
      (note ? `\nNote: ${note}` : "") +
      `\n\nPlease confirm availability. Thank you!`;

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


  return (
    <AnimatePresence>
      <motion.div
        key="booking-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
        onClick={close}
      >
        <motion.div
          key="booking-modal"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Compact Room Header (always visible) ── */}
          <RoomHeader room={room} checkIn={checkIn} checkOut={checkOut} />

          {/* ── Form section ── */}
          <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
            {/* Form header */}
            <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-gray-100 flex items-start justify-between gap-4 flex-shrink-0">
              <div className="flex-1">
                <div className="mb-3">
                  <StepBar step={step} setStep={setStep} />
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
            <div className="px-6 sm:px-8 py-7 flex-1">
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
                      Your booking request is ready. We&apos;ll confirm within minutes.
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
                      className="space-y-6"
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
                          className={inputClasses}
                          style={{ cursor: 'pointer' }}
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
                      className="space-y-6"
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
                        We&apos;ll send your request via WhatsApp and confirm within
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

function BookingWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get("booking") === "open";
  const roomId = searchParams.get("roomId");
  const room = siteConfig.rooms.find((r) => r.id === roomId);

  const close = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("booking");
    params.delete("roomId");
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  if (!isOpen || !room) return null;

  const today = new Date();
  const todayStr = toLocalDateStr(today);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = toLocalDateStr(tomorrow);

  const rawIn = searchParams.get("checkin") || todayStr;
  const rawOut = searchParams.get("checkout") || tomorrowStr;
  const safeIn = rawIn < todayStr ? todayStr : rawIn;
  const safeOut = rawOut <= safeIn ? tomorrowStr : rawOut;
  const initialGuests = searchParams.get("guests")
    ? Math.min(parseInt(searchParams.get("guests")!, 10), room.maxGuests)
    : 1;

  return (
    <BookingWizardModal
      key={`${room.id}-${safeIn}-${safeOut}`}
      room={room}
      close={close}
      initialCheckIn={safeIn}
      initialCheckOut={safeOut}
      initialGuests={initialGuests}
    />
  );
}

export default function BookingWizard() {
  return (
    <Suspense fallback={null}>
      <BookingWizardContent />
    </Suspense>
  );
}
