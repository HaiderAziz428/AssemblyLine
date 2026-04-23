"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, Search, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/lib/store";

interface Props {
  onMenuOpen: () => void;
  onSearchOpen: () => void;
}

export default function MobileBottomNav({ onMenuOpen, onSearchOpen }: Props) {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.count());

  const active = (href: string) =>
    pathname === href ? "text-yellow-500" : "text-gray-500";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 safe-area-pb">
      <div className="flex items-center justify-around h-14">
        {/* Home */}
        <Link href="/" className={`flex flex-col items-center gap-0.5 px-4 py-1 ${active("/")}`}>
          <Home size={22} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        {/* Menu */}
        <button
          onClick={onMenuOpen}
          className="flex flex-col items-center gap-0.5 px-4 py-1 text-gray-500 hover:text-yellow-500 transition-colors"
        >
          <Menu size={22} />
          <span className="text-[10px] font-medium">Menu</span>
        </button>

        {/* Search */}
        <button
          onClick={onSearchOpen}
          className="flex flex-col items-center gap-0.5 px-4 py-1 text-gray-500 hover:text-yellow-500 transition-colors"
        >
          <Search size={22} />
          <span className="text-[10px] font-medium">Search</span>
        </button>

        {/* Cart */}
        <Link href="/cart" className={`relative flex flex-col items-center gap-0.5 px-4 py-1 ${active("/cart")}`}>
          <div className="relative">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-black text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Cart</span>
        </Link>

        {/* Account */}
        <Link href="/account" className={`flex flex-col items-center gap-0.5 px-4 py-1 ${active("/account")}`}>
          <User size={22} />
          <span className="text-[10px] font-medium">Account</span>
        </Link>
      </div>
    </nav>
  );
}
