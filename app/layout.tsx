import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Assembly Line Car Workshop Multan | Best Car Repair & Auto Service in Multan",
    template: "%s | Assembly Line Car Workshop - Premier Car Repair Multan",
  },
  description:
    "Assembly Line Car Workshop - Multan's #1 trusted car repair workshop since 2020. Expert mechanics providing oil change, AC repair, brake service, electrical repairs & diagnostics. Located at MPS Road, 5 Marla Scheme. Book online or call +92 3224188020!",

  keywords: [
    // Primary local SEO keywords (most important)
    "car workshop Multan",
    "workshop in Multan",
    "workshops in Multan",
    "car repair Multan",
    "auto workshop Multan",
    "mechanic Multan",
    "car service Multan",
    "automobile workshop Multan",

    // Assembly Line brand keywords
    "Assembly Line Workshop",
    "Assembly Line Car Workshop",
    "Assembly Line Multan",
    "Assembly Line auto repair",

    // Location-specific keywords
    "MPS road workshop",
    "5 marla scheme workshop",
    "workshop near MPS road",
    "car repair MPS road Multan",
    "auto service 5 marla scheme",
    "workshop near Public School Road",

    // Service-specific long-tail keywords
    "oil change workshop Multan",
    "AC repair workshop Multan",
    "brake service workshop Multan",
    "car electrical repair Multan",
    "car diagnostics Multan",
    "engine repair workshop Multan",
    "transmission repair Multan",

    // Local competition keywords
    "best workshop Multan",
    "trusted workshop Multan",
    "professional workshop Multan",
    "certified workshop Multan",
    "affordable workshop Multan",

    // Extended area keywords
    "workshop near me Multan",
    "car workshop near me",
    "auto repair workshop near me",
    "workshop in Punjab",
    "car service center Multan",

    // Business attribute keywords
    "licensed workshop Multan",
    "genuine parts workshop",
    "warranty workshop Multan",
    "same day service workshop",
    "experienced mechanics Multan",

    // Vehicle-specific keywords
    "Toyota workshop Multan",
    "Honda workshop Multan",
    "Suzuki workshop Multan",
    "car workshop all brands",
    "multi-brand workshop Multan",
  ],

  authors: [{ name: "Assembly Line Car Workshop" }],
  creator: "Assembly Line Car Workshop - Multan's Premier Auto Service Center",
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
      "Assembly Line Car Workshop Multan | Best Workshop in Multan for Car Repair",
    description:
      "Multan's most trusted car workshop! Assembly Line offers expert car repair, oil change, AC service, brake repair & diagnostics. Located at MPS Road, 5 Marla Scheme. 10+ years experience, certified mechanics, genuine parts. Book now!",
    url: "https://www.assemblylineworkshop.com",
    siteName: "Assembly Line Car Workshop",
    images: [
      {
        url: "https://www.assemblylineworkshop.com/AssemblyLine.jpg",
        width: 1200,
        height: 630,
        alt: "Assembly Line Car Workshop - Best Car Repair Workshop in Multan",
      },
      {
        url: "https://www.assemblylineworkshop.com/workshop-exterior.jpg",
        width: 800,
        height: 600,
        alt: "Assembly Line Car Workshop Location - MPS Road, 5 Marla Scheme Multan",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Pakistan",
    emails: ["assemblyline15@gmail.com"],
    phoneNumbers: ["+92 3224188020"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Assembly Line Car Workshop Multan | Best Workshop in Multan",
    description:
      "Multan's #1 car workshop! Expert mechanics, genuine parts, all car brands. Located at MPS Road, 5 Marla Scheme. Book your car service now!",
    images: ["https://www.assemblylineworkshop.com/AssemblyLine.jpg"],
    creator: "@assemblylineworkshop",
    site: "@assemblylineworkshop",
  },

  metadataBase: new URL("https://www.assemblylineworkshop.com"),
  alternates: {
    canonical: "https://www.assemblylineworkshop.com/",
    languages: {
      "en-US": "https://www.assemblylineworkshop.com/",
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
  classification: "Car Workshop and Repair Services",

  other: {
    // Social media links
    facebook: "https://www.facebook.com/assemblylineworkshop/",
    instagram: "https://www.instagram.com/assemblyline.workshop/",
    tiktok: "https://www.tiktok.com/@assemblyline_",

    // Critical local business information
    "business-phone": "+92 3224188020",
    "business-hours": "Monday-Sunday: 9AM-9PM, Friday: Closed",
    "business-email": "assemblyline15@gmail.com",
    "business-address": "Assembly line 5 marla scheme MPS road, Multan",
    "payment-methods": "Cash, Card, Bank Transfer, Easypaisa, Jazzcash",
    "service-area": "Multan, Punjab, Pakistan",
    established: "2025",
    license: "Licensed Auto Repair Workshop",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Enhanced JSON-LD structured data optimized for local search
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": "https://www.assemblylineworkshop.com/#business",
    name: "Assembly Line Car Workshop",
    alternateName: [
      "Assembly Line Workshop",
      "Assembly Line Auto Repair",
      "Assembly Line Multan",
    ],
    url: "https://www.assemblylineworkshop.com",
    logo: "https://www.assemblylineworkshop.com/AssemblyLine.jpg",
    image: [
      "https://www.assemblylineworkshop.com/AssemblyLine.jpg",
      "https://www.assemblylineworkshop.com/workshop-exterior.jpg",
      "https://www.assemblylineworkshop.com/OilChange.jpg",
    ],
    description:
      "Assembly Line Car Workshop is Multan's premier car repair workshop established in 2020. We provide expert automotive services including mechanical repairs, electrical services, AC maintenance, oil changes, brake service, and comprehensive diagnostics. Located at MPS Road, 5 Marla Scheme, Multan.",
    slogan: "Multan's Most Trusted Car Workshop",
    foundingDate: "2025",

    address: {
      "@type": "PostalAddress",
      streetAddress: "Assembly line 5 marla scheme MPS road",
      addressLocality: "Multan",
      addressRegion: "Punjab",
      postalCode: "60000",
      addressCountry: "PK",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: "30.2480688",
      longitude: "71.51153",
    },

    telephone: "+92 3224188020",
    email: "assemblyline15@gmail.com",

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
        closes: "00:00",
      },
    ],

    paymentAccepted: [
      "Cash",
      "Credit Card",
      "Debit Card",
      "Bank Transfer",
      "Easypaisa",
      "Jazzcash",
    ],
    currenciesAccepted: "PKR",

    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "30.2480688",
        longitude: "71.51153",
      },
      geoRadius: "50000",
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
      name: "Car Workshop Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Oil Change Service",
            description:
              "Professional oil change with premium oils and filters for all car brands",
            provider: {
              "@type": "AutoRepair",
              name: "Assembly Line Car Workshop",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AC Repair Service",
            description:
              "Complete car AC repair, maintenance and recharge service",
            provider: {
              "@type": "AutoRepair",
              name: "Assembly Line Car Workshop",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Brake Service",
            description:
              "Expert brake repair, replacement and maintenance service",
            provider: {
              "@type": "AutoRepair",
              name: "Assembly Line Car Workshop",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Car Diagnostics",
            description:
              "Advanced computerized diagnostics for all car problems and brands",
            provider: {
              "@type": "AutoRepair",
              name: "Assembly Line Car Workshop",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Electrical Repair",
            description:
              "Complete car electrical system repair and maintenance",
            provider: {
              "@type": "AutoRepair",
              name: "Assembly Line Car Workshop",
            },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mechanical Repair",
            description: "Expert mechanical repair services for all car brands",
            provider: {
              "@type": "AutoRepair",
              name: "Assembly Line Car Workshop",
            },
          },
        },
      ],
    },

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },

    review: [
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
          "Really impressed with the service and behavior of all team mechanics. They treated my car like their own car. Best workshop in Multan! Highly recommended!",
        datePublished: "2024-06-05",
      },
    ],

    sameAs: [
      "https://www.facebook.com/assemblylineworkshop/",
      "https://www.instagram.com/assemblyline.workshop/",
      "https://www.tiktok.com/@assemblyline_",
      "https://maps.app.goo.gl/6f5LH2g6XRfGuFGa7",
    ],

    additionalType: [
      "https://schema.org/LocalBusiness",
      "https://schema.org/AutomotiveBusiness",
    ],

    keywords:
      "car workshop Multan, workshop in Multan, Assembly Line Workshop, car repair Multan, auto workshop Multan, mechanic Multan, MPS road workshop",

    // Additional local SEO properties
    priceRange: "$$",
    hasMap: "https://maps.app.goo.gl/6f5LH2g6XRfGuFGa7",
    isAccessibleForFree: false,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Workshop Type",
        value: "Full Service Auto Repair",
      },
      {
        "@type": "PropertyValue",
        name: "Brands Serviced",
        value: "All Car Brands",
      },
      {
        "@type": "PropertyValue",
        name: "Experience",
        value: "10+ Years",
      },
    ],
  };

  // FAQ Schema optimized for local search queries
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where is the best car workshop in Multan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Assembly Line Car Workshop is considered the best car workshop in Multan. We are located at Assembly line 5 marla scheme MPS road, Multan. With 10+ years of experience and certified mechanics, we provide comprehensive car repair services for all brands.",
        },
      },
      {
        "@type": "Question",
        name: "Which workshop in Multan provides oil change service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Assembly Line Car Workshop provides professional oil change service in Multan. We use premium oils and filters for all car brands. Located at MPS Road, 5 Marla Scheme, we offer same-day oil change service with genuine parts.",
        },
      },
      {
        "@type": "Question",
        name: "What services does Assembly Line Car Workshop offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Assembly Line Car Workshop offers comprehensive automotive services including: oil change, AC repair, brake service, electrical repairs, mechanical repairs, car diagnostics, engine repair, and general car maintenance. We service all car brands with certified technicians.",
        },
      },
      {
        "@type": "Question",
        name: "How can I book service at Assembly Line Car Workshop?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book your car service at Assembly Line Car Workshop by calling +92 3224188020 or visiting our website at www.assemblylineworkshop.com. We are located at Assembly line 5 marla scheme MPS road, Multan. Open Monday-Sunday 9AM-9PM, Friday closed.",
        },
      },
      {
        "@type": "Question",
        name: "Is Assembly Line Car Workshop licensed and certified?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Assembly Line Car Workshop is a licensed and certified auto repair workshop in Multan. Our mechanics are certified professionals with 10+ years of experience. We use genuine parts and provide warranty on all our services.",
        },
      },
    ],
  };

  // Local Business Schema for better local SEO
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.assemblylineworkshop.com/#localbusiness",
    name: "Assembly Line Car Workshop",
    description:
      "Best car workshop in Multan providing expert automotive repair services",
    url: "https://www.assemblylineworkshop.com",
    telephone: "+92 3224188020",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Assembly line 5 marla scheme MPS road",
      addressLocality: "Multan",
      addressRegion: "Punjab",
      postalCode: "60000",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "30.2480688",
      longitude: "71.51153",
    },
    openingHours: "Mo-Su 09:00-21:00 except Fr",
    paymentAccepted: ["Cash", "Card", "Bank Transfer", "Easypaisa", "Jazzcash"],
    hasMap: "https://www.google.com/maps/place/Assembly+Line+Car+Workshop",
  };

  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QEDBPLG4W6"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QEDBPLG4W6');
          `,
          }}
        />
        {/* Enhanced meta tags for better local SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />

        {/* Critical local business meta tags */}
        <meta name="geo.region" content="PK-PB" />
        <meta name="geo.placename" content="Multan, Punjab, Pakistan" />
        <meta name="geo.position" content="30.1575;71.5249" />
        <meta name="ICBM" content="30.1575, 71.5249" />
        <meta name="geo.country" content="PK" />
        <meta name="geo.a1" content="Punjab" />
        <meta name="geo.a2" content="Multan" />

        {/* Enhanced local business meta tags */}
        <meta name="business-phone" content="+92 3224188020" />
        <meta
          name="business-hours"
          content="Monday-Sunday: 9AM-9PM, Friday: Closed"
        />
        <meta name="service-area" content="Multan, Punjab, Pakistan" />
        <meta name="business-type" content="Car Workshop" />
        <meta name="business-category" content="Automotive Repair" />
        <meta name="establishment-year" content="2020" />

        {/* Additional local SEO meta tags */}
        <meta name="locality" content="Multan" />
        <meta name="region" content="Punjab" />
        <meta name="country" content="Pakistan" />
        <meta name="postal-code" content="60000" />
        <meta
          name="street-address"
          content="Assembly line 5 marla scheme MPS road"
        />

        {/* JSON-LD Structured Data for maximum local SEO impact */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
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
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />

        {/* Additional mobile and PWA meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Assembly Line Workshop"
        />

        {/* Language and content meta tags */}
        <meta name="language" content="English" />
        <meta name="content-language" content="en-US" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />

        {/* Social media verification (add when you get verified) */}
        {/* <meta name="facebook-domain-verification" content="your-verification-code" /> */}
        {/* <meta name="google-site-verification" content="your-verification-code" /> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
