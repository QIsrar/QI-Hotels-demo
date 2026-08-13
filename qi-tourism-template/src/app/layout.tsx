import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { siteConfig } from "@/config/site.config";

/* ── Open Graph / SEO Metadata ───────────────────────────── */
export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.businessName }],
  metadataBase: new URL(siteConfig.seo.siteUrl),
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
    image: `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`,
    priceRange: "PKR 8,000 – 22,000",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildJsonLd() }}
        />
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        {/* Vercel Analytics — no-ops in local dev, active on Vercel */}
        <Analytics />
      </body>
    </html>
  );
}
