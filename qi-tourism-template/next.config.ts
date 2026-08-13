import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from common external CDNs for future use
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // Optimize formats for best performance
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

