import { headers } from "next/headers";
import CareersBrowser from "@/components/careers/CareersBrowser";

async function getJobs() {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") || headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") || "http";
  const baseUrl = process.env.NEXTAUTH_URL || `${protocol}://${host}`;

  const response = await fetch(`${baseUrl}/api/jobs`, { cache: "no-store" });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold text-accent">
        Careers at Global Industries
      </h1>
      <p className="mb-10 text-gray-600">
        We&apos;re always looking for passionate people to join our growing
        team. Browse our open roles below.
      </p>

      <CareersBrowser jobs={jobs} />
    </main>
  );
}
