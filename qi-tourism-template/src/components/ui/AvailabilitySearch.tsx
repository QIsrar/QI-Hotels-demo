"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site.config";

export default function AvailabilitySearch() {
  const router = useRouter();
  
  // Today and Tomorrow logic for default dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(formatDate(today));
  const [checkOut, setCheckOut] = useState(formatDate(tomorrow));
  const [guests, setGuests] = useState(1);
  const [roomType, setRoomType] = useState("any");

  // Automatically adjust checkout if it's earlier than checkin
  useEffect(() => {
    if (checkOut < checkIn) {
      const newCheckOut = new Date(checkIn);
      newCheckOut.setDate(newCheckOut.getDate() + 1);
      setCheckOut(formatDate(newCheckOut));
    }
  }, [checkIn, checkOut]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("checkin", checkIn);
    params.set("checkout", checkOut);
    params.set("guests", guests.toString());
    
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
      className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 md:p-5 max-w-4xl mx-auto border border-white/20 mt-8 relative z-20"
    >
      <div className="flex flex-col md:flex-row items-end gap-4">
        
        {/* Check-in */}
        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 ml-1">
            Check-in
          </label>
          <div className="relative">
            <input
              type="date"
              required
              min={formatDate(today)}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 ml-1">
            Check-out
          </label>
          <div className="relative">
            <input
              type="date"
              required
              min={checkIn}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="flex-[0.7] w-full">
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 ml-1">
            Guests
          </label>
          <div className="relative">
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Room Type */}
        <div className="flex-[1.2] w-full">
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 ml-1">
            Room Type
          </label>
          <div className="relative">
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all cursor-pointer"
            >
              <option value="any">Any Room</option>
              {siteConfig.rooms.map(room => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="w-full md:w-auto mt-2 md:mt-0">
          <button
            type="submit"
            className="w-full md:w-auto btn-primary py-2.5 px-6 whitespace-nowrap"
          >
            Check Availability
          </button>
        </div>

      </div>
    </form>
  );
}
