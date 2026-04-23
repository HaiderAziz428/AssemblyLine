import { createServerSupabaseClient } from "@/lib/supabase-server";
import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/components/product/ProductFilters";
import type { Product } from "@/lib/types";

interface Props {
  searchParams: Promise<{ search?: string; category?: string; brand?: string; sort?: string; featured?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const { search } = await searchParams;
  return {
    title: search ? `Search: "${search}"` : "All Products",
    description: "Browse our full range of professional car care, detailing products and accessories.",
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const { search, category, brand, sort = "newest", featured } = await searchParams;
  const supabase = await createServerSupabaseClient();

  let query = supabase
    .from("products")
    .select("*, category:categories(id,name,slug), brand:brands(id,name,slug)")
    .eq("is_active", true);

  if (search) query = query.textSearch("search_vector", search);
  if (category) query = query.eq("category.slug", category);
  if (brand) query = query.eq("brand.slug", brand);
  if (featured === "true") query = query.eq("is_featured", true);

  if (sort === "price_asc") query = query.order("price", { ascending: true });
  else if (sort === "price_desc") query = query.order("price", { ascending: false });
  else query = query.order("created_at", { ascending: false });

  const [{ data: products }, { data: categories }, { data: brands }] = await Promise.all([
    query,
    supabase.from("categories").select("id,name,slug").order("name"),
    supabase.from("brands").select("id,name,slug").order("name"),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {search ? `Results for "${search}"` : "All Products"}
        </h1>
        <p className="text-gray-500 text-sm mt-1">{products?.length ?? 0} products found</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-60 flex-shrink-0">
          <ProductFilters
            categories={categories ?? []}
            brands={brands ?? []}
            activeCategory={category}
            activeBrand={brand}
            activeSort={sort}
          />
        </aside>

        <div className="flex-1">
          {(products?.length ?? 0) === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No products found</h2>
              <p className="text-gray-400 text-sm">Try a different search or browse all products</p>
              <a href="/products" className="mt-4 text-yellow-600 font-medium hover:underline">Clear filters</a>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {(products as Product[]).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
