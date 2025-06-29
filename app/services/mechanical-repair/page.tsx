import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mechanical Repair in Multan | Engine, Suspension & Brake Service",
  description:
    "Comprehensive mechanical repair for engines, brakes, suspension, and more in Multan. Assembly Line Auto Repair offers expert diagnostics and repairs for all makes and models. Book your mechanical repair online today!",
  keywords: [
    "mechanical repair Multan",
    "engine repair",
    "brake service",
    "suspension repair",
    "auto diagnostics",
    "Assembly Line Auto Repair",
    "car workshop Multan",
    "vehicle repair Multan",
    "auto workshop Multan",
  ].join(", "),
};

export default function MechanicalRepairPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gold-500">
        Mechanical Repair in Multan
      </h1>
      <p className="text-lg text-zinc-400 mb-6 max-w-2xl">
        Restore your car's performance with our comprehensive mechanical repair
        services. From engine diagnostics to brake and suspension repairs, our
        certified technicians handle it all with precision and care.
      </p>
      <ul className="list-disc pl-6 text-zinc-300 mb-6">
        <li>Engine diagnostics and repair</li>
        <li>Brake inspection and service</li>
        <li>Suspension and steering repair</li>
        <li>Transmission service</li>
        <li>All makes and models serviced</li>
      </ul>
      <p className="text-lg text-zinc-400 mb-8 max-w-2xl">
        Don't ignore warning signs! Book your mechanical repair online or call
        us for a quick appointment. We guarantee expert service and genuine
        parts.
      </p>
      <a
        href="/contact"
        className="inline-block bg-gold-500 text-navy-900 font-bold px-6 py-3 rounded-lg shadow hover:bg-gold-400 transition"
      >
        Book Your Mechanical Repair Now
      </a>
    </main>
  );
}
