import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Delivery", desc: "On orders above Rs. 3,000" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day return policy" },
  { icon: ShieldCheck, title: "Genuine Products", desc: "100% authentic brands" },
  { icon: Headphones, title: "24/7 Support", desc: "WhatsApp & Phone support" },
];

export default function TrustBar() {
  return (
    <div className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <Icon size={28} className="text-yellow-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-gray-400 text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
