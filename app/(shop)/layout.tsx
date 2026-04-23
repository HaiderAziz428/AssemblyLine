import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();

  const [{ data: categories }, { data: brands }] = await Promise.all([
    supabase.from("categories").select("*").order("name"),
    supabase.from("brands").select("*").order("name"),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header categories={categories ?? []} brands={brands ?? []} />
      <main className="flex-1 pb-14 md:pb-0">{children}</main>
      <Footer />
    </div>
  );
}
