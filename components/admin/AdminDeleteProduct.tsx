"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminDeleteProduct({ productId }: { productId: string }) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setLoading(true);
    const { error } = await supabase.from("products").delete().eq("id", productId);
    setLoading(false);
    if (error) toast.error("Failed to delete product");
    else { toast.success("Product deleted"); router.refresh(); }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-500 disabled:opacity-50"
      aria-label="Delete product"
    >
      <Trash2 size={15} />
    </button>
  );
}
