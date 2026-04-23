import { createServerSupabaseClient } from "@/lib/supabase-server";
import AdminOrderRow from "@/components/admin/AdminOrderRow";

export default async function AdminOrdersPage() {
  const supabase = await createServerSupabaseClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(id,product_name,quantity,price)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Orders</h1>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Order ID", "Customer", "Phone", "Address", "Items", "Total", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders?.map((o) => <AdminOrderRow key={o.id} order={o} />)}
            </tbody>
          </table>
          {!orders?.length && <div className="py-12 text-center text-gray-400">No orders</div>}
        </div>
      </div>
    </div>
  );
}
