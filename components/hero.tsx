"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Wrench, Settings, ChevronDown } from "lucide-react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      id="home"
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-no-repeat bg-center bg-cover "
    >
      {/* 3D-like background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl"></div>

        {/* Animated gear elements */}
        <div
          className={`absolute top-[20%] right-[10%] w-24 md:w-32 h-32 opacity-20 transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-20" : "translate-y-10 opacity-0"
          }`}
        >
          <Settings className="w-full h-full text-gold-500 animate-pulse" />
        </div>
        <div
          className={`absolute bottom-[15%] left-[10%]  w-24 md:w-40 h-40 opacity-20 transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-20" : "translate-y-10 opacity-0"
          }`}
        >
          <Wrench className="w-full h-full text-gold-500 animate-pulse " />
        </div>
      </div>

      {/* Grid overlay */}
      <div className=" bg-grid-white/[0.02] bg-[length:50px_50px]"></div>

      {/* Content */}
      <div className=" absolute bottom-14 container  px-4   z-10">
        <div className="max-w-3xl mx-auto flex justify-center items-center h-full">
          <div
            className={` space-y-6 text-center transition-all duration-1000  ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-['Impact'] tracking-wider text-gold-500">
                <span className="block text-3xl md:text-4xl lg:text-5xl text-white mt-2">
                  AUTO REPAIR
                </span>
              </h1>
            </div>
            <div className="relative">
              <Button
                size="lg"
                className="relative bg-navy-800 hover:bg-navy-700 text-gold-500 border border-gold-500/30 text-lg px-8 py-6 rounded-lg font-bold"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Book Your Service Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div
          onClick={() =>
            document
              .getElementById("services")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="cursor-pointer text-gold-500 hover:text-gold-300 transition-colors"
        >
          <ChevronDown size={32} />
          <span className="sr-only">Scroll Down</span>
        </div>
      </div>
    </section>
  );
}
