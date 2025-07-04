"use client";
import heroPic from "../public/Hero.jpg"; // Assuming you have a hero image
import AC from "../public/AC.jpg"; // Assuming you have an AC service image
import Electrical from "../public/Electrical.jpg"; // Assuming you have an Electrical service image
import Mechanical from "../public/mechanical.jpg"; // Assuming you have a Mechanical service image
import OilChange from "../public/OilChange.jpg"; // Assuming you have an Oil Change service image
import lubricant from "../public/lubricant.jpg"; // Assuming you have an Oil Change service image
import {
  Zap,
  Settings,
  Wind,
  Droplet,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

export default function Services() {
  const services = [
    {
      title: "Electrical Services",
      description:
        "Complete electrical diagnostics and car electrical repair in Multan for all vehicle systems including battery, alternator, and starter issues. Best auto workshop for electrical service in Multan.",
      icon: <Zap className="h-12 w-12 text-gold-500" />,
    },
    {
      title: "Mechanical Repairs",
      description:
        "Expert mechanical repairs in Multan including engine diagnostics, brake service, suspension work, and transmission repair. Trusted car repair and workshop in Multan.",
      icon: <Settings className="h-12 w-12 text-gold-500" />,
    },
    {
      title: "AC Service & Repair",
      description:
        "Full AC system diagnostics, car AC repair, and recharge in Multan to keep you cool and comfortable all year round. Best car AC workshop in Multan.",
      icon: <Wind className="h-12 w-12 text-gold-500" />,
    },
    {
      title: "Oil Change Service",
      description:
        "Professional oil change service in Multan using premium quality oils and filters to extend your engine's life. Reliable car maintenance and auto service in Multan.",
      icon: <Droplet className="h-12 w-12 text-gold-500" />,
    },
  ];

  // Add a type for gallery items to allow optional poster for videos
  type GalleryItem = {
    type: "image" | "video";
    src: string;
    alt: string;
    poster?: string;
  };

  // For best performance, add a 'poster' property to each video item (e.g., poster: "/my-thumbnail.jpg")
  const gallery: GalleryItem[] = [
    {
      type: "image",
      src: AC.src,
      alt: "AC Service at Assembly Line Car Workshop Multan",
    },
    {
      type: "image",
      src: Mechanical.src,
      alt: "Mechanical Repair at Assembly Line Car Workshop Multan",
    },
    {
      type: "image",
      src: Electrical.src,
      alt: "Electrical Service at Assembly Line Car Workshop Multan",
    },
    {
      type: "image",
      src: OilChange.src,
      alt: "Oil Change at Assembly Line Car Workshop Multan",
    },
    {
      type: "image",
      src: lubricant.src,
      alt: "Lubricants at Assembly Line Car Workshop Multan",
    },
    {
      type: "video",
      src: "/BMW_oilChange.mp4",
      alt: "BMW Oil Change Video - Assembly Line Car Workshop Multan",
      poster: "/BMW_oilChange-thumbnail.jpg",
    },
    {
      type: "video",
      src: "/beforeVsAferBrakeOilFlush.mp4",
      alt: "Brake Oil Flush Video - Assembly Line Car Workshop Multan",
      poster: "/beforeVsAferBrakeOilFlush-thumbnail.jpg",
    },
    {
      type: "video",
      src: "/brake_oil_inspection.mp4",
      alt: "Brake Oil Inspection Video - Assembly Line Car Workshop Multan",
      poster: "/brake_oil_inspection-thumbnail.jpg",
    },
    {
      type: "video",
      src: "/CoolantBenefits.mp4",
      alt: "Coolant Benefits Video - Assembly Line Car Workshop Multan",
      poster: "/CoolantBenefits-thumbnail.jpg",
    },
    {
      type: "video",
      src: "/Diff_new_old_plug.mp4",
      alt: "Difference between New and Old Plug Video - Assembly Line Car Workshop Multan",
      poster: "/Diff_new_old_plug-thumbnail.jpg",
    },
    {
      type: "video",
      src: "/fuelInjectorCleaning.mp4",
      alt: "Fuel Injector Cleaning Video - Assembly Line Car Workshop Multan",
      poster: "/fuelInjectorCleaning-thumbnail.jpg",
    },
    {
      type: "video",
      src: "/sparkPlug.mp4",
      alt: "Spark Plug Video - Assembly Line Car Workshop Multan",
      poster: "/sparkPlug-thumbnail.jpg",
    },
  ];

  const galleryRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const updateScroll = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    updateScroll();
    el.addEventListener("scroll", updateScroll);
    window.addEventListener("resize", updateScroll);
    return () => {
      el.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  return (
    <>
      <section id="services" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div
            className="absolute inset-0 bg-center bg-cover opacity-30"
            style={{
              backgroundImage: `url(${heroPic.src})`,
              backgroundAttachment: "fixed",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/90 to-navy-900/80"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-gold-500/20 to-gold-300/20 rounded-full px-4 py-1 backdrop-blur-sm border border-gold-500/20 mb-4">
              <span className="text-gold-300 font-medium">What We Do Best</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Impact'] tracking-wide text-white">
              OUR <span className="text-gold-500">SERVICES</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We offer comprehensive automotive services using cutting-edge
              technology and expert technicians.
            </p>
          </div>
          {/* Services grid: 2x2 on large screens, 1 column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {services.map((service, index) => (
              <Card
                key={index}
                className={cn(
                  "bg-navy-800/50 backdrop-blur-sm border-navy-700 hover:border-gold-500/50 transition-all duration-300 cursor-pointer"
                )}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-white flex items-center">
                    <div className="mr-3 text-gold-500">{service.icon}</div>
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-400">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <div
                    className="text-gold-500 hover:text-gold-400 inline-flex items-center gap-2 text-sm font-medium"
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Book Service <ArrowRight size={16} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Gallery Section */}
      <section id="gallery" className="py-20 bg-navy-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Impact'] tracking-wide text-white">
              OUR <span className="text-gold-500">GALLERY</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Explore photos and videos of our workshop, services, and satisfied
              customers at Assembly Line Car Workshop Multan.
            </p>
          </div>
          <div className="relative">
            {/* Gallery navigation arrows */}
            {canScrollLeft && (
              <button
                type="button"
                aria-label="Scroll gallery left"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-navy-800/80 hover:bg-gold-500 text-gold-500 hover:text-navy-900 rounded-full p-2 shadow-lg transition"
                onClick={() => {
                  const el = galleryRef.current;
                  if (el) el.scrollBy({ left: -300, behavior: "smooth" });
                }}
              >
                <ChevronLeft size={28} />
              </button>
            )}
            {canScrollRight && (
              <button
                type="button"
                aria-label="Scroll gallery right"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-navy-800/80 hover:bg-gold-500 text-gold-500 hover:text-navy-900 rounded-full p-2 shadow-lg transition"
                onClick={() => {
                  const el = galleryRef.current;
                  if (el) el.scrollBy({ left: 300, behavior: "smooth" });
                }}
              >
                <ChevronRight size={28} />
              </button>
            )}
            <div
              id="gallery-scroll"
              ref={galleryRef}
              className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
              style={{ scrollBehavior: "smooth" }}
            >
              {gallery.map((item, idx) =>
                item.type === "image" ? (
                  <img
                    key={idx}
                    src={item.src}
                    alt={item.alt}
                    className="h-72 w-auto rounded-xl border border-gold-500 shadow-lg object-cover flex-shrink-0 first:ml-0 last:mr-0"
                    loading="lazy"
                  />
                ) : (
                  <video
                    key={idx}
                    src={item.src}
                    controls
                    preload="none"
                    poster={item.poster || undefined}
                    className="h-72 w-auto rounded-xl border border-gold-500 shadow-lg object-cover flex-shrink-0 first:ml-0 last:mr-0"
                  >
                    Your browser does not support the video tag.
                  </video>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
