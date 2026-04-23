import { createServerSupabaseClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import AdminDeleteProduct from "@/components/admin/AdminDeleteProduct";

export default async function AdminProductsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(name), brand:brands(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl transition-colors text-sm">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Product", "Category", "Brand", "Price", "Stock", "Featured", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products?.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium max-w-[200px] truncate">{p.name}</td>
                  <td className="px-4 py-3 text-gray-500">{(p.category as any)?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-gray-500">{(p.brand as any)?.name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className="font-medium">Rs. {(p.sale_price ?? p.price).toLocaleString()}</span>
                    {p.sale_price && <span className="text-xs text-gray-400 line-through ml-1">Rs. {p.price.toLocaleString()}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={p.stock <= 0 ? "text-red-500" : "text-green-600"}>{p.stock}</span>
                  </td>
                  <td className="px-4 py-3">
                    {p.is_featured ? <span className="text-yellow-500 text-xs font-bold">★ Yes</span> : <span className="text-gray-300 text-xs">No</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/${p.id}/edit`} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-blue-500">
                        <Edit size={15} />
                      </Link>
                      <AdminDeleteProduct productId={p.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!products?.length && <div className="py-12 text-center text-gray-400">No products yet. <Link href="/admin/products/new" className="text-yellow-600 hover:underline">Add one →</Link></div>}
        </div>
      </div>
    </div>
  );
}
