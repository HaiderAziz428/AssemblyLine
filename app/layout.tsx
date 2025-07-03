import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Assembly Line Car Workshop Multan | Best Car Repair & Auto Service Near Me",
    template:
      "%s | Assembly Line Car Workshop Multan - Car Repair & Auto Service",
  },
  description:
    "Assembly Line Car Workshop - Multan's #1 car repair shop. Expert oil change, AC service, brake repair, and diagnostics. Workshop near Multan with certified mechanics, genuine parts, and same-day service. Book online now!",
  keywords: [
    // Primary target keywords
    "Assembly Line",
    "Assembly Line Workshop",
    "workshop near Multan",
    "car repair Multan",
    "oil change Multan",
    "auto repair Multan",
    "car service Multan",
    "mechanic Multan",

    // Long-tail keywords for better ranking
    "best car repair shop Multan",
    "Assembly Line Car Workshop Multan",
    "auto workshop near me Multan",
    "car mechanic near Multan",
    "oil change service Multan",
    "car AC repair Multan",
    "brake service Multan",
    "car diagnostics Multan",
    "vehicle maintenance Multan",
    "auto electrical repair Multan",

    // Location-based keywords
    "Multan car workshop",
    "Multan auto repair shop",
    "car service center Multan",
    "automobile workshop Multan",
    "MPS road car repair",
    "5 marla scheme workshop",

    // Service-specific keywords
    "engine repair Multan",
    "transmission repair Multan",
    "suspension repair Multan",
    "car battery replacement Multan",
    "tire service Multan",
    "car wash Multan",
    "preventive maintenance Multan",

    // Business attributes
    "certified car technicians Multan",
    "genuine car parts Multan",
    "affordable car repair Multan",
    "trusted car workshop Multan",
    "professional auto service Multan",
    "same day car repair Multan",
    "warranty car service Multan",
    "online car booking Multan",

    // Competition keywords
    "car repair Pakistan",
    "auto workshop Pakistan",
    "best mechanic Multan",
    "car service booking online",
    "Assembly Line auto repair",

    // AC Service keywords
    "AC service Multan",
    "auto AC recharge",
    "car air conditioning",
    "vehicle AC maintenance",
    "best AC service Multan",
    "car cooling repair",

    // Electrical Repair keywords
    "electrical repair Multan",
    "car electrical service",
    "auto electrical diagnostics",
    "battery replacement",
    "alternator repair",
    "starter repair",
    "wiring issues",

    // Mechanical Repair keywords
    "mechanical repair Multan",
    "auto diagnostics",
    "car workshop Multan",
    "vehicle repair Multan",
    // Avoiding duplicates for: Assembly Line Auto Repair, auto workshop Multan, engine repair, brake service, suspension repair
  ],
  authors: [{ name: "Assembly Line Car Workshop" }],
  creator: "Assembly Line Car Workshop - Multan's Premier Car Service Center",
  generator: "Assembly Line Car Workshop",
  publisher: "Assembly Line Car Workshop",
  applicationName: "Assembly Line Car Workshop",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [
      { url: "/favicon.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/favicon.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/favicon.svg", sizes: "48x48", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title:
      "Assembly Line Car Workshop Multan | #1 Car Repair & Auto Service Near Me",
    description:
      "Multan's most trusted car repair workshop! Assembly Line offers expert oil change, AC service, brake repair, and diagnostics. Certified mechanics, genuine parts, transparent pricing. Book your car service online today!",
    url: "https://www.assemblylineworkshop.com",
    siteName: "Assembly Line Car Workshop",
    images: [
      {
        url: "https://www.assemblylineworkshop.com/AssemblyLine.jpg",
        width: 1200,
        height: 630,
        alt: "Assembly Line Car Workshop - Best Car Repair Service in Multan",
      },
      {
        url: "https://www.assemblylineworkshop.com/workshop-exterior.jpg", // Add more images if available
        width: 800,
        height: 600,
        alt: "Assembly Line Car Workshop Exterior - Modern Car Service Center Multan",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Pakistan",
    emails: ["assemblyline15@gmail.com.com"], // Add if available
    phoneNumbers: ["+92 3224188020"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Assembly Line Car Workshop Multan | Best Car Repair & Oil Change Service",
    description:
      "Multan's #1 car repair shop! Expert oil change, AC service, brake repair. Certified mechanics, genuine parts, same-day service. Book online now!",
    images: ["https://www.assemblylineworkshop.com/AssemblyLine.jpg"],
    creator: "@assemblylineworkshop",
    site: "@assemblylineworkshop",
  },

  metadataBase: new URL("https://www.assemblylineworkshop.com"),
  alternates: {
    canonical: "https://www.assemblylineworkshop.com/",
    languages: {
      "en-US": "https://www.assemblylineworkshop.com/",
      "ur-PK": "https://www.assemblylineworkshop.com/ur/", // Add Urdu version if available
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": 30,
      "max-image-preview": "large",
      "max-snippet": 160,
    },
  },
  category: "Automotive Services",
  classification: "Car Repair and Maintenance Services",
  other: {
    // Social media links
    facebook: "https://www.facebook.com/assemblylineworkshop/",
    instagram: "https://www.instagram.com/assemblyline.workshop/",
    tiktok: "https://www.tiktok.com/@assemblyline_",

    // Business information for better local SEO
    "business-phone": "+92 3224188020",
    "business-hours": "Monday-Sunday: 9AM-9PM, Friday: Closed", // Update with actual hours
    "business-email": "assemblyline15@gmail.com", // Add if available
    "payment-methods": "Cash, Card, Bank Transfer,Easypaisa,Jazzcash", // Update with actual methods
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Enhanced JSON-LD structured data for better SEO
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": "https://www.assemblylineworkshop.com/#business",
    name: "Assembly Line Car Workshop",
    alternateName: "Assembly Line Auto Repair Multan",
    url: "https://www.assemblylineworkshop.com",
    logo: "https://www.assemblylineworkshop.com/AssemblyLine.jpg",
    image: [
      "https://www.assemblylineworkshop.com/AssemblyLine.jpg",
      // Add more images of your workshop
    ],
    description:
      "Assembly Line Car Workshop is Multan's premier car repair and auto service center, offering expert mechanical repairs, electrical services, AC maintenance, oil changes, brake service, and comprehensive diagnostics with certified technicians and genuine parts.",
    slogan: "Your Car's Best Friend in Multan",
    foundingDate: "2020", // Update with actual founding date
    address: {
      "@type": "PostalAddress",
      streetAddress: "Assembly line 5 marla scheme MPS road",
      addressLocality: "Multan",
      addressRegion: "Punjab",
      postalCode: "60000", // Add postal code
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "30.1575", // Add actual coordinates
      longitude: "71.5249",
    },
    telephone: "+92 3224188020",
    email: "info@assemblylineworkshop.com", // Add if available
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "00:00",
        closes: "00:00", // Closed on Sunday
      },
    ],

    paymentAccepted: ["Cash", "Credit Card", "Debit Card"],
    currenciesAccepted: "PKR",
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "30.1575",
        longitude: "71.5249",
      },
      geoRadius: "50000", // 50km radius
    },
    areaServed: [
      {
        "@type": "City",
        name: "Multan",
        addressCountry: "PK",
      },
      {
        "@type": "State",
        name: "Punjab",
        addressCountry: "PK",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Car Repair Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Oil Change Service",
            description:
              "Professional oil change with premium oils and filters",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AC Repair Service",
            description: "Complete car AC repair and maintenance service",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Brake Service",
            description: "Expert brake repair and replacement service",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Car Diagnostics",
            description: "Advanced computer diagnostics for all car problems",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8", // Update with actual rating
      reviewCount: "150", // Update with actual review count
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      // Add actual customer reviews here
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Imtiaz Ahmad",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Really impressed with the service and behavior of all team mechanics. They treated my car like their own car. Highly recommended!",
        datePublished: "202s-06-05",
      },
    ],
    sameAs: [
      "https://www.facebook.com/assemblylineworkshop/",
      "https://www.instagram.com/assemblyline.workshop/",
      "https://www.tiktok.com/@assemblyline_",
    ],
    additionalType: [
      "https://schema.org/LocalBusiness",
      "https://schema.org/AutomotiveBusiness",
    ],
    keywords:
      "Assembly Line Workshop, car repair Multan, oil change Multan, auto service, mechanic Multan, workshop near Multan",
  };

  // FAQ Schema for better search visibility
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where is Assembly Line Car Workshop located in Multan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Assembly Line Car Workshop is located at Assembly line 5 marla scheme MPS road, Multan. We are easily accessible and provide the best car repair services in the area.",
        },
      },
      {
        "@type": "Question",
        name: "What services does Assembly Line Car Workshop offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer comprehensive car repair services including oil change, AC service, brake repair, engine diagnostics, electrical repairs, suspension service, and general car maintenance with certified technicians.",
        },
      },
      {
        "@type": "Question",
        name: "How can I book a service at Assembly Line Car Workshop?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book your car service online through our website or call us at +92 3224188020. We offer convenient online booking for all our automotive services.",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Enhanced meta tags for better SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />

        {/* Business-specific meta tags */}
        <meta name="geo.region" content="PK-PB" />
        <meta name="geo.placename" content="Multan, Punjab, Pakistan" />
        <meta name="geo.position" content="30.1575;71.5249" />
        <meta name="ICBM" content="30.1575, 71.5249" />

        {/* Local business meta tags */}
        <meta name="business-phone" content="+92 3224188020" />
        <meta name="business-hours" content="Monday-Saturday: 9AM-7PM" />
        <meta name="service-area" content="Multan, Punjab, Pakistan" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* Favicon and touch icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
        <link
          rel="icon"
          href="/favicon.svg"
          type="image/svg+xml"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/favicon.svg"
          type="image/svg+xml"
          sizes="16x16"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="msapplication-TileImage" content="/favicon.svg" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Additional SEO meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Assembly Line Car Workshop"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
