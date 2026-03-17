import NewsAdminClient from "@/components/admin/NewsAdminClient";
import { supabaseAdmin } from "@/lib/supabase/server";

export default async function AdminNewsPage() {
  const { data: items = [] } = await supabaseAdmin
    .from("news_events")
    .select("*")
    .order("event_date", { ascending: false });

  return <NewsAdminClient initialNews={items} />;
}
