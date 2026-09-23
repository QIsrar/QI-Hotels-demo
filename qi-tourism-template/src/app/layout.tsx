import { Playfair_Display, Inter } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { siteConfig } from "@/config/site.config";
import Popup from "@/components/ui/Popup";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading-next",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-next",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.businessName }],
  metadataBase: new URL(siteConfig.seo.siteUrl),
  alternates: {
    canonical: siteConfig.seo.siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteConfig.seo.siteUrl,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.businessName,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.businessName} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

/* ── JSON-LD LodgingBusiness Schema (dynamic from config) ── */
function buildJsonLd() {
  const base = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteConfig.businessName,
    description: siteConfig.description,
    url: siteConfig.seo.siteUrl,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressCountry: "PK",
    },
    image: siteConfig.seo.ogImage,
    priceRange: siteConfig.priceRange,
    amenityFeature: siteConfig.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.label,
      value: true,
    })),
    ...(siteConfig.googleRating.value !== null &&
      siteConfig.googleRating.count !== null && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: siteConfig.googleRating.value.toFixed(1),
          reviewCount: siteConfig.googleRating.count,
          bestRating: "5",
          worstRating: "1",
        },
      }),
  };
  return JSON.stringify(base);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
      style={
        {
          "--color-primary": siteConfig.brand.primaryColor,
          "--color-accent": siteConfig.brand.accentColor,
          "--color-bg": siteConfig.brand.bgLight,
          "--color-text": siteConfig.brand.textDark,
        } as React.CSSProperties
      }
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildJsonLd() }}
        />
      </head>
      <body>
        {children}
        <Popup />
        {/* Vercel Analytics — no-ops in local dev, active on Vercel */}
        <Analytics />
      </body>
    </html>
  );
}
