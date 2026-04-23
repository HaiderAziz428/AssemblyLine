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
  title: "Assembly Line Car Workshop Multan | Best Car Repair & Auto Service",
  description:
    "Multan's trusted car workshop since 2020. Expert oil change, AC repair, brake service & electrical repairs at MPS Road, 5 Marla Scheme. Book online!",
  alternates: {
    canonical: "https://www.assemblylineworkshop.com/",
  },
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
