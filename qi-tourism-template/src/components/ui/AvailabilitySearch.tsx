"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site.config";

export default function AvailabilitySearch() {
  const router = useRouter();

  // Today and Tomorrow logic for default dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [checkIn, setCheckIn] = useState(formatDate(today));
  const [checkOut, setCheckOut] = useState(formatDate(tomorrow));
  const [roomType, setRoomType] = useState("any");

  const parseLocalDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const maxDate = new Date(today);
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateStr = formatDate(maxDate);

  const minCheckOut = (() => {
    if (!checkIn) return formatDate(tomorrow);
    const d = parseLocalDate(checkIn);
    d.setDate(d.getDate() + 1);
    return formatDate(d);
  })();

  const handleCheckInChange = (newCheckIn: string) => {
    setCheckIn(newCheckIn);
    if (checkOut <= newCheckIn) {
      const nextDay = parseLocalDate(newCheckIn);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(formatDate(nextDay));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let effectiveCheckOut = checkOut;
    if (checkOut <= checkIn) {
      const nextDay = parseLocalDate(checkIn);
      nextDay.setDate(nextDay.getDate() + 1);
      effectiveCheckOut = formatDate(nextDay);
      setCheckOut(effectiveCheckOut);
    }

    const params = new URLSearchParams();
    params.set("checkin", checkIn);
    params.set("checkout", effectiveCheckOut);

    if (roomType !== "any") {
      params.set("roomId", roomType);
      params.set("booking", "open");
      router.push(`/?${params.toString()}`);
    } else {
      router.push(`/?${params.toString()}#rooms`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-7 md:p-8 max-w-4xl mx-auto border border-white/60 mt-8 relative z-20"
      aria-label="Search Room Availability"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-end">

        {/* Check-in */}
        <div className="w-full">
          <label htmlFor="search-checkin" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 ml-1 cursor-pointer">
            Check-in
          </label>
          <div className="relative">
            <input
              id="search-checkin"
              type="date"
              required
              min={formatDate(today)}
              max={maxDateStr}
              value={checkIn}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="w-full h-[54px] px-4 bg-white/95 border border-stone-200 rounded-xl text-base text-stone-900 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="w-full">
          <label htmlFor="search-checkout" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 ml-1 cursor-pointer">
            Check-out
          </label>
          <div className="relative">
            <input
              id="search-checkout"
              type="date"
              required
              min={minCheckOut}
              max={maxDateStr}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full h-[54px] px-4 bg-white/95 border border-stone-200 rounded-xl text-base text-stone-900 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Room Type */}
        <div className="w-full">
          <label htmlFor="search-roomtype" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 ml-1 cursor-pointer">
            Room Type
          </label>
          <div className="relative">
            <select
              id="search-roomtype"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full h-[54px] px-4 bg-white/95 border border-stone-200 rounded-xl text-base text-stone-900 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all cursor-pointer shadow-sm"
            >
              <option value="any">Any Room</option>
              {siteConfig.rooms.map(room => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="w-full">
          <button
            type="submit"
            className="w-full h-[54px] px-6 text-base font-semibold btn-primary flex items-center justify-center shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
          >
            Check Availability
          </button>
        </div>
      </div>
    </form>
  );
}
