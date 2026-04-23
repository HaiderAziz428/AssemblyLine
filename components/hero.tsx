"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Wrench, Settings, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      aria-label="Hero"
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />

        {/* Animated icons */}
        <div
          className={`absolute top-[20%] right-[10%] w-24 md:w-32 h-24 md:h-32 transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-20" : "translate-y-10 opacity-0"
          }`}
        >
          <Settings className="w-full h-full text-gold-500 animate-pulse" />
        </div>
        <div
          className={`absolute bottom-[15%] left-[10%] w-24 md:w-40 h-24 md:h-40 transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-20" : "translate-y-10 opacity-0"
          }`}
        >
          <Wrench className="w-full h-full text-gold-500 animate-pulse" />
        </div>

        {/* Hero car image — sized to fit viewport on all screen sizes */}
        <Image
          src="/Car.webp"
          alt="Blue car representing Assembly Line Auto Repair services in Multan"
          width={1200}
          height={800}
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 90vw"
          className="absolute top-1/2 left-1/2 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none select-none object-contain"
        />
      </div>

      {/* Hero content */}
      <div className="absolute bottom-14 container px-4 z-10">
        <div className="max-w-3xl mx-auto flex justify-center items-center">
          <div
            className={`space-y-6 text-center transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="font-oswald tracking-wider text-gold-500">
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold">
                ASSEMBLY LINE
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl text-white mt-2">
                AUTO REPAIR
              </span>
            </h1>

            <Button
              size="lg"
              className="bg-navy-800 hover:bg-navy-700 text-gold-500 border border-gold-500/30 text-lg px-8 py-6 rounded-lg font-bold"
              onClick={() => scrollTo("contact")}
            >
              Book Your Service Now
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <button
          onClick={() => scrollTo("services")}
          className="cursor-pointer text-gold-500 hover:text-gold-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
          aria-label="Scroll to services"
        >
          <ChevronDown size={32} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
