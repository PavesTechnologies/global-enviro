"use client";

import { useMemo, useState } from "react";
import JobCard from "@/components/careers/JobCard";

const PAGE_SIZE = 4;

export default function CareersBrowser({ jobs }) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [location, setLocation] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [page, setPage] = useState(1);

  const departments = [...new Set(jobs.map((job) => job.department).filter(Boolean))];
  const locations = [...new Set(jobs.map((job) => job.location).filter(Boolean))];
  const types = [...new Set(jobs.map((job) => job.type).filter(Boolean))];

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        [job.title, job.department, job.location, job.description]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesDepartment =
        department === "all" || job.department === department;
      const matchesLocation = location === "all" || job.location === location;
      const matchesType = jobType === "all" || job.type === jobType;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesLocation &&
        matchesType
      );
    });
  }, [department, jobType, jobs, location, search]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
    setPage(1);
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-4 rounded-3xl bg-slate-50 p-5 md:grid-cols-4">
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search jobs"
          className="rounded-xl border border-slate-200 bg-white px-4 py-3"
        />
        <select
          value={department}
          onChange={handleFilterChange(setDepartment)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3"
        >
          <option value="all">All departments</option>
          {departments.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          value={location}
          onChange={handleFilterChange(setLocation)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3"
        >
          <option value="all">All locations</option>
          {locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          value={jobType}
          onChange={handleFilterChange(setJobType)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3"
        >
          <option value="all">All job types</option>
          {types.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </section>

      {filteredJobs.length === 0 ? (
        <p>No open positions match your filters right now.</p>
      ) : (
        paginatedJobs.map((job) => <JobCard key={job.id} job={job} />)
      )}

      {filteredJobs.length > PAGE_SIZE ? (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 px-4 py-3">
          <p className="text-sm text-slate-500">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}-
            {Math.min(currentPage * PAGE_SIZE, filteredJobs.length)} of{" "}
            {filteredJobs.length} jobs
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() =>
                setPage((value) => Math.min(totalPages, value + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
