import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Use security-definer RPC to bypass RLS — direct table query can return
  // null if the session cookie hasn't propagated auth.uid() in this request.
  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!isAdmin) redirect("/");

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        <main className="p-6 max-w-7xl">{children}</main>
      </div>
    </div>
  );
}
