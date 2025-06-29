"use client";
import GoogleMap from "./GoogleMap";
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import BookingForm from "./booking-form";
import { cn } from "@/lib/utils";
import assemblyLine from "../public/AssemblyLine.jpg";
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

    const element = document.getElementById("contact-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-gold-500" />,
      title: "Our Location",
      details: "Assembly line 5 marla scheme MPS road, Multan",
    },
    {
      icon: <Phone className="h-5 w-5 text-gold-500" />,
      title: "Phone Number",
      details: "+92 3224188020",
    },
    {
      icon: <Mail className="h-5 w-5 text-gold-500" />,
      title: "Email Address",
      details: "assemblyline15@gmail.com",
    },
    {
      icon: <Clock className="h-5 w-5 text-gold-500" />,
      title: "Working Hours",
      details: "Mon-Sun: 9AM-9PM, Fri: Closed",
    },
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-navy-900"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>

      <div
        id="contact-section"
        className="container mx-auto px-4 relative z-10"
      >
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-gold-500/20 to-gold-300/20 rounded-full px-4 py-1 backdrop-blur-sm border border-gold-500/20 mb-4">
            <span className="text-gold-300 font-medium">Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Impact'] tracking-wide text-white">
            BOOK YOUR <span className="text-gold-500">SERVICE</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Have questions or ready to book an appointment? Contact us today and
            our team will be happy to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div
            className={cn(
              "transition-all duration-1000 transform",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            )}
          >
            <div className="bg-navy-800/50 backdrop-blur-sm p-8 rounded-lg border border-navy-700 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="mt-1 relative">
                      <div className="absolute -inset-1 bg-gold-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity"></div>
                      <div className="relative">{item.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        {item.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D workshop illustration */}

            <GoogleMap />
            {/* 3D elements */}
            <div className="absolute  left-0 right-0 text-center ">
              <h3 className="text-xl font-bold text-white ">
                Visit Our Workshop
              </h3>
              <p className="text-zinc-400 ">
                Experience our state-of-the-art facility
              </p>
            </div>
          </div>

          <div
            className={cn(
              "transition-all duration-1000 delay-300 transform mt-10",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            )}
          >
            <div className="bg-navy-800/50 backdrop-blur-sm p-8 rounded-lg border border-navy-700 relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 border border-gold-500/20 rounded-full transform -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border border-gold-500/20 rounded-lg transform translate-y-1/2 -translate-x-1/2 rotate-45"></div>

              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
