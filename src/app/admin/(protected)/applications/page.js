import ApplicationsAdminClient from "@/components/admin/ApplicationsAdminClient";
import { supabaseAdmin } from "@/lib/supabase/server";

export default async function AdminApplicationsPage() {
  const [{ data: applications = [] }, { data: jobs = [] }] = await Promise.all([
    supabaseAdmin
      .from("applications")
      .select("*, jobs(title)")
      .order("applied_at", { ascending: false }),
    supabaseAdmin.from("jobs").select("id, title").order("title"),
  ]);

  return (
    <ApplicationsAdminClient
      initialApplications={applications}
      jobOptions={jobs}
    />
  );
}
