"use client";

import { useMemo, useState } from "react";
import ModalAlert from "@/components/common/ModalAlert";

const STATUS_FLOW = {
  new: ["new", "reviewed", "shortlisted", "rejected"],
  reviewed: ["reviewed", "shortlisted", "rejected"],
  shortlisted: ["shortlisted"],
  rejected: ["rejected"],
};

export default function ApplicationsAdminClient({
  initialApplications,
  jobOptions,
}) {
  const [applications, setApplications] = useState(initialApplications);
  const [jobFilter, setJobFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");
  const [modalState, setModalState] = useState({
    open: false,
    title: "",
    message: "",
  });

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const jobMatch =
        jobFilter === "all" || application.job_id === jobFilter;
      const statusMatch =
        statusFilter === "all" || application.status === statusFilter;

      return jobMatch && statusMatch;
    });
  }, [applications, jobFilter, statusFilter]);

  const updateStatus = async (id, status) => {
    const response = await fetch(`/api/applications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to update application.");
      return;
    }

    setApplications((current) =>
      current.map((application) =>
        application.id === data.id
          ? { ...application, status: data.status }
          : application
      )
    );
    setModalState({
      open: true,
      title: "Status updated",
      message: "The candidate status was updated and the email notification was queued.",
    });
  };

  const downloadResume = async (id) => {
    const response = await fetch(`/api/applications/${id}/resume`);
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to generate resume link.");
      return;
    }

    window.open(data.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Applications
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Candidate pipeline
        </h1>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <select
            value={jobFilter}
            onChange={(event) => setJobFilter(event.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3"
          >
            <option value="all">All jobs</option>
            {jobOptions.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3"
          >
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {error ? (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-left text-sm text-slate-600">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Job</th>
                <th className="px-6 py-4 font-medium">Applied date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Resume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {application.name}
                  </td>
                  <td className="px-6 py-4">{application.email}</td>
                  <td className="px-6 py-4">{application.phone || "-"}</td>
                  <td className="px-6 py-4">
                    {application.jobs?.title || "Unassigned"}
                  </td>
                  <td className="px-6 py-4">
                    {application.applied_at
                      ? new Date(application.applied_at).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={application.status}
                      onChange={(event) =>
                        updateStatus(application.id, event.target.value)
                      }
                      className="rounded-lg border border-slate-200 px-3 py-2"
                    >
                      {(STATUS_FLOW[application.status] || [application.status]).map(
                        (statusOption) => (
                          <option key={statusOption} value={statusOption}>
                            {statusOption.charAt(0).toUpperCase() +
                              statusOption.slice(1)}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => downloadResume(application.id)}
                      className="rounded-lg border border-slate-200 px-3 py-2 transition hover:bg-slate-50"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
              {filteredApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-8 text-center text-sm text-slate-500"
                  >
                    No applications found for the selected filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <ModalAlert
        open={modalState.open}
        title={modalState.title}
        message={modalState.message}
        onClose={() => setModalState({ open: false, title: "", message: "" })}
      />
    </div>
  );
}
