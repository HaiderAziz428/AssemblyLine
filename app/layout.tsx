import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "AutoShop — Premium Car Care & Detailing Products",
    template: "%s | AutoShop",
  },
  description:
    "Pakistan's top destination for professional car care, detailing products and accessories. Shop Carpro, Gyeon, Sonax and more.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    siteName: "AutoShop",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
