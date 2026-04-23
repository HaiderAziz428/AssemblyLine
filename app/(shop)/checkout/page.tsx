"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle, ShoppingBag, Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { createClient } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const supabase = createClient();
  const { items, total, clear } = useCartStore();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", city: "", notes: "",
  });

  const subtotal = total();
  const delivery = subtotal >= 3000 ? 0 : 200;
  const grandTotal = subtotal + delivery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) { toast.error("Your cart is empty"); return; }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      // Create order
      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({
          user_id: user?.id ?? null,
          status: "pending",
          total: grandTotal,
          customer_name: form.name,
          customer_phone: form.phone,
          customer_email: form.email || null,
          address: form.address,
          city: form.city,
          notes: form.notes || null,
        })
        .select()
        .single();

      if (orderErr || !order) throw new Error(orderErr?.message ?? "Order failed");

      // Insert order items
      await supabase.from("order_items").insert(
        items.map(({ product, quantity }) => ({
          order_id: order.id,
          product_id: product.id,
          product_name: product.name,
          product_image: product.images?.[0] ?? null,
          price: product.sale_price ?? product.price,
          quantity,
        }))
      );

      // Notify via API (WhatsApp mock)
      await fetch("/api/orders/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order, items }),
      }).catch(() => {}); // non-blocking

      clear();
      router.push(`/orders/${order.id}?confirmed=1`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <ShoppingBag size={60} className="mx-auto text-gray-200 mb-4" />
        <h1 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h1>
        <a href="/products" className="text-yellow-600 hover:underline">Go shopping →</a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Delivery info */}
          <div className="space-y-5">
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h2 className="font-bold text-lg mb-4">Delivery Information</h2>

              <div className="space-y-4">
                <Field label="Full Name *" name="name" value={form.name} onChange={handleChange} required placeholder="Ali Khan" />
                <Field label="Phone Number *" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="03XX-XXXXXXX" />
                <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                <Field label="Full Address *" name="address" value={form.address} onChange={handleChange} required placeholder="Street, area..." />
                <Field label="City *" name="city" value={form.city} onChange={handleChange} required placeholder="Karachi" />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Any special instructions..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h2 className="font-bold text-lg mb-4">Payment Method</h2>
              <div className="flex items-center gap-3 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4">
                <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={14} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Cash on Delivery</p>
                  <p className="text-xs text-gray-500">Pay when your order arrives at your door</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-white border border-gray-100 rounded-xl p-6 sticky top-24">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map(({ product, quantity }) => {
                  const price = product.sale_price ?? product.price;
                  return (
                    <div key={product.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden">
                        {product.images?.[0] && (
                          <Image src={product.images[0]} alt={product.name} fill className="object-contain p-1" />
                        )}
                        <span className="absolute -top-1 -right-1 bg-gray-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                      </div>
                      <span className="text-sm font-medium">Rs. {(price * quantity).toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? "text-green-600 font-medium" : ""}>{delivery === 0 ? "FREE" : `Rs. ${delivery}`}</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-gray-100 pt-2">
                  <span>Total</span><span>Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 text-black font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? "Placing Order..." : "Place Order — Cash on Delivery"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  label, name, value, onChange, type = "text", required, placeholder,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>{label}</label>
      <input
        id={name} name={name} type={type} value={value} onChange={onChange}
        required={required} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition"
      />
    </div>
  );
}
