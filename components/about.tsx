"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import aboutPic from "../public/about.jpg"; // Assuming you have an about image
export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("about-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const highlights = [
    "State-of-the-art diagnostic equipment",
    "Certified master technicians",
    "Genuine parts and quality materials",
    "10+ years of automotive expertise",
    "Transparent pricing with no hidden fees",
    "Warranty on all repairs and services",
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-navy-800">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>

      <div id="about-section" className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={cn(
              "relative transition-all duration-1000 transform",
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            )}
          >
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-gold-300/20 rounded-lg transform -rotate-2"></div>
              <div className="absolute inset-2 rounded-lg transform rotate-1 overflow-hidden">
                <img
                  src={aboutPic.src}
                  alt="Auto workshop mechanics working on a car"
                  className="object-contain rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
                />
              </div>
            </div>

            {/* 3D badge */}
            <div className="absolute -bottom-6 -right-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg blur-sm"></div>
                <div className="relative bg-navy-900 text-white p-6 rounded-lg border border-navy-800">
                  <p className="text-3xl font-bold text-gold-500">10+</p>
                  <p className="text-sm uppercase font-medium">
                    Years Experience
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "transition-all duration-1000 delay-300 transform",
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            )}
          >
            <div className="inline-block bg-gradient-to-r from-gold-500/20 to-gold-300/20 rounded-full px-4 py-1 backdrop-blur-sm border border-gold-500/20 mb-4">
              <span className="text-gold-300 font-medium">Our Story</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Impact'] tracking-wide text-white">
              ABOUT <span className="text-gold-500">ASSEMBLY LINE</span>
            </h2>
            <p className="text-zinc-400 mb-6">
              Assembly Line Auto Repair is a leading car workshop in Multan,
              offering expert car repair, maintenance, and diagnostics for all
              makes and models. Since 2025, we have been at the forefront of
              automotive repair technology. We combine traditional expertise
              with cutting-edge diagnostic equipment to deliver unparalleled
              service in Multan.
            </p>
            <p className="text-zinc-400 mb-8">
              Our workshop is equipped with the computerized diagnostics, and
              specialized tools that allow us to work on everything from classic
              cars to the newest electric vehicles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-2 group">
                  <CheckCircle className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0 group-hover:text-gold-400 transition-colors" />
                  <span className="text-zinc-300 group-hover:text-white transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
