import type { Metadata } from "next";
import Hero from "@/components/hero";
import Services from "@/components/services";
import About from "@/components/about";
import WhyChooseUs from "@/components/why-choose-us";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingCta from "@/components/floating-cta";

export const metadata: Metadata = {
  title: "Assembly Line Car Workshop | Professional Car Services",
  description:
    "Expert automotive services including electrical, mechanical, AC work, and oil changes. Book your appointment today!",
  keywords:
    "car workshop, auto repair, mechanical services, oil change, AC repair, electrical services",
};

export default function Home() {
  return (
    <div className="relative bg-navy-900 text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <WhyChooseUs />
        <Testimonials />
        <Contact />
      </main>
      <FloatingCta />
      <Footer />
    </div>
  );
}
