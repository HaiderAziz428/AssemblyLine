"use client";

import { useState } from "react";
import { Zap, Settings, Wind, Droplet, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Services() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: "Electrical Services",
      description:
        "Complete electrical diagnostics and repair for all vehicle systems including battery, alternator, and starter issues.",
      icon: <Zap className="h-12 w-12 text-gold-500" />,
      bgImage: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Mechanical Repairs",
      description:
        "Expert mechanical repairs including engine diagnostics, brake service, suspension work, and transmission repair.",
      icon: <Settings className="h-12 w-12 text-gold-500" />,
      bgImage: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "AC Service & Repair",
      description:
        "Full AC system diagnostics, repair, and recharge to keep you cool and comfortable all year round.",
      icon: <Wind className="h-12 w-12 text-gold-500" />,
      bgImage: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Oil Change Service",
      description:
        "Professional oil change service using premium quality oils and filters to extend your engine's life.",
      icon: <Droplet className="h-12 w-12 text-gold-500" />,
      bgImage: "/placeholder.svg?height=300&width=400",
    },
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-navy-900"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]"></div>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D-like service display */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-gold-500/10 order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-900 z-0"></div>

            {/* Service background images with transition */}
            {services.map((service, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 bg-cover bg-center transition-all duration-700",
                  activeService === index ? "opacity-20" : "opacity-0"
                )}
                style={{ backgroundImage: `url(${service.bgImage})` }}
              ></div>
            ))}

            {/* Service icon with 3D effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <div className="absolute -inset-10 bg-gold-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
                {services[activeService].icon}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-navy-900 to-transparent"></div>
            <div className="absolute top-10 left-10 w-20 h-20 border border-gold-500/20 rounded-lg transform rotate-12"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border border-gold-500/20 rounded-full"></div>
          </div>

          {/* Service selection */}
          <div className="space-y-6 order-1 lg:order-2">
            {services.map((service, index) => (
              <Card
                key={index}
                className={cn(
                  "bg-navy-800/50 backdrop-blur-sm border-navy-700 hover:border-gold-500/50 transition-all duration-300 cursor-pointer",
                  activeService === index && "border-l-4 border-l-gold-500"
                )}
                onClick={() => setActiveService(index)}
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
      </div>
    </section>
  );
}
