import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET(_request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: application, error: fetchError } = await supabaseAdmin
    .from("applications")
    .select("resume_url")
    .eq("id", params.id)
    .single();

  if (fetchError) {
    return Response.json({ error: fetchError.message }, { status: 500 });
  }

  const path = application.resume_url;
  const { data, error } = await supabaseAdmin.storage
    .from("resumes")
    .createSignedUrl(path, 900);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ url: data.signedUrl });
}
