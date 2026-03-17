import JobsAdminClient from "@/components/admin/JobsAdminClient";
import { supabaseAdmin } from "@/lib/supabase/server";

export default async function AdminJobsPage() {
  const { data: jobs = [] } = await supabaseAdmin
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  return <JobsAdminClient initialJobs={jobs} />;
}
