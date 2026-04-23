"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category, Brand } from "@/lib/types";

interface Props {
  categories: Pick<Category, "id" | "name" | "slug">[];
  brands: Pick<Brand, "id" | "name" | "slug">[];
  activeCategory?: string;
  activeBrand?: string;
  activeSort?: string;
}

export default function ProductFilters({ categories, brands, activeCategory, activeBrand, activeSort }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const update = (key: string, value: string | null) => {
    const params = new URLSearchParams(sp.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/products?${params.toString()}`);
  };

  const clear = () => router.push("/products");

  const hasFilters = activeCategory || activeBrand;

  return (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Sort By</h3>
        <select
          value={activeSort ?? "newest"}
          onChange={(e) => update("sort", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
        >
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Category</h3>
          <ul className="space-y-1.5">
            <li>
              <button
                onClick={() => update("category", null)}
                className={`text-sm w-full text-left px-2 py-1 rounded ${!activeCategory ? "text-yellow-600 font-medium" : "text-gray-600 hover:text-yellow-500"}`}
              >
                All Categories
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => update("category", c.slug)}
                  className={`text-sm w-full text-left px-2 py-1 rounded ${activeCategory === c.slug ? "text-yellow-600 font-medium" : "text-gray-600 hover:text-yellow-500"}`}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Brands */}
      {brands.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Brand</h3>
          <ul className="space-y-1.5">
            <li>
              <button
                onClick={() => update("brand", null)}
                className={`text-sm w-full text-left px-2 py-1 rounded ${!activeBrand ? "text-yellow-600 font-medium" : "text-gray-600 hover:text-yellow-500"}`}
              >
                All Brands
              </button>
            </li>
            {brands.map((b) => (
              <li key={b.id}>
                <button
                  onClick={() => update("brand", b.slug)}
                  className={`text-sm w-full text-left px-2 py-1 rounded ${activeBrand === b.slug ? "text-yellow-600 font-medium" : "text-gray-600 hover:text-yellow-500"}`}
                >
                  {b.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasFilters && (
        <button onClick={clear} className="text-sm text-red-500 hover:underline w-full text-left">
          Clear all filters
        </button>
      )}
    </div>
  );
}
