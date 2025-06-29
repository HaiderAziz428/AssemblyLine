import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electrical Repair in Multan | Car Electrical Services",
  description:
    "Expert car electrical repair and diagnostics in Multan. Assembly Line Auto Repair fixes battery, alternator, starter, and wiring issues for all makes and models. Book your electrical repair online today!",
  keywords: [
    "electrical repair Multan",
    "car electrical service",
    "auto electrical diagnostics",
    "battery replacement",
    "alternator repair",
    "starter repair",
    "wiring issues",
    "Assembly Line Auto Repair",
    "auto workshop Multan",
  ].join(", "),
};

export default function ElectricalRepairPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gold-500">
        Electrical Repair in Multan
      </h1>
      <p className="text-lg text-zinc-400 mb-6 max-w-2xl">
        Get your car's electrical system diagnosed and repaired by experts. We
        handle everything from battery and alternator issues to complex wiring
        and starter problems, using advanced diagnostic tools.
      </p>
      <ul className="list-disc pl-6 text-zinc-300 mb-6">
        <li>Battery testing and replacement</li>
        <li>Alternator and starter repair</li>
        <li>Wiring and fuse diagnostics</li>
        <li>Lighting and accessory repair</li>
        <li>All makes and models serviced</li>
      </ul>
      <p className="text-lg text-zinc-400 mb-8 max-w-2xl">
        Electrical issues can leave you stranded. Book your electrical repair
        online or call us for fast, reliable service. We guarantee expert
        diagnostics and genuine parts.
      </p>
      <a
        href="/contact"
        className="inline-block bg-gold-500 text-navy-900 font-bold px-6 py-3 rounded-lg shadow hover:bg-gold-400 transition"
      >
        Book Your Electrical Repair Now
      </a>
    </main>
  );
}
