import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AC Service in Multan | Car AC Repair & Maintenance",
  description:
    "Stay cool with expert AC repair and recharge services in Multan. Assembly Line Auto Repair offers fast, reliable car AC service by certified technicians. Book your AC service online today!",
  keywords: [
    "AC service Multan",
    "car AC repair",
    "auto AC recharge",
    "car air conditioning",
    "Assembly Line Auto Repair",
    "vehicle AC maintenance",
    "best AC service Multan",
    "car cooling repair",
    "auto workshop Multan",
  ].join(", "),
};

export default function ACServicePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gold-500">
        AC Service in Multan
      </h1>
      <p className="text-lg text-zinc-400 mb-6 max-w-2xl">
        Stay comfortable all year round with our expert car AC repair and
        maintenance services. Our certified technicians use state-of-the-art
        equipment to diagnose and fix any air conditioning issues, from
        refrigerant recharge to compressor repair.
      </p>
      <ul className="list-disc pl-6 text-zinc-300 mb-6">
        <li>AC performance diagnostics</li>
        <li>Refrigerant recharge</li>
        <li>Compressor and condenser repair</li>
        <li>Leak detection and sealing</li>
        <li>Cabin air filter replacement</li>
        <li>All makes and models serviced</li>
      </ul>
      <p className="text-lg text-zinc-400 mb-8 max-w-2xl">
        Don't let the heat slow you down! Book your AC service online or call us
        for a quick appointment. We guarantee transparent pricing, genuine
        parts, and fast turnaround.
      </p>
      <a
        href="/contact"
        className="inline-block bg-gold-500 text-navy-900 font-bold px-6 py-3 rounded-lg shadow hover:bg-gold-400 transition"
      >
        Book Your AC Service Now
      </a>
    </main>
  );
}
