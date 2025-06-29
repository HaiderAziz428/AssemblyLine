import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oil Change in Multan | Fast & Affordable Oil Change Service",
  description:
    "Extend your engine's life with premium oil change services in Multan. Assembly Line Auto Repair offers quick, affordable oil and filter changes by certified technicians. Book your oil change online today!",
  keywords: [
    "oil change Multan",
    "car oil change",
    "engine oil replacement",
    "auto oil service",
    "Assembly Line Auto Repair",
    "vehicle oil maintenance",
    "best oil change Multan",
    "car oil filter replacement",
    "auto workshop Multan",
  ].join(", "),
};

export default function OilChangePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gold-500">
        Oil Change in Multan
      </h1>
      <p className="text-lg text-zinc-400 mb-6 max-w-2xl">
        Keep your engine running smoothly with our fast and affordable oil
        change service. Our certified technicians use high-quality oils and
        filters to ensure maximum engine protection and performance.
      </p>
      <ul className="list-disc pl-6 text-zinc-300 mb-6">
        <li>Premium engine oil and filter replacement</li>
        <li>Quick service – most oil changes done in 30 minutes</li>
        <li>All makes and models serviced</li>
        <li>Engine health check included</li>
        <li>Transparent pricing, no hidden fees</li>
      </ul>
      <p className="text-lg text-zinc-400 mb-8 max-w-2xl">
        Don't wait for engine trouble! Book your oil change online or call us
        for a quick appointment. We guarantee genuine parts and expert service.
      </p>
      <a
        href="/contact"
        className="inline-block bg-gold-500 text-navy-900 font-bold px-6 py-3 rounded-lg shadow hover:bg-gold-400 transition"
      >
        Book Your Oil Change Now
      </a>
    </main>
  );
}
