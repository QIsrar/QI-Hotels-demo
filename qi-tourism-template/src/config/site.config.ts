/**
 * ============================================================
 *  QI TYRIX — SITE CONFIGURATION
 *  ============================================================
 *  This is the ONLY file you need to edit to fully rebrand
 *  this website for any client. Every section, every string,
 *  every image path, every price, and every social link flows
 *  from this single file.
 *
 *  WHATSAPP NUMBER FORMAT:
 *  Use international format WITHOUT + or spaces.
 *  Example: Pakistan (+92) → 923001234567
 * ============================================================
 */

export const siteConfig = {
  // ── Business Identity ─────────────────────────────────────
  businessName: "Pine Crest Retreat",
  tagline: "Where the Mountains Whisper",
  description:
    "A luxury boutique mountain retreat nestled in the Himalayan foothills of Abbottabad — your private escape from the noise of the world.",

  // ── Brand Colors ──────────────────────────────────────────
  // Used in Tailwind config via CSS variables
  brand: {
    primaryColor: "#2D5016",   // Deep forest green
    accentColor: "#C8902A",    // Warm gold
    bgLight: "#FAF7F2",        // Warm off-white
    textDark: "#1A1A1A",
  },

  // ── Logo ──────────────────────────────────────────────────
  logo: {
    path: "/images/logo.png",  // Replace with actual logo file
    alt: "Pine Crest Retreat Logo",
    showTextFallback: true,    // Show business name text if logo not found
  },

  // ── Contact & Location ────────────────────────────────────
  contact: {
    address: "Shimla Hill Road, Abbottabad, Khyber Pakhtunkhwa, Pakistan",
    phone: "+92 300 123 4567",
    email: "hello@pinecrestretreat.com",
    // Paste your Google Maps embed URL here (from maps.google.com → Share → Embed)
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26568.29!2d73.2215!3d34.1463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38de4f0e5f8f8f8f%3A0x0!2sAbbottabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890",
  },

  // ── WhatsApp Booking ──────────────────────────────────────
  // International format, no + or spaces
  whatsappNumber: "923001234567",
  whatsappDefaultMessage:
    "Hi! I'd like to make a booking at Pine Crest Retreat. Please share availability.",

  // ── Google Rating ─────────────────────────────────────────
  // Set both to null if the property has no Google rating yet
  // The badge component will be completely hidden if value is null
  googleRating: {
    value: 4.8,     // e.g. 4.8 | Set to null to hide badge
    count: 124,     // Number of reviews | Set to null to hide
  } as { value: number | null; count: number | null },

  // ── Property Story / About ────────────────────────────────
  story: {
    heading: "A Retreat Born from the Mountains",
    subheading: "Our Story",
    paragraphs: [
      "Pine Crest Retreat was born from a simple belief: that the mountains have a way of healing what the city cannot. Nestled at 1,200 metres in the Himalayan foothills above Abbottabad, our property was lovingly built by hand using local cedar wood, mountain stone, and craftsmanship passed down through generations.",
      "Our host philosophy is rooted in Pakistani tradition — warm hospitality, home-cooked meals made from locally sourced ingredients, and the belief that every guest is family. From the moment you arrive, we want you to exhale.",
      "Whether you're a solo traveller seeking solitude in the pines, a couple celebrating a milestone, or a family creating memories — Pine Crest Retreat is your home in the mountains.",
    ],
    imagePath: "/images/about.jpg",
    imageAlt: "Warm interior of Pine Crest Retreat with a stone fireplace",
    highlights: [
      { icon: "mountain", label: "1,200m Elevation" },
      { icon: "trees", label: "5 Acres of Pine Forest" },
      { icon: "heart", label: "Family-Run Since 2018" },
      { icon: "star", label: "4.8★ Google Rated" },
    ],
  },

  // ── Amenities ─────────────────────────────────────────────
  amenities: [
    {
      iconKey: "zap",
      label: "24/7 Power Backup",
      description: "Generator & UPS ensure uninterrupted power during load shedding",
    },
    {
      iconKey: "flame",
      label: "Hot Water & Heating",
      description: "Gas geysers and room heaters for cold mountain nights",
    },
    {
      iconKey: "car",
      label: "Secure Parking",
      description: "Gated, covered parking available for all guests",
    },
    {
      iconKey: "utensils",
      label: "In-House Dining & BBQ",
      description: "Home-cooked Pakistani cuisine and evening BBQ on request",
    },
    {
      iconKey: "wifi",
      label: "High-Speed Wi-Fi",
      description: "Fibre connection throughout the property",
    },
    {
      iconKey: "shield",
      label: "24/7 Security",
      description: "CCTV monitored premises with on-site caretaker",
    },
  ],

  // ── Rooms & Packages ──────────────────────────────────────
  rooms: [
    {
      id: "standard-twin",
      name: "Standard Mountain Twin",
      description:
        "Ideal for friends or family travelling together. Two comfortable single beds, mountain forest views, and all essential amenities included.",
      price: "PKR 8,000",
      priceNote: "per night",
      imagePath: "/images/room-standard.jpg",
      altText: "Cozy standard twin room with two single beds and mountain forest window view",
      amenities: ["Twin Beds", "Hot Water", "Wi-Fi", "Heating", "Mountain View"],
      featured: false,
    },
    {
      id: "deluxe-king",
      name: "Deluxe King Suite",
      description:
        "Our signature room — a king-sized bed, panoramic pine forest views through floor-to-ceiling windows, and a curated welcome basket on arrival.",
      price: "PKR 14,000",
      priceNote: "per night",
      imagePath: "/images/room-deluxe.jpg",
      altText: "Spacious deluxe king suite with panoramic mountain and pine forest views",
      amenities: ["King Bed", "Hot Water", "Wi-Fi", "Heating", "Panoramic View", "Welcome Basket"],
      featured: true,
    },
    {
      id: "honeymoon-suite",
      name: "Honeymoon Suite",
      description:
        "A private sanctuary for couples. Canopy bed, stone accent walls, private balcony overlooking the valley, and bespoke romantic décor on request.",
      price: "PKR 22,000",
      priceNote: "per night",
      imagePath: "/images/room-suite.jpg",
      altText: "Romantic honeymoon suite with canopy bed, stone walls and private mountain balcony",
      amenities: ["Canopy Bed", "Private Balcony", "Hot Tub", "Wi-Fi", "Valley View", "Romantic Setup"],
      featured: false,
    },
  ],

  // ── Nearby Attractions ────────────────────────────────────
  attractions: [
    {
      name: "Nathia Gali",
      description:
        "A charming colonial hill station perched in the clouds. Walk the famous Governor's Trail through ancient pine forests and breathe the freshest air in Pakistan.",
      travelTime: "45 mins away",
      imagePath: "/images/attraction-nathia.jpg",
      altText: "Sunlit pine forest trail in Nathia Gali hill station",
    },
    {
      name: "Thandiani Peak",
      description:
        "The highest point in Abbottabad district at 2,750m. On a clear day, you can see all the way to Nanga Parbat. A favourite for sunrise trekkers.",
      travelTime: "1 hr away",
      imagePath: "/images/attraction-thandiani.jpg",
      altText: "Panoramic mountain view from Thandiani peak at golden hour",
    },
    {
      name: "Abbottabad City",
      description:
        "Explore the charming garrison city — its bustling bazaars, fresh fruit markets, Ayub Medical Complex, and the iconic Jinnah Abbottabad Mall.",
      travelTime: "20 mins away",
      imagePath: "/images/attraction-abbottabad.jpg",
      altText: "Green valley view of Abbottabad city surrounded by mountains",
    },
    {
      name: "Dunga Gali",
      description:
        "A serene forest village with some of the most beautiful walking trails in KPK. Famous for its rhododendron blooms in spring and snowfall in winter.",
      travelTime: "40 mins away",
      imagePath: "/images/attraction-nathia.jpg",
      altText: "Peaceful forest village of Dunga Gali with mountain trails",
    },
  ],

  // ── Testimonials ──────────────────────────────────────────
  testimonials: [
    {
      author: "Ayesha Tariq",
      location: "Lahore",
      rating: 5,
      text: "Absolutely magical. The views from the Deluxe Suite took my breath away every single morning. The host's cooking was better than any restaurant in Lahore. We're already planning our next visit.",
    },
    {
      author: "Bilal & Sana Ahmed",
      location: "Islamabad",
      rating: 5,
      text: "We celebrated our honeymoon here and couldn't have chosen better. The suite was decorated so beautifully, the BBQ dinner under the stars was unforgettable. Pine Crest is a hidden gem.",
    },
    {
      author: "Kamran Malik",
      location: "Karachi",
      rating: 5,
      text: "I was worried about load shedding but the 24/7 backup power was flawless. Wi-Fi was fast enough for work calls. The mountains do something to your stress levels — I went back to Karachi a new man.",
    },
    {
      author: "Dr. Farhan Qureshi",
      location: "Peshawar",
      rating: 4,
      text: "Beautiful property, excellent host, superb home cooking. The only wish was more time — three nights wasn't enough. The Thandiani sunrise trek arranged by the team was the highlight of my year.",
    },
  ],

  // ── FAQs ──────────────────────────────────────────────────
  faqs: [
    {
      question: "What are the check-in and check-out times?",
      answer:
        "Standard check-in is from 2:00 PM onwards. Check-out is by 12:00 PM (noon). Early check-in or late check-out may be available upon request and subject to availability — just WhatsApp us in advance.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Cancellations made 72 hours or more before check-in receive a full refund. Cancellations within 72 hours of check-in forfeit the first night's deposit. No-shows are charged the full booking amount. We recommend WhatsApping us — we're always happy to find a flexible solution.",
    },
    {
      question: "Is there load shedding in the area?",
      answer:
        "Yes, like most of KPK, we experience scheduled load shedding. However, we have a full-capacity generator and a UPS system that kicks in automatically, ensuring uninterrupted power to all rooms, lights, heaters, and Wi-Fi at all times.",
    },
    {
      question: "Do you offer airport or station transfers?",
      answer:
        "Yes! We can arrange comfortable transfers from Abbottabad bus stop or the nearest Havelian railway station. Please let us know your arrival details at least 24 hours in advance via WhatsApp and we'll sort everything out.",
    },
    {
      question: "Is the property pet-friendly?",
      answer:
        "We love animals! Small to medium pets are welcome with prior notice. A refundable pet deposit of PKR 2,000 applies. Please WhatsApp us before booking to confirm arrangements.",
    },
    {
      question: "Can I arrange meals at the property?",
      answer:
        "Absolutely. We offer home-cooked Pakistani breakfast, lunch, and dinner prepared fresh on the premises. BBQ dinners under the stars are a guest favourite and can be arranged with 4 hours' notice. Pricing varies by menu — ask us via WhatsApp.",
    },
  ],

  // ── Social Links ──────────────────────────────────────────
  // Set to null/empty string to hide that icon
  social: {
    instagram: "https://instagram.com/pinecrestretreat",
    facebook: "https://facebook.com/pinecrestretreat",
    tiktok: "",         // Leave empty to hide
    youtube: "",        // Leave empty to hide
  },

  // ── SEO & Open Graph ──────────────────────────────────────
  seo: {
    title: "Pine Crest Retreat | Luxury Mountain Getaway in Abbottabad",
    description:
      "Escape to Pine Crest Retreat. Experience premium hospitality, 24/7 power backup, and breathtaking Himalayan views.",
    siteUrl: "https://your-new-domain.vercel.app", // Put your actual new Vercel link here!
    ogImage: "https://your-new-domain.vercel.app/og-image.png", // Must be the FULL link!
    keywords:
      "abbottabad hotel, mountain retreat pakistan, nathia gali hotel, kpk tourism, luxury guesthouse abbottabad, pine crest retreat",
  },
} as const;

export type SiteConfig = typeof siteConfig;
