"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, ShoppingCart, User, Heart, Menu, X, ChevronDown, LogOut, Settings, Package
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useCartStore } from "@/lib/store";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { Profile, Category, Brand } from "@/lib/types";

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
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single()
          .then(({ data: p }) => setProfile(p));
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setMobileOpen(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setUserMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      {/* Top announcement bar */}
      <div className="bg-black text-white text-xs py-2 text-center font-medium tracking-wide">
        🚗 Free Delivery on orders above Rs. 3,000 &nbsp;|&nbsp; Cash on Delivery Available
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 font-bold text-2xl tracking-tight">
            <span className="text-black">AUTO</span>
            <span className="text-yellow-500">SHOP</span>
          </Link>

          {/* Search bar — desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <div className="flex w-full rounded-full border-2 border-yellow-500 overflow-hidden">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="flex-1 px-4 py-2 text-sm outline-none bg-white"
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-400 px-4 transition-colors"
                aria-label="Search"
              >
                <Search size={18} className="text-black" />
              </button>
            </div>
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className="hidden sm:flex items-center gap-1 p-2 hover:text-yellow-500 transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 hover:text-yellow-500 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-1 p-2 hover:text-yellow-500 transition-colors"
                  aria-label="Account menu"
                  aria-expanded={userMenuOpen}
                >
                  <User size={20} />
                  <span className="hidden sm:block text-sm font-medium max-w-[100px] truncate">
                    {profile?.full_name?.split(" ")[0] ?? "Account"}
                  </span>
                  <ChevronDown size={14} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                    {profile?.is_admin && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 text-yellow-600 font-medium"
                      >
                        <Settings size={16} /> Admin Panel
                      </Link>
                    )}
                    <Link
                      href="/account"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      <User size={16} /> My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      <Package size={16} /> My Orders
                    </Link>
                    <Link
                      href="/account/wishlist"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      <Heart size={16} /> Wishlist
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 text-red-500 w-full"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
              >
                <User size={16} /> Login
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="flex rounded-full border-2 border-yellow-500 overflow-hidden">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <button type="submit" className="bg-yellow-500 px-4" aria-label="Search">
              <Search size={16} className="text-black" />
            </button>
          </form>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="hidden md:block border-t border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1 h-10 text-sm font-medium">
            <li>
              <Link href="/" className="px-3 py-1.5 hover:text-yellow-500 transition-colors">Home</Link>
            </li>

            {/* Shop by Brand */}
            <li className="relative group">
              <button
                className="flex items-center gap-1 px-3 py-1.5 hover:text-yellow-500 transition-colors"
                onMouseEnter={() => setBrandOpen(true)}
                onMouseLeave={() => setBrandOpen(false)}
              >
                Shop by Brand <ChevronDown size={14} />
              </button>
              {brandOpen && brands.length > 0 && (
                <div
                  className="absolute left-0 top-full w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
                  onMouseEnter={() => setBrandOpen(true)}
                  onMouseLeave={() => setBrandOpen(false)}
                >
                  {brands.map((b) => (
                    <Link
                      key={b.id}
                      href={`/products?brand=${b.slug}`}
                      className="block px-4 py-2 hover:bg-gray-50 hover:text-yellow-500 transition-colors"
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Shop by Category */}
            <li className="relative group">
              <button
                className="flex items-center gap-1 px-3 py-1.5 hover:text-yellow-500 transition-colors"
                onMouseEnter={() => setCategoryOpen(true)}
                onMouseLeave={() => setCategoryOpen(false)}
              >
                Categories <ChevronDown size={14} />
              </button>
              {categoryOpen && categories.length > 0 && (
                <div
                  className="absolute left-0 top-full w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
                  onMouseEnter={() => setCategoryOpen(true)}
                  onMouseLeave={() => setCategoryOpen(false)}
                >
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/products?category=${c.slug}`}
                      className="block px-4 py-2 hover:bg-gray-50 hover:text-yellow-500 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link href="/products" className="px-3 py-1.5 hover:text-yellow-500 transition-colors">All Products</Link>
            </li>
            <li>
              <Link href="/contact" className="px-3 py-1.5 hover:text-yellow-500 transition-colors">Contact Us</Link>
            </li>

            {!user && (
              <li className="ml-auto">
                <Link href="/register" className="text-yellow-600 hover:text-yellow-500 px-3 py-1.5 transition-colors">
                  Create Account
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {[
              { label: "Home", href: "/" },
              { label: "All Products", href: "/products" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-gray-50 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2" />
            {user ? (
              <>
                <Link href="/account" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md hover:bg-gray-50">My Account</Link>
                <Link href="/account/orders" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md hover:bg-gray-50">My Orders</Link>
                <button onClick={handleLogout} className="text-left px-3 py-2 rounded-md hover:bg-gray-50 text-red-500">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md bg-black text-white text-center font-medium">Login</Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md border border-gray-200 text-center font-medium">Create Account</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
