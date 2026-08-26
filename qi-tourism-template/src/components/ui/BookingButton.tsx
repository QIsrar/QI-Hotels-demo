"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

interface BookingButtonProps {
  roomId: string;
  roomName: string;
  price: string;
  variant?: "primary" | "outline";
  fullWidth?: boolean;
}

export default function BookingButton({
  roomId,
  roomName,
  variant = "primary",
  fullWidth = false,
}: BookingButtonProps) {
  const searchParams = useSearchParams();
  
  // Build query string preserving existing search data
  const queryParams = new URLSearchParams();
  queryParams.set("booking", "open");
  queryParams.set("roomId", roomId);
  
  if (searchParams.get("guests")) queryParams.set("guests", searchParams.get("guests")!);
  if (searchParams.get("checkin")) queryParams.set("checkin", searchParams.get("checkin")!);
  if (searchParams.get("checkout")) queryParams.set("checkout", searchParams.get("checkout")!);

  const href = `/?${queryParams.toString()}`;

  return (
    <Link
      href={href}
      scroll={false}
      className={`${variant === "primary" ? "btn-primary" : "btn-outline"} ${
        fullWidth ? "w-full justify-center" : ""
      }`}
      aria-label={`Book the ${roomName}`}
    >
      <WhatsAppIcon className="w-4 h-4" />
      Book Now
    </Link>
  );
}
