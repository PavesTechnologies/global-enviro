import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { authOptions } from "@/lib/auth";

export default async function ProtectedAdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
