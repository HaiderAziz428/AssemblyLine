import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Assembly Line Auto Repair",
    template: "%s | Assembly Line Auto Repair",
  },
  description:
    "Assembly Line Auto Repair offers expert mechanical, electrical, AC, and oil change services in Multan. Book your car service online with certified technicians and state-of-the-art diagnostics.",
  keywords: [
    "auto repair",
    "car service",
    "mechanic",
    "Multan",
    "vehicle maintenance",
    "oil change",
    "AC service",
    "electrical repair",
    "mechanical repair",
    "Assembly Line",
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
  authors: [{ name: "Assembly Line Auto Repair" }],
  creator: "Assembly Line Auto Repair",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Assembly Line Auto Repair",
    description:
      "Assembly Line Auto Repair offers expert mechanical, electrical, AC, and oil change services in Multan. Book your car service online with certified technicians and state-of-the-art diagnostics.",
    url: "https://www.assemblylineworkshop.com",
    siteName: "Assembly Line Auto Repair",
    images: [
      {
        url: "/AssemblyLine.jpg",
        width: 1200,
        height: 630,
        alt: "Assembly Line Auto Repair Workshop",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Assembly Line Auto Repair",
    description:
      "Assembly Line Auto Repair offers expert mechanical, electrical, AC, and oil change services in Multan. Book your car service online with certified technicians and state-of-the-art diagnostics.",
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
    name: "Assembly Line Auto Repair",
    url: "https://www.assemblylineworkshop.com",
    image: "https://www.assemblylineworkshop.com/AssemblyLine.jpg",
    description:
      "Assembly Line Auto Repair offers expert mechanical, electrical, AC, and oil change services in Multan. Book your car service online with certified technicians and state-of-the-art diagnostics.",
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
