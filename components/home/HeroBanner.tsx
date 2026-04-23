"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner } from "@/lib/types";

const DEFAULT_BANNERS: Banner[] = [
  {
    id: "1",
    title: "Professional Car Care Products",
    subtitle: "Free Delivery on orders above Rs. 3,000",
    image_url: "/banners/banner1.jpg",
    link: "/products",
    is_active: true,
    sort_order: 1,
    created_at: "",
  },
  {
    id: "2",
    title: "Shop by Top Brands",
    subtitle: "Carpro · Gyeon · Sonax · Meguiar's",
    image_url: "/banners/banner2.jpg",
    link: "/products",
    is_active: true,
    sort_order: 2,
    created_at: "",
  },
];

interface Props {
  banners?: Banner[];
}

export default function HeroBanner({ banners }: Props) {
  const items = (banners?.length ? banners : DEFAULT_BANNERS).filter((b) => b.is_active);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);

  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);

  const banner = items[idx];

  return (
    <div className="relative w-full overflow-hidden bg-gray-900" style={{ height: "clamp(220px,45vw,520px)" }}>
      {/* Background */}
      {banner.image_url.startsWith("/") && (
        <Image
          src={banner.image_url}
          alt={banner.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-10">
          <div className="max-w-lg">
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-3">
              {banner.title}
            </h1>
            {banner.subtitle && (
              <p className="text-gray-300 text-base md:text-lg mb-6">{banner.subtitle}</p>
            )}
            {banner.link && (
              <Link
                href={banner.link}
                className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-3 rounded-full transition-colors text-sm md:text-base"
              >
                SHOP NOW
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Arrows */}
      {items.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition" aria-label="Previous banner">
            <ChevronLeft size={22} />
          </button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition" aria-label="Next banner">
            <ChevronRight size={22} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all ${i === idx ? "bg-yellow-500 w-6" : "bg-white/50 w-2"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
