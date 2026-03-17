import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { filename } = await request.json();
  const path = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

  const { data, error } = await supabaseAdmin.storage
    .from("news-photos")
    .createSignedUploadUrl(path);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ signedUrl: data.signedUrl, path, token: data.token });
}
