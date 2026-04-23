"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import toast from "react-hot-toast";

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;

export default function AdminOrderRow({ order }: { order: any }) {
  const supabase = createClient();
  const [status, setStatus] = useState(order.status);
  const [saving, setSaving] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setSaving(true);
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", order.id);
    setSaving(false);
    if (error) toast.error("Failed to update status");
    else { setStatus(newStatus); toast.success("Status updated"); }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 font-mono text-xs">#{order.id.slice(0, 8).toUpperCase()}</td>
      <td className="px-4 py-3 font-medium whitespace-nowrap">{order.customer_name}</td>
      <td className="px-4 py-3 text-gray-500">{order.customer_phone}</td>
      <td className="px-4 py-3 text-gray-500 max-w-[160px] truncate">{order.address}, {order.city}</td>
      <td className="px-4 py-3 text-gray-500">
        {order.order_items?.map((i: any) => (
          <div key={i.id} className="text-xs">{i.product_name} ×{i.quantity}</div>
        ))}
      </td>
      <td className="px-4 py-3 font-bold whitespace-nowrap">Rs. {order.total.toLocaleString()}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
          status === "delivered" ? "bg-green-100 text-green-700" :
          status === "shipped" ? "bg-blue-100 text-blue-700" :
          status === "cancelled" ? "bg-red-100 text-red-700" :
          "bg-yellow-100 text-yellow-700"
        }`}>{status}</span>
      </td>
      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
        {new Date(order.created_at).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        <select
          value={status}
          onChange={(e) => updateStatus(e.target.value)}
          disabled={saving}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none focus:border-yellow-400"
        >
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </td>
    </tr>
  );
}
