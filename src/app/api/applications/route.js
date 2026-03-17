import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendApplicationAlert } from "@/lib/email";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("applications")
    .select("*, jobs(title)")
    .order("applied_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const payload = {
    job_id: body.job_id || null,
    name: body.name,
    email: body.email,
    phone: body.phone || null,
    resume_url: body.resume_url || null,
    cover_note: body.cover_note || null,
  };

  const { data, error } = await supabaseAdmin
    .from("applications")
    .insert(payload)
    .select("id, name, jobs(title)")
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  try {
    await sendApplicationAlert({
      applicantName: data.name,
      jobTitle: data.jobs?.title || "Open role",
      applicationId: data.id,
    });
  } catch (emailError) {
    console.error("Failed to send application alert:", emailError);
  }

  return Response.json(data, { status: 201 });
}
