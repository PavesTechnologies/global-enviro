import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendApplicationStatusUpdate } from "@/lib/email";
import { supabaseAdmin } from "@/lib/supabase/server";

const ALLOWED_STATUS_UPDATES = {
  new: ["reviewed", "shortlisted", "rejected"],
  reviewed: ["shortlisted", "rejected"],
  shortlisted: [],
  rejected: [],
};

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { status } = await request.json();

  if (!Object.hasOwn(ALLOWED_STATUS_UPDATES, status)) {
    return Response.json({ error: "Invalid status." }, { status: 400 });
  }

  const { data: existing, error: fetchError } = await supabaseAdmin
    .from("applications")
    .select("id, status, name, email, jobs(title)")
    .eq("id", params.id)
    .single();

  if (fetchError) {
    return Response.json({ error: fetchError.message }, { status: 500 });
  }

  if (existing.status !== status) {
    const allowedNextStatuses = ALLOWED_STATUS_UPDATES[existing.status] || [];

    if (!allowedNextStatuses.includes(status)) {
      return Response.json(
        { error: "Only forward status updates are allowed." },
        { status: 400 }
      );
    }
  }

  const { data, error } = await supabaseAdmin
    .from("applications")
    .update({ status })
    .eq("id", params.id)
    .select("id, status, name, email, jobs(title)")
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  if (existing.status !== status) {
    try {
      await sendApplicationStatusUpdate({
        applicantName: data.name,
        applicantEmail: data.email,
        jobTitle: data.jobs?.title || "your application",
        status: data.status,
      });
    } catch (emailError) {
      console.error("Failed to send candidate status update:", emailError);
    }
  }

  return Response.json(data);
}
