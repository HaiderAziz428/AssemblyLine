"use client";

import { useEffect, useState } from "react";
import GoogleReviews from "./GoogleReviews";

export default function Testimonials() {
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

    const el = document.getElementById("testimonials-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="testimonials"
      className="py-20 relative overflow-hidden bg-navy-800"
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" aria-hidden="true" />

      <div
        id="testimonials-section"
        className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-gold-500/20 to-gold-300/20 rounded-full px-4 py-1 backdrop-blur-sm border border-gold-500/20 mb-4">
            <span className="text-gold-300 font-medium">Customer Reviews</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white font-oswald tracking-wide">
            CUSTOMER <span className="text-gold-500">REVIEWS</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our customers have to say about our services.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <GoogleReviews />
        </div>
      </div>
    </section>
  );
}
