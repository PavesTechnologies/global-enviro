import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(request) {
  const { filename } = await request.json();
  const path = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

  const { data, error } = await supabaseAdmin.storage
    .from("resumes")
    .createSignedUploadUrl(path);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ signedUrl: data.signedUrl, path, token: data.token });
}
