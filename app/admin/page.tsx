import { createServerSupabaseClient } from "@/lib/supabase-server";
import { ShoppingBag, Package, Tag, DollarSign } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient();

  const [
    { count: totalOrders },
    { count: totalProducts },
    { data: revenueData },
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("total").in("status", ["confirmed", "shipped", "delivered"]),
    supabase.from("orders").select("id,customer_name,status,total,created_at").order("created_at", { ascending: false }).limit(10),
  ]);

  const totalRevenue = revenueData?.reduce((s, o) => s + o.total, 0) ?? 0;

  const stats = [
    { label: "Total Orders", value: totalOrders ?? 0, icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
    { label: "Total Products", value: totalProducts ?? 0, icon: Package, color: "bg-green-50 text-green-600" },
    { label: "Revenue (PKR)", value: `${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "bg-yellow-50 text-yellow-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
              <Icon size={22} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-gray-400 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-bold text-lg">Recent Orders</h2>
          <Link href="/admin/orders" className="text-yellow-600 text-sm hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Order ID", "Customer", "Status", "Total", "Date"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-gray-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders?.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono">#{o.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-6 py-4">{o.customer_name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      o.status === "delivered" ? "bg-green-100 text-green-700" :
                      o.status === "shipped" ? "bg-blue-100 text-blue-700" :
                      o.status === "cancelled" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>{o.status}</span>
                  </td>
                  <td className="px-6 py-4 font-bold">Rs. {o.total.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-400">{new Date(o.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!recentOrders?.length && (
            <div className="py-12 text-center text-gray-400">No orders yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
