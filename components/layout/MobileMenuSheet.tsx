"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import type { Category, Brand } from "@/lib/types";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  brands: Brand[];
  user: SupabaseUser | null;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/products" },
  { label: "Contact Us", href: "/contact" },
];

export default function MobileMenuSheet({ isOpen, onClose, categories, brands, user }: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sheet */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl shadow-2xl flex flex-col max-h-[88vh] transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Close row */}
        <div className="flex items-center justify-between px-5 pb-3 flex-shrink-0">
          <span className="text-base font-bold text-gray-900">Menu</span>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 pb-2">
            {/* Main links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between py-3.5 px-2 text-base font-semibold text-gray-800 border-b border-gray-50 hover:text-yellow-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Shop by Brand */}
            {brands.length > 0 && (
              <div className="py-2">
                <p className="px-2 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Shop by Brand</p>
                {brands.map((b) => (
                  <Link
                    key={b.id}
                    href={`/products?brand=${b.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between py-2.5 px-2 text-sm text-gray-700 hover:text-yellow-600 transition-colors"
                  >
                    {b.name}
                    <ChevronRight size={15} className="text-gray-300" />
                  </Link>
                ))}
              </div>
            )}

            {/* Shop by Category */}
            {categories.length > 0 && (
              <div className="py-2 border-t border-gray-50">
                <p className="px-2 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</p>
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/products?category=${c.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between py-2.5 px-2 text-sm text-gray-700 hover:text-yellow-600 transition-colors"
                  >
                    {c.name}
                    <ChevronRight size={15} className="text-gray-300" />
                  </Link>
                ))}
              </div>
            )}
          </nav>
        </div>

        {/* Bottom: login / social */}
        <div className="flex-shrink-0 px-5 py-4 border-t border-gray-100">
          {user ? (
            <div className="flex gap-3">
              <Link
                href="/account"
                onClick={onClose}
                className="flex-1 text-center py-3 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                My Account
              </Link>
              <Link
                href="/account/orders"
                onClick={onClose}
                className="flex-1 text-center py-3 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                My Orders
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center gap-2 bg-black text-white font-semibold px-5 py-3 rounded-full text-sm w-fit"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
