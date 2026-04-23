import { createServerSupabaseClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import { CheckCircle, Package, Truck, Home } from "lucide-react";
import Link from "next/link";

interface Props { params: { id: string }; searchParams: { confirmed?: string } }

const STATUS_STEPS = ["pending", "confirmed", "shipped", "delivered"] as const;
const STATUS_ICONS = { pending: Package, confirmed: CheckCircle, shipped: Truck, delivered: Home };

export default async function OrderPage({ params, searchParams }: Props) {
  const supabase = await createServerSupabaseClient();
  const { data: order } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", params.id)
    .single();

  if (!order) notFound();

  const stepIdx = STATUS_STEPS.indexOf(order.status as typeof STATUS_STEPS[number]);
  const isConfirmed = searchParams.confirmed === "1";

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      {isConfirmed && (
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-500">We&apos;ll contact you on <strong>{order.customer_phone}</strong> to confirm your order.</p>
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-400">Order ID</p>
            <p className="font-mono font-medium text-sm">{order.id.slice(0, 8).toUpperCase()}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            order.status === "delivered" ? "bg-green-100 text-green-700" :
            order.status === "shipped" ? "bg-blue-100 text-blue-700" :
            order.status === "cancelled" ? "bg-red-100 text-red-700" :
            "bg-yellow-100 text-yellow-700"
          }`}>
            {order.status}
          </span>
        </div>

        {/* Progress bar */}
        {order.status !== "cancelled" && (
          <div className="flex items-center mb-8">
            {STATUS_STEPS.map((step, i) => {
              const Icon = STATUS_ICONS[step];
              const done = i <= stepIdx;
              return (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${done ? "bg-yellow-500 text-black" : "bg-gray-100 text-gray-400"}`}>
                    <Icon size={16} />
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div className={`flex-1 h-1 mx-1 ${i < stepIdx ? "bg-yellow-500" : "bg-gray-100"}`} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Customer info */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6 bg-gray-50 rounded-xl p-4">
          <div><p className="text-gray-400 text-xs">Name</p><p className="font-medium">{order.customer_name}</p></div>
          <div><p className="text-gray-400 text-xs">Phone</p><p className="font-medium">{order.customer_phone}</p></div>
          <div className="col-span-2"><p className="text-gray-400 text-xs">Delivery Address</p><p className="font-medium">{order.address}, {order.city}</p></div>
        </div>

        {/* Items */}
        <div className="space-y-3 mb-6">
          {order.order_items?.map((item: any) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium">{item.product_name}</p>
                <p className="text-gray-400">Qty: {item.quantity} × Rs. {item.price.toLocaleString()}</p>
              </div>
              <span className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>Rs. {order.total.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/products" className="flex-1 text-center border border-gray-200 hover:border-yellow-400 py-3 rounded-xl font-medium text-sm transition-colors">
          Continue Shopping
        </Link>
        <Link href="/account/orders" className="flex-1 text-center bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-medium text-sm transition-colors">
          View All Orders
        </Link>
      </div>
    </div>
  );
}
