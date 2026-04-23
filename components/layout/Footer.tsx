import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-14 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <Image src="/Car.webp" alt="Assembly Line" width={140} height={56} className="h-14 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Pakistan&apos;s trusted source for professional car care, detailing products, and accessories.
            </p>
            <div className="flex gap-3">
              <a href="#" className="bg-gray-800 hover:bg-yellow-500 h-9 w-9 rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-yellow-500 h-9 w-9 rounded-full flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                { label: "All Products", href: "/products" },
                { label: "My Account", href: "/account" },
                { label: "My Orders", href: "/account/orders" },
                { label: "Wishlist", href: "/account/wishlist" },
                { label: "Contact Us", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-yellow-500 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Policies</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                "Return Policy",
                "Shipping Policy",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((l) => (
                <li key={l}>
                  <span className="hover:text-yellow-500 transition-colors cursor-pointer">{l}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Phone size={15} className="mt-0.5 flex-shrink-0 text-yellow-500" />
                <span>03356630319</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={15} className="mt-0.5 flex-shrink-0 text-yellow-500" />
                <span>support@autoshop.pk</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-yellow-500" />
                <span>Pakistan</span>
              </li>
            </ul>

            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              {["Cash on Delivery", "Easy Returns", "Genuine Products"].map((b) => (
                <span key={b} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                  ✓ {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Assembly Line. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
