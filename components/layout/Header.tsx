"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search, ShoppingCart, User, Heart, ChevronDown, LogOut, Settings, Package,
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useCartStore } from "@/lib/store";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { Profile, Category, Brand } from "@/lib/types";
import SearchPanel from "./SearchPanel";
import MobileMenuSheet from "./MobileMenuSheet";
import MobileBottomNav from "./MobileBottomNav";

interface HeaderProps {
  categories?: Category[];
  brands?: Brand[];
}

export default function Header({ categories = [], brands = [] }: HeaderProps) {
  const router = useRouter();
  const supabase = createClient();
  const cartCount = useCartStore((s) => s.count());

  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Auth
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        supabase.from("profiles").select("*").eq("id", data.user.id).single()
          .then(({ data: p }) => setProfile(p));
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) setProfile(null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // Scroll hide/show
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setUserMenuOpen(false);
    router.push("/");
  };

  const isAdmin =
    profile?.is_admin === true ||
    user?.app_metadata?.is_admin === true ||
    user?.user_metadata?.is_admin === true;

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Announcement bar */}
        <div className="bg-black text-white text-xs py-2 text-center font-medium tracking-wide">
          🚗 Free Delivery on orders above Rs. 3,000 &nbsp;|&nbsp; Cash on Delivery Available
        </div>

        {/* ── Desktop main header ── */}
        <div className="hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-6 h-16">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image src="/logo.PNG" alt="Assembly Line Logo" width={120} height={48} className="h-12 w-auto object-contain" priority />
              </Link>

              {/* Nav */}
              <nav className="flex items-center gap-1 flex-1 text-sm font-medium">
                <Link href="/" className="px-3 py-1.5 hover:text-yellow-500 transition-colors whitespace-nowrap">Home</Link>

                {/* Shop by Brand */}
                <div
                  className="relative"
                  onMouseEnter={() => setBrandOpen(true)}
                  onMouseLeave={() => setBrandOpen(false)}
                >
                  <button className="flex items-center gap-1 px-3 py-1.5 hover:text-yellow-500 transition-colors whitespace-nowrap">
                    Shop by Brand <ChevronDown size={13} />
                  </button>
                  {brandOpen && brands.length > 0 && (
                    <div className="absolute left-0 top-full pt-1 w-52 z-50">
                      <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-2">
                        {brands.map((b) => (
                          <Link key={b.id} href={`/products?brand=${b.slug}`}
                            className="block px-4 py-2 hover:bg-gray-50 hover:text-yellow-500 transition-colors text-sm">
                            {b.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Categories */}
                <div
                  className="relative"
                  onMouseEnter={() => setCategoryOpen(true)}
                  onMouseLeave={() => setCategoryOpen(false)}
                >
                  <button className="flex items-center gap-1 px-3 py-1.5 hover:text-yellow-500 transition-colors whitespace-nowrap">
                    Categories <ChevronDown size={13} />
                  </button>
                  {categoryOpen && categories.length > 0 && (
                    <div className="absolute left-0 top-full pt-1 w-52 z-50">
                      <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-2">
                        {categories.map((c) => (
                          <Link key={c.id} href={`/products?category=${c.slug}`}
                            className="block px-4 py-2 hover:bg-gray-50 hover:text-yellow-500 transition-colors text-sm">
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link href="/products" className="px-3 py-1.5 hover:text-yellow-500 transition-colors whitespace-nowrap">All Products</Link>
                <Link href="/contact" className="px-3 py-1.5 hover:text-yellow-500 transition-colors whitespace-nowrap">Contact Us</Link>
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {/* Search button */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 hover:text-yellow-500 transition-colors rounded-lg hover:bg-gray-50"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>

                {/* Wishlist */}
                <Link href="/account/wishlist" className="p-2 hover:text-yellow-500 transition-colors rounded-lg hover:bg-gray-50" aria-label="Wishlist">
                  <Heart size={20} />
                </Link>

                {/* Cart */}
                <Link href="/cart" className="relative p-2 hover:text-yellow-500 transition-colors rounded-lg hover:bg-gray-50" aria-label="Cart">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-yellow-500 text-black text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>

                {/* Account */}
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen((o) => !o)}
                      className="flex items-center gap-1.5 px-3 py-2 hover:text-yellow-500 transition-colors rounded-lg hover:bg-gray-50 text-sm font-medium"
                    >
                      <User size={18} />
                      <span className="max-w-[90px] truncate">{profile?.full_name?.split(" ")[0] ?? "Account"}</span>
                      <ChevronDown size={13} />
                    </button>
                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
                        {isAdmin && (
                          <Link href="/admin" onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 text-yellow-600 font-medium">
                            <Settings size={15} /> Admin Panel
                          </Link>
                        )}
                        <Link href="/account" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                          <User size={15} /> My Account
                        </Link>
                        <Link href="/account/orders" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                          <Package size={15} /> My Orders
                        </Link>
                        <Link href="/account/wishlist" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                          <Heart size={15} /> Wishlist
                        </Link>
                        <hr className="my-1" />
                        <button onClick={handleLogout}
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 text-red-500 w-full">
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login"
                    className="flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors ml-1">
                    <User size={15} /> Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile main header ── */}
        <div className="md:hidden">
          <div className="flex items-center justify-between px-4 h-14">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo.PNG" alt="Assembly Line Logo" width={100} height={40} className="h-10 w-auto object-contain" priority />
            </Link>

            {/* Right icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:text-yellow-500 transition-colors"
                aria-label="Search"
              >
                <Search size={22} />
              </button>
              <Link href="/cart" className="relative p-2 hover:text-yellow-500 transition-colors" aria-label="Cart">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-yellow-500 text-black text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search panel (desktop right / mobile bottom) */}
      <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile menu bottom sheet */}
      <MobileMenuSheet
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        categories={categories}
        brands={brands}
        user={user}
      />

      {/* Mobile bottom nav */}
      <MobileBottomNav
        onMenuOpen={() => setMenuOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />
    </>
  );
}
