"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Tag, Award, Image, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/brands", label: "Brands", icon: Award },
  { href: "/admin/banners", label: "Banners", icon: Image },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-black text-white min-h-screen flex flex-col flex-shrink-0">
      <div className="p-5 border-b border-gray-800">
        <Link href="/" className="text-xl font-bold">
          <span className="text-white">AUTO</span><span className="text-yellow-500">SHOP</span>
        </Link>
        <p className="text-gray-400 text-xs mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 p-3">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors",
                active ? "bg-yellow-500 text-black" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-800">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
          <Home size={18} /> Back to Store
        </Link>
      </div>
    </aside>
  );
}
