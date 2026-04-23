"use client";

import { Zap, Settings, Wind, Droplet, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

type GalleryItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  width?: number;
  height?: number;
  poster?: string;
};

const services = [
  {
    title: "Electrical Services",
    description:
      "Complete electrical diagnostics and car electrical repair in Multan for all vehicle systems including battery, alternator, and starter issues.",
    icon: <Zap className="h-12 w-12 text-gold-500" aria-hidden="true" />,
  },
  {
    title: "Mechanical Repairs",
    description:
      "Expert mechanical repairs in Multan including engine diagnostics, brake service, suspension work, and transmission repair.",
    icon: <Settings className="h-12 w-12 text-gold-500" aria-hidden="true" />,
  },
  {
    title: "AC Service & Repair",
    description:
      "Full AC system diagnostics, car AC repair, and recharge in Multan to keep you cool and comfortable all year round.",
    icon: <Wind className="h-12 w-12 text-gold-500" aria-hidden="true" />,
  },
  {
    title: "Oil Change Service",
    description:
      "Professional oil change service in Multan using premium quality oils and filters to extend your engine's life.",
    icon: <Droplet className="h-12 w-12 text-gold-500" aria-hidden="true" />,
  },
];

const gallery: GalleryItem[] = [
  { type: "image", src: "/AC.jpg", alt: "AC Service at Assembly Line Car Workshop Multan", width: 500, height: 350 },
  { type: "image", src: "/mechanical.jpg", alt: "Mechanical Repair at Assembly Line Car Workshop Multan", width: 500, height: 350 },
  { type: "image", src: "/Electrical.jpg", alt: "Electrical Service at Assembly Line Car Workshop Multan", width: 500, height: 350 },
  { type: "image", src: "/OilChange.jpg", alt: "Oil Change at Assembly Line Car Workshop Multan", width: 500, height: 350 },
  { type: "image", src: "/lubricant.jpg", alt: "Lubricants at Assembly Line Car Workshop Multan", width: 500, height: 350 },
  { type: "video", src: "/BMW_oilChange.mp4", alt: "BMW Oil Change - Assembly Line Car Workshop Multan", poster: "/BMW_oilChange-thumbnail.jpg" },
  { type: "video", src: "/beforeVsAferBrakeOilFlush.mp4", alt: "Brake Oil Flush - Assembly Line Car Workshop Multan", poster: "/beforeVsAferBrakeOilFlush-thumbnail.jpg" },
  { type: "video", src: "/brake_oil_inspection.mp4", alt: "Brake Oil Inspection - Assembly Line Car Workshop Multan", poster: "/brake_oil_inspection-thumbnail.jpg" },
  { type: "video", src: "/CoolantBenefits.mp4", alt: "Coolant Benefits - Assembly Line Car Workshop Multan", poster: "/CoolantBenefits-thumbnail.jpg" },
  { type: "video", src: "/Diff_new_old_plug.mp4", alt: "New vs Old Spark Plug - Assembly Line Car Workshop Multan", poster: "/Diff_new_old_plug-thumbnail.jpg" },
  { type: "video", src: "/fuelInjectorCleaning.mp4", alt: "Fuel Injector Cleaning - Assembly Line Car Workshop Multan", poster: "/fuelInjectorCleaning-thumbnail.jpg" },
  { type: "video", src: "/sparkPlug.mp4", alt: "Spark Plug Service - Assembly Line Car Workshop Multan", poster: "/sparkPlug-thumbnail.jpg" },
];

const videoJsonLd = gallery
  .filter((item) => item.type === "video")
  .map((item) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: item.alt,
    description: item.alt,
    thumbnailUrl: item.poster ?? undefined,
    uploadDate: "2024-01-01",
    contentUrl: item.src,
    publisher: {
      "@type": "Organization",
      name: "Assembly Line Car Workshop",
      logo: { "@type": "ImageObject", url: "/AssemblyLine.jpg" },
    },
  }));

export default function Services() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    galleryRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <>
      {videoJsonLd.map((json, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
        />
      ))}

      {/* Services */}
      <section id="services" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black" aria-hidden="true">
          <div className="absolute inset-0 services-bg opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/90 to-navy-900/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-gold-500/20 to-gold-300/20 rounded-full px-4 py-1 backdrop-blur-sm border border-gold-500/20 mb-4">
              <span className="text-gold-300 font-medium">What We Do Best</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-oswald tracking-wide text-white">
              OUR <span className="text-gold-500">SERVICES</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We offer comprehensive automotive services using cutting-edge technology and expert technicians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-navy-800/50 backdrop-blur-sm border-navy-700 hover:border-gold-500/50 transition-all duration-300"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-white flex items-center">
                    <div className="mr-3">{service.icon}</div>
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-400">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <button
                    className="text-gold-500 hover:text-gold-400 inline-flex items-center gap-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
                    onClick={() =>
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Book Service <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 bg-navy-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-oswald tracking-wide text-white">
              OUR <span className="text-gold-500">GALLERY</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Photos and videos of our workshop, services, and satisfied customers at Assembly Line Car Workshop Multan.
            </p>
          </div>

          <div className="relative">
            {canScrollLeft && (
              <button
                type="button"
                aria-label="Scroll gallery left"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-navy-800/80 hover:bg-gold-500 text-gold-500 hover:text-navy-900 rounded-full p-2 shadow-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                onClick={() => scroll("left")}
              >
                <ChevronLeft size={28} aria-hidden="true" />
              </button>
            )}
            {canScrollRight && (
              <button
                type="button"
                aria-label="Scroll gallery right"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-navy-800/80 hover:bg-gold-500 text-gold-500 hover:text-navy-900 rounded-full p-2 shadow-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                onClick={() => scroll("right")}
              >
                <ChevronRight size={28} aria-hidden="true" />
              </button>
            )}

            <div
              ref={galleryRef}
              role="region"
              aria-label="Workshop gallery"
              className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-thin"
              style={{ scrollbarWidth: "thin" }}
            >
              {gallery.map((item, idx) =>
                item.type === "image" ? (
                  <Image
                    key={idx}
                    src={item.src}
                    alt={item.alt}
                    width={item.width ?? 500}
                    height={item.height ?? 350}
                    loading={idx < 3 ? "eager" : "lazy"}
                    className="h-64 w-auto rounded-xl border border-gold-500/60 shadow-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <video
                    key={idx}
                    src={item.src}
                    controls
                    preload="none"
                    poster={item.poster}
                    aria-label={item.alt}
                    className="h-64 w-auto rounded-xl border border-gold-500/60 shadow-lg object-cover flex-shrink-0"
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
