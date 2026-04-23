import { createServerSupabaseClient } from "@/lib/supabase-server";
import HeroBanner from "@/components/home/HeroBanner";
import BrandsSection from "@/components/home/BrandsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import TrustBar from "@/components/home/TrustBar";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createServerSupabaseClient();

  const [
    { data: banners },
    { data: categories },
    { data: brands },
    { data: featured },
    { data: newArrivals },
  ] = await Promise.all([
    supabase.from("banners").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("categories").select("*").order("name").limit(8),
    supabase.from("brands").select("*").order("name"),
    supabase
      .from("products")
      .select("*, category:categories(id,name,slug), brand:brands(id,name,slug)")
      .eq("is_featured", true)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("products")
      .select("*, category:categories(id,name,slug), brand:brands(id,name,slug)")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  return (
    <>
      <HeroBanner banners={banners ?? []} />
      <TrustBar />
      <CategoriesSection categories={categories ?? []} />
      <BrandsSection brands={brands ?? []} />

      {/* Featured Products */}
      {(featured?.length ?? 0) > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
                <p className="text-gray-500 mt-1 text-sm">Handpicked products for your car</p>
              </div>
              <a href="/products?featured=true" className="text-yellow-600 hover:text-yellow-500 text-sm font-medium">
                View All →
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {(featured as Product[]).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {(newArrivals?.length ?? 0) > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">New Arrivals</h2>
                <p className="text-gray-500 mt-1 text-sm">Just landed in store</p>
              </div>
              <a href="/products" className="text-yellow-600 hover:text-yellow-500 text-sm font-medium">
                View All →
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {(newArrivals as Product[]).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state for new stores */}
      {!(featured?.length) && !(newArrivals?.length) && (
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
            <div className="text-6xl mb-4">🚗</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Store Coming Soon</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Products are being added. Check back soon or contact us to place an order directly.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
