import { createServerSupabaseClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const [{ data: product }, { data: categories }, { data: brands }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).maybeSingle(),
    supabase.from("categories").select("id,name").order("name"),
    supabase.from("brands").select("id,name").order("name"),
  ]);

  if (!product) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Edit Product</h1>
      <ProductForm
        categories={categories ?? []}
        brands={brands ?? []}
        product={product}
      />
    </div>
  );
}
