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

  const handleCheckInChange = (newCheckIn: string) => {
    setCheckIn(newCheckIn);
    if (checkOut <= newCheckIn) {
      const nextDay = new Date(newCheckIn);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(formatDate(nextDay));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("checkin", checkIn);
    params.set("checkout", checkOut);
    
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
      className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto border border-white/20 mt-8 relative z-20"
    >
      <div className="flex flex-wrap gap-4 items-end">
        
        {/* Check-in */}
        <div className="w-full sm:w-[calc(50%-0.5rem)] lg:flex-1">
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 ml-1">
            Check-in
          </label>
          <div className="relative">
            <input
              type="date"
              required
              min={formatDate(today)}
              value={checkIn}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="w-full h-[54px] px-4 bg-gray-50 border border-gray-200 rounded-xl text-base focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="w-full sm:w-[calc(50%-0.5rem)] lg:flex-1">
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 ml-1">
            Check-out
          </label>
          <div className="relative">
            <input
              type="date"
              required
              min={checkIn}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full h-[54px] px-4 bg-gray-50 border border-gray-200 rounded-xl text-base focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Room Type */}
        <div className="w-full sm:w-full lg:flex-[1.2]">
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 ml-1">
            Room Type
          </label>
          <div className="relative">
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full h-[54px] px-4 bg-gray-50 border border-gray-200 rounded-xl text-base focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all cursor-pointer"
            >
              <option value="any">Any Room</option>
              {siteConfig.rooms.map(room => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="w-full lg:w-auto">
          <button
            type="submit"
            className="w-full h-[54px] px-8 text-base btn-primary whitespace-nowrap"
          >
            Check Availability
          </button>
        </div>
      </div>
    </form>
  );
}
