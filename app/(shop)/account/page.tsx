import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Package, Heart, User, LogOut } from "lucide-react";

export default async function AccountPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  const { data: orders } = await supabase.from("orders").select("id,status,total,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
            <User size={28} className="text-yellow-600" />
          </div>
          <h2 className="font-bold text-lg">{profile?.full_name ?? "Customer"}</h2>
          <p className="text-gray-400 text-sm">{user.email}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 w-full">
            <Link href="/account/orders" className="flex items-center justify-center gap-1 bg-gray-50 hover:bg-gray-100 rounded-lg py-2 text-sm font-medium transition-colors">
              <Package size={14} /> Orders
            </Link>
            <Link href="/account/wishlist" className="flex items-center justify-center gap-1 bg-gray-50 hover:bg-gray-100 rounded-lg py-2 text-sm font-medium transition-colors">
              <Heart size={14} /> Wishlist
            </Link>
          </div>
        </div>

        {/* Recent orders */}
        <div className="md:col-span-2 bg-white border border-gray-100 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Recent Orders</h3>
            <Link href="/account/orders" className="text-yellow-600 text-sm hover:underline">View all</Link>
          </div>

          {(orders?.length ?? 0) === 0 ? (
            <div className="text-center py-8">
              <Package size={36} className="mx-auto text-gray-200 mb-2" />
              <p className="text-gray-400 text-sm">No orders yet</p>
              <Link href="/products" className="text-yellow-600 text-sm hover:underline mt-1 inline-block">Start shopping</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders?.map((o) => (
                <Link key={o.id} href={`/orders/${o.id}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium text-sm">#{o.id.slice(0, 8).toUpperCase()}</p>
                    <p className="text-xs text-gray-400">{new Date(o.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">Rs. {o.total.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      o.status === "delivered" ? "bg-green-100 text-green-700" :
                      o.status === "shipped" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>{o.status}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
