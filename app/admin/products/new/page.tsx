import { createServerSupabaseClient } from "@/lib/supabase-server";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const supabase = await createServerSupabaseClient();
  const [{ data: categories }, { data: brands }] = await Promise.all([
    supabase.from("categories").select("id,name").order("name"),
    supabase.from("brands").select("id,name").order("name"),
  ]);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Add New Product</h1>
      <ProductForm categories={categories ?? []} brands={brands ?? []} />
    </div>
  );
}
