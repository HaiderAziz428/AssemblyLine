"use client";

import GoogleMap from "./GoogleMap";
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import BookingForm from "./booking-form";
import { cn } from "@/lib/utils";
import { BUSINESS } from "@/lib/constants";

const contactInfo = [
  {
    icon: <MapPin className="h-5 w-5 text-gold-500" aria-hidden="true" />,
    title: "Our Location",
    details: BUSINESS.address,
    href: BUSINESS.mapsUrl,
  },
  {
    icon: <Phone className="h-5 w-5 text-gold-500" aria-hidden="true" />,
    title: "Phone Number",
    details: BUSINESS.phone,
    href: `tel:${BUSINESS.phoneRaw}`,
  },
  {
    icon: <Mail className="h-5 w-5 text-gold-500" aria-hidden="true" />,
    title: "Email Address",
    details: BUSINESS.email,
    href: `mailto:${BUSINESS.email}`,
  },
  {
    icon: <Clock className="h-5 w-5 text-gold-500" aria-hidden="true" />,
    title: "Working Hours",
    details: BUSINESS.hours,
  },
];

export default function Contact() {
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

    const el = document.getElementById("contact-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-900" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" aria-hidden="true" />

      <div
        id="contact-section"
        className="container mx-auto px-4 relative z-10"
      >
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-gold-500/20 to-gold-300/20 rounded-full px-4 py-1 backdrop-blur-sm border border-gold-500/20 mb-4">
            <span className="text-gold-300 font-medium">Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-oswald tracking-wide text-white">
            BOOK YOUR <span className="text-gold-500">SERVICE</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Have questions or ready to book an appointment? Contact us today and our team will be happy to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info + map */}
          <div
            className={cn(
              "transition-all duration-1000 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          >
            <div className="bg-navy-800/50 backdrop-blur-sm p-8 rounded-lg border border-navy-700 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="mt-1 relative flex-shrink-0">
                      <div className="absolute -inset-1 bg-gold-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity" />
                      <div className="relative">{item.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-zinc-400 group-hover:text-zinc-300 hover:text-gold-400 transition-colors"
                        >
                          {item.details}
                        </a>
                      ) : (
                        <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                          {item.details}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xl font-bold text-white mb-1">Visit Our Workshop</p>
              <p className="text-zinc-400 mb-4 text-sm">Experience our state-of-the-art facility</p>
              <GoogleMap />
            </div>
          </div>

          {/* Booking form */}
          <div
            className={cn(
              "transition-all duration-1000 delay-300 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          >
            <div className="bg-navy-800/50 backdrop-blur-sm p-8 rounded-lg border border-navy-700 relative">
              <div className="absolute top-0 right-0 w-20 h-20 border border-gold-500/20 rounded-full transform -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border border-gold-500/20 rounded-lg transform translate-y-1/2 -translate-x-1/2 rotate-45" aria-hidden="true" />
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
