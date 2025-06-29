import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Assembly Line Workshop | Multan's Trusted Car Service & Workshop",
    template: "%s | Assembly Line Workshop",
  },
  description:
    "Get expert car repair, AC service, oil change, and diagnostics in Multan. Certified technicians, genuine parts, and transparent pricing. Book your service online today!",
  keywords: [
    "Assembly Line",
    "auto repair",
    "car service",
    "mechanic",
    "Multan",
    "vehicle maintenance",
    "oil change",
    "AC service",
    "electrical repair",
    "mechanical repair",
    "Assembly Line Workshop",
    "car workshop",
    "brake service",
    "suspension",
    "diagnostics",
    "auto workshop",
    "car booking",
    "certified technicians",
    "automotive",
    "car repair",
    "car maintenance",
    "auto diagnostics",
    "warranty service",
    "genuine parts",
    "customer reviews",
    "booking form",
    "professional service",
    "affordable auto repair",
    "best auto repair Multan",
    "state-of-the-art equipment",
    "auto repair Pakistan",
  ],
  authors: [{ name: "Assembly Line Workshop" }],
  creator: "Assembly Line Workshop",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Assembly Line Workshop | Multan's Trusted Car Service & Workshop",
    description:
      "Get expert car repair, AC service, oil change, and diagnostics in Multan. Certified technicians, genuine parts, and transparent pricing. Book your service online today!",
    url: "https://www.assemblylineworkshop.com",
    siteName: "Assembly Line Workshop",
    images: [
      {
        url: "/AssemblyLine.jpg",
        width: 1200,
        height: 630,
        alt: "Assembly Line Workshop",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Assembly Line Workshop | Multan's Trusted Car Service & Workshop",
    description:
      "Get expert car repair, AC service, oil change, and diagnostics in Multan. Certified technicians, genuine parts, and transparent pricing. Book your service online today!",
    images: ["/AssemblyLine.jpg"],
    creator: "@assemblylineworkshop",
  },
  metadataBase: new URL("https://www.assemblylineworkshop.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    facebook: "https://www.facebook.com/assemblylineworkshop/",
    instagram: "https://www.instagram.com/assemblyline.workshop/",
    tiktok: "https://www.tiktok.com/@assemblyline_",
    // Add more social links as needed
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Assembly Line Workshop",
    url: "https://www.assemblylineworkshop.com",
    image: "https://www.assemblylineworkshop.com/AssemblyLine.jpg",
    description:
      "Assembly Line Workshop offers expert mechanical, electrical, AC, and oil change services in Multan. Book your car service online with certified technicians and state-of-the-art diagnostics.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Assembly line 5 marla scheme MPS road",
      addressLocality: "Multan",
      addressCountry: "PK",
    },
    telephone: "+92 3224188020",
    sameAs: [
      "https://www.facebook.com/assemblylineworkshop/",
      "https://www.instagram.com/assemblyline.workshop/",
      "https://www.tiktok.com/@assemblyline_",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
