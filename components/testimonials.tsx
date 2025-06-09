"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import GoogleReviews from "./GoogleReviews";
export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

    const element = document.getElementById("testimonials-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const testimonials = [
    {
      name: "shahzaib ahmad",
      car: "Toyota Camry",
      rating: 5,
      text: "What really stood out was their honesty; they didn’t try to upsell unnecessary services, which is rare to find these days. The workshop was clean and well-organized, and the mechanics seemed experienced and genuinely interested in helping. I highly recommend (Assembly line) to anyone looking for reliable, trustworthy car servicing.",
    },
    {
      name: "Sarah Williams",
      car: "Honda Accord",
      rating: 5,
      text: "I've been taking my car here for years. Their oil change service is quick and they always do a thorough inspection. The staff is friendly and knowledgeable.",
    },
    {
      name: "David Thompson",
      car: "Ford F-150",
      rating: 5,
      text: "Had my AC fixed here and it's working better than when the truck was new! Fair pricing and they explained everything they were doing. Great experience.",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 relative overflow-hidden bg-navy-800"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>

      <div
        id="testimonials-section"
        className="container mx-auto px-4 relative z-10"
      >
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-gold-500/20 to-gold-300/20 rounded-full px-4 py-1 backdrop-blur-sm border border-gold-500/20 mb-4">
            <span className="text-gold-300 font-medium">Customer Reviews</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white font-['Impact'] tracking-wide">
            CUSTOMER <span className="text-gold-500">REVIEWS</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to
            say about our services.
          </p>
        </div>

        <main className="flex flex-col items-center">
          <h1>Our Reviews</h1>
          <GoogleReviews />
        </main>

      
      </div>
    </section>
  );
}
