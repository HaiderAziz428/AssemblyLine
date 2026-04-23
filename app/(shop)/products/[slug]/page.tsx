import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import ProductDetail from "@/components/product/ProductDetail";
import type { Product } from "@/lib/types";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("products").select("name,description").eq("slug", slug).single();
  if (!data) return { title: "Product Not Found" };
  return { title: data.name, description: data.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: product } = await supabase
    .from("products")
    .select("*, category:categories(id,name,slug), brand:brands(id,name,slug), reviews(id,rating,comment,created_at,user_id)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!product) notFound();

  const { data: related } = await supabase
    .from("products")
    .select("*, category:categories(id,name,slug), brand:brands(id,name,slug)")
    .eq("is_active", true)
    .eq("category_id", product.category_id)
    .neq("id", product.id)
    .limit(4);

  return <ProductDetail product={product as Product} related={(related ?? []) as Product[]} />;
}
