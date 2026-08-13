"use client";

import Link from "next/link";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { buildRoomBookingUrl } from "@/lib/whatsapp";

interface BookingButtonProps {
  roomName: string;
  price: string;
  variant?: "primary" | "outline";
  fullWidth?: boolean;
}

export default function BookingButton({
  roomName,
  price,
  variant = "primary",
  fullWidth = false,
}: BookingButtonProps) {
  const url = buildRoomBookingUrl(roomName, price);

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variant === "primary" ? "btn-primary" : "btn-outline"} ${
        fullWidth ? "w-full justify-center" : ""
      }`}
      aria-label={`Book the ${roomName} via WhatsApp`}
    >
      <WhatsAppIcon className="w-4 h-4" />
      Book Now
    </Link>
  );
}
