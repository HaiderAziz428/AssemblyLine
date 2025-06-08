"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  ThumbsUp,
  PenToolIcon as Tool,
  Shield,
  DollarSign,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import heroPic from "../public/Hero.jpg"; // Assuming you have a hero image
export default function WhyChooseUs() {
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

    const element = document.getElementById("why-choose-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const reasons = [
    {
      icon: <Clock className="h-10 w-10 text-gold-500" />,
      title: "Fast Turnaround",
      description:
        "We value your time and work efficiently to get you back on the road quickly.",
    },
    {
      icon: <ThumbsUp className="h-10 w-10 text-gold-500" />,
      title: "Customer Satisfaction",
      description:
        "Our 5-star reviews speak for themselves. We prioritize your satisfaction.",
    },
    {
      icon: <Tool className="h-10 w-10 text-gold-500" />,
      title: "Advanced Equipment",
      description:
        "We use the latest diagnostic tools and equipment for accurate repairs.",
    },
    {
      icon: <Shield className="h-10 w-10 text-gold-500" />,
      title: "Warranty Protection",
      description:
        "All our repairs and services come with a comprehensive warranty.",
    },
    {
      icon: <DollarSign className="h-10 w-10 text-gold-500" />,
      title: "Competitive Pricing",
      description:
        "Quality service at fair prices with no hidden fees or surprises.",
    },
    {
      icon: <Award className="h-10 w-10 text-gold-500" />,
      title: "Certified Experts",
      description:
        "Our technicians are certified and continuously trained on the latest technologies.",
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 relative overflow-hidden">
      {/* 3D background with parallax effect */}
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

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>

      <div
        id="why-choose-section"
        className="container mx-auto px-4 relative z-10"
      >
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-gold-500/20 to-gold-300/20 rounded-full px-4 py-1 backdrop-blur-sm border border-gold-500/20 mb-4">
            <span className="text-gold-300 font-medium">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Impact'] tracking-wide text-white">
            THE <span className="text-gold-500">ASSEMBLY LINE</span> ADVANTAGE
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            We're committed to providing exceptional service and building
            long-term relationships with our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={cn(
                "group bg-navy-900/80 backdrop-blur-sm p-6 rounded-lg border border-navy-800 hover:border-gold-500/50 transition-all duration-500 transform",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0",
                `transition-delay-${index * 100}`
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 relative">
                <div className="absolute -inset-2 bg-gold-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                <div className="relative">{reason.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gold-400 transition-colors">
                {reason.title}
              </h3>
              <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
