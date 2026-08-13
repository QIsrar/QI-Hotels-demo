import { siteConfig } from "@/config/site.config";

/**
 * Builds a WhatsApp deep-link URL with a pre-filled message.
 * The number must be in international format without + or spaces.
 */
export function buildWhatsAppUrl(
  message?: string,
  number?: string
): string {
  const phone = number ?? siteConfig.whatsappNumber;
  const text = message ?? siteConfig.whatsappDefaultMessage;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds a room-specific WhatsApp booking message.
 */
export function buildRoomBookingUrl(
  roomName: string,
  price: string
): string {
  const message = `Hi! I'd like to book the *${roomName}* (${price}/night) at ${siteConfig.businessName}. Please share availability and confirm the booking. 🙏`;
  return buildWhatsAppUrl(message);
}
